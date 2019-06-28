$(function() {


//variables and click functions used to determine which input is focused for the purpose of using HTML number pad

    var totalFocused = true;
    var percFocused = false;
    var splitFocused = false; 
    var myNum = "";
    var floatingPoint = false;
    var decimalCount = 3;

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

    $("#total-dis").css("border", "3px solid rgb(240, 173, 78)");

    //focus on clicked input element and display 
   
    $(".input-display").click(function() {
        $(".input-display").css("border","solid 1px black");
        $(this).css("border", "3px solid rgb(240, 173, 78)");
        $(this).find("input").focus();
    });

    //number buttons writing to focused input fields

    $(".num-btn").click(function() {
        var selectedButton = $(this).html();
        var selectedVal =  parseFloat(selectedButton);
        
        if (totalFocused === true) {
            $("#total").val(function(index, val) {
                
                //input fields with type="number" do not like decimals when using html key pad. This is a work around. 

                if(selectedButton === "." && floatingPoint === false){ 
                    myNum = myNum + ".";
                    floatingPoint = true; 
                } else {
                    if(floatingPoint) decimalCount--;
                    if(decimalCount > 0) myNum = myNum+""+selectedVal
                };

                if(selectedButton !== ".") return parseFloat(myNum)
                else return (parseFloat(myNum).toFixed(2));
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

    //backspace 

    $(".back-btn").click(function() {
        if (totalFocused === true) {
            var value = $("#total").val();
            console.log(value);
            $("#total").val() = value.substr(0, value.length - 1);
            console.log(value);
        }

    });

    //reset 

    $(".clear-btn").click(function() {
        $("input").val("");
        $("#split").val(1);
        $(".input-display").css("border","solid 1px black");
        $("#total-dis").css("border", "3px solid rgb(240, 173, 78)");
        $("#total").focus();
        $("#tip-tot").html("");

        totalFocused = true;
        percFocused = false; 
        splitFocused = false; 
        floatingPoint = false;
        decimalCount = 3;
        myNum = "";
    });


    //calculate on click of calculate button

    $(".cal-btn").click(function() {
        var total = $("#total").val().trim();
        var perc = $("#perc").val().trim()/ 100;
        var split = $("#split").val().trim();
        var result = total * perc / split;
        $("#tip-tot").html(parseFloat(result).toFixed(2));
        floatingPoint = false;
        decimalCount = 3;
        myNum = "";
        // console.log(floatingPoint)
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