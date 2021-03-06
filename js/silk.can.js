"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Counts the amount of seconds between a starting event
 * and an ending event
 *
 * @author Christian Wang
 * @version 1.0
 */
var Timer = function () {
  /**
   * Default constructor for timer object
   * Starts the timer
   */
  function Timer() {
    _classCallCheck(this, Timer);

    this.mark();
  }

  /**
   * Starts the timer and sets the starttime value to current time
   */


  _createClass(Timer, [{
    key: "mark",
    value: function mark() {
      this.startTime = Date.now();
    }

    /**
     * Returns the amount of seconds that passed
     * Since the starting event
     */

  }, {
    key: "secondsElapsed",
    value: function secondsElapsed() {
      return (Date.now() - this.startTime) / 1000;
    }

    /**
     * Returns the amount of millisecondss that passed
     * Since the starting event
     */

  }, {
    key: "millisecondsElapsed",
    value: function millisecondsElapsed() {
      return Date.now() - this.startTime;
    }
  }]);

  return Timer;
}();

/**
 * Manages event listeners for an element
 *
 *@author Christian Wang
 *@version 1.0
 **/


var InputHandler = function () {
  /**
   * Creates a default InputHandler with properties
   **/
  function InputHandler() {
    _classCallCheck(this, InputHandler);

    this.input = {
      keys: [],
      click: false
    };
  }

  /**
   * Listens on element for events given
   **/


  _createClass(InputHandler, [{
    key: "targetEvents",
    value: function targetEvents(element, events) {
      var obj = this;
      if (events.keydown) element.addEventListener("keydown", function (e) {
        obj.input.keys[e.which] = true;
      });
      if (events.keyup) element.addEventListener("keyup", function (e) {
        obj.input.keys[e.which] = false;
      });
      if (events.click) {
        element.addEventListener("click", function (e) {
          obj.input.click = true;
        });
      }
    }

    /**
     * Returns the keys that are pressed
     **/

  }, {
    key: "keys",
    get: function get() {
      return this.input.keys;
    }

    /**
     * Returns true if the element has been clicked
     **/

  }, {
    key: "click",
    get: function get() {
      if (this.input.click) {
        //reset
        this.input.click = false;
        return true;
      }
      return this.input.click;
    }
  }]);

  return InputHandler;
}();

/**
* @author Christian Wang
* @version 1.0
**/


var SilkObject = function () {
  /**
   * Creates a new WebObject passing in an existing DOM element
   **/
  function SilkObject(element) {
    _classCallCheck(this, SilkObject);

    this.bindElement(element);
    element.classList.add(this.constructor.name);
  }

  /**
   * Set this object's element to a new given element and
   * recalculate the new bounds
   **/


  _createClass(SilkObject, [{
    key: "bindElement",
    value: function bindElement(element) {
      this.element = element;
      //update initial bounds
      var bounds = element.getBoundingClientRect();
      this.setBounds(bounds);
    }

    /**
     * Add or set style properties to the element
     **/

  }, {
    key: "styleElement",
    value: function styleElement(styles) {
      Object.assign(this.element.style, styles);
    }

    /**
     * Set the bounds(dimension and location) to the given bounds object
     **/

  }, {
    key: "setBounds",
    value: function setBounds(bounds) {
      if (bounds.x) if (typeof bounds.x === "string") {
        this.element.style["left"] = bounds.x;
        //recalc based on bounds
        this.x = this.element.getBoundingClientRect().x;
      } else {
        //assume its px
        this.element.style["left"] = bounds.x + "px";
        this.x = bounds.x;
      }
      if (bounds.y) if (typeof bounds.y === "string") {
        this.element.style["top"] = bounds.y;
        //recalc based on bounds
        this.y = this.element.getBoundingClientRect().y;
      } else {
        this.element.style["top"] = bounds.y + "px";
        this.y = bounds.y;
      }
      if (bounds.width) if (typeof bounds.width === "string") {
        this.element.style["width"] = bounds.width;
        //recalc based on bounds
        this.width = this.element.getBoundingClientRect().width;
      } else {
        this.element.style["width"] = bounds.width + "px";
        this.width = bounds.width;
      }
      if (bounds.height) if (typeof bounds.height === "string") {
        this.element.style["height"] = bounds.height;
        //recalc based on bounds
        this.height = this.element.getBoundingClientRect().height;
      } else {
        this.element.style["height"] = bounds.height + "px";
        this.height = bounds.height;
      }
    }

    /**
     * Return the bounds(dimensions and location) of this object
     **/

  }, {
    key: "getBounds",
    value: function getBounds() {
      return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
      };
    }
  }]);

  return SilkObject;
}();

/**
 * An DOM object with it's own layer of interactivity
 *
 * @author Christian Wang
 * @version 1.0
 **/


var Actor = function (_SilkObject) {
  _inherits(Actor, _SilkObject);

  /**
   * Creates a new Actor with a div element
   **/
  function Actor(element) {
    _classCallCheck(this, Actor);

    //World stuff
    var _this = _possibleConstructorReturn(this, (Actor.__proto__ || Object.getPrototypeOf(Actor)).call(this, element));

    _this.stage = null;

    //preload
    _this.preload();
    return _this;
  }

  //Actor Processes


  _createClass(Actor, [{
    key: "preload",
    value: function preload() {}
  }, {
    key: "render",
    value: function render() {}
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "destroy",
    value: function destroy() {}
  }]);

  return Actor;
}(SilkObject);

/**
 * An DOM object that houses actors and manages
 * their runtime states
 *
 * @author Christian Wang
 * @version 1.0
 **/


var Stage = function (_SilkObject2) {
  _inherits(Stage, _SilkObject2);

  /**
   * Creates a new Stage with a given element
   **/
  function Stage(element) {
    _classCallCheck(this, Stage);

    var _this2 = _possibleConstructorReturn(this, (Stage.__proto__ || Object.getPrototypeOf(Stage)).call(this, element));

    _this2.actors = [];
    _this2.running = false;

    //Timers for ticks
    _this2.renderTimer = new Timer();
    _this2.updateTimer = new Timer();

    _this2.renderTicks = 0;
    _this2.updateTicks = 0;
    return _this2;
  }

  /**
   * Starts render and update cycles
   **/


  _createClass(Stage, [{
    key: "start",
    value: function start(renderTicks, updateTicks) {
      this.renderTicks = renderTicks;
      this.updateTicks = updateTicks;
      this.running = true;
      window.requestAnimationFrame(this.render.bind(this));
      window.requestAnimationFrame(this.update.bind(this));
    }
  }, {
    key: "render",
    value: function render() {
      if (this.renderTimer.millisecondsElapsed() > 1000 / this.renderTicks) {
        this.renderTimer.mark();
        this.actors.forEach(function (actor) {
          if (actor.render) actor.render();
        });
      }
      window.requestAnimationFrame(this.render.bind(this));
    }
  }, {
    key: "update",
    value: function update() {
      if (this.updateTimer.millisecondsElapsed() > 1000 / this.updateTicks) {
        this.updateTimer.mark();
        this.actors.forEach(function (actor) {
          if (actor.update) actor.update();
        });
      }
      window.requestAnimationFrame(this.update.bind(this));
    }

    /**
     * Stops the actors in this stage from looping
     **/

  }, {
    key: "stop",
    value: function stop() {
      this.running = false;
      /**
      this.actors.forEach(function(e) {
        e.actor.stop();
      });**/
      window.cancelAnimationFrame(this.render);
      window.cancelAnimationFrame(this.update);
    }

    /**
     * Adds an actor to this stage
     **/

  }, {
    key: "addActor",
    value: function addActor(actor, bounds) {
      actor.stage = this;
      this.actors.push(actor);
      this.element.appendChild(actor.element);
      if (bounds != null) actor.setBounds(bounds);
    }

    /**
     * Removes an Actor from this stage
     **/

  }, {
    key: "removeActor",
    value: function removeActor(actor) {
      actor.stage = null;
      actor.stop();
      for (var i = 0; i < this.actors.length; i++) {
        if (Object.is(actor, this.actors[i])) this.actors.splice(i, 1);
      }
      actor.destroy();
      this.element.removeChild(actor.element);
    }
  }]);

  return Stage;
}(SilkObject);

var CanvasObject = function () {
  /**
   * Creates a new CanvasObject
   **/
  function CanvasObject() {
    _classCallCheck(this, CanvasObject);
  }

  //Pass style as a function(ctx)


  _createClass(CanvasObject, [{
    key: "styleElement",
    value: function styleElement(style) {
      this.style = style;
    }

    /**
     * Set the bounds(dimension and location) to the given bounds object
     **/

  }, {
    key: "setBounds",
    value: function setBounds(bounds) {
      if (bounds.x) this.x = bounds.x;
      if (bounds.y) this.y = bounds.y;
      if (bounds.width) this.width = bounds.width;
      if (bounds.height) this.height = bounds.height;
    }

    /**
     * Return the bounds(dimensions and location) of this object
     **/

  }, {
    key: "getBounds",
    value: function getBounds() {
      return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
      };
    }
  }]);

  return CanvasObject;
}();

/**
 * An Canvas object with it's own layer of interactivity
 *
 * @author Christian Wang
 * @version 1.0
 **/


var CanvasActor = function (_CanvasObject) {
  _inherits(CanvasActor, _CanvasObject);

  /**
   * Creates a new Actor with a div element
   **/
  function CanvasActor() {
    _classCallCheck(this, CanvasActor);

    //World stuff
    var _this3 = _possibleConstructorReturn(this, (CanvasActor.__proto__ || Object.getPrototypeOf(CanvasActor)).call(this));

    _this3.stage = null;

    //preload
    _this3.preload();
    return _this3;
  }

  //Actor Processes


  _createClass(CanvasActor, [{
    key: "preload",
    value: function preload() {}
  }, {
    key: "render",
    value: function render() {}
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "destroy",
    value: function destroy() {}
  }]);

  return CanvasActor;
}(CanvasObject);

/**
 * A Canvas reference that houses canvascanvasActors and manages
 * their runtime states
 *
 * @author Christian Wang
 * @version 1.0
 **/


var CanvasStage = function (_SilkObject3) {
  _inherits(CanvasStage, _SilkObject3);

  /**
   * Creates a new CanvasStage with a passed canvas reference
   **/
  function CanvasStage(canvas) {
    _classCallCheck(this, CanvasStage);

    //grab context
    var _this4 = _possibleConstructorReturn(this, (CanvasStage.__proto__ || Object.getPrototypeOf(CanvasStage)).call(this, canvas));

    _this4.ctx = canvas.getContext('2d');

    //background is a function(ctx)
    _this4.background = null;

    _this4.canvasActors = [];
    _this4.running = false;

    //Timers for ticks
    _this4.renderTimer = new Timer();
    _this4.updateTimer = new Timer();

    _this4.renderTicks = 0;
    _this4.updateTicks = 0;
    return _this4;
  }

  /**
   * Starts render and update cycles
   **/


  _createClass(CanvasStage, [{
    key: "start",
    value: function start(renderTicks, updateTicks) {
      this.renderTicks = renderTicks;
      this.updateTicks = updateTicks;
      this.running = true;
      window.requestAnimationFrame(this.render.bind(this));
      window.requestAnimationFrame(this.update.bind(this));
    }
  }, {
    key: "render",
    value: function render() {
      if (this.renderTimer.millisecondsElapsed() > 1000 / this.renderTicks) {
        this.renderTimer.mark();

        //render background
        if (this.background) this.background(this.ctx);

        var ctx = this.ctx;
        this.canvasActors.forEach(function (actor) {
          if (actor.render) actor.render();
          if (actor.style) actor.style(ctx);
        });
      }
      window.requestAnimationFrame(this.render.bind(this));
    }
  }, {
    key: "update",
    value: function update() {
      if (this.updateTimer.millisecondsElapsed() > 1000 / this.updateTicks) {
        this.updateTimer.mark();
        this.canvasActors.forEach(function (actor) {
          if (actor.update) actor.update();
        });
      }
      window.requestAnimationFrame(this.update.bind(this));
    }

    /**
     * Stops the canvasActors in this stage from looping
     **/

  }, {
    key: "stop",
    value: function stop() {
      this.running = false;
      /**
      this.canvasActors.forEach(function(e) {
        e.actor.stop();
      });**/
      window.cancelAnimationFrame(this.render);
      window.cancelAnimationFrame(this.update);
    }

    /**
     * Adds an actor to this stage
     **/

  }, {
    key: "addActor",
    value: function addActor(actor, bounds) {
      actor.stage = this;
      this.canvasActors.push(actor);
      if (bounds != null) actor.setBounds(bounds);
    }

    /**
     * Removes an Actor from this stage
     **/

  }, {
    key: "removeActor",
    value: function removeActor(actor) {
      actor.stage = null;
      actor.stop();
      for (var i = 0; i < this.canvasActors.length; i++) {
        if (Object.is(actor, this.canvasActors[i])) this.canvasActors.splice(i, 1);
      }
      actor.destroy();
    }
  }]);

  return CanvasStage;
}(SilkObject);