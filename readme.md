# iLabGest
**Sistema de Gestão de Ativos dos Laboratórios do INSTIC via QRCode.**

## Guia das Funcionalidades
_Ainda não disponível_


## Usar a Versão Hospedada (online)
_Ainda não disponível_


## Executar na Sua Máquina

### Pré-Requisitos
1. NodeJS (incluindo o npm).
    - [Baixar](https://nodejs.org).
    - Após o Download com Sucesso, instale esta Ferramenta na sua máquina.
    - Teste a Instalação com os comandos: `node -version` e `npm -version`. Isto vai retornar as versões de cada Ferramenta.
2. MongoDB.
    - [Baixar](https://mongodb.com/try/download/community).
    - Após o Download com Sucesso, instale esta Ferramenta na sua máquina.
    - Teste a Instalação com o comando: `mongo --version`. Isto vai retornar a versão da Ferramenta.
    - Recebe a mensagem `mongo não é reconhecido como comando interno`?
        - Isto acontece porque, nem sempre a Ferramenta de Instalação do Mongo o registra como uma Variável de Ambiete. Terá de o registrar manualmente e criar a seguinte estrutura de pastas: `C:/data/db`
3. Git.
    - [Baixar](http://git-scm.com/downloads).
    - Após o Download com Sucesso, instale esta Ferramenta na sua máquina.
    - Teste a Instalação com o comando: `git --version`. Isto vai retornar a versão da Ferramenta.



### Baixando o Projeto
1. Abra o terminal (cmd).
2. Navegue até a Pasta que ira conter o Projeto.
    - Ex.: `cd Desktop`.
3. Clonar o Projeto a partir da Origem Remota (GitHub).
    - `git clone https://github.com/cachsoftwares/iLabGest.git`.
        - Isto vai baixar o código-fonte da Aplicação na sua Área de trabalho contido na pasta iLabGest.



### Instalando Pacotes

**Para uma Instalação Geral execute o comando `npm install` sem especificar quais pacotes serão instalados. Isto instala todos os Pacotes registrados no aquivo `./package.json`.**

*Criação de Rotas*  
`npm install express`

*Mecanismo de Visualização*  
`npm install express-handlebars`

*Comutação de dados do Front*  
`npm install body-parser`

*Banco de Dados*  
`npm install mongoose`

*Criptografia das Senhas no Banco de Dados*  
`npm install bcryptjs`

*Autenticação*  
`npm install passport passport-local passport-strategy`

*Sessão de Autenticação*  
`npm install express-session`

*Upload de arquivos*  
`npm install multer`

*Mensagens de Feedback ao Usuário*  
`npm install connect-flash`

*Variáveis de Ambiente*  
`npm install dotenv`


**Copiar todos os Comando de Instalação de Pacotes**
```bash
    npm install express express-handlebars express-session bcryptjs body-parser dotenv mongoose connect-flash multer passport passport-local passport-strategy
```



### Adicionado Variáveis de Processo
1. Criar um ficheiro .env na raiz do projeto.
    - `./.env`
2. Registrar as Variáveis de Processo.
    - ```bash
        MONGO_URI_LOCAL = 'mongodb://localhost/ilabgest'
        MONGO_URI_CLOUD = '<uri-mongo-cloud>'
        ADMIN_PWD = '<senha-admin>'
        SESSION_SECRET = '<session-secret>'
    - Poderá obter o contúdo da variável `MONGO_URI_CLOUD` criando um banco de dados em nuvem em `https://atlas.mongodb.com`.
    - Poderá usar uma senha ao seu critério para a variável `ADMIN_PWD`.
        - Ex.: 'senha@admin2026'.
    - Poderá usar uma senha ao seu critério para a variável `SESSION_SECRET`.
        - Ex.: '20262027202820292030'.
    - Exemplo Completo:
        - ```bash
            MONGO_URI_LOCAL = 'mongodb://localhost/ilabgest'
            ADMIN_PWD = 'senha@admin2026'
            SESSION_SECRET = '20262027202820292030'
        - A ausência da variável `MONGO_URI_CLOUD` não compromete a execução do Projeto na sua máquina.



### Ligar o Banco de Dados
1. Abra o terminal (cmd)
2. Execute o comando `mongod`
    - Isto vai ligar o Servidor do Banco de Dados
3. Execute o comando `mongo`
    - Isto vai inicilizar o SGBD via CLI



### Ligar o Servidor da Aplicação
1. Abra o terminal (cmd)
2. Navegue até a pasta do Projeto
    - ex.: `cd Desktop/iLabGest`, se estiver na Área de Trabalho
3. Execute o comando `node app.js`
    - Isto vai executar o Servidor da Aplicação e Retornar a Mensagem `Server Fly - localhost:3025`, `MongoDB Connected` e `Admin created` se for a primeira vez e/ou não haver um Administrador Cadastrado no Banco de Dados
4. Abra o seu Navegador (FireFox, Chrome, Brave, etc) e digite no endereço de pesquisa `localhost:3025`



### Mangendo o Banco de Dados
- Listar todos os Bancos de Dados
    - `show databases` ou `show dbs`

- Selecionar o Banco de Dados do Projeto
    - Sintaxe: `use <nome-do-banco>`
    - Ex.: `use ilabgest`

- Listar todas as Coleções (tabelas)
    - `show collections`

- Inserir um Registro numa Coleção
    - Sintaxe:
        - ```bash 
            db.<nome-da-coleção>.insertOne(
                {
                    <campo>: <valor>,
                    <campo>: <valor>,
                    ...
                    <campo>: <valor>
                }
            )
    - Ex.:
        - ```bash
            db.users.insertOne(
                {
                    name: 'Vladmir Cach',
                    tel: '945217566',
                    status: 'Offline'
                }
            )

- Inserir vários Registros numa Coleção
    - Sintaxe:
        - ```bash
            db.<nome-da-coleção>.insertMany(
                [
                    {
                        <campo>: <valor>,
                        <campo>: <valor>,
                        ...
                        <campo>: <valor>
                    },
                    {
                        <campo>: <valor>,
                        <campo>: <valor>,
                        ...
                        <campo>: <valor>
                    },
                    ...
                    {
                        <campo>: <valor>,
                        <campo>: <valor>,
                        ...
                        <campo>: <valor>
                    }
                ]
            )
    - Ex.:
        - ```bash
            db.users.insertMany(
                [
                    {
                        name: 'Ana Maria',
                        tel: '923200200',
                        status: 'Offline'
                    },
                    {
                        name: 'Rodolfo de Assunção',
                        tel: '923300300',
                        status: 'Online'
                    },
                    {
                        name: 'Bendita Meneses',
                        tel: '923400400',
                        status: 'Bloqueado'
                    }
                ]
            )

- Exibir os Dados de uma Coleção
    - Sintaxe: `db.<nome-da-coleção>.find().pretty()`
    - Ex.: `db.users.find().pretty()`

- Exibir os Dados de uma Coleção com Filtro
    - Sintaxe: `db.<nome-da-coleção>.find({<campo>: <valor>}).pretty()`
    - Ex.: `db.users.find({tel: '945217566'}).pretty()`

- Atualizar um Registro numa Coleção
    - Sintaxe:
        - ```bash
            db.<nome-da-coleção>.updateOne(
                {<campo>: <valor>},
                {$set: {<campo>: <valor>}}
            )
    - Ex.:
        - ```bash
            db.users.updateOne(
                {tel: '945217566'},
                {$set: {name: 'Vladmir Cach Dev'}}
            )

- Atualizar vários Registros numa Coleção
    - Sintaxe:
        - ```bash
            db.<nome-da-coleção>.updateMany(
                {<campo>: <valor>},
                {$set: {<campo>: <valor>}}
            )
    - Ex.:
        - ```bash
            db.users.updateMany(
                {status: 'Online'},
                {$set: {status: 'Offline'}}
            )

- Atualizar todos os Registros numa Coleção
    - Sintaxe:
        - ```bash
            db.<nome-da-coleção>.updateMany(
                {<filtro-vazio>},
                {$set: {<campo>: <valor>}}
            )
    - Ex.:
        - ```bash
            db.users.updateMany(
                {},
                {$set: {status: 'Offline'}}
            )

- Deletar um Registro numa Coleção
    - Sintaxe: `db.<nome-da-coleção>.deleteOne({<campo>: <valor>})`
    - Ex.: `db.users.deleteOne({tel: '945217599'})`

- Deletar vários Registros numa Coleção
    - Sintaxe: `db.<nome-da-coleção>.deleteMany({<campo>: <valor>})`
    - Ex.: `db.users.deleteMany({status: 'Bloqueado'})`

- Deletar todos os Registros numa Coleção
    - Sintaxe: `db.<nome-da-coleção>.deleteMany({<filtro-vazio>})`
    - Ex.: `db.users.deleteMany({})`

- Apagar o Banco de Dados do Projeto
    - Selecione o Banco de Dados do Projeto: `use ilabgest`
    - Execute: `db.dropDatabase()`