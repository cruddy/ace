[ACE](http://http://ace.c9.io) editor support for [Cruddy](http://github.com/lazychaser/cruddy) with special markdown
editor.

## Installation

```
composer require cruddy/ace:~0.5.0
```

Include a service provider:

```php
'Kalnoy\Cruddy\Ace\AceServiceProvider',
```

Publish assets:

```
php artisan asset:publish cruddy/ace
```

Publish config:

```
php artisan config:publish cruddy/ace
```

## Usage

```php
$schema->code('description')->mode('html');
```

Setting the height of the editor:

```php
$schema->code('description')->height(300);
```

Toggling off wordwrap mode:

```php
$schema->code('description')->wordwrap(false);
```

Markdown editor:

```php
$schema->markdown('description');
```