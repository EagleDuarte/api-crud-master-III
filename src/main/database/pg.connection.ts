import { Pool } from "pg";

export const dbConnection = new Pool({
  connectionString:
    "postgres://pomzhvfl:is7CTLIsvCqDNUdOTLd-Ask0V8BMfAiM@babar.db.elephantsql.com/pomzhvfl",

  /*Another option of connection:
    host: "dpg-cdmpa5la49944a8m36u0-a.frankfurt-postgres.render.com",
    user: "bd_growdev_se21_user",
    password: "k07O1A19bkx0SKWqynG48My2odW4s1TI",
    database: "bd_growdev_se21",
    port: 5432, */

  ssl: {
    rejectUnauthorized: false,
  },
});

/* Este código é utilizado para estabelecer uma conexão com um banco de dados PostgreSQL usando o módulo pg do Node.js. 
A conexão é configurada usando um objeto Pool que define as opções de conexão. 
Existem duas opções mostradas no código, ambas apontando para o mesmo banco de dados hospedado no ElephantSQL. 
A primeira opção usa uma string de conexão que contém todas as informações necessárias (nome de usuário, senha, endereço do host,
nome do banco de dados) em um único lugar. A segunda opção usa um objeto com as mesmas informações, 
mas divididas em propriedades distintas. */
