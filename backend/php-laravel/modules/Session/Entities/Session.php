<?php

namespace Modules\Session\Entities;

use Illuminate\Foundation\Auth\User;
use Modules\Session\Entities\Contract\SessionInterface;

class Session extends User implements SessionInterface
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = self::TABLE;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'key',
        'user_agent',
    ];

    public function getId(): int
    {
        return $this->id;
    }

    public function getKey(): string
    {
        return $this->key;
    }

    public function getUserAgent(): string
    {
        return $this->user_agent;
    }
}
