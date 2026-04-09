<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\InteractsWithMedia;
use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    use InteractsWithMedia;

    public function index(): Response
    {
        $clients = Client::query()
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get()
            ->map(fn (Client $client) => [
                'id' => $client->id,
                'name' => $client->name,
                'logo' => $this->toPublicUrl($client->logo),
                'url' => $client->url,
                'sort_order' => $client->sort_order,
                'is_active' => $client->is_active,
            ]);

        return Inertia::render('dashboard/clients/index', [
            'clients' => $clients,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'logo' => ['required', 'image', 'max:5120'],
            'url' => ['nullable', 'string', 'max:2048'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        Client::query()->create([
            'name' => $validated['name'],
            'logo' => $this->storeUploadedImage($request->file('logo'), 'clients/logos'),
            'url' => $validated['url'] ?? null,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return back()->with('success', 'Klien berhasil ditambahkan.');
    }

    public function update(Request $request, Client $client): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'logo' => ['nullable', 'image', 'max:5120'],
            'url' => ['nullable', 'string', 'max:2048'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $logoPath = $client->logo;

        if ($request->hasFile('logo')) {
            $this->deleteStoredFile($client->logo);
            $logoPath = $this->storeUploadedImage($request->file('logo'), 'clients/logos');
        }

        $client->update([
            'name' => $validated['name'],
            'logo' => $logoPath,
            'url' => $validated['url'] ?? null,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => $validated['is_active'] ?? false,
        ]);

        return back()->with('success', 'Klien berhasil diperbarui.');
    }

    public function destroy(Client $client): RedirectResponse
    {
        $this->deleteStoredFile($client->logo);
        $client->delete();

        return back()->with('success', 'Klien berhasil dihapus.');
    }
}
