import { RedisRepository } from "../../../shared/repositories/cache.repository";
import { UserRepository } from "../repositories/user.repository";

export class GetUserUseCase {
  constructor(
    private repository: UserRepository,
    private redisRepository: RedisRepository
  ) {}

  public async execute(id: string) {
    const userCache = await this.redisRepository.get(`user-${id}`);

    if (userCache) {
      return userCache;
    }

    const user = await this.repository.getId(id);
    if (!user) {
      return null;
    }

    const userJson = user.toJson();
    await this.redisRepository.set(`user-${id}`, userJson);

    return userJson;
  }
}
