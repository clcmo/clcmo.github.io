import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateProject = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('link').isURL().withMessage('Link must be a valid URL'),
  body('tags').isArray().withMessage('Tags must be an array'),
  body('faicon').notEmpty().withMessage('Faicon is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
