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

    read -p "(1/2)?: " var

    CHOOSEN_BACKEND=$var

    while [[ $CHOOSEN_BACKEND != @(1|2) ]]
    do
        echo -e "\n\x1B[31mInvalid choice! Please try again.\x1B[0m\n"

        Choose_Backend
    done
}

Choose_Frontend() {
    echo "Choose frontend:"
    echo "[1] Nuxt (Vue)"
    echo "[2] Next (React)"

    read -p "(1/2)?: " var

    CHOOSEN_FRONTEND=$var

    while [[ $CHOOSEN_FRONTEND != @(1|2) ]]
    do
        echo -e "\n\x1B[31mInvalid choice! Please try again.\x1B[0m\n"
        
        Choose_Frontend
    done
}

Prerequisite

Choose_Backend

echo ""

Choose_Frontend

echo ""

BACKENDS[0]="laravel"
BACKENDS[1]="nestjs"

FRONTENDS[0]="nuxt"
FRONTENDS[1]="next"

BACKEND=${BACKENDS[CHOOSEN_BACKEND-1]}
FRONTEND=${FRONTENDS[CHOOSEN_FRONTEND-1]}

case $BACKEND in

    "laravel")
        echo "Build laravel ..."

        BACKEND_SITE="http://php-laravel.lndo.site"
        API_URL="http://php-laravel.lndo.site/api"
        PMA_SITE="http://pma.php-laravel.lndo.site"

        (
            cp backend/seed.json backend/php-laravel/seed.json

            cd backend/php-laravel

            cp .env.example .env

            sed -i "s/DB_HOST=127.0.0.1/DB_HOST=database/" .env
            sed -i "s/DB_USERNAME=root/DB_USERNAME=laravel/" .env
            sed -i "s/DB_PASSWORD=/DB_PASSWORD=laravel/" .env

            lando start
            lando composer install
            lando php artisan migrate
        )
    ;;

    "nestjs")
        echo "Build nestjs ..."

        BACKEND_SITE="http://nodejs-nestjs.lndo.site"
        API_URL="http://nodejs-nestjs.lndo.site/api"
        PMA_SITE="http://pma.nodejs-nestjs.lndo.site"
    ;;

esac

echo ""

case $FRONTEND in

    "nuxt")
        echo "Build nuxt ..."
    ;;

    "next")
        echo "Build next ..."

        FRONTEND_SITE="http://react-next.lndo.site"

        (
            cd frontend/react-next

            cp .env.example .env

            sed -i "s|API_URL=|API_URL=$API_URL|" .env

            lando start
            lando npm install
            lando npm run build
        )
    ;;

esac

echo ""

echo "The system should be ready to use. Access with urls below:"
echo ""
echo -e "Backend Site\t: ${BACKEND_SITE}"
echo -e "Frontend Site\t: ${FRONTEND_SITE}"
echo -e "PHP My Admin\t: ${PMA_SITE}"
echo ""
echo "Enjoy!"