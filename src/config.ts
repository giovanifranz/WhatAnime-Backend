import { Ingest, Search } from 'sonic-channel'

const configSonic = {
  host: 'sonic',
  port: 1491,
  auth: process.env.AUTH_SONIC,
}

export const sonicChannelIngest = new Ingest(configSonic)
export const sonicChannelSearch = new Search(configSonic)

export const loggerConfig = {
  pinoHttp: {
    redact: {
      remove: true,
      paths: ['pid', 'responseTime', 'res.headers', 'req.headers'],
    },
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  },
}
