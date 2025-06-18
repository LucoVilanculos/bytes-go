import api from "./faqs"; 

export interface Tutorial {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  tags?: string[];
  categoryId: string;
  authorId: string;
  isPublished: boolean;
  views: number;
  createdAt?: string;
  updatedAt?: string;
}

export async function getTutorials(params?: {
  categoryId?: string;
  tag?: string;
  isPublished?: boolean;
}): Promise<Tutorial[]> {
  const res = await api.get<Tutorial[]>("/tutorials", { params });
  return res.data;
}

export async function getTutorialById(id: string): Promise<Tutorial> {
  const res = await api.get<Tutorial>(`/tutorials/${id}`);
  return res.data;
}

export async function createTutorial(data: Omit<Tutorial, "_id" | "views" | "createdAt" | "updatedAt" | "isPublished">) {
  const res = await api.post<Tutorial>("/tutorials", data);
  return res.data;
}

export async function updateTutorial(id: string, data: Partial<Tutorial>) {
  const res = await api.put<Tutorial>(`/tutorials/${id}`, data);
  return res.data;
}

export async function deleteTutorial(id: string) {
  const res = await api.delete(`/tutorials/${id}`);
  return res.data;
}

export async function publishTutorial(id: string) {
  const res = await api.patch(`/tutorials/publish/${id}`);
  return res.data;
}
