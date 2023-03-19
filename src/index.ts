import { DatabaseConnection } from "./main/database/typeorm.connection";
import { redisConnection } from "./main/database/redis.connection";
import { runServer } from "./main/server/express.server";

 DatabaseConnection.connect().then(() => {
  redisConnection.connect().then(() => {
     runServer();
   })
 })

Promise.all([DatabaseConnection.connect(), redisConnection.connect()]).then(
  () => {
    runServer();
  }
);
