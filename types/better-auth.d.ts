import type { User } from "better-auth";

declare module "better-auth" {
  interface User {
    role: string;
    companyId: string;
    companyName: string;
  }
}
