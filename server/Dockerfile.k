FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY tsconfig*.json ./ 

RUN npm install

# Bundle app source
COPY . .

EXPOSE 4000
EXPOSE 9000

CMD ["npm","run","dev"]

