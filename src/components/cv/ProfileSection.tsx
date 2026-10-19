import { UserCheck } from "lucide-react";

interface ProfileSectionProps {
  profile?: string;
}

export default function ProfileSection({ profile }: ProfileSectionProps) {
  if (!profile) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 border-b border-zinc-200 pb-2 dark:border-zinc-800">
        <UserCheck className="h-5 w-5 text-sky-500" />
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Professional Profile
        </h2>
      </div>

      <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs transition-all dark:border-zinc-800/80 dark:bg-zinc-900/60 print:border-none print:p-0 print:shadow-none">
        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 print:text-xs">
          {profile}
        </p>
      </div>
    </section>
  );
}
