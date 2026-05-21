FROM node:24-alpine AS builder

WORKDIR /usr/app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:24-alpine AS runner

WORKDIR /usr/app

COPY --from=builder package*.json ./
COPY --from=builder node_modules ./node_modules
COPY --from=builder dist ./dist

RUN npm prune=production

EXPOSE 3000

USER node
CMD ["node", "dist/main"]