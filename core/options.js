var timeout_notify,
    elements = document['querySelectorAll']('.dd-sttbtn--placeholder'),
    sttbtn = document['querySelector']('.dd-sttbtn--visible'),
    notify = document['querySelector'](".notify");
    notify.innerHTML = "Сохранено";

document.querySelector(".text").innerText = "Место кнопки на странице";

chrome['storage']['local'].get('stt-pos', function(result) {
    sttbtn.setAttribute('data-stt-pos', result['stt-pos']);
});

function showNotify() {
    notify.classList.add("notify--show");
    clearTimeout(timeout_notify);
    timeout_notify = setTimeout(function() {
        notify.classList.remove("notify--show");
    }, 3000);
}[].forEach.call(elements, function(div) {
    div.addEventListener('click', function(e) {
        sttbtn.setAttribute('data-stt-pos', e.target.getAttribute('data-stt-pos'))
        chrome['storage']['local'].set({
            'stt-pos': e.target.getAttribute('data-stt-pos')
        });
        showNotify();
    })
});

chrome['runtime'].sendMessage({
    action: 'getOptions'
}, function(response) {
    var options = {};
    var checkboxes = document['querySelectorAll']('input[type="checkbox"]');
    Array.prototype.forEach.call(checkboxes, function(checkbox) {
        var id = checkbox.id;
        checkbox.checked = options[id] = !!response.settings[id];
        checkbox.addEventListener('change', function() {
            options[id] = !!checkbox.checked;
            chrome['runtime'].sendMessage({
                action: 'setOptions',
                payload: options
            });
            showNotify();
        });
    });
});