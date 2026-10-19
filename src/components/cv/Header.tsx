import { CVData } from "@/types/cv";
import { Mail, Phone, MapPin, Sparkles, Download } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  data: CVData;
}

export default function Header({ data }: HeaderProps) {
  const { name, title, summary, contact, avatar, resumeUrl = "/assets/cv.pdf" } = data;

  return (
    <header className="relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm backdrop-blur-md transition-all dark:border-zinc-800/80 dark:bg-zinc-900/60 print:border-none print:p-0 print:shadow-none">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          {/* Profile Photo / Avatar */}
          {avatar ? (
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border-2 border-zinc-200 shadow-sm dark:border-zinc-700 sm:h-32 sm:w-32 print:h-24 print:w-24">
              <Image
                src={avatar}
                alt={name}
                fill
                sizes="(max-width: 768px) 112px, 128px"
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl border-2 border-zinc-200 bg-zinc-100 text-2xl font-bold text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 sm:h-32 sm:w-32">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          )}

          {/* Info Details */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50 print:text-3xl">
                {name}
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 dark:border-sky-800/60 dark:bg-sky-950/40 dark:text-sky-300 print:border-zinc-300 print:text-zinc-800">
                <Sparkles className="h-3.5 w-3.5" />
                {title}
              </span>
            </div>

            {summary && (
              <p className="max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300 print:text-sm">
                {summary}
              </p>
            )}

            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2 text-sm text-zinc-600 dark:text-zinc-400 print:text-xs">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-sky-600 dark:hover:text-sky-400"
              >
                <Mail className="h-4 w-4 text-zinc-400" />
                <span>{contact.email}</span>
              </a>

              <div className="inline-flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-zinc-400" />
                <span>{contact.phoneNumbers.join(" / ")}</span>
              </div>

              {contact.linkedInUrl && (
                <a
                  href={contact.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-sky-600 dark:hover:text-sky-400"
                >
                  <svg
                    className="h-4 w-4 fill-current text-sky-600 dark:text-sky-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.92 0-1.66.74-1.66 1.66 0 .92.74 1.66 1.66 1.66.92 0 1.66-.74 1.66-1.66 0-.92-.74-1.66-1.66-1.66Z" />
                  </svg>
                  <span>{contact.linkedIn}</span>
                </a>
              )}

              <div className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-zinc-400" />
                <span>Yangon, Myanmar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Download CV Action */}
        {resumeUrl && (
          <div className="flex items-center gap-3 self-start print:hidden">
            <a
              href={resumeUrl}
              download="Thein_Htay_CV.pdf"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-sky-500 hover:shadow-md hover:shadow-sky-500/20 active:scale-95 dark:bg-sky-500 dark:hover:bg-sky-400"
              title="Download CV (PDF)"
            >
              <Download className="h-4 w-4" />
              <span>Download CV</span>
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
