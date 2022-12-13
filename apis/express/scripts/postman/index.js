// eslint-disable-next-line @typescript-eslint/no-var-requires
const { readFileSync, writeFileSync } = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { convert } = require('swagger2-to-postmanv2');

const convertSync = (swaggerJson) => {
  return new Promise((resolve, reject) => {
    convert(swaggerJson, {}, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result);
    });
  });
};

const main = async () => {
  try {
    const swaggerFilePath = path.join(__dirname, '../../docs/swagger.json');
    const swaggerString = readFileSync(swaggerFilePath, 'utf-8');
    const swaggerJson = JSON.parse(swaggerString);
    const postmanResult = await convertSync({
      type: 'json',
      data: { ...swaggerJson, swagger: '2.0' },
    });
    const { result, output = [] } = postmanResult;
    if (!result) return;

    if (output.length === 1) {
      const collection = output[0];
      const { type, data } = collection;

      const postmanFilePath = path.join(
        __dirname,
        `../../docs/postman/collection.json`
      );
      if (type === 'collection') {
        writeFileSync(postmanFilePath, JSON.stringify(data, null, 2));
      }
      return;
    }

    for (let i = 0; i < output.length; i++) {
      const collection = output[i];
      const postmanFilePath = path.join(
        __dirname,
        `../../docs/postman/collection_${i}.json`
      );
      const { type, data } = collection;
      if (type === 'collection') {
        writeFileSync(postmanFilePath, JSON.stringify(data, null, 2));
      }
    }

    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};

main();
