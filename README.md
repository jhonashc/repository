## Description

A simple REST API using Node with Express, Typescript and TypeORM.

## Setup:

1. Rename `.env.template` to `.env`
1. Update the environment variables in the `.env` file
1. Build the images and run the containers:
   ```
   docker-compose up -d
   ```
1. Install dependencies:
   ```bash
   $ pnpm install
   ```
1. Running the app:

   ```bash
   # development mode
   $ pnpm dev

   # production mode
   $ pnpm build
   $ pnpm start
   ```
