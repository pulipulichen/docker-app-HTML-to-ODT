FROM pudding/docker-app:node-18-7z-20230521
# FROM node:21.6-bullseye

RUN apt-get update --fix-missing

COPY ./docker-build/pandoc-3.1.11.1-1-amd64.deb /pandoc-3.1.11.1-1-amd64.deb

RUN apt-get install -y /pandoc-3.1.11.1-1-amd64.deb
RUN rm -rf /pandoc-3.1.11.1-1-amd64.deb

CMD ["node", "/app/index.js"]

COPY ./package.json /package.json
WORKDIR /
RUN npm i

