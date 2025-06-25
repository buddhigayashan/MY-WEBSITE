export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  videoThumbnail: string;
  poster?: string; // ✅ added this for video poster support
  tools: string[];
  content: string;
  images: string[];
  features?: string[];
  link?: string;
  githubLink?: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: 'design' | 'development' | 'other';
}
