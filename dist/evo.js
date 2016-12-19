(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Evo = factory());
}(this, (function () { 'use strict';

function Evo(options){
    this._init(options);
}

Evo.prototype._init = function(options){
    
};

return Evo;

})));
