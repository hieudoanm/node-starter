import { CapitalPorfolio } from '@prisma/client';

export type StockHistory = CapitalPorfolio & { percentageChange: number };
