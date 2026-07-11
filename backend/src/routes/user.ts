import { Router, Request, Response } from "express"
import User from "../models/User"
import { authMiddleware, roleMiddleware, AuthRequest } from "../middleware/auth"

const router = Router()

// Get all users (admin only)
router.get("/", authMiddleware, roleMiddleware(["admin"]), async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find().select("-password")
    res.json(users)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Get user by ID
router.get("/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password")

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json(user)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Update user (admin only)
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req: AuthRequest, res: Response) => {
    try {
      const { password, ...updateData } = req.body

      const user = await User.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
        runValidators: true,
      }).select("-password")

      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }

      res.json(user)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
)

// Activate/Deactivate user (admin only)
router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req: AuthRequest, res: Response) => {
    try {
      const { status } = req.body

      if (!["active", "inactive"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" })
      }

      const user = await User.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      ).select("-password")

      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }

      res.json(user)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
)

// Delete user (admin only)
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req: AuthRequest, res: Response) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id)

      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }

      res.json({ message: "User deleted" })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }
)

export default router
