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
    console.log(__dirname);
    const swaggerFilePath = path.join(__dirname, '../../docs/swagger.json');
    console.log('swagger file path', swaggerFilePath);
    const swaggerString = readFileSync(swaggerFilePath, 'utf-8');
    const swaggerJson = JSON.parse(swaggerString);
    const postmanResult = await convertSync({
      type: 'json',
      data: { ...swaggerJson, swagger: '2.0' },
    });
    const { result, output = [] } = postmanResult;
    if (!result) return;
    for (let i = 0; i < output.length; i++) {
      const collection = output[i];
      const postmanFilePath = path.join(
        __dirname,
        `../../docs/postman_collection_${i}.json`
      );
      console.log('postman file path', postmanFilePath);
      const { type, data } = collection;
      if (type === 'collection') {
        writeFileSync(postmanFilePath, JSON.stringify(data, null, 2));
      }
    }

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
