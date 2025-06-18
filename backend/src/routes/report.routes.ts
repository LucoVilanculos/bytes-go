import { Router } from "express"
import {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  patchReportStatus,
  deleteReport
} from "../controllers/reports.controller"
import { AuthenticationToken } from "../middleware/auth.Milddleware"
import { authorizeRoles } from "../middleware/auth.Milddleware"

export const ReportRouter = Router()

ReportRouter.post("/", AuthenticationToken, createReport)
ReportRouter.get("/", AuthenticationToken, authorizeRoles("admin"), getAllReports)
ReportRouter.get("/:id", AuthenticationToken, getReportById)
ReportRouter.put("/:id", AuthenticationToken, authorizeRoles("admin"), updateReport)
ReportRouter.patch("/:id", AuthenticationToken, authorizeRoles("admin"), patchReportStatus)
ReportRouter.delete("/:id", AuthenticationToken, authorizeRoles("admin"), deleteReport)


