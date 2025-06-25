export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  videoThumbnail: string;
  poster?: string; // ✅ Added for video poster
  tools: string[];
  content: string;
  images: string[];
  features?: string[];
  githubLink?: string;
  link?: string;
}
