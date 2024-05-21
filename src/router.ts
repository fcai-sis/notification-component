import { Router } from "express";

import exampleRoutes from "./features/notification/mail.routes";

const router: Router = Router();

export default (): Router => {
  exampleRoutes(router);

  return router;
};
