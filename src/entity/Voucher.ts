import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { Campaign } from "./Campaign";
import { User } from "./User";

@Entity()
export class Voucher extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  campaignId: string;

  @ManyToOne(() => Campaign, (campaign) => campaign.vouchers)
  @JoinColumn({ name: "campaignId" })
  campaign: Campaign;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: null, nullable: true })
  usedAt: Date;

  @Column({ nullable: true })
  userId: string;

  @ManyToOne(() => User, (user) => user.vouchers)
  @JoinColumn({ name: "userId" })
  usedBy: User;
}
