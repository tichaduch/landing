export default defineEventHandler((event) => {

  /**
   * Proxying all /api calls to api server
   */
  if (event.path.startsWith('/api')) {
    const apiProxy = useRuntimeConfig(event).apiProxy || 'http://localhost:3000';
    return proxyRequest(event, `${apiProxy}${event.path}`);
  }
})
