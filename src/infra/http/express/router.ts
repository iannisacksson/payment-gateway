import { Request, Response } from 'express';
import { IController } from '@payment-gateway/infra/http/types';

export const expressRouter = <body, params, query, responseBody>(
  controller: IController<body, params, query, responseBody>
) => {
  return async (request: Request, response: Response) => {
    const result = await controller.handle({
      body: request.body,
      params: request.params as params,
      query: request.query as query,
    });
    return response.status(result.statusCode).json(result.body);
  };
};
