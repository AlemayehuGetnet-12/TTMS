import { Router, Request, Response } from "express"
import Teacher from "../models/Teacher"
import { authMiddleware, roleMiddleware, AuthRequest } from "../middleware/auth"

const router = Router()

// Get all teachers
router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const teachers = await Teacher.find()
      .populate("currentSchool")
      .populate("currentWoreda")

    res.json(teachers)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Get teacher by ID
router.get("/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate("currentSchool")
      .populate("currentWoreda")

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" })
    }

    res.json(teacher)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Create teacher
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["wmersu", "admin"]),
  async (req: AuthRequest, res: Response) => {
    try {
      const teacher = new Teacher(req.body)
      await teacher.save()
      res.status(201).json(teacher)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
)

// Update teacher
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["wmersu", "admin"]),
  async (req: AuthRequest, res: Response) => {
    try {
      const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      })

      if (!teacher) {
        return res.status(404).json({ error: "Teacher not found" })
      }

      res.json(teacher)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
)

// Delete teacher
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req: AuthRequest, res: Response) => {
    try {
      const teacher = await Teacher.findByIdAndDelete(req.params.id)

      if (!teacher) {
        return res.status(404).json({ error: "Teacher not found" })
      }

      res.json({ message: "Teacher deleted" })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }
)

export default router
