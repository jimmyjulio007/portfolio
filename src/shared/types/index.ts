export interface Project {
  id: string;
  title: string;
  description: string;
  details: string;
  category: string;
  year: number;
  tags: string[];
  link?: string;
}
