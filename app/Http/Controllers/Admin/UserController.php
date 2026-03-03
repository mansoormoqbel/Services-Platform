<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{       
    use PasswordValidationRules, ProfileValidationRules;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users=User::all();
        return Inertia::render('admin/user/index',['users' => $users] );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/user/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            ...$this->profileRules(),
            'password' => $this->passwordRules(),
            'role' => ['required', 'in:customer,provider,admin'],
        ]);

        User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'role'=>$data['role'],
            'password' =>  Hash::make($data['password']),
        ]);

            return redirect()->route('admin.user.user');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user=User::where('id',$id)->first();
         return inertia('admin/user/edit', [
        'user1' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user=User::where('id',$id)->first();
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required','string','email','max:255',$id === null
                ? Rule::unique(User::class)
                : Rule::unique(User::class)->ignore($id),],
            'password' => ['required', 'string',],
            'role' => ['required', 'in:customer,provider,admin']
        ]);

        $user->update($validated);

        return redirect()->route('admin.user.user')
            ->with('success', 'Service updated successfully.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user=User::where('id',$id)->first();
         $user->delete();
        return redirect()->route('admin.user.user');
    }
}
