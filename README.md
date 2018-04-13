# Hot Keys Engine
## Javascript plugin for creating hot keys

Add this script to your web page.
In a separate js file register the different actions to associate to the keyboard keys and modifiers.

For the plugin to recognize your custom actions you have to use the HotKeys.attach function, which receives an array of hot key jsons.
The format of a hot key json must be:
```javascript
{
  "key": HotKeys.Keys.d,
  "modifiers": [HotKeys.Keys.Shift], //Optional
  "callback": function () {
      //your code
  }
  "params": {
    //parameters that your function will receive
  }
}
```
```javascript
HotKeys.attach([
  //hot key jsons
], this);
```
To remove a custom hot key
````javascript
HotKeys.detach([
  //hot key jsons
], this);
````
To add the plugin key listener
````javascript
HotKeys.addKeyListener()
````
