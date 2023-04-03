import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jsonWebToken, { Jwt } from 'jsonwebtoken';
import config from 'config';

import {
  check,
  validationResult,
  ValidationError,
  Result,
} from 'express-validator';
import User from '../models/User';

const router = express.Router();

/* GET Home. */
router.get('/', async (reqeust: Request, response: Response) => {
  try {
    response.send('Users');
  } catch (error: any) {
    console.log('Error: ', error);
    response.status(500).json(error);
  }
});

router.post(
  '/',
  [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'Please include valid email').isEmail(),
    check(
      'password',
      "Please enter a password that's 6 or more characters",
    ).isLength({ min: 6 }),
  ],
  async (request: Request, response: Response) => {
    try {
      const errors: Result<ValidationError> = validationResult(request);
      if (!errors.isEmpty()) {
        response.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = request.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        response.status(400).json({ msg: 'User already exists' });
      }
      // Initialize user object
      const newUser = new User({
        name,
        email,
        password,
      });

      // Generate salt using bcrypt
      const salt = await bcrypt.genSalt(10);

      // Hash password using salt method
      newUser.password = await bcrypt.hash(password, salt);

      console.log('New Created User: ', newUser);

      // Save user object in database
      newUser.save();

      const payload = {
        user: {
          id: newUser.id,
        },
      };

      jsonWebToken.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 3600,
        },
        (error, token) => {
          if (error) throw error;
          response.status(200).json({ token });
        },
      );
    } catch (error: any) {
      console.log('Error: ', error);
      response.status(500).json(error);
    }
  },
);

export default router;
