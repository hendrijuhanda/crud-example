<?php

namespace Modules\Session\Entities\Contract;

interface SessionInterface
{
    const TABLE = 'session';

    public function getId(): int;

    public function getKey(): string;

    public function getUserAgent(): string;
}
