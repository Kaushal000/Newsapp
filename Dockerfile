FROM node:12.14.0 as build 
ARG REACT_APP_NEWS_API_KEY
WORKDIR /app 
COPY ./package.json . 
COPY ./package-lock.json .
RUN npm install
COPY ./public ./public/ 
COPY ./src ./src/
RUN REACT_APP_NEWS_API_KEY=${REACT_APP_NEWS_API_KEY} \ 
    npm run build
FROM nginx:1.17-alpine 
COPY --from=build /app/build /usr/share/nginx/html 
EXPOSE 80 
CMD ["nginx", "-g", "daemon off;"]