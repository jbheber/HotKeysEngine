
﻿function HotKeys() { };

HotKeys.observers = [];

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

document.addEventListener("keydown", HotKeys.notifyObservers, false);