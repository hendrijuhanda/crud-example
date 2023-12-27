<?php

namespace Modules\Session\Repositories;

use Modules\Session\Entities\Contract\SessionInterface;
use Modules\Session\Entities\Session;
use Modules\Session\Repositories\Contract\SessionRepositoryInterface;

class SessionRepository implements SessionRepositoryInterface
{

    public function store(array $input): SessionInterface
    {
        return Session::create($input);
    }

    public function show(int $id): SessionInterface
    {
        return Session::findOrFail($id);
    }
}
