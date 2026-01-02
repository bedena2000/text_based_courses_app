import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.routes";
import courseRoutes from "./routes/course.routes"; // Import the new routes

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://sprightly-mooncake-cc411a.netlify.app",
    ],
    credentials: true,
  })
);

// Existing Routes
app.use("/api/auth", authRoutes);

// New Course Routes
app.use("/api/courses", courseRoutes);

app.get("/test", (req, res) => {
  res.send("working");
});

export default app;
