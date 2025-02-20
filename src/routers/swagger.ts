import { Router } from 'itty-router';
import swaggerJsdoc from 'swagger-jsdoc';

const router = Router();

// Настройка swagger-jsdoc
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sample API',
      version: '1.0.0',
      description: 'Пример API для Cloudflare Workers с itty-router'
    },
    paths: {
      "/api/user/register": {
        "post": {
          "summary": "Регистарция/Вход пользователя",
          "tags": [
            "User Auth"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "phone_id": {
                      "type": "string",
                      "example": "token",
                      "description": "ID устройства"
                    },
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Успешный вход/регистрация",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Success"
                      },
                      "status": {
                        "type": "integer",
                        "example": "200"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Ошибка сервера",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        }
      },
      "/api/countries": {
        "get": {
          "summary": "Получить список доступных стран",
          "operationId": "getAvailableCountries",
          "tags": [
            "Twilio"
          ],
          "responses": {
            "200": {
              "description": "Список доступных стран",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "countries": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "iso": {
                              "type": "string",
                              "example": "US"
                            },
                            "country": {
                              "type": "string",
                              "example": "United States"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Ошибка сервера",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        }
      },
      "/api/set-webhook": {
        "post": {
          "summary": "Установить вебхуки для SMS и звонков",
          "operationId": "setWebhook",
          "tags": [
            "Twilio"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "smsWebhook": {
                      "type": "string",
                      "example": "http://000.0.0.0:0000/sms-webhook",
                      "description": "URL для SMS webhook"
                    },
                    "callWebhook": {
                      "type": "string",
                      "example": "http://000.0.0.0:0000/call-webhook",
                      "description": "URL для звонков webhook"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Установлены вебхуки",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Success"
                      },
                      "status": {
                        "type": "integer",
                        "example": "200"
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "У вас нет активного номера",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "You don't have active number"
                      },
                      "status": {
                        "type": "integer",
                        "example": "404"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Ошибка сервера",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        }
      },
      "/api/number/available-numbers/{iso}": {
        "get": {
          "summary": "Получить информацию о стране по ISO коду",
          "operationId": "getCountryInfo",
          "tags": [
            "Numbers"
          ],
          "responses": {
            "200": {
              "description": "Информация о стране",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "properties": {
                      
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Ошибка сервера",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        }
      },
      "/api/number/buy-number": {
        "post": {
          "summary": "Покупка номера",
          "operationId": "createNumber",
          "tags": [
            "Numbers"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "number": {
                      "type": "string",
                      "example": "+11111111111",
                      "description": "Номер телефона для создания"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Успешная покупка номера",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Success"
                      },
                      "status": {
                        "type": "integer",
                        "example": "200"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Ошибка сервера",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        }
      },
      "/api/number/my-number": {
        "get": {
          "summary": "Получить свой номер",
          "tags": [
            "Numbers"
          ],
          "responses": {
            "200": {
              "description": "Список доступных стран",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "countries": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "iso": {
                              "type": "string",
                              "example": "US"
                            },
                            "country": {
                              "type": "string",
                              "example": "United States"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Ошибка сервера",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        }
      },
      "'/api/number/delete": {
        "delete": {
          "summary": "Удалить номер",
          "tags": [
            "Numbers"
          ],
          "responses": {
            "200": {
              "description": "Список доступных стран",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Номер успешно удален!"
                      },
                      "status": {
                        "type": "integer",
                        "example": "200"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Ошибка сервера",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        }
      },
      "/api/call/voice-call": {
        "post": {
          "summary": "Совершить звонок на номер",
          "operationId": "callToNumber",
          "tags": [
            "Voice Calls"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "number": {
                      "type": "string",
                      "description": "Номер телефона для звонка"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Результат звонка",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object"
                  }
                }
              }
            },
            "500": {
              "description": "Ошибка сервера",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        }
      },
      "/api/call/getCalls": {
        "get": {
          "summary": "Получить список звонков для номера",
          "tags": [
            "Voice Calls"
          ],
          "responses": {
            "200": {
              "description": "Список звонков",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object"
                  }
                }
              }
            },
            "500": {
              "description": "Ошибка сервера",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        }
      },
      "/api/sms/send": {
        "post": {
          "summary": "Отправить SMS сообщение",
          "tags": [
            "Sms"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "number": {
                      "type": "string",
                      "description": "Номер получателя"
                    },
                    "text": {
                      "type": "string",
                      "description": "Текст сообщения"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Результат отправки SMS",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object"
                  }
                }
              }
            },
            "500": {
              "description": "Ошибка сервера",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        }
      },
      "/api/sms/get-all": {
        "post": {
          "summary": "Вывести все смс",
          "operationId": "getSms",
          "tags": [
            "Sms"
          ],
          "responses": {
            "200": {
              "description": "Полученные данные SMS",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object"
                  }
                }
              }
            },
            "500": {
              "description": "Ошибка сервера",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        }
      },
    },
    "components": {
      "schemas": {
        "Error": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Internal Server Error"
            },
            "status": {
              "type": "integer",
              "example": 500
            }
          }
        },
        ServiceConnectionError: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Произошла ошибка при подключении к сервису.'
            },
            status: {
              type: 'integer',
              example: 403
            }
          }
        }
      }
    }
  },
  apis: []
};

const openApiSpec = swaggerJsdoc(options);

// Роут для OpenAPI-документации
router.get('/swagger/openapi.json', () => {
  return new Response(JSON.stringify(openApiSpec), {
    headers: { 'Content-Type': 'application/json' }
  });
});

// Роут для Swagger UI
router.get('/swagger/docs', () => {
  const html = `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <title>Swagger UI</title>
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@latest/swagger-ui.css">
    </head>
    <body>
        <div id="swagger-ui"></div>
        <script src="https://unpkg.com/swagger-ui-dist@latest/swagger-ui-bundle.js"></script>
        <script src="https://unpkg.com/swagger-ui-dist@latest/swagger-ui-standalone-preset.js"></script>
        <script>
            const ui = SwaggerUIBundle({
                url: "/swagger/openapi.json", // Замените на URL вашего Swagger JSON
                dom_id: '#swagger-ui',
                presets: [
                    SwaggerUIBundle.presets.apis,
                    SwaggerUIStandalonePreset // Убедитесь, что это правильно подключено
                ],
                layout: "StandaloneLayout"
            });
        </script>
    </body>
    </html>
  `;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' }
  });
});

// Обработчик всех запросов
addEventListener('fetch', (event) => {
  event.respondWith(router.handle(event.request));
});

export default router;