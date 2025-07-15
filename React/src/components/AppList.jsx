import { List, ListItem, ListItemText, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const AppList = ({ bots }) => {
  const navigate = useNavigate();
  return (
    <Paper elevation={3}>
      <List>
        {bots?.map((bot) => (
          <ListItem
            key={bot.id}
            divider
            button
            onClick={() =>
              navigate(`/bot/${bot.id}?name=${encodeURIComponent(bot.name)}`)
            }
          >
            <ListItemText primary={`${bot.icon ?? "🤖"} ${bot.name}`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
