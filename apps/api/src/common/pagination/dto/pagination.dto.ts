import { Type } from 'class-transformer';
import { IsEnum, IsOptional, Max, Min } from 'class-validator';
import { SortOrder } from 'src/common/pagination/enums/pagination.enums';

/**
 * Class representing a pagination dto
 */
export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  limit = 20;

  @IsOptional()
  @Type(() => String)
  sortField = 'createdAt';

  @IsOptional()
  @Type(() => String)
  @IsEnum(SortOrder)
  sortOrder = SortOrder.ASC;

  @IsOptional()
  @Type(() => String)
  search?: string;
}
