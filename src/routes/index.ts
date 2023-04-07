import { Router } from "express";
import { initVoucherRoutes } from "./voucher";

export const router = Router();

initVoucherRoutes(router);
