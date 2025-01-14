FROM node

WORKDIR /app/backend

COPY package*.json ./

RUN npm install

COPY --chown=node:node . .

EXPOSE 8000

ENV HOST=0.0.0.0 PORT=8000

CMD ["npm", "run", "start"]
