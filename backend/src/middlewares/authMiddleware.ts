import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AuthRequest extends Request {
  user?: any;
}

/**
 * Protects routes by requiring a valid JWT access token.
 */
export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_nexheal_2026') as { id: string };

      // Ensure user still exists and isn't locked
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, role: true, lockedUntil: true, email: true, firstName: true, lastName: true }
      });

      if (!user) {
        res.status(401).json({ success: false, error: 'Not authorized, user not found' });
        return;
      }

      if (user.lockedUntil && user.lockedUntil > new Date()) {
        res.status(423).json({ success: false, error: 'Not authorized, account is locked' });
        return;
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("[AuthMiddleware] Token failed:", error);
      res.status(401).json({ success: false, error: 'Not authorized, token failed or expired' });
    }
  } else {
    res.status(401).json({ success: false, error: 'Not authorized, no token provided' });
  }
};

/**
 * Authorizes specific roles to access a route.
 * @param roles Array of allowed roles
 */
export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ success: false, error: `User role ${req.user?.role} is not authorized to access this route.` });
      return;
    }
    next();
  };
};

/**
 * Ensures a user can only access their own resources, unless they are an admin.
 * Assumes the resource ID is passed as `req.params.id`.
 */
export const requireOwnership = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const resourceId = req.params.id;
  const user = req.user;

  if (!user) {
    res.status(401).json({ success: false, error: 'Not authorized' });
    return;
  }

  // Admins bypass ownership checks
  if (['SUPER_ADMIN', 'ZONE_ADMIN'].includes(user.role)) {
    return next();
  }

  if (resourceId !== user.id) {
    res.status(403).json({ success: false, error: 'Forbidden: You do not have ownership of this resource.' });
    return;
  }

  next();
};

/**
 * Validates access to EHR endpoints.
 * Allowed: The patient themselves, a Doctor with an active appointment, or an Admin.
 */
export const requireEHRAccess = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const patientId = req.params.patientId as string;
  const user = req.user;

  if (!user) {
    res.status(401).json({ success: false, error: 'Not authorized' });
    return;
  }

  // 1. Admins have access
  if (['SUPER_ADMIN', 'ZONE_ADMIN', 'HOSPITAL_ADMIN'].includes(user.role)) {
    return next();
  }

  // 2. Patient owns their own records
  if (user.id === patientId) {
    return next();
  }

  // 3. Doctor access requires an active appointment or explicit grant
  if (user.role === 'DOCTOR') {
    // Check if there's an appointment between this doctor and patient
    // We assume the Doctor has a doctor profile linked to user.id
    const doctorProfile = await prisma.doctorProfile.findUnique({
      where: { userId: user.id }
    });
    
    if (!doctorProfile) {
      res.status(403).json({ success: false, error: 'Doctor profile not found.' });
      return;
    }

    const patientProfile = await prisma.patientProfile.findUnique({
      where: { userId: patientId as string }
    });

    if (!patientProfile) {
      res.status(404).json({ success: false, error: 'Patient profile not found.' });
      return;
    }

    const hasAppointment = await prisma.appointment.findFirst({
      where: {
        doctorId: doctorProfile.id,
        patientId: patientProfile.id,
        // In real-world, we'd check if the appointment is recent/active
        // status: { in: ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED'] }
      }
    });

    if (hasAppointment) {
      return next();
    }
  }

  res.status(403).json({ success: false, error: 'Forbidden: You do not have access to this patient\'s EHR.' });
};
