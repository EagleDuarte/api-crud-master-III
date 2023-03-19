import redis from "ioredis";
import { redisEnv } from "../../app/envs/redis.env";

export class redisConnection {
  private static _connection: redis;

  public static async connect() {
    if (!this._connection) {
      this._connection = new redis({
        host: redisEnv.host,
        port: redisEnv.port,
        username: redisEnv.usarname,
        password: redisEnv.password,
      });
    }
    console.log("Redis is connected.");
  }
  public static get connection() {
    if (!this._connection) {
      throw new Error("Error, redis is not connected.");
    }
    return this._connection;
  }
}

/* Este código exporta uma classe chamada redisConnection que possui um método estático connect() 
e uma propriedade estática connection. O objetivo da classe é criar uma conexão com o Redis 
utilizando a biblioteca ioredis e disponibilizar essa conexão para outras partes do código que precisem utilizá-la.
O método connect() é responsável por criar uma nova conexão com o Redis caso ela ainda não exista. 
Ele utiliza as informações de configuração fornecidas no arquivo redis.env para definir o host, 
porta, usuário e senha. Se a conexão for criada com sucesso, a mensagem "Redis is connected." é exibida no console.
Já a propriedade connection retorna a conexão já existente ou lança um erro caso ela ainda não tenha
 sido criada. Isso permite que outras partes do código possam facilmente utilizar a conexão com o Redis sem precisar se preocupar em criá-la novamente ou lidar com erros de conexão. */
