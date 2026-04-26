import React from 'react';
import { Box, Container, Typography, Paper, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import TouchAppIcon from '@mui/icons-material/TouchApp';

function WhyUs() {
  const features = [
    {
      title: 'Egyszerű keresés',
      description: 'Keresés cím, szerző, ISBN, műfaj vagy típus alapján. Szűrje az eredményeket státusz szerint.',
      icon: <SearchIcon sx={{ fontSize: '1.5rem', color: '#4ca38d' }} />,
    },
    {
      title: 'Hatalmas választék',
      description: 'Olvasóink több száz könyv és zenei mű közül válogathatnak!',
      icon: <LibraryBooksIcon sx={{ fontSize: '1.5rem', color: '#4ca38d' }} />,
    },
    {
      title: 'Kényelmes foglalás',
      description: 'Felejtse el a sorban állást! Foglalja le kedvenc köteteit online pár kattintással, mi pedig összekészítjük Önnek, mire a könyvtárba ér.',
      icon: <TouchAppIcon sx={{ fontSize: '1.5rem', color: '#4ca38d' }} />,
    }
  ];

  return (
    <Box sx={{ paddingTop: '6rem', paddingBottom: '6rem', backgroundColor: '#0F1916', color: 'white' }}>
      <Container maxWidth="xl">
        <Stack spacing={'1rem'} alignItems="center" sx={{ marginBottom: '4rem', textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 800, fontFamily: 'serif' }}>
            Miért válasszon minket?
          </Typography>
          <Typography variant="body1" sx={{ color: '#94a3b8' }}>
            Modern könyvtári rendszerünk egyszerűvé teszi a katalógus böngészését és a kölcsönzés kezelését.
          </Typography>
        </Stack>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '1.5rem',
            justifyContent: 'center'
          }}
        >
          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                flex: '1 1 18.75rem',
                maxWidth: { md: 'calc(33.333% - 1.5rem)' },
                display: 'flex'
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  padding: '1.5rem',
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '1.5rem',
                  border: '0.0625rem solid rgba(255, 255, 255, 0.05)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-0.5rem)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  }
                }}
              >
                <Box
                  sx={{
                    width: '3.5rem',
                    height: '3.5rem',
                    borderRadius: '1rem',
                    backgroundColor: 'rgba(76, 163, 141, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}
                >
                  {feature.icon}
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: '0.5rem', color:'white' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.5 }}>
                  {feature.description}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default WhyUs;