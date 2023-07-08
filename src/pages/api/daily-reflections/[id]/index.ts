import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { dailyReflectionValidationSchema } from 'validationSchema/daily-reflections';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.daily_reflection
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getDailyReflectionById();
    case 'PUT':
      return updateDailyReflectionById();
    case 'DELETE':
      return deleteDailyReflectionById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDailyReflectionById() {
    const data = await prisma.daily_reflection.findFirst(convertQueryToPrismaUtil(req.query, 'daily_reflection'));
    return res.status(200).json(data);
  }

  async function updateDailyReflectionById() {
    await dailyReflectionValidationSchema.validate(req.body);
    const data = await prisma.daily_reflection.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteDailyReflectionById() {
    const data = await prisma.daily_reflection.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
