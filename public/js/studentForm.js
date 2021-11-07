


$(document).ready(function () {



    //Add space below the submit button
    $("button").addClass("mb-5");


    // VALIDATING ROLL NO FIELD AND PUTTING THE EXPECTED VALUES

    $("phoneno").focusout(function () {
        if (this.value.length != 10) {
            alert("Invalid Phone No.")
            $("phoneno").val("");
            $("phoneno").focus();
        }

    })


});