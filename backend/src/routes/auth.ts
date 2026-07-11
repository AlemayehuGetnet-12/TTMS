import { Router, Request, Response } from "express";
import { validationResult, body } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { authMiddleware, AuthRequest } from "../middleware/auth";

const router = Router();

// Register
router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("role").isIn(["admin", "zmersu", "wmersu", "teacher", "director"]),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password, role } = req.body;

      // Check if user exists
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Create new user
      const user = new User({
        username,
        email,
        password,
        role,
        status: "active",
      });

      await user.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
);

// Reset password request
router.post(
  "/reset-password",
  [body("email").isEmail().withMessage("Valid email is required")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.json({
          message:
            "If this email exists, password reset instructions will be sent.",
        });
      }

      const resetToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "1h" },
      );

      console.log(
        `Password reset requested for ${email}. Token: ${resetToken}`,
      );

      res.json({
        message:
          "If this email exists, password reset instructions will be sent.",
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
);

// Login
router.post(
  "/login",
  [body("username").notEmpty(), body("password").notEmpty()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, password } = req.body;

      // Find user
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Check password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Check status
      if (user.status !== "active") {
        return res.status(401).json({ error: "Account is inactive" });
      }

      // Generate JWT
      const token = jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "24h" },
      );

      res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
);

// Verify Token
router.get("/verify", authMiddleware, (req: AuthRequest, res: Response) => {
  res.json({ user: req.user });
});

export default router;
