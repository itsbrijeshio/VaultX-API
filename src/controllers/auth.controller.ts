import { Request, Response } from "express";
import { UserService } from "../services";
import { response, signCookie } from "../utils";
import { AuthRequest } from "../types";

class AuthController extends UserService {
  constructor() {
    super();
  }

  handleRegister = async (req: Request, res: Response) => {
    const user = await this.register(req.body);
    response(res, 201, { user });
  };

  handleLogin = async (req: Request, res: Response) => {
    const user = await this.login(req.body);
    const accessToken = signCookie(res, user._id);
    response(res, 200, null, { accessToken });
  };

  handleLogout = async (req: Request, res: Response) => {
    res.clearCookie("access_token");
    response(res, 200, { message: "Logout successful" });
  };

  handleGetMe = async (req: AuthRequest, res: Response) => {
    const user = await this.getMe(req.auth._id);
    response(res, 200, { user });
  };
}

export default AuthController;
