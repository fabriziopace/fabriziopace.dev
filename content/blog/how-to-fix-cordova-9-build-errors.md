---
external: false
draft: false
title: How to fix Cordova 9 build errors
description: Dealing with apps developed in an old Neptune version we could have the requirement to use the Cordova 9 engine. In the build process we can have a series of errors, today I want to share how I solved some of them.
date: 2024-12-11
banner: /images/how-to-fix-cordova-9-build-errors/banner.png
---
![Blog Banner](/images/how-to-fix-cordova-9-build-errors/banner.png)

## Overview
Dealing with apps developed in an **old Neptune version** we could have the requirement to use the **Cordova 9 engine**.

In the build process we can have a series of errors, today I want to share how I solved some of them.

## Could not find com.g00fy2:versioncompare:1.3.4
{% ImageCustom src="/images/how-to-fix-cordova-9-build-errors/1.png" alt="Could not find com.g00fy2:versioncompare error" width="700" height="170" /%}
- In the **Cordova** project folder open the following file
```
\platforms\android\CordovaLib\cordova.gradle
```
- Replace the **com.g00fy2** with **io.github.g00fy2**:
```
import io.github.g00fy2.versioncompare.Version
```
- Also in the **dependencies** at the bottom of the file changing the version to **1.4.0**
```
dependencies { 
    classpath 'io.github.g00fy2:versioncompare:1.4.0@jar'
}
```

## Could not find com.jfrog.bintray.gradle:gradle-bintray-plugin:1.7.3
{% ImageCustom src="/images/how-to-fix-cordova-9-build-errors/2.png" alt="Could not find com.jfrog.bintray.gradle:gradle-bintray-plugin error" width="700" height="118" /%}
- In the **Cordova** project folder open the following file
```
\platforms\android\CordovaLib\build.gradle
```
- Add a new **repository** in the **buildscript**
```
buildscript {
    repositories {
        google()
        jcenter()
        maven { url 'https://repo.grails.org/grails/core/' }
    }
```

## References
A big thank you to this topics / peoples:
- {% ExternalUrl url="https://forum.ionicframework.com/t/build-antroid-app-with-linux-2023-04-and-linux-2023-06-failed-because-it-could-not-resolve-all-artifacts-for-configuration-classpath/234402" label="Ionic Forums - Could not find com.g00fy2:versioncompare:1.3.4" /%}
- {% ExternalUrl url="https://stackoverflow.com/questions/70729933/getting-exception-could-not-resolve-com-jfrog-bintray-gradlegradle-bintray-plu" label="Stackoverflow - Could not resolve com.jfrog.bintray.gradle" /%}

I will update this blog in case of new errors.

Hope this helps

Happy Christmas and New Year to all Neptune community members!