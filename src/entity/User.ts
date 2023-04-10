import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Voucher } from "./Voucher";
import { Campaign } from "./Campaign";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @Column({ default: null, nullable: true })
  ip: string;

  @Column({ default: "USER" })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Voucher, (voucher) => voucher.usedBy)
  vouchers: Voucher[];

  @OneToMany(() => Campaign, (campaign) => campaign.createdBy)
  campaigns: Campaign[];
}
