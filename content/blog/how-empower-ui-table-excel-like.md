---
external: false
draft: false
title: How to empower sap.ui.table by adding Excel-like cells selection and arrow keys navigation without external libraries (Part 1)
description: Working with the sap.ui.Table element there could be the requirement to replicate some Excel functionalities. Today I want to share how I enabled the Excel-like cells selection without using external libraries.
date: 2023-11-13
banner: /images/how-empower-ui-table-excel-like/banner.png
---

![Blog Banner](/images/how-empower-ui-table-excel-like/banner.png)

## Overview

Working with the **sap.ui.table** element there could be the requirement to replicate some **Excel** functionalities.

Today I want to share how I enabled the **Excel-like cells selection** without using external libraries.

This solution will enable also the **arrow keys** navigation between cells.
{% ImageCustom src="/images/how-empower-ui-table-excel-like/1.gif" alt="Empower ui table with excel-like cells selection" width="600" height="250" /%}

## Working in the App Designer

- Open the application in the **App Designer**
- In my scenario I created a simple page with a new **sap.ui.table** element and the following properties:
  | Property | Value |
  | -------- | ------ |
  | **enableCompactMode** | true |
  | **selectionMode** | None |
  | **styleClass** | tableExcelStyle |
  | **visibleRowCount** | 5 |
- Insert some **sap.ui.table.columns** with their **labels**
  {% ImageCustom src="/images/how-empower-ui-table-excel-like/2.png" alt="Columns labels" width="340" height="220" /%}
- Add for each column a **sap.m.input** as child, binding then in the **value** property the field name
  {% ImageCustom src="/images/how-empower-ui-table-excel-like/3.png" alt="Input binding" width="350" height="320" /%}
- This should be the result
  {% ImageCustom src="/images/how-empower-ui-table-excel-like/4.png" alt="App designer objects structure" width="320" height="360" /%}
- Create a new **JavaScript** function with the following code

  {% ExternalUrl url="https://github.com/fabriziopace/neptune-blog-empower-ui-table-excel-like/blob/main/enableExcelFnToUiTable.js" label="GitHub - enableExcelFnToUiTable.js" /%}

- In the **initialize** Script call the new function created

```javascript
try {
  sap.ui.getCore().attachInit(function () {
    // custom js function for add exel functions to sap.ui.Table
    enableExcelFnToUiTable();
  });
} catch (e) {
  console.log("Error from initialize: " + e.toString());
}
```

- Open the **Stylesheet** section and paste the following CSS

```css
/* Table excel CSS style */
.tableExcelStyle .sapUiTableDataCell > .sapUiTableCellInner {
  padding: 0;
}
.tableExcelStyle .sapMInputBaseContentWrapper {
  border: 0px;
}
.tableExcelStyle .sapMInputBaseHeightMargin,
.tableExcelStyle .sapMInputBaseContentWrapper,
.tableExcelStyle .sapMInputBaseInner {
  margin: 0px;
  height: 32px;
}
.tableExcelStyle .sapUiTableCell:focus:not(*:root) {
  outline: none;
}
.customFocusExcelStyle input {
  outline-offset: -2px;
  outline: 2px solid #135699 !important;
}
```

- Create a new **sap.m.popover** with the following properties
  | Property | Value |
  | -------- | ------ |
  | **styleClassPadding** | sapUiContentPadding |
  | **title** | Bulk Edit |
- Insert inside the popover a new **sap.m.input**
  {% ImageCustom src="/images/how-empower-ui-table-excel-like/5.png" alt="Create the popover element with a input inside" width="260" height="70" /%}
- In the **sap.m.input change** event use the following JavaScript code

```javascript
var newValue = informTableBulkEditValue.getValue();

// populate all cells selected
let cellsSelected = $(".customFocusExcelStyle");
let inputObj = null;
if (cellsSelected.length > 0) {
  for (var a = 0; a < cellsSelected.length; a++) {
    if (cellsSelected[a].id) {
      inputObj = sap.ui.getCore().byId(cellsSelected[a].id);
      if (inputObj) {
        inputObj.setValue(newValue);
      }
    }
  }
}

// reset old selections
$(".customFocusExcelStyle").removeClass("customFocusExcelStyle");

// reset input value
informTableBulkEditValue.setValue("");

// close the popover when done
popoverBulkEdit.close();
```

## Result

Here a GIF:
{% ExternalUrl url="/images/how-empower-ui-table-excel-like/7.gif" label="Open GIF" /%}

If we log the model data of the table we can see the fields updated correctly

{% ImageCustom src="/images/how-empower-ui-table-excel-like/6.png" alt="Create the popover element with a input inside" width="700" height="90" /%}

## How it works

In **enableExcelFnToUiTable** Javascript function we first wait the rendering of the **sap.m.page** with the **addEventDelegate** method.

Then to allow the drag cells selection we use the **onmousedown** / **onmousemove** / **onmouseup** events on the **table**.

In the **onmousedown** event we clear the old selections by removing the css class **customFocusExcelStyle**, then using the event parameter we check if the **current element** it's a **input** in order to store it into a variable (we will need it in the **onmousemove** event to understand which is the first cell where the drag started).

In the **onmousemove** event we also check the **current element**. Then we calculate the various rows / cells indexes in order to select also the cells between.

In the **onmouseup** event we open the popover on the last cell selected.

For the arrow keys navigation we use the **onkeydown** event where we do a similar logic based on the key pressed.

## What's next

- The code can be improved and readapted for specific scenarios
- Other elements like combobox or select can be used instead only inputs
- Instead the popover another element can be used (like a menu that opens a new dialog etc...)
- External libraries offers more functionalities so maybe this solution doesn’t work for all scenarios
- In OpenUI5 ondemand there is an example with a similar functionality (with a plugin?):

  {% ExternalUrl url="https://openui5.hana.ondemand.com/entity/sap.ui.table.Table/sample/sap.ui.table.sample.SelectCopyPaste" label="Openui5 Ondemand - Sample: Cell Selection, Copy & Paste" /%}
- I created a [Part 2](/blog/how-to-enable-control-click-multi-cells-selection-on-ui-table) where the Control + Click multi-cells selection is enabled on the table

Hope this helps

Happy cells-selection!
