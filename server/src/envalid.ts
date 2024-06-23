import { bool, cleanEnv, num, str } from 'envalid';

export const validate = (config: Record<string, unknown>) =>
  cleanEnv(config, {
    PORT: num(),
    DATABASE_URL: str(),
    URL: str(),
    MINIO_ENDPOINT: str(),
    MINIO_PORT: num(),
    MINIO_USE_SSL: bool(),
    MINIO_ACCESS_KEY: str(),
    MINIO_SECRET_KEY: str(),
    MINIO_BUCKET_NAME: str(),
    JWT_SECRET: str(),
    TINIFY_TOKEN: str(),
  });