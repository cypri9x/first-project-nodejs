import { sql } from './db.js';


sql`
CREATE TABLE videos (
    id TEXT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration INTEGER
);
`.then(() => {
    console.log("Tabela criada com sucesso.");
}).catch(err => {
    console.error("Erro ao criar a tabela:", err);
});
