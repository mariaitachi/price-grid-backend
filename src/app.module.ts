import { Module } from '@nestjs/common';
import { PricesController } from './prices/prices.controller';
import { PricesService } from './prices/prices.service';

@Module({
  imports: [],
  controllers: [PricesController],
  providers: [PricesService],
})
export class AppModule {}
