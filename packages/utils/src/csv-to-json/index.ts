type Options = { delimiter?: string; quote?: string };

const defaultOptions = { delimiter: ',', quote: '"' };

export const csvToJSON = <T extends object>(
  string: string,
  { delimiter = ',', quote = '"' }: Options = defaultOptions
): T[] => {
  const lines: string[] = string.split('\n');
  const header: string = lines[0];
  const rows: string[] = lines.splice(1);
  const keys: string[] = header.split(delimiter);
  return rows.map((row: string) => {
    const cells = row.split(delimiter);
    const data: T = {} as T;
    for (let i = 0; i < keys.length; i++) {
      const regex = new RegExp(quote, 'g');
      const key: string = keys[i].replace(regex, '');
      const value = (cells[i] || '').toString().replace(regex, '');
      Object.assign(data, { [key]: value });
    }
    return data;
  });
};

export default csvToJSON;
