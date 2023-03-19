import "dotenv/config";
import morgan from "morgan";
import express, { Application } from "express";

import { AppDataSource } from "./config";

class Server {
  private app: Application;
  private port: string;

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

  routes() {}

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
