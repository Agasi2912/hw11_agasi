#Menggunakan OS node alpine pada saat docker dijalankan di container
FROM node:18.14.2-alpine3.17

#Nentuin folder apa yang akan di set di docker
WORKDIR /run-nodejs-dockerfile/src/app

#Copy package.json dan package.lock.json ke dalam folder docker
COPY package*.json ./

RUN npm install

#Copy seluruh folder ke dalam folder docker
COPY . .

EXPOSE 8080

#Jalankan perintah node app.js
CMD [ "node", "app.js" ]