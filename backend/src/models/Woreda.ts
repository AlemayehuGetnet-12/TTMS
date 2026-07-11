import mongoose, { Schema, Document } from "mongoose"

export interface IWoreda extends Document {
  name: string
  code: string
  zone: string
  totalSchools: number
  totalTeachers: number
  mersuOfficer: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const woredaSchema = new Schema<IWoreda>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    zone: {
      type: String,
      default: "West Gojjam",
    },
    totalSchools: {
      type: Number,
      default: 0,
    },
    totalTeachers: {
      type: Number,
      default: 0,
    },
    mersuOfficer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
)

export default mongoose.model<IWoreda>("Woreda", woredaSchema)
