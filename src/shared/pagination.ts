export enum PaginationOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export type PaginationSort = string | string[];

export interface Pagination {
  page?: number;
  pageSize?: number;
  sort?: PaginationSort;
  order?: PaginationOrder;
}

export interface TPaginationResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  pageTotal: number;
  total: number;
}
