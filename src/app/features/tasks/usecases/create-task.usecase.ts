import { RedisRepository } from "../../../shared/repositories/cache.repository";
import { TasksRepository } from "../repositories/tasks.repository";
import { User } from "../../../models/user";
import { Tasks } from "../../../models/tasks";

interface CreateTaskDTO {
  description: string;
  detail: string;
  user: User;
  arquivada?: boolean;
}

export class CreateTaskUseCase {
  constructor(
    private repository: TasksRepository,
    private redisRepository: RedisRepository
  ) {}

  public async execute(data: CreateTaskDTO) {
    const task = new Tasks(data.description, data.detail, data.user);

    const result = await this.repository.create(task);
    await this.redisRepository.set(`task-${result.id}`, result);
    await this.redisRepository.delete("tasks");
    await this.redisRepository.delete("user");

    return result.toJson();
  }
}
