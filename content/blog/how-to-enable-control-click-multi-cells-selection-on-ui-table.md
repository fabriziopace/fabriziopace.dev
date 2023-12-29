---
external: false
draft: false
title: How to enable Control + Click multi-cells selection on sap.ui.table - Empower sap.ui.table with Excel-like functionalities (Part 2)
description: This blog wants to follow the Part 1, where a sap.ui.table can be enhanced with some Excel-like functionalities. Today I want to share how I enabled the Control + Click multi-cells selection on a grid table without using external libraries.
date: 2023-12-21
---

![Blog Banner](/images/how-to-enable-control-click-multi-cells-selection-on-ui-table/banner.png)

## Overview

This blog wants to follow the [Part 1](/blog/how-empower-ui-table-excel-like), where a **sap.ui.table** can be enhanced with some Excel-like functionalities.

Today I want to share how I enabled the **Control + Click** multi-cells selection on a grid table without using external libraries.
{% ImageCustom src="/images/how-to-enable-control-click-multi-cells-selection-on-ui-table/1.png" alt="Ctrl + Click mult-cell selection on sap.ui.table" width="550" height="290" /%}

## Working in the App Designer

- Open the application created in the previous blog inside the **App Designer**
- You can replace the whole **enableExcelFnToUiTable** JavaScript function with the latest code: {% ExternalUrl url="https://github.com/fabriziopace/neptune-blog-empower-ui-table-excel-like/blob/main/enableExcelFnToUiTable.js" label="GitHub - enableExcelFnToUiTable.js" /%}
- Or eventually you can just change the **onmousedown** event: {% ExternalUrl url="https://github.com/fabriziopace/neptune-blog-empower-ui-table-excel-like/commit/c87fecc8c1ab84c88726fd69b578b8132acbfe74?diff=split&w=0" label="GitHub - Ctrl + click multi-cells selection commit" /%}

## How it works

Inside the **onmousedown** event we check the parameter **e.ctrlKey**. 

If the **Ctrl** key is pressed and we have more than **one cell selected** then we show a popover for the bulk edit.

## Result

Here a GIF:
{% ImageCustom src="/images/how-to-enable-control-click-multi-cells-selection-on-ui-table/2.gif" alt="Ctrl + Click mult-cell selection on sap.ui.table" width="700" height="240" /%}

Hope this helps

Happy Christmas and New Year!