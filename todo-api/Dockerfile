FROM node:20.9.0-alpine3.18


# Set working directory dalam kontainer
WORKDIR /rakamin-agasi-todo/src/app

# Salin package.json dan package-lock.json ke kontainer
COPY package*.json ./

# Instal dependensi Node.js
RUN npm install

# Salin sumber kode aplikasi ke kontainer
COPY . .

# Ekspose port yang digunakan oleh aplikasi Node.js
EXPOSE 3000

# Perintah untuk menjalankan aplikasi Node.js
CMD ["node", "app.js"]
