---
external: false
draft: false
title: Play UNO! Card Game in Neptune with Redis - GitHub Project Available
description: I love playing card games, one of them is Uno! and this month I tried to replicate it in Neptune just using UI5 objects, JavaScript, Redis and CSS. Today I want to share the project available for everyone on my personal GitHub!
date: 2024-05-14
---
![Blog Banner](/images/neptune-uno-card-game/banner.png)

## Overview
I love playing card games, one of them is **{% ExternalUrl url="https://en.wikipedia.org/wiki/Uno_(card_game)" label="Uno!" /%}** and this month I tried to replicate it in **Neptune** just using **UI5 objects**, **JavaScript**, **Redis** and **CSS**.

Today I want to share the project available for everyone on my personal **GitHub**! At the end of the blog you will also find a **full play demo**.

A big thank you to my wife that gave me the idea.
{% ImageCustom src="/images/neptune-uno-card-game/1.gif" alt="Neptune Uno Card Game - Small GIF" width="700" height="500" /%}

## Prerequisites
- Planet 9 (**Open Edition DXP 23** or higher)
- **Redis** installed / configured in the cockpit settings (you can follow my **[Getting Started](/blog/getting-started-with-redis-planet9)**)

## Installation
- Open your **Planet 9** instance and go inside the **Development Package** section
- Select the **Import > Git** option
{% ImageCustom src="/images/neptune-uno-card-game/2.png" alt="Import project from GitHub repository" width="260" height="110" /%}
- In **Remote Repository URL** paste my **GitHub** repository
```html 
https://github.com/fabriziopace/neptune-uno-card-game.git
```
- Click now on the **OK** button, this will import **all artifacts** used in this project
{% ImageCustom src="/images/neptune-uno-card-game/3.png" alt="Import project from GitHub repository" width="480" height="330" /%}
- You will find a new **tile** in the **Neptune Cockpit > Entertainment** section
{% ImageCustom src="/images/neptune-uno-card-game/4.png" alt="New tile in Neptune Cockpit - Entertainment section" width="270" height="200" /%}
- Have fun!

## The room creation
When the user access the first time to the application can **create a new room**.
{% ImageCustom src="/images/neptune-uno-card-game/5.png" alt="Room creation" width="280" height="250" /%}

## Join in the room
In order to join in the room the host will send the link got from the **share button** in the **header menu** to other user. Example:
```html 
http://localhost:8080/app/uno_card_game?room=NeptuneCommunity
```
{% ImageCustom src="/images/neptune-uno-card-game/6.png" alt="Waiting room" width="430" height="320" /%}
Then the user can enter the **username** and **join**.
{% ImageCustom src="/images/neptune-uno-card-game/7.png" alt="User join in the room" width="280" height="180" /%}

## Game interface
- In the **header bar** we have the **room** / **opponent user data** and the button to exit from the room
- In the body **two cards hands** are rendered once the game starts, in addition of the **deck** and the **pile**
- Below we have a footer containing three **action buttons** (getting a new card, skip the turn or calling uno), **your user data** and the **current color**
- A **crown** will be visible near the user when he will get **his turn** and only **playable cards** will be **enabled**
{% ImageCustom src="/images/neptune-uno-card-game/8.png" alt="Game interface" width="635" height="515" /%}

## How it works
In the **App Designer** I created **four sap.m.List** elements containing the **opponent** and **personal hands**, the **deck** and the **pile**.
{% ImageCustom src="/images/neptune-uno-card-game/9.png" alt="App designer structure" width="280" height="290" /%}
When the game starts all cards are built in the **startGame** function, where for each of them an **id** is generated (to move a specific card from a list to another when needed). 

The deck is shuffled and each user gets seven cards. 

On any **user action** like getting a new card or skipping the turn the **data** is sent using **Neptune Events** to the other user.
{% ImageCustom src="/images/neptune-uno-card-game/10.png" alt="Game data sent via Neptune Events - Redis" width="700" height="390" /%}

## Rules
 The game tries to follow the **{% ExternalUrl url="https://en.wikipedia.org/wiki/Uno_(card_game)" label="official rules" /%}** and is composed of **108 cards** in total (excluding one **"Wild Shuffle Hands"** and three **"Wild Customizable"**).

The first user to get rid of all personal hand cards wins the game.
{% ImageCustom src="/images/neptune-uno-card-game/11.png" alt="All game cards" width="700" height="306" /%}

## What's next
- Allow to invite **more users** to play the game (currently maximum 2 per room)
- The game interface can be improved with **smoother animations**
- **JavaScript** code can be adapted for **further logics** like having more **rounds** and **counting user points**
- **Cards** data can be moved to a **Planet 9 table**

## What I learned
I had a lot of fun and improved my skills using **SCSS**. For example **nesting CSS selectors**, writing **variables** and **mixin** to reuse a group of properties in many places or even **looping list items** to apply an incremental **rotation** and **z-index** on cards hands / pile.
```scss
$rotateMyCardDeg: -10;
$rotateOppCardDeg: 10;
 
@for $i from 1 through 100 {
    $rotateMyCardDeg: $rotateMyCardDeg + 1;
 
    .listMyCards li:nth-child(#{$i}) {
        z-index: $i;
        rotate: $rotateMyCardDeg + deg;
    }
 
    $rotateOppCardDeg: $rotateOppCardDeg - 1;
 
    .listOppCards li:nth-child(#{$i}) {
        z-index: $i;
        rotate: $rotateOppCardDeg + deg;
    }
}
```
Was challenging building all **UNO! cards** assigning **custom data** to each list item: 

```javascript
// based on value property style the card
let cardValue = "";
 
if (
    value !== "skip" &&
    value !== "reverse" &&
    value !== "drawtwo" &&
    value !== "wild" &&
    value !== "wilddrawfour"
) {
    cardValue = value;
}
 
this.data("value", value, true);
return cardValue;
```
And then using **SCSS** to apply **colors** and **UI5 icons**:
{% ImageCustom src="/images/neptune-uno-card-game/12.png" alt="Wild draw four card built with CSS" width="200" height="265" /%}
```scss
// mixin for common styles
@mixin wildIcon($sapIcon: "") {
    content: $sapIcon;
    font-family: SAP-icons;
    font-style: normal;
    font-weight: normal;
    background: linear-gradient(to right, $redColor 0%, $redColor 50%, $blueColor 50%, $blueColor 100%), linear-gradient(to right, $yellowColor 0%, $yellowColor 50%, $greenColor 50%, $greenColor 100%);
    background-size: 100% 50%;
     background-position: center top, center bottom;
    background-repeat: no-repeat;
     -webkit-background-clip: text;
    background-clip: text;
     -webkit-text-fill-color: transparent;
}
 
// wild cards
[data-value="wild"].textCardStyle:after {
    @include wildIcon($sapIcon: '\e145');
}
 
// wild draw four cards
[data-value="wilddrawfour"].textCardHeader:after,
[data-value="wilddrawfour"].textCardFooter:after {
    content: '+4';
    fill: $whiteColor;
}
 
[data-value="wilddrawfour"].textCardBody:after {
    @include wildIcon($sapIcon: '\e0bc');
}
```

## Demo
I created a GIF (it may require some time to load):
{% ImageCustom src="/images/neptune-uno-card-game/13.gif" alt="Uno card game in Neptune - full play demo" width="700" height="500" /%}

## Other links
**Redis** involved blogs
- [Getting started with Redis and Planet 9](/blog/getting-started-with-redis-planet9)
- {% ExternalUrl url="https://community.neptune-software.com/topics/tips--tricks/blogs/getting-started-with--drag-and--drop---events-with--r" label="Getting started with Drag and Drop & Events with Redis" /%}
- {% ExternalUrl url="https://community.neptune-software.com/topics/planet-9/blogs/queue-management--applications" label="Queue management Applications" /%}
- [JD Bingo – Game built in 1 day with Planet 9 and Redis](/blog/jd-bingo-game-built-with-planet9-redis)

**UI5 icons** usage by **CSS content** property
- [How to change standard icons of UI5 elements with CSS](/blog/how-to-change-standard-icons-of-ui5-elements-with-css)

**SCSS** tutorials
- {% ExternalUrl url="https://sass-lang.com/guide/" label="Sass Basics" /%}
- {% ExternalUrl url="https://sass-lang.com/documentation/at-rules/control/for/" label="@for Sass Documentation" /%}

My motto: always make sure to have fun to unlock your limits!

Wish you all to reach and make your dreams real.

Happy coding and remember to call UNO! :)