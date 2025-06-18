export interface ReportProps {
  reason: string
  description?: string
  reportedDriverId: string
  passengerId: string
  status?: "pending" | "resolved" | "rejected"
}