---
external: false
draft: false
title: JD Bingo – Game built in 1 day with Planet 9 and Redis
description: JD Bingo - A game developed in 1 day with Neptune Software Open edition and Redis. 
date: 2023-01-01
---
![Blog Banner](/images/jd-bingo-game-built-with-planet9-redis/banner.png)

## Overview
The 2022 is over, was a big year for me including the amazing Hackathon and Impact events in June. Since I started to work with the Neptune platform I wanted to create a game, so finally here is the idea: a bingo developed with P9 and Redis.

## The room creation
When the user access the first time to the application can create a new room. In this process a structure containing the room data will be saved in cache (IndexedDB).
{% ImageCustom src="/images/jd-bingo-game-built-with-planet9-redis/1.png" alt="Create Room Dialog" width="360" height="350" /%}

## Room host interface
In the header bar we have the room/user data and three buttons that enables you to: 
- turn on/off the music;
- share the room link to other users;
- exit from the room.

Below we have:
- users online box;
- new number box where the host has the button for get new ones;
- bingo overview. 
{% ImageCustom src="/images/jd-bingo-game-built-with-planet9-redis/2.png" alt="Bingo Overview" width="700" height="500" /%}

## Join in the room
In order to join in the room the host will send the link got from the button on the header menu to the other users. Example:
```html
http://localhost:8080/app/jd_bingo?room=JDBINGO2023
```
Then the user can enter the username and join.
{% ImageCustom src="/images/jd-bingo-game-built-with-planet9-redis/3.png" alt="Join in the Room Dialog" width="300" height="250" /%}

## User interface
The user interface is similar to the host one, in addition a random bingo ticket will be generated.
{% ImageCustom src="/images/jd-bingo-game-built-with-planet9-redis/4.png" alt="User Interface" width="700" height="500" /%}

## How Redis works with Planet 9
First of all I installed a Redis server on a Linux machine, then used the corresponding URI under System Settings > Database (In-memory database).
In the Events section of the cockpit I created the sendNewNumber event.
{% ImageCustom src="/images/jd-bingo-game-built-with-planet9-redis/5.png" alt="Redis Planet 9 Settings" width="340" height="280" /%}
In the App Designer I created the **neptune.events.Trigger** and **neptune.events.Listener** elements, assigning the corresponding event in the attributes panel.
{% ImageCustom src="/images/jd-bingo-game-built-with-planet9-redis/6.png" alt="App Designer Events Elements" width="200" height="50" /%}
In the **press** event of the **"Get New Number"** button I generated a random number from 1 to 90 and then called the trigger function passing the new int as a parameter. In this way the host will send the new number to the other users connected.
```javascript
let newNumber = getNewNumber();
textNewNumber.setText(newNumber);
tableBingoHost.getModel().refresh(true);
triggersendNewNumberTrigger({number: newNumber});
```
In the **action** event of the **sendNewNumberListener** element the new number is received and the tables are updated.
```javascript
if (!appContext.isHost) {    
    ModelData.Add(GtBingoNumbers, { number: data.number });    
    setCacheGtBingoNumbers();
    textNewNumber.setText(data.number);    
    tableBingoHostMini.getModel().refresh(true);    
    tableBingoUser.getModel().refresh(true);
}
```

## What’s next
When the game starts the host get new numbers. The first user to get all 15 numbers in their ticket win the game.

## Demo
I created a GIF (it may require some time to load):
{% ExternalUrl url="/images/jd-bingo-game-built-with-planet9-redis/7.gif" label="View GIF" /%}

## What I learned
Using Redis in P9 applications has a huge potential, I want to give a big thank you to the engineering team and everyone else involved in this release.


Wish you all a Happy New Year!