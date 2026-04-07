import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles({
  font: {
    fontFamily: "Plus Jakarta Sans, sans-serif !important",
  },
});

export const formatTitle = (title = "") => {
  const trimmed = String(title).trim();
  if (!trimmed) return "";
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};
