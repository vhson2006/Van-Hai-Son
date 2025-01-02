import express from "express";
import dotenv from "dotenv";
import logger from "./commons/logger";
import rootRouter from "./commons/router";
import helmet from "helmet";
import  compression from 'compression';
import { MyDataSource } from "./app-data-source";
import bodyParser  from 'body-parser';

dotenv.config();

const app = express();
app.use(compression());
app.use(helmet());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(rootRouter)

MyDataSource
  .initialize()
  .then(() => logger.log("debug", 'Connect to database success'))
  .catch(() => logger.log("error", 'Can not access to database'))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { 
  logger.log("debug", `Server running at PORT: ${PORT}`); 
}).on("error", (error) => {
  logger.log("error", error.message); 
  throw new Error(error.message);
});