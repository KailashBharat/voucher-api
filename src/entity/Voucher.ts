import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";
import { Campaign } from "./Campaign";

@Entity()
export class Voucher extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  campaign: Campaign;

  @ManyToOne(() => Campaign, (campaign) => campaign.vouchers)
  _campaign: Campaign;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: null, nullable: true })
  usedAt: Date;

  @Column({ default: null, nullable: true })
  usedBy: String;
}
