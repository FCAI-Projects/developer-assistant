import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MembersService } from './members.service';
import { Member, MemberDocument } from './entities/member.entity';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';
import { UsersService } from 'src/users/users.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver(() => Member)
export class MembersResolver {
  constructor(
    private readonly membersService: MembersService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => Member)
  async inviteMember(
    @Args('inviteMemberInput') inviteMemberInput: CreateMemberInput,
  ): Promise<MemberDocument> {
    const user = await this.usersService.findUserByEmail(
      inviteMemberInput.user,
    );
    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    inviteMemberInput.user = user._id;
    return await this.membersService.create(inviteMemberInput);
  }

  @Query(() => [Member])
  async filterMembers(
    @Args('filter') filter: UpdateMemberInput,
  ): Promise<MemberDocument[]> {
    return await this.membersService.filter(filter);
  }

  @Query(() => Member, { name: 'member' })
  async findById(@Args('id') id: string): Promise<MemberDocument> {
    return await this.membersService.findOne(id);
  }

  @Mutation(() => Member)
  async updateMember(
    @Args('id') id: string,
    @Args('updateMemberInput') updateMemberInput: UpdateMemberInput,
  ): Promise<MemberDocument> {
    return await this.membersService.update(id, updateMemberInput);
  }

  @Mutation(() => Member)
  async removeMember(@Args('id') id: string): Promise<MemberDocument> {
    return await this.membersService.remove(id);
  }
}
