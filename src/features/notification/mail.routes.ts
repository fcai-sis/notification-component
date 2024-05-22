import { Router } from "express";

import { asyncHandler } from "@fcai-sis/shared-utilities";
import sendEmailHandler from "./logic/handlers/sendEmail.handler";
import { Role, checkRole } from "@fcai-sis/shared-middlewares";
import validateSendEmailRequestBodyMiddleware from "./logic/middlewares/validateEmailRequestBody.middleware";

export default (router: Router) => {
  router.post(
    "/email",

    checkRole([Role.EMPLOYEE, Role.ADMIN]),
    validateSendEmailRequestBodyMiddleware,

    asyncHandler(sendEmailHandler)
  );
};
