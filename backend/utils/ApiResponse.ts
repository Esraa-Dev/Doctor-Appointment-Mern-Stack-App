export class ApiResponse<T> {
  public statusCode: number;
  public message: string;
  public data: null | T;
  constructor(statusCode: number, message: string, data: null | T = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
