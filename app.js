import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth/auth';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    data: 'Welcome to Quick Credit Web App.',
  });
});

app.use('/api/v1/', authRoutes);
app.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Page not found',
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
export default app;