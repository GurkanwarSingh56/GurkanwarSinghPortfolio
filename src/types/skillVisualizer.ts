/**
 * Premium Skill Visualizer Data Models
 * Supports 3D Constellation Nodes, Radial Radar Scanner, and Skill Trees without progress bars.
 */

export type TechCategory = "frontend" | "backend" | "ai_ml" | "database" | "cloud_devops";

export interface TechnologySpec {
  id: string;
  name: string;
  category: TechCategory;
  tagline: string;
  iconName: string;
  colorHex: string;
  nodeSize: number; // For 3D canvas rendering
  orbitalRadius: number; // For radar mode
  orbitAngleDegrees: number;

  // Deep-Dive Explanation
  explanation: string;
  whyChosen: string;
  productionUseCases: string[];
  keyFeatures: string[];
  masteryTier: "Architect" | "Principal" | "Expert" | "Advanced";
  yearsOfExperience: string;
  relatedTechIds: string[]; // For constellation line links
}

export interface SkillCategoryGroup {
  categoryKey: TechCategory;
  title: string;
  accentColor: string;
  technologies: TechnologySpec[];
}
