import { z } from 'zod';

export const transactionSchema = z.object({
  description: z.string().min(2, "Nome precisa ter no mínimo 2 caracteres"),
  value: z.number().min(0.01, "Preço deve ser maior que zero"),
  quantity: z.number().min(1, "Quantidade deve ser maior que zero"),
  date: z.string(),
  category: z.enum(["Entrada", "Saída"]),
  image: z.any().optional()
});

export type TransactionInput = z.infer<typeof transactionSchema>;
