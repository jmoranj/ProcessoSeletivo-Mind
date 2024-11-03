import { z } from 'zod';

export const userRegistrationSchema  = z.object({
    name: z.string().min(3, { message: "O seu nome precisa de pelo menos 3 letras" }).transform(name => name.toLocaleUpperCase()),
    age: z.number().min(18, { message: "Você precisa ter ao menos 18 anos" }),
    photo: z.any(),
    email: z.string().email({ message: "O email precisa ser válido" }),
    password: z.string().min(6, { message: "A senha precisa ter pelo menos 6 caracteres" })
});


export const userDbSchema = z.object({
    name: z.string(),
    age: z.number(),
    photo: z.string(),
    email: z.string().email(),
    password: z.string()
});