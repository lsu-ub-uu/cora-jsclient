/*
 * Copyright 2019 Uppsala University Library
 *
 * This file is part of Cora.
 *
 *     Cora is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     Cora is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with Cora.  If not, see <http://www.gnu.org/licenses/>.
 */
var CORA = (function (cora) {
    "use strict";
    cora.box = function (view) {
        let boxView = view;
        let box = {};

        box.clearHideTimeout = function () {
            if (box.hideIfTransitionendNotCalled) {
                window.clearTimeout(box.hideIfTransitionendNotCalled);
            }
        };

        box.hide = function () {
            box.clearHideTimeout();
            boxView.className = boxView.className + " hidden";
        };

        box.hideWithEffect = function () {
            box.hideIfTransitionendNotCalled = window.setTimeout(function () {
                boxView.modelObject.hide();
            }, 1000);
            boxView.addEventListener("transitionend", function () {
                boxView.modelObject.hide();
            }, true);
            boxView.className = boxView.className + " toBeRemoved";
        };

        box.getView = function () {
            return boxView;
        };

        return box;

    };

    return cora;
}(CORA));