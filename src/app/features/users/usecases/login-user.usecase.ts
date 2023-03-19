import { User } from "../../../models/user";
import { RedisRepository } from "../../../shared/repositories/cache.repository";
import { UserRepository } from "../repositories/user.repository";

interface LoginUserDTO {
  id: string;
  name: string;
  pass: string;
}

export class LoginUserUseCase {
  constructor(
    private repository: UserRepository,
    private redisRepository: RedisRepository
  ) {}

  public async execute(data: any) {
    const userCache = await this.redisRepository.get(`user-${data.id}`);

    if (userCache) {
      return userCache;
    }

    const user = await this.repository.get(data.name);
    if (!user) {
      return null;
    }

    const userJson = user.toJson();
    await this.redisRepository.set(`user-${user.id}`, userJson);

    return user.toJson();
  }
}
