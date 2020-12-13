$(document).ready(function () {
    //Displaying current date in the heard
    var toDay = moment().format('dddd, MMMM Do');
    var currentDate = $("#currentDay");
    currentDate.text(toDay);
    currentHow24=13;

    //Create rows inside for timeblock
    for (var hour = 9; hour <= 17; hour++) {
        var index=hour-9;
        var timeblock=$("<form>");
        timeblock.attr({"class":"row"});
        $(".container").append(timeblock);
        //Create time Field
        var timeDiv=$("<div>");
        var displayHour = 0;
        var am_or_pm = "";
        if (hour > 12) 
        {
            displayHour = hour - 12;
            am_or_pm = "pm";
        } 
        else 
        {
            displayHour = hour;
            am_or_pm = "am"
        }
        console.log(displayHour,am_or_pm);
        timeDiv.text(`${displayHour} ${am_or_pm}`);
        timeDiv.attr({"class":"col-md-2 hour"});
        //timeblock.append(timeDiv);
        
        //create scheduler data
        var dataDiv=$("<div>");
        dataDiv.attr({"class": "col-md-9 description p-0"})
        var planData=$("<textarea>");
        dataDiv.append(planData);
        planData.attr('id',`input-${index}`);
        planData.attr('hour-index',index);
        //planData.attr('type','text');
        if(hour <  moment().format("HH")){
            planData.attr({"class":"past"})
        }
        else if(hour === moment().format("HH"))
        {
            planData.attr({"class":"present"})
        }
        else if(hour >  moment().format("HH"))
        {
            planData.attr({"class":"future"})
        }

        //Create save button

        var saveButton = $("<i class='far fa-save fa-lg'></i>")
        var savePlan = $("<button>") .attr({"class": "col-md-1 saveBtn" });
        savePlan.append(saveButton);
         timeblock.append(timeDiv, dataDiv, savePlan);
    }

}
);
