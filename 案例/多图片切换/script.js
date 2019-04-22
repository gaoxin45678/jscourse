const pre = document.querySelector('#pre');//上一组
const next = document.querySelector('#next');//下一组
const back = document.querySelectorAll('.back');//上一个
const down = document.querySelectorAll('.down');//下一个
const img1 = document.querySelectorAll('#oDiv1>img');
const img2 = document.querySelectorAll('#oDiv2>img');
const spans = document.querySelectorAll('span');
const ps = document.querySelectorAll('p');

let num1 = 1;
let num2 = 1;
let f1 = down[0].onclick = function () {
    num1 < 4 ? num1++ : num1 = 1;
    img1[0].src = `img/${num1}.jpg`;
    ps[0].innerHTML = `这是第${num1}张图片`;
    spans[0].innerHTML = `${num1}/4`
}
let f2 = back[0].onclick = function () {
    num1 > 1 ? num1-- : num1 = 4;
    img1[0].src = `img/${num1}.jpg`;
    ps[0].innerHTML = `这是第${num1}张图片`;
    spans[0].innerHTML = `${num1}/4`
}
let f3 = down[1].onclick = function () {
    num2 < 3 ? num2++ : num2 = 1;
    img2[0].src = `img/0${num2}.jpg`;
    ps[1].innerHTML = `这是第${num2}张图片`;
    spans[1].innerHTML = `${num2}/3`
}
let f4 = back[1].onclick = function () {
    num2 > 1 ? num2-- : num2 = 3;
    img2[0].src = `img/0${num2}.jpg`;
    ps[1].innerHTML = `这是第${num2}张图片`;
    spans[1].innerHTML = `${num2}/3`
}
pre.onclick =function(){
    f2();
    f4();
}
next.onclick = function(){
    f1();
    f3();
}
