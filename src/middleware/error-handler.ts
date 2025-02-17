import { HttpError } from '@/error/http-error';
import { ErrorHandler } from 'itty-router';

// Глобальный обработчик ошибок
export const errorHandler: ErrorHandler = (error, request) => {
  console.log(error);
  // Если ошибка является HttpError, используем её статус и сообщение
  if (error instanceof HttpError) {
    return new Response(
      JSON.stringify({
        message: error.message,
      }),
      {
        status: error.status,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  // Для всех остальных ошибок возвращаем generic 500
  return new Response(
    JSON.stringify({
      error: 'Internal Server Error',
    }),
    {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    },
  );
};