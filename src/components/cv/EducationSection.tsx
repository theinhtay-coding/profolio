import { EducationItem } from "@/types/cv";
import { GraduationCap, Calendar } from "lucide-react";

interface EducationSectionProps {
  education: EducationItem[];
}

export default function EducationSection({ education }: EducationSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 border-b border-zinc-200 pb-2 dark:border-zinc-800">
        <GraduationCap className="h-5 w-5 text-sky-500" />
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Educational Background
        </h2>
      </div>

      <div className="space-y-3">
        {education.map((edu, index) => (
          <div
            key={index}
            className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-xs transition-all dark:border-zinc-800/80 dark:bg-zinc-900/60 print:border-zinc-200 print:p-2"
          >
            <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {edu.degree}
              </h3>
              <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                <Calendar className="h-3.5 w-3.5" />
                <span>{edu.period}</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              {edu.institution}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
