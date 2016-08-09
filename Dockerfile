# Get Node.js latest LTS
FROM node:argon
RUN mkdir -p /app
ADD package.json /app
WORKDIR /app
ADD . /app
RUN npm install
# Set WORKDIR
EXPOSE 3000
CMD [ "npm", "start" ]
