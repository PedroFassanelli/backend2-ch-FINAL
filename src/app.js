import express from 'express';
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';
import mongoose from 'mongoose';
import passport from 'passport';
import './config/passport.js';
import dotenv from 'dotenv';


import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import viewsRouter from './routes/viewsRouter.js';
import sessionRouter from './routes/sessionsRouter.js';
import userRouter from './routes/usersRouter.js';

import __dirname from './utils/constantsUtil.js';
import websocket from './websocket.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

//Handlebars Config
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/../views');
app.set('view engine', 'handlebars');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(passport.initialize());

//Routers
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/users', userRouter);
app.use('/', viewsRouter);

// Conexión a la base de datos y arranque
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
  }).catch(err => console.error('Error al conectar a MongoDB', err));

// const io = new Server(httpServer);
// websocket(io);