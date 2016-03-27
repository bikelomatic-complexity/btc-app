
Source File Layout
-----------------
Our source files our organized in the following manner:
  - `src/css` all css files are bundled with browserify-css, and must be
    imported into a module with `import ../css/your-css-file.css;`
  - `src/img` all images are copied into the www directory on build
  - `src/js` top level javascript modules including:

File        | Purpose
------------|--------
app.js      | holds the router and listens for `deviceready`
store.js    | exposes the redux store singleton, wrapped with middlewares
database.js | creates the local PouchDB databases and connects them to `btc-models`
history.js  | exposes a hash-based history singleton

  - `src/js/components` react components that are **not** connected to to the redux store. These include pure and controlled components.
  - `src/js/containers` react components that are connected to the redux store
  - `src/js/reducers` reducers for redux, in the [ducks format](https://github.com/erikras/ducks-modular-redux) (without separate files for action creators)
  - `src/js/util` utility classes and functions, including `device.js` for making platform variations explicit
  - `config/` contains YAML files for the `config` node module

Add & Update Point Wizard
-------------------------
To demonstrate how the wizard module works, we will walk through the flow of
adding a new Service, up to choosing the location for that new Service.

There are a few React classes involved in this flow:
  - PointPage
  - AddServicePage *extends* PointPage
  - WizardPage
  - PointLocation *extends* Wizard Page

Event                               | Description
------------------------------------|------------
history.push( 'add-point/' )        | When the app navigates here, the router loads the `AddServicePage` component with `PointLocation` as its only child.
AddServicePage.componentWillMount() | When the add service page is about to mount, use `this.setState()` to set the default fields for a service.
PointPage.render()                  | Call `AddServicePage.isReady()`, which returns true since the service defaults were synchronously available. Then render the wizard section from `this.props.children`.
PointLocation.componentWillMount()  | Obtain the point from `this.props` and `this.setState()` the single relevant field for this section, the point's location.
WizardPage.render()                 | Render the action button and obtain the content for the page from the subclass
PointLocation.getPageContent()      | Render the content specific to the location setting section of the wizard

At this point, the point location page has displayed the map with a bobbing
marker. Now, let's see what happens when the user clicks "next"

Event                               | Description
------------------------------------|------------
this.props.onNext()                 | This function was defined in PointPage but transferred to WizardPage upon render. It was invoked by the action button's onClick handler.
PointPage.navigateToTab()           | The PointPage figures out which tab is next in the wizard order and navigates to it...
WizardPage.persistBefore()          | ...but navigateToTab first calls this method inside the WizardPage. It calls `persist()` with all the field values obtained in the wizard section. The second argument to `persist()` is a callback executed once the fields are actually persisted. The callback contains the logic to navigate to the next tab.
this.props.persist()                | This function was defined in PointPage but transferred to WizardPage upon render. It was invoked by `WizardPage.persistBefore()`
history.push('add-point/name')      | Finally, the navigation logic is invoked, since it was the callback to execute once the values were persisted in the previous step

The final `history.push( 'add-point/name' )` call starts the entire flow over
with the next wizard section, ServiceName. However, since the AddServicePage
is already rendered, the `AddServicePage.componentWillMount()` event will not fire, and
the service defaults will not be reset.
