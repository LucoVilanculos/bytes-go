import { Router } from "express";
import {
  createTutorial,
  getTutorials,
  getTutorialById,
  updateTutorial,
  deleteTutorial,
  publishTutorial,
} from "../controllers/tutorial.controller";

import { AuthenticationToken } from "../middleware/auth.Milddleware";
import { authorizeRoles } from "../middleware/auth.Milddleware";

export const TutorialRouter = Router();

TutorialRouter.get("/", AuthenticationToken, authorizeRoles("driver", "admin"), getTutorials);
TutorialRouter.get("/:id", AuthenticationToken, authorizeRoles("driver", "admin"), getTutorialById);

TutorialRouter.post("/", AuthenticationToken, authorizeRoles("admin"), createTutorial);
TutorialRouter.put("/:id", AuthenticationToken, authorizeRoles("admin"), updateTutorial);
TutorialRouter.delete("/:id", AuthenticationToken, authorizeRoles("admin"), deleteTutorial);
TutorialRouter.patch("/publish/:id", AuthenticationToken, authorizeRoles("admin"), publishTutorial);

