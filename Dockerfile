FROM node:14.18-alpine

WORKDIR /home/app

COPY . .

RUN apt-get update

RUN npm install

ENTRYPOINT ["npm run test"]