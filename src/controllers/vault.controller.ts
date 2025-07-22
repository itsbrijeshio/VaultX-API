import { Response } from "express";
import { VaultService } from "../services";
import { response } from "../utils";
import { AuthRequest } from "../types";

class VaultController extends VaultService {
  constructor() {
    super();
  }

  handleCreateVault = async (req: AuthRequest, res: Response) => {
    const vault = await this.create(req.auth._id, req.body as any);
    response(res, 201, { vault });
  };

  handleGetVaults = async (req: AuthRequest, res: Response) => {
    const { q } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const vaults = await this.getAll(req.auth._id, { q, page, limit });
    response(res, 200, { vaults });
  };

  handleGetVault = async (req: AuthRequest, res: Response) => {
    const vault = await this.getOne(req.auth._id, req.params.vaultId);
    response(res, 200, { vault });
  };

  handleUpdateVault = async (req: AuthRequest, res: Response) => {
    const vault = await this.update(req.auth._id, req.params.vaultId, req.body);
    response(res, 200, { vault });
  };

  handleDeleteVault = async (req: AuthRequest, res: Response) => {
    const vault = await this.delete(req.auth._id, req.params.vaultId);
    response(res, 200, { vault });
  };
}

export default VaultController;
