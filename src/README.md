# Abaixo o comando para ativar a API:
- npm run dev

# Recolocar no script do package.json:
- "start": "json-server --watch ./src/data/db.json --port 3000",

# Comandos para iniciar do zero:
- npm init -y
- npm install express cors dotenv ioredis jsonwebtoken pg reflect-metadata typeorm uuid bcrypt --save
- npm install --save-dev typescript ts-node-dev @types/bcrypt @types/cors @types/express @types/jsonwebtoken @types/node @types/pg @types/uuid
