import { hash } from 'bcryptjs';
import type { Request, Response } from 'express';

import { prisma } from '../prisma/client';

class UserController {
  async findALl(req: Request, res: Response) {
    return res.json(await prisma.user.findMany());
  }

  async findById(req: Request, res: Response) {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id
      }
    });

    if (!user) return res.json({ error: 'user not found' });

    return res.json(user);
  }

  async create(req: Request, res: Response) {
    if (
      await prisma.user.findUnique({
        where: {
          email: req.body.email
        }
      })
    )
      return res.json({ error: 'user already exists' });

    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        password: await hash(req.body.password, 14)
      }
    });
    return res.json(user);
  }

  async delete(req: Request, res: Response) {
    if (
      !(await prisma.user.findUnique({
        where: {
          id: req.params.id
        }
      }))
    )
      return res.json({ error: 'user not found' });

    await prisma.user.delete({
      where: {
        id: req.params.id
      }
    });

    return res.json({ message: 'ok' });
  }

  async update(req: Request, res: Response) {
    if (
      !(await prisma.user.findUnique({
        where: {
          id: req.params.id
        }
      }))
    )
      return res.json({ error: 'user not found' });

    const user = await prisma.user.update({
      where: {
        id: req.params.id
      },
      data: req.body
    });

    return res.json(user);
  }
}

export default new UserController();
