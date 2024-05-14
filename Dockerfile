###################
# BUILD FOR PRODUCTION
###################

FROM node:lts-alpine as build
RUN apk update && apk add openssl

WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
COPY . .

RUN yarn prisma:generate --schema=./src/prisma/schema.prisma

# Run the build command which creates the production bundle
RUN yarn build

# Passing in --only=production ensures that only the production dependencies are installed.
# This ensures that the node_modules directory is as optimized as possible.
RUN yarn --prod

###################
# PRODUCTION
###################

FROM node:lts-alpine
RUN apk update && apk add openssl

# Copy the bundled code from the build stage to the production image
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/.env ./
COPY --from=Build /usr/src/app/package.json ./

EXPOSE 3005

# Start the server using the production build
CMD ["yarn","start:prod"]