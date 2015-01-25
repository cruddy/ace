class Cruddy.Inputs.Code extends Cruddy.Inputs.Base
    initialize: (options) ->
        @$el.height (options.height ? 100) + "px"

        @editor = ace.edit @el

        @editor.setTheme "ace/theme/#{ options.theme }" if options.theme

        session = @editor.getSession()

        session.setMode "ace/mode/#{ options.mode }" if options.mode
        session.setUseWrapMode true if options.wordwrap
        session.setWrapLimitRange null, null

        super

    applyChanges: (value, external) ->
        if external
            @editor.setValue value
            @editor.getSession().getSelection().clearSelection()

        this

    render: ->
        @editor.on "blur", => @model.set @key, @editor.getValue(), input: @

        super

    remove: ->
        @editor?.destroy()
        @editor = null

        super

    focus: ->
        @editor?.focus()

        this
class Cruddy.Inputs.Markdown extends Cruddy.Inputs.Base

    events:
        "show.bs.tab [data-toggle=tab]": "showTab"
        "shown.bs.tab [data-toggle=tab]": "shownTab"

    initialize: (options) ->
        @height = options.height ? 200

        @editorInput = new Cruddy.Inputs.Code
            model: @model
            key: @key
            theme: options.theme
            mode: "markdown"
            height: @height

        super

    showTab: (e) ->
        @renderPreview() if $(e.target).data("tab") is "preview"

        this

    shownTab: (e) ->
        @editorInput.focus() if $(e.traget).data("tab") is "editor"

    render: ->
        @$el.html @template()

        @$(".tab-pane-editor").append @editorInput.render().el

        @preview = @$ ".tab-pane-preview"

        this

    renderPreview: ->
        @preview.html marked @getValue()

        this

    template: ->
        """
        <div class="markdown-editor">
            <a href="https://help.github.com/articles/github-flavored-markdown" target="_blank" class="hint">GitHub flavored markdown</a>

            <ul class="nav nav-tabs">
                <li class="active"><a href="##{ @cid }-editor" data-toggle="tab" data-tab="editor" tab-index="-1">#{ Cruddy.lang.markdown_source }</a></li>
                <li><a href="##{ @cid }-preview" data-toggle="tab" data-tab="preview" tab-index="-1">#{ Cruddy.lang.markdown_parsed }</a></li>
            </ul>

            <div class="tab-content">
                <div class="tab-pane-editor tab-pane active" id="#{ @cid }-editor"></div>
                <div class="tab-pane-preview tab-pane" id="#{ @cid }-preview" style="height:#{ @height }px"></div>
            </div>
        </div>
        """

    focus: ->
        tab = @$ "[data-tab=editor]"
        if tab.hasClass "active" then @editorInput.focus() else tab.tab "show"

        this
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
class Cruddy.Fields.Markdown extends Cruddy.Fields.Base

    createEditableInput: (model) -> new Cruddy.Inputs.Markdown
        model: model
        key: @id
        height: @attributes.height
        theme: @attributes.theme

    format: (value) -> if value then "<div class=\"well limit-height\">#{ marked value }</div>" else NOT_AVAILABLE