# Get Node.js latest LTS
FROM node:6.2.1
RUN mkdir -p /app
ADD package.json /app
WORKDIR /app
ADD . /app
RUN npm install
# Set WORKDIR
EXPOSE 3000
CMD [ "npm", "start" ]
