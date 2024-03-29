import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';
import { Note, NoteDocument } from './entities/note.entity';
import { Model } from 'mongoose';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name)
    private readonly NoteModel: Model<NoteDocument>,
  ) {}

  async create(createNoteInput: CreateNoteInput): Promise<NoteDocument> {
    const note = new this.NoteModel(createNoteInput);
    return await note.save();
  }

  async findById(id: string): Promise<NoteDocument> {
    return await this.NoteModel.findOne({ _id: id });
  }

  async filterNotes(filter: CreateNoteInput): Promise<NoteDocument> {
    return await this.NoteModel.findOne(filter);
  }

  async findByUserId(userId: string): Promise<NoteDocument[]> {
    return await this.NoteModel.find({ userId });
  }

  async update(
    id: string,
    updateNoteInput: UpdateNoteInput,
  ): Promise<NoteDocument> {
    return await this.NoteModel.findByIdAndUpdate({ _id: id }, updateNoteInput);
  }

  async remove(id: string) {
    return await this.NoteModel.findByIdAndRemove({ _id: id });
  }
}
