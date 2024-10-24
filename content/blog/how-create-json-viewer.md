---
external: false
draft: false
title: How to create a JSON Viewer in Neptune DXP (SAP Edition)
description: The JSON Viewer is a tool that helps the user to visualize and understand the JSON data in a hierarchical tree-like structure and quickly identify errors. Today I want to share how to create a JSON Viewer using the Monaco Editor and the Network Graph UI5 element.
date: 2024-10-24
banner: /images/how-create-json-viewer/banner.png
---

![Blog Banner](/images/how-create-json-viewer/banner.png)

## Overview

The **JSON Viewer** is a tool that helps the user to **visualize** and **understand** the JSON data in a **hierarchical tree-like** structure and quickly identify errors.

There are various **online tools** and **browser extensions** that offer this functionality but I tried to build it in **Neptune DXP (SAP Edition)**.

Today I want to share how to create a **JSON Viewer** using the **Monaco Editor** and the **Network Graph** UI5 element.
{% ImageCustom src="/images/how-create-json-viewer/1.png" alt="JSON Viewer in Neptune DXP" width="630" height="270" /%} 

## Working in the App Designer

- Create a new application
- If you are using the **App Designer** from the **SAP GUI** make sure to select the **sap.suite** option in the **App Library** settings
- Set the **SAP Horizon Dark** theme
- Open the **Header** section and paste the following code to include the **monaco.js** library in our application
```html
<script src="/neptune/server/js/monaco/bundle/monaco.js"></script>
```
- The final result of the **App Designer** structure will be like that
{% ImageCustom src="/images/how-create-json-viewer/2.png" alt="App Designer structure" width="300" height="370" /%} 
- Create the following elements: **Shell > App > Page**
- Select the **Shell** element and set the **appWidthLimited** property to **false**
- In **Resources** create a new folder with inside two **JavaScript** elements (**initialize** and **buildGraphData**)
- Add a new **sap.ui.layout.Splitter** element inside the **Page**
- In the **Splitter** element add the **sap.ui.core.HTML** and **sap.suite.ui.commons.networkgraph.Graph** elements
- Select the **HTMLObject** element and insert the following code in the **content** property
```html
<div id='jsonEditor' style='height: 100%'></div>
```
- Inside the **HTMLObject** add the **sap.ui.layout.SplitterLayoutData** object with the **size** property equal to **25%**
- Select the **Graph** element, set the **orientation** property equal to **TopBottom** and **renderType** equal to **Svg**, assign then the **Model Source** as **Generic Object**
{% ImageCustom src="/images/how-create-json-viewer/3.png" alt="Graph element settings" width="515" height="385" /%} 
- Inside the **Graph** element add the **sap.suite.ui.commons.networkgraph.Node** and **sap.suite.ui.commons.networkgraph.Line** elements
- Select the **Node** object, assign the **Model Path** equal to **/NODES** and bind the following properties: **height, icon, key, shape, status, title** and **width**. Make sure to assign the **maxWidth** equal to **1000** and the **styleClass** equal to **nodeStyle**
{% ImageCustom src="/images/how-create-json-viewer/4.png" alt="Node element settings" width="515" height="385" /%} 
- Add a new **sap.suite.ui.commons.networkgraph.ElementAttribute** and **sap.suite.ui.commons.networkgraph.NodeImage** elements inside the **Node** object
- The **ElementAttribute** element needs to have the **Model Path** equal to **ATTRIBUTES** and the following properties binded: **label, value**
{% ImageCustom src="/images/how-create-json-viewer/5.png" alt="ElementAttribute settings" width="515" height="385" /%} 
- Select the **NodeImage** element, bind the **src** property and assign the **height** and **width** properties equal to **100**
{% ImageCustom src="/images/how-create-json-viewer/6.png" alt="NodeImage element settings" width="515" height="385" /%} 
- In the **Line** object use the **Model Path /LINES**, bind the **from** and **to** properties and assign the **arrowOrientation** property equal to **None**
{% ImageCustom src="/images/how-create-json-viewer/7.png" alt="Line element settings" width="515" height="385" /%} 
- In the **buildGraphData** element use the following **JavaScript** code {% ExternalUrl url="https://github.com/fabriziopace/neptune-blog-create-json-viewer/blob/main/buildGraphData.js" label="buildGraphData.js - GitHub" /%}
- We can create the **Monaco Editor** and call the function in the **initialize** script {% ExternalUrl url="https://github.com/fabriziopace/neptune-blog-create-json-viewer/blob/main/initialize.js" label="initialize.js - GitHub" /%}
- Finally let’s add few lines of **CSS** in the **Stylesheet** section {% ExternalUrl url="https://github.com/fabriziopace/neptune-blog-create-json-viewer/blob/main/style.css" label="style.css - GitHub" /%}
- You can use this **JSON** to test the application {% ExternalUrl url="https://github.com/fabriziopace/neptune-blog-create-json-viewer/blob/main/example.json" label="example.json - GitHub" /%}

## How it works

In the **initialize** script when the **HTMLObject** is rendered the **Monaco Editor** is created.

When the user enters a JSON in the editor the **onDidChangeModelContent** method is executed in order to build the graph model.

In the **buildGraphData** script a **recursive function** is used to navigate inside all **JSON objects** and add all required **nodes** and **lines**.

Finally the model is assigned to the graph element.

## Result

Here a GIF (it may require some time to load):
{% ImageCustom src="/images/how-create-json-viewer/8.gif" alt="How to create a JSON Viewer in Neptune DXP" width="638" height="260" /%}

## What's next

- The JavaScript / CSS code can be improved and readapted for specific scenarios
- Additional features like the export of the graph can be added

Hope this helps

Happy coding!