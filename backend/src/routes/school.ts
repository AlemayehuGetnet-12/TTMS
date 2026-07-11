import { Router, Request, Response } from "express"
import School from "../models/School"
import { authMiddleware, roleMiddleware, AuthRequest } from "../middleware/auth"

const router = Router()

// Get all schools
router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const schools = await School.find()
      .populate("woreda")
      .populate("director")

    res.json(schools)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Get school by ID
router.get("/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const school = await School.findById(req.params.id)
      .populate("woreda")
      .populate("director")

    if (!school) {
      return res.status(404).json({ error: "School not found" })
    }

    res.json(school)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Create school
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["wmersu", "admin"]),
  async (req: AuthRequest, res: Response) => {
    try {
      const school = new School(req.body)
      await school.save()
      res.status(201).json(school)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
)

// Update school
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["wmersu", "admin"]),
  async (req: AuthRequest, res: Response) => {
    try {
      const school = await School.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      })

      if (!school) {
        return res.status(404).json({ error: "School not found" })
      }

      res.json(school)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
)

// Delete school
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req: AuthRequest, res: Response) => {
    try {
      const school = await School.findByIdAndDelete(req.params.id)

      if (!school) {
        return res.status(404).json({ error: "School not found" })
      }

      res.json({ message: "School deleted" })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }
)

export default router
