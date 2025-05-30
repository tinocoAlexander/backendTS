import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes';
import connectDB from './config/db';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);

connectDB().then(() => {
  console.log('Base de datos conectada correctamente');
    app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
