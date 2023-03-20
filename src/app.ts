import "dotenv/config";
import "reflect-metadata";
import morgan from "morgan";
import express, { Application } from "express";

import { AppDataSource } from "./config";
import { userRouter } from "./routes";

class Server {
  private app: Application;
  private port: string;
  private apiRoutes = {
    users: "/api/users",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(morgan("tiny"));
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.apiRoutes.users, userRouter);
  }

  listen() {
    AppDataSource.initialize()
      .then(() => {
        this.app.listen(this.port, () => {
          console.log(`🚀 App running on port ${this.port}`);
        });
      })
      .catch((error) => console.log(error));
  }
}

export default Server;
