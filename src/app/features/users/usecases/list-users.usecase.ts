import { RedisRepository } from "../../../shared/repositories/cache.repository";
import { UserRepository } from "../repositories/user.repository";

export class ListUsersUseCase {
  constructor(
    private repository: UserRepository,
    private redisRepository: RedisRepository
  ) {}

  public async execute() {
    const cachedList = await this.redisRepository.get("users");
    if (cachedList) {
      return cachedList;
    }

    const result = await this.repository.list();
    const resultJson = result.map((item) => item.toJson());

    await this.redisRepository.set("users", resultJson);

    return resultJson;
  }
}
