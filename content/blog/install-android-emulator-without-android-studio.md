---
external: false
draft: false
title: How to install Android emulator without Android Studio for test and debug Neptune Apps
description: In the mobile development world can be useful have an Android emulator ready for test and debug your APKs, but not always we want to install Android Studio in order to achieve it. Let's see how to setup a new brand virtual device using the Android SDK.
date: 2022-08-06
banner: /images/install-android-emulator-without-android-studio/banner.png
---
![Blog Banner](/images/install-android-emulator-without-android-studio/banner.png)

## Overview
In the mobile development world can be useful have an Android emulator ready for test and debug your APKs, but not always we want to install Android Studio in order to achieve it.

Today I want to share with you how I was able to setup a new brand virtual device without Android Studio.

## Prerequisites
- Android SDK
- Java 8 JDK 
- Windows 10/11

## Download the Android SDK
- Download the Android command line tools in this page (**Download options** -> **Command line tools only**)
{% ExternalUrl url="https://developer.android.com/studio" label="Developer Android Studio" /%}
{% ImageCustom src="/images/install-android-emulator-without-android-studio/1.png" alt="Install Android Studio" width="550" height="320" /%}
{% ImageCustom src="/images/install-android-emulator-without-android-studio/2.png" alt="Command line tools only" width="550" height="320" /%}
- Create new folder, e.g. **C:\android-sdk**
- Create new folders **cmdline-tools**, **platforms** and **platform-tools** inside **android-sdk**
- Create new folder **tools** inside **cmdline-tools**
- Open the zip downloaded and extract the folders **bin**, **lib** and the files **NOTICE**, **source.properties** inside **C:\android-sdk\cmdline-tools\tools**
{% ImageCustom src="/images/install-android-emulator-without-android-studio/3.png" alt="android-sdk folder" width="270" height="130" /%}
{% ImageCustom src="/images/install-android-emulator-without-android-studio/4.png" alt="cmdline-tools folder" width="400" height="100" /%}
{% ImageCustom src="/images/install-android-emulator-without-android-studio/5.png" alt="tools folder" width="400" height="100" /%}

## Install Java 8 JDK
- Download and install the 
{% ExternalUrl url="https://download.oracle.com/java/18/archive/jdk-18.0.2_windows-x64_bin.exe" label="Java 8 JDK" /%}

## Download the Android platform
- Open the **windows terminal** as admin and type
```html
cd C:\android-sdk\cmdline-tools\tools\bin
```
- You can now check the list of all packages using 
```html
sdkmanager --list
```
- I will use **system-images;android-33;google_apis;x86_64** (there are also images with the **Google Play Store**) 
- Use this command in order to download the system image
```html
sdkmanager --install system-images;android-33;google_apis;x86_64
```
- Accept all the licenses
- Install the platform-tools using 
```html
sdkmanager "platform-tools" "platforms;android-33"
```

## Create the AVD device
- In the **Windows terminal** use this command to create a new AVD device
```html
avdmanager create avd --name android33 --package "system-images;android-33;google_apis;x86_64"
```
- At this point if you receive errors you can try to enable the **Virtualization Technology** option in your BIOS (**SVM Mode** if you have **AMD** cpu) and install the 
{% ExternalUrl url="https://github.com/intel/haxm/releases/download/v7.7.1/haxm-windows_v7_7_1.zip" label="Intel HAXM" /%}
- Will be asked if you want to create a custom hardware profile, just press enter

## Run the Android Emulator
- In the **Windows terminal** navigate to 
```html
cd C:\android-sdk\emulator
```
- To open the emulator type (in the -m parameter you can give a custom amount of RAM size) 
```html
emulator –avd android33 -qemu -m 3000
```
- At this point if you receive errors you should try to enable the **Virtualization Technology** option in your BIOS (**SVM Mode** if you have AMD cpu) and install the 
{% ExternalUrl url="https://github.com/intel/haxm/releases/download/v7.7.1/haxm-windows_v7_7_1.zip" label="Intel HAXM" /%}
- The first startup will take some time, when done you should see this
{% ImageCustom src="/images/install-android-emulator-without-android-studio/6.png" alt="Android Emulator" width="400" height="600" /%}

## Create a shortcut in order to pin the emulator to the taskbar
- In the **File explorer** go inside **C:\android-sdk\emulator**
- Right click on **emulator.exe** -> Create shortcut
{% ImageCustom src="/images/install-android-emulator-without-android-studio/7.png" alt="Emulator shortcut creation" width="380" height="130" /%}
- Then right click on the shortcut created -> **Properties**
- In the **target** type (in the -m parameter you can give a custom amount of RAM size)
```html
C:\android-sdk\emulator\emulator.exe –avd android33 -qemu -m 3000
```
{% ImageCustom src="/images/install-android-emulator-without-android-studio/8.png" alt="Emulator shortcut properties - custom ram size" width="500" height="150" /%}
- Save and right click again -> **Pin to taskbar**
- At this point the emulator icon is ready to be opened in the Windows taskbar
{% ImageCustom src="/images/install-android-emulator-without-android-studio/9.png" alt="Emulator shortcut pinned to taskbar" width="100" height="50" /%}

## What’s next
- Eventually you edit the Emulator proprieties by editing the **config** file in 
```html
C:\Users\yourUser\android\avd\android33.avd
```
(I suggest to change **hw.camera.back=virtualscene**, **hw.keyboard = yes** and **disk.dataPartition.size=1800M**)
{% ImageCustom src="/images/install-android-emulator-without-android-studio/10.png" alt="Edit emulator properties" width="500" height="200" /%}
- For install a new **APK** just drag and drop the file inside the emulator
{% ExternalUrl url="/images/install-android-emulator-without-android-studio/11.gif" label="Open GIF" /%}
- You can debug your own Neptune application using the **chrome://inspect**
{% ExternalUrl url="/images/install-android-emulator-without-android-studio/12.gif" label="Open GIF" /%}
Happy debugging!