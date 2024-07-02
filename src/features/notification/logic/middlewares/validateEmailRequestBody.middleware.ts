import * as validator from "express-validator";
import { NextFunction, Request, Response } from "express";

import logger from "../../../../core/logger";

/**
 * Validates the request body of the send email endpoint.
 */

const middlewares = [
  validator
    .body("subject")
    .exists()
    .withMessage("Subject is required")
    .isString()
    .withMessage("Subject must be a string")
    .isLength({ min: 1, max: 255 })
    .withMessage("Subject must be between 1 and 255 characters"),

  validator.body("text").exists().withMessage("Text is required"),

  (req: Request, res: Response, next: NextFunction) => {
    logger.debug(`Validating send email req body: ${JSON.stringify(req.body)}`);

    // If any of the validations above failed, return an error response
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      logger.debug(
        `Validation failed for send email req body: ${JSON.stringify(req.body)}`
      );

      return res.status(400).json({
        errors: [
          {
            message: errors.array()[0].msg,
          },
        ],
      });
    }

    // Attach the validated data to the request body
    req.body = {
      subject: req.body.subject,
      text: req.body.text,
    };

    next();
  },
];

const validateSendEmailRequestBodyMiddleware = middlewares;
export default validateSendEmailRequestBodyMiddleware;
