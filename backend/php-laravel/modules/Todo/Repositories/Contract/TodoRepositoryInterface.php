<?php

namespace Modules\Todo\Repositories\Contract;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Todo\Entities\Contract\TodoInterface;

interface TodoRepositoryInterface
{

    public function all(): Collection;

    public function paginated(): LengthAwarePaginator;

    public function store(array $input, $sessionId): TodoInterface;

    public function show(int $id): TodoInterface;

    public function update(array $input, int $id): TodoInterface;

    public function delete(int $id): bool;
}
