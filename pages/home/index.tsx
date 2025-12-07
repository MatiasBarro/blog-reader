'use client';

import { Button, Typography, Container, Box, Stack } from '@mui/material';
import { useInitializePushNotifications } from '../../hooks/useInitializePushNotifications.tsx';

const Home: React.FC = () => {
  useInitializePushNotifications();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          MUI Setup Complete!
        </Typography>

        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Material-UI has been successfully integrated with your Deno Next.js
          project.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button variant="contained" href="https://mui.com" target="_blank">
            MUI Documentation
          </Button>
          <Button
            variant="outlined"
            href="https://nextjs.org/docs"
            target="_blank"
          >
            Next.js Docs
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Home;
