import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultScenarios = [
  {
    type: 'AUTH',
    title: 'Brute Force Attack Prevention',
    description: 'You notice multiple failed login attempts on your account.',
    options: [
      'Ignore the attempts',
      'Enable Multi-Factor Authentication',
      'Change to a stronger password',
    ],
    feedback: {
      'Ignore the attempts': 'Not recommended. Multiple failed attempts could indicate a brute force attack.',
      'Enable Multi-Factor Authentication': 'Excellent choice! MFA adds an extra layer of security.',
      'Change to a stronger password': 'Good start, but combining this with MFA would be better.',
    },
  },
  {
    type: 'CRYPTO',
    title: 'Secure Data Transmission',
    description: 'You need to send sensitive information to a colleague.',
    options: [
      'Send via regular email',
      'Use end-to-end encryption',
      'Split information across multiple channels',
    ],
    feedback: {
      'Send via regular email': 'Risky! Email is not secure for sensitive data.',
      'Use end-to-end encryption': 'Perfect! This ensures only the intended recipient can read the data.',
      'Split information across multiple channels': 'Better than plain email, but not as secure as encryption.',
    },
  },
  {
    type: 'PHISHING',
    title: 'Suspicious Email Detection',
    description: 'You receive an urgent email asking to verify your account.',
    options: [
      'Click the link immediately',
      'Check the sender and URL carefully',
      'Report as phishing',
    ],
    feedback: {
      'Click the link immediately': 'Never click suspicious links without verification!',
      'Check the sender and URL carefully': 'Good practice! Always verify before clicking.',
      'Report as phishing': 'Excellent! Reporting helps protect others.',
    },
  },
];

async function main() {
  console.log('Seeding database...');

  for (const scenario of defaultScenarios) {
    await prisma.securityScenario.create({
      data: {
        ...scenario,
        options: scenario.options as any,
        feedback: scenario.feedback as any,
      },
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });