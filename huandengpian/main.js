(function () {
    var Dwarp = document.querySelector('#warp');
    var Dcss = document.querySelector('#cssStyle');
    var W = 400;
    var H = 180;
    var num = 16;//分16列(只能是偶数)
    var w = W / num;
    //初始化html
    var html = '', css = '';
    for (var i = 0; i < num; i++) {
        html += `
            <li style="
            z-index:${(i <= num / 2 ) ? i : (num - i)};">
            <a style="background-position:${-i * w}px 0;"></a>
            <a style="background-position:${-i * w}px 0;"></a>
            <a style="background-position:${-i * w}px 0;"></a>
            <a style="background-position:${-i * w}px 0;"></a>
            <span></span><span></span>
            </li>
            `;
    }
    //幻灯片整体尺寸
    css += `
        /*幻灯片的整体尺寸*/
        #warp{width:${W}px;height:${H}px;}
        /*li的尺寸*/
        #warp li{width:${w}px;height:100%;transform-origin: center center -${H / 2}px}
        /*a设置*/
        #warp a{background-size:${W}px ${H}px;}
        #warp a:nth-of-type(4){transform:translateZ(-${H}px) rotateX(180deg);}
        #warp a:nth-of-type(3){transform-origin:bottom;transform: rotateX(90deg);top:-${H}px}
        #warp a:nth-of-type(2){transform-origin:top;transform: rotateX(-90deg);top:${H}px}
        /*span设置*/
        #warp span{width:${H}px;height:${H}px;transform-origin:left;transform: rotateY(90deg);}
        #warp span:nth-of-type(2){left:${w}px;}
        `;

    Dcss.innerHTML += css;
    Dwarp.innerHTML = html;


    /*翻页*/
    var Dli = Dwarp.querySelectorAll('li');
    var pageBtns = document.querySelectorAll('.pager');
    var deg = 0, page = 1;

    document.querySelector('#next').addEventListener('click', function () {
        deg += 90;
        page = page < 4 ? page + 1 : 1;
        anim('next');
    });
    document.querySelector('#pre').addEventListener('click', function () {
        deg -= 90;
        page = page > 1 ? page - 1 : 4;
        anim('pre');
    });
    document.querySelector('#btns').addEventListener('click', function (e) {
        if (e.target.classList.contains('pager') && !e.target.classList.contains('active')) {
            var next = parseInt(e.target.innerHTML);
            deg += (next - page) * 90;
            if (page > next) {
                page = next;
                anim('pre');
            } else {
                page = next;
                anim('next');
            }
        }
    });
    function anim(to) {
        [].forEach.call(Dli, function (e, i) {
            if (to == 'pre') {
                e.style.transitionDelay = (num - i) * 0.04 + 's';
            } else if (to == 'next') {
                e.style.transitionDelay = i * 0.04 + 's';
            }
            e.style.transform = 'rotateX(' + deg + 'deg)';
        });
        // 更新标签
        document.querySelector('.pager.active').classList.remove('active');
        pageBtns[page - 1].classList.add('active');
    }
})();