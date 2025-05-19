export interface PriceRow {
  height: number;
  values: number[];
}

export interface PriceGrid {
  widths: number[];
  heights: number[];
  prices: PriceRow[];
}
