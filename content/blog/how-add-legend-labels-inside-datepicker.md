---
external: false
draft: false
title: How to add legend labels inside the DatePicker popup
description: With sap.m.DatePicker we can use the setLegend method with the sap.ui.unified.CalendarLegend element, but by default it will just add the legend colors without the labels. Today I want to share a little workaround to include also them in the same popup.
date: 2023-03-09
banner: /images/how-add-legend-labels-inside-datepicker/banner.png
---
![Blog Banner](/images/how-add-legend-labels-inside-datepicker/banner.png)

## Overview
With **sap.m.DatePicker** we can use the **setLegend** method with the **sap.ui.unified.CalendarLegend** element, but by default it will just add the legend colors without the labels.
Today I want to share a little workaround to include also them in the same popup.
{% ImageCustom src="/images/how-add-legend-labels-inside-datepicker/1.png" alt="DatePicker with legends labels" width="300" height="400" /%}

## Steps
- In the **App Designer** create a new **sap.m.DatePicker** inside a **Page**
- In **Resources** create two new folders: **Javascript** and **Elements**
- Inside the **Javascript** folder create two new script elements: **loadLegend** and **initialize**
- Inside the **Elements** folder create a new **sap.ui.unified.CalendarLegend** with inside two **CalendarLegendItem** elements
- This should be the result:
{% ImageCustom src="/images/how-add-legend-labels-inside-datepicker/2.png" alt="App Designer structure" width="300" height="300" /%}
- Select now the two **CalendarLegendItem** elements and set the **text** and **type** fields
{% ImageCustom src="/images/how-add-legend-labels-inside-datepicker/3.png" alt="CalendarLegendItem element properties" width="300" height="100" /%}
- In the **loadLegend** script declare the following function
```javascript
function loadLegend() {
    if (datePickerWork) {
        datePickerWork.addEventDelegate({
            onAfterRendering: function () {
                let date = new Date();
                let workoutDays = [12, 14, 16];
                let restDays = [13, 15];
 
                // add workout days to the datepicker
                workoutDays.map((day) => {
                     datePickerWork.addSpecialDate(
                        new sap.ui.unified.DateTypeRange({
                            startDate: new Date(date.setDate(day)),
                            type: calendarLegendItemWorkout.getType(),
                        })
                    );
                });
 
                // add rest days to the datepicker
                restDays.map((day) => {
                     datePickerWork.addSpecialDate(
                        new sap.ui.unified.DateTypeRange({
                            startDate: new Date(date.setDate(day)),
                            type: calendarLegendItemRest.getType(),
                        })
                    );
                });
 
                // set legend to the date picker
                datePickerWork.setLegend(calendarLegend);
            },
        });
    }
}
```
- In the **inizialize** script declare the global object **appContext** with inside the **datePickerLegendBoxAdded** variable and use the **attachInit** function to call **loadLegend**
```javascript
appContext = {
    datePickerLegendBoxAdded: false
};
 
try {
    sap.ui.getCore().attachInit(function () {
        loadLegend();
    });
} catch (err) {
    console.log(err);
}
```
- Now select the **sap.m.DatePicker** element and in the **navigate** event insert the following code
```javascript
if (!appContext.datePickerLegendBoxAdded) {
    appContext.datePickerLegendBoxAdded = true;
    let popup = oEvent.getSource().getAggregation("_popup");
    if (popup) {
        popup.addContent(calendarLegend);
    }
}
```

## How this works
In the **loadLegend** function we first add special dates and set the legend, then inside the **navigate** event of the date picker we add the legend labels box inside the popup just the first time.

Hope this little workaround can help.

Have a wonderful day-picker!