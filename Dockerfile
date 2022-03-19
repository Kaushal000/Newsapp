FROM node:17-alpine3.14 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./public /app/public/ 
COPY ./src /app/src/    
ARG API_KEY
ENV REACT_APP_NEWS_API_KEY $API_KEY 
RUN npm run build
FROM nginx:1.21.6-alpine
COPY --from=build-stage /app/build/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]