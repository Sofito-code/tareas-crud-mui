import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function NotFound() {
    return (
        <Paper sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h3" gutterBottom>
                404
            </Typography>
            <Typography sx={{ mb: 3 }} color="text.secondary">
                This page does not exist.
            </Typography>
            <Button variant="contained" component={RouterLink} to="/">
                Back to home
            </Button>
        </Paper>
    );
}
