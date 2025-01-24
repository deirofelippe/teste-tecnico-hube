# Documentação

Teste técnico em que deve ser desenvolvido um backend com nodejs, typescript e express.

A API deve cadastrar usuario e buscar um usuário.

Deve ser seguido boa práticas, organização de código, padroes de projeto e arquitetura (Controller, Service, Repository)

## Sumário

- [Versões](#versões)
- [Arquitetura usada](#arquitetura-usada)
- [Como instalar e executar?](#como-instalar-e-executar)
- [Como executar os testes e cobertura de teste?](#como-executar-os-testes-e-cobertura-de-teste)
- [GitHub Actions](#github-actions)
- [Melhorias](#melhorias)

## Versões

|      Nome      |  Versão  |
| :------------: | :------: |
|     Nodejs     |  21.7.3  |
|      Jest      |  29.7.0  |
|    Express     |  4.21.2  |
|   Typescript   |  5.7.3   |
|     Docker     | 20.10.23 |
| Docker Compose |  2.15.1  |
|      SWC       |  1.10.9  |

## Arquitetura usada

![](./docs/arquitetura.png)

## Como instalar e executar?

- `git clone https://github.com/deirofelippe/teste-tecnico-hube.git`
- `cd teste-tecnico-hube`
- Execute a aplicação com:
  - `make init-and-start`
  - **OU**
  - `docker compose up -d`
  - `docker container exec backend ash -c "npm ci && npm start"`
- Acessar pela url `http://localhost:3000/`.
- O arquivo `./backend.http` tem documentado as rotas.

![](./docs/img-2.png)

## Como executar os testes e cobertura de teste?

- Executar os testes `docker container exec backend bash -c "npm run test tests/"` ou `make test`.
- Executar e gerar a cobertura de testes `docker container exec backend bash -c "npm run test:cov tests/"` ou `make test-cov`.
- O arquivo gerado será `./coverage/lcov-report/index.html`.

![](./docs/img-1.png)
![](./docs/img-3.png)

## GitHub Actions

- No aquiro [.github/workflows/ci.yaml](https://github.com/deirofelippe/teste-tecnico-hube/blob/main/.github/workflows/ci.yaml) foi configurado o uso do github action para testar, rodar build e verificar se tem vulnerabilidade no código com o `npm audit`.
- Foi usada uma regra para só permitir merge na main por Pull Request e se o teste passar e não é aceito o push direto na main.

![](./docs/img-4.png)

## Melhorias

- Fazer mais teste E2E, unitário e de integração.
- Padronizar melhor os nomes em portugues e inglês.
- Transformar a função sanitize em classe para cada rota.
- Usar lib para fazer validação.
