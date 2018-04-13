$(function () {
    HotKeys.attach([
        baseKeyEvents.attach,
        baseKeyEvents.detach
    ], this);
    HotKeys.addKeyListener();
});

baseKeyEvents = {
    attach: {
        key: HotKeys.Keys.a,
        callback: function () {
            HotKeys.attach([
                removableKeyEvents.ctrlE,
                removableKeyEvents.ctrlShiftE,
                removableKeyEvents.ctrlJ,
                removableKeyEvents.ctrlShiftJ
            ], this);
        }
    },
    detach: {
        key: HotKeys.Keys.d,
        modifiers: [HotKeys.Keys.Shift],
        callback: function () {
            HotKeys.detach([
                removableKeyEvents.ctrlE,
                removableKeyEvents.ctrlShiftE,
                removableKeyEvents.ctrlJ,
                removableKeyEvents.ctrlShiftJ
            ], this);
        }
    }
};

removableKeyEvents = {
    ctrlE: {
        key: HotKeys.Keys.e,
        callback: function () {
            alert("Key pressed ctrl + e");
        }
    },
    ctrlShiftE: {
        key: HotKeys.Keys.e,
        modifiers: [HotKeys.Keys.Shift],
        callback: function () {
            alert("Key pressed ctrl + shift + e");
        }
    },
    ctrlJ: {
        key: HotKeys.Keys.j,
        callback: function () {
            alert("Key pressed ctrl + j");
        }
    },
    ctrlShiftJ: {
        key: HotKeys.Keys.j,
        modifiers: [HotKeys.Keys.Shift],
        callback: function () {
            alert("Key pressed ctrl + shift + j");
        }
    }
};

