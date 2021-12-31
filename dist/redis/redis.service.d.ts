import { Cache } from 'cache-manager';
export declare class RedisCacheService {
    private cacheManager;
    constructor(cacheManager: Cache);
    get(key: string): Promise<unknown>;
    set(key: string, value: object, options: number): Promise<void>;
    del(key: any): Promise<void>;
}
