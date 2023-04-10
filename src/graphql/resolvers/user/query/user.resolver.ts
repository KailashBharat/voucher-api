import { Arg, Mutation, Query } from "type-graphql";
import { UserInput } from "../dto/user.input";
import { myDataSource } from "@/app-data-source";
import { User } from "@/entity/User";
import { UserDto } from "../dto/user.node";

export class UserResolver {
  private readonly userRepo = myDataSource.getRepository(User);

  @Query(() => UserDto)
  async getUser(@Arg("name") name: string): Promise<UserDto | null> {
    const user = await this.userRepo.findOne({ where: { name } });
    return user;
  }
}
