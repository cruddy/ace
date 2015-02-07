<?php

namespace Kalnoy\Cruddy\Ace;

use Kalnoy\Cruddy\Schema\Fields\BaseField;

/**
 * Code editor based on {@link http://http://ace.c9.io/ ACE}.
 *
 * @method $this height(int $value)
 * @method $this theme(string $value)
 * @method $this mode(string $value)
 * @method $this wordwrap(bool $value)
 * @property int $height
 * @property string $theme
 * @property string $mode
 * @property bool $wordwrap
 *
 * @since 1.0.0
 */
class Code extends BaseField {

    /**
     * {@inheritdoc}
     */
    protected $class = 'Cruddy.Fields.Code';

    /**
     * {@inheritdoc}
     */
    protected $type = 'code';

    /**
     * {@inheritdoc}
     */
    public function process($value)
    {
        $value = trim($value);

        return $value === '' ? null : $value;
    }

    /**
     * {@inheritdoc}
     */
    public function toArray()
    {
        return [
            'height' => $this->get('height', config('ace.height', 250)),
            'theme' => $this->get('theme', config('ace.theme', 'chrome')),
            'mode' => $this->get('mode'),
            'wordwrap' => $this->get('wordwrap', config('ace.wordwrap', true)),

        ] + parent::toArray();
    }

}