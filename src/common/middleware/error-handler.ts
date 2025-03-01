import { HttpError} from '@/common/error/http-error'
import { ErrorHandler } from 'itty-router';
import { ZodError } from 'zod';

interface ErrorResponse {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export const errorHandler: ErrorHandler = (error, request) => {
  let status:number = 500;
  let errorMessage:string = "Internal Server Error";
  let validationErrors: Record<string, string[]> | undefined;

  if (error instanceof ZodError) {
    status = 400;
    errorMessage = "Ошибка валидации данных";
    validationErrors = {};

    error.errors.forEach((err) => {
      const path = err.path.join('.');
      if (!validationErrors[path]) {
        validationErrors[path] = [];
      }
      validationErrors[path].push(err.message);
    });
  } else if (error instanceof HttpError) {
    errorMessage = error.message;
    status = error.status;
  } else if('code' in error) {
    switch (error.code) {
      case 10001:
        status = 403;
        errorMessage = "Произошла ошибка при подключении к сервису.";
        break;
      case 20003:
        status = 403;
        errorMessage = "Произошла ошибка при подключении к сервису.";
        console.error("Ошибка 20003: Нет доступа к внешней API. Проверьте accountSid и authToken.")
        break;
      case 20404:
        status = 400;
        errorMessage = "Не найдено";
        break;
      default:
        status = 500;
        break;
    }
  } else {
    console.error("Необработанная ошибка:", error);
  }

  const errorResponse: ErrorResponse = {
    message: errorMessage,
    status: status
  };

  if (validationErrors) {
    errorResponse.errors = validationErrors;
  }

  return new Response(
    JSON.stringify(errorResponse),
    {
      status: status,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};