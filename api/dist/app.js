"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/db");
const type_graphql_1 = require("type-graphql");
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const user_resolver_1 = require("./app/user/user.resolver");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = 3210;
        this.initializeMiddlewares();
        this.initializeResolvers();
    }
    initializeMiddlewares() {
        this.app.use(express_1.default.json());
    }
    initializeResolvers() {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = yield (0, type_graphql_1.buildSchema)({
                resolvers: [user_resolver_1.UserResolver],
                emitSchemaFile: true,
            });
            const server = new apollo_server_express_1.ApolloServer({
                schema,
            });
            yield server.start();
            server.applyMiddleware({ app: this.app });
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
exports.default = App;
new App().listen();
