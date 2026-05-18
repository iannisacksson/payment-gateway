import { CreateMerchantUseCase } from "@payment-gateway/application/usecases/merchant/create.usecase";
import { Merchant } from "@payment-gateway/domain/merchant.entity";
import { Request, Response } from "express";

export class CreateMerchantController {
  constructor() {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const merchantRepository = new MerchantRepository();
      const usecase = new CreateMerchantUseCase(merchantRepository);
      const { name, email, documentNumber, phone, personType } = request.body;
      const merchant = new Merchant({
        name,
        email,
        documentNumber,
        phone,
        personType,
      });
      await usecase.execute(merchant);
      return response
        .status(201)
        .json({ message: "Merchant created successfully" });
    } catch (error: unknown) {
      return response.status(400).json({
        error: (error as Error).message || "Failed to create merchant",
      });
    }
  }
}
