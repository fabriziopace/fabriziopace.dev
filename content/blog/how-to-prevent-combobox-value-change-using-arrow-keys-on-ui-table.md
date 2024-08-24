---
external: false
draft: false
title: How to prevent the ComboBox value change when using Arrow Keys navigation in a sap.ui.Table - Empower sap.ui.table with Excel-like functionalities (Part 3)
description: The arrow keys navigation between comboboxes have an issue, the value of the cell is updated with the previous or next item. Today I want to share how I solved this issue by using the stopPropagation method.
date: 2024-08-05
banner: /images/how-to-prevent-combobox-value-change-using-arrow-keys-on-ui-table/banner.png
---

![Blog Banner](/images/how-to-prevent-combobox-value-change-using-arrow-keys-on-ui-table/banner.png)

## Overview

In the previous blogs ([Part 1](/blog/how-empower-ui-table-excel-like) and [Part 2](/blog/how-to-enable-control-click-multi-cells-selection-on-ui-table)) we saw how to implement some **Excel-like functionalities** in a **sap.ui.Table**.

The **arrow keys navigation** between **comboboxes** have an issue: the value of the cell is **updated** with the previous or next item.

We could try to use the **preventDefault** method but in this case it is not enough.

Today I want to share how I solved this issue by using the **stopPropagation** method.

## Working in the App Designer

- Open the application created in the previous blogs inside the **App Designer**
- You can replace the whole **enableExcelFnToUiTable** JavaScript function with the latest code: {% ExternalUrl url="https://github.com/fabriziopace/neptune-blog-empower-ui-table-excel-like/blob/main/enableExcelFnToUiTable.js" label="GitHub - enableExcelFnToUiTable.js" /%}
- Or eventually you can just change the **onkeydown** event: {% ExternalUrl url="https://github.com/fabriziopace/neptune-blog-empower-ui-table-excel-like/commit/b2559ad4cd142707d99a0daef7575713d2f47464?diff=split&w=0" label="GitHub - Prevent the combobox value change when user navigate with arrow-keys navigation buttons commit" /%}

## How it works

Inside the **onkeydown** event we check first if the **current target** has the combobox class and the key pressed is **ArrowUp** or **ArrowDown**.

Finally we use the **stopPropagation** method to prevent the standard behaviour and fix the issue.

## Result

Here a GIF:
{% ImageCustom src="/images/how-to-prevent-combobox-value-change-using-arrow-keys-on-ui-table/1.gif" alt="Prevent the ComboBox value change when using Arrow Keys navigation in a sap.ui.Table" width="640" height="420" /%}

Hope this helps

Happy holidays and keep rocking!