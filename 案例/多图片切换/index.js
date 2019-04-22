function Fn(id) {
    this.oDiv = document.getElementById(id);
    this.imgs = this.oDiv.querySelectorAll('img');
    this.spans = this.oDiv.querySelector('span');
    this.ps = this.oDiv.querySelector('p');
    this.down = this.oDiv.querySelector('.down');
    this.back = this.oDiv.querySelector('.back');
    this.num = 0;
}
Fn.prototype.f1 = function () {
    this.imgs[this.num].style.display = 'none';
    this.num < this.imgs.length - 1 ? this.num++ : this.num = 0;
    this.imgs[this.num].style.display = 'block';
    this.ps.innerHTML = `这是第${this.num + 1}张`;
    this.spans.innerHTML = `${this.num + 1}/${this.imgs.length}`;
}
Fn.prototype.f2 = function () {
    this.imgs[this.num].style.display = 'none';
    this.num > 0 ? this.num-- : this.num = this.imgs.length - 1;
    this.imgs[this.num].style.display = 'block';
    this.ps.innerHTML = `这是第${this.num + 1}张`;
    this.spans.innerHTML = `${this.num + 1}/${this.imgs.length}`;
}
let g = new Fn('oDiv1');
let h = new Fn('oDiv2');
function f(n){
    n.down.onclick = function(){
        n.f1()
    }
    n.back.onclick =function(){
        n.f2()
    }
}
f(g)
f(h)
pre.onclick = function(){
    g.f2();
    h.f2();
}
next.onclick =function(){
    g.f1();
    h.f1();
}



