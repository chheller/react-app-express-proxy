export class SuccessResponse<T> {
  constructor(public status: number = 200, public payload: T) {}
}
export class ErrorResponse<K> {
  constructor(public status: number = 500, public payload: K) {}
}

export type ServiceResponse<T, K = Partial<T>> =
  | SuccessResponse<T>
  | ErrorResponse<K>;

export class NoContentResponse extends SuccessResponse<undefined> {
  constructor() {
    super(204, undefined);
  }
}

export class CreatedResponse<T> extends SuccessResponse<T> {
  constructor(payload: T) {
    super(201, payload);
  }
}

export class NotFoundResponse<K> extends ErrorResponse<K> {
  constructor(payload: K) {
    super(404, payload);
  }
}

export class ServerExceptionResponse<K> extends ErrorResponse<K> {
  constructor(payload: K) {
    super(500, payload);
  }
}

export class NotImplementedResponse extends ErrorResponse<null> {
  constructor() {
    super(501, null);
  }
}
