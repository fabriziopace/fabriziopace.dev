---
external: false
draft: false
title: Getting started with Redis and Planet 9
description: Starting from the Neptune DXP 22 – Open Edition LTS we can use a Redis server in our applications. Today I want to share with you how I was able to setup a Redis server in order to create a simple application in the App Designer and trigger an event.
date: 2023-02-24
---
![Blog Banner](/images/getting-started-with-redis-planet9/banner.png)

## Overview
Starting from the Neptune DXP 22 – Open Edition LTS we can use a Redis server in our applications.
Today I want to share with you how I was able to setup a Redis server in order to create a simple application in the App Designer and trigger an event.

## Install and start a new Redis server on Windows
Redis is not officially supported on Windows but we can use the **Windows Subsystem for Linux (WSL2)**, just make sure to use **Windows 11 or 10 (build 19041 and higher)**:
- open the **Windows Command Prompt** in administrator mode, run the following command and restart your machine
```html
wsl --install
```
- if the command is not working you may need to enable the optional features in Windows > Run > **optionalfeatures.exe** and turn on **Virtual Machine Platform**, **Windows Hypervisor Platform** and **Windows Subsystem for Linux**, then restart your machine
- open again the **Windows Command Prompt** and run
```html
wsl
```
- the first time you will need to create a new UNIX username and password
- install Redis with the following commands (enter the password you created before) 
```html
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list

sudo apt-get update

sudo apt-get install redis
```
- run the Redis server 
```html
sudo service redis-server start
```
- you can test the server connection (you will receive PONG response if is running)
```html
redis-cli
ping
```

## Install and start Redis server on other OS
You can find the documentation in the official website:
{% ExternalUrl url="https://redis.io/docs/getting-started/installation" label="Redis Installation" /%}

## Set the Redis URI inside Planet 9 settings
- Open the **Planet 9 Cockpit** and go inside the **System Settings** > **Database**
- In the **In-memory database** input enter the following URI (replace 127.0.0.1 if is not local)
```html
redis://127.0.0.1:6379
```
{% ImageCustom src="/images/getting-started-with-redis-planet9/1.png" alt="In-memory Database Planet9 Setting" width="200" height="130" /%}
- Restart the Planet 9 instance

## Create a new event 
- In the P9 Cockpit go to the **Events** and create a new one (**Event Action** needs to be **App**, as we will use it later in the APP Designer)
{% ImageCustom src="/images/getting-started-with-redis-planet9/2.png" alt="Event settings" width="700" height="200" /%}

## Create the App
- Open the **App Designer** and create a new application
- In HTML5 Document insert the following elements: **sap.m.Shell** > **sap.m.App** > **sap.m.Page** > **sap.m.TextArea**
- In **Resources** create two folders **Redis**, **Javascript**
{% ImageCustom src="/images/getting-started-with-redis-planet9/3.png" alt="App Designer Structure" width="200" height="220" /%}
- Drag and drop a new **EventListener** and **EventTrigger** elements inside the Redis folder
{% ImageCustom src="/images/getting-started-with-redis-planet9/4.png" alt="Events Elements" width="200" height="100" /%}
- Select the **EventTrigger**, rename as **SendText** and under the property **event** select the one created before. This element will be used when the user will change the content of the text area, in order to send the new text via Redis to other users connected in the same app
{% ImageCustom src="/images/getting-started-with-redis-planet9/5.png" alt="Events Trigger Property" width="500" height="340" /%}
- Select the **sap.m.TextArea**. go inside the **liveChange** event and use this code to call the **Event Trigger**
```javascript
let newText = this.getValue();
triggerSendText({text: newText});
```
- Select the **EventListener** element, rename it as **ReceiveText** and set the property **event** with the one created before
- Open the **action** event of the **Listener** element and add the following code, this will update the text area content for all users connected to the app
```javascript
if (data.text) {
    textArea.setValue(data.text);
};
```

## Test the application
Open the app in two different windows and start typing inside the text area.
Here a GIF:
{% ExternalUrl url="/images/getting-started-with-redis-planet9/6.gif" label="Open GIF" /%}

## Other links
You can find more details here:
{% ExternalUrl url="https://community.neptune-software.com/documentation/release-notes-p9/documentation/dxp-release-22-open-edition#event-driven-architecture-eda" label="Event-Driven Architecture (EDA)" /%}

In January i created a simple game using this technology:
[JD Bingo – Game built in 1 day with Planet 9 and Redis](/blog/jd-bingo-game-built-with-planet9-redis)

Hope this basic example can help. 
Happy coding!