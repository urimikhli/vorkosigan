/*  Copyright (C)  2009  Thomas S. Visit: http://sites.google.com/site/cssgameengine/
    Permission is granted to copy, distribute and/or modify this document
    under the terms of the GNU Free Documentation License, Version 1.3
    or any later version published by the Free Software Foundation;
    with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
    A copy of the license is included in the section entitled "GNU
    Free Documentation License". */

var ENGINE = {};
ENGINETIME = window;
ENGINETIME.lock = false;
ENGINETIME.count = 0;
var ENGINE = {
    init: function (A) {
        player.setPlayerTag();
        player.character(A);
        player.stance1();
        computer.setcomputerTag();
        computer.stance1();
        computer.ai()
    },
    instance: function (B) {
        if (B == "Juggernaut") {
            var A = player.xcoordinate + 120
        } else {
            if (B == "Psylocke") {
                var A = player.xcoordinate + 80
            }
        }
        if (A > computer.xcoordinate) {
            if (B == "Juggernaut") {
                if (player.block == false) {
                    player.damage1()
                } else {
                    player.pushed();
                    ThreadManager.End("animationTimer2");
                    computer.locked()
                }
            } else {
                if (B == "Psylocke") {
                    if (player.block == false) {
                        computer.damage1()
                    }
                }
            }
        }
    }
};
var ThreadManager = {
    list: [],
    Start: function (singlethread, code, millisec) {
        eval("ENGINETIME." + singlethread + " = setTimeout('" + code + "'," + millisec + ");");
        this.add(singlethread);
        this.Counter(true)
    },
    End: function (singlethread) {
        eval("clearTimeout(ENGINETIME." + singlethread + ");");
        this.remove(singlethread);
        this.Counter(false)
    },
    Counter: function (A) {
        ENGINETIME.count = this.list.length;
        ENGINETIME.document.getElementById("thread_count").innerHTML = ENGINETIME.count;
        ENGINETIME.document.getElementById("thread_ids").innerHTML = this.listId()
    },
    add: function (B) {
        var A = false;
        for (i = 0; i < this.list.length; i++) {
            if (this.list[i] == B) {
                A = true
            }
        }
        if (A == false) {
            this.list[i] = B
        }
    },
    remove: function (A) {
        if (this.list.length > 0) {
            for (i = 0; i < this.list.length; i++) {
                if (this.list[i] == A) {
                    this.list.splice(i, 1)
                }
            }
        }
    },
    listId: function () {
        var A = "";
        for (i = 0; i < this.list.length; i++) {
            A += this.list[i] + "<br />"
        }
        return A
    }
};
var player = {
    pX: 0,
    pY: 0,
    pTag: "Player1_Tag",
    frame: 0,
    loop: 1,
    isCharacter: "",
    toCharacter: "Juggernaut",
    xcoordinate: 90,
    ycoordinate: 110,
    overlap: false,
    lock: false,
    air: false,
    character: function (A) {
        this.isCharacter = A
    },
    setPlayerTag: function () {
        var A = window.document.getElementById(this.pTag).style;
        A.left = this.xcoordinate + "px";
        A.top = this.ycoordinate + "px";
        A.height = "100";
        A.width = "90";
        A.position = "absolute"
    },
    animation: function () {
        var A = window.document.getElementById(this.isCharacter).style;
        if (this.loop < this.maxFrame) {
            this.frame = this.frame + this.jump;
            this.loop = this.loop + 1;
            A.backgroundPosition = "-" + this.frame + "px 0px";
            if ((this.attack == true) && (this.loop == (Math.round(this.maxFrame / 2)))) {
                this.broadcast()
            }
        } else {
            this.frame = 0;
            this.loop = 1;
            this.stance1()
        }
        ThreadManager.End("animationTimer1");
        ThreadManager.Start("animationTimer1", "player.animation();", this.fps)
    },
    xorigin: function () {
        if (this.xorientation == "<") {
            var direction = "this.XmoveByPixel < this.xcoordinate"
        } else {
            if (this.xorientation = ">") {
                var direction = "this.XmoveByPixel > this.xcoordinate"
            }
        }
        var a = window.document.getElementById(this.pTag).style;
        if (eval(direction)) {
            if (this.xorientation == "<") {
                var increment = "this.xcoordinate -= 1;"
            } else {
                if (this.xorientation == ">") {
                    var increment = "this.xcoordinate += 1;"
                }
            }
            eval(increment);
            a.left = this.xcoordinate + "px";
            ThreadManager.End("xoriginTimer");
            ThreadManager.Start("xoriginTimer", "player.xorigin();", 10)
        } else {
            ThreadManager.End("xoriginTimer")
        }
    },
    yoriginUp: function () {
        if (this.yorientation == "^") {
            var direction = "this.YmoveByPixel < this.ycoordinate"
        } else {
            if (this.yorientation = "V") {
                var direction = "this.YmoveByPixel > this.ycoordinate"
            }
        }
        var a = window.document.getElementById(this.pTag).style;
        if (eval(direction)) {
            if (this.yorientation == "^") {
                var increment = "this.ycoordinate -= 1;"
            } else {
                if (this.yorientation == "V") {
                    var increment = "this.ycoordinate += 1;"
                }
            }
            eval(increment);
            a.top = this.ycoordinate + "px";
            ThreadManager.End("yoriginTimer");
            ThreadManager.Start("yoriginTimer", "player.yoriginUp();", 1)
        } else {
            ThreadManager.End("yoriginTimer");
            this.YmoveByPixel = this.YmoveByPixelOriginal;
            this.YmoveByPixel = this.ycoordinate + this.YmoveByPixel;
            this.yorientation = "V";
            this.yoriginDown()
        }
    },
    yoriginDown: function () {
        if (this.yorientation == "^") {
            var direction = "this.YmoveByPixel < this.ycoordinate"
        } else {
            if (this.yorientation = "V") {
                var direction = "this.YmoveByPixel > this.ycoordinate"
            }
        }
        var a = window.document.getElementById(this.pTag).style;
        if (eval(direction)) {
            if (this.yorientation == "^") {
                var increment = "this.ycoordinate -= 1;"
            } else {
                if (this.yorientation == "V") {
                    var increment = "this.ycoordinate += 1;"
                }
            }
            eval(increment);
            a.top = this.ycoordinate + "px";
            ThreadManager.End("yoriginTimer");
            ThreadManager.Start("yoriginTimer", "player.yoriginDown();", 1)
        } else {
            ThreadManager.End("yoriginTimer")
        }
    },
    jump1: function () {
        ENGINETIME.lock = true;
        this.air = true;
        var A = window.document.getElementById(this.isCharacter).style;
        A.width = "93px";
        A.height = "143px";
        A.position = "relative";
        A.zindex = "4";
        A.background = "url(./ENGINE/Sprites/Players/" + this.isCharacter + "/jump.gif) no-repeat";
        A.left = -4 + "px";
        A.top = -44 + "px";
        A.backgroundPosition = "0px 0px";
        this.frame = 0;
        this.loop = 1;
        this.maxFrame = 13;
        this.jump = 93;
        this.fps = 150;
        ThreadManager.End("animationTimer1");
        ThreadManager.Start("animationTimer1", "player.animation();", this.fps);
        this.XmoveByPixel = 0;
        this.YmoveByPixel = 120;
        this.YmoveByPixelOriginal = this.YmoveByPixel;
        this.XmoveByPixel = this.xcoordinate - this.XmoveByPixel;
        this.YmoveByPixel = this.ycoordinate - this.YmoveByPixel;
        this.xorientation = "<";
        this.yorientation = "^";
        this.xorigin();
        this.yoriginUp()
    },
    jump2: function () {
        ENGINETIME.lock = true;
        this.air = true;
        var A = window.document.getElementById(this.isCharacter).style;
        A.width = "93px";
        A.height = "143px";
        A.position = "relative";
        A.zindex = "4";
        A.background = "url(./ENGINE/Sprites/Players/" + this.isCharacter + "/jump.gif) no-repeat";
        A.left = -4 + "px";
        A.top = -44 + "px";
        A.backgroundPosition = "0px 0px";
        this.frame = 0;
        this.loop = 1;
        this.maxFrame = 13;
        this.jump = 93;
        this.fps = 150;
        ThreadManager.End("animationTimer1");
        ThreadManager.Start("animationTimer1", "player.animation();", this.fps);
        this.XmoveByPixel = 100;
        this.YmoveByPixel = 120;
        this.YmoveByPixelOriginal = this.YmoveByPixel;
        this.XmoveByPixel = this.xcoordinate + this.XmoveByPixel;
        this.YmoveByPixel = this.ycoordinate - this.YmoveByPixel;
        this.xorientation = ">";
        this.yorientation = "^";
        this.xorigin();
        this.yoriginUp()
    },
    stance1: function () {
        ENGINETIME.lock = false;
        this.block = false;
        this.air = false;
        var A = window.document.getElementById(this.isCharacter).style;
        A.width = "90px";
        A.height = "99px";
        A.position = "relative";
        A.left = this.pX + "px";
        A.top = this.pY + "px";
        A.zindex = "4";
        A.background = "url(./ENGINE/Sprites/Players/" + this.isCharacter + "/stance1.gif) no-repeat";
        A.backgroundPosition = "0px 0px";
        this.maxFrame = 24;
        this.jump = 90;
        this.fps = 50;
        ThreadManager.End("animationTimer1");
        ThreadManager.Start("animationTimer1", "player.animation();", this.fps)
    },
    backflip: function () {
        ENGINETIME.lock = true;
        this.air = true;
        var A = window.document.getElementById(this.isCharacter).style;
        A.width = "167px";
        A.height = "148px";
        A.position = "relative";
        A.zindex = "4";
        A.background = "url(./ENGINE/Sprites/Players/" + this.isCharacter + "/backflip.gif) no-repeat";
        A.left = -77 + "px";
        A.top = -49 + "px";
        A.backgroundPosition = "0px 0px";
        this.frame = 0;
        this.loop = 1;
        this.maxFrame = 19;
        this.jump = 167;
        this.fps = 100;
        ThreadManager.End("animationTimer1");
        ThreadManager.Start("animationTimer1", "player.animation();", this.fps);
        this.XmoveByPixel = 120;
        this.YmoveByPixel = 140;
        this.YmoveByPixelOriginal = this.YmoveByPixel;
        this.XmoveByPixel = this.xcoordinate - this.XmoveByPixel;
        this.YmoveByPixel = this.ycoordinate - this.YmoveByPixel;
        this.xorientation = "<";
        this.yorientation = "^";
        this.xorigin();
        this.yoriginUp()
    },
    kick1: function () {
        ENGINETIME.lock = true;
        var A = window.document.getElementById(this.isCharacter).style;
        A.width = "92px";
        A.height = "97px";
        A.position = "relative";
        A.zindex = "4";
        A.background = "url(./ENGINE/Sprites/Players/" + this.isCharacter + "/kick1.gif) no-repeat";
        A.left = -15 + "px";
        A.top = 0 + "px";
        A.backgroundPosition = "0px 0px";
        this.frame = 0;
        this.loop = 1;
        this.maxFrame = 2;
        this.jump = 92;
        this.fps = 200;
        ThreadManager.End("animationTimer1");
        ThreadManager.Start("animationTimer1", "player.animation();", this.fps);
        this.XmoveByPixel = 0;
        this.XmoveByPixel = this.xcoordinate + this.XmoveByPixel;
        this.xorientation = ">";
        this.xorigin();
        this.broadcast()
    },
    kick1air: function () {
        ENGINETIME.lock = true;
        var A = window.document.getElementById(this.isCharacter).style;
        A.width = "103px";
        A.height = "80px";
        A.position = "relative";
        A.zindex = "4";
        A.background = "url(./ENGINE/Sprites/Players/" + this.isCharacter + "/kick1_air.gif) no-repeat";
        A.left = -15 + "px";
        A.top = 0 + "px";
        A.backgroundPosition = "0px 0px";
        this.frame = 0;
        this.loop = 1;
        this.maxFrame = 4;
        this.jump = 103;
        this.fps = 200;
        ThreadManager.End("animationTimer1");
        ThreadManager.Start("animationTimer1", "player.animation();", this.fps);
        this.broadcast()
    },
    kick3: function () {
        ENGINETIME.lock = true;
        var A = window.document.getElementById(this.isCharacter).style;
        A.width = "100px";
        A.height = "85px";
        A.position = "relative";
        A.zindex = "4";
        A.background = "url(./ENGINE/Sprites/Players/" + this.isCharacter + "/kick3.gif) no-repeat";
        A.left = 20 + "px";
        A.top = 15 + "px";
        A.backgroundPosition = "0px 0px";
        this.frame = 0;
        this.loop = 1;
        this.maxFrame = 6;
        this.jump = 100;
        this.fps = 100;
        ThreadManager.End("animationTimer1");
        ThreadManager.Start("animationTimer1", "player.animation();", this.fps);
        this.broadcast()
    },
    kick3air: function () {
        ENGINETIME.lock = true;
        var A = window.document.getElementById(this.isCharacter).style;
        A.width = "116px";
        A.height = "112px";
        A.position = "relative";
        A.zindex = "4";
        A.background = "url(./ENGINE/Sprites/Players/" + this.isCharacter + "/kick3_air.gif) no-repeat";
        A.left = -10 + "px";
        A.top = -20 + "px";
        A.backgroundPosition = "0px 0px";
        this.frame = 0;
        this.loop = 1;
        this.maxFrame = 6;
        this.jump = 116;
        this.fps = 100;
        ThreadManager.End("animationTimer1");
        ThreadManager.Start("animationTimer1", "player.animation();", this.fps);
        this.broadcast()
    },
    punch1: function () {
        ENGINETIME.lock = true;
        var A = window.document.getElementById(this.isCharacter).style;
        A.width = "105px";
        A.height = "187px";
        A.position = "relative";
        A.zindex = "4";
        A.background = "url(./ENGINE/Sprites/Players/" + this.isCharacter + "/punch1.gif) no-repeat";
        A.left = 0 + "px";
        A.top = 10 + "px";
        A.backgroundPosition = "0px 0px";
        this.frame = 0;
        this.loop = 1;
        this.maxFrame = 2;
        this.jump = 105;
        this.fps = 200;
        ThreadManager.End("animationTimer1");
        ThreadManager.Start("animationTimer1", "player.animation();", this.fps);
        this.XmoveByPixel = 0;
        this.XmoveByPixel = this.xcoordinate + this.XmoveByPixel;
        this.xorientation = ">";
        this.xorigin();
        this.broadcast()
    },
    punch1air: function () {
        ENGINETIME.lock = true;
        var A = window.document.getElementById(this.isCharacter).style;
        A.width = "75px";
        A.height = "80px";
        A.position = "relative";
        A.zindex = "4";
        A.background = "url(./ENGINE/Sprites/Players/" + this.isCharacter + "/punch1_air.gif) no-repeat";
        A.left = 0 + "px";
        A.top = 0 + "px";
        A.backgroundPosition = "0px 0px";
        this.frame = 0;
        this.loop = 1;
        this.maxFrame = 3;
        this.jump = 75;
        this.fps = 200;
        ThreadManager.End("animationTimer1");
        ThreadManager.Start("animationTimer1", "player.animation();", this.fps);
        this.broadcast()
    },
    punch3: function () {
        ENGINETIME.lock = true;
        var A = window.document.getElementById(this.isCharacter).style;
        A.width = "186px";
        A.height = "110px";
        A.position = "relative";
        A.zindex = "4";
        A.background = "url(./ENGINE/Sprites/Players/" + this.isCharacter + "/punch3.gif) no-repeat";
        A.left = 5 + "px";
        A.top = -15 + "px";
        A.backgroundPosition = "0px 0px";
        this.frame = 0;
        this.loop = 1;
        this.maxFrame = 17;
        this.jump = 186;
        this.fps = 50;
        ThreadManager.End("animationTimer1");
        ThreadManager.Start("animationTimer1", "player.animation();", this.fps);
        this.XmoveByPixel = 0;
        this.XmoveByPixel = this.xcoordinate + this.XmoveByPixel;
        this.xorientation = ">";
        this.xorigin();
        this.broadcast()
    },
    punch3air: function () {
        ENGINETIME.lock = true;
        var A = window.document.getElementById(this.isCharacter).style;
        A.width = "119px";
        A.height = "145px";
        A.position = "relative";
        A.zindex = "4";
        A.background = "url(./ENGINE/Sprites/Players/" + this.isCharacter + "/punch3_air.gif) no-repeat";
        A.left = 0 + "px";
        A.top = 0 + "px";
        A.backgroundPosition = "0px 0px";
        this.frame = 0;
        this.loop = 1;
        this.maxFrame = 6;
        this.jump = 119;
        this.fps = 100;
        ThreadManager.End("animationTimer1");
        ThreadManager.Start("animationTimer1", "player.animation();", this.fps);
        this.broadcast()
    },
    damage1: function () {
        ENGINETIME.lock = true;
        var A = window.document.getElementById(this.isCharacter).style;
        A.width = "101px";
        A.height = "96px";
        A.position = "relative";
        A.zindex = "4";
        A.background = "url(./ENGINE/Sprites/Players/" + this.isCharacter + "/damage1.gif) no-repeat";
        A.left = -10 + "px";
        A.top = 5 + "px";
        A.backgroundPosition = "0px 0px";
        this.frame = 0;
        this.loop = 1;
        this.maxFrame = 4;
        this.jump = 101;
        this.fps = 200;
        ThreadManager.End("animationTimer1");
        ThreadManager.Start("animationTimer1", "player.animation();", this.fps);
        this.XmoveByPixel = 50;
        this.XmoveByPixel = this.xcoordinate - this.XmoveByPixel;
        this.xorientation = "<";
        this.xorigin()
    },
    block1: function () {
        ENGINETIME.lock = true;
        this.block = true;
        var A = window.document.getElementById(this.isCharacter).style;
        A.width = "89px";
        A.height = "100px";
        A.position = "relative";
        A.zindex = "4";
        A.background = "url(./ENGINE/Sprites/Players/" + this.isCharacter + "/block1.gif) no-repeat";
        A.left = 0 + "px";
        A.top = -5 + "px";
        A.backgroundPosition = "0px 0px";
        this.frame = 0;
        this.loop = 1;
        this.maxFrame = 6;
        this.jump = 89;
        this.fps = 200;
        ThreadManager.End("animationTimer1");
        ThreadManager.Start("animationTimer1", "player.animation();", this.fps);
        this.XmoveByPixel = 0;
        this.XmoveByPixel = this.xcoordinate - this.XmoveByPixel;
        this.xorientation = "<";
        this.xorigin();
        this.broadcast()
    },
    pushed: function () {
        this.XmoveByPixel = 50;
        this.XmoveByPixel = this.xcoordinate - this.XmoveByPixel;
        this.xorientation = "<";
        this.xorigin();
        this.broadcast()
    },
    walk: function () {
        ENGINETIME.lock = false;
        eval("var a = window.document.getElementById('" + this.isCharacter + "').style;");
        a.width = "100px";
        a.height = "105px";
        a.position = "relative";
        a.zindex = "4";
        a.background = "url(./ENGINE/Sprites/Players/" + this.isCharacter + "/walk.gif) no-repeat";
        a.left = -20 + "px";
        a.top = -5 + "px";
        a.backgroundPosition = "0px 0px";
        this.frame = 0;
        this.loop = 1;
        this.maxFrame = 26;
        this.jump = 100;
        this.fps = 50;
        ThreadManager.End("animationTimer1");
        ThreadManager.Start("animationTimer1", "player.animation();", this.fps);
        this.XmoveByPixel = 110;
        this.XmoveByPixel = this.xcoordinate + this.XmoveByPixel;
        this.xorientation = ">";
        this.xorigin()
    },
    backpedal: function () {
        ENGINETIME.lock = false;
        var A = window.document.getElementById(this.isCharacter).style;
        A.width = "100px";
        A.height = "105px";
        A.position = "relative";
        A.zindex = "4";
        A.background = "url(./ENGINE/Sprites/Players/" + this.isCharacter + "/back.gif) no-repeat";
        A.left = -20 + "px";
        A.top = -5 + "px";
        A.backgroundPosition = "0px 0px";
        this.frame = 0;
        this.loop = 1;
        this.maxFrame = 27;
        this.jump = 100;
        this.fps = 45;
        ThreadManager.End("animationTimer1");
        ThreadManager.Start("animationTimer1", "player.animation();", this.fps);
        this.XmoveByPixel = 100;
        this.XmoveByPixel = this.xcoordinate - this.XmoveByPixel;
        this.xorientation = "<";
        this.xorigin()
    },
    superclassKick1: function () {
        if (this.air) {
            player.kick1air()
        } else {
            player.kick1()
        }
    },
    superclassKick3: function () {
        if (this.air) {
            player.kick3air()
        } else {
            player.kick3()
        }
    },
    superclassPunch1: function () {
        if (this.air) {
            player.punch1air()
        } else {
            player.punch1()
        }
    },
    superclassPunch3: function () {
        if (this.air) {
            player.punch3air()
        } else {
            player.punch3()
        }
    },
    superclassBlock: function () {
        if (this.air) {} else {
            player.block1()
        }
    },
    broadcast: function () {
        ENGINE.instance(this.isCharacter)
    }
};
var console = {
    displayOutput: function () {
        document.getElementById("letters").style.visibility = "visible";
        document.getElementById("console").style.visibility = "visible";
        document.getElementById("titleBar").style.visibility = "visible";
        document.getElementById("output").style.visibility = "visible"
    },
    output: function (A) {
        document.getElementById("output").innerHTML = A
    }
};
var computer = {
    pX: 0,
    pY: 0,
    pTag: "Player2_Tag",
    frame: 0,
    loop: 1,
    isCharacter: "Juggernaut",
    toCharacter: "Psylocke",
    xcoordinate: 180,
    ycoordinate: 70,
    overlap: false,
    lock: false,
    character: function (A) {
        this.isCharacter = A
    },
    ai: function () {
        computer.punch3();
        ThreadManager.End("aiTimer");
        ThreadManager.Start("aiTimer", "computer.ai();", 7000)
    },
    setcomputerTag: function () {
        var A = window.document.getElementById(this.pTag).style;
        A.left = this.xcoordinate + "px";
        A.top = this.ycoordinate + "px";
        A.height = "140px";
        A.width = "165px";
        A.position = "absolute"
    },
    animation: function () {
        var A = window.document.getElementById(this.isCharacter).style;
        if (this.loop < this.maxFrame) {
            this.frame = this.frame + this.jump;
            this.loop = this.loop + 1;
            A.backgroundPosition = "-" + this.frame + "px 0px";
            if ((this.attack == true) && (this.loop == (Math.round(this.maxFrame / 2)))) {
                this.broadcast()
            }
        } else {
            this.frame = 0;
            this.loop = 1;
            this.stance1()
        }
        ThreadManager.End("animationTimer2");
        ThreadManager.Start("animationTimer2", "computer.animation();", this.fps)
    },
    stance1: function () {
        this.attack = false;
        ENGINETIME.lock = false;
        var A = window.document.getElementById(this.isCharacter).style;
        A.width = "165px";
        A.height = "140px";
        A.position = "relative";
        A.left = this.pX + "px";
        A.top = this.pY + "px";
        A.zindex = "4";
        A.background = "url(./ENGINE/Sprites/Players/" + this.isCharacter + "/stance1.gif) no-repeat";
        this.maxFrame = 8;
        this.jump = 164;
        this.fps = 150;
        ThreadManager.End("animationTimer2");
        ThreadManager.Start("animationTimer2", "computer.animation();", this.fps)
    },
    damage1: function () {
        ENGINETIME.lock = false;
        var A = window.document.getElementById(this.isCharacter).style;
        A.width = "165px";
        A.height = "140px";
        A.position = "relative";
        A.left = this.pX + "px";
        A.top = this.pY + "px";
        A.zindex = "4";
        A.background = "url(./ENGINE/Sprites/Players/" + this.isCharacter + "/stance1_dmg.gif) no-repeat";
        this.maxFrame = 8;
        this.jump = 164;
        this.fps = 150;
        ThreadManager.End("animationTimer2");
        ThreadManager.Start("animationTimer2", "computer.animation();", this.fps)
    },
    locked: function () {
        this.attack = true;
        ENGINETIME.lock = false;
        var A = window.document.getElementById(this.isCharacter).style;
        A.width = "257px";
        A.height = "216px";
        A.position = "relative";
        A.zindex = "4";
        A.background = "url(./ENGINE/Sprites/Players/" + this.isCharacter + "/punch3_locked.gif) no-repeat";
        A.left = -95 + "px";
        A.top = -70 + "px";
        this.frame = 0;
        this.loop = 7;
        this.maxFrame = 7;
        this.jump = 257;
        this.fps = 15000;
        ThreadManager.End("animationTimer2");
        ThreadManager.Start("animationTimer2", "computer.animation();", this.fps);
        this.XmoveByPixel = 0;
        this.XmoveByPixel = this.xcoordinate + this.XmoveByPixel;
        this.xorientation = ">"
    },
    punch3: function () {
        this.attack = true;
        ENGINETIME.lock = false;
        var A = window.document.getElementById(this.isCharacter).style;
        A.width = "257px";
        A.height = "216px";
        A.position = "relative";
        A.zindex = "4";
        A.background = "url(./ENGINE/Sprites/Players/" + this.isCharacter + "/punch3.gif) no-repeat";
        A.left = -95 + "px";
        A.top = -70 + "px";
        this.frame = 0;
        this.loop = 1;
        this.maxFrame = 9;
        this.jump = 257;
        this.fps = 150;
        ThreadManager.End("animationTimer2");
        ThreadManager.Start("animationTimer2", "computer.animation();", this.fps);
        this.XmoveByPixel = 0;
        this.XmoveByPixel = this.xcoordinate + this.XmoveByPixel;
        this.xorientation = ">"
    },
    broadcast: function () {
        ENGINE.instance(this.isCharacter)
    }
}

