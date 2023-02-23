import React, {PropsWithChildren} from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AlbumIcon from '@mui/icons-material/Album';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Link} from "react-router-dom";

const Layout: React.FC<PropsWithChildren> = ({children}) => {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#424242',
      },
      secondary: {
        light: '#0066ff',
        main: '#0044ff',
        contrastText: '#ffcc00',
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AppBar position="relative">
        <Toolbar>
          <Link to="/" style={{textDecoration: "none", color: "inherit", display: "flex", alignItems: "center"}}>
          <AlbumIcon sx={{mr: 2}}/>
              Spotify
          </Link>
        </Toolbar>
      </AppBar>
      <main>
        {children}
      </main>
      <Box sx={{bgcolor: 'background.paper', p: 6}} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;