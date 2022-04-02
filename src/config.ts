export const loggerConfig = {
  pinoHttp: {
    enabled: !process.env.LOG_DISABLED,
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true
      }
    }
  }
}
