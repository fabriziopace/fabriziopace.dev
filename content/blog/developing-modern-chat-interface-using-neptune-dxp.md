---
external: false
draft: false
title: Developing a Modern Chat Interface using Neptune DXP
description: Neptune DXP helps developers to build amazing applications. Today I want to share a Modern Chat Interface built using Neptune DXP and the UI5 library.
date: 2025-03-29
banner: /images/developing-modern-chat-interface-using-neptune-dxp/banner.png
---
![Blog Banner](/images/developing-modern-chat-interface-using-neptune-dxp/banner.png)

## Overview
**Neptune DXP** helps developers to build amazing applications.

Today I want to share a **Modern Chat Interface** built using **Neptune DXP** and the **UI5** library.
{% ImageCustom src="/images/developing-modern-chat-interface-using-neptune-dxp/1.png" alt="Modern Chat Interface built using Neptune DXP" width="700" height="340" /%}

## Chat Interface
- In the **header bar** there are two **buttons** to expand / collapse the **sidebar** and start a new **chat**, the **search field** and the **user avatar**
- The **sidebar** is composed by a list of **chats** grouped by date and the **application settings**
- When a chat is selected the detail will be rendered on the right and each **bot answer** will have a series of **action buttons**

## Typewriter Effect
The **typewriter** effect in the **bot chat** is done with an **interval** where each character is added to the data model. The function can be improved and maybe CSS can be used too.

```javascript
function startTypewriterEffect(dataChat, dataListChat, lastChatIndex) {
    // function to simulate the typewriter effect in the bot message
    var indexChatText = 0;
    const intervalChatText = setInterval(function () {
        if (dataChat && indexChatText < dataChat.text.length) {
            dataListChat[lastChatIndex].text += dataChat.text[indexChatText];
            indexChatText++;
            modellistChat.setData(dataListChat);
        } else {
            // clear interval when all chat text is rendered
            clearInterval(intervalChatText);
            dataListChat[lastChatIndex].typing = false;
            modellistChat.setData(dataListChat);
            lastChatIndex++;
        }
    }, 10); // typing speed (milliseconds)
}
```

## What's next
- The **interface** can be improved and adapted for specific requirements and scenarios
- The **frontend** could interact with the **backend** through **APIs**, allowing easy integration and future scalability

## Result
Here a GIF, it may require some time to load:
{% ImageCustom src="/images/developing-modern-chat-interface-using-neptune-dxp/2.gif" alt="Gif of a Modern Chat Interface built using Neptune DXP" width="700" height="340" /%}

## Contact us
Looking for a similar solution or want to work with us? {% ExternalUrl url="https://jdtech.it" label="Get in touch today!" /%}