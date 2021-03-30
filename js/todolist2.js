class ToDoList {
    constructor() {
        this.doing = document.querySelector('.doing');
        this.done = document.querySelector('.done');
        var datalists = this.readData();
        this.loadData(datalists);
    }

    addList() {

    }

    removeList() {

    }

    editList() {

    }

    checkList() {

    }

    cancelcheckList() {

    }

    readData() {
        var datalists = localStorage.getItem('todolist');
        if (datalists !== null) {
            return JSON.parse(datalists);
        } else {
            return [];
        }
    }

    loadData(datalists) {
        console.log(datalists.length);
        for (var i = 0; i < datalists.length; i++) {
            if (datalists[i].done == true) {
                var li = '<li' + ' data-index=' + i + '><input type="checkbox" checked="true">' + datalists[i].title + '<em>删除</em></li>'
                this.doing.insertAdjacentHTML('beforeend', li);
            } else {
                var li = '<li' + ' data-index=' + i + '><input type="checkbox" checked="false">' + datalists[i].title + '<em>删除</em></li>'
                this.done.insertAdjacentHTML('beforeend', li);
            }
        }

    }
}

new ToDoList();