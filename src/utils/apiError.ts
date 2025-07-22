import { ErrorOptions, ErrorType, ErrorStatus, ErrorCode } from "../types";

class ApiError extends Error {
  public status: ErrorStatus;
  public type: ErrorType;
  public code: ErrorCode;
  public details?: any;

  constructor(options: ErrorOptions) {
    super(options.message);
    this.status = options.status || "failed";
    this.type = options.type;
    this.code = options.code;
    this.details = options.details;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export default ApiError;
