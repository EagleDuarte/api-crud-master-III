import { Request, Response } from "express";
import { Tasks } from "../../../models/tasks";
import { User } from "../../../models/user";
import { RedisRepository } from "../../../shared/repositories/cache.repository";
import { serverError, success } from "../../../shared/util/response.helper";
import { UserRepository } from "../../users/repositories/user.repository";
import { TasksRepository } from "../repositories/tasks.repository";
import { CreateTaskUseCase } from "../usecases/create-task.usecase";
import { DeleteTaskUseCase } from "../usecases/delete-task.usecase";
import { GetTasksUseCase } from "../usecases/get-tasks.usecase";
import { ListTasksUseCase } from "../usecases/list-tasks.usecase";
import { UpdateTaskUseCase } from "../usecases/update-task.usecase";

export class TasksController {
  public async list(req: Request, res: Response) {
    try {
      const usecase = new ListTasksUseCase(
        new TasksRepository(),
        new RedisRepository()
      );
      const result = await usecase.execute();
      return success(res, result, "Tasks successfuly listed.");
    } catch (error: any) {
      return serverError(res, error);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const usecase = new GetTasksUseCase(
        new TasksRepository(),
        new RedisRepository()
      );
      const result = await usecase.execute(id);

      if (!result) {
        return res.status(404).send({
          ok: false,
          message: "Task not found.",
        });
      }

      return res.status(200).send({
        ok: true,
        data: result,
      });
    } catch (error: any) {
      return serverError(res, error);
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { description, detail, idUser } = req.body;

      const usecase = new CreateTaskUseCase(
        new TasksRepository(),
        new RedisRepository()
      );

      if (!description) {
        return res.status(400).send({
          ok: false,
          message: "Description not provided.",
        });
      }

      if (!detail) {
        return res.status(400).send({
          ok: false,
          message: "Detail not provided.",
        });
      }

      if (!idUser) {
        return res.status(400).send({
          ok: false,
          message: "User (idUser) not provided.",
        });
      }

      // 1- verificar se o user existe
      const userRepository = new UserRepository();
      const userResult = await userRepository.getId(idUser);

      if (!userResult) {
        return res.status(404).send({
          ok: false,
          message: "This user doesn't exists.",
        });
      }

      const user = User.create(userResult.id, userResult.name, userResult.pass);

      const result = await usecase.execute({
        description,
        detail,
        user,
      });

      return res.status(201).send({
        ok: true,
        data: result,
      });
    } catch (error: any) {
      return serverError(res, error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { description, detail, arquivada } = req.body;

      const usecase = new UpdateTaskUseCase(
        new TasksRepository(),
        new RedisRepository()
      );

      // const repository = new TasksRepository();
      // const result = await repository.get(id);

      // if (!result) {
      //   return res.status(404).send({
      //     ok: false,
      //     message: "Task não encontrada!",
      //   });
      // }

      // const resultUpdate = repository.update(result, {
      //   description,
      //   detail,
      //   arquivada,
      // });

      const resultUpdate = usecase.execute({
        id,
        description,
        detail,
        arquivada,
      });

      if (resultUpdate === null) {
        return res.status(404).send({
          ok: false,
          message: "Growdever not found.",
        });
      }

      return res.status(200).send({
        ok: true,
        message: "Task updated sucesfully.",
        data: resultUpdate,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  // public async arquivar(req: Request, res: Response) {
  //   try {
  //     const { id } = req.params;
  //     const { arquivada } = req.body;

  //     const repository = new TasksRepository();
  //     const result = await repository.get(id);

  //     if (!result) {
  //       return res.status(404).send({
  //         ok: false,
  //         message: "User não encontrado!",
  //       });
  //     }

  //     const resultUpdate = repository.arquivar(result, {
  //       arquivada,
  //     });

  //     return res.status(200).send({
  //       ok: true,
  //       message: "Task atualizado com sucesso",
  //       data: resultUpdate,
  //     });
  //   } catch (error: any) {
  //     return res.status(500).send({
  //       ok: false,
  //       message: error.toString(),
  //     });
  //   }
  // }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const usecase = new DeleteTaskUseCase(
        new TasksRepository(),
        new RedisRepository()
      );

      const repository = new TasksRepository();
      const result = await repository.get(id);

      if (!result) {
        return res.status(404).send({
          ok: false,
          message: "Tasks not found.",
        });
      }

      // await repository.delete(id);
      await usecase.execute(id);

      return res.status(200).send({
        ok: true,
        message: "Task successfully deleted.",
      });
    } catch (error: any) {
      return serverError(res, error);
    }
  }
}
