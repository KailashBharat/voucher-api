import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Voucher {
  @Field((type) => String)
  id: string;

  @Field()
  voucher: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  campaign: String;

  @Field()
  createdAt: Date;

  @Field()
  usedAt: Date;

  @Field()
  usedBy: String;

}
