import mongoose, { Document, Schema } from 'mongoose';

export interface IRegistration extends Document {
  student: mongoose.Types.ObjectId;
  event: mongoose.Types.ObjectId;
  status: 'registered' | 'cancelled';
  registeredAt: Date;
}

const registrationSchema = new Schema<IRegistration>(
  {
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    status: { type: String, enum: ['registered', 'cancelled'], default: 'registered' },
    registeredAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate registrations
registrationSchema.index({ student: 1, event: 1 }, { unique: true });

const Registration = mongoose.model<IRegistration>('Registration', registrationSchema);
export default Registration;
