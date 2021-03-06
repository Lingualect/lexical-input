(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.lexicalInput = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var nextID = 0;

    function generateID() {
        return 'lexical-input-' + nextID++;
    }

    var LexicalInput = function (_HTMLElement) {
        _inherits(LexicalInput, _HTMLElement);

        function LexicalInput() {
            _classCallCheck(this, LexicalInput);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(LexicalInput).apply(this, arguments));
        }

        _createClass(LexicalInput, [{
            key: 'createdCallback',
            value: function createdCallback() {
                this.render();
            }
        }, {
            key: 'attachedCallback',
            value: function attachedCallback() {
                var input = this.querySelector('input');
                if (input) {
                    input.addEventListener('focus', event => {
                        var label = this.querySelector('label');
                        if (label) {
                            this.setAttribute('focused', 'focused');
                            label.classList.add('offset');
                        }
                    }, false);
                    input.addEventListener('blur', event => {
                        this.removeAttribute('focused');
                        var input = this.querySelector('input');
                        var label = this.querySelector('label');
                        if (input && label && !input.value) {
                            label.classList.remove('offset');
                        }
                    });
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var list = Array.prototype.slice.call(this.attributes);
                var hash = list.reduce(function (hash, item) {
                    hash[item.name] = item.value;
                    return hash;
                }, {});
                this.innerHTML = this.template(hash);
            }
        }, {
            key: 'template',
            value: function template(data) {
                data = data || {};
                var id = data.id || generateID();
                return '\n            <div class="content">\n                <input id="' + id + '__input" type="text" />\n                ' + (data.label ? '<label for="' + id + '__input">' + data.label + '</label>' : '') + '\n            </div>\n            <div class="underline">\n                <div class="focused"></div>\n            </div>\n        ';
            }
        }]);

        return LexicalInput;
    }(HTMLElement);

    exports.default = LexicalInput;


    document.registerElement('lexical-input', LexicalInput);
});