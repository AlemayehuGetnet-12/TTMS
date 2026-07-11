import { Router, Request, Response } from "express"
import Transfer from "../models/Transfer"
import Teacher from "../models/Teacher"
import { authMiddleware, roleMiddleware, AuthRequest } from "../middleware/auth"

const router = Router()

// Get all transfers
router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const transfers = await Transfer.find()
      .populate("teacher")
      .populate("approvedBy")

    res.json(transfers)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Get transfer by ID
router.get("/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const transfer = await Transfer.findById(req.params.id)
      .populate("teacher")
      .populate("approvedBy")

    if (!transfer) {
      return res.status(404).json({ error: "Transfer not found" })
    }

    res.json(transfer)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Create transfer request
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["teacher"]),
  async (req: AuthRequest, res: Response) => {
    try {
      const { teacherId, transferType, currentLocation, requestedLocations, reason } = req.body

      // Validate teacher exists
      const teacher = await Teacher.findById(teacherId)
      if (!teacher) {
        return res.status(404).json({ error: "Teacher not found" })
      }

      // Validate service requirements
      if (transferType === "school-to-school" && teacher.serviceYears < 1) {
        return res
          .status(400)
          .json({ error: "Teacher must have at least 1 year of service" })
      }

      if (transferType === "woreda-to-woreda" && teacher.serviceYears < 2) {
        return res
          .status(400)
          .json({ error: "Teacher must have at least 2 years of service" })
      }

      const transfer = new Transfer({
        teacher: teacherId,
        transferType,
        currentLocation,
        requestedLocations,
        reason,
        serviceYearsAtTransfer: teacher.serviceYears,
      })

      await transfer.save()
      res.status(201).json(transfer)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
)

// Approve transfer
router.put(
  "/:id/approve",
  authMiddleware,
  roleMiddleware(["wmersu", "zmersu", "admin"]),
  async (req: AuthRequest, res: Response) => {
    try {
      const { assignedLocation } = req.body

      const transfer = await Transfer.findByIdAndUpdate(
        req.params.id,
        {
          status: "approved",
          approvedBy: req.user.id,
          transferDate: new Date(),
        },
        { new: true }
      )

      if (!transfer) {
        return res.status(404).json({ error: "Transfer not found" })
      }

      res.json(transfer)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
)

// Reject transfer
router.put(
  "/:id/reject",
  authMiddleware,
  roleMiddleware(["wmersu", "zmersu", "admin"]),
  async (req: AuthRequest, res: Response) => {
    try {
      const transfer = await Transfer.findByIdAndUpdate(
        req.params.id,
        {
          status: "rejected",
          approvedBy: req.user.id,
        },
        { new: true }
      )

      if (!transfer) {
        return res.status(404).json({ error: "Transfer not found" })
      }

      res.json(transfer)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
)

export default router
