// jest.setup.js
global.self = global
global.window = global
global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

// miragejs temporary bug fix, see here: https://github.com/miragejs/miragejs/issues/967
function FormDataMock() {
    this.append = function () {};
}
global.FormData = FormDataMock;