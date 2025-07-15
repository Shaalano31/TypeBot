import { TextField } from "@mui/material";

export const LoginInput = ({ label, name, value, handleChange }) => {
  return (
    <TextField
      margin="normal"
      fullWidth
      label={label}
      name={name}
      type={name}
      value={value}
      onChange={handleChange}
    />
  );
};
