import { IsBoolean, IsEmail, IsNumber, IsPositive } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class UserInput {
  @Field()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field(() => Number)
  @IsNumber()
  @IsPositive()
  age: number;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  isAdmin?: boolean;
}
