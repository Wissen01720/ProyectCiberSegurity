import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

// Get all scenarios
router.get('/', async (req, res) => {
  try {
    const scenarios = await prisma.securityScenario.findMany();
    res.json(scenarios);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch scenarios' });
  }
});

// Get scenario by type
router.get('/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const scenarios = await prisma.securityScenario.findMany({
      where: { type },
    });
    res.json(scenarios);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch scenarios' });
  }
});

// Initialize default scenarios
const defaultScenarios = [
  {
    type: 'AUTH',
    title: 'Brute Force Attack Prevention',
    description: 'You notice multiple failed login attempts on your account.',
    options: JSON.stringify([
      'Ignore the attempts',
      'Enable Multi-Factor Authentication',
      'Change to a stronger password',
    ]),
    feedback: JSON.stringify({
      'Ignore the attempts': 'Not recommended. Multiple failed attempts could indicate a brute force attack.',
      'Enable Multi-Factor Authentication': 'Excellent choice! MFA adds an extra layer of security.',
      'Change to a stronger password': 'Good start, but combining this with MFA would be better.',
    }),
  },
  {
    type: 'CRYPTO',
    title: 'Secure Data Transmission',
    description: 'You need to send sensitive information to a colleague.',
    options: JSON.stringify([
      'Send via regular email',
      'Use end-to-end encryption',
      'Split information across multiple channels',
    ]),
    feedback: JSON.stringify({
      'Send via regular email': 'Risky! Email is not secure for sensitive data.',
      'Use end-to-end encryption': 'Perfect! This ensures only the intended recipient can read the data.',
      'Split information across multiple channels': 'Better than plain email, but not as secure as encryption.',
    }),
  },
  {
    type: 'PHISHING',
    title: 'Suspicious Email Detection',
    description: 'You receive an urgent email asking to verify your account.',
    options: JSON.stringify([
      'Click the link immediately',
      'Check the sender and URL carefully',
      'Report as phishing',
    ]),
    feedback: JSON.stringify({
      'Click the link immediately': 'Never click suspicious links without verification!',
      'Check the sender and URL carefully': 'Good practice! Always verify before clicking.',
      'Report as phishing': 'Excellent! Reporting helps protect others.',
    }),
  },
];

// Initialize scenarios endpoint
router.post('/init', async (req, res) => {
  try {
    for (const scenario of defaultScenarios) {
      await prisma.securityScenario.create({ data: scenario });
    }
    res.json({ message: 'Scenarios initialized successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to initialize scenarios' });
  }
});

export { router };