import { Request, Response } from "express";

export class VoucherController {
  public async updateVoucher(req: Request, res: Response) {}
  public async getVoucher(req: Request, res: Response) {}
  public async validateVoucher(req: Request, res: Response) {
    res.status(200).json({ msg: "success" });
  }
  public async useVoucher(req: Request, res: Response) {}
  public async deleteVoucher(req: Request, res: Response) {}
  public async getVouchers(req: Request, res: Response) {}
}
