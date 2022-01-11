<p align="center">
  <a href="https://github.com/valeriansaliou/sonic"><img src="https://valeriansaliou.github.io/sonic/images/banner.jpg" /><a>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Verifica se existe Anime no cache da aplicação (Redis)</p>
  <p align="center">Se não houver faz a pesquisa no banco de dados em alta velocidade utilizando o Sonic atráves de palavras chaves indexadas no título</p>
  <p align="center">Caso necessário busca externamente os dados na API do Jikan e armazena somente o necessário no bando de dados NoSQL</p>
  <p align="center">Faz a sugestão de termos de pesquisa baseado no histórico de utilização da API através do Sonic</p>
  <p align="center">Swagger implementado na rota /api</p>
 
<p align="center"> 

## Description

### Stack

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.    
[Sonic](https://github.com/valeriansaliou/sonic) Sonic is a fast, lightweight and schema-less search backend. It ingests search texts and identifier tuples that can then be queried against in a microsecond's time.   
[Mongoose](https://github.com/Automattic/mongoose) Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.    
[Typescript](https://github.com/microsoft/TypeScript) Superset of JavaScript  
[Redis](https://redis.io) Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache, and message broker.  
[Swagger](https://swagger.io) Simplify API development for users, teams, and enterprises with our open source and professional toolset.  
[Docker](https://www.docker.com) Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers   
### APIs

[Jikan](https://github.com/jikan-me/jikan) Unofficial MyAnimeList.net PHP API  
[Animechan](https://github.com/rocktimsaikia/anime-chan) A free restful API serving quality anime quotes  

## Requisites 

[Docker](https://www.docker.com)   

### Mongo 

```bash
# database
whatanime
# collection
animes
```


## Running the app

```bash
# Docker Compose
$ docker compose up -d --build

```


## Documentação no Swagger 

Link: http://localhost:5000/api


## Stay in touch

- Author - [Giovani Franz](https://github.com/giovanifranz)
- Linkedin - [Linkedin](https://www.linkedin.com/in/giovanifranz/)

