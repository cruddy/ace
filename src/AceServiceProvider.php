<?php

namespace Kalnoy\Cruddy\Ace;

use Illuminate\Support\ServiceProvider;
use Kalnoy\Cruddy\Assets;
use Kalnoy\Cruddy\Schema\Fields\Factory;

class AceServiceProvider extends ServiceProvider
{
    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->app->resolving('cruddy.fields', function (Factory $factory) {
            $factory->register('code', Code::class);
            $factory->register('markdown', Markdown::class);
        });

        $this->app->resolving('cruddy.assets', function (Assets $assets) {
            $this->registerAssets($assets, 'cruddy/ace');
        });
    }

    /**
     * Register assets.
     */
    protected function registerAssets(Assets $assets, $baseDir)
    {
        $assets->js(asset($baseDir.'/js/ace/ace.js'));
        $assets->js(asset($baseDir.'/js/app.min.js'));
        $assets->css(asset($baseDir.'/css/styles.min.css'));
    }

    /**
     * Bootstrap the application events.
     *
     * @return void
     */
    public function boot()
    {
        $this->publishes([ __DIR__.'/../config/config.php' => config_path('ace.php') ], 'config');

        $this->publishes([  __DIR__.'/../public' => public_path('cruddy/ace') ], 'public');
    }

}
