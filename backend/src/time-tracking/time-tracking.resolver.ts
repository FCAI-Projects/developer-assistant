import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { TimeTrackingService } from './time-tracking.service';
import { TimeTracking } from './entities/time-tracking.entity';
import { CreateTimeTrackingInput } from './dto/create-time-tracking.input';
import { UpdateTimeTrackingInput } from './dto/update-time-tracking.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Resolver(() => TimeTracking)
export class TimeTrackingResolver {
  constructor(private readonly timeTrackingService: TimeTrackingService) {}

  @Query(() => [TimeTracking], {
    name: 'userTimeTracking',
    description: 'Get all time tracking for user',
  })
  async findAllByUser(@Args('user', { type: () => String }) user: string) {
    return await this.timeTrackingService.filter({ user });
  }

  @Query(() => [TimeTracking], {
    name: 'taskTimeTracking',
    description: 'Get all time tracking for a task',
  })
  async findAllByTask(@Args('task', { type: () => String }) task: string) {
    return await this.timeTrackingService.filter({ task });
  }

  @Query(() => TimeTracking, {
    name: 'taskUserTimeTracking',
    description: 'Get all task time tracking for a user',
    nullable: true,
  })
  @UseGuards(JwtAuthGuard)
  async findOneByTaskForUser(
    @Context('req') context: any,
    @Args('task', { type: () => String }) task: string,
  ) {
    return await this.timeTrackingService.findOneByTask(task, context.user._id);
  }

  @Mutation(() => TimeTracking)
  @UseGuards(JwtAuthGuard)
  async startTimeTracking(
    @Context('req') context: any,
    @Args('task', { type: () => String }) task: string,
  ) {
    const timeTracking = await this.timeTrackingService.findOneByTask(
      task,
      context.user._id,
    );

    if (timeTracking) {
      return await this.timeTrackingService.startTimeForTask(
        task,
        context.user._id,
      );
    } else {
      return await this.timeTrackingService.create({
        task,
        user: context.user._id,
        start: new Date(),
      });
    }
  }

  @Mutation(() => TimeTracking)
  @UseGuards(JwtAuthGuard)
  async stopTimeTracking(
    @Context('req') context: any,
    @Args('task', { type: () => String }) task: string,
  ) {
    const timeTracking = await this.timeTrackingService.findOneByTask(
      task,
      context.user._id,
    );

    const startDate = new Date(timeTracking.start);
    const endDate = new Date();

    const diff = endDate.getTime() - startDate.getTime();
    const diffMinutes = Math.round(diff / 60000);
    const duration = diffMinutes + timeTracking.duration;

    const history = {
      start: startDate,
      end: endDate,
      duration: diffMinutes,
    };

    await this.timeTrackingService.pushNewHistory(timeTracking._id, history);

    return await this.timeTrackingService.update(timeTracking._id, {
      duration,
      start: null,
    });
  }

  @Mutation(() => TimeTracking)
  async removeTimeTracking(@Args('id', { type: () => String }) id: string) {
    return await this.timeTrackingService.remove(id);
  }
}
