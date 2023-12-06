<?php

namespace Modules\Todo\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Todo\Entities\Contract\TodoInterface;
use Modules\Todo\Entities\Todo;
use Modules\Todo\Repositories\Contract\TodoRepositoryInterface;

class TodoRepository implements TodoRepositoryInterface
{

    public function all(): Collection
    {
        return Todo::all();
    }

    public function paginated(): LengthAwarePaginator
    {
        return Todo::paginate(request()->get('per_page'), ['*'], null, request()->get('page'));
    }

    public function store(array $input): TodoInterface
    {
        return Todo::create($input);
    }

    public function show(int $id): TodoInterface
    {
        return Todo::findOrFail($id);
    }

    public function update(array $input, int $id): TodoInterface
    {
        $record = Todo::findOrFail($id);

        $record->update($input);

        return $record->fresh();
    }

    public function delete(int $id): bool
    {
        return (bool) Todo::findOrFail($id)->destroy($id);
    }
}
