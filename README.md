# Trybe Futebol Clube

  ![Exemplo app front](assets/front-example.png)

  O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️

  No time de desenvolvimento do `TFC`, seu *squad* ficou responsável por desenvolver uma API (utilizando o método `TDD`) e também integrar *- através do docker-compose -* as aplicações para que elas funcionem consumindo um banco de dados.

  Nesse projeto, você vai construir **um back-end dockerizado utilizando modelagem de dados através do Sequelize**. Seu desenvolvimento deve **respeitar regras de negócio** providas no projeto e **sua API deve ser capaz de ser consumida por um front-end já provido nesse projeto**.

  Para adicionar uma partida é necessário ter um _token_, portanto a pessoa deverá estar logada para fazer as alterações. Teremos um relacionamento entre as tabelas `teams` e `matches` para fazer as atualizações das partidas.

  O seu back-end deverá implementar regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.

<summary><strong> Estrutura do projeto</strong></summary><br />

O projeto é composto de 4 entidades importantes para sua estrutura:

1️⃣ **Banco de dados:**
  - Será um container docker MySQL já configurado no docker-compose através de um serviço definido como `db`.
  - Tem o papel de fornecer dados para o serviço de _backend_.
  - Durante a execução dos testes sempre vai ser acessado pelo `sequelize` e via porta `3002` do `localhost`; 
  - Você também pode conectar a um Cliente MySQL (Workbench, Beekeeper, DBeaver e etc), colocando as credenciais configuradas no docker-compose no serviço `db`.

2️⃣ **Back-end:**
 - Será o ambiente que você realizará a maior parte das implementações exigidas. 
 - Deve rodar na porta `3001`, pois o front-end faz requisições para ele nessa porta por padrão;
 - Sua aplicação deve ser inicializada a partir do arquivo `app/backend/src/server.ts`;
 - Garanta que o `express` é executado e a aplicação ouve a porta que vem das variáveis de ambiente;
 - Todas as dependências extras (tal como `joi`, `boom`, `express-async-errors`...) devem ser listadas em `app/backend/packages.npm`.

3️⃣ **Front-end:**
  - O front já está concluído, não é necessário realizar modificações no mesmo. A única exceção será seu Dockerfile que precisará ser configurado.
  - Todos os testes a partir do requisito de login usam o `puppeteer` para simular uma pessoa acessando o site `http://localhost:3000/`; 
  - O front se comunica com serviço de back-end pela url `http://localhost:3001` através dos endpoints que você deve construir nos requisitos.
  - Recomendamos que sempre que implementar um requisito no back-end acesse a página no front-end que consome a implementação para validar se está funcionando como esperado.

4️⃣ **Docker:**
  - O `docker-compose` tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando `npm run compose:up` ou `npm run compose:up:dev`;
  - Você **deve** configurar as `Dockerfiles` corretamente nas raízes do `front-end` e `back-end`, para conseguir inicializar a aplicação;
  

Esse projeto é composto de 4 seções principais:
1. User e Login
2. Times
3. Partidas
4. Placar 


## Seção 1: Users e Login


### 1 - Desenvolva em `/app/backend/src/database` nas pastas correspondentes, uma migration e um model para a tabela `users`

### 2 - (`TDD`) Desenvolva testes que cubram no mínimo 5% dos arquivos back-end em `/src`, com um mínimo de 7 linhas cobertas

### 3 - Desenvolva o endpoint `/login` no back-end de maneira que ele permita o acesso com dados válidos no front-end

### 4 - (`TDD`) Desenvolva testes que cubram no mínimo 10% dos arquivos back-end em `/src`, com um mínimo de 19 linhas cobertas

### 5 - Desenvolva o endpoint `/login` no back-end de maneira que ele não permita o acesso sem informar um email no front-end

### 6 - (`TDD`) Desenvolva testes que cubram no mínimo 15% dos arquivos back-end em `/src`, com um mínimo de 25 linhas cobertas

### 7 - Desenvolva o endpoint `/login` no back-end de maneira que ele não permita o acesso sem informar uma senha no front-end

### 8 - (`TDD`) Desenvolva testes que cubram no mínimo 20% dos arquivos back-end em `/src`, com um mínimo de 35 linhas cobertas

### 9 - Desenvolva o endpoint `/login` no back-end de maneira que ele não permita o acesso com um email inválido no front-end

### 10 - (`TDD`) Desenvolva testes que cubram no mínimo 30% dos arquivos back-end em `/src`, com um mínimo de 45 linhas cobertas

### 11 - Desenvolva o endpoint `/login` no back-end de maneira que ele não permita o acesso com uma senha inválida no front-end

### 12 - Desenvolva o endpoint `/login/validate` no back-end de maneira que ele retorne os dados corretamente no front-end

### 13 - (`TDD`) Desenvolva testes que cubram no mínimo 45% dos arquivos back-end em `/src`, com um mínimo de 70 linhas cobertas


## Seção 2: Times


### 14 - Desenvolva em `/app/backend/src/database` nas pastas correspondentes, uma migration e um model para a tabela de `teams`


### 15 - Desenvolva o endpoint `/teams` no back-end de forma que ele possa retornar todos os times corretamente

### 16 - Desenvolva o endpoint `/teams/:id` no back-end de forma que ele possa retornar dados de um time específico
`

### 17 - (`TDD`) Desenvolva testes que cubram no mínimo 60% dos arquivos back-end em `/src`, com um mínimo de 80 linhas cobertas


## Seção 3: Partidas


### 18 - Desenvolva em `/app/backend/src/database` nas pastas correspondentes, uma migration e um model para a tabela de `matches`

### 19 - Desenvolva o endpoint `/matches` de forma que os dados apareçam corretamente na tela de partidas no front-end.

### 20 - Desenvolva o endpoint `/matches` de forma que seja possível filtrar as partidas em andamento na tela de partidas do front-end

### 21 - Desenvolva o endpoint `/matches` de forma que seja possível filtrar as partidas finalizadas na tela de partidas do front-end

### 22 - (`Bônus`; `TDD`) Desenvolva testes que cubram no mínimo 80% dos arquivos back-end em `/src`, com um mínimo de 100 linhas cobertas

### 23 - Desenvolva a rota `/matches` de modo que seja possível salvar uma partida com o status de inProgress como true no banco de dados

### 24 - Desenvolva a rota `/matches/:id/finish` de modo que seja possível alterar o status inProgress de uma partida para false no banco de dados

### 25 - Desenvolva o endpoint `/matches` de forma que não seja possível inserir uma partida com times iguais

### 26 - Desenvolva o endpoint `/matches` de forma que não seja possível inserir uma partida com um time que não existe na tabela teams

### 27 - Desenvolva o endpoint `/matches` de forma que não seja possível inserir uma partida sem um token válido

### 28 - Desenvolva o endpoint `/matches/:id` de forma que seja possível atualizar partidas em andamento


## Seção 4: Leaderboards (placares)


### 29 - Desenvolva o endpoint `/leaderboard/home` de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end com os dados iniciais do banco de dados

### 30 - Desenvolva o endpoint `/leaderboard/home` de forma que seja possível: filtrar as classificações dos times da casa na tela de classificação do front-end, e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional

### 31 - Desenvolva o endpoint `/leaderboard/away`, de forma que seja possível filtrar as classificações dos times na tela de classificação do front-end, com os dados iniciais do banco de dados

### 32 - Desenvolva o endpoint `/leaderboard/away` de forma que seja possível: filtrar as classificações dos times na tela de classificação do front-end e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional

### 33 - Desenvolva o endpoint `/leaderboard` de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end com os dados iniciais do banco de dados

### 34 - Desenvolva o endpoint /leaderboard de forma que seja possível: filtrar a classificação geral dos times na tela de classificação do front-end e atualizar a tabela ao inserir a partida Flamengo 3 X 0 Napoli-SC

### 35 - Desenvolva o endpoint /leaderboard de forma que seja possível: filtrar a classificação geral dos times na tela de classificação do front-end e atualizar a tabela ao inserir a partida Minas Brasília 1 X 0 Ferroviária
