FROM node:12

WORKDIR /usr/src/authentication
ADD package.json ./

RUN npm install
ADD . .

ENV NODE_ENV development

EXPOSE 80
CMD [ "npm", "start" ]
