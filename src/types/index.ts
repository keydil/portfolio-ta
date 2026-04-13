export interface NavItem {
  label: string;
  href: string;
}

export interface SkillCard {
  icon: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

export interface Project {
  icon: string;
  category: string;
  name: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  stats?: { label: string; value: string }[];
}

export interface Testimonial {
  initials: string;
  company: string;
  companyStyle?: string;
  quote: string;
  name: string;
  role: string;
}

export interface Certificate {
  icon: string;
  issuer: string;
  name: string;
  year: string;
  credential?: string;
  highlighted: boolean;
}

export interface Education {
  icon: string;
  institution: string;
  degree: string;
  year: string;
  gpa?: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string; badge?: string }[];
}

export interface TechStack {
  category: string;
  items: { name: string; color: string; bg: string }[];
}
