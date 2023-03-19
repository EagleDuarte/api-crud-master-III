import { RedisRepository } from "../../../shared/repositories/cache.repository";
import { TasksRepository } from "../repositories/tasks.repository";

export class GetTasksUseCase {
  constructor(
    private repository: TasksRepository,
    private redisRepository: RedisRepository
  ) {}

  public async execute(id: string) {
    const taskCache = await this.redisRepository.get(`task-${id}`);

    if (taskCache) {
      return taskCache;
    }

    const task = await this.repository.get(id);
    if (!task) {
      return null;
    }

    const taskJson = task.toJson();
    await this.redisRepository.set(`task-${id}`, taskJson);

    return taskJson;
  }
}
