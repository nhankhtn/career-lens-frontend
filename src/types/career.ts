import { Skill } from "./skill";
import { Topic } from "./topic";

export interface Career {
  id: string;
  name: string;
  description: string;
  average_salary: number;
  growth_rate: number;
  topic_id: Topic | null;
  related_topics: Topic[] | null;
  skills: Skill[];
}
