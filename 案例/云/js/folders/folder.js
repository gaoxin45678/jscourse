class Fold {
    constructor() {
        this.data = data;
        this.folders = document.querySelector('.folders');
        this.breadNav = document.querySelector('.breadmenu>.bread-nav');
        this.create = document.querySelector('#create');
        this.top = document.querySelector('#top');
        this.nav = document.querySelector('#nav');
        this.fempty = document.querySelector('.f-empty');
        this.breadmenu = document.querySelector('.breadmenu');
        this.treeMenu = document.querySelector('.tree-menu');
        this.checkedAll = document.querySelector('#checkedAll');
        this.del = document.querySelector('#del');
        this.tanBox = document.querySelector('#tanbox');
        this.closeIco = document.querySelector('.close-ico');
        this.sure = document.querySelectorAll('.conf-btn>a')[0];
        this.cancel = document.querySelectorAll('.conf-btn>a')[1];
        this.movement = document.querySelector('#remove');
        this.modalTree = document.querySelector('.modal-tree');
        this.content = this.modalTree.querySelector('.content');
        this.ok = this.modalTree.querySelector('.ok');
        this.abolish = this.modalTree.querySelector('.cancel');
        this.cha = this.modalTree.querySelector('.icon_close');
        this.folderName = this.modalTree.querySelector('.folderName');
        this.rightList = document.querySelector('#yj-list');
        this.fBox = document.querySelector('#fBox');
        this.rename = document.querySelector('#rename');
        this.fullTipBox = document.querySelector('.full-tip-box');
        this.folders.style.height = window.innerHeight - this.top.offsetHeight - this.nav.offsetHeight - this.breadmenu.offsetHeight + 'px'
        this.folders.style.width = window.innerWidth - this.treeMenu.offsetWidth + 'px'
    }
    getChild(id) { //获取子集
        // if (!data[id]) return null;
        let arr = [];
        for (let attr in data) {
            if (data[attr].pid === id) {
                arr.push(data[attr]);
            }
        }
        return arr;
    }
    fullbox(val) { //弹窗
        let that = this;
        this.fullTipBox.innerHTML = val;
        tools.startMove({
            obj: that.fullTipBox,
            json: {
                top: 0
            },
            durtion: 500,
            fx: 'bounceOut',
            cb() {
                setTimeout(() => {
                    tools.startMove({
                        obj: that.fullTipBox,
                        json: {
                            top: -40
                        },
                        durtion: 200
                    })
                }, 1000);
            }
        });
    }
    render(id) { // 渲染页面
        this.count = id * 1;
        this.folders.innerHTML = '';
        let that = this;
        //如果有子级，就渲染
        let ary = tools.getChild(this.count);
        if (ary && ary.length) {
            this.fempty.style.display = 'none';
            ary.forEach((ele, i) => {
                let div = document.createElement('div');
                div.className = 'file-item';
                div.dataset.id = ele.id;
                let img = document.createElement('img');
                img.src = 'img/folder-b.png';
                let span = document.createElement('span');
                span.className = 'folder-name';
                span.innerHTML = ele.title;
                let input = document.createElement('input');
                input.className = "editor";
                input.value = ele.title;
                let is = document.createElement('i');
                is.className = '';
                is.dataset.id = ele.id;
                div.append(img);
                div.append(span);
                div.append(input);
                div.append(is);
                this.folders.appendChild(div);
                img.ondblclick = function () {
                    that.checkedAll.classList.remove('checked')
                    let arr = tools.getChild(ele.id);
                    if (arr && arr.length) {
                        that.render(ele.id);
                    } else {
                        that.count = ele.id;
                        that.fempty.style.display = 'block';
                        that.folders.innerHTML = '';

                    }
                    that.crumbst();
                }
                is.onclick = function () {
                    data[ele.id].checked = this.classList.toggle('checked');
                    div.classList.toggle('active');
                    that.selectAll();
                };
            });

        } else {
            this.fempty.style.display = 'block';
            // checkedAll.className = '';
        }
    }
    newFile() {  // 新建文件夹
        let that = this;
        this.create.onclick = function (ev) {
            that.checkedAll.classList.remove('checked');
            let i = that.folders.querySelectorAll('i');
            let divs = that.folders.querySelectorAll('div');
            i.forEach((e, i) => {
                e.classList.remove('checked');
                divs[i].classList.remove('active');
            });
            that.fempty.style.display = 'none';
            that.folders.scrollTop = that.folders.scrollHeight;
            that.fempty.style.display = 'none';
            let div = document.createElement('div');
            div.className = 'file-item';
            let img = document.createElement('img');
            img.src = 'img/folder-b.png';
            let input = document.createElement('input');
            input.className = "editor";
            input.value = '新建文件夹';
            let is = document.createElement('i');
            div.append(img);
            div.append(input);
            div.append(is);
            that.folders.appendChild(div);
            input.style.display = 'block';
            input.select();
            input.onblur = function () {
                let v = this.value;
                let ary = tools.getChild(that.count);
                let result = ary.some(ele => ele.title === v);
                let id = + new Date;
                if (!result) {
                    that.data[id] = {
                        id,
                        "pid": that.count,
                        "title": v,
                        "type": "file",
                        "checked": false
                    }
                } else {
                    let v2 = v;
                    let num = 0;
                    while (result) {
                        v2 = v2.replace(/\(\d+\)/, '') + '(' + (++num) + ')';
                        result = ary.some(ele => ele.title === v2)
                    }
                    that.data[id] = {
                        id,
                        "pid": that.count,
                        "title": v2,
                        "type": "file",
                        "checked": false
                    }
                }
                that.render(that.count);
                that.tree()
                that.fullbox('新建文件夹成功')
            }
            return false;
        }
    }
    name(input, span) { // 判断是否重名
        let that = this;
        input.style.display = 'block';
        span.style.display = 'none'
        input.select();
        input.onblur = function () {
            let v = this.value;
            //判断一下，是否重命名了
            let d = +new Date
            that.arr = Object.values(that.data);
            let cm = that.arr.some(e => e.title === v);
            if (!cm) {
                that.arr.push({
                    title: v,
                    id: d
                });
                that.data[d] = {
                    "id": d,
                    "pid": that.count,
                    "title": v,
                    "type": "file",
                    "checked": false
                }
            } else {
                li.remove();
                let num = 0;
                let v2 = v;
                //如果重名就循环数组，判断是否重名
                //一直循环直到不重名为止
                while (cm) {
                    //新建文件 新建文件(1)(2)
                    //每次循环的时候都把括号给清掉
                    v2 = v2.replace(/\(\d+\)/, '') + '(' + (++num) + ')';
                    cm = that.arr.some(e => e.title === v2);
                }
                that.arr.push({
                    title: v2,
                    id: d
                });
                that.data[d] = {
                    "id": d,
                    "pid": that.count,
                    "title": v2,
                    "type": "file",
                    "checked": false
                }
            }
            that.render(that.count)
        }
    }
    crumbst() {  //面包屑
        let html = '';
        let that = this;
        let ary = tools.getParents(this.count);
        ary.forEach((item, i, all) => {
            if (i != all.length - 1) {
                html += `<a data-id="${item.id}" href="javascript:;">${item.title}</a>`;
            } else {
                html += `<span>${item.title}</span>`;
            }
        });
        this.breadNav.innerHTML = html;
        this.breadNav.onclick = function (ev) {
            that.checkedAll.classList.remove('checked');
            if (ev.target.tagName === 'A') {
                that.render(ev.target.getAttribute('data-id'));
                that.crumbst();
            }
        }
    }
    selectAll() { //全选
        let is = Array.from(this.folders.querySelectorAll('i'));
        let cur = is.every(ele => {
            return ele.className === 'checked';
        })
        cur ? this.checkedAll.classList.add('checked') : this.checkedAll.classList.remove('checked');
        let that = this;
        this.checkedAll.onclick = function () {
            let div = that.folders.querySelectorAll('.file-item');
            if (this.classList.contains('checked')) {
                is.forEach((e, i) => {
                    e.className = '';
                    div[i].classList.remove('active');
                })

            } else {
                is = that.folders.querySelectorAll('i');
                is.forEach((e, i) => {
                    e.className = 'checked'
                    div[i].classList.add('active');
                });

            }
            this.classList.toggle('checked');
        }
    }
    selectBox() { //选框
        let that = this;
        this.fBox.onmousedown = function (ev) {
            that.rightList.style.display = 'none';
            if (ev.target.classList.contains('file-item') || ev.target.parentNode.classList.contains('file-item')) {
                return;
            } else {
                let div = that.folders.querySelectorAll('.file-item');
                let is = Array.from(that.folders.querySelectorAll('i'));
                div.forEach((ele, i) => {
                    ele.classList.remove('active');
                    is[i].className = '';
                });
                that.checkedAll.classList.remove('checked');
                let box = document.createElement('div');
                box.className = 'kuang';
                //存了一个按下的坐标
                let l = ev.pageX - that.treeMenu.offsetWidth;
                let t = ev.pageY - that.top.offsetHeight - that.nav.offsetHeight - that.breadmenu.offsetHeight;
                box.style.cssText = 'left:' + l + 'px;top:' + t + 'px';
                that.folders.append(box);

                that.fBox.onmousemove = function (ev) {
                    //设置left和top值
                    box.style.left = Math.min(l, ev.pageX - that.treeMenu.offsetWidth) + 'px';
                    box.style.top = Math.min(t, ev.pageY - that.top.offsetHeight - that.nav.offsetHeight - that.breadmenu.offsetHeight) + 'px';

                    //设置宽高
                    box.style.width = Math.abs(ev.pageX - that.treeMenu.offsetWidth - l) + 'px';
                    box.style.height = Math.abs(ev.pageY - that.top.offsetHeight - that.nav.offsetHeight - that.breadmenu.offsetHeight - t) + 'px';
                    div.forEach((eles, j) => {
                        if (tools.duang(box, eles, that.folders.scrollTop)) {
                            eles.classList.add('active');
                            is[j].className = 'checked';

                        } else {
                            eles.classList.remove('active');
                            is[j].className = '';
                        }
                    })
                    that.onOff = is.every(e => {
                        return e.className === 'checked';
                    })
                    if (that.onOff) {
                        that.checkedAll.classList.add('checked');
                    } else {
                        that.checkedAll.classList.remove('checked');
                    }
                    return false; // 在down时阻止默认行为会阻止失焦（焦点也是浏览器的默认行为），所以放在move里面
                }

                document.onmouseup = function () {
                    box.remove();
                    that.fBox.onmousemove = document.onmouseup = null;
                }
            }
        }
    }
    remove() { //删除
        let that = this;
        let is = Array.from(this.folders.querySelectorAll('i'));
        let t = is.some(e => {
            return e.className === 'checked';
        })
        let are = is.filter((ele, i) => {
            return ele.className === 'checked';
        })
        if (t) {
            this.tanBox.style.display = 'block';
            this.sure.onclick = function () {
                are.forEach(e => {
                    that.count = data[e.getAttribute('data-id')].pid;
                    delete that.data[e.getAttribute('data-id')];
                })
                that.tanBox.style.display = 'none';
                that.render(that.count);
                that.tree();
                that.checkedAll.classList.remove('checked');
                that.fullbox('删除文件成功');
            }
            this.closeIco.onclick = this.cancel.onclick = function () {
                that.tanBox.style.display = 'none';
            }
        }
    }
    reName() { //重命名
        let that = this;
        let is = this.folders.querySelectorAll('i[class="checked"]');
        if (is.length !== 1) {
            this.fullbox('请选择一个文件');
        } else {
            let input = is[0].previousElementSibling;
            let span = input.previousElementSibling;
            input.style.display = 'block';
            span.style.display = 'none';
            input.select();
            input.onblur = function () {
                let v = this.value.trim();
                if (v === data[is[0].getAttribute('data-id')].title) {
                    that.render(that.count);
                    return;
                }
                if (!v) {
                    that.fullbox('文件名不能为空');
                    return;
                }
                let ary = that.getChild(that.count);
                let result = ary.some(item => item.title === v);
                if (!result) {
                    data[is[0].getAttribute('data-id')].title = v;
                } else {
                    let v2 = v;
                    let num = 0;
                    while (result) {
                        v2 = v2.replace(/\(\d+\)/, '') + '(' + (++num) + ')';
                        result = ary.some(item => item.title === v2);
                    }
                    data[is[0].getAttribute('data-id')].title = v2
                }
                that.render(that.count);
                that.tree();
                that.fullbox('重命名成功');
            }
        }

    }
    rightKey() { //右键
        let that = this;
        that.folders.oncontextmenu = function (ev) {
            that.rightList.style.display = 'block';
            that.rightList.style.left = ev.clientX + 'px'
            that.rightList.style.top = ev.clientY - that.top.offsetHeight - that.nav.offsetHeight + 'px'
            return false;
        }
        document.onclick = function (ev) {
            that.rightList.style.display = 'none';
            if (ev.target.innerHTML === '重命名') {
                that.reName();
            } else if (ev.target.innerHTML === '删除') {
                that.remove();
            }else if(ev.target.innerHTML === '移动到'){
                that.move();
            }
        }
    }
    tree() { //菜单树
        let that = this;
        renderTree(0);
        //初始化
        function renderTree(num) {
            let html = `<ul>
                <li data-id="${that.data[num].id}">
                    <div class="tree-title tree-ico open">
                        <span><i></i>${that.data[num].title}</span>
                    </div>
                </li>
            `;
            let ary = that.getChild(num);
            if (ary.length) {
                html += `
                    <ul style="padding-left:15px">
                        ${
                    ary.map(ele => {
                        let sclass = that.getChild(ele.id).length ? 'tree-title tree-ico close' : 'tree-title tree-ico-none';
                        return (
                            `<li data-id="${ele.id}">
                                        <div class="${sclass}">
                                            <span><i></i>${ele.title}</span>
                                        </div>
                                    </li>`
                        )
                    }).join('')
                    }
                    </ul>
                `
            }
            html += `</ul>`;
            that.treeMenu.innerHTML = html;
            return html;
        }

        this.treeMenu.onclick = function (ev) {
            if (ev.target.tagName === 'SPAN') {
                let li = ev.target.parentNode.parentNode;
                let id = li.dataset.id * 1;
                if (id) {
                    that.count = id;
                    that.crumbst();
                    that.render(id);
                    if (!li.children[0].classList.contains('tree-ico-none')) {
                        let o = !li.children[0].classList.toggle('close')
                        renderChild(li, id, o);
                    }
                }
            }
        }

        //点击创建子级ul的
        function renderChild(li, num, onoff) {
            //判断文件夹是否关闭
            if (onoff) {
                li.children[0].classList.add('open');
                li.children[0].classList.remove('close');
            } else {
                li.children[0].classList.add('close');
                li.children[0].classList.remove('open');
            }
            /*
                有没有ul，有就不添加，没有才添加
            */
            if (li.lastElementChild.tagName !== 'UL') {
                let ary = that.getChild(num);
                let html = '<ul style="padding-left:15px">';
                // console.log(ary,num)
                if (ary.length && onoff) {
                    html += `
                        ${
                        ary.map(ele => {
                            let sclass = that.getChild(ele.id).length ? 'tree-title tree-ico close' : 'tree-title tree-ico-none';
                            return (
                                `<li data-id="${ele.id}">
                                        <div class="${sclass}">
                                            <span><i></i>${ele.title}</span>
                                        </div>
                                    </li>`
                            )
                        }).join('')
                        }
                    </ul>
                `
                }
                html += `</ul>`;
                li.innerHTML += html;
            } else {
                /*
                    打开的时候只有li下的第一个ul打开
                    关闭的时候把li下的所有ul都关闭
                */
                if (onoff) {
                    li.children[1].style.display = 'block';
                } else {
                    let uls = li.getElementsByTagName('ul');
                    for (let i = 0; i < uls.length; i++) {

                        uls[i].style.display = 'none';
                        uls[i].previousElementSibling.className = 'tree-title tree-ico close';
                    }
                }
            }
        }
        return { renderTree, renderChild }

    }
    move() { //移动
        let that = this
        let id = 0; //为了记录移动的id
        let o = false;
        let is = Array.from(this.folders.querySelectorAll('i'));
        let arr = is.filter(e => e.className === 'checked');
        let len = arr.length;
        if (len < 1) {
            this.fullbox('请选择要移动的文件');
            return;
        }
        this.modalTree.style.display = 'block';
        this.content.innerHTML = this.tree().renderTree(0);

        //点击移动到的树形菜单中
        this.content.onclick = function (ev) {
            if (ev.target.tagName === 'SPAN') {
                o = false;//重新设置一次false
                let li = ev.target.parentNode.parentNode;
                let span = that.content.getElementsByTagName('span');

                //把所有的span的背景色清掉
                for (let i = 0; i < span.length; i++) {
                    span[i].style.background = '';
                }
                //把当前的背景色加上
                ev.target.style.background = '#ccc';
                that.folderName.innerHTML = ev.target.innerHTML;
                id = li.dataset.id * 1;  //获取到移动到的id
                if (id) {
                    //移动到的id有没有和选中的id重名 
                    if (arr.some(e => e.dataset.id * 1 === id)) {
                        console.log(111)
                        that.fullbox('非法选择');
                        o = true;
                        return;
                    }
                    //生成ul
                    if (!li.children[0].classList.contains('tree-ico-none')) {
                        let o = !li.children[0].classList.toggle('close')
                        that.tree().renderChild(li, id, o);
                    }
                }
            }
        }
        //点击确定
        this.ok.onclick = function (ev) {
            //刚才点击移动到的span时，是否有非法操作
            if (o) {
                that.fullbox('非法选择');
                return;
            };
            //id 为点击的

            let ary = that.getChild(that.count);
            let arr = ary.filter(item => item.checked);
            let len = arr.length;
            let onoff = false;
            if (len < 1) return;

            /*
                循环所有的框选的数据，判断当前这层的id是否等于
                移动到的id，如果等于就说明是非法操作
            */

            if (onoff) {

                that.fullbox('非法操作,已报110');
            } else {
                //开始移动
                arr.forEach(ele => {
                    ele.pid = id;
                    ele.className = '';
                });
                that.render(that.count);
                that.tree();
            }
            that.modalTree.style.display = 'none';
        }

        this.abolish.onclick = function () {
            that.modalTree.style.display = 'none';
        }
        this.cha.onclick = function () {
            that.modalTree.style.display = 'none';
        }
        this.folderName.innerHTML = ''

    }
    events() {
        let that = this;
        this.render(0);
        this.crumbst();
        this.selectAll();
        this.newFile();
        this.remove();
        this.selectBox();
        this.rightKey();
        this.tree();
        this.rename.onclick = that.reName.bind(that);
        this.del.onclick = that.remove.bind(that);
        this.movement.onclick = that.move.bind(that);
    }
}
let f = new Fold();
f.events();