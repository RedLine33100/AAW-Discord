FROM node

WORKDIR /app/backend

COPY package*.json ./
COPY /var/docker/backend/.env ./

RUN npm install

COPY --chown=node:node . .

RUN npm run build

EXPOSE 8000

ENV HOST=0.0.0.0 PORT=8000

CMD ["npm", "run", "start"]
