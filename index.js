import express  from "express";
import cors from "cors";
import UserRouter from './routes/UserRoute.js';
import ProductRouter from './routes/ProductRoute.js';
import LoginRouter from './routes/LoginRoute.js';
import UserProductRouter from './routes/UserProductRoute.js';
import ImageRouter from './routes/ImageRoute.js';


const app = express();
const route = 4000;
app.use(cors());
app.use(express.json());
app.use(UserRouter);
app.use(ProductRouter);
app.use(LoginRouter);
app.use(UserProductRouter);
app.use(ImageRouter);
app.listen(route, ()=> console.log(`server up and running in route ${route}...`));