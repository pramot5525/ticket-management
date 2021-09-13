FROM node:alpine

RUN mkdir -p /
WORKDIR /

COPY ./server/package.json /
RUN npm install

COPY ./server /

EXPOSE 3000

# CMD ["npm","start"]
COPY ./docker-entrypoint.sh /docker-entrypoint.sh

# COPY ./server/config/database.json /user/app/config/config.json

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
