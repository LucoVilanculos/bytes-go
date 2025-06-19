import cors from "cors";

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { AuthRouter } from "./routes/auth.routes";
import { UserRouter } from "./routes/user.routes";
import { FaqRouter } from "./routes/faq.routes";
import { OrderRouter } from "./routes/orders.routes";
import { CarstRouter } from "./routes/car.routes";
import { TutorialRouter } from "./routes/tutorial.routes";
import { ReportRouter } from "./routes/report.routes";



const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5002" }));
dotenv.config();

const host = process.env.HOST || "http://localhost";
const port = process.env.PORT || 3002;

app.use("/", AuthRouter);
app.use("/reports", ReportRouter)
app.use("/user", UserRouter);
app.use("/faq", FaqRouter);
app.use("/orders", OrderRouter);
app.use("/car", CarstRouter);
app.use("/tutorial", TutorialRouter);


mongoose
  .connect(process.env.BD_URI as string)
  .then(() => console.log("BD conectado com sucesso!"))
  .catch((error) =>
    console.log("Ocorreu um erro ao contectar com a DB: ", error)
  );

app.listen(port, () => console.log(`Server running on ${host}:${port}`));