import { compare } from 'bcryptjs';
import type { Request, Response, NextFunction } from 'express';
import { sign, verify as JWTVerify } from 'jsonwebtoken';

import { prisma } from '../prisma/client';

class AuthController {
  async login(req: Request, res: Response) {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email
      }
    });

    if (!user) return res.json({ error: 'user not found' });

    if (!(await compare(req.body.password, user.password)))
      return res.status(400).json({ error: 'Invalid password' });

    const token = sign({ id: user.id }, process.env.SECRET as string, {
      expiresIn: 86400
    });

    return res.json({ user, token });
  }

  async verify(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ error: 'No token provided' });

    return JWTVerify(
      token as string,
      process.env.SECRET as string,
      async (err) => {
        if (err)
          return res.status(401).send({ error: 'Token provided is invalid' });
        return next();
      }
    );
  }
}

export default new AuthController();
