import { ResponseWithTotal } from "@/types";
import { Career } from "@/types/career";
import { apiGet, removeUndefinedKeys } from "@/utils/api-request";

export type GetCareerRequest = {
  offset?: number;
  limit?: number;
  key?: string;
  skill?: string | string[];
  min_salary?: number;
  max_salary?: number;
  major?: string;
};

export class CareerApi {
  static async getCareer(
    request: GetCareerRequest,
  ): Promise<ResponseWithTotal<Career[]>> {
    return await apiGet("/careers", removeUndefinedKeys(request));
  }

  static async getCareerById(id: string): Promise<Career> {
    return await apiGet(`/careers/${id}`);
  }
}
