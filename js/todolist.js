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

    $('.doing ol').on('click', 'li', function () {
        var todolists = readData();
        var index = $(this).attr('data-index');
        todolists[index].done = true;
        writeData(todolists);
        loadData()
        getDoingSum();
        getDoneSum();
    })

    $('.done ol').on('click', 'li', function () {
        var todolists = readData();
        var index = $(this).attr('data-index');
        todolists[index].done = false;
        writeData(todolists);
        loadData()
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
        var index = $(this).parent().attr('data-index');
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
            var li = $('<li' + ' data-index=' + i + '></li>');

            if (ele.done == false) {
                li.html('<input type="checkbox">' + ele.title + '<em></em>');
                $('.doing ol').prepend(li);
            } else {
                li.html('<input type="checkbox" checked="checked">' + ele.title + '<em></em>');
                $('.done ol').prepend(li);
            }
        })


    }

})