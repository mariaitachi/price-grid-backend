// src/prices/prices.service.ts

import { Injectable } from '@nestjs/common';
import { PriceGrid } from './interfaces/price-grid.interface';
import { AddSinglePriceDto } from './dto/add-single-price.dto';

@Injectable()
export class PricesService {
  private priceGrid: PriceGrid = {
    widths: [24, 30, 36, 48, 60],
    heights: [36, 48, 60],
    prices: [
      { height: 36, values: [239, 269, 307, 377, 450] },
      { height: 48, values: [272, 312, 357, 447, 536] },
      { height: 60, values: [300, 345, 410, 520, 600] },
    ],
  };

  getPrices(): PriceGrid {
    return this.priceGrid;
  }

  addSinglePrice(data: AddSinglePriceDto): PriceGrid {
    const { width, height, price } = data;

    // check width exists and insert in order
    let widthIndex = this.priceGrid.widths.indexOf(width);
    if (widthIndex === -1) {
      this.priceGrid.widths.push(width);
      this.priceGrid.widths.sort((a, b) => a - b);
      widthIndex = this.priceGrid.widths.indexOf(width);

      // Insert 0 in each existing row at the new width index
      this.priceGrid.prices.forEach((row) => {
        row.values.splice(widthIndex, 0, 0);
      });
    }

    // if height exists
    let heightIndex = this.priceGrid.heights.indexOf(height);
    if (heightIndex === -1) {
      this.priceGrid.heights.push(height);
      this.priceGrid.heights.sort((a, b) => a - b);
      heightIndex = this.priceGrid.heights.indexOf(height);

      // Create and insert a new row
      const newRow = {
        height,
        values: new Array(this.priceGrid.widths.length).fill(0),
      };

      this.priceGrid.prices.push(newRow);
      this.priceGrid.prices.sort((a, b) => a.height - b.height);
    }

    // Recalculate and sorting
    const rowIndex = this.priceGrid.prices.findIndex(
      (r) => r.height === height,
    );
    const colIndex = this.priceGrid.widths.indexOf(width);

    if (rowIndex === -1 || colIndex === -1) {
      throw new Error('Invalid row or column index after insertion');
    }

    // Update
    this.priceGrid.prices[rowIndex].values[colIndex] = price;

    return this.priceGrid;
  }
}
