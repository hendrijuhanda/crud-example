#!/bin/bash

Prerequisite() {
    LANDO_VERSION=$(lando version)
    LANDO_VERSION=${LANDO_VERSION%%.*}
    LANDO_VERSION=${LANDO_VERSION##"v"}

    REG="^[0-9]+$"

    if ! [[ $LANDO_VERSION =~ $REG ]] || [ $LANDO_VERSION -lt 3 ];
    then
        echo -e "\x1B[31mLando version 3 or later is required.\x1B[0m" 

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
        echo "\x1B[31mInvalid choice! Please try again.\x1B[0m"

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
        echo "\x1B[31mInvalid choice! Please try again.\x1B[0m"
        
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
FRONTEND=${FRONTENDS[CHOOSEN_FRONTEND-1]}

case $BACKEND in

    "laravel")
        echo "Build laravel ..."

        (
            cp backend/seed.json backend/php-laravel/seed.json

            cd backend/php-laravel

            cp .env.example .env

            sed -i "s/DB_HOST=127.0.0.1/DB_HOST=database/" .env
            sed -i "s/DB_USERNAME=root/DB_USERNAME=laravel/" .env
            sed -i "s/DB_PASSWORD=/DB_PASSWORD=laravel/" .env

            lando start
            lando composer install
            lando php artisan key:generate
            lando php artisan migrate
            lando php artisan db:seed --class=TodoSeeder
        )
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