import api from "./faqs"; 

export async function submitReport(data: { reason: string; description?: string; reportedDriverId: string }) {
  const res = await api.post("/reports", data);
  return res.data;
}

export async function getAllReports() {
  const res = await api.get("/reports");
  return res.data;
}