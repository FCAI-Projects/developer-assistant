import express, { Application } from "express";
import "./config/db";
import { buildSchema } from "type-graphql";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { UserResolver } from "./app/user/user.resolver";
import { TaskResolver } from "./app/task/task.resolver";
import { CustomRolesResolver } from "./app/customRoles/customRoles.resolver";
import { ProjectsMembersResolver } from "./app/projectMembers/projectMembers.resolver";
import { ProjectResolver } from "./app/project/project.resolver";

export default class App {
  public app: Application;
  public port: number;

  constructor() {
    this.app = express();
    this.port = 3210;

    this.initializeMiddlewares();
    this.initializeResolvers();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
  }

  private async initializeResolvers() {
    const schema = await buildSchema({
      resolvers: [UserResolver, CustomRolesResolver, ProjectsMembersResolver, TaskResolver, ProjectResolver],
      emitSchemaFile: true,
    });
    const server = new ApolloServer({
      schema,
    });
    await server.start();
    server.applyMiddleware({ app: this.app });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

new App().listen();
