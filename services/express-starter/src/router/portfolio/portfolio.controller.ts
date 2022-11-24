import { Controller, Get, Path, Query, Route, Tags } from '@hieudoanm/express';
import { CapitalAvailableDates, CapitalPorfolio } from '@prisma/client';
import {
  getActiveStockCodes,
  getAvailableDates,
  getPortfolio,
  getStockHistory,
} from './portfolio.service';
import { StockHistory } from './portfolio.types';

@Tags('Portfolio')
@Route('portfolio')
export class PortfolioController extends Controller {
  @Get(':capital/active-stock-codes')
  public async getActiveStockCodes(
    @Path('capital') capital: string
  ): Promise<{ stockCode: string }[]> {
    return getActiveStockCodes({ capital });
  }

  @Get(':capital/:portfolioCode')
  public async getPortfolio(
    @Path('capital') capital: string,
    @Path('portfolioCode') portfolioCode: string,
    @Query('updatedDate') updatedDate: string
  ): Promise<CapitalPorfolio[]> {
    return getPortfolio({ capital, portfolioCode, updatedDate });
  }

  @Get(':capital/:portfolioCode/available-dates')
  public async getAvailableDates(
    @Path('capital') capital: string,
    @Path('portfolioCode') portfolioCode: string
  ): Promise<CapitalAvailableDates[]> {
    return getAvailableDates({ capital, portfolioCode });
  }

  @Get(':capital/:portfolioCode/:stockCode')
  public async getStockHistory(
    @Path('capital') capital: string,
    @Path('portfolioCode') portfolioCode: string,
    @Path('stockCode') stockCode: string,
    @Query('fromDate') fromDate = '',
    @Query('toDate') toDate = ''
  ): Promise<StockHistory[]> {
    return getStockHistory({
      capital,
      portfolioCode,
      stockCode,
      fromDate,
      toDate,
    });
  }
}
