<?php

namespace Modules\Todo\Entities\Contract;

use Carbon\Carbon;

interface TodoInterface
{
    const TABLE = 'todo';

    public function getId(): int;

    public function getTitle(): string;

    public function getDescription(): ?string;

    public function getCreatedAt(): Carbon;

    public function getUpdatedAt(): Carbon;
}
