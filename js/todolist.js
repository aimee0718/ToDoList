$(function () {
    loadData();
    getDoingSum();
    getDoneSum();

    $('#title').on("keydown", function (e) {
        if (e.keyCode === 13) {
            if ($(this).val() != '') {
                var todolists = readData();
                todolists.push({ 'title': $(this).val(), 'done': false });
                writeData(todolists);
                loadData();
                getDoingSum();
                getDoneSum();
            }

        };

    });

    $('ol').on('dblclick', 'li', function () {
        var todolists = readData();
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        var index = $(this).children('em').attr('id');
        $(this).html('<input type="checkbox"/><input type="text" value="' + todolists[index].title + '"/><em id=' + index + '>删除</em>');
        $(this).children('input[type="text"]').select();
        $(this).children('input[type="text"]').on('blur', function () {
            todolists[index].title = $(this).val();
            writeData(todolists);
            loadData();
            getDoingSum();
            getDoneSum();
        });
        $(this).children('input[type="text"]').on('keydown', function (e) {
            if (e.keyCode == 13) {
                todolists[index].title = $(this).val();
                writeData(todolists);
                loadData();
                getDoingSum();
                getDoneSum();
            }
        })
    })

    $('ol').on('click', 'input', function () {
        var todolists = readData();
        var index = $(this).siblings('em').attr('id');
        todolists[index].done = $(this).prop("checked");
        writeData(todolists);
        loadData();
        getDoingSum();
        getDoneSum();
    })


    $('ol').on("mouseenter", "em", function () {
        $(this).css("background-color", "steelblue");
    });
    $('ol').on('mouseleave', 'em', function () {
        $(this).css("background-color", "#666");
    });
    $('ol').on('click', 'em', function () {
        var todolists = readData();
        var index = $(this).attr('id');
        todolists.splice(index, 1);
        writeData(todolists);
        loadData();
        getDoingSum();
        getDoneSum();
    });

    function getDoingSum() {
        var num = $('.doing ol li').length;
        $('.doing h3 em').html(num);
    }

    function getDoneSum() {
        var num = $('.done ol li').length;
        $('.done h3 em').html(num)
    }

    function readData() {
        var data = localStorage.getItem('todolist');
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    function writeData(todolists) {
        localStorage.setItem('todolist', JSON.stringify(todolists));
    }

    function loadData() {
        var data = localStorage.getItem('todolist');
        data = JSON.parse(data);
        $('ol').empty();
        $.each(data, function (i, ele) {
            var li = $('<li></li>');
            if (ele.done == false) {
                li.html('<input type="checkbox"><span>' + ele.title + '</span><em id=' + i + '>删除</em>');
                $('.doing ol').prepend(li);
            } else {
                li.html('<input type="checkbox" checked="checked"><span>' + ele.title + '</span><em id=' + i + '>删除</em>');
                $('.done ol').prepend(li);
            }
        })


    }

})