import { config } from 'dotenv';
config();
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
// TODO: remplace to module alias
import { setServiceRoutes } from './service/infra/api/service.routes';

import { redisClient, redisPublisher } from './service/infra/dependencies';
import { listenServiceSubscribers } from './service/infra/subscribers/service.subscribers';

async function startApp() {
  // start redis connection
  // start listeners
  // start routes

  const app = express();

  app.use(helmet());
  app.use(express.json());
  app.use(cors());

  await Promise.all([redisClient.testConnection(), redisPublisher.connect()]);

  await listenServiceSubscribers();
  setServiceRoutes(app);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startApp().catch((error) =>
  console.log(`Error trying to start the server: ${error.message}`),
);
