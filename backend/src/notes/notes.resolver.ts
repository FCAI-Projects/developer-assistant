import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NotesService } from './notes.service';
import { Note, NoteDocument } from './entities/note.entity';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';

@Resolver(() => Note)
export class NotesResolver {
  constructor(private readonly notesService: NotesService) {}

  @Mutation(() => Note)
  async createNote(
    @Args('createNoteInput') createNoteInput: CreateNoteInput,
  ): Promise<NoteDocument> {
    return await this.notesService.create(createNoteInput);
  }

  @Query(() => Note, { name: 'note' })
  async findById(@Args('id') id: string): Promise<NoteDocument> {
    return await this.notesService.findById(id);
  }

  @Query(() => Note)
  async filterNotes(
    @Args('filter') filter: CreateNoteInput,
  ): Promise<NoteDocument> {
    return await this.notesService.filterNotes(filter);
  }

  @Mutation(() => Note)
  async updateNote(
    @Args('id') id: string,
    @Args('updateNoteInput') updateNoteInput: UpdateNoteInput,
  ): Promise<NoteDocument> {
    return await this.notesService.update(id, updateNoteInput);
  }

  @Mutation(() => Note)
  async removeNote(@Args('id') id: string): Promise<NoteDocument> {
    return await this.notesService.remove(id);
  }
}
