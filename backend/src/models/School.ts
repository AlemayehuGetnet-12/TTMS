import mongoose, { Schema, Document } from "mongoose"

export interface ISchool extends Document {
  name: string
  code: string
  woreda: mongoose.Types.ObjectId
  classification: "1" | "2" | "3" | "4" | "5" | "6"
  teacherCapacity: number
  currentTeacherCount: number
  availablePositions: number
  location: string
  director: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const schoolSchema = new Schema<ISchool>(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    woreda: {
      type: Schema.Types.ObjectId,
      ref: "Woreda",
      required: true,
    },
    classification: {
      type: String,
      enum: ["1", "2", "3", "4", "5", "6"],
      required: true,
    },
    teacherCapacity: {
      type: Number,
      required: true,
    },
    currentTeacherCount: {
      type: Number,
      default: 0,
    },
    availablePositions: {
      type: Number,
      default: 0,
    },
    location: String,
    director: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
)

// Update available positions when teachers change
schoolSchema.pre("save", function (next) {
  this.availablePositions = this.teacherCapacity - this.currentTeacherCount
  next()
})

export default mongoose.model<ISchool>("School", schoolSchema)
