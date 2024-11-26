export default defineEventHandler((event) => {
  if (event.path.startsWith('/api')) {
    const apiProxy = useRuntimeConfig(event).apiProxy || 'http://localhost:3000';
    return proxyRequest(event, `${apiProxy}${event.path}`);
  }
})
