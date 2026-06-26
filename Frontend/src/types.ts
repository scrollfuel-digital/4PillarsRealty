export interface Project {
  id: string;
  name: string;
  slug: string;
  type: "plot" | "apartment" | "township" | "upcoming";
  location: string;
  description: string;
  details: string[];
  specs: {
    label: string;
    value: string;
  }[];
  highlights: string[];
  amenities: string[];
  acres?: string;
  totalUnits?: string;
  priceRange: string;
  image: string;
  gallery: string[];
  coordinate: { x: number; y: number };
  mapHotspot: string;
  phone?: string; // ← added: optional contact number for "Call" CTA
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
  isLoggedIn: boolean;
  savedProjects: string[]; // Slugs of saved projects
}

export interface SearchHistoryItem {
  id: string;
  term: string;
  timestamp: string;
  category?: string;
}

export interface Inquiry {
  id?: string;
  name: string;
  email: string;
  phone: string;
  projectSlug: string;
  message: string;
  dateCreated?: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
}

export interface Notification {
  id: string;
  type: "info" | "success" | "alert";
  message: string;
  timestamp: string;
  projectSlug?: string;
}

export interface AppAccessibility {
  textSize: "sm" | "md" | "lg" | "xl";
  highContrast: boolean;
}
