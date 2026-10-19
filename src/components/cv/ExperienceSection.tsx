import { ExperienceItem } from "@/types/cv";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

interface ExperienceSectionProps {
  experience: ExperienceItem[];
}

export default function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 border-b border-zinc-200 pb-2 dark:border-zinc-800">
        <Briefcase className="h-5 w-5 text-sky-500" />
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Work Experience
        </h2>
      </div>

      <div className="relative space-y-8 pl-4 before:absolute before:bottom-2 before:left-[11px] before:top-3 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800 print:pl-0 print:before:hidden">
        {experience.map((item, index) => (
          <div key={index} className="relative pl-6 print:pl-0">
            {/* Timeline indicator node */}
            <span
              className={`absolute -left-4 top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 bg-white dark:bg-zinc-900 print:hidden ${
                item.isCurrent
                  ? "border-sky-500 ring-4 ring-sky-100 dark:ring-sky-950"
                  : "border-zinc-300 dark:border-zinc-700"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  item.isCurrent ? "bg-sky-500 animate-pulse" : "bg-zinc-400"
                }`}
              />
            </span>

            {/* Company Card Header */}
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs transition-all dark:border-zinc-800/80 dark:bg-zinc-900/60 print:border-none print:p-0 print:shadow-none">
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 print:text-base">
                    {item.company}
                  </h3>
                  {item.isCurrent && (
                    <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                      Current
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{item.period}</span>
                </div>
              </div>

              <div className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                <span>{item.location}</span>
              </div>

              {/* Projects inside the Company */}
              <div className="mt-4 space-y-4 divide-y divide-zinc-100 dark:divide-zinc-800/60">
                {item.projects.map((proj, pIdx) => (
                  <div key={pIdx} className={pIdx > 0 ? "pt-4" : ""}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                          {proj.title}
                        </h4>
                        {proj.subtitle && (
                          <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            • {proj.subtitle}
                          </span>
                        )}
                      </div>
                    </div>

                    {proj.description && (
                      <p className="mt-1 text-xs italic text-zinc-600 dark:text-zinc-400">
                        {proj.description}
                      </p>
                    )}

                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {proj.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded bg-sky-50 px-2 py-0.5 text-[11px] font-medium text-sky-700 dark:bg-sky-950/50 dark:text-sky-300 print:border print:border-zinc-200 print:bg-transparent"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <ul className="mt-2.5 space-y-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                      {proj.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-500 print:text-zinc-400" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
