import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

// Log security event
router.post('/log', async (req, res) => {
  try {
    const { userId, eventType, details, severity } = req.body;
    const log = await prisma.securityLog.create({
      data: {
        userId,
        eventType,
        details,
        severity,
      },
    });
    res.json(log);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create security log' });
  }
});

// Get security logs for user
router.get('/logs/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const logs = await prisma.securityLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch security logs' });
  }
});

export { router };