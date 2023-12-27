<?php

namespace Modules\Session\Providers;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Support\Facades\Crypt;
use Modules\Session\Entities\Session;

class SessionProvider implements UserProvider
{
    /**
     *
     */
    public function retrieveByCredentials(array $credentials)
    {
    }

    /**
     *
     */
    public function retrieveById($identifier)
    {
    }

    /**
     *
     */
    public function retrieveByToken($identifier, $token)
    {
        $decrypted = Crypt::decryptString($token);

        try {
            return Session::find(json_decode($decrypted, true)['id']);
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     *
     */
    public function validateCredentials(Authenticatable $user, array $credentials)
    {
    }

    /**
     *
     */
    public function updateRememberToken(Authenticatable $user, $token)
    {
    }
}
