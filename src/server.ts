import { app } from "./app";
import {transformer, z} from "zod"

const port = process.env.PORT || 3000
const server = app.listen(port, () => console.log(`App ouvindo na porta ${port}`))

process.on('SIGINT', () => {
    server.close()
    console.log("App finalizado");
})

const userSchema = z.object({
    name: z.string()
        .min(3, { message: "O seu nome precisa de pelo menos 3 letras" })
        .transform(name => name.toLocaleUpperCase()),

    age: z.number()
        .min(18, { message: "Você precisa ter ao menos 18 anos" }),

    photo: z.string()
        .url({ message: "A foto precisa ser um URL válido" }),

    email: z.string()
        .email({ message: "O email precisa ser válido" }),

    password: z.string()
        .min(6, { message: "A senha precisa ter pelo menos 6 caracteres" })
});

type User = z.infer<typeof userSchema>;

function saveUserToDatabase(user: User) {
    const { name, age, photo, email, password } = userSchema.parse(user);

    console.log(name, age, photo, email, password);
}


