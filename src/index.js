
"use strict";

function makeSlug(str) {
    if (!str) {
        return str;
    }
    if ('normalize' in String) {
        str = str.normalize('NFKD').replace(/[\u0300-\u036F]/g, "");
    }
    str = str.toLowerCase().replace(/\s+/g, '-');
    str = str.replace(/[^A-Za-z0-9-]+/g, '-');
    str = str.replace(/-{2,}/g, '-');
    str = str.replace(/^-/, '');
    str = str.replace(/-$/, '');
    return str;
};

export default angular.module('monad.slug', ['monad-cms'])
    .directive('monadSlug', () => ({
        restrict: 'A',
        require: 'ngModel',
        scope: {source: '=monadSlug', target: '=ngModel'},
        link: (scope, elem, attrs, ctrl) => {
            elem.attr('pattern', "[a-z0-9-]{1,255}");
            if (attrs.monadSlug.length) {
                scope.$watch('source', (newvalue, oldvalue) => scope.target = makeSlug(newvalue));
            }
            ctrl.$parsers.unshift(value => makeSlug(value));
            ctrl.$formatters.unshift(value => {
                ctrl.$setValidity('monadSlug', true);
                return makeSlug(value);
            });
            elem.bind('keyup', () => scope.target = makeSlug(elem.val()));
            elem.bind('blur change', () => {
                scope.target = makeSlug(elem.val());
                elem.val(scope.target);
            });
        }
    }))
    .name;

