import { SkillGroup } from "@/types/cv";
import { Code2, Server, Database, GitBranch, Laptop } from "lucide-react";

interface SkillsSectionProps {
  skills: SkillGroup[];
}

const getCategoryIcon = (category: string) => {
  const normalized = category.toLowerCase();
  if (normalized.includes("front")) return <Code2 className="h-4 w-4 text-emerald-500" />;
  if (normalized.includes("back")) return <Server className="h-4 w-4 text-sky-500" />;
  if (normalized.includes("data")) return <Database className="h-4 w-4 text-purple-500" />;
  if (normalized.includes("version") || normalized.includes("git"))
    return <GitBranch className="h-4 w-4 text-amber-500" />;
  return <Laptop className="h-4 w-4 text-rose-500" />;
};

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 border-b border-zinc-200 pb-2 dark:border-zinc-800">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Skills & Technologies
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1">
        {skills.map((group) => (
          <div
            key={group.category}
            className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-xs transition-all hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:hover:border-zinc-700 print:border-zinc-200 print:p-2"
          >
            <div className="mb-2.5 flex items-center gap-2">
              {getCategoryIcon(group.category)}
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {group.category}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-800 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 print:border print:border-zinc-200 print:bg-transparent"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
