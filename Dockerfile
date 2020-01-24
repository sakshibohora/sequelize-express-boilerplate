FROM node:8.11.1

# Create app directory
WORKDIR /sequelize-boilerplate

#install dependencies
COPY package.json /sequelize-boilerplate

RUN npm install

COPY . /sequelize-boilerplate

CMD [ "npm", "start" ]

EXPOSE 3000