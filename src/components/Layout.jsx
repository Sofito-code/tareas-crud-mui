import { NavLink, Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// El menú se escribe una sola vez para todas las páginas.
// NavLink agrega la clase "active" para resaltar la página actual.
const linkSx = {
    color: "inherit",
    "&.active": { borderBottom: "2px solid currentColor" },
};

export default function Layout() {
    return (
        <Box sx={{ minHeight: "100vh" }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ mr: 4 }}>
                        Tasks
                    </Typography>

                    <Button component={NavLink} to="/" end sx={linkSx}>
                        Home
                    </Button>
                    <Button component={NavLink} to="/about" sx={linkSx}>
                        About
                    </Button>
                    <Button component={NavLink} to="/tasks" sx={linkSx}>
                        Tasks
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="md" sx={{ py: 4 }}>
                {/* Aquí se dibuja la página que corresponde a la URL actual. */}
                <Outlet />
            </Container>
        </Box>
    );
}
