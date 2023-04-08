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

@ObjectType()
@Entity()
export class Campaign extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [Voucher])
  @OneToMany(() => Voucher, (voucher) => voucher.campaign)
  vouchers: Voucher[];

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @IsDate()
  @CreateDateColumn()
  createdAt: Date;

  @Field({ defaultValue: null, nullable: true })
  @Column({ default: null, nullable: true })
  @IsDate()
  endsAt: Date;
}
