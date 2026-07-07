import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../config/prisma';
import generateToken from '../utils/generateToken';

// @desc    Register a new user (Patient or Doctor)
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, role, specialization, experience, consultationFee } = req.body;

    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: role || 'PATIENT',
      },
    });

    // If role is DOCTOR, also create their DoctorProfile
    if (user.role === 'DOCTOR') {
      await prisma.doctorProfile.create({
        data: {
          userId: user.id,
          specialization: specialization || 'General',
          experience: experience ? parseInt(experience) : 0,
          consultationFee: consultationFee ? parseFloat(consultationFee) : 0.0,
        },
      });
    }

    res.status(201).json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      token: generateToken(user.id, user.role),
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ message: errorMessage });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        token: generateToken(user.id, user.role),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ message: errorMessage });
  }
};
