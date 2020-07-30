const application = require('./dist');

module.exports = application;

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT || 8000),
      host: process.env.HOST,
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
    cors: {
      origin: [
        'https://2uwebapp.azurewebsites.net',
        'http://explorer.loopback.io',
        'https://explorer.loopback.io',
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      maxAge: 86400,
      credentials: true,
    },
  };
  application.main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
