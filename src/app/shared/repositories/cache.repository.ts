import { redisConnection } from "../../../main/database/redis.connection";

export class RedisRepository {
  private repository = redisConnection.connection;

  public async get(chave: string) {
    const result = await this.repository.get(chave);

    if (!result) {
      return null;
    }

    return JSON.parse(result);
  }

  public async set(chave: string, data: any) {
    await this.repository.set(chave, JSON.stringify(data));
  }

  public async delete(chave: string) {
    await this.repository.del(chave);
  }
}

/* O código apresenta uma classe redisRepository que define um repositório para armazenamento em cache de dados.
A classe tem três métodos que realizam operações básicas em um banco de dados em cache. O método get recebe uma chave como argumento e retorna o valor correspondente se existir. 
O método set recebe uma chave e um objeto de dados como argumentos e armazena os dados correspondentes 
sob a chave dada. O método delete recebe uma chave como argumento e exclui a entrada correspondente.
Os métodos usam a conexão do cache definida em redisConnecction.connection para realizar essas operações. */
