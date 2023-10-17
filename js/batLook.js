// //bat
var move = false;
var clickTimes = 0;
let item;
let followMove;
var ex, ey, vs, vy, deg, count, angle;
window.addEventListener('mousemove', function reoffset(e) {
    item = document.getElementById("follow");
    if (!move) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const sqrX = item.offsetLeft;
        const sqrY = item.offsetTop;
        const diffX = mouseX - sqrX;
        const diffY = mouseY - sqrY;
        const radians = Math.atan2(diffY, diffX);
        angle = radians * 180 / Math.PI;
        item.style.transform = `rotate(${angle}deg)`;
    }
    if (move) {
        ex = e.pageX - item.offsetLeft - item.clientWidth / 2;
        ey = e.pageY - item.offsetTop - item.clientHeight / 2;
        deg = 360 * Math.atan(ey / ex) / (2 * Math.PI);
        if (ex < 0) {
            deg += 180;
        }
        count = 0;

        function draw() {
            if (move) {
                if (count < 2000) {
                    item.style.transform = 'rotate(' + deg + 'deg)';
                    vx += ex / 2000;
                    vy += ey / 2000;
                }
                item.style.left = vx + "px";
                item.style.top = vy + "px";
                count++;
            }
        }
        followMove = window.setInterval(draw, 70);
    }
    item.onclick = function() {
        clickTimes++;
        if (!move && clickTimes == 1) {
            move = true;
            deg = angle;
            ex = 0;
            ey = 0;
            count = 0;
            vx = item.offsetLeft;
            vy = item.offsetTop;
        } else if (move && clickTimes > 1) {
            move = false;
            clickTimes = 0;
            window.clearInterval(followMove);
        }
    }
})