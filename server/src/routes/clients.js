import { Router } from "express";

const router = Router();

// GET /api/clients
router.get("/", (req, res) => {
  // Return dummy data for the dashboard to prevent 404s
  res.json([
    { id: 1, name: "Acme Corp", email: "contact@acme.com", status: "active" },
    { id: 2, name: "Stark Industries", email: "info@stark.com", status: "inactive" }
  ]);
});

export default router;
