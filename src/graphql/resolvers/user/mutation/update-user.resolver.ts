import { Arg, Mutation, Resolver } from "type-graphql";
import { myDataSource } from "@/app-data-source";
import { User } from "@/entity/User";
import { UpdateResult } from "typeorm";
import { UpdateUserInput } from "../dto/update-user.input";

@Resolver()
export class UpdateUserResolver {
  private readonly userRepo = myDataSource.getRepository(User);

  @Mutation(() => Number)
  async updateUser(@Arg("input") input: UpdateUserInput): Promise<number | null| undefined> {
    const {id, name, email, age, isAdmin} = input
    const user = await this.userRepo
      .update({id},{
        ...(email? {email}: {}),
        ...(name? {name}: {}),
        ...(age? {age}: {}),
        ...(isAdmin? {role: "ADMIN"}: {}),
      } )
    return user.affected;
  }
}
