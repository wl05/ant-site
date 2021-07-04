FROM node:10.1.0
RUN apt-get update \
    && apt-get install -y nginx
WORKDIR /app
COPY . /app/
EXPOSE 80
RUN  npm install \
&& npm run docs:build \
&& cp -r /docs/.vuepress/dist/* /var/www/html \
&& rm -rf /app
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx","-g","daemon off;"]