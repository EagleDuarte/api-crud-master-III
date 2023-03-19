import { User } from "../../../models/user";
import { RedisRepository } from "../../../shared/repositories/cache.repository";
import { UserRepository } from "../repositories/user.repository";

interface CreateUserDTO {
  name: string;
  pass: string;
}

export class CreateUserUseCase {
  constructor(
    private repository: UserRepository,
    private redisRepository: RedisRepository
  ) {}

  public async execute(data: CreateUserDTO) {
    const user = new User(data.name, data.pass);

    const result = await this.repository.create(user);
    await this.redisRepository.set(`user-${result.id}`, result);
    await this.redisRepository.delete("user");
    await this.redisRepository.delete("tasks");

    return result.toJson();
  }
}
