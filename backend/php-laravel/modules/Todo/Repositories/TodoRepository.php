<?php

namespace Modules\Todo\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Modules\Todo\Entities\Contract\TodoInterface;
use Modules\Todo\Entities\Todo;
use Modules\Todo\Repositories\Contract\TodoRepositoryInterface;

class TodoRepository implements TodoRepositoryInterface
{
    public function all(): Collection
    {
        return Todo::ownedBy(Auth::id())->all();
    }

    public function paginated(): LengthAwarePaginator
    {
        return Todo::ownedBy(Auth::id())->paginate(request()->get('per_page'), ['*'], null, request()->get('page'));
    }

    public function store(array $input, $sessionId = null): TodoInterface
    {
        $input['created_by'] = $sessionId ?? Auth::id();

        return Todo::create($input);
    }

    public function show(int $id): TodoInterface
    {
        return Todo::ownedBy(Auth::id())->findOrFail($id);
    }

    public function update(array $input, int $id): TodoInterface
    {
        $record = Todo::ownedBy(Auth::id())->findOrFail($id);

        $record->update($input);

        return $record->fresh();
    }

    public function delete(int $id): bool
    {
        return (bool) Todo::ownedBy(Auth::id())->findOrFail($id)->destroy($id);
    }
}
