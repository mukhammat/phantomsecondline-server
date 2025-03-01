export enum Environments {
  DEVELOPMENT = 'development',
  PREVIEW = 'preview',
  PRODUCTION = 'production',
}

export interface Env {
  ENVIRONMENT: Environments;
  DB: D1Database;
  SKIP_AUTH_DEV: string;
}
