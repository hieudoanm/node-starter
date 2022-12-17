import http from 'http';
import { onListening } from '.';

describe('onListening', () => {
  it('should get message', () => {
    const server = http.createServer();
    server.listen(1111);
    const message = onListening(server);
    expect(message).toEqual('🚀 Server is listening on port 1111');
    server.close();
  });

  it('should get message with appName', () => {
    const server = http.createServer();
    server.listen(1111);
    const message = onListening(server, 'App');
    expect(message).toEqual('🚀 App is listening on port 1111');
    server.close();
  });
});
