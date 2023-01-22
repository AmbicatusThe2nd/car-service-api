FROM node:lts-alpine
WORKDIR /usr/app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3026
CMD ["apidoc", "-i routes/ -o apidoc/"]
CMD [ "npm", "start" ]