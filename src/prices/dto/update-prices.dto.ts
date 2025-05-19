import { PriceGrid, PriceRow } from '../interfaces/price-grid.interface';

export class UpdatePricesDto implements PriceGrid {
  widths: number[];
  heights: number[];
  prices: PriceRow[];
}
