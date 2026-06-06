export class SwapiHttpError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'SwapiHttpError';
    this.status = status;
  }
}
