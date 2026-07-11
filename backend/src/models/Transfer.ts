import mongoose, { Schema, Document } from "mongoose"

export interface ITransfer extends Document {
  teacher: mongoose.Types.ObjectId
  transferType: "school-to-school" | "woreda-to-woreda"
  currentLocation: mongoose.Types.ObjectId
  requestedLocations: mongoose.Types.ObjectId[]
  reason: string
  status: "pending" | "approved" | "rejected" | "completed"
  serviceYearsAtTransfer: number
  approvedBy: mongoose.Types.ObjectId
  transferDate: Date
  createdAt: Date
  updatedAt: Date
}

const transferSchema = new Schema<ITransfer>(
  {
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    transferType: {
      type: String,
      enum: ["school-to-school", "woreda-to-woreda"],
      required: true,
    },
    currentLocation: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    requestedLocations: [
      {
        type: Schema.Types.ObjectId,
        required: true,
      },
    ],
    reason: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending",
    },
    serviceYearsAtTransfer: Number,
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    transferDate: Date,
  },
  { timestamps: true }
)

export default mongoose.model<ITransfer>("Transfer", transferSchema)
