# node 이미지
FROM node

WORKDIR /usr/src/app

COPY back_end/projects/package.json ./

RUN npm install

COPY back_end/projects/ ./

EXPOSE 3000

CMD ["node", "index.js"]
