
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Plant Store
        </Typography>
        <Button color="inherit" component={Link} to="/category/natural">Natural</Button>
        <Button color="inherit" component={Link} to="/category/artificial">Artificial</Button>
        <Button color="inherit" component={Link} to="/category/rooftop">Rooftop</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
