import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Voucher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
