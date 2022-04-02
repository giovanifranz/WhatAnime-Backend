import { sonicChannelIngest, sonicChannelSearch } from './sonic'
import { PinoLogger } from 'nestjs-pino'
import { loggerConfig } from 'src/config'

const logger = new PinoLogger(loggerConfig)
export const sonicProviders = [
  {
    provide: 'SONIC_CONNECTION',
    useFactory: async () => {
      sonicChannelIngest.connect({
        connected: () => {
          logger.info('Connected to Sonic Channel Ingest')
        }
      })

      sonicChannelSearch.connect({
        connected: () => {
          logger.info('Connected to Sonic Channel Search')
        }
      })
    }
  }
]
