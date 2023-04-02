import express, { Request, Response } from 'express';

const router = express.Router();

// Get api/route
router.get('/', async (reqeust: Request, response: Response) => {
  try {
    response.send('Auth');
  } catch (error: any) {
    console.log('Error: ', error);
    response.status(500).json(error);
  }
});

// Post api/route
router.post('/', async (reqeust: Request, response: Response) => {
  try {
    response.send('Auth');
  } catch (error: any) {
    console.log('Error: ', error);
    response.status(500).json(error);
  }
});

export default router;
