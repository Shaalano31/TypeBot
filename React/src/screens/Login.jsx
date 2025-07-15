import { useState } from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LoginInput } from "../components/LoginInput";
import { TypeBotServices } from "../services";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    TypeBotServices.login(form.email, form.password)
      .then(() => navigate("/home"))
      .catch(setError)
      .finally(() => setLoading(false));
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <LoginInput
            label={"Email"}
            name={"email"}
            value={form.email}
            handleChange={handleChange}
          />
          <LoginInput
            label={"Password"}
            name={"password"}
            value={form.password}
            handleChange={handleChange}
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={loading}
            endIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? "Signing in…" : "Login"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
