ARG NODE_VERSION=20.9.0

# Alpine image
FROM node:${NODE_VERSION}-alpine AS alpine
RUN apk update
RUN apk add --no-cache libc6-compat

# Setup pnpm and turbo on the alpine base
FROM alpine as base
RUN npm install turbo --global
# RUN pnpm config set store-dir ~/.pnpm-store

# Prune projects
FROM base AS pruner
ARG PROJECT

WORKDIR /app
COPY . .
RUN turbo prune ${PROJECT} --docker

# Build the project
FROM base AS builder
ARG PROJECT

WORKDIR /app

# Copy lockfile and package.json's of isolated subworkspace
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
COPY --from=pruner /app/out/json/ .

# First install the dependencies (as they change less often)
RUN npm install

# Copy source code of isolated subworkspace
COPY --from=pruner /app/out/full/ .

RUN turbo build --filter=${PROJECT}

# Final image
FROM alpine AS runner
ARG PROJECT

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

WORKDIR /app
COPY --from=builder --chown=nodejs:nodejs /app .
WORKDIR /app/services/${PROJECT}

# ARG PORT=8080
ENV PORT=${PORT}
ENV NODE_ENV=production
EXPOSE ${PORT}

CMD node dist/start.js