(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Cruddy.Inputs.Code = (function(_super) {
    __extends(Code, _super);

    function Code() {
      return Code.__super__.constructor.apply(this, arguments);
    }

    Code.prototype.initialize = function(options) {
      var session, _ref;
      this.$el.height(((_ref = options.height) != null ? _ref : 100) + "px");
      this.editor = ace.edit(this.el);
      if (options.theme) {
        this.editor.setTheme("ace/theme/" + options.theme);
      }
      session = this.editor.getSession();
      if (options.mode) {
        session.setMode("ace/mode/" + options.mode);
      }
      if (options.wordwrap) {
        session.setUseWrapMode(true);
      }
      session.setWrapLimitRange(null, null);
      return Code.__super__.initialize.apply(this, arguments);
    };

    Code.prototype.applyChanges = function(value, external) {
      if (external) {
        this.editor.setValue(value);
        this.editor.getSession().getSelection().clearSelection();
      }
      return this;
    };

    Code.prototype.render = function() {
      this.editor.on("blur", (function(_this) {
        return function() {
          return _this.model.set(_this.key, _this.editor.getValue(), {
            input: _this
          });
        };
      })(this));
      return Code.__super__.render.apply(this, arguments);
    };

    Code.prototype.remove = function() {
      var _ref;
      if ((_ref = this.editor) != null) {
        _ref.destroy();
      }
      this.editor = null;
      return Code.__super__.remove.apply(this, arguments);
    };

    Code.prototype.focus = function() {
      var _ref;
      if ((_ref = this.editor) != null) {
        _ref.focus();
      }
      return this;
    };

    return Code;

  })(Cruddy.Inputs.Base);

  Cruddy.Inputs.Markdown = (function(_super) {
    __extends(Markdown, _super);

    function Markdown() {
      return Markdown.__super__.constructor.apply(this, arguments);
    }

    Markdown.prototype.events = {
      "show.bs.tab [data-toggle=tab]": "showTab",
      "shown.bs.tab [data-toggle=tab]": "shownTab"
    };

    Markdown.prototype.initialize = function(options) {
      var _ref;
      this.height = (_ref = options.height) != null ? _ref : 200;
      this.editorInput = new Cruddy.Inputs.Code({
        model: this.model,
        key: this.key,
        theme: options.theme,
        mode: "markdown",
        height: this.height
      });
      return Markdown.__super__.initialize.apply(this, arguments);
    };

    Markdown.prototype.showTab = function(e) {
      if ($(e.target).data("tab") === "preview") {
        this.renderPreview();
      }
      return this;
    };

    Markdown.prototype.shownTab = function(e) {
      if ($(e.traget).data("tab") === "editor") {
        return this.editorInput.focus();
      }
    };

    Markdown.prototype.render = function() {
      this.$el.html(this.template());
      this.$(".tab-pane-editor").append(this.editorInput.render().el);
      this.preview = this.$(".tab-pane-preview");
      return this;
    };

    Markdown.prototype.renderPreview = function() {
      this.preview.html(marked(this.getValue()));
      return this;
    };

    Markdown.prototype.template = function() {
      return "<div class=\"markdown-editor\">\n    <a href=\"https://help.github.com/articles/github-flavored-markdown\" target=\"_blank\" class=\"hint\">GitHub flavored markdown</a>\n\n    <ul class=\"nav nav-tabs\">\n        <li class=\"active\"><a href=\"#" + this.cid + "-editor\" data-toggle=\"tab\" data-tab=\"editor\" tab-index=\"-1\">" + Cruddy.lang.markdown_source + "</a></li>\n        <li><a href=\"#" + this.cid + "-preview\" data-toggle=\"tab\" data-tab=\"preview\" tab-index=\"-1\">" + Cruddy.lang.markdown_parsed + "</a></li>\n    </ul>\n\n    <div class=\"tab-content\">\n        <div class=\"tab-pane-editor tab-pane active\" id=\"" + this.cid + "-editor\"></div>\n        <div class=\"tab-pane-preview tab-pane\" id=\"" + this.cid + "-preview\" style=\"height:" + this.height + "px\"></div>\n    </div>\n</div>";
    };

    Markdown.prototype.focus = function() {
      var tab;
      tab = this.$("[data-tab=editor]");
      if (tab.hasClass("active")) {
        this.editorInput.focus();
      } else {
        tab.tab("show");
      }
      return this;
    };

    return Markdown;

  })(Cruddy.Inputs.Base);

  Cruddy.Fields.Code = (function(_super) {
    __extends(Code, _super);

    function Code() {
      return Code.__super__.constructor.apply(this, arguments);
    }

    Code.prototype.createEditableInput = function(model) {
      return new Cruddy.Inputs.Code({
        model: model,
        key: this.id,
        height: this.attributes.height,
        mode: this.attributes.mode,
        theme: this.attributes.theme,
        wordwrap: this.attributes.wordwrap
      });
    };

    Code.prototype.format = function(value) {
      if (value) {
        return "<div class=\"limit-height\">" + value + "</div>";
      } else {
        return NOT_AVAILABLE;
      }
    };

    Code.prototype.getType = function() {
      return "code";
    };

    return Code;

  })(Cruddy.Fields.Base);

  Cruddy.Fields.Markdown = (function(_super) {
    __extends(Markdown, _super);

    function Markdown() {
      return Markdown.__super__.constructor.apply(this, arguments);
    }

    Markdown.prototype.createEditableInput = function(model) {
      return new Cruddy.Inputs.Markdown({
        model: model,
        key: this.id,
        height: this.attributes.height,
        theme: this.attributes.theme
      });
    };

    Markdown.prototype.format = function(value) {
      if (value) {
        return "<div class=\"well limit-height\">" + (marked(value)) + "</div>";
      } else {
        return NOT_AVAILABLE;
      }
    };

    Markdown.prototype.getType = function() {
      return "markdown";
    };

    return Markdown;

  })(Cruddy.Fields.Base);

}).call(this);

//# sourceMappingURL=app.js.map
