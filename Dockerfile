# Get Node.js latest LTS
FROM node:argon

# Set WORKDIR
WORKDIR /Users/Emonsalve/Desktop/nextuchat

# Copy the app folder
COPY . .

EXPOSE 8081
RUN npm install
CMD [ "npm", "start" ]
