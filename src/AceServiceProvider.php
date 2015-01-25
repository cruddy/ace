<?php

namespace Kalnoy\Cruddy\Ace;

use Illuminate\Support\ServiceProvider;
use Kalnoy\Cruddy\Assets;
use Kalnoy\Cruddy\Schema\Fields\Factory;

class AceServiceProvider extends ServiceProvider {

	/**
	 * Register the service provider.
	 *
	 * @return void
	 */
	public function register()
	{
		$this->app->resolving('cruddy.fields', function (Factory $factory)
        {
            $factory->register('code', 'Kalnoy\Cruddy\Ace\Code');
            $factory->register('markdown', 'Kalnoy\Cruddy\Ace\Markdown');
        });

        $this->app->resolving('cruddy.assets', function (Assets $assets)
        {
            $this->registerAssets($assets, 'packages/cruddy/ace');
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
        $this->app['config']->package('cruddy/ace', realpath(__DIR__.'/../config'), 'cruddy-ace');
    }

}