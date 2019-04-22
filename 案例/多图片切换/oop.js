function Fn(id) {
    this.oDiv = document.getElementById(id);
    this.imgs = this.oDiv.querySelectorAll('img');
    this.spans = this.oDiv.querySelector('span');
    this.ps = this.oDiv.querySelector('p');
    this.down = this.oDiv.querySelector('.down');
    this.back = this.oDiv.querySelector('.back');
}

Fn.prototype.events = function () {
    let num = 0;
    let that = this;
    this.down.onclick = function () {
        that.imgs[num].style.display = 'none';
        num < that.imgs.length - 1 ? num++ : num = 0;
        that.imgs[num].style.display = 'block';
        that.ps.innerHTML = `这是第${num + 1}张`;
        that.spans.innerHTML = `${num + 1}/${that.imgs.length}`;
        console.log(num);
    }
    this.back.onclick = function () {
        that.imgs[num].style.display = 'none';
        num > 0 ? num-- : num = that.imgs.length - 1;
        that.imgs[num].style.display = 'block';
        that.ps.innerHTML = `这是第${num + 1}张`;
        that.spans.innerHTML = `${num + 1}/${that.imgs.length}`;

    }
}
let g = new Fn('oDiv1');
g.events();;
let h = new Fn('oDiv2');
h.events();

pre.onclick = function () {

}
next.onclick = function () {

}
console.log(g.down)
