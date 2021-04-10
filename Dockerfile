FROM node:14.16.1-alpine
ENV NODE_ENV=production

COPY ./.env .
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .

EXPOSE 1337
CMD ["npm", "start"]
