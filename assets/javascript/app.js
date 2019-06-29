$(function () {

    //variables and click functions used to determine which input is focused for the purpose of using HTML number pad

    var totalFocused = true;
    var percFocused = false;
    var splitFocused = false;
    var myNum = "";
    var floatingPoint = false;
    var decimalCount = 3;

    $("#total-dis").click(function () {
        totalFocused = true;
        percFocused = false;
        splitFocused = false;
    });

    $("#perc-dis").click(function () {
        totalFocused = false;
        percFocused = true;
        splitFocused = false;
    });

    $("#split-dis").click(function () {
        totalFocused = false;
        percFocused = false;
        splitFocused = true;
    });

    //sets initial focus to total input display 

    $("#total-dis").css("border", "3px solid rgb(240, 173, 78)");

    //focus on clicked input element and display 

    $(".input-display").click(function () {
        $(".input-display").css("border", "solid 1px black");
        $(this).css("border", "3px solid rgb(240, 173, 78)");
        $(this).find("input").focus();
    });

    //number buttons writing to focused input fields

    $(".num-btn").click(function () {
        var selectedButton = $(this).html();
        var selectedVal = parseFloat(selectedButton);
        var btnString = selectedButton + $(this).html();

        if (totalFocused === true) {
            $("#total").val(function (index, val) {

                //input fields with type="number" do not like decimals when using html key pad. This is a work around. 

                if (selectedButton === "." && floatingPoint === false) {
                    myNum = myNum + ".";
                    floatingPoint = true;
                } else {
                    
                    if (floatingPoint) {
                        decimalCount--;
                    };
                    if (decimalCount > 0) {
                     myNum = myNum + "" + selectedVal;
                    };
                };

                if (selectedButton !== ".") {
                    return parseFloat(myNum)
                } else {
                    return (parseFloat(myNum).toFixed(2));
                };
            });

        } else if (percFocused === true) {
            $("#perc").val(function (index, val) {
                return val + selectedButton;
            });
        } else if (splitFocused === true) {
            $("#split").val(function (index, val) {
                return val + selectedButton;
            });
        };
    });

    //reset 

    $(".clear-btn").click(function () {
        $("input").val("");
        $("#split").val("");
        $(".input-display").css("border", "solid 1px black");
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

    $(".cal-btn").click(function () {

         //enabling popovers for error checking messages

        $('[data-toggle="popover"]').popover();

        //variables for the math

        var total = $("#total").val().trim();
        var perc = $("#perc").val().trim() / 100;
        var split = $("#split").val().trim();
    

        //checking for empty strings
        if (split === "" || split === "0") {
            split = 1;
            $("#split").val(split);
        };

        if (perc === "") {
            result = total / split;
        };

        // the math 

        var result = total * perc / split;

        //checking for invalid input and throwing error popover if found

        if (parseFloat(total) === 0 || Math.sign(parseFloat(total)) === -1 || total === "") {
            $(".cal-btn").attr("data-content", "Total can't be 0, a negative number, or be left blank.")
            $(".cal-btn").popover("show");
            $("#total").val("");
        } else if (parseFloat(perc) === 0 || Math.sign(parseFloat(perc)) === -1) {
            $(".cal-btn").attr("data-content", "The tip percentage can't be 0 or a negative number.")
            $(".cal-btn").popover("show");
            $("#perc").val("");
        } else if (Math.sign(parseFloat(split)) === -1) {
            $(".cal-btn").attr("data-content", "The tip can't be by a negative number.")
            $(".cal-btn").popover("show");
            $("#perc").val("");
        } else {
            
            $("#tip-tot").html(parseFloat(result).toFixed(2));

            //reseting html keypad variables 

            floatingPoint = false;
            decimalCount = 3;
            myNum = "";
        };
    });

    //limits input of total to two digits after decimal 

    $(function () {
        $("#total").keyup(function () {
            if ($(this).val().indexOf(".") != -1) {
                if ($(this).val().split(".")[1].length > 2) {
                    if (isNaN(parseFloat(this.value))) return;
                    this.value = parseFloat(this.value).toFixed(2);
                }
            }
        });
    });
});