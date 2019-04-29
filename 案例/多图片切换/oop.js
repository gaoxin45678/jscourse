class Cad {
    constructor(id) {
        this.oDiv = document.getElementById(id);
        this.imgs = this.oDiv.querySelectorAll('img');
        this.spans = this.oDiv.querySelector('span');
        this.ps = this.oDiv.querySelector('p');
        this.down = this.oDiv.querySelector('.down');
        this.back = this.oDiv.querySelector('.back');
        this.num = 0;
    }
    f1() {
        this.imgs[this.num].style.display = 'none';
        this.num < this.imgs.length - 1 ? this.num++ : this.num = 0;
        this.imgs[this.num].style.display = 'block';
        this.ps.innerHTML = `这是第${this.num + 1}张`;
        this.spans.innerHTML = `${this.num + 1}/${this.imgs.length}`;
    }
    f2() {
        this.imgs[this.num].style.display = 'none';
        this.num > 0 ? this.num-- :this.num = this.imgs.length - 1;
        this.imgs[this.num].style.display = 'block';
        this.ps.innerHTML = `这是第${this.num + 1}张`;
        this.spans.innerHTML = `${this.num + 1}/${this.imgs.length}`;
    }  
}

let g = new Cad('oDiv1');
let h = new Cad('oDiv2');
before1.onclick = function(){
    g.f2();
}
before2.onclick = function(){
    h.f2();
}
after1.onclick = function(){
    g.f1();
}
after2.onclick = function(){
    h.f1();
}
function events(before,after){
    before.onclick = function(){
        g.f2();
        h.f2();
    }
    after.onclick = function(){
        g.f1();
        h.f1();
    }
}
events(pre,next)


