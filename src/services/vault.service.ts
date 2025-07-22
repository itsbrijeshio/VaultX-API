import { Vault } from "../models";
import { ApiError } from "../utils";
import { QueryProps, VaultProps, VaultRes } from "../types";

class VaultService {
  private Vault = Vault;

  private sanitize = (vault: any): VaultRes => {
    const { __v, ...sanitizedVault } =
      vault?.toJSON?.() || vault?.toObject?.() || vault;
    return sanitizedVault;
  };

  private isVaultUnique = async (
    user: string,
    label: string
  ): Promise<boolean> => {
    const vault = await this.Vault.findOne({ user, label });
    if (vault) {
      throw new ApiError({
        status: "failed",
        type: "Conflict",
        code: 409,
        message: "Vault already exists",
      });
    }
    return !!vault;
  };

  public create = async (
    user: string,
    vaultBody: VaultProps
  ): Promise<VaultRes> => {
    vaultBody.user = user;
    await this.isVaultUnique(user, vaultBody.label);

    const vault = await this.Vault.create(vaultBody);
    return this.sanitize(vault);
  };

  public getAll = async (
    user: string,
    query: QueryProps
  ): Promise<VaultRes[]> => {
    const where: any = { user, $or: [] };
    if (query?.q?.trim()) {
      where.$or = [
        { label: { $regex: query.q, $options: "i" } },
        { description: { $regex: query.q, $options: "i" } },
      ];
    }

    const skip = (query.page - 1) * query.limit;
    const vaults = await this.Vault.find(where)
      .skip(skip)
      .limit(query.limit)
      .select("-__v -user -updatedAt");
    return vaults.map(this.sanitize);
  };

  public getOne = async (user: string, id: string): Promise<VaultRes> => {
    const vault = await this.Vault.findOne({ user, _id: id })?.select(
      "-user"
    );
    if (!vault) {
      throw new ApiError({
        status: "failed",
        type: "NotFound",
        code: 404,
        message: "Vault not found",
      });
    }
    return this.sanitize(vault);
  };

  public update = async (
    user: string,
    id: string,
    vaultBody: VaultProps
  ): Promise<VaultRes> => {
    const vault = await this.Vault.findOneAndUpdate(
      { user, _id: id },
      vaultBody,
      { new: true }
    );
    if (!vault) {
      throw new ApiError({
        status: "failed",
        type: "NotFound",
        code: 404,
        message: "Vault not found",
      });
    }
    return this.sanitize(vault);
  };

  public delete = async (user: string, id: string): Promise<VaultRes> => {
    const vault = await this.Vault.findOneAndDelete({ user, _id: id });
    if (!vault) {
      throw new ApiError({
        status: "failed",
        type: "NotFound",
        code: 404,
        message: "Vault not found",
      });
    }
    return this.sanitize(vault);
  };
}

export default VaultService;
