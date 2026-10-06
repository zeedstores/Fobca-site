import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const app = express();

app.use(express.json());

app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;

  const validUsername = process.env.ADMIN_USERNAME;
  const validPassword = process.env.ADMIN_PASSWORD;

  if (
    username === validUsername &&
    password === validPassword
  ) {
    return res.json({
      success: true,
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid username or password.",
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`FOBCA admin server running on http://localhost:${PORT}`);
});