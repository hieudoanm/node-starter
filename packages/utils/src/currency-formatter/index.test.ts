import {
  audFormatter,
  eurFormatter,
  gbpFormatter,
  usdFormatter,
  vndFormatter,
} from '.';

describe('currencyFormatter', () => {
  it('audFormatter', () => {
    const aud = audFormatter(1);
    expect(aud).toEqual('A$1.00');
  });

  it('eurFormatter', () => {
    const eur = eurFormatter(1);
    expect(eur).toEqual('€1.00');
  });

  it('gbpFormatter', () => {
    const gbp = gbpFormatter(1);
    expect(gbp).toEqual('£1.00');
  });

  it('usdFormatter', () => {
    const usd = usdFormatter(1);
    expect(usd).toEqual('$1.00');
  });

  it('vndFormatter', () => {
    const currency = vndFormatter(1000);
    expect(currency).toEqual('1.000₫');
  });
});
