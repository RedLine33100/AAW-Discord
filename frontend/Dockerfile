FROM node

WORKDIR /app/frontend

COPY package*.json ./

RUN npm install

COPY --chown=node:node . .

RUN npm run build

EXPOSE 3777

ENV HOST=0.0.0.0 PORT=3777

CMD ["npm", "run", "preview"]
