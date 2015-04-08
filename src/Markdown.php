<?php

namespace Kalnoy\Cruddy\Ace;

/**
 * Markdown editor.
 *
 * @since 1.0.0
 */
class Markdown extends Code {

    /**
     * @return string
     */
    protected function modelClass()
    {
        return 'Cruddy.Fields.Markdown';
    }

}