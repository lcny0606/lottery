$(function () {
    $('#marquee6').marquee({
        yScroll: "bottom",
        loop: -1,
        scrollSpeed: 20,
        fxEasingShow: "swing",
        pauseSpeed: 5000,
    })

    $(window).keypress(function (event) {
        if (event.keyCode == 32) {
            $popupdisplay = $('.popup').css('display');
            if ($popupdisplay == 'none') {
                (function ($) {
                    $.getUrlParam = function (name) {
                        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                        var r = window.location.search.substr(1).match(reg);
                        if (r != null) return unescape(r[2]);
                        return null;
                    }
                })(jQuery);

                function getUrlParam(name) {
                    //构造一个含有目标参数的正则表达式对象  
                    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                    //匹配目标参数  
                    var r = window.location.search.substr(1).match(reg);
                    //返回参数值  
                    if (r != null) return unescape(r[2]);
                    return null;
                }
                var prizeid = $.getUrlParam('id');
                var popup_img = $('.popup_img');
                var popup = $('.popup');
                clearTimeout(lottery.timer);
                $.ajax({
                    type: 'post',
                    url: './index/rand',
                    data: {
                        'end': '1',
                        'id': prizeid
                    },
                    success: function (res) {
                        var alertimg = '<img src="http://127.0.0.1/lotteryplatform/Public/images/member/' + res['pic'] + '">';
                        var popup_name = res['name'];
                        //弹出层
                        function lucker() {
                            popup_img.html(alertimg);
                            $('.popup_name').html(popup_name);
                            $('.popup h4').neonText();
                            $('.lucky').css({
                                'filter': 'blur(4px)'
                            });

                            popup.hDialog({
                                autoShow: true,
                                width: '380px',
                                height: '620px',
                                effect: 'rollOut',
                                closeBg: '#FF0040',
                                modalBg: 'url(http://127.0.0.1/lotteryplatform/Public/images/bg.png)',
                                afterHide: function () {
                                    location.reload()
                                }
                            });
                        }
                        setTimeout(lucker, 50)
                    }
                })
            } else {
                location.reload()
            }
        } else {}
    })
    var lottery = {
        index: -1, //当前转动到哪个位置，起点位置
        count: 0, //总共有多少个位置
        timer: 0, //setTimeout的ID，用clearTimeout清除
        speed: 20, //初始转动速度
        times: 1, //转动次数
        cycle: 9999, //转动基本次数：即至少需要转动多少次再进入抽奖环节
        prize: -1, //中奖位置
        init: function (id) {
            if ($("#" + id).find(".lottery-unit").length > 0) {
                $lottery = $("#" + id);
                $units = $lottery.find(".lottery-unit");
                this.obj = $lottery;
                this.count = $units.length;
                $lottery.find(".lottery-unit-" + this.index).addClass("active");
            };
        },
        roll: function () {
            var index = this.index;
            var count = this.count;
            var lottery = this.obj;
            $(lottery).find(".lottery-unit-" + index).removeClass("active");
            index += 1;
            if (index > count - 1) {
                index = 0;
            };
            $(lottery).find(".lottery-unit-" + index).addClass("active");
            this.index = index;
            return false;
        },
        stop: function (index) {
            this.prize = index;
            return false;
        }
    };


    function roll() {
        lottery.times += 1;
        lottery.roll(); //转动过程调用的是lottery的roll方法，这里是第一次调用初始化
        if (lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
            clearTimeout(lottery.timer);
            lottery.prize = -1;
            lottery.times = 0;
            click = false;
            var last_squ = lottery.index;

        } else {
            if (lottery.times < lottery.cycle) {
                lottery.speed -= 10;
            } else if (lottery.times == lottery.cycle) {
                var index = Math.random() * (lottery.count) | 0; //中奖物品通过一个随机数生成
                lottery.prize = index;
            } else {
                if (lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize ==
                        lottery.index + 1)) {
                    lottery.speed += 110;
                } else {
                    lottery.speed += 20;
                }
            }
            if (lottery.speed < 40) {
                lottery.speed = 40;
            };
            // console.log(lottery.times + '^^^^^^' + lottery.speed + '^^^^^^^' + lottery.prize);
            lottery.timer = setTimeout(roll, lottery.speed); //循环调用
        }
    }

    var click = false;

    window.onload = function () {
        lottery.init('lottery');
        $("#lottery .start").click(function () {
            $.ajax({
                type: 'get',
                url: './index/member',
                data: {
                    'star': '1'
                },
                success: function (res) {
                    var unit = $('.lottery-unit');
                    var luckyimg = new Array();
                    var maxid = res[res.length - 1]['id'];
                    var randpic;

                    function changepic() {
                        var randid = Math.floor(Math.random() * (maxid - 8));
                        for (var j = 0; j < unit.length; j++) {
                            luckyimg[j] = new Array();
                            randpic = randid + j;
                            luckyimg[j] = $('.lottery-unit-' + j + ' img')[0];
                            $(luckyimg[j]).attr('src', 'http://127.0.0.1/lotteryplatform/Public/images/member/' + res[randpic]['pic'])
                        }
                    }
                    time_change = setInterval(changepic, 200);
                }
            })
            if (click) { //click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
                return false;
            } else {
                lottery.speed = 100;
                roll(); //转圈过程不响应click事件，会将click置为false
                click = true;
                //一次抽奖完成后，设置click为true，可继续抽奖
                return false;
            }
        });

        (function ($) {
            $.getUrlParam = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            }
        })(jQuery);

        function getUrlParam(name) {
            //构造一个含有目标参数的正则表达式对象  
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            //匹配目标参数  
            var r = window.location.search.substr(1).match(reg);
            //返回参数值  
            if (r != null) return unescape(r[2]);
            return null;
        }
        var prizeid = $.getUrlParam('id');
        var prizeLi = $('.pic_' + prizeid).parents('li');
        $(prizeLi).addClass('active');
        $('.pic_' + prizeid).siblings('.collapsible-body').css({
            'display': 'block'
        })
        //pic_ click 跳转
        $('.pic_3').click(function () {
            window.location.href = 'http://127.0.0.1/lotteryplatform/index.php/index?id=3'
        });
        $('.pic_2').click(function () {
            window.location.href = 'http://127.0.0.1/lotteryplatform/index.php/index?id=2'
        });
        $('.pic_1').click(function () {
            window.location.href = 'http://127.0.0.1/lotteryplatform/index.php/index?id=1'
        })
        $('.pic_4').click(function () {
            window.location.href = 'http://127.0.0.1/lotteryplatform/index.php/index?id=4'
        })


    };
})