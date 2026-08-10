/**
 * Life Timeline Milestone Data Model
 * Supports Videos, Photos, Certificates, Projects, Memories & Animations.
 */

export interface MediaPhoto {
  url: string;
  caption: string;
  altText: string;
}

export interface MediaVideo {
  url: string;
  posterUrl: string;
  title: string;
  duration: string;
}

export interface CertificateSpec {
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  verificationUrl?: string;
  badgeUrl?: string;
}

export interface MemorySpec {
  headline: string;
  reflection: string;
  impact: string;
}

export interface LifeMilestone {
  year: string; // "2003" | "2022" | "2024" | "2025" | "2026" | "Future"
  title: string;
  subtitle: string;
  tagline: string;
  iconName: string;
  accentColor: string;
  bgGradient: string;
  badgeText: string;
  summary: string;

  // Media Collections
  photos: MediaPhoto[];
  videos: MediaVideo[];
  certificates: CertificateSpec[];
  projects: { name: string; category: string; linkUrl: string; description: string }[];
  memories: MemorySpec[];
  keyHighlights: string[];
}
