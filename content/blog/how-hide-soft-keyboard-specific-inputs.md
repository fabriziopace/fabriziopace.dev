---
external: false
draft: false
title: How to hide soft keyboard on specific inputs without plugins
description: Working with applications that are used for example by scanguns we could have the requirement to hide the soft keyboard on specific inputs. Today I want to share a little workaround found in a Stackoverflow topic that I tried to adapt for Neptune.
date: 2023-10-31
banner: /images/how-hide-soft-keyboard-specific-inputs/banner.png
---
![Blog Banner](/images/how-hide-soft-keyboard-specific-inputs/banner.png)

## Overview
Working with applications that are used for example by **scanguns** we could have the requirement to hide the **soft keyboard** on **specific inputs** (and not all), but not always we want / have the possibility to use **Cordova** plugins to do it.

Today I want to share a little workaround found in a **Stack Overflow** topic that I tried to adapt for Neptune.
{% ImageCustom src="/images/how-hide-soft-keyboard-specific-inputs/1.png" alt="Hide soft keyboard on specific inputs without plugins" width="250" height="430" /%}

## Working in the App Designer
- Open the application in the **App Designer**
- In my scenario I created a simple page with a form showing some inputs (where **inputWithoutKeyb** will be the input without the soft-keyboard)
{% ImageCustom src="/images/how-hide-soft-keyboard-specific-inputs/2.png" alt="App Designer structure" width="250" height="300" /%}
- Add in the same form a new **sap.ui.core.HTML** element and insert a **select** in the **content** property
{% ImageCustom src="/images/how-hide-soft-keyboard-specific-inputs/3.png" alt="HTML element content property" width="400" height="430" /%}
```html
<select id='hiddenField' />
```
- In the **initialize** Script use the following JavaScript code (we want to set the **readonly** property to the **inputWithoutKeyb** after the rendering of the element and when is focused move the focus to the hidden **select** element (in order to hide the soft-keyboard and be able at the same time to write on it)
```javascript
sap.ui.getCore().attachInit(function (startParams) {  
 htmlHiddenInput.addEventDelegate({    
  onAfterRendering: function () {      
     $("#hiddenField").bind("keypress", function (e) {        
       var inputEl = $("#" + inputWithoutKeyb.sId + " input"); 
       var currentValue = inputEl.val();        
       inputEl.val(currentValue + e.key);      
     });    
   },  
  });  

 inputWithoutKeyb.addEventDelegate({    
   onfocusin: function () {      
    $("#hiddenField").focus();    
   },    
   onAfterRendering: function () {      
    var inputEl = $("#" + inputWithoutKeyb.sId + " input");
    if (inputEl[0]) {                     
     inputEl[0].setAttribute("readonly", "readonly");                
    }
   },  
  });
});
```
- Open the **Stylesheet** section and paste the following css for hide the **select** object 
```css
#hiddenField {    
    position: absolute;    
    top: -100px;
} 
```

## Result
Here a GIF:
{% ExternalUrl url="/images/how-hide-soft-keyboard-specific-inputs/4.gif" label="Open GIF" /%}

A big thank you to the topic / people that gave me the idea:
{% ExternalUrl url="https://stackoverflow.com/questions/10940287/html-mobile-forcing-the-soft-keyboard-to-hide" label="Stack Overflow - HTML Mobile -forcing the soft keyboard to hide" /%}

Codepen:
{% ExternalUrl url="https://codepen.io/bobjase/pen/QrQQvd" label="Codepen - Disable touch device keyboard for input field" /%}

## What's next
- The code can be improved and readapted for specific scenarios
- The select element could be hidden in other ways
- A fake cursor can be implemented on the input like done in the codepen
- This solution don't work for backspace, delete, etc... but with jQuery maybe it can be fixed

Hope this helps

Happy barcode-scanning!