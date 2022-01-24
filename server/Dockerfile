FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY tsconfig*.json ./ 

RUN npm ci --only-production

COPY . .

RUN npm run build

# Bundle app source

EXPOSE 4000
EXPOSE 9000
ENV NODE_ENV=production

CMD ["npm","run","start"]


