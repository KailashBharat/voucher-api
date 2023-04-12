import "dotenv/config";
import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import express from "express";
import helmet from "helmet";
import http from "http";
import cors from "cors";
import rateLimit from 'express-rate-limit'

import { buildSchema } from "type-graphql";
import depthLimit from "graphql-depth-limit"
import morgan from "morgan";

import { myDataSource } from "./app-data-source";
import { authChecker } from "./graphql/auth/auth-checker";
import { Context } from "./graphql/auth/context.node";
import { GraphQLResolvers } from "./graphql";

async function main() {
  const connection = await myDataSource.initialize();

  if (connection?.isInitialized) {
    console.log("Data source has been initialized");
  } else {
    throw new Error("Error during Data Source initialization");
  }

  const schema = await buildSchema({
    resolvers: <any>GraphQLResolvers,
    authChecker,
  });

  const app = express();
  const port = process.env.PORT || 3000;

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15min
    max: 100, 
    standardHeaders: true, 
    legacyHeaders: false, 
  })
  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer<Context>({
    validationRules: [depthLimit(10)],
    schema,
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault({
            embed: true,
            graphRef: "plaid-gufzoj@current",
          })
        : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });

  await apolloServer.start();

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(limiter);
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
  );
  app.use(
    cors(),
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => {
        // mock user
        const ctx: Context = {
          user: {
            id: "2",
            name: "kailash",
            role: "ADMIN",
          },
        };
        return ctx;
      },
    })
  );
  httpServer.listen({ port }, () => {
    console.log(
      `Server Listening on port ${port}\nVisit: http://localhost:${port}/graphql or http://localhost:${port}\nIf GraphQL sandbox doesn't load, go to https://flyby-locations-sub.herokuapp.com/ and enter 'http://localhost:${port}' in the input bar in the top left corner`
    );
  });
}

main();
