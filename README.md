#MANUAL DE INSTRUÇÃO

LIGAR BACK: 
 {
  "start": "tsx src/server.ts",
  "start:dev": "tsx watch src/server.ts",
  "build": "tsup src/routes",
  "test": "vitest"
};

________________________________________________


TODAS AS DEPENDENCIAS: 

"devDependencies": {
    "@types/bcrypt": "^5.0.2",
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/express-fileupload": "^1.5.0",
    "@types/jsonwebtoken": "^9.0.6",
    "ts-node-dev": "^2.0.0",
    "tsup": "^8.2.1",
    "tsx": "^4.16.2",
    "typescript": "^5.5.3",
    "vitest": "^2.0.3"
  },
  "dependencies": {
    "@prisma/client": "^5.17.0",
    "@web/dev-server": "^0.4.6",
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "date-fns": "^3.6.0",
    "express": "^4.19.2",
    "express-fileupload": "^1.5.1",
    "jsonwebtoken": "^9.0.2",
    "prisma": "^5.17.0",
    "zod": "^3.23.8"
  },
    
