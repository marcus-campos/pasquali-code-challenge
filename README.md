# Desafio de técnico

## Escopo
Desenvolver aplicação web para extração de tweets através da TwitterAPI

#### Detalhamentos:

* Aplicar termos para extração de tweets conforme input do usuário
* Permitir paginação de resultados na interface web
* Visualizar estatísticas da extração (quantidade de tweets por data, por exemplo)
* Permitir exportação de resultados pelo usuário para arquivo .csv

#### Requisitos

* Garantir ambiente reprodutível
* Documentar principais etapas para execução do código como How to run



# Configuração de ambiente
Antes de mais nada, [crie um app no twitter](https://medium.com/@marlessonsantana/como-criar-apps-e-obter-os-tokens-necess%C3%A1rios-para-coletar-dados-do-twitter-instagram-linkedin-e-8f36602ea92a), depois de criado, atualize o arquivo `local.env` que está na pasta `backend`, altere os valores das variavies `TWITTER_CONSUMER_KEY` e `TWITTER_CONSUMER_SECRET` e coloque as chaves que você obeteve na criação do app. O arquivo local.env deve ficar semelhante ao próximo exemplo:

```
# DJANGO
SECRET_KEY=l9zuo47(+@5j+vd=yc=&3m(kyjr(2tuuy*ff)fbncj@5t^r2@z
DEBUG=True
LOG_LEVEL=INFO
LOGGERS=
ALLOWED_HOSTS=*

# APP
TWITTER_CONSUMER_KEY=MLsDDfEaAl14S6P...
TWITTER_CONSUMER_SECRET=ocbKDW02MkjiFt...
```

## Execução do projeto
Você já tem o docker instalado na sua máquina? Se não [clique aqui](https://www.digitalocean.com/community/tutorials/como-instalar-e-usar-o-docker-no-ubuntu-18-04-pt) para ver um exemplo de como instala-lo. Você também irá precisar do docker-compose, se você não o tiver instalado [clique aqui](https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-18-04-pt) para ver um exemplo de como instala-lo

Agora que você tem tudo instalado, você precisa dar permissão de execução para o arquivo `setup.sh`, você pode fazer isso executando o seguinte comando no terminal dentro da pasta do seu projeto:

```bash
root@MBP ~/projects/pasquali-code-challenge $ chmod +x setup.sh
```

Logo em seguida, você pode iniciar o setup do projeto executando o seguinte comando:

```bash
root@MBP ~/projects/pasquali-code-challenge $ ./setup.sh
```

ou

```bash
root@MBP ~/projects/pasquali-code-challenge $ bash setup.sh
```

Você irá ver o seguinte texto:

```
Seja bem-vindo ao menu de setup.
Por favor escolha uma das opções abaixo:
1 - Deploy com o Docker
2 - Recriar containers
3 - Iniciar os containers
4 - Iniciar os containers com logs
5 - Desligar os containers
Digite sua opção:
```

Neste momento digite a opção `1`.

Ao final da execução se tudo tiver ocorrido corretamente, você irá ver um texto semelhante a este:

```
Successfully built 0990a6ab2c24
Successfully tagged pasquali-code-challenge_page:latest
Creating network "pasquali-code-challenge_default" with the default driver
Creating frontend ... done
Creating backend  ... done

Os setup dos ambientes foi concluído com sucesso!
Frontend:          http://127.0.0.1:3000/
Swagger backend:   http://127.0.0.1:8000/swagger/
```

Agora basta acessar o projeto em seu navegador:

* [http://localhost:3000/](http://localhost:3000/)
* [http://localhost:8000/swagger/](http://localhost:8000/swagger/)