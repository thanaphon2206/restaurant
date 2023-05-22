FROM node:18-alpine
EXPOSE 6699
WORKDIR /usr/app
COPY package.json .
RUN npm install
COPY . .
