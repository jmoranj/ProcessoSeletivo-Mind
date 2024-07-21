"use strict";

// src/server.ts
var import_zod = require("zod");
var userSchema = import_zod.z.object({
  name: import_zod.z.string().min(3, { message: "o seu nome precisa de pelo menos 3 letras" }).transform((name) => name.toLocaleUpperCase()),
  age: import_zod.z.number().min(18, { message: "voce precisa ter ao menos 18 anos" })
});
function saveUserToDatabase(user) {
  const { name, age } = userSchema.parse(user);
  console.log(name, age);
}
saveUserToDatabase({
  name: "jorge",
  age: 18
});
