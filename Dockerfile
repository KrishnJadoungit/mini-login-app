# Base image
FROM node:18

# App directory banayenge
WORKDIR /app

# Dependencies copy karo
COPY package*.json ./

# Dependencies install karo
RUN npm install

# Poora code copy karo
COPY . .

# App run karo
CMD ["node", "server.js"]

# Agar tumhara entry point kuch aur hai to index.js ke jagah uska naam likho
