FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
RUN apt update
RUN apt install -y --no-install-recommends libc6-dev gcc g++ make && rm -rf /var/lib/apt/lists/*
WORKDIR /app

RUN pnpm install turbo@^2 --global
COPY . .

RUN turbo prune frontend --docker
 
FROM base AS installer
RUN apt update
RUN apt install -y --no-install-recommends libc6-dev gcc g++ make && rm -rf /var/lib/apt/lists/*
WORKDIR /app
 
COPY --from=builder /app/out/json/ .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
 
COPY --from=builder /app/out/full/ .
RUN pnpm build --filter=frontend
 
FROM base AS runner
WORKDIR /app
 
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
 
COPY --from=installer --chown=nextjs:nodejs /app/apps/front/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/front/.next/static ./apps/front/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/front/public ./apps/front/public
 
EXPOSE 3000
CMD node apps/front/server.js