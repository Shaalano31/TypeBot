import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { TypeBotServices } from "../services";

export default function BotViewer() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");

  const [publicId, setPublicId] = useState("");
  const [botStats, setBotStats] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  // const email = localStorage.getItem("email");
  useEffect(() => {
    TypeBotServices.getBot(id)
      .then(({ publicId, stats }) => {
        setBotStats(stats);
        setPublicId(publicId);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [id]);

  const handleLogout = async () => {
    await TypeBotServices.logout().catch((err) => alert(err));
    navigate("/");
  };

  const back = () => {
    navigate("/home");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Typebot Dashboard
          </Typography>
          <Button color="inherit" onClick={back}>
            Back
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Viewing Bot: {name}
        </Typography>
        <Typography variant="h9" gutterBottom>
          Total Views: {botStats.totalViews} - Total Starts:{" "}
          {botStats.totalStarts} - Total Completed: {botStats.totalCompleted}
        </Typography>
        <Box height={4} />
        <Typography variant="h6" gutterBottom>
          Completion Rate:{" "}
          {botStats.totalStarts > 0
            ? `${Math.round(
                (botStats.totalCompleted / botStats.totalStarts) * 100
              )}%`
            : "0%"}
          {" - "}Engagement Rate:{" "}
          {botStats.totalViews > 0
            ? `${Math.round(
                (botStats.totalStarts / botStats.totalViews) * 100
              )}%`
            : "N/A"}
          {" - "}Drop-off Count:{" "}
          {botStats.totalStarts - botStats.totalCompleted}
        </Typography>

        <Box mt={2}>
          <iframe
            title={`typebot-${publicId}`}
            src={`http://localhost:8081/${publicId}`}
            width="100%"
            height="600"
            frameBorder="0"
            allow="clipboard-write; microphone"
            style={{ border: "none", borderRadius: 8 }}
          />
        </Box>
      </Container>
    </>
  );
}
