import { app } from "./app";

const port = process.env.PORT || 4000;
const server = app.listen(port, () => console.log(`App ouvindo na porta ${port}`));

process.on('SIGINT', () => {
    server.close(() => {
        console.log("App finalizado");
    });
});