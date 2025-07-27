import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";
import { PrismaModule } from "../prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "../auth/auth.module";
import { Module } from "@nestjs/common";
import { join } from "path";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/graphql/schema.gql"),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
