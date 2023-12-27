<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Modules\Session\Providers\SessionGuard;
use Modules\Session\Providers\SessionProvider;
use Modules\Session\Repositories\Contract\SessionRepositoryInterface;
use Modules\Session\Repositories\SessionRepository;
use Modules\Session\Services\Contract\SessionServiceInterface;
use Modules\Session\Services\SessionService;
use Modules\Todo\Repositories\Contract\TodoRepositoryInterface;
use Modules\Todo\Repositories\TodoRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(TodoRepositoryInterface::class, TodoRepository::class);

        $this->app->bind(SessionRepositoryInterface::class, SessionRepository::class);
        $this->app->bind(SessionServiceInterface::class, SessionService::class);

        Auth::provider('custom-session', function ($app, array $config) {
            return new SessionProvider();
        });

        Auth::extend('custom-session', function ($app, $name, array $config) {
            return new SessionGuard(Auth::createUserProvider($config['provider']), $app->make('request'), $name);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
