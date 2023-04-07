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

import { router } from "./routes";
import { buildSchema } from "type-graphql";
import winston from "winston";
import morgan from "morgan";

import { VoucherResolver } from "./graphql/resolvers/voucher";
import { myDataSource } from "./app-data-source";

async function main() {
  const connection = await myDataSource.initialize();

  if (connection?.isInitialized) {
    console.log("Data source has been initialized");
  } else {
    throw new Error("Error during Data Source initialization");
  }

  const schema = await buildSchema({
    resolvers: [VoucherResolver],
  });

  const app = express();
  const port = process.env.PORT || 3000;

  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer({
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
  app.use(router);
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
  );
  app.use(cors(), express.json(), expressMiddleware(apolloServer));
  httpServer.listen({ port }, () => {
    console.log(
      `Server Listening on port ${port}\nVisit: http://localhost:${port}/graphql or http://localhost:${port}`
    );
  });
}

main();
