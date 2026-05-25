import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import {
  IMerchant,
  MerchantStatus,
} from "@payment-gateway/domain/merchant.entity";
import { PersonType } from "@payment-gateway/domain/types";
import { Optional } from "sequelize";

interface MerchantAttributes extends IMerchant {}
interface MerchantCreationAttributes extends Optional<
  MerchantAttributes,
  "id"
> {}

@Table({
  tableName: "merchants",
  timestamps: true,
  paranoid: true,
})
export class MerchantModel extends Model<
  MerchantAttributes,
  MerchantCreationAttributes
> implements IMerchant {
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.STRING)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  phone: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  personType: PersonType;

  @AllowNull(false)
  @Column(DataType.STRING)
  documentNumber: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  status: MerchantStatus;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt?: Date;
}
