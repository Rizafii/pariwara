<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('article_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->timestamps();
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->foreignId('article_category_id')
                ->nullable()
                ->after('content')
                ->constrained('article_categories')
                ->nullOnDelete();

            $table->foreignId('user_id')
                ->nullable()
                ->after('image')
                ->constrained()
                ->nullOnDelete();
        });

        $this->backfillArticleRelations();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropConstrainedForeignId('article_category_id');
            $table->dropConstrainedForeignId('user_id');
        });

        Schema::dropIfExists('article_categories');
    }

    private function backfillArticleRelations(): void
    {
        $existingCategories = DB::table('articles')
            ->whereNotNull('category')
            ->distinct()
            ->pluck('category')
            ->filter(fn (mixed $value): bool => is_string($value) && trim($value) !== '')
            ->values();

        $categoryIdMap = [];

        foreach ($existingCategories as $categoryName) {
            $name = (string) $categoryName;
            $categoryIdMap[$name] = $this->resolveCategoryId($name);
        }

        foreach ($categoryIdMap as $name => $categoryId) {
            DB::table('articles')
                ->where('category', $name)
                ->update(['article_category_id' => $categoryId]);
        }

        $defaultUserId = DB::table('users')->orderBy('id')->value('id');

        if ($defaultUserId !== null) {
            DB::table('articles')
                ->whereNull('user_id')
                ->update(['user_id' => $defaultUserId]);
        }
    }

    private function resolveCategoryId(string $name): int
    {
        $existingId = DB::table('article_categories')
            ->where('name', $name)
            ->value('id');

        if ($existingId !== null) {
            return (int) $existingId;
        }

        $baseSlug = Str::slug($name);
        $baseSlug = $baseSlug !== '' ? $baseSlug : 'kategori';
        $slug = $baseSlug;
        $suffix = 1;

        while (DB::table('article_categories')->where('slug', $slug)->exists()) {
            $suffix++;
            $slug = $baseSlug.'-'.$suffix;
        }

        return (int) DB::table('article_categories')->insertGetId([
            'name' => $name,
            'slug' => $slug,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
};
