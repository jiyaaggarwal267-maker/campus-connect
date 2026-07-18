import mongoose, { Document, Schema } from 'mongoose';

export interface IAnnouncement extends Document {
  title: string;
  description: string;
  createdBy: mongoose.Types.ObjectId;
}

const announcementSchema = new Schema<IAnnouncement>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

const Announcement = mongoose.model<IAnnouncement>('Announcement', announcementSchema);
export default Announcement;
