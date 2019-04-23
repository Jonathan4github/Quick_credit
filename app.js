import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    data: 'Welcome to Quick Credit Web App.',
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Page not found',
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
export default app;
