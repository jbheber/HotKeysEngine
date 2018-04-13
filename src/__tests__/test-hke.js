var assert = require("assert");
var hotkeys = require("../hot-keys-engine");
var MockBrowser = require('mock-browser').mocks.MockBrowser;

describe("Add or remove observers", function () {
    beforeEach(function () {
        global.document = new MockBrowser().getDocument();
    });
    describe("Initial observers 0", function () {
        it("observers array length should be 0", function () {
            assert.equal(0, hotkeys.observers.length);
        });
    });
    describe("Attach observers", function () {
        it("observers array length should be 0", function () {
            hotkeys.attach([
                {
                    key: hotkeys.Keys["1"],
                    modifiers: [hotkeys.Keys.Shift],
                    callback: () => { }
                }
            ]);
            assert.equal(1, hotkeys.observers.length);
        });
    });
    describe("Observer with out modifier", function () {
        beforeEach(function () {
            hotkeys.observers = [];
        });
        it("observer modifier is empty array", function () {
            hotkeys.attach([
                {
                    key: hotkeys.Keys["1"],
                    callback: () => { }
                }
            ]);
            assert.deepEqual([], hotkeys.observers[0].modifiers);
        });
    });
    describe("detach observers", function () {
        beforeEach(function () {
            hotkeys.observers = [];
        });
        it("Remove one observer from array", function () {
            let observers = [
                {
                    key: hotkeys.Keys["1"],
                    modifiers: [hotkeys.Keys.Shift],
                    callback: () => { }
                },
                {
                    key: hotkeys.Keys.a,
                    modifiers: [hotkeys.Keys.Shift],
                    callback: () => { }
                }
            ];
            hotkeys.attach(observers);
            hotkeys.detach([observers[1]]);
            assert.equal(1, hotkeys.observers.length);
            assert.equal(-1, hotkeys.observers.indexOf(observers[1]));
            assert.equal(0, hotkeys.observers.indexOf(observers[0]));
        });
    });
});

describe("Test modifiers touch", function () {
    beforeEach(function () {
        global.document = new MockBrowser().getDocument();
    });
    describe("Modifier ctrl", function () {
        it("Pressed Ctrl true", function () {
            let event = {
                ctrlKey: true,
                shiftKey: false,
                altKey: false
            }
            let pressCtrl = hotkeys.specificModifierPressed(event, hotkeys.Keys.Ctrl);
            assert.equal(true, pressCtrl);
        });
    });
    describe("Modifier shift", function () {
        it("Pressed Shift true", function () {
            let event = {
                ctrlKey: false,
                shiftKey: true,
                altKey: false
            }
            let pressShift = hotkeys.specificModifierPressed(event, hotkeys.Keys.Shift);
            assert.equal(true, pressShift);
        });
    });

    describe("Modifier alt", function () {
        it("Pressed Alt true", function () {
            let event = {
                ctrlKey: false,
                shiftKey: false,
                altKey: true
            }
            let pressAlt = hotkeys.specificModifierPressed(event, hotkeys.Keys.Alt);
            assert.equal(true, pressAlt);
        });
    });
});

describe("Test modifiers match", function () {
    beforeEach(function () {
        global.document = new MockBrowser().getDocument();
    });
    describe("Modifier Ctrl", function () {
        it("Pressed Ctrl true", function () {
            let event = {
                ctrlKey: true,
                shiftKey: false,
                altKey: false
            }
            let pressCtrl = hotkeys.modifiersMatch(event, [hotkeys.Keys.Ctrl]);
            assert.equal(true, pressCtrl);
        });
    });
    describe("Modifier Shift", function () {
        it("Pressed Shift true", function () {
            let event = {
                ctrlKey: false,
                shiftKey: true,
                altKey: false
            }
            let pressShift = hotkeys.modifiersMatch(event, [hotkeys.Keys.Shift]);
            assert.equal(true, pressShift);
        });
    });
    describe("Modifier Alt", function () {
        it("Pressed Alt true", function () {
            let event = {
                ctrlKey: false,
                shiftKey: false,
                altKey: true
            }
            let pressAlt = hotkeys.modifiersMatch(event, [hotkeys.Keys.Alt]);
            assert.equal(true, pressAlt);
        });
    });
    describe("Two modifiers at the same time", function () {
        it("Pressed Ctrl + shift true", function () {
            let event = {
                ctrlKey: true,
                shiftKey: true,
                altKey: false
            }
            let pressCtrlShift = hotkeys.modifiersMatch(event, [hotkeys.Keys.Ctrl, hotkeys.Keys.Shift]);
            assert.equal(true, pressCtrlShift);
        });
    });
    describe("Does not have any modifier", function () {
        it("Should return false", function () {
            let event = {
                ctrlKey: true,
                shiftKey: true,
                altKey: false,
                keyCode: hotkeys.Keys.a
            };
            let result = hotkeys.modifiersMatch(event, []);
            assert.equal(false, result);
        });
    });
});

describe("Key press match observer", function () {
    beforeEach(function () {
        global.document = new MockBrowser().getDocument();
        hotkeys.observers = [
            {
                key: hotkeys.Keys["1"],
                modifiers: [hotkeys.Keys.Shift],
                callback: () => { }
            },
            {
                key: hotkeys.Keys.a,
                modifiers: [hotkeys.Keys.Shift, hotkeys.Keys.Ctrl],
                callback: () => { }
            },
            {
                key: hotkeys.Keys.j,
                modifiers: [],
                callback: () => { }
            }
        ];
    });
    describe("First observer doesn't match", function () {
        it("should return false", function () {
            let event = {
                ctrlKey: true,
                shiftKey: false,
                altKey: false,
                keyCode: hotkeys.Keys["1"]
            };
            let result = hotkeys.keyPressMatch(event, hotkeys.observers[0]);
            assert.equal(false, result);
        });
    });
    describe("Second observer does match", function () {
        it("should return true", function () {
            let event = {
                ctrlKey: true,
                shiftKey: true,
                altKey: false,
                keyCode: hotkeys.Keys.a
            };
            let result = hotkeys.keyPressMatch(event, hotkeys.observers[1]);
            assert.equal(true, result);
        });
    });
});

describe("Test notify observers", function () {
    describe("test notify first observer", function () {
        beforeEach(function () {
            global.document = new MockBrowser().getDocument();
            hotkeys.observers = [
                {
                    key: hotkeys.Keys["1"],
                    modifiers: [hotkeys.Keys.Shift],
                    callback: () => {
                        assert.equal(true, true);
                    }
                },
                {
                    key: hotkeys.Keys.a,
                    modifiers: [hotkeys.Keys.Shift, hotkeys.Keys.Ctrl],
                    callback: () => {
                        assert.fail("does not match this observer");
                    }
                }
            ];
        });
        it("should notify first observer", function () {
            let event = {
                ctrlKey: false,
                shiftKey: true,
                altKey: false,
                keyCode: hotkeys.Keys["1"],
                preventDefault: () => { }
            };
            hotkeys.notifyObservers(event);
        });
    });
    describe("test notify second observer", function () {
        beforeEach(function () {
            global.document = new MockBrowser().getDocument();
            hotkeys.observers = [
                {
                    key: hotkeys.Keys["1"],
                    modifiers: [hotkeys.Keys.Shift],
                    callback: () => {
                        assert.fail("does not match this observer");                        
                    }
                },
                {
                    key: hotkeys.Keys.a,
                    modifiers: [hotkeys.Keys.Shift, hotkeys.Keys.Ctrl],
                    callback: () => {
                        assert.equal(true, true);
                    }
                }
            ];
        });
        it("should notify first observer", function () {
            let event = {
                ctrlKey: true,
                shiftKey: true,
                altKey: false,
                keyCode: hotkeys.Keys.a,
                preventDefault: () => { }
            };
            hotkeys.notifyObservers(event);
        });
    });
});

describe("Test add key listener", function(){
    beforeEach(function(){
        global.document = new MockBrowser().getDocument();
    });
    it("Test function in keydown", function(){
        hotkeys.addKeyListener();
        console.log(document.keydown);
        assert.equal(true,true);   
    });
});