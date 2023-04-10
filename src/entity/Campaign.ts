import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";
import { Voucher } from "./Voucher";
import { IsDate, isDate } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import { Service } from "typedi";
@Service()
@Entity()
export class Campaign extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Voucher, (voucher) => voucher.campaign)
  vouchers: Voucher[];

  @Column()
  description: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: null, nullable: true })
  endsAt: Date;
}
