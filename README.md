# NestJS GraphQL API

This is the official repository for the NestJS GraphQL API, a robust backend service designed to offer efficient data handling and operations for web and mobile applications.

## Overview

This project is structured to facilitate development, testing, and deployment of a GraphQL-based API using NestJS, a progressive Node.js framework. The API is built with a focus on performance, scalability, and ease of use, incorporating various modern tools and practices.

## Powered by

<p align="center">
  <table>
    <tr>
      <td align="center">
        <a href="https://docs.nestjs.com/">
          <img src="https://github.com/maurim96/nestjs-graphql-scaffold/assets/22548752/d1c898cb-397f-4937-8e83-27cee1123036" width="110" height="90" alt="React Native logo"><br/>
          Nest.js
        </a>
      </td>
      <td align="center">
        <a href="https://www.postgresql.org/docs/">
          <img src="https://github.com/maurim96/nestjs-graphql-scaffold/assets/22548752/38208c1d-6bb9-4946-9a5c-c96729f3e669" width="100" height="90" alt="Postgresql logo"><br/>
          PostgreSQL
        </a>
      </td>
      <td align="center">
        <a href="https://orm.drizzle.team/docs/overview">
          <img src="https://github.com/maurim96/nestjs-graphql-scaffold/assets/22548752/a54390f1-5284-45a0-9db6-af2178ad8b56" width="100" height="90" alt="Drizzle logo"><br/>
          Drizzle ORM
        </a>
      </td>
      <td align="center">
        <a href="https://graphql.org/learn/">
          <img src="https://github.com/maurim96/nestjs-graphql-scaffold/assets/22548752/474643de-4126-4639-9c7b-5bddbec022a5" width="110" height="90" alt="GraphQL logo"><br/>
          GraphQL
        </a>
      </td>
      <td align="center">
        <a href="https://clerk.com/docs">
          <img src="https://github.com/maurim96/rn-expo-scaffold/assets/22548752/f2f691e0-c06f-45e8-96c8-580fa83a986e" width="150" height="90" alt="Clerk logo"><br/>
          Clerk
        </a>
      </td>
      <td align="center">
        <a href="https://docs.sentry.io/platforms/react-native/">
          <img src="https://github.com/maurim96/nestjs-graphql-scaffold/assets/22548752/e7cd5c3f-7348-4bf4-9bce-54ec71a7c17b" width="110" height="90" alt="Sentry logo"><br/>
          Sentry
        </a>
      </td>
      <td align="center">
        <a href="https://docs.aws.amazon.com/">
          <img src="https://github.com/maurim96/nestjs-graphql-scaffold/assets/22548752/27ad5a15-ad90-415f-ab6d-afb69be3d475" width="100" height="90" alt="AWS logo"><br/>
          AWS
        </a>
      </td>
      <td align="center">
        <a href="https://docs.docker.com/">
          <img src="https://github.com/maurim96/nestjs-graphql-scaffold/assets/22548752/6b138799-8f10-4079-ac58-c9b1ffc9a276" width="100" height="90" alt="AWS logo"><br/>
          Docker
        </a>
      </td>
    </tr>
  </table>
</p>

### Project Structure

- `src/`: The main source directory containing the application logic.
  - `config`: Configuration files and environment variables.
  - `drizzle`: Drizzle schema, migration and other related files for database management.
  - `graphql`: GraphQl module for handling queries and mutations.
- `test/`: Contains unit and e2e tests for the application.
- `dist/`: The output directory for the compiled application.

### Key Technologies

- [NestJS](https://nestjs.com/) for creating scalable server-side applications.
- [GraphQL](https://graphql.org/) for efficient and flexible data queries.
- [TypeScript](https://www.typescriptlang.org/) for static type checking.
- [Drizzle ORM](https://orm.drizzle.team/docs/overview) for database access and management.
- [Docker](https://www.docker.com/) for containerization and easy deployment.
- [Sentry](https://docs.sentry.io/) for real-time error tracking and monitoring.
- [AWS](https://docs.aws.amazon.com/) for cloud-based resources and logging with CloudWatch.

### Features

- **GraphQL API**: Offers a powerful, flexible API for querying and mutating data.
- **CRUD Operations**: Simplified data manipulation with CRUD operations.
- **Authentication and Authorization**: Secure access to the API with integrated authentication and authorization mechanisms.
- **Logging and Monitoring**: Integrated logging and monitoring for easy debugging and performance tracking.

### Prerequisites

- Sentry account setup (in order to provide SENTRY_DNS env variable)
- Clerk account setup (in order to provide CLERK_SECRET_KEY env variable)
- AWS account setup (in order to provide AWS's env variables)
    - CloudWatch is currently implemented for Logging. If you want, it can be disabled or replaced (code update required)

### Development Setup

Ensure you have Node.js and Docker installed on your machine. Then follow these steps to set up the project for development:

1. Install dependencies:
    ```
    npm install
    ```
2. Start the development database with Docker Compose:
    ```
    npm run db:setup:dev
    ```
3. Apply database migrations:
    ```
    npm run db:migrate:pg
    ```
4. Start the development server with hot reload:
    ```
    npm run start:dev
    ```

### Testing

To run tests, use the following commands:

- For unit tests:
    ```
    npm test
    ```
- For e2e tests:
    ```
    npm run test:e2e
    ```
- To watch tests:
    ```
    npm run test:watch
    ```

### Deployment

Build the application for production by running:

```
npm run build
```

Then start the production server:

```
npm run start:prod
```

You may notice the `codebuild/` directory. This is because it's ready to be connected with a CodePipeline (AWS) setup. For more information you may refer to the [official docs](https://docs.aws.amazon.com/codepipeline/).

## Contribution Guidelines

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Commit your changes with clear, descriptive messages.
4. Push your changes and submit a pull request.

Please adhere to the coding standards and commit message guidelines provided in the repository.

### License

This project is [UNLICENSED](LICENSE). Feel free to use it according to the terms of the license.
