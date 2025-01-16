const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Datos predefinidos para validación
const validUser = { email: "test@example.com", password: "1234" };

// Endpoint de login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("peticion de login recibida con email: ",email)
  if (email === validUser.email && password === validUser.password) {
    return res.json({ token: "fake-jwt-token", message: "Login successful!" });
  }
  res.status(401).json({ message: "Invalid credentials" });
});

// Endpoint para obtener el perfil del usuario
app.get("/profile", (req, res) => {
  const token = req.headers.authorization;
  if (token === "Bearer fake-jwt-token") {
    return res.json({ name: "John Doe", email: validUser.email });
  }
  res.status(403).json({ message: "Unauthorized" });
});

// Endpoint para cerrar sesión
app.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

// Inicio del servidor
const PORT = 3001;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
