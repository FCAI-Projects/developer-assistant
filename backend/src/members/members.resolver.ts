import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { MembersService } from './members.service';
import { Member, MemberDocument } from './entities/member.entity';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';
import { UsersService } from 'src/users/users.service';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

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

    const userInProject = await this.membersService.findUserInProject(
      inviteMemberInput.user,
      inviteMemberInput.project,
    );
    if (userInProject) {
      throw new HttpException(
        'User Already In Project',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.membersService.create(inviteMemberInput);
  }

  @Query(() => [Member], { name: 'invitations' })
  @UseGuards(JwtAuthGuard)
  async getUserInvitations(
    @Context('req') context: any,
  ): Promise<MemberDocument[]> {
    return await this.membersService.filter({ user: context.user._id });
  }

  @Query(() => [Member])
  async filterMembers(
    @Args('filter') filter: UpdateMemberInput,
  ): Promise<MemberDocument[]> {
    return await this.membersService.filter(filter);
  }

  @Query(() => [Member], { name: 'membersByProject' })
  async findMembersByProject(
    @Args('projectId') projectId: string,
  ): Promise<MemberDocument[]> {
    return await this.membersService.findMembersByProject(projectId);
  }

  @Query(() => Member, { name: 'member' })
  async findById(@Args('id') id: string): Promise<MemberDocument> {
    return await this.membersService.findOne(id);
  }

  @Query(() => Member, { name: 'memberInfo' })
  @UseGuards(JwtAuthGuard)
  async findUserRoleOfProject(
    @Context('req') context: any,
    @Args('project') project: string,
  ): Promise<MemberDocument> {
    return this.membersService.findUserInProject(context.user._id, project);
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
