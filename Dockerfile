FROM node:alpine

WORKDIR /bot
COPY package.json . 
RUN npm install
COPY . .
CMD ["node", "src/Bot.js"]