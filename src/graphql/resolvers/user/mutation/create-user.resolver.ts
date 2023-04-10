import { Arg, Mutation, Resolver } from "type-graphql";
import { UserInput } from "../dto";
import { myDataSource } from "@/app-data-source";
import { User } from "@/entity/User";
import { UserDto } from "../dto/user.node";

@Resolver()
export class CreateUserResolver {
  private readonly userRepo = myDataSource.getRepository(User);

  @Mutation(() => UserDto)
  async createUser(@Arg("input") input: UserInput): Promise<UserDto> {
    const { age, email, name, isAdmin } = input;
    const user = await this.userRepo
      .create({ age: +age, email, name, ...(isAdmin ? { role: "ADMIN" } : {}) })
      .save();
    return user;
  }
}
