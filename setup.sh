#!/usr/bin/env bash
# vim: set ft=sh

docker_required() {
    echo ""
    echo "É necessário permissão de super usuário"
    sudo true

    # docker
    if [[ `which docker` == '' ]]; then
        echo "Docker não está instalado."
        exit 0
    fi

    # docker-compose
    if [[ `which docker-compose` == '' ]]; then
        echo "Docker-compose não está instalado, ou ele não está na pasta /usr/bin."
        exit 0
    fi

    # compilando a maquina
    echo ""
    echo "Será iniciado o build da maquina do ambiente."
    echo "Tenha paciência, isso irá demorar um pouco. :)"
    echo "Vai lá e pega um café, a espera será mais feliz."
    echo ""
}

docker_start() {
    # start
    docker_required

    # Baixando as imagens
    docker-compose pull

    #iniciando as imagens
    docker_up_containers
}

docker_build () {
    # start
    docker_required

    # remove todos os containers
    docker-compose down

    # executa o build
    sudo docker-compose build

    docker-compose up -d
    sleep 10
}

docker_build_force_recreate () {
    # start
    docker_required

    # remove todos os containers
    docker-compose down

    # executa o build
    sudo docker-compose build

    #configurando o banco de dados
    docker-compose up -d --force-recreate
    sleep 10
}

docker_up_containers() {
    docker-compose start
}

docker_down_containers() {
    docker-compose stop
}

docker_up_containers_with_logs() {
    docker_up_containers
    docker-compose logs --tail=50 -f
}

print_urls() {
    echo ""
    echo "Os setup dos ambientes foi concluído com sucesso!"
    echo "Frontend:          http://127.0.0.1:3000/"
    echo "Swagger backend:   http://127.0.0.1:8000/swagger/"
}

echo "Seja bem-vindo ao menu de setup."
echo "Por favor escolha uma das opções abaixo:"
echo "1 - Deploy com o Docker"
echo "2 - Recriar containers"
echo "3 - Iniciar os containers"
echo "4 - Iniciar os containers com logs"
echo "5 - Desligar os containers"
if [ "$1" == "" ]; then
    echo -n "Digite sua opção: "
    read -n 1 option
    echo ""
else
    option="$1"
fi

if [ "$option" == "1" ]; then
    docker_build
    print_urls
elif [ "$option" == "2" ]; then
    docker_build_force_recreate
    print_urls
elif [ "$option" == "3" ]; then
    docker_up_containers
    print_urls
elif [ "$option" == "4" ]; then
    docker_up_containers_with_logs
elif [ "$option" == "5" ]; then
    docker_down_containers
else
    echo ""
    echo ":) Você quase acertou. Agora tente uma opção entre 1 e 5"
fi