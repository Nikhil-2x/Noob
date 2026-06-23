FROM node:alpine

WORKDIR /myapp

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm
RUN pnpm install

COPY . .

EXPOSE 3002

CMD ["node", "index.js"]
