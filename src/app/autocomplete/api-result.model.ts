export class ApiResult{
  status: string;
  version: string;
  access: string;
  data: {
    code: {
      country: string;
      region: string;
    }
  }
}
