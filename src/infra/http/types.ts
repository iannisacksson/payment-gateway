export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export interface IHttpRequest<body, params, query> {
  body: body;
  params: params;
  query: query;
}

export interface IHttpResponse<T> {
  statusCode: HttpStatusCode;
  body: T;
}

export interface IController<body, params, query, responseBody> {
  handle(
    request: IHttpRequest<body, params, query>
  ): Promise<IHttpResponse<responseBody>>;
}
