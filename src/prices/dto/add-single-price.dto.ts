// src/prices/dto/add-single-price.dto.ts

import { IsNumber, Min } from 'class-validator';

export class AddSinglePriceDto {
  @IsNumber()
  @Min(1)
  width: number;

  @IsNumber()
  @Min(1)
  height: number;

  @IsNumber()
  @Min(0)
  price: number;
}
