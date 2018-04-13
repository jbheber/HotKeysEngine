(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.HotKeys = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

﻿function HotKeys() {};

HotKeys.observers = [];

HotKeys.addKeyListener = () => {
    document.addEventListener("keydown", HotKeys.notifyObservers, false);
};

HotKeys.attach = (observers, context) => {
    ///<summary>Recieves an array of subscribers to asociate the key press with its corresponding behaviour.
    ///for each "subscriber" in the "subscribers array" it generates a subscription and applies the specified callback.</summary>
    ///<param name="subscribers">Array of objects containing the keyboards keys and its behaviour.
    ///<para>Expected structure:</para>
    ///<para>[{</para>
    ///<para>    key: KeyboardEngine.Keys.A,</para>
    ///<para>    modifiers: [KeyboardEngine.Keys.Ctrl, KeyboardEngine.Keys.Shift], // optional</para>
    ///<para>    callback: doSomething</para>
    ///<para> },...]</para>
    ///</param>
    ///<param name="context">Object from where the subsciber is sent</param>
    observers.forEach((observer) => {
        if (observer.modifiers === null || observer.modifiers === undefined)
            observer.modifiers = [];
        observer.context = context;
        if (HotKeys.observers.indexOf(observer) < 0)
            HotKeys.observers.push(observer);
    });
};

HotKeys.detach = (observers) => {
    ///<summary>Removes the subscriber from the list.</summary>
    ///<param name="subscribers">Array of objects containing the keyboards keys and its behaviour.
    ///<para>Expected structure:</para>
    ///<para>[{</para>
    ///<para>    key: KeyboardEngine.Keys.A,</para>
    ///<para>    modifiers: [KeyboardEngine.Keys.Ctrl, KeyboardEngine.Keys.Shift], // optional</para>
    ///<para>    callback: doSomething</para>
    ///<para> },...]</para>
    ///</param>
    observers.forEach((observer, i) => {
        var subscriberIndex = HotKeys.observers.indexOf(observer);
        if (subscriberIndex >= 0)
            HotKeys.observers.splice(subscriberIndex, 1);
    });
};

HotKeys.notifyObservers = (event) => {
    HotKeys.observers.forEach((observer) => {
        if (HotKeys.keyPressMatch(event, observer)) {
            event.preventDefault();
            observer.callback.call(observer.context, event, observer.params);
        }
    });
};

HotKeys.keyPressMatch = (event, hotKeyObserver) => {
    return event.keyCode == hotKeyObserver.key && HotKeys.modifiersMatch(event, hotKeyObserver.modifiers);
};

HotKeys.modifiersMatch = (event, modifiers) => {
    if (modifiers && modifiers.length) {
        var modifiersMatch = true;

        modifiers.forEach((modifier, i) => {
            if (HotKeys.specificModifierPressed(event, modifier) == false)
                modifiersMatch = false;
        });

        return modifiersMatch;
    }
    else
        return !(event.ctrlKey || event.shiftKey || event.altKey);
};

HotKeys.specificModifierPressed = (event, modifier) => {
    var modifierMappings = [
        { hotKey: HotKeys.Keys.Ctrl, eventKey: event.ctrlKey },
        { hotKey: HotKeys.Keys.Shift, eventKey: event.shiftKey },
        { hotKey: HotKeys.Keys.Alt, eventKey: event.altKey }
    ];

    var hasModifier = false;

    modifierMappings.forEach((mapping, i) => {
        if (mapping.hotKey == modifier && mapping.eventKey)
            hasModifier = true;
    });

    return hasModifier;
};

HotKeys.Keys = {
    Backspace: 8,
    Tab: 9,
    Enter: 13,
    Shift: 16,
    Ctrl: 17,
    Alt: 18,
    Pause_break: 19,
    Caps_lock: 20,
    Escape: 27,
    Page_up: 33,
    Page_down: 34,
    End: 35,
    Home: 36,
    Left_arrow: 37,
    Up_arrow: 38,
    Right_arrow: 39,
    Down_arrow: 40,
    Insert: 45,
    Delete: 46,
    0: 48,
    1: 49,
    2: 50,
    3: 51,
    4: 52,
    5: 53,
    6: 54,
    7: 55,
    8: 56,
    9: 57,
    a: 65,
    b: 66,
    c: 67,
    d: 68,
    e: 69,
    f: 70,
    g: 71,
    h: 72,
    i: 73,
    j: 74,
    k: 75,
    l: 76,
    m: 77,
    n: 78,
    o: 79,
    p: 80,
    q: 81,
    r: 82,
    s: 83,
    t: 84,
    u: 85,
    v: 86,
    w: 87,
    x: 88,
    y: 89,
    z: 90,
    left_window_key: 91,
    right_window_key: 92,
    select_key: 93,
    numpad_0: 96,
    numpad_1: 97,
    numpad_2: 98,
    numpad_3: 99,
    numpad_4: 100,
    numpad_5: 101,
    numpad_6: 102,
    numpad_7: 103,
    numpad_8: 104,
    numpad_9: 105,
    multiply: 106,
    add: 107,
    subtract: 109,
    decimal_point: 110,
    divide: 111,
    f1: 112,
    f2: 113,
    f3: 114,
    f4: 115,
    f5: 116,
    f6: 117,
    f7: 118,
    f8: 119,
    f9: 120,
    f10: 121,
    f11: 122,
    f12: 123,
    num_lock: 144,
    scroll_lock: 145,
    semi_colon: 186,
    equal_sign: 187,
    comma: 188,
    dash: 189,
    period: 190,
    forward_slash: 191,
    grave_accent: 192,
    open_bracket: 219,
    backslash: 220,
    closebracket: 221,
    single_quote: 222
};

module.exports = HotKeys;
},{}]},{},[1])(1)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaG90LWtleXMtZW5naW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlxu77u/ZnVuY3Rpb24gSG90S2V5cygpIHt9O1xuXG5Ib3RLZXlzLm9ic2VydmVycyA9IFtdO1xuXG5Ib3RLZXlzLmFkZEtleUxpc3RlbmVyID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIEhvdEtleXMubm90aWZ5T2JzZXJ2ZXJzLCBmYWxzZSk7XG59O1xuXG5Ib3RLZXlzLmF0dGFjaCA9IChvYnNlcnZlcnMsIGNvbnRleHQpID0+IHtcbiAgICAvLy88c3VtbWFyeT5SZWNpZXZlcyBhbiBhcnJheSBvZiBzdWJzY3JpYmVycyB0byBhc29jaWF0ZSB0aGUga2V5IHByZXNzIHdpdGggaXRzIGNvcnJlc3BvbmRpbmcgYmVoYXZpb3VyLlxuICAgIC8vL2ZvciBlYWNoIFwic3Vic2NyaWJlclwiIGluIHRoZSBcInN1YnNjcmliZXJzIGFycmF5XCIgaXQgZ2VuZXJhdGVzIGEgc3Vic2NyaXB0aW9uIGFuZCBhcHBsaWVzIHRoZSBzcGVjaWZpZWQgY2FsbGJhY2suPC9zdW1tYXJ5PlxuICAgIC8vLzxwYXJhbSBuYW1lPVwic3Vic2NyaWJlcnNcIj5BcnJheSBvZiBvYmplY3RzIGNvbnRhaW5pbmcgdGhlIGtleWJvYXJkcyBrZXlzIGFuZCBpdHMgYmVoYXZpb3VyLlxuICAgIC8vLzxwYXJhPkV4cGVjdGVkIHN0cnVjdHVyZTo8L3BhcmE+XG4gICAgLy8vPHBhcmE+W3s8L3BhcmE+XG4gICAgLy8vPHBhcmE+ICAgIGtleTogS2V5Ym9hcmRFbmdpbmUuS2V5cy5BLDwvcGFyYT5cbiAgICAvLy88cGFyYT4gICAgbW9kaWZpZXJzOiBbS2V5Ym9hcmRFbmdpbmUuS2V5cy5DdHJsLCBLZXlib2FyZEVuZ2luZS5LZXlzLlNoaWZ0XSwgLy8gb3B0aW9uYWw8L3BhcmE+XG4gICAgLy8vPHBhcmE+ICAgIGNhbGxiYWNrOiBkb1NvbWV0aGluZzwvcGFyYT5cbiAgICAvLy88cGFyYT4gfSwuLi5dPC9wYXJhPlxuICAgIC8vLzwvcGFyYW0+XG4gICAgLy8vPHBhcmFtIG5hbWU9XCJjb250ZXh0XCI+T2JqZWN0IGZyb20gd2hlcmUgdGhlIHN1YnNjaWJlciBpcyBzZW50PC9wYXJhbT5cbiAgICBvYnNlcnZlcnMuZm9yRWFjaCgob2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgaWYgKG9ic2VydmVyLm1vZGlmaWVycyA9PT0gbnVsbCB8fCBvYnNlcnZlci5tb2RpZmllcnMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIG9ic2VydmVyLm1vZGlmaWVycyA9IFtdO1xuICAgICAgICBvYnNlcnZlci5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgaWYgKEhvdEtleXMub2JzZXJ2ZXJzLmluZGV4T2Yob2JzZXJ2ZXIpIDwgMClcbiAgICAgICAgICAgIEhvdEtleXMub2JzZXJ2ZXJzLnB1c2gob2JzZXJ2ZXIpO1xuICAgIH0pO1xufTtcblxuSG90S2V5cy5kZXRhY2ggPSAob2JzZXJ2ZXJzKSA9PiB7XG4gICAgLy8vPHN1bW1hcnk+UmVtb3ZlcyB0aGUgc3Vic2NyaWJlciBmcm9tIHRoZSBsaXN0Ljwvc3VtbWFyeT5cbiAgICAvLy88cGFyYW0gbmFtZT1cInN1YnNjcmliZXJzXCI+QXJyYXkgb2Ygb2JqZWN0cyBjb250YWluaW5nIHRoZSBrZXlib2FyZHMga2V5cyBhbmQgaXRzIGJlaGF2aW91ci5cbiAgICAvLy88cGFyYT5FeHBlY3RlZCBzdHJ1Y3R1cmU6PC9wYXJhPlxuICAgIC8vLzxwYXJhPlt7PC9wYXJhPlxuICAgIC8vLzxwYXJhPiAgICBrZXk6IEtleWJvYXJkRW5naW5lLktleXMuQSw8L3BhcmE+XG4gICAgLy8vPHBhcmE+ICAgIG1vZGlmaWVyczogW0tleWJvYXJkRW5naW5lLktleXMuQ3RybCwgS2V5Ym9hcmRFbmdpbmUuS2V5cy5TaGlmdF0sIC8vIG9wdGlvbmFsPC9wYXJhPlxuICAgIC8vLzxwYXJhPiAgICBjYWxsYmFjazogZG9Tb21ldGhpbmc8L3BhcmE+XG4gICAgLy8vPHBhcmE+IH0sLi4uXTwvcGFyYT5cbiAgICAvLy88L3BhcmFtPlxuICAgIG9ic2VydmVycy5mb3JFYWNoKChvYnNlcnZlciwgaSkgPT4ge1xuICAgICAgICB2YXIgc3Vic2NyaWJlckluZGV4ID0gSG90S2V5cy5vYnNlcnZlcnMuaW5kZXhPZihvYnNlcnZlcik7XG4gICAgICAgIGlmIChzdWJzY3JpYmVySW5kZXggPj0gMClcbiAgICAgICAgICAgIEhvdEtleXMub2JzZXJ2ZXJzLnNwbGljZShzdWJzY3JpYmVySW5kZXgsIDEpO1xuICAgIH0pO1xufTtcblxuSG90S2V5cy5ub3RpZnlPYnNlcnZlcnMgPSAoZXZlbnQpID0+IHtcbiAgICBIb3RLZXlzLm9ic2VydmVycy5mb3JFYWNoKChvYnNlcnZlcikgPT4ge1xuICAgICAgICBpZiAoSG90S2V5cy5rZXlQcmVzc01hdGNoKGV2ZW50LCBvYnNlcnZlcikpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBvYnNlcnZlci5jYWxsYmFjay5jYWxsKG9ic2VydmVyLmNvbnRleHQsIGV2ZW50LCBvYnNlcnZlci5wYXJhbXMpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5Ib3RLZXlzLmtleVByZXNzTWF0Y2ggPSAoZXZlbnQsIGhvdEtleU9ic2VydmVyKSA9PiB7XG4gICAgcmV0dXJuIGV2ZW50LmtleUNvZGUgPT0gaG90S2V5T2JzZXJ2ZXIua2V5ICYmIEhvdEtleXMubW9kaWZpZXJzTWF0Y2goZXZlbnQsIGhvdEtleU9ic2VydmVyLm1vZGlmaWVycyk7XG59O1xuXG5Ib3RLZXlzLm1vZGlmaWVyc01hdGNoID0gKGV2ZW50LCBtb2RpZmllcnMpID0+IHtcbiAgICBpZiAobW9kaWZpZXJzICYmIG1vZGlmaWVycy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIG1vZGlmaWVyc01hdGNoID0gdHJ1ZTtcblxuICAgICAgICBtb2RpZmllcnMuZm9yRWFjaCgobW9kaWZpZXIsIGkpID0+IHtcbiAgICAgICAgICAgIGlmIChIb3RLZXlzLnNwZWNpZmljTW9kaWZpZXJQcmVzc2VkKGV2ZW50LCBtb2RpZmllcikgPT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgbW9kaWZpZXJzTWF0Y2ggPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG1vZGlmaWVyc01hdGNoO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICAgIHJldHVybiAhKGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQuc2hpZnRLZXkgfHwgZXZlbnQuYWx0S2V5KTtcbn07XG5cbkhvdEtleXMuc3BlY2lmaWNNb2RpZmllclByZXNzZWQgPSAoZXZlbnQsIG1vZGlmaWVyKSA9PiB7XG4gICAgdmFyIG1vZGlmaWVyTWFwcGluZ3MgPSBbXG4gICAgICAgIHsgaG90S2V5OiBIb3RLZXlzLktleXMuQ3RybCwgZXZlbnRLZXk6IGV2ZW50LmN0cmxLZXkgfSxcbiAgICAgICAgeyBob3RLZXk6IEhvdEtleXMuS2V5cy5TaGlmdCwgZXZlbnRLZXk6IGV2ZW50LnNoaWZ0S2V5IH0sXG4gICAgICAgIHsgaG90S2V5OiBIb3RLZXlzLktleXMuQWx0LCBldmVudEtleTogZXZlbnQuYWx0S2V5IH1cbiAgICBdO1xuXG4gICAgdmFyIGhhc01vZGlmaWVyID0gZmFsc2U7XG5cbiAgICBtb2RpZmllck1hcHBpbmdzLmZvckVhY2goKG1hcHBpbmcsIGkpID0+IHtcbiAgICAgICAgaWYgKG1hcHBpbmcuaG90S2V5ID09IG1vZGlmaWVyICYmIG1hcHBpbmcuZXZlbnRLZXkpXG4gICAgICAgICAgICBoYXNNb2RpZmllciA9IHRydWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaGFzTW9kaWZpZXI7XG59O1xuXG5Ib3RLZXlzLktleXMgPSB7XG4gICAgQmFja3NwYWNlOiA4LFxuICAgIFRhYjogOSxcbiAgICBFbnRlcjogMTMsXG4gICAgU2hpZnQ6IDE2LFxuICAgIEN0cmw6IDE3LFxuICAgIEFsdDogMTgsXG4gICAgUGF1c2VfYnJlYWs6IDE5LFxuICAgIENhcHNfbG9jazogMjAsXG4gICAgRXNjYXBlOiAyNyxcbiAgICBQYWdlX3VwOiAzMyxcbiAgICBQYWdlX2Rvd246IDM0LFxuICAgIEVuZDogMzUsXG4gICAgSG9tZTogMzYsXG4gICAgTGVmdF9hcnJvdzogMzcsXG4gICAgVXBfYXJyb3c6IDM4LFxuICAgIFJpZ2h0X2Fycm93OiAzOSxcbiAgICBEb3duX2Fycm93OiA0MCxcbiAgICBJbnNlcnQ6IDQ1LFxuICAgIERlbGV0ZTogNDYsXG4gICAgMDogNDgsXG4gICAgMTogNDksXG4gICAgMjogNTAsXG4gICAgMzogNTEsXG4gICAgNDogNTIsXG4gICAgNTogNTMsXG4gICAgNjogNTQsXG4gICAgNzogNTUsXG4gICAgODogNTYsXG4gICAgOTogNTcsXG4gICAgYTogNjUsXG4gICAgYjogNjYsXG4gICAgYzogNjcsXG4gICAgZDogNjgsXG4gICAgZTogNjksXG4gICAgZjogNzAsXG4gICAgZzogNzEsXG4gICAgaDogNzIsXG4gICAgaTogNzMsXG4gICAgajogNzQsXG4gICAgazogNzUsXG4gICAgbDogNzYsXG4gICAgbTogNzcsXG4gICAgbjogNzgsXG4gICAgbzogNzksXG4gICAgcDogODAsXG4gICAgcTogODEsXG4gICAgcjogODIsXG4gICAgczogODMsXG4gICAgdDogODQsXG4gICAgdTogODUsXG4gICAgdjogODYsXG4gICAgdzogODcsXG4gICAgeDogODgsXG4gICAgeTogODksXG4gICAgejogOTAsXG4gICAgbGVmdF93aW5kb3dfa2V5OiA5MSxcbiAgICByaWdodF93aW5kb3dfa2V5OiA5MixcbiAgICBzZWxlY3Rfa2V5OiA5MyxcbiAgICBudW1wYWRfMDogOTYsXG4gICAgbnVtcGFkXzE6IDk3LFxuICAgIG51bXBhZF8yOiA5OCxcbiAgICBudW1wYWRfMzogOTksXG4gICAgbnVtcGFkXzQ6IDEwMCxcbiAgICBudW1wYWRfNTogMTAxLFxuICAgIG51bXBhZF82OiAxMDIsXG4gICAgbnVtcGFkXzc6IDEwMyxcbiAgICBudW1wYWRfODogMTA0LFxuICAgIG51bXBhZF85OiAxMDUsXG4gICAgbXVsdGlwbHk6IDEwNixcbiAgICBhZGQ6IDEwNyxcbiAgICBzdWJ0cmFjdDogMTA5LFxuICAgIGRlY2ltYWxfcG9pbnQ6IDExMCxcbiAgICBkaXZpZGU6IDExMSxcbiAgICBmMTogMTEyLFxuICAgIGYyOiAxMTMsXG4gICAgZjM6IDExNCxcbiAgICBmNDogMTE1LFxuICAgIGY1OiAxMTYsXG4gICAgZjY6IDExNyxcbiAgICBmNzogMTE4LFxuICAgIGY4OiAxMTksXG4gICAgZjk6IDEyMCxcbiAgICBmMTA6IDEyMSxcbiAgICBmMTE6IDEyMixcbiAgICBmMTI6IDEyMyxcbiAgICBudW1fbG9jazogMTQ0LFxuICAgIHNjcm9sbF9sb2NrOiAxNDUsXG4gICAgc2VtaV9jb2xvbjogMTg2LFxuICAgIGVxdWFsX3NpZ246IDE4NyxcbiAgICBjb21tYTogMTg4LFxuICAgIGRhc2g6IDE4OSxcbiAgICBwZXJpb2Q6IDE5MCxcbiAgICBmb3J3YXJkX3NsYXNoOiAxOTEsXG4gICAgZ3JhdmVfYWNjZW50OiAxOTIsXG4gICAgb3Blbl9icmFja2V0OiAyMTksXG4gICAgYmFja3NsYXNoOiAyMjAsXG4gICAgY2xvc2VicmFja2V0OiAyMjEsXG4gICAgc2luZ2xlX3F1b3RlOiAyMjJcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSG90S2V5czsiXX0=
