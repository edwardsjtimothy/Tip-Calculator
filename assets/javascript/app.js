$(function() {

    $("#total-dis").css("border", "3px solid rgb(241, 185, 29)");
   
    $(".input-display").click(function() {
        $(".input-display").css("border","solid 1px black");
        $(this).css("border", "3px solid rgb(241, 185, 29)");
        $(this).find("input").focus();
    });
    

    //number buttons printing to selected input fields
    $(".num-btn").click(function() {
        var selectedButton = $(this).html();

       
    

    });

    //clear input field on click 

    $(".bac-btn").click(function() {
        $("input").text("");

    });


    //calculate on click of calculate button
    $(".cal-btn").click(function() {
        var total = $("#total").val().trim();
        var perc = $("#perc").val().trim()/ 100;
        var split = $("#split").val().trim();

        var result = total * perc / split;
        $("#tip-tot").html(parseFloat(result)).tofixed(2);
    });











});