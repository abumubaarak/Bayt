# stage 2 - build the final image and copy the react build files
FROM nginx:1.19-alpine
COPY ./default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
