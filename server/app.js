import express from 'express';
import bodyParser from 'body-parser';
import Debug from 'debug';
import authRoutes from './routes/auth/router';
import loanRoutes from './routes/loan/router';
import repaymentsRoutes from './routes/repayments/router';
import userRoutes from './routes/user/router';

const app = express();
const debug = Debug('rest');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    data: 'Welcome to Quick Credit Web App.',
  });
});

app.use('/api/v1/', authRoutes);
app.use('/api/v1/', loanRoutes);
app.use('/api/v1/', repaymentsRoutes);
app.use('/api/v1/', userRoutes);

app.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Page not found',
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => debug(`Listening on port ${port}`));
export default app;
