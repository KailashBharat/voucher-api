import { Router } from "express";
import { VoucherController } from "../controllers/voucher";

const voucherController = new VoucherController();

export const initVoucherRoutes = (router: Router) => {
  router.get("/validate-voucher", voucherController.validateVoucher);
};
