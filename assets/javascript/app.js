$(function() {


    $("#total-dis").css("border", "3px solid rgb(241, 185, 29)");
   
    $(".input-display").click(function() {
        $(".input-display").css("border","solid 1px black");
        $(this).css("border", "3px solid rgb(241, 185, 29)");
        $(this).find("input").focus();
    });
    
    $(".num-btn").click(function() {
        var selectedButton = $(this).html();
    
       
    });



    //calculate on click of calculate button
    $(".cal-btn").click(function() {
        var total = parseFloat($("#total").val().trim());
        var perc = parseFloat($("#perc").val().trim()) / 100;
        var split = parseFloat($("#split").val().trim());

        var result = total * perc / split;
        console.log(result);


    });











});