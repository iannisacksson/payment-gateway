import { Request, Response } from "express";
import { CreateMerchantUseCase } from "@payment-gateway/application/usecases/merchant/create.usecase";
import { Merchant } from "@payment-gateway/domain/merchant.entity";
import { MerchantRepository } from "@payment-gateway/infra/repositories/merchant.repository";

export class CreateMerchantController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const merchantRepository = new MerchantRepository();
      const usecase = new CreateMerchantUseCase(merchantRepository);
      const { name, email, document_number, phone, person_type } = request.body;
      const merchant = new Merchant({
        name,
        email,
        documentNumber: document_number,
        phone,
        personType: person_type,
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
