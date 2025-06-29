// src/types/express/index.d.ts
import { RoleType } from "../../types";

declare module 'express-serve-static-core' {
 export interface Request {
    user: {
      id: string;
      role: RoleType;
      name: string;
    };
  }
}
