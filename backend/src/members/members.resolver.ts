import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MembersService } from './members.service';
import { Member, MemberDocument } from './entities/member.entity';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';

@Resolver(() => Member)
export class MembersResolver {
  constructor(private readonly membersService: MembersService) {}

  @Mutation(() => Member)
  async addMember(
    @Args('createMemberInput') createMemberInput: CreateMemberInput,
  ): Promise<MemberDocument> {
    return this.membersService.create(createMemberInput);
  }

  @Query(() => [Member])
  async filterMembers(
    @Args('filter') filter: UpdateMemberInput,
  ): Promise<MemberDocument[]> {
    return this.membersService.filter(filter);
  }

  @Query(() => Member, { name: 'member' })
  async findById(@Args('id') id: string): Promise<MemberDocument> {
    return this.membersService.findOne(id);
  }

  @Mutation(() => Member)
  async updateMember(
    @Args('id') id: string,
    @Args('updateMemberInput') updateMemberInput: UpdateMemberInput,
  ): Promise<MemberDocument> {
    return this.membersService.update(id, updateMemberInput);
  }

  @Mutation(() => Member)
  async removeMember(@Args('id') id: string): Promise<MemberDocument> {
    return this.membersService.remove(id);
  }
}
