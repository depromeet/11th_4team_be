FROM node:14-alpine

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 5600

CMD ["npm","run","start"]
