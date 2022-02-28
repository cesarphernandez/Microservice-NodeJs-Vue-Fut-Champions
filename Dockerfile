#Get node image from dockerHub
FROM node:12-alpine
WORKDIR /usr/src/app
#Copiar los packages 
COPY package*.json ./

RUN npm install 

#Copiar los node modules
COPY . . 
# Puerto 8080 o variable entorno
EXPOSE 8080

CMD ["node", "app.js"]