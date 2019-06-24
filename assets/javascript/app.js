$(function() {

    $(".input-display").click(function() {
        $(".input-display").css("border","solid 1px black");
        $(this).css("border", "3px solid rgb(241, 185, 29)");
    });
    
    $(".num-btn").click(function () {
        if ($(".input-display").css("border", "3px solid rgb(241, 185, 29)")) {
            $("#total").text($(this).data("num"));

        }
    });











});