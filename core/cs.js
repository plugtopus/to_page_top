"use strict";

var app = {
    distance: 800,
    duration: 300,
    timer: null,
    element: null,
    init: function() {

        var self = this;

        this.element = document.createElement("div");
        this.element.classList.add('dd-sttbtn');
        if (this.checkPosition()) {
            this.element.classList.add('dd-sttbtn--visible');
        }

        chrome['storage']['local'].get('stt-pos', function(result) {
            self.element.setAttribute('data-stt-pos', result['stt-pos']);
        });

        document.body.appendChild(this.element);

        this.element.addEventListener('click', function() {
            this.scrollToTop(this.duration);
        }.bind(this), false);

        window.addEventListener('scroll', function() {
            clearTimeout(this.timer);
            this.timer = setTimeout(function() {
                if (this.checkPosition()) {
                    this.element.classList.add('dd-sttbtn--visible');
                } else {
                    this.element.classList.remove('dd-sttbtn--visible');
                }
            }.bind(this), 0);
        }.bind(this), false);

    },
    checkPosition: function() {
        var scrollElem = document.scrollingElement ? document.scrollingElement : document.body;
        return scrollElem.scrollTop > this.distance;
    },
    scrollToTop: function(scrollDuration) {
        var cosParameter = window.scrollY / 2,
            scrollCount = 0,
            oldTimestamp = performance.now();

        function step(newTimestamp) {
            scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
            if (scrollCount >= Math.PI)
                window.scrollTo(0, 0);
            if (window.scrollY === 0)
                return;
            window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
            oldTimestamp = newTimestamp;
            window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
    }
};

app.init();