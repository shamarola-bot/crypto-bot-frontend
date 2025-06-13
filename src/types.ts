export interface Signal {
  signal: "buy" | "hold";
  price: number;
  movingAverage: number;
}

export interface SwapResponse {
  transaction: string;
  message: string;
}