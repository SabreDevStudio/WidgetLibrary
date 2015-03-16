// JavaScript Document
function openNeoAssist() {
    $('#NeoAssistTag').hide("slide", {direction: "right"}, 100, function () {
        var maskHeight = $(document).height();
        var maskWidth = $(window).width();
        $('#maskAI').css({'width': maskWidth, 'height': maskHeight});
        $('#maskAI').fadeIn(500);
        $('#maskAI').fadeTo("slow", 0.6, function () {
            $('#NeoAssistAI').slideDown(function () {
                $('.close').fadeIn(500);
            });
        });
    });
}

function closeNeoAssist() {
    $('.close').hide();
    $('#NeoAssistAI').hide();
    $('#maskAI').fadeOut(function () {
        $('#NeoAssistTag').show("slide", {direction: "right"}, 300);
    });
}

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
    callModal(event.data);
}

function callModal(data) {
    if (data == 'fechar') {
        closeNeoAssist();
    }
}

function resetet() {
    document.getElementById('frameNeoAssist').src = 'http://submarinoviagens.neoassist.com/?th=submarinovi';

}