define([],
    function () {
        'use strict';

        var CLASS_VISIBLE = 'ng-show';
        var CLASS_HIDDEN = 'ng-hide';

        function toggleVisibility(el) {
            if (angular.element(el).hasClass(CLASS_VISIBLE)) {
                angular.element(el).removeClass(CLASS_VISIBLE);
                angular.element(el).addClass(CLASS_HIDDEN);
            } else if (angular.element(el).hasClass(CLASS_HIDDEN)) {
                angular.element(el).removeClass(CLASS_HIDDEN);
                angular.element(el).addClass(CLASS_VISIBLE);
            }
        }

        function show(el) {
            if (angular.element(el).hasClass(CLASS_HIDDEN)) {
                angular.element(el).removeClass(CLASS_HIDDEN);
                angular.element(el).addClass(CLASS_VISIBLE);
            }
        }

        function hide(el) {
            if (angular.element(el).hasClass(CLASS_VISIBLE)) {
                angular.element(el).removeClass(CLASS_VISIBLE);
                angular.element(el).addClass(CLASS_HIDDEN);
            }
        }

        function addToggleOnClickHandler(element, selectorForToggleLink, selectorForToggledContent) {
            element.querySelectorAll(selectorForToggleLink).on('click', function () { //event delegation not used for code simplicity, especially without jQuery, reconsider
                var elementsToToggle = element.querySelectorAll(selectorForToggledContent);
                [].forEach.call(elementsToToggle, function (e) {
                    toggleVisibility(e);
                });
            });
        }

        function addShowOnClickHandler(element, selectorForShowLink, selectorForContentToShow) {
            element.querySelectorAll(selectorForShowLink).on('click', function () { //event delegation not used for code simplicity, especially without jQuery, reconsider
                var elementsToShow = element.querySelectorAll(selectorForContentToShow);
                [].forEach.call(elementsToShow, function (e) {
                    show(e);
                });
            });
        }

        function addHideOnClickHandler(element, selectorForHideLink, selectorForContentToHide) {
            element.querySelectorAll(selectorForHideLink).on('click', function () { //event delegation not used for code simplicity, especially without jQuery, reconsider
                var elementsToHide = element.querySelectorAll(selectorForContentToHide);
                [].forEach.call(elementsToHide, function (e) {
                    hide(e);
                });
            });
        }

        return {
              addToggleOnClickHandler: addToggleOnClickHandler
            , addShowOnClickHandler: addShowOnClickHandler
            , addHideOnClickHandler: addHideOnClickHandler
        };
    });
