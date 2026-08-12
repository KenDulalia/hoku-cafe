import express from "express";
import { pool } from "./db.js";

const app = express();
const port = 3001;

app.get("/api/health", (request, response) => {
  response.json({
    message: "Hoku Cafe API is running",
  });
});

app.get("/api/menu", async (request, response) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, name, description, price, image, alt, category
       FROM menu_items
       WHERE is_featured = TRUE
       ORDER BY id ASC`
    );

    response.json(rows);
  } catch (error) {
    response.status(500).json({
      message: "Unable to load menu items from MySQL.",
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Hoku Cafe API running at http://127.0.0.1:${port}`);
});
