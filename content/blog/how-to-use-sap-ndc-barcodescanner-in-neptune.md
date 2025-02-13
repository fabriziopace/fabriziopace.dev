---
external: false
draft: false
title: How to use the sap.ndc.BarcodeScanner in Neptune DXP (SAP Edition)
description: In SAPUI5 we have the sap.ndc.BarcodeScanner control that enables us to scan barcodes from a selected image or the device camera. Today I want to share a basic example on how to use it in Neptune DXP.
date: 2025-01-20
banner: /images/how-to-use-sap-ndc-barcodescanner-in-neptune/banner.png
---
![Blog Banner](/images/how-to-use-sap-ndc-barcodescanner-in-neptune/banner.png)

## Overview
In **SAPUI5** we have the **sap.ndc.BarcodeScanner** control that enables us to scan **barcodes** from a selected image or the device camera.

Today I want to share a basic example on how to use it in **Neptune DXP**.
{% ImageCustom src="/images/how-to-use-sap-ndc-barcodescanner-in-neptune/1.png" alt="How to use the sap.ndc.BarcodeScanner in Neptune DXP" width="700" height="150" /%}

## Working in the App Designer
- Create a new **application**, the **App Designer** structure will be like this
{% ImageCustom src="/images/how-to-use-sap-ndc-barcodescanner-in-neptune/2.png" alt="App Designer structure" width="320" height="280" /%}
- In a page add a **sap.m.VBox** with this properties
{% ImageCustom src="/images/how-to-use-sap-ndc-barcodescanner-in-neptune/3.png" alt="New sap.m.VBox" width="320" height="130" /%}
- Inside the **VBox** element add a **sap.m.Avatar** and set this properties
{% ImageCustom src="/images/how-to-use-sap-ndc-barcodescanner-in-neptune/4.png" alt="New sap.m.Avatar" width="330" height="120" /%}
- In the **initialize** script use the following code to load the control
```javascript
neptune.Shell.attachInit(function(data, navObj) {
    // load the sap.ndc.BarcodeScanner control
    sap.ui.require(["sap/ndc/BarcodeScanner"]);
});
```
- In the Avatar **press** event call the **scan** method
```javascript
sap.ndc.BarcodeScanner.scan(
    function(result) {
        // process scan result
        sap.m.MessageToast.show("BarcodeScanner Result: " + result.text);
    },
    function(err) {
        // handle scan error
        console.log("BarcodeScanner Error: " + err);
    },
    function(result) {
        // handle input dialog change
        console.log("Input dialog change: " + result);
    }
);
```

## How it works
In the **initialize** script the **sap.ndc.BarcodeScanner** control is loaded.

When the user clicks on the **Avatar** element the device camera is opened and ready to scan.

## What's next
- The code can be improved and readapted for specific scenarios
- The **scan** method returns other barcode informations like the **format**
- Other methods can be used checking the **API Reference**

## References
- {% ExternalUrl url="https://sapui5.hana.ondemand.com/#/api/sap.ndc.BarcodeScanner" label="SAPUI5 Ondemand - sap.ndc.BarcodeScanner" /%}
- {% ExternalUrl url="https://sapui5.hana.ondemand.com/#/api/sap.ndc.BarcodeScannerButton" label="SAPUI5 Ondemand - sap.ndc.BarcodeScannerButton" /%}

Hope this helps

Happy scanning!