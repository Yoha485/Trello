FROM node:14.17-alpine as dev

WORKDIR /app/

COPY ./server/package-lock.json ./server/package.json ./

RUN npm install 

COPY server .

FROM node:14.17-alpine as builder

WORKDIR /app/

COPY --from=dev /app/ /app/

RUN yarn build 


FROM node:14.17-alpine

WORKDIR /app/
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./

RUN NODE_ENV=production
RUN npm install

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./dist
EXPOSE 80
CMD ["npm","run", "start:prod"]