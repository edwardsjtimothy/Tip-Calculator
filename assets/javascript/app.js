$(function() {

    var totalFocused = true;
    var percFocused = false;
    var splitFocused = false; 

    $("#total-dis").click(function() {
        totalFocused = true;
        percFocused = false;
        splitFocused = false;
    });

    $("#perc-dis").click(function() {
        totalFocused = false;
        percFocused = true;
        splitFocused = false;
    });

    $("#split-dis").click(function() {
        totalFocused = false;
        percFocused = false;
        splitFocused = true;
    });

    //sets initial focus to total input display 

    $("#total-dis").css("border", "3px solid rgb(241, 185, 29)");

    //focus on clicked input element and display 
   
    $(".input-display").click(function() {
        $(".input-display").css("border","solid 1px black");
        $(this).css("border", "3px solid rgb(241, 185, 29)");
        $(this).find("input").focus();
    });

    //number buttons writing to focused input fields

    $(".num-btn").click(function() {
        var selectedButton = $(this).html();
        
        if (totalFocused === true) {
            $("#total").val(function(index, val) {
                return val + selectedButton;
            });
        } else if (percFocused === true) {
            $("#perc").val(function(index, val) {
                return val + selectedButton;
            });
        } else if (splitFocused === true) {
            $("#split").val(function(index, val) {
                return val + selectedButton;
            });
        };
    });

    //reset 

    $(".bac-btn").click(function() {
        $("input").val("");
        $("#split").val(1);
        $(".input-display").css("border","solid 1px black");
        $("#total-dis").css("border", "3px solid rgb(241, 185, 29)");
        $("#total").focus();
        $("#tip-tot").html("");

        totalFocused = true;
        percFocused = false; 
        splitFocused = false; 
    });


    //calculate on click of calculate button

    $(".cal-btn").click(function() {
        var total = $("#total").val().trim();
        var perc = $("#perc").val().trim()/ 100;
        var split = $("#split").val().trim();

        var result = total * perc / split;
        $("#tip-tot").html(parseFloat(result).toFixed(2));



    });

    //limits input of total to two digits after decimal 

    $(function() {
        $("#total").keyup(function(){
          if($(this).val().indexOf(".")!=-1){         
              if($(this).val().split(".")[1].length > 2) {                
                  if( isNaN( parseFloat(this.value))) return;
                  this.value = parseFloat(this.value).toFixed(2);
              }  
           }            
        });
       });

});