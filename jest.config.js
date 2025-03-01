module.exports = {
    preset: 'ts-jest',  // Используем preset ts-jest для поддержки TypeScript
    testEnvironment: 'node',  // Устанавливаем среду тестирования как Node.js
    collectCoverage: true,  // Включаем сбор покрытия кода
    coverageDirectory: 'coverage',  // Директория для отчета о покрытии
    testMatch: ['**/__tests__/**/*.test.ts'],  // Паттерн для поиска тестовых файлов
    verbose: true,  // Выводим подробную информацию о тестах
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'  // Это правило соответствует пути @/...
    },
};
  