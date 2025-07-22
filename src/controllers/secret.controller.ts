import { Response } from "express";
import { SecretService } from "../services";
import { response } from "../utils";
import { AuthRequest } from "../types";

class SecretController extends SecretService {
  constructor() {
    super();
  }

  handleCreateSecret = async (req: AuthRequest, res: Response) => {
    const secret = await this.create(
      req.auth._id,
      req.params.vaultId,
      req.body
    );
    response(res, 201, { secret });
  };

  handleGetSecretsByUser = async (req: AuthRequest, res: Response) => {
    const { q } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const secrets = await this.getAllByUser(req.auth._id, {
      q,
      page,
      limit,
    });
    response(res, 200, { secrets });
  };

  handleGetSecretsByVault = async (req: AuthRequest, res: Response) => {
    const { q } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const secrets = await this.getAllByUser(req.auth._id, {
      q,
      page,
      limit,
    });
    response(res, 200, { secrets });
  };

  handleGetSecret = async (req: AuthRequest, res: Response) => {
    const secret = await this.getOne(req.auth._id, req.params.secretId);
    response(res, 200, { secret });
  };

  handleUpdateSecret = async (req: AuthRequest, res: Response) => {
    const secret = await this.update(
      req.auth._id,
      req.params.secretId,
      req.body
    );
    response(res, 200, { secret });
  };

  handleDeleteSecret = async (req: AuthRequest, res: Response) => {
    const secret = await this.delete(req.auth._id, req.params.secretId);
    response(res, 200, { secret });
  };
}

export default SecretController;
