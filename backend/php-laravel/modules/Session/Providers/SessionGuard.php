<?php

namespace Modules\Session\Providers;

use Illuminate\Auth\GuardHelpers;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Http\Request;

class SessionGuard implements Guard
{
    use GuardHelpers;

    protected $request;
    protected $provider;
    protected $name;
    protected $user;

    /**
     * Create a new authentication guard.
     *
     * @param \Illuminate\Contracts\Auth\UserProvider $provider
     * @param \Illuminate\Http\Request $request
     * @param string $name
     * @return void
     */
    public function __construct(UserProvider $provider, Request $request, string $name)
    {
        $this->request = $request;
        $this->provider = $provider;
        $this->name = $name;
        $this->user = NULL;
    }

    /**
     * Get the currently authenticated user.
     *
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function user()
    {
        if (!is_null($this->user)) {
            return $this->user;
        }

        $token = $this->request->bearerToken();

        $user = null;

        if (!empty($token)) {
            $user = $this->provider->retrieveByToken($this->name, $token);
        }

        return $user ? $this->setUser($user) : null;
    }

    /**
     * Validate a user's credentials.
     *
     * @param  array  $credentials
     * @return bool
     */
    public function validate(array $credentials = [])
    {
    }
}
