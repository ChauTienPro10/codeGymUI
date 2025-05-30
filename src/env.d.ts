export {};

declare global {
  interface Window {
    _env_?: {
      APP_SERVER_URL?: string;
    };
  }
}
