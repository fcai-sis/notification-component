import { Router } from "express";

import { asyncHandler } from "@fcai-sis/shared-utilities";
import sendEmailHandler from "./logic/handlers/sendEmail.handler";
import validateSendEmailRequestBodyMiddleware from "./logic/middlewares/validateEmailRequestBody.middleware";

export default (router: Router) => {
  router.post(
    "/email",

    validateSendEmailRequestBodyMiddleware,

    asyncHandler(sendEmailHandler)
  );
};
