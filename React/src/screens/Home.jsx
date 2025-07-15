import {
  Alert,
  AppBar,
  Button,
  CircularProgress,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppList } from "../components/AppList";
import { TypeBotServices } from "../services";

export default function Home() {
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    TypeBotServices.getBotsList()
      .then((list) => setBots(list || []))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await TypeBotServices.logout().catch((err) => alert(err));
    navigate("/");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Typebot Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              Your Typebots
            </Typography>
            {bots?.length === 0 || !bots ? (
              <Typography>No typebots found.</Typography>
            ) : (
              <AppList bots={bots} />
            )}
          </>
        )}
      </Container>
    </>
  );
}
