FROM	node:16.14.2-slim

WORKDIR	/app

COPY    package.json .
COPY    package-lock.json .

RUN     npm install

COPY	server.js .

CMD     ["node", "server.js"]
