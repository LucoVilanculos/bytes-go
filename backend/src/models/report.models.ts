import mongoose, { Schema, Document } from "mongoose"

export interface ReportDocument extends Document {
  reason: string
  description?: string
  reportedDriverId: mongoose.Types.ObjectId
  passengerId: mongoose.Types.ObjectId
  status: "pending" | "resolved" | "rejected"
  createdAt: Date
  updatedAt: Date
}

const ReportSchema = new Schema<ReportDocument>(
  {
    reason: { type: String, required: true },
    description: { type: String },
    reportedDriverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    passengerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["pending", "resolved", "rejected"], default: "pending" }
  },
  { timestamps: true }
)

export const Report = mongoose.model<ReportDocument>("Report", ReportSchema)
