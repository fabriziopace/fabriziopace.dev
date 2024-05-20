---
external: false
draft: false
title: How to create a Dynamic Numeric Tile with a sync countdown timer
description: In the Neptune DXP platform it’s possible to give dynamic information to the user by creating for example a NumericContent tile. We are also able to run a custom application in card with the Live application type. Today I want to share how I created a custom tile showing the actual number of Purchase Orders, the time remaining for the next sync with the relative progress bar.
date: 2023-04-06
banner: /images/how-create-dynamic-tile-with-sync-timer/banner.png
---
![Blog Banner](/images/how-create-dynamic-tile-with-sync-timer/banner.png)

## Overview
In the Neptune DXP platform it’s possible to give dynamic informations to the user by creating for example a **NumericContent** tile. We are also able to run a custom application in card with the **Live application** type.

Today I want to share how I created a custom tile showing the actual number of **Purchase Orders**, the time remaining for the next sync with the relative progress bar.
{% ImageCustom src="/images/how-create-dynamic-tile-with-sync-timer/1.png" alt="Dynamic Numeric Tile with sync countdown timer" width="300" height="125" /%}

## Create a new App
- Open the **App Designer** and create a new application
- Inside the **HTML5 Document** element insert the following elements: **sap.m.VBox** > **sap.m.ObjectHeader** > **sap.m.ObjectAttribute**
- Inside the **sap.m.ObjectHeader** insert a new **sap.m.HBox**
- In the **Resource** element create a new **Script** (initialize)
{% ImageCustom src="/images/how-create-dynamic-tile-with-sync-timer/2.png" alt="App Designer Structure" width="300" height="240" /%}
- Select the **sap.m.ObjectHeader** and set the **icon** and **numberUnit** properties (in my case sap-icon://sales-quote and orders)
- Assign a css **styleClass**
{% ImageCustom src="/images/how-create-dynamic-tile-with-sync-timer/3.png" alt="Object Header CSS class" width="300" height="80" /%}
- Select now the **sap.m.HBox** element and also here assign the **styleClass**
{% ImageCustom src="/images/how-create-dynamic-tile-with-sync-timer/4.png" alt="HBox CSS class" width="300" height="70" /%}
- In the **initialize** Script use the following JavaScript code
```javascript
sap.ui.getCore().attachInit(function (data, navObj) {
  let intervalSeconds = 15; // seconds
  let countdownCounter = intervalSeconds;
 
  // test data
  let tileCounter = 593; // tile number
  objectHeader.setNumber(tileCounter);
 
  // countdown interval (each second)
  setInterval(function () {
    objectAttribute.setText("Sync in " + countdownCounter + " seconds");
    $(".hboxProgress").css(
      "width",
      (countdownCounter * 100) / intervalSeconds + "%"
    );
 
    // when reach 0 reset the countdown
    if (countdownCounter === 0) {
      tileCounter++;
      objectHeader.setNumber(tileCounter);
      countdownCounter = intervalSeconds;
    } else {
      countdownCounter--;
    }
  }, 1000);
});
```
- Open now the **Stylesheet** section and paste the following css 
```css
.objectHeader .sapMOH {
    padding: 1rem;
}
.objectHeader .sapUiIcon {
    color: #27ae60;
}
.hboxProgress {
    background: #e67e22;
    height: 5px;
    transition: 1s width;
    width: 100%;
}
```

## Create the Tile
- Open the **Neptune Cockpit** and go to the **Tile** section
- Create a new tile with the following properties
{% ImageCustom src="/images/how-create-dynamic-tile-with-sync-timer/5.png" alt="Tile properties" width="530" height="270" /%}
- In the **layout** section you can set those flags
{% ImageCustom src="/images/how-create-dynamic-tile-with-sync-timer/6.png" alt="Tile layout properties" width="300" height="88" /%}
- And the Tile Size
{% ImageCustom src="/images/how-create-dynamic-tile-with-sync-timer/7.png" alt="Tile layout properties" width="300" height="150" /%}
- You can now assign the tile to a tilegroup and use it on your own launchpad 

## Result
Here a GIF:
{% ExternalUrl url="/images/how-create-dynamic-tile-with-sync-timer/8.gif" label="Open GIF" /%}

## What's next
- Implement a new Ajax in the application for read data from the backend
- Change the CSS style
- Edit the countdown seconds

## Other links
You can find more details here:
{% ExternalUrl url="https://community.neptune-software.com/documentation/run-v06lzx6c/documentation/tile-usqsmheh" label="Tile - Guide - Neptune Software Community" /%}

Happy coding!