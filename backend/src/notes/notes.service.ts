import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';
import { Note } from './entities/note.entity';
import { Model } from 'mongoose';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name)
    private readonly NoteModel: Model<Note>,
  ){}

  async create(createNoteInput: CreateNoteInput): Promise<Note> {
    const note = new this.NoteModel(createNoteInput);
    return note.save();
  }

  async findById(id: string): Promise<Note> {
    return this.NoteModel.findOne({ _id: id });
  }

  // ! check this and test it ...
  async findByTaskId(taskId: string): Promise<Note[]> {
    return this.NoteModel.find({ taskId });
  }
  
  // ! check this and test it ...
  async findByUserId(userId: string): Promise<Note[]> {
    return this.NoteModel.find({ userId });
  }

  async update(id: string, updateNoteInput: UpdateNoteInput): Promise<Note> {
    return this.NoteModel.findByIdAndUpdate({ _id: id }, updateNoteInput)
  }

  async remove(id: string) {
    return this.NoteModel.findByIdAndRemove({ _id: id });
  }
}
