<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Session
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
      if(isset($_COOKIE['pegawai_token']) && $_COOKIE['pegawai_token']) { 
        return $next($request);
      }else{
        return redirect('/'); 
      }
    }
}
