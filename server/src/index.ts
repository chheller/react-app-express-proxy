import app from "./server/server";
import env from "./common/configuration";
import logger from "./common/logger";

app.listen(env.port, () => {
  logger.info(`App started on port ${env.port}`);
});
