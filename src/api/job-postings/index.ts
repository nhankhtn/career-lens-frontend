import { apiGet } from "@/utils/api-request";

export interface PositionStats {
  name: string;
  count: number;
}

export interface CompanyJobStats {
  id: string;
  name: string;
  job_count: number;
  industry: string;
  location: string;
  photo_url: string;
  website_urls: string[];
  size: string;
}

export interface ExperienceLevelStats {
  labels: string[];
  data: number[];
  total_jobs: number;
}

export interface SkillDemandStats {
  skillName: string;
  recruitmentDemandPercentage: number;
  applicantPercentage: number;
}

export interface JobPostingsHeatmap {
  months: string[];
  weeks: string[];
  data: Array<{
    count: number;
    salaryRange: string;
    color: string;
  }>;
  salaryRanges: Array<{
    label: string;
    color: string;
  }>;
  year: number;
}

export class JobPostingsApi {
  static async getPositionStats(limit?: number): Promise<PositionStats[]> {
    return await apiGet("/job-postings/position-stats", { limit });
  }

  static async getTopCompaniesByJobPostings(
    limit?: number,
  ): Promise<CompanyJobStats[]> {
    return await apiGet("/job-postings/company", { limit });
  }

  static async getJobPostingsByExperienceLevel(): Promise<ExperienceLevelStats> {
    return await apiGet("/job-postings/experience-stats");
  }

  static async getTopSkillsDemandStats(
    limit?: number,
  ): Promise<SkillDemandStats[]> {
    return await apiGet("/job-postings/skills-demand-stats", { limit });
  }

  static async getJobPostingsHeatmap(
    year?: number,
  ): Promise<JobPostingsHeatmap> {
    return await apiGet("/job-postings/heatmap", { year });
  }
}
