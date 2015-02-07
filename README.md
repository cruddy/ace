[ACE](http://http://ace.c9.io) editor support for [Cruddy](http://github.com/lazychaser/cruddy) with special markdown
editor.

## Installation

```
composer require cruddy/ace:~0.5.*@dev
```

Include a service provider:

```php
'Kalnoy\Cruddy\Ace\AceServiceProvider',
```

Publish assets and config files:

```
php artisan vendor:publish
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