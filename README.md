## Description

A simple REST API using Node with Express, Typescript and TypeORM.

## Setup:

1. Rename `.env.template` to `.env`
1. Update the environment variables in the `.env` file
1. Build the image and run the container:
   ```bash
   $ docker compose up -d
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
