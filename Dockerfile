FROM node:14.5 AS builder

RUN mkdir -p /opt
WORKDIR /opt

ENV CYPRESS_INSTALL_BINARY 0

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:14.5-alpine

RUN mkdir -p /opt
WORKDIR /opt

COPY --from=builder /opt/.next ./.next
COPY --from=builder /opt/package*.json ./

ENV PORT 3000
ENV NODE_ENV production

RUN npm ci

EXPOSE 3000

CMD npm start
