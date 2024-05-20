---
external: false
draft: false
title: How to add custom texts in Calendar special dates with CSS
description: In UI5 there are nice components like the Planning Calendar that allow us to display multiple rows with appointments, but we could have the requirement to use the sap.ui.unified.Calendar element. Today I want to share how add custom texts inside specific days using the specialDates aggregation, tooltip and CSS.
date: 2024-02-02
banner: /images/how-to-add-custom-texts-in-calendar-special-dates-with-css/banner.png
---

![Blog Banner](/images/how-to-add-custom-texts-in-calendar-special-dates-with-css/banner.png)

## Overview

In UI5 there are nice components like the **Planning Calendar** that allow us to display multiple rows with **appointments**, but we could have the requirement to use the **sap.ui.unified.Calendar** element.

Today I want to share how add **custom texts** inside specific days using the **specialDates** aggregation, **tooltip** and **CSS**.
{% ImageCustom src="/images/how-to-add-custom-texts-in-calendar-special-dates-with-css/1.png" alt="Calendar with special dates" width="570" height="350" /%} 


## Working in the App Designer

- I added a new **sap.ui.unified.Calendar** element in my app, then created a new **CSS class** in the **styleClass** property 
{% ImageCustom src="/images/how-to-add-custom-texts-in-calendar-special-dates-with-css/2.png" alt="StyleClass Calendar property" width="350" height="90" /%} 
- In the **attachInit** add some **special dates** to the calendar using the **addSpecialDate** method that accepts the **DateTypeRange** element
```javascript
try {
     sap.ui.getCore().attachInit(function (data) {
        // using example data
        let calendarData = [
            {
                 startDate: "2024-02-22",
                 type: "Type01",
                 tooltip: "Webinar",
            },
            {
                 startDate: "2024-02-11",
                 type: "Type03",
                 tooltip: "Event",
            },
            {
                 startDate: "2024-02-01",
                 type: "Type07",
                 tooltip: "Project",
            },
            {
                 startDate: "2024-02-07",
                 type: "Type10",
                 tooltip: "Flight",
            },
        ];
 
        for (let a = 0; a < calendarData.length; a++) {
             Calendar.addSpecialDate(
                new sap.ui.unified.DateTypeRange({
                     startDate: new Date(calendarData[a].startDate),
                     type: calendarData[a].type,
                     tooltip: calendarData[a].tooltip,
                })
            );
        }
    });
} catch (error) {
     console.log(error);
}
```
- In the **Stylesheet** section use the following code
```css
.customCalendarStyle {
    width: 100% !important;
}
 
.customCalendarStyle .sapUiCalItem {
    height: 60px;
    position: relative;
}
 
.customCalendarStyle .sapUiCalItem[title]::after {
    content: attr(title);
    position: absolute;
    left: 0;
    right: 0;
    width: auto;
    top: 20px;
    font-weight: bold;
}
```

### How it works

Using the **content** CSS property in the **.sapUiCalItem[title]::after** pseudo element we can display the **tooltip** text inside the calendar special dates.
{% ImageCustom src="/images/how-to-add-custom-texts-in-calendar-special-dates-with-css/3.png" alt="Content CSS property to display the tooltip text" width="350" height="70" /%} 

## Result

Here we can see the result:
{% ImageCustom src="/images/how-to-add-custom-texts-in-calendar-special-dates-with-css/4.png" alt="Calendar with special dates custom texts" width="570" height="350" /%} 

## What's next

- The **JavaScript / CSS** code can be improved and readapted for specific scenarios
- A model can be used to create the special dates

## References

{% ExternalUrl url="https://openui5.hana.ondemand.com/api/sap.ui.unified.Calendar#methods/addSpecialDate" label="OpenUI5 Ondemand - sap.ui.unified.Calendar addSpecialDate method" /%}

{% ExternalUrl url="https://openui5.hana.ondemand.com/api/sap.ui.unified.DateTypeRange" label="OpenUI5 Ondemand - sap.ui.unified.DateTypeRange" /%}

Hope this helps

Happy coding!