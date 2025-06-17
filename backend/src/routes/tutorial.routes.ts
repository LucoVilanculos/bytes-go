import { Router } from "express";
import {
  createTutorial,
  getTutorials,
  getTutorialById,
  updateTutorial,
  deleteTutorial,
  publishTutorial,
} from "../controller/tutorial.controller";

import { AuthenticationToken } from "../middleware/auth.Milddleware";
import { authorizeRoles } from "../controller/transport.controller";

export const TutorialRouter = Router();

TutorialRouter.get("/", authorizeRoles("driver"), getTutorials);
TutorialRouter.get("/:id", authorizeRoles("driver"), getTutorialById);

TutorialRouter.post("/", AuthenticationToken, authorizeRoles("admin"), createTutorial);
TutorialRouter.put("/:id", AuthenticationToken, authorizeRoles("admin"), updateTutorial);
TutorialRouter.delete("/:id", AuthenticationToken, authorizeRoles("admin"), deleteTutorial);
TutorialRouter.patch("/publish/:id", AuthenticationToken, authorizeRoles("admin"), publishTutorial);

