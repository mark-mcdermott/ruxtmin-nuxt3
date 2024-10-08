# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=21.7.2
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Nuxt"

# Nuxt app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"
ENV HOST=0.0.0.0
ENV PORT=3000

# Install curl in the base image
RUN apt-get update && apt-get install --no-install-recommends -y curl

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY package-lock.json package.json ./
RUN npm ci --include=dev

# Copy application code
COPY . .

# Build application
RUN npm run build

# Remove development dependencies
RUN npm prune --omit=dev

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Expose port and set start command
EXPOSE 3000
CMD [ "node", ".output/server/index.mjs" ]
