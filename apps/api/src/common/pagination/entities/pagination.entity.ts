import { SortOrder } from '../enums/pagination.enums';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Class representing a pagination metadata
 */
class PaginationMeta {
  @ApiProperty({
    type: 'number',
    example: 100,
    description: 'Total number of items',
  })
  total: number;

  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'Page',
  })
  page: number;

  @ApiProperty({
    type: 'number',
    example: 20,
    description: 'Items per page',
  })
  limit: number;

  @ApiProperty({
    type: 'number',
    example: 10,
    description: 'Total number of pages',
  })
  pages: number;

  @ApiProperty({
    type: 'string',
    example: 'createdAt',
    description: 'Field to sort by',
  })
  sortField: string;

  @ApiProperty({
    type: 'string',
    example: SortOrder.ASC,
    description: 'Sort order',
    enum: SortOrder,
  })
  sortOrder: SortOrder;

  @ApiProperty({
    type: 'string',
    example: 'John',
    description: 'Search term',
  })
  search?: string;
}

/**
 * Class representing a pagination entity
 */
export class PaginationEntity<T> {
  @ApiProperty({
    type: 'array',
    items: { type: 'object' },
    description: 'Response data',
  })
  data: T[];

  @ApiProperty({
    type: () => PaginationMeta,
    description: 'Pagination metadata',
  })
  meta: PaginationMeta;
}
