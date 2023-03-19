import { Tasks } from "../../../models/tasks";
import { RedisRepository } from "../../../shared/repositories/cache.repository";
import { TasksRepository } from "../repositories/tasks.repository";

export class ListTasksUseCase {
  constructor(
    private repository: TasksRepository,
    private redisRepository: RedisRepository
  ) {}

  public async execute() {
    const cachedList = await this.redisRepository.get("tasks");
    if (cachedList) {
      return cachedList;
    }

    const result = await this.repository.list();
    const resultJson = result.map((item) => item.toJson());

    await this.redisRepository.set("tasks", resultJson);

    return resultJson;
  }
}
