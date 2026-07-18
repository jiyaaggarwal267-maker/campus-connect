import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  banner?: string;
  category: string;
  venue: string;
  date: Date;
  deadline: Date;
  capacity: number;
  availableSeats: number;
  createdBy: mongoose.Types.ObjectId;
}

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    banner: { type: String },
    category: { type: String, required: true },
    venue: { type: String, required: true },
    date: { type: Date, required: true },
    deadline: { type: Date, required: true },
    capacity: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model<IEvent>('Event', eventSchema);
export default Event;
