# Client App

Have [npm](https://nodejs.org/en/) installed on your development machine (available when installing [node](https://nodejs.org/)).

**Run `npm install`** 
### running on android device
1. Install [android studio](https://developer.android.com/studio/index.html) (required for having the resources to deploy to a phone)
2. Make sure your device shows up on `adb devices`
3. `npm run start:android`
4. You can inspect the android view by going to `chrome://inspect`!  

### running in browser
1. `npm run dev`
2. open `localhost:8000/browser/www/`
3. The chrome extension _LiveReload_ your browser session will reload when you update a file.  (not required, but nice)

_Look at the `package.json` for other commands!_  

### Other Information
- The script `npm run format` ensures well formated code. Run `npm run format:replace` will make these changes
  - The current formatter suggest unix line endings
- The script `npm run lint` will reveal js
- `src/js/` contains most of the code that is being send to the client
  - Using [Redux](https://github.com/reactjs/redux), reducers are in the `/reducers` folder, and actions are in the reducer files (they are one line actions, so the need for seperate files was low)
  - containers are pages that get rendered in the app. They are in the `/containers` folder and are composed of components in the `/components` folder
    - components are used in multiple pages, so when modifying them make sure to check their references elsewhere in the document
  - `usbr20.json` is a track that is, for all intents and purposes, hardcoded- This should be replaced with dynamic tracks asap.
- Testing
  - For javascript unit testing, we are using the [Mocha](https://mochajs.org/) stack, with [Chai](http://chaijs.com/) and [Sinon](http://sinonjs.org/). We run client-side tests using the Karma test runner, which runs the tests inside a browser instance.
  - [Skin-deep](https://github.com/glenjamin/skin-deep) is a testing framework to mock the react components used in the client, and test the state, props, and rendered component. We forked the official glenjamin/skin-deep repository in an attempt to resolve project specific issues. We would recommend to future teams to attempt to use the newest version of skin-deep, or more mature testing frameworks, such as Airbnb’s React testing framework, [Enzyme](https://github.com/airbnb/enzyme).
