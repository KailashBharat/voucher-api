import { Query } from "type-graphql";
import { myDataSource } from "@/app-data-source";
import { User } from "@/entity/User";
import { UserDto } from "../dto/user.node";

export class UsersResolver {
  private readonly userRepo = myDataSource.getRepository(User);

  @Query(() => [UserDto])
  async users(): Promise<UserDto[] | null> {
    const user = await this.userRepo.find({relations: ["campaigns", "campaigns.createdBy", "vouchers", "vouchers.usedBy"]});
    return user;
  }
}
