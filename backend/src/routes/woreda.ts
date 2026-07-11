import { Router, Request, Response } from "express"
import Woreda from "../models/Woreda"
import { authMiddleware, roleMiddleware, AuthRequest } from "../middleware/auth"

const router = Router()

// Get all woredas
router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const woredas = await Woreda.find().populate("mersuOfficer")
    res.json(woredas)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Get woreda by ID
router.get("/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const woreda = await Woreda.findById(req.params.id).populate("mersuOfficer")

    if (!woreda) {
      return res.status(404).json({ error: "Woreda not found" })
    }

    res.json(woreda)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Create woreda
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["zmersu", "admin"]),
  async (req: AuthRequest, res: Response) => {
    try {
      const woreda = new Woreda(req.body)
      await woreda.save()
      res.status(201).json(woreda)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
)

// Update woreda
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["zmersu", "admin"]),
  async (req: AuthRequest, res: Response) => {
    try {
      const woreda = await Woreda.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      })

      if (!woreda) {
        return res.status(404).json({ error: "Woreda not found" })
      }

      res.json(woreda)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
)

// Delete woreda
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req: AuthRequest, res: Response) => {
    try {
      const woreda = await Woreda.findByIdAndDelete(req.params.id)

      if (!woreda) {
        return res.status(404).json({ error: "Woreda not found" })
      }

      res.json({ message: "Woreda deleted" })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }
)

export default router
