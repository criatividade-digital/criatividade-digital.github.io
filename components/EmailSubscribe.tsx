'use client';

import { useState } from 'react';
import { IconCheck, IconMail, IconX } from '@tabler/icons-react';
import { Alert, Box, Button, Loader, Stack, Text, TextInput } from '@mantine/core';

type SubscribeState = 'idle' | 'loading' | 'success' | 'error';

export function EmailSubscribe() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<SubscribeState>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      return;
    }

    setState('loading');

    try {
      const url =
        'https://script.google.com/macros/s/AKfycbwEjbsl0mi3x1hQ5X1vsBA0wuVZgpnKNKl6YGjF6cDi1R9EgOTlPonHhBxMa-jUCIorPA/exec';
      const formData = new URLSearchParams();
      formData.append('e', email);
      formData.append('o', 'homepage');
      formData.append('email', 'a@email.com');
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (response.ok) {
        setState('success');
        setEmail('');
      } else {
        setState('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setState('error');
    }
  };

  const resetToIdle = () => {
    setState('idle');
  };

  if (state === 'success') {
    return (
      <Box py="xl">
        <Alert icon={<IconCheck size="1rem" />} title="Success!" color="green" variant="light">
          Thank you! I'll keep you posted.
        </Alert>
      </Box>
    );
  }

  return (
    <Stack gap="md" maw={400}>
      {state === 'error' && (
        <Alert
          icon={<IconX size="1rem" />}
          title="Error!"
          color="red"
          variant="light"
          onClose={resetToIdle}
        >
          Error sending your email, try again.
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
          {state === 'loading' ? (
            <Stack align="center" gap="xs">
              <Loader size="md" />
              <Text>Sending...</Text>
            </Stack>
          ) : (
            <Button type="submit" fullWidth>
              Subscribe
            </Button>
          )}
        </Stack>
      </form>
    </Stack>
  );
}

export default EmailSubscribe;
