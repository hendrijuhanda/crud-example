<?php

namespace Modules\Session\Services\Contract;

use Modules\Session\Entities\Contract\SessionInterface;

interface SessionServiceInterface
{

    public function isTokenExist(): bool;

    public function isTokenValid(): bool;

    public function generateToken($callback = null): mixed;

    public function createTokenBySession(SessionInterface $session): string;
}
