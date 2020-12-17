FROM node:15.3.0-alpine AS build

WORKDIR /opt/api

COPY . .

RUN yarn --frozen-lockfile 
RUN yarn build

FROM node:15.3.0-alpine
WORKDIR /opt/api

COPY --from=build /opt/api/dist ./dist
COPY --from=build /opt/api/package.json .
COPY --from=build /opt/api/node_modules ./node_modules
EXPOSE 8080

CMD ["yarn", "start"]