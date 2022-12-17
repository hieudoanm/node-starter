type Options = { delimiter?: string; headers?: string[]; quote?: string };

const defaultOptions = {
  delimiter: ',',
  headers: [],
  quote: '"',
};

export const jsonToCSV = <T extends Record<string, string>>(
  data: T[],
  { delimiter = ',', headers = [], quote = '"' }: Options = defaultOptions
): string => {
  if (headers.length === 0) {
    const keys: string[] = data.map((item) => Object.keys(item)).flat(1);
    const uniqueKeys: string[] = [...new Set(keys)];
    headers = uniqueKeys;
  }

  const header: string = headers
    .map((header: string) => `${quote}${header}${quote}`)
    .join(delimiter);
  const rows: string = data
    .map((item: Record<string, string>) =>
      headers
        .map((key: string) => `${quote}${item[key] || ''}${quote}`)
        .join(delimiter)
    )
    .join('\n');
  return `${header}\n${rows}`;
};

export default jsonToCSV;
