window.onload = function () {
    const offset = document.querySelector('#Menu').offsetHeight;
    let sections = {};
    document.querySelectorAll('section').forEach(e => {
        sections[e.id] = {
            top: e.offsetTop,
            bottom: e.offsetTop + e.offsetHeight
        };
    });
    let scrollSpy = () => {
        // let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop; // 因平台不同有不同解讀方法
        const
            startY = document.scrollingElement.scrollTop, // 新語法可跨平台
            viewTop = startY + offset; //原滾動處下修至選單高度之偏移
        for (const key in sections) {
            if (sections[key].top <= viewTop && viewTop <= sections[key].bottom) {
                let turnOff = document.querySelector(`#Menu a.active:not([href="#${key}"])`);
                if (turnOff) turnOff.classList.remove('active'); //如果存在持有.active但不是持有href=key的人，取消他的active
                let turnOn = document.querySelector(`#Menu a[href="#${key}"]:not(.active)`);
                if (turnOn) turnOn.classList.add('active'); //如果存在未持有.active但持有href=key的人，增加他的active
            }
        };
    };

    let indexShown = () => {
        const
            viewWidth = document.scrollingElement.offsetWidth,
            indexBottom = document.querySelector('#Slider').offsetHeight,
            targetMenu = document.querySelector('#Menu'),
            targetArrow = document.querySelector('#Arrow'),
            startY = document.scrollingElement.scrollTop; // 新語法可跨平台

        if (viewWidth >= 992) { //屬於大螢幕時才會做判斷
            if (startY < indexBottom - offset) { //於slider內
                targetMenu.classList.remove('bg-dark');
                targetArrow.classList.remove('shown');
            } else {
                targetMenu.classList.add('bg-dark');
                targetArrow.classList.add('shown');
            }
        } else targetMenu.classList.add('bg-dark');
    }

    window.onscroll = () => {
        scrollSpy();
        indexShown();
    };
    window.onresize = () => { //當有人對window重新調整尺寸時
        indexShown();
    }
    scrollSpy();
    indexShown();

    // scroll to id  => idea by https://gist.github.com/andjosh/6764939
    document.querySelectorAll("#Menu a,#Arrow a").forEach(e => {
        e.onclick = function (event) {
            event.preventDefault();
            const targetID = e.getAttribute("href");

            scrollToId(document.querySelector(targetID).offsetTop - offset + 1, 1500);
        };
    });

    function scrollToId(toY, duration) {
        const
            startNode = document.scrollingElement, // 新語法可跨平台
            startY = startNode.scrollTop,
            changeY = toY - startNode.scrollTop,
            startTime = +new Date();

        Math.easeInOutQuad = function (t, b, c, d) {
            // t = current time
            // b = start value
            // c = change in value
            // d = duration
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        let animateScroll = function () {
            console.log(1);
            const currentTime = +new Date() - startTime;
            let val = Math.easeInOutQuad(currentTime, startY, changeY, duration);
            startNode.scrollTop = val;
            if (currentTime < duration) requestAnimationFrame(animateScroll); //frame pre 60/s => 100ms
        };
        animateScroll();
    }

    // -------------------------------------------------------------------------------

    // dots is an array of Dot objects,
    // mouse is an object used to track the X and Y position
    // of the mouse, set with a mousemove event listener below
    var dots = [],
        mouse = {
            x: 0,
            y: 0
        };

    // The Dot object used to scaffold the dots
    var Dot = function () {
        this.x = 0;
        this.y = 0;
        this.node = (function () {
            var n = document.createElement("div");
            n.className = "trail";
            document.body.appendChild(n);
            return n;
        }());
    };
    // The Dot.prototype.draw() method sets the position of 
    // the object's <div> node
    Dot.prototype.draw = function () {
        this.node.style.left = this.x + "px";
        this.node.style.top = this.y + "px";
    };

    // Creates the Dot objects, populates the dots array
    for (var i = 0; i < 20; i++) {
        var d = new Dot();
        dots.push(d);
    }

    // This is the screen redraw function
    function draw() {
        // Make sure the mouse position is set everytime
        // draw() is called.
        var x = mouse.x,
            y = mouse.y;

        // This loop is where all the 90s magic happens
        dots.forEach(function (dot, index, dots) {
            var nextDot = dots[index + 1] || dots[0];

            dot.x = x;
            dot.y = y;
            dot.draw();
            x += (nextDot.x - dot.x) * .6;
            y += (nextDot.y - dot.y) * .6;

        });
    }

    addEventListener("mousemove", function (event) {
        //event.preventDefault();
        mouse.x = event.pageX;
        mouse.y = event.pageY;
    });

    // animate() calls draw() then recursively calls itself
    // everytime the screen repaints via requestAnimationFrame().
    function animate() {
        draw();
        requestAnimationFrame(animate);
    }

    // And get it started by calling animate().
    animate();
    






};
// -----------------------------------

