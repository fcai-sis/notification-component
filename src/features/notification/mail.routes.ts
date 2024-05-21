import { Router } from "express";

import { asyncHandler } from "@fcai-sis/shared-utilities";
import sendEmailHandler from "./logic/handlers/sendEmail.handler";

export default (router: Router) => {
  router.post(
    "/email",

    // Handle example request
    asyncHandler(sendEmailHandler)
  );
};
