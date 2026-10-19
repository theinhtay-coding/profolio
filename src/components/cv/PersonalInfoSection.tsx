import { ContactInfo, PersonalInfo } from "@/types/cv";
import { User, MapPin, Home, Flag, IdCard, Heart, Sparkles } from "lucide-react";

interface PersonalInfoSectionProps {
  personal: PersonalInfo;
  contact: ContactInfo;
}

export default function PersonalInfoSection({ personal, contact }: PersonalInfoSectionProps) {
  const details = [
    { label: "Gender", value: personal.gender, icon: User },
    { label: "Marital Status", value: personal.maritalStatus, icon: Heart },
    { label: "Nationality", value: personal.nationality, icon: Flag },
    { label: "Religion", value: personal.religion, icon: Sparkles },
    { label: "NRC No", value: personal.nrcNo, icon: IdCard },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 border-b border-zinc-200 pb-2 dark:border-zinc-800">
        <User className="h-5 w-5 text-sky-500" />
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Personal Information
        </h2>
      </div>

      <div className="space-y-3 rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-xs transition-all dark:border-zinc-800/80 dark:bg-zinc-900/60 print:border-zinc-200 print:p-2">
        <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-2">
          {details.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="space-y-0.5">
                <span className="flex items-center gap-1 font-medium text-zinc-500 dark:text-zinc-400">
                  <Icon className="h-3 w-3 text-zinc-400" />
                  {item.label}
                </span>
                <p className="font-semibold text-zinc-800 dark:text-zinc-200">{item.value}</p>
              </div>
            );
          })}
        </div>

        <div className="space-y-2 border-t border-zinc-100 pt-3 text-xs dark:border-zinc-800">
          <div>
            <span className="flex items-center gap-1 font-medium text-zinc-500 dark:text-zinc-400">
              <Home className="h-3 w-3 text-zinc-400" />
              Current Address:
            </span>
            <p className="mt-0.5 text-zinc-700 dark:text-zinc-300">{contact.currentAddress}</p>
          </div>

          <div>
            <span className="flex items-center gap-1 font-medium text-zinc-500 dark:text-zinc-400">
              <MapPin className="h-3 w-3 text-zinc-400" />
              Permanent Address:
            </span>
            <p className="mt-0.5 text-zinc-700 dark:text-zinc-300">{contact.address}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
