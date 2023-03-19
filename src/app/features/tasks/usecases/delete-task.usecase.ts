import { RedisRepository } from "../../../shared/repositories/cache.repository";
import { TasksRepository } from "../repositories/tasks.repository";
import { User } from "../../../models/user";
import { Tasks } from "../../../models/tasks";

export class DeleteTaskUseCase {
  constructor(
    private repository: TasksRepository,
    private redisRepository: RedisRepository
  ) {}

  public async execute(id: string) {
    await this.repository.delete(id);
    await this.redisRepository.delete(`task-${id}`);
    await this.redisRepository.delete("tasks");
    await this.redisRepository.delete("user");

    return;
  }
}
