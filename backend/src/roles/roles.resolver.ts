import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { Role, RoleDocument } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { HttpException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { MembersService } from 'src/members/members.service';

@Resolver(() => Role)
export class RolesResolver {
  constructor(
    private readonly rolesService: RolesService,
    private readonly membersService: MembersService,
  ) {}

  @Mutation(() => Role)
  async createRole(
    @Args('createRoleInput') createRoleInput: CreateRoleInput,
  ): Promise<RoleDocument> {
    return this.rolesService.create(createRoleInput);
  }

  @Query(() => [Role], { name: 'roles' })
  async findAll(@Args('project') project: string): Promise<RoleDocument[]> {
    return this.rolesService.findAll(project);
  }

  @Query(() => Role, { name: 'role' })
  async findById(@Args('id') id: string): Promise<RoleDocument> {
    return (await this.rolesService.findOne(id)).populate('permissions');
  }

  @Mutation(() => Role)
  async updateRole(
    @Args('id') id: string,
    @Args('updateRoleInput') updateRoleInput: UpdateRoleInput,
  ): Promise<RoleDocument> {
    return this.rolesService.update(id, updateRoleInput);
  }

  @Mutation(() => Role)
  async removeRole(@Args('id') id: string): Promise<RoleDocument> {
    const members = await this.membersService.findAllByRole(id);
    if (members.length > 0) {
      throw new HttpException(
        'Cannot remove role because it is assigned to members',
        403,
      );
    }
    return this.rolesService.remove(id);
  }
}
