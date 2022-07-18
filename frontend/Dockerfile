FROM nginx:alpine
# COPY ./build /var/www
COPY ./build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
# COPY ./nginx.conf /etc/nginx/nginx.conf.d
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]