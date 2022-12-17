import axios from 'axios';
import fs from 'fs';
import { Stream } from 'stream';

export const download = async (url: string, filePath: string) => {
  const { data } = await axios.get<Stream>(url, { responseType: 'stream' });

  if (!data) throw new Error('Invalid data');

  const writer = fs.createWriteStream(filePath);
  data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};

export default download;
