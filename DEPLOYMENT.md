# CI/CD Deployment Guide: Cloudflare Pages with GitHub Actions

This document explains the CI/CD pipeline configured for this Next.js project, why specific configuration changes were made in `next.config.ts`, and a line-by-line breakdown of the GitHub Actions workflow file (`.github/workflows/deploy.yml`).

---

## 1. Why `output: "export"` in `next.config.ts`?

### The Architecture Difference: Node Server vs. Cloudflare Pages

By default, Next.js runs as a dynamic **Node.js server application** (designed for platforms like Vercel or Node servers). When you run standard `next build`, Next.js creates server-side runtime chunks (`.next/standalone` or `.next/server`) that expect an active Node.js server to handle incoming requests.

**Cloudflare Pages**, however, is primarily an edge CDN designed to serve **static files** (HTML, CSS, JavaScript, images) at lightning-fast speeds across Cloudflare's global edge network.

### What `output: "export"` Does

When you set `output: "export"` in `next.config.ts`:
1. Next.js executes a **Static HTML Export**.
2. During `npm run build`, Next.js pre-renders all routes (e.g. `/`, `/_not-found`) into static `.html`, `.css`, and `.js` files.
3. Next.js places all static deployable files directly into an **`out/`** directory.
4. Cloudflare Pages then hosts this `out/` folder directly without needing a Node.js server, middleware server, or container runtime. This provides:
   - **Zero server maintenance & zero cost** on Cloudflare Pages free tier.
   - **Ultra-low latency** (cached and served directly from 300+ edge locations).
   - **Instant page loads** for portfolio and resume pages.

### Why was `partialPrefetching` (PPR) removed?

In Next.js 16, **Partial Prerendering (PPR)** combines static shells with dynamic streaming parts on a server runtime. When Next.js detects `output: "export"` with PPR enabled, it throws this build error:
```text
Error: Invariant: PPR cannot be enabled in export mode
```
Because a static export has no backend server to stream dynamic parts, PPR cannot be enabled. Removing `partialPrefetching: true` allows the static build to complete cleanly.

---

## 2. GitHub Secrets & Setup

To allow GitHub Actions to deploy to Cloudflare Pages, set up these two secrets in your GitHub repository (**Settings** > **Secrets and variables** > **Actions** > **New repository secret**):

| Secret Name | Description | Where to find it |
| :--- | :--- | :--- |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare Account ID | Cloudflare Dashboard &rarr; Right sidebar |
| `CLOUDFLARE_API_TOKEN` | API token with Pages edit permission | Cloudflare Dashboard &rarr; My Profile &rarr; API Tokens &rarr; Create Custom Token (`Account > Cloudflare Pages > Edit`) |

Optional Repository Variable (**Settings** > **Secrets and variables** > **Actions** > **Variables**):
- `CLOUDFLARE_PROJECT_NAME`: Defaults to `profolio` if not set.

---

## 3. How to Deploy via Git Tags

Whenever you are ready to deploy a new version to production:

```bash
# 1. Create a tag with 'v' prefix
git tag v1.0.0

# 2. Push the tag to GitHub
git push origin v1.0.0
```

GitHub Actions will detect the tag push, trigger the workflow, run CI checks (linting & building), and deploy the artifacts to Cloudflare Pages.

---

## 4. Line-by-Line Breakdown of `.github/workflows/deploy.yml`

Below is the complete line-by-line explanation of the workflow:

```yaml
1: name: CI/CD - Deploy to Cloudflare Pages
```
> **Line 1**: The display name for this GitHub Actions workflow shown in the repository's **Actions** tab.

```yaml
3: on:
4:   push:
5:     tags:
6:       - 'v*.*.*'
7:       - 'v*'
8:   workflow_dispatch:
```
> **Lines 3–8**: Workflow Triggers.
> - `push.tags`: Triggers the workflow automatically whenever a Git tag matching `v*` (like `v1.0.0`, `v0.1`, `v2.0.1`) is pushed. Standard branch pushes (`git push origin main`) will **not** trigger deployment, ensuring only deliberate tagged releases are published.
> - `workflow_dispatch`: Enables a manual **"Run workflow"** button in GitHub's web UI, letting you trigger a test deployment on-demand without creating a new tag.

```yaml
10: permissions:
11:   contents: read
```
> **Lines 10–11**: Security permissions granted to the default `GITHUB_TOKEN`. It restricts permissions to read-only access to repository code, adhering to the principle of least privilege.

```yaml
13: jobs:
14:   ci:
15:     name: Lint & Build (CI)
16:     runs-on: ubuntu-latest
```
> **Lines 13–16**: Defines the first job: `ci`.
> - Runs in an isolated Linux virtual machine (`ubuntu-latest`).
> - Responsible for validating code quality and creating the production build before touching any deployment infrastructure.

```yaml
17:     steps:
18:       - name: Checkout repository
19:         uses: actions/checkout@v4
```
> **Lines 17–19**: Clones your GitHub repository into the virtual runner so subsequent steps can access the files.

```yaml
21:       - name: Setup Node.js
22:         uses: actions/setup-node@v4
23:         with:
24:           node-version: 20
25:           cache: 'npm'
```
> **Lines 21–25**: Installs Node.js version 20 (LTS) on the runner.
> - `cache: 'npm'`: Automatically caches the `~/.npm` directory based on your `package-lock.json`. This makes subsequent workflow runs significantly faster by avoiding re-downloading dependencies.

```yaml
27:       - name: Install dependencies
28:         run: npm ci
```
> **Lines 27–28**: Installs project dependencies using `npm ci` (clean install). Unlike `npm install`, `npm ci` uses the exact versions locked in `package-lock.json` and guarantees a deterministic build in CI environments.

```yaml
30:       - name: Run ESLint
31:         run: npm run lint
```
> **Lines 30–31**: Runs ESLint. If any lint errors or invalid TypeScript rules fail, the workflow immediately halts and cancels the deployment, preventing broken code from reaching production.

```yaml
33:       - name: Build Next.js Static Export
34:         run: npm run build
```
> **Lines 33–34**: Executes `next build`. Because `output: "export"` is enabled in `next.config.ts`, this compiles the React application and generates all static assets inside the `out/` folder.

```yaml
36:       - name: Upload build artifact
37:         uses: actions/upload-artifact@v4
38:         with:
39:           name: static-dist
40:           path: out
41:           retention-days: 1
```
> **Lines 36–41**: Packages the generated `out/` directory and saves it as an artifact named `static-dist`.
> - This allows passing the compiled build output from the `ci` job to the `deploy` job without having to rebuild the project a second time.

```yaml
43:   deploy:
44:     name: Deploy to Cloudflare Pages (CD)
45:     needs: ci
46:     runs-on: ubuntu-latest
```
> **Lines 43–46**: Defines the second job: `deploy`.
> - `needs: ci`: **Critical CI/CD requirement**. This ensures the deploy job will **only** execute if the `ci` job finishes successfully with zero errors. If linting or building fails, deployment is automatically blocked.

```yaml
47:     steps:
48:       - name: Checkout repository
49:         uses: actions/checkout@v4
```
> **Lines 47–49**: Checks out the repository files on the deploy runner.

```yaml
51:       - name: Download build artifact
52:         uses: actions/download-artifact@v4
53:         with:
54:           name: static-dist
55:           path: out
```
> **Lines 51–55**: Downloads the previously uploaded `static-dist` artifact and unpacks it back into the `out/` directory.

```yaml
57:       - name: Deploy to Cloudflare Pages
58:         uses: cloudflare/wrangler-action@v3
59:         with:
60:           apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
61:           accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
62:           command: pages deploy out --project-name=${{ vars.CLOUDFLARE_PROJECT_NAME || 'profolio' }} --commit-dirty=true
```
> **Lines 57–62**: Official Cloudflare deployment action (`wrangler-action@v3`).
> - `apiToken`: Injected securely from GitHub Secrets (`CLOUDFLARE_API_TOKEN`).
> - `accountId`: Injected securely from GitHub Secrets (`CLOUDFLARE_ACCOUNT_ID`).
> - `command`: Runs `wrangler pages deploy out`:
>   - `out`: Specifies the static directory to upload.
>   - `--project-name`: Specifies the Cloudflare Pages project name (defaults to `profolio` or uses `vars.CLOUDFLARE_PROJECT_NAME` if defined).
>   - `--commit-dirty=true`: Ensures Wrangler proceeds without blocking if untracked build artifacts are present.
