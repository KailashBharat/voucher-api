import { Arg, Mutation, Resolver } from "type-graphql";
import { myDataSource } from "@/app-data-source";
import { User } from "@/entity/User";

@Resolver()
export class DeleteUserResolver {
  private readonly userRepo = myDataSource.getRepository(User);

  @Mutation(() => Number)
  async deleteUser(@Arg("id") id: string): Promise<number | null| undefined> {
    const user = await this.userRepo
      .delete({id} )
    return user.affected;
  }
}
