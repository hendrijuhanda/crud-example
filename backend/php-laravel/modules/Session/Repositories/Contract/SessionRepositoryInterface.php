<?php

namespace Modules\Session\Repositories\Contract;

use Modules\Session\Entities\Contract\SessionInterface;

interface SessionRepositoryInterface
{

    public function store(array $input): SessionInterface;

    public function show(int $id): SessionInterface;
}
