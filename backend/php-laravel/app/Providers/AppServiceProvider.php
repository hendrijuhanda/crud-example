<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

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
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
