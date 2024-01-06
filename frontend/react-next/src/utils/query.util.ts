import { AxiosResponse } from "axios";

export interface QueryTransform {
  response: AxiosResponse;
  data: any;
  pagination?: any;
}

export const queryTransformer = (data: AxiosResponse): QueryTransform => {
  return {
    response: data,
    data: data?.data?.data,
    pagination: data?.data?.meta?.pagination,
  };
};
