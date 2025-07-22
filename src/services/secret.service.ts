import { Secret } from "../models";
import { ApiError } from "../utils";
import { decrypt, encrypt } from "../utils/crypto";
import { QueryProps, SecretProps, SecretRes } from "../types";

export class SecretService {
  private Secret = Secret;

  private sanitize = (secret: any): SecretRes => {
    const { __v, ...sanitizedSecret } =
      secret?.toJSON?.() || secret?.toObject?.() || secret;
    return sanitizedSecret;
  };

  private isSecretUnique = async (
    vault: string,
    label: string
  ): Promise<boolean> => {
    const secret = await this.Secret.findOne({ vault, label });

    if (secret) {
      throw new ApiError({
        status: "failed",
        type: "Conflict",
        code: 409,
        message: "Secret already exists",
      });
    }
    return !!secret;
  };

  public create = async (
    user: string,
    vault: string,
    secretBody: SecretProps
  ): Promise<SecretRes> => {
    await this.isSecretUnique(vault, secretBody.label);
    secretBody.user = user;
    secretBody.vault = vault;
    secretBody.value = encrypt(secretBody.value);
    const secret = await this.Secret.create(secretBody);
    secret.value = "";
    return this.sanitize(secret);
  };

  public getOne = async (
    user: string,
    secretId: string
  ): Promise<SecretRes> => {
    const secret = await this.Secret.findOne({ user, _id: secretId });
    if (!secret) {
      throw new ApiError({
        status: "failed",
        type: "NotFound",
        code: 404,
        message: "Secret not found",
      });
    }
    secret.value = decrypt(secret.value);
    return this.sanitize(secret);
  };

  public getAllByUser = async (
    user: string,
    query: QueryProps
  ): Promise<SecretRes[]> => {
    const where: any = { user, $or: [] };
    if (query?.q?.trim()) {
      where.$or = [
        { label: { $regex: query.q, $options: "i" } },
        { key: { $regex: query.q, $options: "i" } },
      ];
    }

    const skip = (query.page - 1) * query.limit;
    const secrets = await this.Secret.find(where)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(query.limit)
      .select("-__v -user -value -updatedAt");
    return secrets.map(this.sanitize);
  };

  public getAllByVault = async (
    user: string,
    vault: string,
    query: QueryProps
  ): Promise<SecretRes[]> => {
    const where: any = { user, vault, $or: [] };
    if (query?.q?.trim()) {
      where.$or = [
        { label: { $regex: query.q, $options: "i" } },
        { key: { $regex: query.q, $options: "i" } },
      ];
    }

    const skip = (query.page - 1) * query.limit;
    const secrets = await this.Secret.find(where)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(query.limit)
      .select("-__v -user -value -vault -updatedAt");

    return secrets.map(this.sanitize);
  };

  public update = async (
    user: string,
    secretId: string,
    secretBody: SecretProps
  ): Promise<SecretRes> => {
    await this.isSecretUnique(secretBody.vault, secretBody.label);
    const secret = await this.Secret.findOneAndUpdate(
      { user, _id: secretId },
      secretBody,
      { new: true }
    );
    if (!secret) {
      throw new ApiError({
        status: "failed",
        type: "NotFound",
        code: 404,
        message: "Secret not found",
      });
    }
    secret.value = "";
    return this.sanitize(secret);
  };

  public delete = async (
    user: string,
    secretId: string
  ): Promise<SecretRes> => {
    const secret = await this.Secret.findOneAndDelete({ user, _id: secretId });
    if (!secret) {
      throw new ApiError({
        status: "failed",
        type: "NotFound",
        code: 404,
        message: "Secret not found",
      });
    }
    secret.value = "";
    return this.sanitize(secret);
  };
}

export default SecretService;
