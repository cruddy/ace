class Cruddy.Fields.Code extends Cruddy.Fields.Base

    createEditableInput: (model) ->
        new Cruddy.Inputs.Code
            model: model
            key: @id
            height: @attributes.height
            mode: @attributes.mode
            theme: @attributes.theme
            wordwrap: @attributes.wordwrap

    format: (value) -> if value then "<div class=\"limit-height\">#{ value }</div>" else NOT_AVAILABLE