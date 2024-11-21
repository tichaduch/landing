FROM node:22 as build-stage

WORKDIR /app
COPY ./ .
RUN yarn install 
RUN node --run build

FROM node:22-slim as prod
WORKDIR /app

COPY --from=build-stage /app/package* ./
COPY --from=build-stage /app/.output ./.output

CMD node .output/server/index.mjs
