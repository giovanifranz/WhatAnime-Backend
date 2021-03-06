import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { AxiosResponse } from 'axios'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { catchException, formatSlug } from 'src/common'
import { IQuote, IResponseQuote } from 'src/interfaces'

@Injectable()
export class AnimechanClient {
  @InjectPinoLogger(AnimechanClient.name) private readonly logger: PinoLogger

  private animeChan = 'https://animechan.vercel.app/api'

  constructor(private httpService: HttpService) {}

  private quoteMapper(response: IResponseQuote): IQuote {
    return {
      title: response.anime,
      slug: formatSlug(response.anime),
      character: response.character,
      quote: response.quote,
    }
  }

  getAnimesQuoteByTitle(title: string): Observable<Array<IQuote>> {
    return this.httpService.get(`${this.animeChan}/quotes/anime?title=${title}`).pipe(
      map(({ data }) => {
        return data.map((quote: IResponseQuote) => {
          return this.quoteMapper(quote)
        })
      }),
      catchException((error) => this.logger.error({ error }, 'Erro ao buscar uma frase aleatória')),
    )
  }

  getRandomAnimeQuote(): Observable<IQuote> {
    return this.httpService.get(`${this.animeChan}/random`).pipe(
      map((response: AxiosResponse<IResponseQuote>) => {
        const { data } = response
        return this.quoteMapper(data)
      }),
      catchException((error) => this.logger.error({ error }, 'Erro ao buscar uma frase aleatória')),
    )
  }
}
