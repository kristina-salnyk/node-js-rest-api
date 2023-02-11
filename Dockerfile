FROM node

WORKDIR /node-js-rest-api

COPY . .

RUN npm i

EXPOSE 3000

CMD ["npm", "start"]