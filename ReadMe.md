# Buddy Pond ( Alpha )
## *a place for buddies*
[https://buddypond.com](https://buddypond.com)

 - Cloud Desktop
 - Multimedia Instant Messaging
 - Chat rooms ( we call them "Ponds" )
 - Live Video and Audio 
 - So many amazing Apps!
 - No followers or following counts, just Buddies
 - Open-Source: Built By Buddies
 - Developer-friendly REST API
 - Desktop download size is < 1MB ( Uncompressed )

## Adding Memes

If you are just looking to add Memes to the Memepool please visit [The Buddy Pond Memepool at Gitlab](https://gitlab.com/Marak1/buddypond-memepool). You can create a quick PR to add memes to the Buddy Pond.

## Quick Start

Buddy Pond is free use at: [https://buddypond.com](https://buddypond.com)

You can sign in immediately with a new unique username and passcode.

<a href="https://buddypond.com"><img src="https://github.com/Marak/buddypond-assets/raw/master/promo/alpha-demo.gif"/></a>
<a href="https://buddypond.com"><img src="https://github.com/Marak/buddypond-assets/raw/master/promo/alphs-screenshot.png"/></a>

## Downloading Buddy Pond

If you want to run your own Buddy Pond it's very simple. Just load the `index.html` file in your browser ( requires a local http server ).

### Installation

Download Buddy Pond as zip... [https://github.com/Marak/buddypond/archive/refs/heads/master.zip](https://github.com/Marak/buddypond/archive/refs/heads/master.zip)

...or you can use `git` to clone Buddy Pond.

```
git clone  --depth 1 git@github.com:Marak/buddypond.git
```

Once you have downloaded a local Buddy Pond you can start it!

### Starting Buddy Pond Locally

```
cd buddypond
python -m SimpleHTTPServer
```

This will start the Buddy Pond application on port 8000. Open http://localhost:8000 in your local browser and you can immediately start adding and messaging buddies!

### Starting Buddy Pond with HTTPS / SSL

The `http://` protocol should support all core features like: Buddy List, Buddy Messaging, and Ponds

The `https://` protocol is required for more advanced features like Video Calls.

To start Buddy Pond over HTTPS / SSL, simply place the *entire* contents of *this* folder into any existing secure web server's public HTML directory and Buddy Pond will be accessible.

### Deploying your Buddy Pond

The easiest way to deploy Buddy Pond is to publish this entire folder to any web hosting platform. Since Buddy Pond is just static HTML, it can be hosted almost anywhere. You'll want to make sure your host has HTTPS / SSL enabled.

## Buddy Pond REST API SDK

Buddy Pond communicates via REST HTTP API calls to the Buddy Pond Server.

Interactive API Testing Page: [https://buddypond.com/sdk/client.html](https://buddypond.com/sdk/client.html)

JavaScript `buddypond.js` SDK API client: `./sdk/buddypond.js`

## cURL REST API Examples


**Sign Up or Get Auth Token for existing account**

```
curl -X POST "https://buddypond.com/api/v3/auth"  -H 'Content-Type: application/json' -d '{"buddyname":"Dave","buddypassword":"asd"}'
```

*Return the `qtokenid` uuid which must be used for all subsequent calls to the API session.*

**Send Buddy Request**

```
curl -X POST "https://buddypond.com/api/v3/buddies/Marak/addbuddy"  -H 'Content-Type: application/json' -d '{"qtokenid":"00e7fa95-ff2c-40d6-a6c0-0bc4457d6196"}'
```

**Send Message To Buddy**

```
curl -X POST "https://buddypond.com/api/v3/messages/buddy/Marak"  -H 'Content-Type: application/json' -d '{"qtokenid":"00e7fa95-ff2c-40d6-a6c0-0bc4457d6196", "text": "hello buddy!"}'
```

**Get Messages**

```
curl -X POST "https://buddypond.com/api/v3/messages/getMessages"  -H 'Content-Type: application/json' -d '{"qtokenid":"00e7fa95-ff2c-40d6-a6c0-0bc4457d6196", "buddyname": "Marak,Dave", "pondname": "Lily"}'
```

**Get Buddy List and Buddy Requests**

```
curl -X POST "https://buddypond.com/api/v3/buddies"  -H 'Content-Type: application/json' -d '{"qtokenid":"00e7fa95-ff2c-40d6-a6c0-0bc4457d6196"}'
```

**Approve Buddy Request**

```
curl -X POST "https://buddypond.com/api/v3/buddies/Marak/approve"  -H 'Content-Type: application/json' -d '{"qtokenid":"00e7fa95-ff2c-40d6-a6c0-0bc4457d6196"}'
```

**Deny Buddy Request**

```
curl -X POST "https://buddypond.com/api/v3/buddies/Marak/deny"  -H 'Content-Type: application/json' -d '{"qtokenid":"00e7fa95-ff2c-40d6-a6c0-0bc4457d6196"}'
```

**Remove Buddy from Buddy List**

```
curl -X POST "https://buddypond.com/api/v3/buddies/Marak/remove"  -H 'Content-Type: application/json' -d '{"qtokenid":"00e7fa95-ff2c-40d6-a6c0-0bc4457d6196"}'
```

## Building custom Buddy Pond `Desktop`

### Example Usage

```js
$(document).ready(function(){
  desktop
    .use('console')
    .use('localstorage')
    .use('settings')
    .use('wallpaper')
    .use('audioplayer')
    .use('tts')
    .use('login')
    .use('notifications')
    .use('buddylist')
    .use('pond')
    .use('streamsquad')
    .use('spellbook', { defer: true })
    .use('profile', { defer: true })
    .use('mirror', { defer: true })
    .use('videochat', { defer: true })
    .use('automaton', { defer: true })
    .ready(function(err, apps){
      // desktop.log("Loaded", desktop.apps.loaded);
      desktop.log('Ready:', 'Buddy Pond', 'v4.20.69')
      });
  });
```

### Building custom Buddy Pond `App`

`desktop.use(appName, params)` will load Buddy Pond Apps which have an `App.load` method.

`App.load` is an async function

**For Example:**

```js
desktop.boo.load = function (params, next) {
  setTimeout(function(){
    // async `App.load` functions *must* continue with their callback
    next(null, true);
  }, 3000)
}
```

### `defer` or `lazy` load of `App`

Buddy Pond Desktop supports both `defer` loading and `lazy` loading of `App`. 

`defer` means load after Deskop is ready.
`lazy` means load after user clicks on `App` icon.

### **Apps load in this order:**

### desktop.use(appName)
*Sync style blocking loads*
Calling `desktop.use(appName)` sync style should be used only for mission-critical Apps. 

The Desktop will **not** be ready until these Apps finish loading.

### desktop.use(appName, { defer: true })

*Async style non-blocking loads*
`defer` indicates the `App` wil load immediately after the Desktop is ready.
`defer` param should be used for Apps that are non-critical, but frequently used.

The Desktop will load these Apps **immediately after** it's ready. If the Buddy tries to open a deferred App while it is still loading, the UI will respond with a spinning cursor and hold the `openWindow` event until the App has completely loaded.

### After Desktop Ready Completes ( `lazy` loading )

After the Desktop is ready, additional Apps can be `lazy` loaded by calling: `desktop.use(appName).ready(function(){})` again.

The desktop handles this automatically by attempting to `lazy` load any opens which are not loaded and are attempted to be opened with `JQDX.openWindow(appName);`. 

The UI will displaying a spinning cursor to the Buddy and hold the `openWindow` event until the App has completely loaded.

Ex: `JQDX.openWindow('paint');`

## Buddy Pond Mobile Client

The mobile friendly client is in progress. We have stubs placed in `./mobile` and will have a version of Buddy Pond working for iOS and Andriod soon. Please [reach out](https://github.com/Marak/buddypond/issues) if you can help!

## Buddy Pond Backend Server
So you've made it to the end of the `ReadMe.md`? Neat.

Buddy Pond consists of a backend server and front-end client.

In order to start your own private Buddy Pond ( not federated ) you can download the Buddy Pond Server at [https://github.com/marak/buddypond-server](https://github.com/marak/buddypond-server)

Once you have your own Buddy Server running you can modify `./sdk/buddypond.js` to point to your server endpoint over HTTP.

### License
Buddy Pond Copyright (C) 2022 Marak Squires
See `LICENSE` file
