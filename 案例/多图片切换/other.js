const pre = document.querySelector('#pre');//上一组
const next = document.querySelector('#next');//下一组
const back = document.querySelectorAll('.back');//上一个
const down = document.querySelectorAll('.down');//下一个
const img1 = document.querySelectorAll('#oDiv1>img');
const img2 = document.querySelectorAll('#oDiv2>img');
const spans = document.querySelectorAll('span');
const ps = document.querySelectorAll('p');

let ind1 = 1;
let ind2 = 1;
let f1 = down[0].onclick = function(){
    console.log(ind1)
    img1[ind1-1].style.display = 'none';
    ind1 < 4?ind1++:ind1 =1;
    img1[ind1-1].style.display = 'block';
    spans[0].innerHTML = `${ind1}/4`;    
    ps[0].innerHTML = `这是第${ind1}张图片`;
    
}
let f2 = back[0].onclick = function(){
    img1[ind1-1].style.display = 'none';
    ind1 >1?ind1--:ind1 =4;
    img1[ind1-1].style.display = 'block';
    ps[0].innerHTML = `这是第${ind1}张图片`;
    spans[0].innerHTML = `${ind1}/4`;

}
let f3 = down[1].onclick = function(){
    img2[ind2-1].style.display = 'none';
    ind2 < 3?ind2++:ind2 =1;
    img2[ind2-1].style.display = 'block';
    spans[1].innerHTML = `${ind2}/3`;    
    ps[1].innerHTML = `这是第${ind2}张图片`;
    
}
let f4 = back[1].onclick = function(){
    img2[ind2-1].style.display = 'none';
    ind2 >1?ind2--:ind2 =3;
    img2[ind2-1].style.display = 'block';
    ps[1].innerHTML = `这是第${ind2}张图片`;
    spans[1].innerHTML = `${ind2}/3`;

}
pre.onclick = function(){
    f2();
    f4();
}
next.onclick = function(){
    f1();
    f3();
}