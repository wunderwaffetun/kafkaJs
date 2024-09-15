FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "npm", "start" ]

#docker build --tag producer:1.0.0 .
#docker run -p 3000:3000 --name producer-try producer:1.0.0