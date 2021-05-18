FROM node:12.22.1
WORKDIR /app
COPY package.json /app/package.json
RUN npm install -g @angular/cli
COPY . /app
CMD ng serve --open