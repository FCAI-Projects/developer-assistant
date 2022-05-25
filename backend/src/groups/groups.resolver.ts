import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { GroupsService } from './groups.service';
import { Group } from './entities/group.entity';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';
import { Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Resolver(() => Group)
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  @Mutation(() => Group)
  @UseGuards(JwtAuthGuard)
  async createGroup(
    @Args('createGroupInput') createGroupInput: CreateGroupInput,
    @Context('req') context: any,
  ) {
    return await this.groupsService.create(createGroupInput, context.user._id);
  }

  @Mutation(() => Group)
  async inviteToGroup(
    @Args('groupId') groupId: string,
    @Args('memberId') memberId: string,
  ) {
    return await this.groupsService.inviteMember(groupId, memberId);
  }

  @Query(() => [Group], { name: 'groups' })
  async findAll() {
    return await this.groupsService.findAll();
  }

  @Query(() => Group, { name: 'group' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.groupsService.findOne(id);
  }

  @Mutation(() => Group)
  async updateGroup(
    @Args('updateGroupInput') updateGroupInput: UpdateGroupInput,
  ) {
    return await this.groupsService.update(
      updateGroupInput.id,
      updateGroupInput,
    );
  }

  @Mutation(() => Group)
  async removeGroup(@Args('id', { type: () => String }) id: string) {
    return await this.groupsService.remove(id);
  }
}
