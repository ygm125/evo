(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Evo = factory());
}(this, (function () { 'use strict';

function Evo(options){
    this.init(options);
}

Evo.prototype.init = function(options){
    
};

return Evo;

})));
