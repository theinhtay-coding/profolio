export interface ContactInfo {
  address: string;
  currentAddress: string;
  phoneNumbers: string[];
  email: string;
  linkedIn: string;
  linkedInUrl?: string;
  github?: string;
}

export interface PersonalInfo {
  gender: string;
  maritalStatus: string;
  nationality: string;
  religion: string;
  nrcNo: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
}

export interface ProjectItem {
  title: string;
  subtitle?: string;
  description?: string;
  technologies?: string[];
  responsibilities: string[];
}

export interface ExperienceItem {
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  projects: ProjectItem[];
}

export interface CVData {
  name: string;
  title: string;
  avatar?: string;
  resumeUrl?: string;
  summary?: string;
  profile?: string;
  contact: ContactInfo;
  personal: PersonalInfo;
  skills: SkillGroup[];
  education: EducationItem[];
  experience: ExperienceItem[];
}
