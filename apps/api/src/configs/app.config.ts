import { getEnvString } from 'src/common/utils/env.functions';

/**
 * Class representing an app config
 */
export class AppConfig {
  // API settings
  public static readonly API_GLOBAL_PREFIX = '/api/v1';

  // Is production environment?
  public static isProduction(): boolean {
    return getEnvString('NODE_ENV') === 'production';
  }

  /**
   * Function to get OpenAPI example values
   */
  public static getOpenApiExample(type: 'uuid'): string {
    switch (type) {
      case 'uuid':
        return 'cf6fd07f-1e08-4a39-a484-871c58059ea6';
      default:
        throw new Error('Invalid OpenAPI example type');
    }
  }

  /**
   * Function to get a postgres connection string
   */
  public static getPgConnectionString(): string {
    return `postgresql://${getEnvString('DB_USER')}:${getEnvString('DB_PASS')}@${getEnvString('DB_HOST')}:${getEnvString('DB_PORT')}/${getEnvString('DB_NAME')}`;
  }
}
