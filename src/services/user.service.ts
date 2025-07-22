import { hash, verify } from "argon2";
import { User } from "../models";
import { ApiError } from "../utils";
import { LoginProps, RegisterProps, UserRes } from "../types";

class UserService {
  private User = User;

  private sanitize = (user: any): UserRes => {
    const { password, __v, ...sanitizedUser } =
      user?.toJSON?.() || user?.toObject?.() || user;
    return sanitizedUser;
  };

  private hashPass = async (password: string): Promise<string> => {
    return await hash(password);
  };

  private verifyPass = async (
    hash: string,
    password: string
  ): Promise<boolean> => {
    return await verify(hash, password);
  };

  private isEmailUnique = async (email: string): Promise<boolean> => {
    const user = await this.User.findOne({ email });
    if (user) {
      throw new ApiError({
        status: "failed",
        type: "Conflict",
        code: 409,
        message: "Email already exists",
      });
    }
    return !!user;
  };

  public register = async (userBody: RegisterProps): Promise<UserRes> => {
    await this.isEmailUnique(userBody.email);

    userBody.password = await this.hashPass(userBody.password);
    const user = await this.User.create(userBody);
    return this.sanitize(user);
  };

  public login = async (userBody: LoginProps): Promise<UserRes> => {
    const user = await this.User.findOne({ email: userBody.email });
    if (!user) {
      throw new ApiError({
        status: "failed",
        type: "NotFound",
        code: 404,
        message: "Invalid credentials",
      });
    }
    const isPassValid = await this.verifyPass(user.password, userBody.password);
    if (!isPassValid) {
      throw new ApiError({
        status: "failed",
        type: "NotFound",
        code: 404,
        message: "Invalid credentials",
      });
    }
    return this.sanitize(user);
  };

  public getMe = async (id: string): Promise<UserRes> => {
    const user = await this.User.findById(id);
    if (!user) {
      throw new ApiError({
        status: "failed",
        type: "Unauthorized",
        code: 401,
        message: "You are not logged in.",
      });
    }
    return this.sanitize(user);
  };
}

export default UserService;
