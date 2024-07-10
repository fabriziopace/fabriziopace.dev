---
external: false
draft: false
title: How to hide the scan gun soft keyboard when scanning barcodes
description: When we build apps for scan guns we could have the requirement to hide the keyboard while a barcode is scanned and show it when the user click on the input. Today I want to share a little workaround that I tried to implement in Neptune.
date: 2024-07-08
banner: /images/how-hide-scan-gun-soft-keyboard-when-scanning-barcodes/banner.png
---
![Blog Banner](/images/how-hide-scan-gun-soft-keyboard-when-scanning-barcodes/banner.png)

## Overview
When we build apps for **scan guns** we could have the requirement to **hide** the **keyboard** while a **barcode** is **scanned** and show it when the user click on the input.

Today I want to share a little workaround that I tried to implement in Neptune.

## Working in the App Designer
- In my example I created in a page a **SimpleForm** with inside various **labels** and **inputs**
{% ImageCustom src="/images/how-hide-scan-gun-soft-keyboard-when-scanning-barcodes/1.png" alt="App Designer structure" width="230" height="250" /%}
- Select now the **inputs** element and add a new **styleClass** (in my scenario **hideKeyboardClass**)
- In the **initialize** script I used the following code where I call my custom **Javascript function disableSoftKeyboard** and set the focus to the material input
```javascript
try {
    sap.ui.getCore().attachInit(function () {
        setTimeout(function () {
            // disable soft keyboard function
            disableSoftKeyboard();
 
            setTimeout(function () {
                inputFormMATNR.focus();
            }, 1000);
        }, 0);
    });
} catch (err) {
    console.log(err);
}
```
- Declare now the new **JavaScript functions**
```javascript
function disableSoftKeyboard() {
    // add in the array all inputs that needs to be 
    // always focused without showing the soft keyboard (android)
    // unless the user click on the input to show it
    var inputsArr = [inputFormMATNR, inputFormMENGE];
 
    inputsArr.map((inputEl) => {
        inputEl.addEventDelegate({
            onAfterRendering: function () { 
                // inputmode = none in combination of type = tel 
                // on the input element blocks
                // the soft keyboard to show up when a barcode is scanned
                disableSoftKeyboardOnInput(inputEl);
            },
        });
    });
}
function disableSoftKeyboardOnInput(inputElement) {
    // set the inputmode = none and type = tel on the input element
    $(".hideKeyboardClass input").attr("inputmode", "none");
    $(".hideKeyboardClass input").attr("type", "Tel");
 
    // when the user click on the input the soft keyboard 
    // is shown with inputmode empty and type = text
    $(".hideKeyboardClass input").click(function () {
        $(".hideKeyboardClass input").attr("inputmode", "");
        $(".hideKeyboardClass input").attr("type", "Text");
    });
}
```

## How it works
We use the attributes **inputmode = none** and **type = tel** to suppress the **virtual keyboard** when the barcode is scanned. 

When the user click on the input the attributes are set back to empty and text in order to display the correct soft keyboard to the user.

## Result 
Here a GIF:
{% ImageCustom src="/images/how-hide-scan-gun-soft-keyboard-when-scanning-barcodes/2.gif" alt="Hide soft keyboard when scanning barcodes" width="580" height="660" /%}

## What's next
- The **onfocusin** / **onfocusout** input events can be used to handle extra requirements (like the **valueHelp** dialog).
- The code can be improved and readapted

## Other links
- Last year I created a blog about an alternative way to hide the soft keyboard:
[How to hide soft keyboard on specific inputs without plugins](/blog/how-hide-soft-keyboard-specific-inputs)

Hope this helps

Happy barcode-scanning!