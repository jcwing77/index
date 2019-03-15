$(function () {
    $(".card_item").mouseover(function () {
        $(this).siblings('.card_item').removeClass("active");
        $(this).addClass("active");
    });

})