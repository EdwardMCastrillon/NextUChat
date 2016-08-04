# Get Node.js latest LTS
FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/nextuchat
WORKDIR /usr/src/nextuchat

# Copy the app folder
COPY . /usr/src/nextuchat

EXPOSE 8081
RUN npm install
CMD [ "npm", "start" ]
