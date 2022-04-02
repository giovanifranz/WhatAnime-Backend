import { CACHE_MANAGER, CacheModule, Inject, Module } from '@nestjs/common'
import { Cache } from 'cache-manager'
import * as redisStore from 'cache-manager-redis-store'
import { RedisCacheService } from './redis.service'

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => {
        return {
          store: redisStore,
          host: 'redis',
          port: '6379'
        }
      }
    })
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheModule, RedisCacheService]
})
export class RedisCacheModule {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}
}
