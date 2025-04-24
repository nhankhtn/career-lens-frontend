import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "@/types/socket";
import CookieHelper from "@/utils/cookie-helper";
import { HOST } from "@/utils/api-request";
import { Post } from "@/types/post";

type CustomEventNames =
  | "newPost"
  | "newComment"
  | "postLiked"
  | "postUnliked"
  | "newNotification";

// Khai báo kiểu Socket với các sự kiện tùy chỉnh
type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

export class SocketClient {
  private static socket: AppSocket | null = null;

  static getInstance(): AppSocket {
    if (!this.socket) {
      const token = CookieHelper.getItem("token") as string;
      this.socket = io(HOST, {
        auth: {
          token: token,
        },
      });

      this.socket.on("connect", () => {
        console.log("Connected to Socket.IO server");
      });

      this.socket.on("connect_error", (error) => {
        console.error("Socket.IO connection error:", error);
      });
    }
    return this.socket;
  }

  // static on<Event extends CustomEventNames>(
  //   event: Event,
  //   callback: ServerToClientEvents[Event],
  // ): void {
  //   this.getInstance().on(event, callback);
  // }

  static on(event: "newPost", callback: (post: Post) => void): void;
  static on(event: "newComment", callback: (comment: Comment) => void): void;
  static on(
    event: "postLiked" | "postUnliked",
    callback: (data: { postId: string; like_count: number }) => void,
  ): void;
  static on(
    event: "newNotification",
    callback: (notification: Notification) => void,
  ): void;

  static on(event: CustomEventNames, callback: (...args: any[]) => void): void {
    this.getInstance().on(event, callback);
  }

  static emit<Event extends keyof ClientToServerEvents>(
    event: Event,
    ...args: Parameters<ClientToServerEvents[Event]>
  ): void {
    this.getInstance().emit(event, ...args);
  }

  static disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}
