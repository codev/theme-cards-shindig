/*! lightgallery - v1.2.14 - 2016-01-18
* http://sachinchoolur.github.io/lightGallery/
* Copyright (c) 2016 Sachin N; Licensed Apache 2.0 */
(function($, window, document, undefined) {

    'use strict';

    var defaults = {
        hash: true
    };

    var Hash = function(element) {

        this.core = $(element).data('lightGallery');

        this.core.s = $.extend({}, defaults, this.core.s);

        if (this.core.s.hash) {
            this.oldHash = window.location.hash;
            this.init();
        }

        return this;
    };

    Hash.prototype.init = function() {
        var _this = this;
        var _hash;

        // Change hash value on after each slide transition
        _this.core.$el.on('onAfterSlide.lg.tm', function(event, prevIndex, index) {
            // Use replaceState so browsing slides updates the URL without piling up
            // history entries (which otherwise force many Back clicks to leave the page).
            if (history.replaceState) {
                history.replaceState(null, '', window.location.pathname + window.location.search + '#lg=' + _this.core.s.galleryId + '&slide=' + index);
            } else {
                window.location.hash = 'lg=' + _this.core.s.galleryId + '&slide=' + index;
            }
        });

        // Listen hash change and change the slide according to slide value
        $(window).on('hashchange', function() {
            _hash = window.location.hash;
            var _idx = parseInt(_hash.split('&slide=')[1], 10);

            // it galleryId doesn't exist in the url close the gallery
            if ((_hash.indexOf('lg=' + _this.core.s.galleryId) > -1)) {
                _this.core.slide(_idx);
            } else if (_this.core.lGalleryOn) {
                _this.core.destroy();
            }

        });
    };

    Hash.prototype.destroy = function() {

        // Reset to old hash value
        if (history.replaceState) {
            // Replace (not push) so closing the gallery leaves no extra history entry.
            if (this.oldHash && this.oldHash.indexOf('lg=' + this.core.s.galleryId) < 0) {
                history.replaceState(null, '', window.location.pathname + window.location.search + this.oldHash);
            } else {
                history.replaceState(null, '', window.location.pathname + window.location.search);
            }
        } else {
            if (this.oldHash && this.oldHash.indexOf('lg=' + this.core.s.galleryId) < 0) {
                window.location.hash = this.oldHash;
            } else {
                window.location.hash = '';
            }
        }

    };

    $.fn.lightGallery.modules.hash = Hash;

})(jQuery, window, document);
