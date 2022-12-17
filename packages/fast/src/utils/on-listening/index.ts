import http from 'http';

export const onListening = (
  server: http.Server,
  appName = 'Server'
): string => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
  return `🚀 ${appName} is listening on ${bind}`;
};

export default onListening;
