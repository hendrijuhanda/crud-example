<?php

namespace Modules\Todo\Entities;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Modules\Todo\Entities\Contract\TodoInterface;

class Todo extends Model implements TodoInterface
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
        'title',
        'description',
        'created_by'
    ];

    public function getId(): int
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function getCreatedAt(): Carbon
    {
        return $this->created_at;
    }

    public function getUpdatedAt(): Carbon
    {
        return $this->updated_at;
    }

    public function scopeOwnedBy($query, $sessionId)
    {
        return $query->where('created_by', $sessionId)->orWhereNull('created_by');
    }
}
