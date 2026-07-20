import { Router } from "express";

const router = Router();

// GET /api/tickets
router.get("/", (req, res) => {
  // Return dummy data for the dashboard to prevent 404s
  res.json([
    { id: 101, title: "Payment Gateway Issue", priority: "high", status: "open" },
    { id: 102, title: "Onboarding Question", priority: "low", status: "resolved" }
  ]);
});

export default router;
