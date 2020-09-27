document.addEventListener('DOMContentLoaded', function () {
    const main = new Main();

    // main.destroy();
});

class Main {
    constructor() {
         this.header = document.querySelector('.header');
         this.sides = document.querySelectorAll('.side');
         this._observers = [];
         this._init();
    }

    set observers(val) {
        this._observers.push(val);
    }

    get observers() {
        return this._observers;
    }
        

    _init() {
        new MobileMenu();
        this.hero = new HeroSlider('.swiper-container');
        // Pace.on('done', this._paceDone.bind(this)); //loadが完了したのちに処理
        this._scrollInit();      
    }

    // _paceDone() {
    //     this._scrollInit();
    // }

    _textAnimation(el, inview) {
        if(inview) {
            const ta = new TweenTextAnimation(el);
            ta.animate();
        }
    }
    
    _inviewAnimation(el, inview) {
        if(inview) { // 画面内に入った場合
            el.classList.add('inview');
        } else {
            el.classList.remove('inview');
        }
    }

    _navAnimation(el, inview) { //プライベートメソッド
        if(inview) { // 画面内に入った場合
            this.header.classList.remove('triggered');
        } else {
            this.header.classList.add('triggered');
        }
    }

    _sideAnimation(el, inview) { //プライベートメソッド
        if(inview) { // 画面内に入った場合
            this.sides.forEach(side => side.classList.add('inview'));
        } else {
            this.sides.forEach(side => side.classList.remove('inview'));
        }
    }

    _togglSlideAnimation(el, inview) { //画面内のみ動作
        if(inview) { // 画面内に入った場合
            this.hero.start();
        } else {
            this.hero.stop();
        }
    }

    _destroyObservers(){
        this.observers.forEach(ob => {
            ob.destroy();
        });
    }

    destroy() {
        this._destroyObservers();
    }

    _scrollInit() {
        //インスタンス化されたオブジェクトをまとめる
        this.observers = new ScrollObserver('.nav-trigger', this._navAnimation.bind(this), {once: false});//seterで格納
        
        this.observers = new ScrollObserver('.cover-slide', this._inviewAnimation);
        
        this.observers = new ScrollObserver('.tween-animate-title', this._textAnimation, {rootMargin: "-200px 0px"});   
        
        this.observers = new ScrollObserver('.swiper-container', this._togglSlideAnimation.bind(this), {once: false});

        this.observers = new ScrollObserver('.appear', this._inviewAnimation);
        
        this.observers = new ScrollObserver('#main-content', this._sideAnimation.bind(this), {once: false, rootMargin: "-300px 0px"});
        
        console.log(this.observers); //geterで取得
        
    }

}