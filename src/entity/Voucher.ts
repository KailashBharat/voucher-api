import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";
import { Campaign } from "./Campaign";
import { User } from "./User";

@Entity()
export class Voucher extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Campaign, (campaign) => campaign.vouchers)
  campaign: Campaign;
  
  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: null, nullable: true })
  usedAt: Date;
  
  // @Column({ default: null, nullable: true })
  @ManyToOne(() => User, (user) => user.vouchers)
  usedBy: User;
}
