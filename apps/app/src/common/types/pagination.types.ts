import { SortOrder } from '../enums/pagination.enums';

export interface PaginationResponse<T> {
  data: T[];
  meta: Meta;
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
  pages: number;
  sortField: string;
  sortOrder: SortOrder;
  search?: string;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortField?: string;
  sortOrder?: SortOrder;
  search?: string;
}
