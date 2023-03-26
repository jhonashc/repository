import "dotenv/config";
import "reflect-metadata";
import morgan from "morgan";
import helmet from "helmet";
import express, { Application } from "express";

import { AppDataSource } from "./config";
import { exceptionHandler } from "./middlewares";
import { authRouter, repositoryRouter, userRouter } from "./routes";

class Server {
  private app: Application;
  private port: string;
  private environment: string;
  private apiRoutes = {
    auth: "/api/auth",
    repositories: "/api/repositories",
    users: "/api/users",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";
    this.environment = process.env.NODE_ENV || "dev";

    this.middlewares();
    this.routes();

    this.customMiddlewares();
  }

  middlewares() {
    this.app.use(helmet());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
  }

  customMiddlewares() {
    this.app.use(exceptionHandler);
  }

  routes() {
    this.app.use(this.apiRoutes.auth, authRouter);
    this.app.use(this.apiRoutes.repositories, repositoryRouter);
    this.app.use(this.apiRoutes.users, userRouter);
  }

  listen() {
    AppDataSource.initialize()
      .then(() => {
        this.app.listen(this.port, () => {
          console.log(`🚀 App running on port ${this.port}`);
          console.log(`Running in ${this.environment}`);
        });
      })
      .catch((error) => console.error(error));
  }
}

export default Server;
