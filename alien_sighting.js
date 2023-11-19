"use strict";

                // William S. Johnson, Jr | 11-18-23 | DPR214 - jQuery Plugins


// Audio Constructor for sound effects.
let fadeIn = new Audio("images/fade_in.wav");
let fadeOut = new Audio("images/fade_out_b.mp4");

//Functions to add value to span elements, when Height & Weight Sliders are moved
function creatureWeight() {
    let bodyMass = $("#weight").slider("value");
    $("#pounds").text(bodyMass);
};
function creatureHeight() {
    let bodyHeight = $("#height").slider("value");
    $("#feet").text(bodyHeight);
};

//Retrieving the user input values
function collectData() {
    const dateSeen = $("#datepicker").val();
    const alienType = $(".radio_buttons :radio:checked").attr("value");
    const alienWeight = $("#weight").slider("option", "value");
    const alienHeight = $("#height").slider("option", "value");
    const numberEyes = $("#eyes").spinner("value");
    const numberArms = $("#arms").spinner("value");
    const numberLegs = $("#legs").spinner("value");
//Creating a javaScript object, of the above values
    let siteReport = new Object();
    siteReport.date = dateSeen;
    siteReport.alienType = alienType;
    siteReport.alienWeight = alienWeight;
    siteReport.alienHeight = alienHeight;
    siteReport.numberEyes = numberEyes;
    siteReport.numberArms = numberArms;
    siteReport.numberLegs = numberLegs;
    siteReport.skinColor = $("#swatch").css("background-color");

//Converting the javaScript Object To a JSON Object
    const alienReport = JSON.stringify(siteReport);
//Parsing the JSON object & creating a heading, for the dialog box
    const confirm = JSON.parse(alienReport);
    const heading = "<h4 className=\"ui-state-default ui-corner-all ui-helper-clearfix\" style=\"padding:4px; background: #906bff; text-align: center; margin-top: 0;\">Alien Sighting Report & Json Data<h4>"
//Displaying the input values, within the dialog box, as a confirmation for the user
    results.innerHTML = heading + "Date:&emsp;" + confirm.date + "<br>" + "Type:&emsp;" + 
        confirm.alienType + "<br>" + "Weight:&emsp;" + confirm.alienWeight + " lbs.<br>" + 
        "Height:&emsp;" + confirm.alienHeight + " ft.<br>" + "Eyes:&emsp;" + confirm.numberEyes + 
        " eyes<br>" + "Arms:&emsp;" + confirm.numberArms + " arms<br>" + "Legs:&emsp;" + 
        confirm.numberLegs + " legs<br>" + "Color:&emsp;" + confirm.skinColor + "<br><br>" + 
        "JSON:<br>" + alienReport;
};


$(document).ready( () =>{

    //Initialize Color Picker For Alien Skin Tone
    var colorPicker = new iro.ColorPicker('#color_wheel',{
        width: 150,
        color: "#30a321",
        layoutDirection: "horizontal"
    });
    
    //Initialize jQuery-UI Widgets (datepicker, radio buttons, spinners, sliders, button & dialog)
    $(function() {
        $("#datepicker").datepicker({
           altField: "#date"
        });

        $( "input[type='radio']" ).checkboxradio({
            icon: false
        });

        $(".spinner").spinner({
            min: 0,
            max: 10
        });

        $( "#weight" ).slider({
            min: 0,
            max: 300,
            step: 10,
            value: 50,
            change: function(event, ui){}
        });
        $( "#height" ).slider({
            min: 0,
            max: 10,
            step: .5,
            value: 2,
            change: function(event, ui){}
        });
                                                  //Remember this, going forward
        $("button").button();           //Button tries to submit, when used within a form.  Solution is
       //$("#opener").button();         is to either use an input, with type="button" or simply name 
        $("#dialog").dialog({           //the object and issue a preventDefault.  I have included the
            autoOpen: false,                //alternte solution and commented it out.
            width: 465,
            hide: { effect: "bounce", times: 5, distance: 150},
            show: ("highlight",{color:"#ffffff"}, 2000),
            close: function() {
                fadeOut.play();
                $("#opener").attr("disabled", false);
            },
            open: function()  {
                $("#opener").attr("disabled", true);
            }            
        });

        $("#opener").click(function(evt) {
            $("#dialog").dialog("open");
            evt.preventDefault();   //This line not needed if input of type button is used, as above
            fadeIn.play();
            collectData();            
            
        });
    });

//Event listeners for sliders and color pickker, so that changes to the DOM can be made upon change
    $("#weight").on("slidechange", creatureWeight);
    $("#height").on("slidechange", creatureHeight);
    colorPicker.on("color:change", function(color){
        let hex = colorPicker.color.hexString;
        $("#color").val(hex);
        $("#swatch").css("background-color", hex);
    });
});
