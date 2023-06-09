import { User } from "../../../models/user";
import { Tasks } from "../../../models/tasks";
import { RedisRepository } from "../../../shared/repositories/cache.repository";
import { TasksRepository } from "../repositories/tasks.repository";
import { TasksEntity } from "../../../shared/entities/tasks.entity";

interface UpdateTaskDTO {
  id: string;
  description: string;
  detail: string;
  arquivada: boolean;
  user?: User;
}

export class UpdateTaskUseCase {
  constructor(
    private repository: TasksRepository,
    private redisRepository: RedisRepository
  ) {}

  public async execute(data: UpdateTaskDTO) {
    var task = await this.repository.get(data.id);

    if (!task) {
      return null;
    }

    (task.description as string) = data.description ?? task.description;
    (task.detail as string) = data.detail ?? task.detail;
    (task.arquivada as boolean) = data.arquivada ?? task.arquivada;

    const result = await this.repository.update(task);
    await this.redisRepository.delete(`task-${task.id}`);
    await this.redisRepository.delete("tasks");

    return result;
  }
}
