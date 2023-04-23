var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { footprints } from './footprints';
import { parameters } from './parameters';
import { options } from './options';
export var getBaselineAmount = function (domain, item) { return (__assign({}, footprints['baseline_' + domain + '_' + item + '_amount'])); };
export var getBaselineIntensity = function (domain, item) { return (__assign({}, footprints['baseline_' + domain + '_' + item + '_intensity'])); };
export var getParameter = function (category, key) { return (__assign({}, parameters[category + '_' + key])); };
export var getOption = function (domain, item, type) { return (__assign({}, options[domain + '_' + item + '_' + type])); };
