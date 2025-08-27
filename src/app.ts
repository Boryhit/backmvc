import express from 'express';
import { countryRouter } from './routes/contry.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', countryRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});