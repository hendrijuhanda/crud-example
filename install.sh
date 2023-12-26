#!/bin/bash

Prerequisite() {
    DOCKER_VERSION=$(docker version -f "{{.Client.Version}}")
    LANDO_VERSION=$(lando version)

    DOCKER_VERSION=${DOCKER_VERSION%%.*}

    LANDO_VERSION=${LANDO_VERSION%%.*}
    LANDO_VERSION=${LANDO_VERSION##"v"}

    REG="^[0-9]+$"

    if 
        ! [[ $DOCKER_VERSION =~ $REG ]] || 
        ! [[ $LANDO_VERSION =~ $REG ]] || 
        [ $DOCKER_VERSION -lt 20 ] || 
        [ $LANDO_VERSION -lt 3 ];
    then
        echo -e "\x1B[31mDocker (v20~) and Lando (v3~) is required.\x1B[0m" 

        exit 1
    fi
}

Choose_Backend() {
    echo "Choose backend:"
    echo "[1] Laravel (PHP)"
    echo "[2] NestJS (NodeJS)"

    read -p "Type: " var

    CHOOSEN_BACKEND=$var

    while [[ $CHOOSEN_BACKEND != @(1|2) ]]
    do
        echo "Invalid choice! Please try again."

        Choose_Backend
    done
}

Choose_Frontend() {
    echo "Choose frontend:"
    echo "[1] Nuxt (Vue)"
    echo "[2] Next (React)"

    read -p "Type: " var

    CHOOSEN_FRONTEND=$var

    while [[ $CHOOSEN_FRONTEND != @(1|2) ]]
    do
        echo "Invalid choice! Please try again."
        
        Choose_Frontend
    done
}

Prerequisite
Choose_Backend
Choose_Frontend

BACKENDS[0]="laravel"
BACKENDS[1]="nestjs"

FRONTENDS[0]="nuxt"
FRONTENDS[1]="next"

BACKEND=${BACKENDS[CHOOSEN_BACKEND-1]}
FRONTEND=${FRONTENDS[CHOOSE_FRONTEND-1]}

case $BACKEND in

    "laravel")
        echo "Build laravel ..."
    ;;

    "nestjs")
        echo "Build nestjs ..."
    ;;

esac

case $FRONTEND in

    "nuxt")
        echo "Build nuxt ..."
    ;;

    "next")
        echo "Build next ..."
    ;;

esac