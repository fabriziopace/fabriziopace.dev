---
external: false
draft: false
title: How to animate a custom SVG Busy Indicator in a Neptune application
description: The sap.m.BusyIndicator control enables us to customize the loading screen in our application by using a custom icon. Today I want to share a basic example on how to animate a SVG logo and use it as a custom Busy Indicator in a Neptune application.
date: 2025-02-28
banner: /images/how-to-animate-custom-svg-busy-indicator-in-neptune-app/banner.png
---
![Blog Banner](/images/how-to-animate-custom-svg-busy-indicator-in-neptune-app/banner.png)

## Overview
The **sap.m.BusyIndicator** control enables us to customize the **loading screen** in our application by using a custom **icon**.

Today I want to share a basic example on how to animate a **SVG** logo and use it as a custom **Busy Indicator** in a **Neptune** application.
{% ImageCustom src="/images/how-to-animate-custom-svg-busy-indicator-in-neptune-app/1.gif" alt="How to use the sap.ndc.BarcodeScanner in Neptune DXP" width="480" height="260" /%}

## Working with the SVG logo
- Open the **SVG** file with a **notepad**, I will use the {% ExternalUrl url="https://jdtech.it" label="Jdtech Consulting" /%} logo as example
```html
<svg version="1.2"
     xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 190 190"
     width="190"
     height="190">
    <title>Jdtech Consulting</title>
    <style>
        .bg { fill: #285a93 }
        .white-circle { fill: #fefefe }
        .red-circle { fill: #e9422e }
    </style>
    <path class="bg"
          d="m-1.6 0h193v192h-193z" />
    <path class="red-circle circle-one"
          d="m94.9 104.4c4.1 4.5 3.9 11.7-0.5 15.9-4.3 4.3-11.2 4.1-15.3-0.4-4.1-4.6-3.9-11.7 0.5-16 4.3-4.3 11.2-4.1 15.3 0.5z" />
    <path class="red-circle circle-two"
          d="m115.4 84.2c4.1 4.6 3.9 11.7-0.5 16-4.3 4.3-11.2 4.1-15.3-0.5-4.1-4.5-3.9-11.7 0.5-15.9 4.3-4.3 11.2-4.1 15.3 0.4z" />
    <path class="red-circle circle-three"
          d="m135.9 64.1c4.1 4.5 3.9 11.7-0.5 16-4.3 4.2-11.2 4-15.3-0.5-4.1-4.5-3.9-11.7 0.5-16 4.3-4.2 11.2-4 15.3 0.5z" />
    <path class="red-circle circle-four"
          d="m161 26.5c5.9 0.1 10.8 5.2 10.7 11.4 0 6.2-4.9 11.2-10.9 11.2-6-0.1-10.8-5.2-10.8-11.4 0.1-6.2 5-11.3 11-11.2z" />
    <path class="white-circle circle-five"
          d="m140.5 30.8c4.1 4.6 3.9 11.7-0.5 16-4.3 4.3-11.2 4.1-15.3-0.5-4.1-4.5-3.9-11.7 0.5-15.9 4.3-4.3 11.2-4.1 15.3 0.4z" />
    <path class="white-circle circle-six"
          d="m169.2 57.7c4.1 4.6 3.9 11.7-0.4 16-4.4 4.3-11.2 4.1-15.3-0.5-4.1-4.5-3.9-11.7 0.4-15.9 4.4-4.3 11.2-4.1 15.3 0.4z" />
    <path class="white-circle circle-seven"
          d="m112.2 31.6c4.1 4.5 3.9 11.7-0.5 16-4.3 4.2-11.2 4-15.3-0.5-4.1-4.5-3.9-11.7 0.5-16 4.4-4.2 11.2-4 15.3 0.5z" />
    <path class="white-circle circle-eight"
          d="m169.7 85.7c4.1 4.5 3.9 11.7-0.5 15.9-4.3 4.3-11.2 4.1-15.3-0.4-4.1-4.6-3.9-11.7 0.5-16 4.3-4.3 11.2-4.1 15.3 0.5z" />
</svg>
```
- In my scenario I have assigned a **CSS** class for each circle **path** element
- In the **SVG** file we can create a new **CSS animation** with the **keyframe** control and play with the **opacity** and the **animation-delay** properties to animate the logo

```html
<style>
    .bg { fill: #285a93 }
    .white-circle { fill: #fefefe }
    .red-circle { fill: #e9422e }
    .white-circle, .red-circle {
        opacity: 0;
        animation-name: fadeIn;
        animation-iteration-count: infinite;
        animation-duration: 3s;
    }
    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    .circle-one {
        animation-delay: 0.1s;
    }
    .circle-two {
        animation-delay: 0.2s;
    }
    .circle-three {
        animation-delay: 0.3s;
    }
    .circle-four {
        animation-delay: 0.4s;
    }
    .circle-five, .circle-six {
        animation-delay: 0.5s;
    }
    .circle-seven, .circle-eight {
        animation-delay: 0.6s;
    }
</style>
```

## Working in the App Designer
- In the **App Designer** of our application add a **sap.m.BusyIndicator** element outside the **shell** element
{% ImageCustom src="/images/how-to-animate-custom-svg-busy-indicator-in-neptune-app/2.png" alt="App Designer structure" width="250" height="170" /%}
- We can upload the **SVG** file in the **Media Library** and copy the URL
- In the **BusyIndicator** element assign the following **properties**
{% ImageCustom src="/images/how-to-animate-custom-svg-busy-indicator-in-neptune-app/3.png" alt="BusyIndicator properties" width="350" height="180" /%}
- In the **Stylesheet** App Designer section we can style the **BusyIndicator** element
```css
.busyIndicatorCustom {
    z-index: 9999;
    position: fixed;
    width: 100%;
    height: 100%;
    background: #ffffff4a;
}
 
.busyIndicatorCustom .sapMImg {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
}
```
- We are able now to **show / hide** our custom **Busy Indicator** by switching the **visible** property
```javascript
// hide busy
busyIndicatorCustom.setVisible(false);
 
// show busy
busyIndicatorCustom.setVisible(true);
```

## What's next
- Other **CSS properties** can be used to do different animations based on the **SVG** logo structure
- Other **UI5 elements** can be used to display our animated **SVG** logo

## References
- {% ExternalUrl url="https://openui5.hana.ondemand.com/api/sap.m.BusyIndicator" label="OPENUI5 Ondemand - sap.m.BusyIndicator" /%}

Hope this helps

Happy coding!