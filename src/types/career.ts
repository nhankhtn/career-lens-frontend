import { Skill } from "./skill";
import { Topic } from "./topic";

export interface Career {
  id: string;
  name: string;
  description: string;
  average_salary: number;
  growth_rate: number;
  topic_id: Topic | null;
  skills: Skill[];
  roadmap: Topic[];
}

export interface CareerList extends Career {
  topic_count: number;
  skill_match_percentage: number;
}
