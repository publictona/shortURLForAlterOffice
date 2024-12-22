mkdir url-shortener
cd url-shortener
npm init -y
npm install express mongoose bcrypt jsonwebtoken passport-google-oauth20 dotenv swagger-jsdoc swagger-ui-express redis ioredis axios rate-limiter-flexible helmet body-parser cors
npm install --save-dev nodemon jest supertest



//
url-shortener/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── middlewares/
│   ├── tests/
│   └── index.js
├── .env
├── docker-compose.yml
├── Dockerfile
├── swagger.json
└── package.json