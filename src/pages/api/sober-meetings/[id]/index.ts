import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { soberMeetingValidationSchema } from 'validationSchema/sober-meetings';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.sober_meeting
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getSoberMeetingById();
    case 'PUT':
      return updateSoberMeetingById();
    case 'DELETE':
      return deleteSoberMeetingById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSoberMeetingById() {
    const data = await prisma.sober_meeting.findFirst(convertQueryToPrismaUtil(req.query, 'sober_meeting'));
    return res.status(200).json(data);
  }

  async function updateSoberMeetingById() {
    await soberMeetingValidationSchema.validate(req.body);
    const data = await prisma.sober_meeting.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteSoberMeetingById() {
    const data = await prisma.sober_meeting.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
