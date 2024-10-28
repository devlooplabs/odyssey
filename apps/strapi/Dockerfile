FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
RUN apt update
RUN apt install -y --no-install-recommends libc6-dev gcc g++ make && rm -rf /var/lib/apt/lists/*
WORKDIR /app

RUN npm install turbo@^2 node-gyp --global
COPY . .

RUN turbo prune strapi --docker

FROM base AS installer
RUN apt update
RUN apt install -y --no-install-recommends build-essential gcc autoconf automake zlib1g-dev libpng-dev libvips-dev git && rm -rf /var/lib/apt/lists/*
WORKDIR /app
RUN pnpm install node-gyp --global
COPY --from=builder /app/out/json/ .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
 
COPY --from=builder /app/out/full/ .
RUN pnpm build --filter=strapi

FROM base AS runner
RUN apt update
RUN apt install -y --no-install-recommends libvips-dev && rm -rf /var/lib/apt/lists/*
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
 
COPY --from=installer /app ./
WORKDIR /app/apps/strapi

RUN ls -al
CMD pnpm run start
