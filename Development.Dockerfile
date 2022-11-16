FROM node:13.5.0-alpine
WORKDIR /auth
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn --ignore-engines
COPY . .
CMD ["yarn", "start"]