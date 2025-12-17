import express from "express";
import dotenv from "dotenv";
import notesRouter from "./routes/notes.Router.js";
import connectToDb from "./configs/connectMongodb.js";
import RateLimiter from "./middlewares/rateLimiter.js";
import cors from "cors";
import path from "path";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5001;
const _dirname = path.resolve();

if(process.env.NODE_ENV == 'DEV'){
    app.use(
        cors({
          origin: "http://localhost:5173",
        })
      );
}
app.use(RateLimiter);
app.use(express.json());

app.use("/api/notes", notesRouter);

if (process.env.NODE_ENV === "PROD") {
  app.use(express.static(path.join(_dirname, "../frontend/dist")));

  app.use("*", (_, res) => {
    res.sendFile(path.join(_dirname, "../frontend", "dist", "index.html"));
  });
}

connectToDb().then(() => {
  app.listen(PORT, () => {
    console.log("server is running on port: ", PORT);
  });
});
