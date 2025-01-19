export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  mongodb: {
    uri: process.env.MONGODB_URI,
  },
  auth: {
    serviceUrl: process.env.AUTH_SERVICE_URL,
    serviceId: 'bank-service',
    apiKey: process.env.SERVICE_API_KEY,
  },
});
