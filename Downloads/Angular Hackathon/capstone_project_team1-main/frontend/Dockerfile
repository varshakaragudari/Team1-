FROM node:17-alpine3.15
COPY package.json .
RUN npm install --force
RUN npm install react-helmet --force
RUN npm install react-credit-cards --force
RUN npm install react-simple-chatbot --force
RUN npm install --force
COPY . .
CMD ["npm", "start"]