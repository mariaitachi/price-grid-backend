import { Controller, Get, Post, Body } from '@nestjs/common';
import { PricesService } from './prices.service';
import { PriceGrid } from './interfaces/price-grid.interface';
import { AddSinglePriceDto } from './dto/add-single-price.dto';

@Controller('api/prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @Get()
  getPrices(): PriceGrid {
    return this.pricesService.getPrices();
  }

  @Post()
  updatePrices(@Body() data: AddSinglePriceDto): PriceGrid {
    return this.pricesService.addSinglePrice(data);
  }
}
