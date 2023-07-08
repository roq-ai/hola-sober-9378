import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { moneySavedValidationSchema } from 'validationSchema/money-saveds';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.money_saved
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getMoneySavedById();
    case 'PUT':
      return updateMoneySavedById();
    case 'DELETE':
      return deleteMoneySavedById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMoneySavedById() {
    const data = await prisma.money_saved.findFirst(convertQueryToPrismaUtil(req.query, 'money_saved'));
    return res.status(200).json(data);
  }

  async function updateMoneySavedById() {
    await moneySavedValidationSchema.validate(req.body);
    const data = await prisma.money_saved.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteMoneySavedById() {
    const data = await prisma.money_saved.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
