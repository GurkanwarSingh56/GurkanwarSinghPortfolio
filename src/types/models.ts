// Unified Firestore Data Models for the Living Portfolio

export interface BaseDocument {
  id: string; // Firestore document ID
  slug: string;
  published: boolean;
  order: number;
  createdAt: number | null; // Firebase ServerTimestamp serialized to millis
  updatedAt: number | null; // Firebase ServerTimestamp serialized to millis
}

export interface SEOMetadata {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string; // Firebase Storage URL
}

export interface ProjectFeature {
  title: string;
  description: string;
  importance?: "high" | "medium" | "low" | string;
  screenshot?: string;
  technicalDetails?: string;
}

export interface ProjectTechnology {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "AI" | "Infrastructure" | "Other" | string;
  whyChosen?: string;
  howUsed?: string;
}

export interface ProjectArchitecture {
  architectureDescription?: string;
  architectureDiagram?: string;
  components?: { name: string; description: string }[];
  dataFlow?: string;
}

export interface ProjectEngineering {
  challenges?: string[];
  solutions?: string[];
  security?: string;
  performance?: string;
  testing?: string;
  deployment?: string;
}

export interface ProjectLearning {
  lessonsLearned?: string[];
  mistakes?: string[];
  futureImprovements?: string[];
}

export interface ProjectMedia {
  screenshots?: { url: string; altText?: string; caption?: string }[];
  videos?: { url: string; title?: string }[];
  thumbnails?: string[];
  architectureImages?: string[];
}

export interface ProjectModel extends BaseDocument, SEOMetadata {
  // 1. BASIC INFORMATION
  title: string;
  subtitle?: string;
  category: string;
  featured: boolean;
  status?: "Completed" | "In Progress" | "Planned" | string;
  startDate?: string;
  endDate?: string;

  // 2. LINKS
  liveDemo?: string;
  github?: string;
  documentation?: string;
  videoDemo?: string;

  // 3. PROJECT STORY
  overview?: string;
  problem?: string;
  motivation?: string;
  solution?: string;
  targetUsers?: string[];

  // 4. TECHNOLOGY
  techStack?: ProjectTechnology[];

  // 5. FEATURES
  features?: ProjectFeature[];

  // 6. ARCHITECTURE
  architecture?: ProjectArchitecture;

  // 7. ENGINEERING
  engineering?: ProjectEngineering;

  // 8. LEARNING
  learning?: ProjectLearning;

  // 9. MEDIA
  media?: ProjectMedia;
  
  // 10 & 11 (SEO & METADATA) are inherited from BaseDocument and SEOMetadata
}

export interface TimelineModel extends BaseDocument {
  year: string;
  title: string;
  subtitle: string;
  iconName: string;
  bgGradient: string;
  summary: string;
  keyHighlights: string[];
  media: {
    photos: { url: string; altText: string }[];
  };
}

export interface LeadershipModel extends BaseDocument {
  role: string;
  organization: string;
  startDate: string; // ISO string or specific format
  endDate?: string;  // null if current
  description: string;
  impactMetrics?: string[]; // Strictly optional, must be verified
  relatedLinks?: { label: string; url: string }[];
}

export interface TeachingModel extends BaseDocument {
  courseName: string;
  institution: string;
  role: "Instructor" | "Teaching Assistant" | "Guest Lecturer" | string;
  semester: string;
  studentsReached?: number; // Strictly optional, must be verified
  feedbackScore?: number; // Strictly optional, out of 5.0
  syllabusLink?: string;
}

export interface CertificateModel extends BaseDocument {
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  category: string;
  skills: string[];
}

export interface SiteSettingsModel {
  // Site settings usually only have one document (e.g. "global")
  id: string;
  isHiring: boolean;
  heroText: string;
  currentStatus: string; // e.g. "Building X at Y"
  resumeUrl?: string; // Firebase Storage URL
  maintenanceMode: boolean;
  updatedAt: number | null;
}
