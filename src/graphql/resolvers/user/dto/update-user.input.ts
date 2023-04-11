import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsPositive,
  IsString,
} from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsString()
  id: string;

  @Field({ nullable: true })
  @IsEmail()
  email?: string;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  @IsPositive()
  age?: number;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  isAdmin?: boolean;
}
