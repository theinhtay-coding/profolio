import cvData from "@/constants/cv-data.json";
import { CVData } from "@/types/cv";
import Header from "@/components/cv/Header";
import ProfileSection from "@/components/cv/ProfileSection";
import SkillsSection from "@/components/cv/SkillsSection";
import ExperienceSection from "@/components/cv/ExperienceSection";
import EducationSection from "@/components/cv/EducationSection";
import PersonalInfoSection from "@/components/cv/PersonalInfoSection";

const data = cvData as CVData;

export const metadata = {
  title: `${data.name} - ${data.title} | Resume`,
  description: data.summary,
};

export default function HomePage() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 print:p-0">
      <main className="mx-auto max-w-5xl space-y-8 print:max-w-none print:space-y-6">
        {/* Profile Header with Avatar & Contact */}
        <Header data={data} />

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 print:grid-cols-12 print:gap-6">
          {/* Main Column: Profile & Work Experience */}
          <div className="order-2 space-y-8 lg:order-1 lg:col-span-8 print:order-1 print:col-span-7">
            {/* Professional Profile / Summary */}
            <ProfileSection profile={data.profile} />

            {/* Work Experience */}
            <ExperienceSection experience={data.experience} />
          </div>

          {/* Sidebar Column: Skills, Education, Personal Info */}
          <div className="order-1 space-y-8 lg:order-2 lg:col-span-4 print:order-2 print:col-span-5">
            <SkillsSection skills={data.skills} />
            <EducationSection education={data.education} />
            <PersonalInfoSection personal={data.personal} contact={data.contact} />
          </div>
        </div>

        {/* Footer info (hidden when printing) */}
        <footer className="border-t border-zinc-200/80 pt-6 text-center text-xs text-zinc-400 dark:border-zinc-800 print:hidden">
          <p>
            Dynamically loaded from{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[11px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              src/constants/cv-data.json
            </code>
            . Simply update the JSON file to refresh profile photo, summary, skills, and companies.
          </p>
        </footer>
      </main>
    </div>
  );
}
