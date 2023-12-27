<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Modules\Todo\Repositories\Contract\TodoRepositoryInterface;
use Modules\Todo\Repositories\TodoRepository;

class TodoSeeder extends Seeder
{
    private TodoRepositoryInterface $todoRepository;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = file_get_contents(base_path('seed.json'));

        $array = json_decode($json, true);

        $this->todoRepository = new TodoRepository();

        foreach ($array['todos'] as $todo) {
            $this->todoRepository->store($todo);
        }
    }
}
