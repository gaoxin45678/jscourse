class Goods {
    constructor(id) {
        this.box = document.querySelector(id);
        this.list = document.querySelector('.list');
        this.lis = this.list.querySelectorAll('li');
        this.reduce = this.list.querySelectorAll('li>i:first-child');//获取减少按钮
        this.add = this.list.querySelectorAll('li>i:nth-child(3)');//获取增加按钮
        this.number = this.list.querySelectorAll('li>em');//个数
        this.price = this.list.querySelectorAll('li>span>strong:first-child');//单价
        this.subTotal = this.list.querySelectorAll('li>span>strong:last-child');//小计
        this.info = this.box.querySelector('.info');
        this.sumNumber = this.info.querySelectorAll('em')[0]; //总数量
        this.totalMoney = this.info.querySelectorAll('em')[1];//总价钱
        this.maxMoney = this.info.querySelectorAll('em')[2];//最贵的
    }
    events() {
        let len = this.lis.length;
        for (let i = 0; i < len; i++) {
            let num = 0;
            let that = this;
            this.add[i].index = i;
            this.reduce[i].index = i
            this.add[i].onclick = function () {
                num++
                that.increase(this.index, num);//调用增加
                that.amount(len);//调用合计
            }
            this.reduce[i].onclick = function () {
                if (num > 0) {
                    num--;
                    that.lessen(this.index, num);//调用减少
                    that.amount(len);//调用合计

                }
            }
        }
    }
    increase(i, num) {//增加的方法
        this.number[i].innerHTML = num;
        this.subTotal[i].innerHTML = num * parseFloat(this.price[i].innerHTML) + '元';
    }
    lessen(i, num) {//减少
        this.number[i].innerHTML = num;
        this.subTotal[i].innerHTML = num * parseFloat(this.price[i].innerHTML) + '元';
    }
    amount(len) {//合计及最大值
        let cont = 0;//接收总个数
        let sum = 0; //接收总价钱
        let maxM = 0;//单价最高的
        for (let i = 0; i < len; i++) {
            cont += parseFloat(this.number[i].innerHTML);//总个数
            sum += parseFloat(this.subTotal[i].innerHTML);//总价钱
            let price1 = parseFloat(this.price[i].innerHTML) // 每一个的单价
            let num1 = parseFloat(this.number[i].innerHTML) //页面中商品的个数
            if (num1 > 0 && price1 > maxM) {
                maxM = price1;
            }
        }
        this.sumNumber.innerHTML = cont; //总数量
        this.totalMoney.innerHTML = sum;//总价钱
        this.maxMoney.innerHTML = maxM;// 最贵的
    }
}
let g = new Goods('.box');
g.events();