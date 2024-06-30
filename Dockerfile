FROM node:20.12.2-alpine3.18 as base

# All deps stage
FROM base as deps

WORKDIR /app

COPY . .

RUN npm install -g pnpm && pnpm install

EXPOSE 3333

CMD [ "pnpm", "dev" ]
