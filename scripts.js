$(document).ready(function () {

    //Displaying current date in the head
    var toDay = moment().format('dddd, MMMM Do');
    var currentDate = $("#currentDay");
    currentDate.text(toDay);

    //At load get Reminder
    var storedPlans = JSON.parse(localStorage.getItem("storedPlans"));
    if (storedPlans !== null) {
        planTextArr = storedPlans;
    }
    else {
        planTextArr = new Array(9);
        planTextArr[4] = "Don't Forget to take your lunch";
    }
    var plannerDiv = $(".container");
    plannerDiv.empty();


    //Create rows inside for timeblock
    for (var hour = 11; hour <= 19; hour++) {
        var index = hour - 9;
        var timeblock = $("<form>");
        timeblock.attr({ "class": "row" });
        //Create time Field
        var timeDiv = $("<div>");
        var displayHour = 0;
        var am_or_pm = "";
        if (hour > 12) {
            displayHour = hour - 12;
            am_or_pm = "pm";
        }
        else {
            displayHour = hour;
            am_or_pm = "am";
        }
        console.log(displayHour, am_or_pm);
        timeDiv.text(`${displayHour} ${am_or_pm}`);
        timeDiv.attr({ "class": "col-md-2 hour" });
        //timeblock.append(timeDiv);

        //create scheduler data
        var dataDiv = $("<div>");
        dataDiv.attr({ "class": "col-md-9 description p-0" })
        var planData = $("<textarea>");
        planData.attr('id', `input-${index}`);
        planData.attr('hour-index', index);
        planData.attr('type', 'text');
        dataDiv.append(planData);
        planData.val(planTextArr[index]);
        if (hour < moment().format("HH")) {
            planData.attr({ "class": "past" });
        }
        else if (hour ==moment().format("HH")) {
            planData.attr({ "class": "present" });
            //planData.a.css("background-color","red");
            console.log("red");
        }
        else if (hour > moment().format("HH")) {
            planData.attr({ "class": "future" });
        }

        //Create save button

        var saveButton = $("<i class='far fa-save fa-lg'></i>")
        var savePlan = $("<button>").attr({ "class": "col-md-1 saveBtn" });
        savePlan.attr('id', `saveid-${index}`);
        savePlan.attr('save-id', index);
        savePlan.append(saveButton);
        timeblock.append(timeDiv, dataDiv, savePlan);
        $(".container").append(timeblock);
    }

    $(".saveBtn").on('click',function (event) {
        event.preventDefault();
        var getIndex = $(this).attr('save-id');
        console.log(getIndex);
        var inputId = '#input-' + getIndex;
        var getValue = $(inputId).val();
        console.log(getValue );
        alert(getValue);
    
        planTextArr[getIndex] = getValue;
        localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
    });
    
});
