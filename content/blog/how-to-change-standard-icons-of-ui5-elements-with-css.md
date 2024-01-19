---
external: false
draft: false
title: How to change standard icons of UI5 elements with CSS
description: Using UI5 elements like Input or ComboBox we could have the requirement to change the standard icon. Today I want to share how achieve it using CSS.
date: 2024-01-12
---

![Blog Banner](/images/how-to-change-standard-icons-of-ui5-elements-with-css/banner.png)

## Overview

Using UI5 elements like **Input** or **ComboBox** we could have the requirement to change the standard **icon**.

It can be done using **Javascript**, example:    
```javascript
sap.ui.getCore().attachInit(function (startParams) {    
    ComboBox.addEventDelegate({        
        onAfterRendering: function () {            
            ComboBox.getIcon().setSrc("sap-icon://drill-down");        
        },    
    });
});
```

Today I want to share instead how achieve the same result using **CSS** as alternative.

## Working in the App Designer

- In my case I created a new app with a **SimpleForm** with inside the **Label** and the **ComboBox**
{% ImageCustom src="/images/how-to-change-standard-icons-of-ui5-elements-with-css/1.png" alt="App Designer Structure" width="300" height="220" /%} 
- Select the **Combobox** element and assign a new **CSS class** in the **styleClass** property (in my case **comboCustomIcon**)
{% ImageCustom src="/images/how-to-change-standard-icons-of-ui5-elements-with-css/2.png" alt="StyleClass Property" width="300" height="40" /%} 
- Open the **application** in a **new window** and **inspect** the icon we want to change
{% ImageCustom src="/images/how-to-change-standard-icons-of-ui5-elements-with-css/3.png" alt="Application DOM Inspect" width="600" height="260" /%} 
- The ComboBox standard icon is inside the **before** pseudo-element, in the **content** property
{% ImageCustom src="/images/how-to-change-standard-icons-of-ui5-elements-with-css/4.png" alt="ComboBox CSS property" width="600" height="300" /%} 
- Open now the {% ExternalUrl url="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons" label="UI5 Icon Explorer website" /%} and choose an icon, in my case I will use the **sap-icon//arrow-bottom**
- Click on the **icon** in order to get the **Unicode** in the **right side** of the page
{% ImageCustom src="/images/how-to-change-standard-icons-of-ui5-elements-with-css/5.png" alt="UI5 Icon Explorer" width="280" height="300" /%} 
- In the **StyleSheet** section of the **App Designer** we combine our custom css class with **.sapUiIcon::before**, then inside the **content** property we insert the **Unicode** replacing the x character with **backslash**
```css
.comboCustomIcon .sapUiIcon::before {    
    content: '\e04e';
}
```

## Result

Here we can see the new icon:
{% ImageCustom src="/images/how-to-change-standard-icons-of-ui5-elements-with-css/6.png" alt="ComboBox with the new icon changed with CSS" width="500" height="230" /%} 

Hope this helps

Happy CSS coding!