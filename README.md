# Tutorial Base Project Backend

## Requisitos
- Node.js instalado
- MySQL instalado e configurado
- NPM ou Yarn

## Passo a Passo

1. Instale as dependências necessárias:
```bash
npm install

Copy

Apply

README.md
Configure o Banco de Dados:
Crie um banco de dados MySQL
Configure as credenciais no arquivo .env (use o .env.example como base)
Execute as migrações do Prisma:
npx prisma migrate dev

Copy

Execute

Inicie o servidor em modo desenvolvimento:
npm run start:dev

Copy

Execute

Estrutura do Projeto
/src/routes - Rotas da API
/src/controllers - Controladores
/src/middlewares - Middlewares (autenticação, upload de arquivos)
/src/schemas - Schemas de validação
Funcionalidades Principais
Autenticação JWT
Upload de imagens (limite de 20MB)
Rotas para usuários e transações
Validação de dados com Zod
Rotas Disponíveis
Usuários: /users
Transações: /transactions
Uploads
O projeto suporta upload de imagens em duas categorias:

Fotos de usuário
Imagens de transações
Os arquivos são salvos na pasta uploads do projeto.

Observações
O servidor roda na porta 3000 por padrão
CORS configurado para http://localhost:3000
Suporta apenas upload de arquivos de imagem
```
