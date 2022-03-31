import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NotesService } from './notes.service';
import { Note } from './entities/note.entity';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';

@Resolver(() => Note)
export class NotesResolver {
  constructor(private readonly notesService: NotesService) {}

  @Mutation(() => Note, {name: 'CreateTaskNote'})
  createNote(@Args('createNoteInput') createNoteInput: CreateNoteInput) {
    return this.notesService.create(createNoteInput);
  }

  @Query(() => Note)
  findById(@Args('id', { type: () => String }) id: string) {
    return this.notesService.findById(id);
  }

  // ! check this and test it ...
  @Query(() => Note)
  findByTaskId(@Args('taskId', { type: () => String }) taskId: string) {
    return this.notesService.findByTaskId(taskId);
  }

  // ! check this and test it ...
  @Query(() => Note)
  findByUserId(@Args('userId', { type: () => String }) userId: string) {
    return this.notesService.findByUserId(userId);
  }

  @Mutation(() => Note)
  updateNote(@Args('updateNoteInput') updateNoteInput: UpdateNoteInput) {
    return this.notesService.update(updateNoteInput.id, updateNoteInput);
  }

  @Mutation(() => Note)
  removeNote(@Args('id', { type: () => String }) id: string) {
    return this.notesService.remove(id);
  }
}
