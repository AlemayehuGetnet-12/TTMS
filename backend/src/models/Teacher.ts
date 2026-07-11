import mongoose, { Schema, Document } from "mongoose"

export interface ITeacher extends Document {
  firstName: string
  lastName: string
  email: string
  phone: string
  idNumber: string
  qualifications: string[]
  serviceYears: number
  maritalStatus: "married" | "unmarried"
  healthStatus: string
  currentSchool: mongoose.Types.ObjectId
  currentWoreda: mongoose.Types.ObjectId
  bonusService: number
  createdAt: Date
  updatedAt: Date
}

const teacherSchema = new Schema<ITeacher>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    idNumber: {
      type: String,
      required: true,
      unique: true,
    },
    qualifications: [String],
    serviceYears: {
      type: Number,
      required: true,
      min: 0,
    },
    maritalStatus: {
      type: String,
      enum: ["married", "unmarried"],
      required: true,
    },
    healthStatus: String,
    currentSchool: {
      type: Schema.Types.ObjectId,
      ref: "School",
    },
    currentWoreda: {
      type: Schema.Types.ObjectId,
      ref: "Woreda",
      required: true,
    },
    bonusService: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

export default mongoose.model<ITeacher>("Teacher", teacherSchema)
