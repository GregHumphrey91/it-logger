import express, { Request, Response } from 'express';

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

export default router;
