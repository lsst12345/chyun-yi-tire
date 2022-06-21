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
};

function getPos(ev){
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    return {x:ev.clientX+scrollLeft,y:ev.clientY+scrollTop}
}
document.onmousemove = function(ev){
    var oDiv = document.getElementsByClassName('cube')
    var oEvent = ev||event;
    var pos = getPos(oEvent)
    //後面的div跟這前面的div走
    for(var i = oDiv.length-1; i>0;i--){
        oDiv[i].style.left = oDiv[i-1].offsetLeft+'px';
        oDiv[i].style.top = oDiv[i-1].offsetTop+'px';
    }
    //第一個div跟著滑鼠走
    oDiv[0].style.left = pos.x+'px';
    oDiv[0].style.top = pos.y+'px';

}