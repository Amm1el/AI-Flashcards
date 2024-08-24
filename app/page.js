'use client'

import './globals.css';
import Image from "next/image";
import getStripe from '@/utils/get-stripe'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useClerk } from "@clerk/clerk-react";
import { Container, AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import Head from 'next/head'
import Grid from '@mui/material/Grid';

export default function Home() {
  const { signOut } = useClerk();

  const handleSubmit = async (pricePlan) => {
    try {
        const response = await fetch('/api/checkout_session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Ensure proper content type
            },
            body: JSON.stringify({ pricePlan }), // Include pricePlan in the request body
        });

        const checkoutSessionJson = await response.json();

        if (response.status !== 200) {
            console.error(checkoutSessionJson.error.message);
            return;
        }

        const stripe = await getStripe();
        const { error } = await stripe.redirectToCheckout({
            sessionId: checkoutSessionJson.id,
        });

        if (error) {
            console.warn(error.message);
        }
    } catch (error) {
        console.error('Error during checkout:', error);
    }
  };

  return (
    <Container className='container' maxWidth={false}>
      <Head>
        <title>SmartCards</title>
        <meta name="description" content="Create flashcards from your text"/>
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            SmartCards
          </Typography>
          <SignedOut>
            <Button className='buttonnav' color="inherit" href='/sign-in'>Login</Button>
            <Button className='buttonnav' color="inherit" href='/sign-up'>Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <Button className='buttonnav' color='inherit' href='/flashcards'>View Flashcards</Button>
            <Button className='buttonnav' color="inherit" onClick={() => signOut()}>Sign Out</Button>
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography className='bigtitle' variant="h1" gutterBottom>Welcome to <strong className='gradient-text'>SmartCards</strong></Typography>
        <Typography className='subtitle' variant='h2' gutterBottom style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
          An AI-powered flashcard Generator!
        </Typography>
        <Button className='button' href='/generate' variant='contained' color='primary' sx={{ mt: 2 }}>
          <Typography className='gradient-text'>
            <strong>Get Started</strong>
          </Typography>
        </Button>
      </Box>

      <Box sx={{ my: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Easy Text Input</Typography>
            <Typography>Simply input your text and let our software do the rest!</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Smart Flashcards</Typography>
            <Typography>Our AI intelligently breaks down your text into concise flashcards, perfect for studying!</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Accessible Anywhere</Typography>
            <Typography>Access your flashcards from any device, at any time. Study on the go!</Typography>
          </Grid>
        </Grid>
      </Box>


            <Box sx={{ my: 6, display: 'flex', justifyContent: 'center' }}>
        <Box sx={{
          p: 3,
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: 2,
          maxWidth: 1000 // Increase the width of the box
        }}>
          <Grid container spacing={4} alignItems="center">
            {/* Left Section - 33% */}
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>Premium</Typography>
              <Typography variant="h6" gutterBottom>$5 Per Month</Typography>
              <Button
                className='buttonprices'
                variant='contained'
                color='primary'
                sx={{ mt: 2 }}
                onClick={() => handleSubmit('premium')}
              >
                Join Now!
              </Button>
            </Grid>

            {/* Divider Line */}
            <Grid item xs={12} md={1}>
              <Box sx={{
                height: '100%',
                width: '1px',
                backgroundColor: 'grey.400',
                mx: 'auto' // Center the line between the sections
              }} />
            </Grid>

            {/* Right Section - 66% */}
            <Grid item xs={12} md={7}>
              <Typography variant="h6" gutterBottom>Included:</Typography>
              <ul style={{ marginLeft: '20px' }}>
                <li>Access to unlimited flashcards</li>
                <li>Priority support</li>
                <li>Unlimited storage</li>
                <li>Exclusive content</li>
              </ul>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
