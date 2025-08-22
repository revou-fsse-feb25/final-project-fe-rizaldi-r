export interface AxiosErrorItf {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
  request?: any;
  message?: string;
  config?: any;
}