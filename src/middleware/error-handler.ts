import { HttpError } from '@/error/http-error';
import { ErrorHandler } from 'itty-router';

// Глобальный обработчик ошибок
export const errorHandler: ErrorHandler = (error, request) => {
  console.log(error.cause);

  let status:number = 500;
  let errorMessage:string = "Internal Server Error";
  
  const code = error?.code;
  if(code) {
    switch (code) {
      case 10001:
        status = 403;
        errorMessage = "Произошла ошибка при подключении к сервису.";
        break;
      case 20003:
        status = 403;
        errorMessage = "Произошла ошибка при подключении к сервису.";
        console.error("Ошибка 20003: Нет доступа к внешней API. Проверьте accountSid и authToken.")
        break;
      default:
        status = 500;
        break;
    }
  }

  if (error instanceof HttpError) {
    errorMessage = error.message;
    status = error.status;
  }

  console.error("Ошибка", error.message);
  console.error("со статусом", error.status);

  return new Response(
    JSON.stringify({
      message: errorMessage,
      status: status
    }),
    {
      status: status,
      headers: { 'Content-Type': 'application/json' },
    },
  );
};