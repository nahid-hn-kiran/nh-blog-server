import { IRequestUser } from "../types";
import { NextFunction, Response, Request } from "express";
import { auth as betterAuth } from "../lib/auth";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

declare global {
  namespace Express {
    interface Request {
      user?: IRequestUser;
    }
  }
}

const authGuard = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await betterAuth.api.getSession({
        headers: req.headers as any,
      });

      if (!session) {
        return res.status(400).json({
          success: false,
          message: "You are not authorized",
        });
      }

      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role as string,
        emailVerified: session.user.emailVerified,
      };

      if (roles.length && !roles.includes(req.user.role as UserRole)) {
        return res.status(403).json({
          error: "Forbidden: Access denied",
        });
      }

      return next();
    } catch (error) {
      console.error("Authentication error interceptor:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

export default authGuard;
