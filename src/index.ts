import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users';
import indexRouter from './routes/index';
import authRouter from './routes/auth';
import connectMongoDB from '../db';

const app: Express = express();

// parse json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

const port: number = 5000 || process.env.PORT;

app.listen(port, () => {
  console.log(`App started on port ${port} `);
  connectMongoDB();
});

export default app;
