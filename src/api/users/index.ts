import type { User } from "@/types/user";
import { apiDelete, apiGet, apiPatch, apiPost } from "@/utils/api-request";

type SignInResponse = Promise<{
  data: User;
  token: string;
}>;

type LoginFirebaseRequest = { id_token: string };

export class UsersApi {
  static async loginFirebase(request: LoginFirebaseRequest): SignInResponse {
    return await apiPost("/users/login", request);
  }

  static async me(): Promise<User> {
    return await apiGet("/users/info");
  }

  static async updatePassword(payload: {
    old_password: string;
    new_password: string;
  }): Promise<User> {
    return await apiPost("/users/password", payload);
  }
}
