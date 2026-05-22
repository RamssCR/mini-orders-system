import { IsInt, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @IsOptional()
  page = 1;

  @IsInt()
  @IsOptional()
  limit = 10;

  get offset() {
    return (this.page - 1) * this.limit;
  }
}
