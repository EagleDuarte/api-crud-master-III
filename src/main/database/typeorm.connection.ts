import { DataSource } from "typeorm";
import "dotenv/config";
import typeormConfig from "../config/typeorm.config";

export class DatabaseConnection {
  private static _connection: DataSource;

  public static async connect() {
    console.log(process.env.DB_URL);
    if (!this._connection) {
      this._connection = await typeormConfig.initialize();
    }
  }

  public static get connection() {
    if (!this._connection) {
      throw new Error("Database has not begun!");
    }
    return this._connection;
  }
}

/* Este código exporta uma classe chamada DatabaseConnection. Esta classe gerencia a conexão com o banco de dados.
A classe tem uma variável estática privada chamada _connection que armazena aconexão com o banco de dados. 
A classe tem um método estático connect() que inicializa a conexão com o banco de dados usando a configuração definida em typeormConfig.
Este método só inicia a conexão se _connection estiver vazia. A classe também tem um getter connection() que retorna a conexão armazenada 
em _connection. Se _connection estiver vazio, uma exceção é lançada. 
O código também importa o DataSource do typeorm, bem como a configuração definida em typeormConfig e o pacote dotenv para carregar 
variáveis de ambiente de um arquivo .env. */