@component('mail::message')
# Introduction

{{ $user->name }},

Thank you for registering your account!

Thanks,<br>
{{ config('app.name') }} Team
@endcomponent
