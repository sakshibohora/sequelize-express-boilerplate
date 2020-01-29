FROM node:10-alpine

# Create app directory
WORKDIR /sequelize-boilerplate

VOLUME /Users/radhakotecha/Desktop/sequelize-boilerplate:/sequelize-boilerplate
#install dependencies
COPY package.json /sequelize-boilerplate

RUN npm install

COPY . /sequelize-boilerplate

EXPOSE 3000

RUN chmod +x start.sh

CMD sh ./start.sh
