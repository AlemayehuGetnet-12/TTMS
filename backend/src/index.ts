import express, { Express, Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoutes from "./routes/auth"
import teacherRoutes from "./routes/teacher"
import schoolRoutes from "./routes/school"
import woredaRoutes from "./routes/woreda"
import transferRoutes from "./routes/transfer"
import userRoutes from "./routes/user"

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ttms"

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Database Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✓ Connected to MongoDB")
  })
  .catch((error) => {
    console.error("✗ MongoDB connection error:", error)
    process.exit(1)
  })

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/teachers", teacherRoutes)
app.use("/api/schools", schoolRoutes)
app.use("/api/woredas", woredaRoutes)
app.use("/api/transfers", transferRoutes)
app.use("/api/users", userRoutes)

// Health Check
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "Server is running" })
})

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" })
})

// Error Handler
app.use((err: any, req: Request, res: Response) => {
  console.error(err.stack)
  res.status(500).json({ error: "Internal server error" })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})

export default app
