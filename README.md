#MANUAL DE INSTRUÇÃO

Primeiramente rode o seguinte comando:

`npm i @types/node`

#DUMP DO BANCO

Abra o Terminal: Certifique-se de que o MySQL está instalado e funcionando no seu terminal.

Comando para Importar o Dump: Use o comando abaixo, substituindo <nome_do_banco> pelo nome do seu banco de dados e <caminho_para_o_dump.sql> pelo caminho do seu arquivo de dump:

`mysql -u seu_usuario -p <nome_do_banco> < <caminho_para_o_dump.sql>`

Após executar o comando, o MySQL pedirá sua senha. Digite a senha do usuário MySQL que você configurou.

Se o comando foi executado sem erros, o banco de dados será preenchido com os dados do arquivo dump.

Se você ainda não tiver criado o banco de dados onde deseja restaurar os dados, faça isso antes com o comando:

CREATE DATABASE <nome_do_banco>;


#RODAR

`npm run start:dev`


