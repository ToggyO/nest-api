FROM node:14.15.0 as builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --silent
COPY ./ ./
RUN npm run build

FROM node:14.15.0-alpine
ARG NODE_ENV
ARG API_PREFIX
ARG HOST
ARG PORT
ARG EXTERNAL_PORT
ARG CRYPTO_SECRET
ARG AUTH_HEADER
ARG IDENTITY_HEADER
ARG JWT_SECRET
ARG ACCESS_LIFETIME
ARG REFRESH_LIFETIME
ARG REDIS_HOST
ARG REDIS_PASSWORD
ARG REDIS_DB=0
ARG REDIS_PORT
ARG REDIS_EXTERNAL_PORT
ARG REDIS_TOKEN_PREFIX
ARG POSTGRES_HOST
ARG POSTGRES_PORT
ARG POSTGRES_EXTERNAL_PORT
ARG POSTGRES_USER
ARG POSTGRES_DATABASE
ARG POSTGRES_PASSWORD
ENV NODE_ENV=${NODE_ENV}
ENV API_PREFIX=${API_PREFIX}
ENV HOST=${HOST}
ENV PORT=${PORT}
ENV EXTERNAL_PORT=${EXTERNAL_PORT}
ENV CRYPTO_SECRET=${CRYPTO_SECRET}
ENV AUTH_HEADER=${AUTH_HEADER}
ENV IDENTITY_HEADER=${IDENTITY_HEADER}
ENV JWT_SECRET=${JWT_SECRET}
ENV ACCESS_LIFETIME=${ACCESS_LIFETIME}
ENV REFRESH_LIFETIME=${REFRESH_LIFETIME}
ENV REDIS_HOST=${REDIS_HOST}
ENV REDIS_PASSWORD=${REDIS_PASSWORD}
ENV REDIS_DB=${REDIS_DB}
ENV REDIS_PORT=${REDIS_PORT}
ENV REDIS_EXTERNAL_PORT=${REDIS_EXTERNAL_PORT}
ENV REDIS_TOKEN_PREFIX=${REDIS_TOKEN_PREFIX}
ENV POSTGRES_HOST=${POSTGRES_HOST}
ENV POSTGRES_PORT=${POSTGRES_PORT}
ENV POSTGRES_EXTERNAL_PORT=${POSTGRES_EXTERNAL_PORT}
ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_DATABASE=${POSTGRES_DATABASE}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
WORKDIR /usr/app
COPY --from=builder /usr/app/dist ./
COPY --from=builder /usr/app/package*.json ./
COPY --from=builder /usr/app/.env.* ./
COPY --from=builder /usr/app/clean.env ./
RUN npm install --production
CMD npm run migration:run:prod && npm run start:prod

#FROM node:14.15.0 as builder
#ARG NODE_ENV
#ARG API_PREFIX
#ARG HOST
#ARG PORT
#ARG EXTERNAL_PORT
#ARG CRYPTO_SECRET
#ARG AUTH_HEADER
#ARG IDENTITY_HEADER
#ARG JWT_SECRET
#ARG ACCESS_LIFETIME
#ARG REFRESH_LIFETIME
#ARG REDIS_HOST
#ARG REDIS_PASSWORD
#ARG REDIS_DB=0
#ARG REDIS_PORT
#ARG REDIS_EXTERNAL_PORT
#ARG REDIS_TOKEN_PREFIX
#ARG POSTGRES_HOST
#ARG POSTGRES_PORT
#ARG POSTGRES_EXTERNAL_PORT
#ARG POSTGRES_USER
#ARG POSTGRES_DATABASE
#ARG POSTGRES_PASSWORD
#ENV NODE_ENV=${NODE_ENV}
#ENV API_PREFIX=${API_PREFIX}
#ENV HOST=${HOST}
#ENV PORT=${PORT}
#ENV EXTERNAL_PORT=${EXTERNAL_PORT}
#ENV CRYPTO_SECRET=${CRYPTO_SECRET}
#ENV AUTH_HEADER=${AUTH_HEADER}
#ENV IDENTITY_HEADER=${IDENTITY_HEADER}
#ENV JWT_SECRET=${JWT_SECRET}
#ENV ACCESS_LIFETIME=${ACCESS_LIFETIME}
#ENV REFRESH_LIFETIME=${REFRESH_LIFETIME}
#ENV REDIS_HOST=${REDIS_HOST}
#ENV REDIS_PASSWORD=${REDIS_PASSWORD}
#ENV REDIS_DB=${REDIS_DB}
#ENV REDIS_PORT=${REDIS_PORT}
#ENV REDIS_EXTERNAL_PORT=${REDIS_EXTERNAL_PORT}
#ENV REDIS_TOKEN_PREFIX=${REDIS_TOKEN_PREFIX}
#ENV POSTGRES_HOST=${POSTGRES_HOST}
#ENV POSTGRES_PORT=${POSTGRES_PORT}
#ENV POSTGRES_EXTERNAL_PORT=${POSTGRES_EXTERNAL_PORT}
#ENV POSTGRES_USER=${POSTGRES_USER}
#ENV POSTGRES_DATABASE=${POSTGRES_DATABASE}
#ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
#WORKDIR /usr/app
#COPY package*.json ./
#RUN npm install --silent
#COPY ./ ./
#RUN npm run build
#RUN npm run migration:run
#
#FROM node:14.15.0-alpine
#ARG NODE_ENV
#ARG API_PREFIX
#ARG HOST
#ARG PORT
#ARG EXTERNAL_PORT
#ARG CRYPTO_SECRET
#ARG AUTH_HEADER
#ARG IDENTITY_HEADER
#ARG JWT_SECRET
#ARG ACCESS_LIFETIME
#ARG REFRESH_LIFETIME
#ARG REDIS_HOST
#ARG REDIS_PASSWORD
#ARG REDIS_DB=0
#ARG REDIS_PORT
#ARG REDIS_EXTERNAL_PORT
#ARG REDIS_TOKEN_PREFIX
#ARG POSTGRES_HOST
#ARG POSTGRES_PORT
#ARG POSTGRES_EXTERNAL_PORT
#ARG POSTGRES_USER
#ARG POSTGRES_DATABASE
#ARG POSTGRES_PASSWORD
#ENV NODE_ENV=${NODE_ENV}
#ENV API_PREFIX=${API_PREFIX}
#ENV HOST=${HOST}
#ENV PORT=${PORT}
#ENV EXTERNAL_PORT=${EXTERNAL_PORT}
#ENV CRYPTO_SECRET=${CRYPTO_SECRET}
#ENV AUTH_HEADER=${AUTH_HEADER}
#ENV IDENTITY_HEADER=${IDENTITY_HEADER}
#ENV JWT_SECRET=${JWT_SECRET}
#ENV ACCESS_LIFETIME=${ACCESS_LIFETIME}
#ENV REFRESH_LIFETIME=${REFRESH_LIFETIME}
#ENV REDIS_HOST=${REDIS_HOST}
#ENV REDIS_PASSWORD=${REDIS_PASSWORD}
#ENV REDIS_DB=${REDIS_DB}
#ENV REDIS_PORT=${REDIS_PORT}
#ENV REDIS_EXTERNAL_PORT=${REDIS_EXTERNAL_PORT}
#ENV REDIS_TOKEN_PREFIX=${REDIS_TOKEN_PREFIX}
#ENV POSTGRES_HOST=${POSTGRES_HOST}
#ENV POSTGRES_PORT=${POSTGRES_PORT}
#ENV POSTGRES_EXTERNAL_PORT=${POSTGRES_EXTERNAL_PORT}
#ENV POSTGRES_USER=${POSTGRES_USER}
#ENV POSTGRES_DATABASE=${POSTGRES_DATABASE}
#ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
#WORKDIR /usr/app
#COPY --from=builder /usr/app/dist ./
#CMD npm run start:prod