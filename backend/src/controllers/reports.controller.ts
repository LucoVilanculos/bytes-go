import { Request, Response } from "express"
import { Report } from "../models/report.models"
import mongoose from "mongoose"

export const createReport = async (req: Request, res: Response) => {
  try {
    const { reason, description, reportedDriverId } = req.body
    const passengerId = (req as any).user.userId

    if (!reason || !reportedDriverId) {
       res.status(400).json({ message: "Reason and reported driver are required." })
       return; 
    }

    const newReport = await Report.create({
      reason,
      description,
      reportedDriverId,
      passengerId
    })

    res.status(201).json({ message: "Report submitted successfully", report: newReport })
  } catch (error) {
    console.error("Error creating report:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export const getAllReports = async (_req: Request, res: Response) => {
  try {
    const reports = await Report.find()
      .populate("reportedDriverId", "name phone email car")
      .populate("passengerId", "name email")
    res.status(200).json(reports)
  } catch (error) {
    console.error("Error fetching reports:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export const getReportById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
       res.status(400).json({ message: "Invalid report id" })
    }

    const report = await Report.findById(id)
      .populate("reportedDriverId", "name phone email car")
      .populate("passengerId", "name email")

    if (!report) {
       res.status(404).json({ message: "Report not found" })
    }

    res.status(200).json(report)
  } catch (error) {
    console.error("Error fetching report:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export const updateReport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updateData = req.body

    const updated = await Report.findByIdAndUpdate(id, updateData, { new: true })

    if (!updated) {
       res.status(404).json({ message: "Report not found" })
    }

    res.status(200).json({ message: "Report updated", report: updated })
  } catch (error) {
    console.error("Error updating report:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export const patchReportStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!["pending", "resolved", "rejected"].includes(status)) {
       res.status(400).json({ message: "Invalid status value" })
    }

    const updated = await Report.findByIdAndUpdate(id, { status }, { new: true })

    if (!updated) {
       res.status(404).json({ message: "Report not found" })
    }

    res.status(200).json({ message: "Status updated", report: updated })
  } catch (error) {
    console.error("Error updating status:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export const deleteReport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const deleted = await Report.findByIdAndDelete(id)

    if (!deleted) {
       res.status(404).json({ message: "Report not found" })
    }

    res.status(200).json({ message: "Report deleted" })
  } catch (error) {
    console.error("Error deleting report:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
