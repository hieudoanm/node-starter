import logger from '@hieudoanm/pino';
import { CapitalAvailableDates, CapitalPorfolio, Prisma } from '@prisma/client';
import { prisma } from '../../libs/prisma';
import { StockHistory } from './portfolio.types';

export const getPortfolio = async ({
  capital,
  portfolioCode,
  updatedDate,
}: {
  capital: string;
  portfolioCode: string;
  updatedDate: string;
}): Promise<CapitalPorfolio[]> => {
  logger.info('getPortfolio', { capital, portfolioCode, updatedDate });
  return prisma.capitalPorfolio.findMany({
    where: { capital, portfolioCode, updatedDate },
  });
};

export const getActiveStockCodes = async ({
  capital,
}: {
  capital: string;
}): Promise<{ stockCode: string }[]> => {
  logger.info('getActiveStockCodes', { capital });
  const { availableDate } = await prisma.capitalAvailableDates.findFirstOrThrow(
    { where: { capital }, orderBy: { availableDate: 'desc' } }
  );
  const capitalPorfolio = await prisma.capitalPorfolio.findMany({
    where: { capital, updatedDate: availableDate },
  });
  const stockCodes = capitalPorfolio.map((portfolio) => portfolio.stockCode);
  const uniqueStockCodes = [...new Set(stockCodes)].sort();
  return uniqueStockCodes.map((stockCode) => {
    return { stockCode };
  });
};

export const getAvailableDates = async ({
  capital,
  portfolioCode,
}: {
  capital: string;
  portfolioCode: string;
}): Promise<CapitalAvailableDates[]> => {
  logger.info('getAvailableDates', { capital, portfolioCode });
  return prisma.capitalAvailableDates.findMany({
    where: { capital, portfolioCode },
  });
};

export const getStockHistory = async ({
  capital,
  portfolioCode,
  stockCode,
  fromDate = '',
  toDate = '',
}: {
  capital: string;
  portfolioCode: string;
  stockCode: string;
  fromDate?: string;
  toDate?: string;
}): Promise<StockHistory[]> => {
  logger.info('getStockHistory', { capital, portfolioCode, stockCode });
  let where: Prisma.CapitalAvailableDatesWhereInput = {
    capital,
    portfolioCode,
  };
  if (fromDate !== '' && toDate !== '') {
    where = { ...where, availableDate: { gte: fromDate, lte: toDate } };
  } else if (fromDate !== '') {
    where = { ...where, availableDate: { gte: fromDate } };
  } else if (toDate !== '') {
    where = { ...where, availableDate: { lte: toDate } };
  }
  const capitalAvailableDates: CapitalAvailableDates[] =
    await prisma.capitalAvailableDates.findMany({
      where,
      orderBy: { availableDate: 'asc' },
    });
  const availableDates: string[] = capitalAvailableDates.map(
    (capitalAvailableDate) => capitalAvailableDate.availableDate
  );
  const stockHistory = await prisma.capitalPorfolio.findMany({
    where: { capital, portfolioCode, stockCode: stockCode.toUpperCase() },
    orderBy: { updatedDate: 'asc' },
  });
  return availableDates
    .map((availableDate: string) => {
      const history = stockHistory.find(
        (h) => h.updatedDate === availableDate
      ) || {
        id: '',
        capital,
        portfolioCode,
        stockCode,
        sector: '',
        market: '',
        updatedDate: availableDate,
        percentage: 0,
      };
      return history;
    })
    .map(
      (history: CapitalPorfolio, index: number, array: CapitalPorfolio[]) => {
        const { percentage } = history;
        if (index <= 0) {
          return { ...history, percentageChange: 0 };
        }
        let percentageChange = 0;
        const previousHistory = array[index - 1];
        const { percentage: previousPercentage } = previousHistory;
        if (percentage === previousPercentage) {
          // Unchanged
        } else if (
          previousPercentage === 0 &&
          percentage > previousPercentage
        ) {
          percentageChange = 100;
        } else if (
          previousPercentage === 0 &&
          percentage < previousPercentage
        ) {
          percentageChange = 100;
        } else {
          percentageChange =
            ((percentage - previousPercentage) / previousPercentage) * 100;
          percentageChange = parseFloat(percentageChange.toFixed(2));
        }
        return { ...history, percentageChange };
      }
    );
};
