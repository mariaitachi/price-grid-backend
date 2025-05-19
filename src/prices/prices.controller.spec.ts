import { Test, TestingModule } from '@nestjs/testing';
import { PricesController } from './prices.controller';
import { PricesService } from './prices.service';
import { AddSinglePriceDto } from './dto/add-single-price.dto';
import { PriceGrid } from './interfaces/price-grid.interface';

describe('PricesController', () => {
  let controller: PricesController;
  let service: PricesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PricesController],
      providers: [PricesService],
    }).compile();

    controller = module.get<PricesController>(PricesController);
    service = module.get<PricesService>(PricesService);
  });

  it('should return the initial price grid on GET', () => {
    const result = controller.getPrices();
    expect(result.widths.length).toBeGreaterThan(0);
    expect(result.heights.length).toBeGreaterThan(0);
    expect(result.prices.length).toBe(result.heights.length);
  });

  it('should update the price grid on POST', () => {
    const newPrice: AddSinglePriceDto = {
      width: 72,
      height: 36,
      price: 555,
    };

    const updatedGrid: PriceGrid = controller.updatePrices(newPrice);
    const row = updatedGrid.prices.find((r) => r.height === 36);
    const colIndex = updatedGrid.widths.indexOf(72);

    expect(row).toBeDefined();
    expect(colIndex).toBeGreaterThan(-1);
    expect(row!.values[colIndex]).toBe(555);
  });
});
