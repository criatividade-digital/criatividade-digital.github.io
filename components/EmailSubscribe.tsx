'use client';

import { useState } from 'react';
import { IconCheck, IconMail, IconX } from '@tabler/icons-react';
import { Alert, Box, Button, Loader, Stack, Text, TextInput, Title } from '@mantine/core';

type SubscribeState = 'idle' | 'loading' | 'success' | 'error';

export default function EmailSubscribe() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<SubscribeState>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) return;

    setState('loading');

    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbx2r_JrbYKI-OV2N5hVO1x73wklVXilw3-djOsQFV7smcOoJRbj3-QRs7WROV7vzkd5nw/exec',
        {
          method: 'POST',
          mode: 'cors', // Adicione esta linha
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            e: email,
            o: 'homepage',
          }),
        }
      );

      if (response.ok) {
        setState('success');
        setEmail('');
      } else {
        setState('error');
      }
    } catch (error) {
      setState('error');
    }
  };

  const resetToIdle = () => {
    setState('idle');
  };

  if (state === 'loading') {
    return (
      <Box ta="center" py="xl">
        <Stack align="center" gap="md">
          <Loader size="md" />
          <Text>Sending...</Text>
        </Stack>
      </Box>
    );
  }

  if (state === 'success') {
    return (
      <Box ta="center" py="xl">
        <Alert icon={<IconCheck size="1rem" />} title="Success!" color="green" variant="light">
          Thank you! Your email was sent!
        </Alert>
      </Box>
    );
  }

  return (
    <Box py="xl">
      <Stack gap="md" maw={400} mx="auto">
        <Stack gap="xs" ta="center">
          <Title order={3} size="h3">
            Stay Updated
          </Title>
          <Text c="dimmed">
            Subscribe to receive updates about creativity and digital innovation
          </Text>
        </Stack>

        {state === 'error' && (
          <Alert
            icon={<IconX size="1rem" />}
            title="Error!"
            color="red"
            variant="light"
            onClose={resetToIdle}
          >
            Error sending, try again
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack gap="sm">
            <TextInput
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              type="email"
              required
              leftSection={<IconMail size="1rem" />}
            />
            <Button type="submit" fullWidth>
              Subscribe
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}
