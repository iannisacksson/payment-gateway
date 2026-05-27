import { IMerchant } from '@payment-gateway/domain/merchant.entity';
import {
  Pagination,
  TPaginationResponse,
} from '@payment-gateway/shared/pagination';

export interface IMerchantRepository {
  /**
   * Finds a merchant by its ID.
   * @param id The ID of the merchant.
   * @returns A promise that resolves to the merchant if found, or null if not found.
   */
  findById(id: string): Promise<IMerchant | null>;

  /**
   * Finds a merchant by its email.
   * @param email The email of the merchant.
   * @returns A promise that resolves to the merchant if found, or null if not found.
   */
  findByEmail(email: string): Promise<IMerchant | null>;

  /**
   * Finds a merchant by its document number.
   * @param documentNumber The document number of the merchant.
   * @returns A promise that resolves to the merchant if found, or null if not found.
   */
  findByDocumentNumber(documentNumber: string): Promise<IMerchant | null>;

  /**
   * Creates a new merchant.
   * @param merchant The merchant to create.
   * @returns A promise that resolves when the merchant is created.
   */
  create(merchant: IMerchant): Promise<IMerchant>;

  /**
   * Updates an existing merchant.
   * @param merchant The merchant to update.
   * @returns A promise that resolves when the merchant is updated.
   */
  update(merchant: IMerchant): Promise<void>;

  /**
   * Deletes a merchant by its ID.
   * @param id The ID of the merchant to delete.
   * @returns A promise that resolves when the merchant is deleted.
   */
  delete(id: string): Promise<void>;

  /**
   * Finds all merchants.
   * @returns A promise that resolves to an array of all merchants.
   */
  findAll(pagination: Pagination): Promise<TPaginationResponse<IMerchant>>;
}
