# stage1 - build react app first 
FROM node:16-alpine as build
WORKDIR /app
#ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install 
COPY . .
RUN npm run build

# stage 2 - build the final image and copy the react build files
FROM nginx
EXPOSE 80
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

