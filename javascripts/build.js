(function outer(modules, cache, entries){

  /**
   * Global
   */

  var global = (function(){ return this; })();

  /**
   * Require `name`.
   *
   * @param {String} name
   * @api public
   */

  function require(name){
    if (cache[name]) return cache[name].exports;
    if (modules[name]) return call(name, require);
    throw new Error('cannot find module "' + name + '"');
  }

  /**
   * Call module `id` and cache it.
   *
   * @param {Number} id
   * @param {Function} require
   * @return {Function}
   * @api private
   */

  function call(id, require){
    var m = cache[id] = { exports: {} };
    var mod = modules[id];
    var name = mod[2];
    var fn = mod[0];
    var threw = true;

    try {
      fn.call(m.exports, function(req){
        var dep = modules[id][1][req];
        return require(dep || req);
      }, m, m.exports, outer, modules, cache, entries);
      threw = false;
    } finally {
      if (threw) {
        delete cache[id];
      } else if (name) {
        // expose as 'name'.
        cache[name] = cache[id];
      }
    }

    return cache[id].exports;
  }

  /**
   * Require all entries exposing them on global if needed.
   */

  for (var id in entries) {
    if (entries[id]) {
      global[entries[id]] = require(id);
    } else {
      require(id);
    }
  }

  /**
   * Duo flag.
   */

  require.duo = true;

  /**
   * Expose cache.
   */

  require.cache = cache;

  /**
   * Expose modules
   */

  require.modules = modules;

  /**
   * Return newest require.
   */

   return require;
})({
1: [function(require, module, exports) {
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dekujsDeku = require('dekujs/deku');

var _dekujsVirtualElement = require('dekujs/virtual-element');

var _dekujsVirtualElement2 = _interopRequireDefault(_dekujsVirtualElement);

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _viewsBoard = require('./views/board');

var _viewsBoard2 = _interopRequireDefault(_viewsBoard);

var _viewsCanvas = require('./views/canvas');

var _viewsCanvas2 = _interopRequireDefault(_viewsCanvas);

console.log('booting')

var app = (0, _dekujsDeku.tree)();

app.use(_model2['default']);
app.use(_events2['default']);
app.use(_router2['default']);

app.on('route:index', function (p) {
  console.log('route:index')
  return app.mount((0, _dekujsVirtualElement2['default'])(_viewsBoard2['default'], null));
});
app.on('route:image', function (p) {
  return app.mount((0, _dekujsVirtualElement2['default'])(_viewsCanvas2['default'], null));
});
window.app = app;
//app.router.start();

(0, _dekujsDeku.render)(app, document.querySelector('main'));
}, {"dekujs/deku":2,"dekujs/virtual-element":3,"./model":4,"./events":5,"./router":6,"./views/board":7,"./views/canvas":8}],
2: [function(require, module, exports) {
"use strict";

(function (f) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }g.deku = f();
  }
})(function () {
  var define, module, exports;return (function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof _require == "function" && _require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw (f.code = "MODULE_NOT_FOUND", f);
        }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }return n[o].exports;
    }var i = typeof _require == "function" && _require;for (var o = 0; o < r.length; o++) s(r[o]);return s;
  })({ 1: [function (_require, module, exports) {
      /**
       * Module dependencies.
       */

      var Emitter = _require('component-emitter');

      /**
       * Expose `scene`.
       */

      module.exports = Application;

      /**
       * Create a new `Application`.
       *
       * @param {Object} element Optional initial element
       */

      function Application(element) {
        if (!(this instanceof Application)) return new Application(element);
        this.options = {};
        this.sources = {};
        this.element = element;
      }

      /**
       * Mixin `Emitter`.
       */

      Emitter(Application.prototype);

      /**
       * Add a plugin
       *
       * @param {Function} plugin
       */

      Application.prototype.use = function (plugin) {
        plugin(this);
        return this;
      };

      /**
       * Set an option
       *
       * @param {String} name
       */

      Application.prototype.option = function (name, val) {
        this.options[name] = val;
        return this;
      };

      /**
       * Set value used somewhere in the IO network.
       */

      Application.prototype.set = function (name, data) {
        this.sources[name] = data;
        this.emit('source', name, data);
        return this;
      };

      /**
       * Mount a virtual element.
       *
       * @param {VirtualElement} element
       */

      Application.prototype.mount = function (element) {
        this.element = element;
        this.emit('mount', element);
        return this;
      };

      /**
       * Remove the world. Unmount everything.
       */

      Application.prototype.unmount = function () {
        if (!this.element) return;
        this.element = null;
        this.emit('unmount');
        return this;
      };
    }, { "component-emitter": 8 }], 2: [function (_require, module, exports) {
      /**
       * All of the events can bind to
       */

      module.exports = {
        onBlur: 'blur',
        onChange: 'change',
        onClick: 'click',
        onContextMenu: 'contextmenu',
        onCopy: 'copy',
        onCut: 'cut',
        onDoubleClick: 'dblclick',
        onDrag: 'drag',
        onDragEnd: 'dragend',
        onDragEnter: 'dragenter',
        onDragExit: 'dragexit',
        onDragLeave: 'dragleave',
        onDragOver: 'dragover',
        onDragStart: 'dragstart',
        onDrop: 'drop',
        onError: 'error',
        onFocus: 'focus',
        onInput: 'input',
        onInvalid: 'invalid',
        onKeyDown: 'keydown',
        onKeyPress: 'keypress',
        onKeyUp: 'keyup',
        onMouseDown: 'mousedown',
        onMouseEnter: 'mouseenter',
        onMouseLeave: 'mouseleave',
        onMouseMove: 'mousemove',
        onMouseOut: 'mouseout',
        onMouseOver: 'mouseover',
        onMouseUp: 'mouseup',
        onPaste: 'paste',
        onReset: 'reset',
        onScroll: 'scroll',
        onSubmit: 'submit',
        onTouchCancel: 'touchcancel',
        onTouchEnd: 'touchend',
        onTouchMove: 'touchmove',
        onTouchStart: 'touchstart',
        onWheel: 'wheel'
      };
    }, {}], 3: [function (_require, module, exports) {
      /**
       * Create the application.
       */

      exports.tree = exports.scene = exports.deku = _require('./application');

      /**
       * Render scenes to the DOM.
       */

      if (typeof document !== 'undefined') {
        exports.render = _require('./render');
      }

      /**
       * Render scenes to a string
       */

      exports.renderString = _require('./stringify');
    }, { "./application": 1, "./render": 5, "./stringify": 6 }], 4: [function (_require, module, exports) {
      var type = _require('component-type');

      /**
       * Returns the type of a virtual node
       *
       * @param  {Object} node
       * @return {String}
       */

      module.exports = function nodeType(node) {
        var v = type(node);
        if (v === 'null' || node === false) return 'empty';
        if (v !== 'object') return 'text';
        if (type(node.type) === 'string') return 'element';
        return 'component';
      };
    }, { "component-type": 10 }], 5: [function (_require, module, exports) {
      /**
       * Dependencies.
       */

      var raf = _require('component-raf');
      var isDom = _require('is-dom');
      var uid = _require('get-uid');
      var keypath = _require('object-path');
      var events = _require('./events');
      var svg = _require('./svg');
      var defaults = _require('object-defaults');
      var forEach = _require('fast.js/forEach');
      var assign = _require('fast.js/object/assign');
      var reduce = _require('fast.js/reduce');
      var nodeType = _require('./node-type');

      /**
       * Expose `dom`.
       */

      module.exports = render;

      /**
       * Render an app to the DOM
       *
       * @param {Application} app
       * @param {HTMLElement} container
       * @param {Object} opts
       *
       * @return {Object}
       */

      function render(app, container, opts) {
        var frameId;
        var isRendering;
        var rootId = 'root';
        var currentElement;
        var currentNativeElement;
        var connections = {};
        var components = {};
        var entities = {};
        var handlers = {};
        var mountQueue = [];
        var children = {};
        children[rootId] = {};

        if (!isDom(container)) {
          throw new Error('Container element must be a DOM element');
        }

        /**
         * Rendering options. Batching is only ever really disabled
         * when running tests, and pooling can be disabled if the user
         * is doing something stupid with the DOM in their components.
         */

        var options = defaults(assign({}, app.options || {}, opts || {}), {
          batching: true
        });

        /**
         * Listen to DOM events
         */
        var rootElement = getRootElement(container);
        addNativeEventListeners();

        /**
         * Watch for changes to the app so that we can update
         * the DOM as needed.
         */

        app.on('unmount', onunmount);
        app.on('mount', onmount);
        app.on('source', onupdate);

        /**
         * If the app has already mounted an element, we can just
         * render that straight away.
         */

        if (app.element) render();

        /**
         * Teardown the DOM rendering so that it stops
         * rendering and everything can be garbage collected.
         */

        function teardown() {
          removeNativeEventListeners();
          removeNativeElement();
          app.off('unmount', onunmount);
          app.off('mount', onmount);
          app.off('source', onupdate);
        }

        /**
         * Swap the current rendered node with a new one that is rendered
         * from the new virtual element mounted on the app.
         *
         * @param {VirtualElement} element
         */

        function onmount() {
          invalidate();
        }

        /**
         * If the app unmounts an element, we should clear out the current
         * rendered element. This will remove all the entities.
         */

        function onunmount() {
          removeNativeElement();
          currentElement = null;
        }

        /**
         * Update all components that are bound to the source
         *
         * @param {String} name
         * @param {*} data
         */

        function onupdate(name, data) {
          if (!connections[name]) return;
          connections[name].forEach(function (update) {
            update(data);
          });
        }

        /**
         * Render and mount a component to the native dom.
         *
         * @param {Entity} entity
         * @return {HTMLElement}
         */

        function mountEntity(entity) {
          register(entity);
          setSources(entity);
          children[entity.id] = {};
          entities[entity.id] = entity;

          // commit initial state and props.
          commit(entity);

          // callback before mounting.
          trigger('beforeMount', entity, [entity.context]);
          trigger('beforeRender', entity, [entity.context]);

          // render virtual element.
          var virtualElement = renderEntity(entity);
          // create native element.
          var nativeElement = toNative(entity.id, '0', virtualElement);

          entity.virtualElement = virtualElement;
          entity.nativeElement = nativeElement;

          // Fire afterRender and afterMount hooks at the end
          // of the render cycle
          mountQueue.push(entity.id);

          return nativeElement;
        }

        /**
         * Remove a component from the native dom.
         *
         * @param {Entity} entity
         */

        function unmountEntity(entityId) {
          var entity = entities[entityId];
          if (!entity) return;
          trigger('beforeUnmount', entity, [entity.context, entity.nativeElement]);
          unmountChildren(entityId);
          removeAllEvents(entityId);
          var componentEntities = components[entityId].entities;
          delete componentEntities[entityId];
          delete components[entityId];
          delete entities[entityId];
          delete children[entityId];
        }

        /**
         * Render the entity and make sure it returns a node
         *
         * @param {Entity} entity
         *
         * @return {VirtualTree}
         */

        function renderEntity(entity) {
          var component = entity.component;
          var fn = typeof component === 'function' ? component : component.render;
          if (!fn) throw new Error('Component needs a render function');
          var result = fn(entity.context, setState(entity));
          if (!result) throw new Error('Render function must return an element.');
          return result;
        }

        /**
         * Whenever setState or setProps is called, we mark the entity
         * as dirty in the renderer. This lets us optimize the re-rendering
         * and skip components that definitely haven't changed.
         *
         * @param {Entity} entity
         *
         * @return {Function} A curried function for updating the state of an entity
         */

        function setState(entity) {
          return function (nextState) {
            updateEntityState(entity, nextState);
          };
        }

        /**
         * Tell the app it's dirty and needs to re-render. If batching is disabled
         * we can just trigger a render immediately, otherwise we'll wait until
         * the next available frame.
         */

        function invalidate() {
          if (!options.batching) {
            if (!isRendering) render();
          } else {
            if (!frameId) frameId = raf(render);
          }
        }

        /**
         * Update the DOM. If the update fails we stop the loop
         * so we don't get errors on every frame.
         *
         * @api public
         */

        function render() {
          // If this is called synchronously we need to
          // cancel any pending future updates
          clearFrame();

          // If the rendering from the previous frame is still going,
          // we'll just wait until the next frame. Ideally renders should
          // not take over 16ms to stay within a single frame, but this should
          // catch it if it does.
          if (isRendering) {
            frameId = raf(render);
            return;
          } else {
            isRendering = true;
          }

          // 1. If there isn't a native element rendered for the current mounted element
          // then we need to create it from scratch.
          // 2. If a new element has been mounted, we should diff them.
          // 3. We should update check all child components for changes.
          if (!currentNativeElement) {
            currentElement = app.element;
            currentNativeElement = toNative(rootId, '0', currentElement);
            if (container.children.length > 0) {
              console.info('deku: The container element is not empty. These elements will be removed. Read more: http://cl.ly/b0Sr');
            }
            if (container === document.body) {
              console.warn('deku: Using document.body is allowed but it can cause some issues. Read more: http://cl.ly/b0SC');
            }
            removeAllChildren(container);
            container.appendChild(currentNativeElement);
          } else if (currentElement !== app.element) {
            currentNativeElement = patch(rootId, currentElement, app.element, currentNativeElement);
            currentElement = app.element;
            updateChildren(rootId);
          } else {
            updateChildren(rootId);
          }

          // Call mount events on all new entities
          flushMountQueue();

          // Allow rendering again.
          isRendering = false;
        }

        /**
         * Call hooks for all new entities that have been created in
         * the last render from the bottom up.
         */

        function flushMountQueue() {
          while (mountQueue.length > 0) {
            var entityId = mountQueue.shift();
            var entity = entities[entityId];
            trigger('afterRender', entity, [entity.context, entity.nativeElement]);
            trigger('afterMount', entity, [entity.context, entity.nativeElement, setState(entity)]);
          }
        }

        /**
         * Clear the current scheduled frame
         */

        function clearFrame() {
          if (!frameId) return;
          raf.cancel(frameId);
          frameId = 0;
        }

        /**
         * Update a component.
         *
         * The entity is just the data object for a component instance.
         *
         * @param {String} id Component instance id.
         */

        function updateEntity(entityId) {
          var entity = entities[entityId];
          setSources(entity);

          if (!shouldUpdate(entity)) {
            commit(entity);
            return updateChildren(entityId);
          }

          var currentTree = entity.virtualElement;
          var nextProps = entity.pendingProps;
          var nextState = entity.pendingState;
          var previousState = entity.context.state;
          var previousProps = entity.context.props;

          // hook before rendering. could modify state just before the render occurs.
          trigger('beforeUpdate', entity, [entity.context, nextProps, nextState]);
          trigger('beforeRender', entity, [entity.context]);

          // commit state and props.
          commit(entity);

          // re-render.
          var nextTree = renderEntity(entity);

          // if the tree is the same we can just skip this component
          // but we should still check the children to see if they're dirty.
          // This allows us to memoize the render function of components.
          if (nextTree === currentTree) return updateChildren(entityId);

          // apply new virtual tree to native dom.
          entity.nativeElement = patch(entityId, currentTree, nextTree, entity.nativeElement);
          entity.virtualElement = nextTree;
          updateChildren(entityId);

          // trigger render hook
          trigger('afterRender', entity, [entity.context, entity.nativeElement]);

          // trigger afterUpdate after all children have updated.
          trigger('afterUpdate', entity, [entity.context, previousProps, previousState, setState(entity)]);
        }

        /**
         * Update all the children of an entity.
         *
         * @param {String} id Component instance id.
         */

        function updateChildren(entityId) {
          forEach(children[entityId], function (childId) {
            updateEntity(childId);
          });
        }

        /**
         * Remove all of the child entities of an entity
         *
         * @param {Entity} entity
         */

        function unmountChildren(entityId) {
          forEach(children[entityId], function (childId) {
            unmountEntity(childId);
          });
        }

        /**
         * Remove the root element. If this is called synchronously we need to
         * cancel any pending future updates.
         */

        function removeNativeElement() {
          clearFrame();
          removeElement(rootId, '0', currentNativeElement);
          currentNativeElement = null;
        }

        /**
         * Create a native element from a virtual element.
         *
         * @param {String} entityId
         * @param {String} path
         * @param {Object} vnode
         *
         * @return {HTMLDocumentFragment}
         */

        function toNative(entityId, path, vnode) {
          switch (nodeType(vnode)) {
            case 'text':
              return toNativeText(vnode);
            case 'empty':
              return toNativeEmptyElement(entityId, path);
            case 'element':
              return toNativeElement(entityId, path, vnode);
            case 'component':
              return toNativeComponent(entityId, path, vnode);
          }
        }

        /**
         * Create a native text element from a virtual element.
         *
         * @param {Object} vnode
         */

        function toNativeText(text) {
          return document.createTextNode(text);
        }

        /**
         * Create a native element from a virtual element.
         */

        function toNativeElement(entityId, path, vnode) {
          var el;
          var attributes = vnode.attributes;
          var tagName = vnode.type;
          var childNodes = vnode.children;

          // create element either from pool or fresh.
          if (svg.isElement(tagName)) {
            el = document.createElementNS(svg.namespace, tagName);
          } else {
            el = document.createElement(tagName);
          }

          // set attributes.
          forEach(attributes, function (value, name) {
            setAttribute(entityId, path, el, name, value);
          });

          // add children.
          forEach(childNodes, function (child, i) {
            var childEl = toNative(entityId, path + '.' + i, child);
            if (!childEl.parentNode) el.appendChild(childEl);
          });

          // store keys on the native element for fast event handling.
          el.__entity__ = entityId;
          el.__path__ = path;

          return el;
        }

        /**
         * Create a native element from a virtual element.
         */

        function toNativeEmptyElement(entityId, path) {
          var el = document.createElement('noscript');
          el.__entity__ = entityId;
          el.__path__ = path;
          return el;
        }

        /**
         * Create a native element from a component.
         */

        function toNativeComponent(entityId, path, vnode) {
          var child = new Entity(vnode.type, assign({ children: vnode.children }, vnode.attributes), entityId);
          children[entityId][path] = child.id;
          return mountEntity(child);
        }

        /**
         * Patch an element with the diff from two trees.
         */

        function patch(entityId, prev, next, el) {
          return diffNode('0', entityId, prev, next, el);
        }

        /**
         * Create a diff between two trees of nodes.
         */

        function diffNode(path, entityId, prev, next, el) {
          var leftType = nodeType(prev);
          var rightType = nodeType(next);

          // Type changed. This could be from element->text, text->ComponentA,
          // ComponentA->ComponentB etc. But NOT div->span. These are the same type
          // (ElementNode) but different tag name.
          if (leftType !== rightType) return replaceElement(entityId, path, el, next);

          switch (rightType) {
            case 'text':
              return diffText(prev, next, el);
            case 'empty':
              return el;
            case 'element':
              return diffElement(path, entityId, prev, next, el);
            case 'component':
              return diffComponent(path, entityId, prev, next, el);
          }
        }

        /**
         * Diff two text nodes and update the element.
         */

        function diffText(previous, current, el) {
          if (current !== previous) el.data = current;
          return el;
        }

        /**
         * Diff the children of an ElementNode.
         */

        function diffChildren(path, entityId, prev, next, el) {
          var positions = [];
          var hasKeys = false;
          var childNodes = Array.prototype.slice.apply(el.childNodes);
          var leftKeys = reduce(prev.children, keyMapReducer, {});
          var rightKeys = reduce(next.children, keyMapReducer, {});
          var currentChildren = assign({}, children[entityId]);

          function keyMapReducer(acc, child, i) {
            if (child && child.attributes && child.attributes.key != null) {
              acc[child.attributes.key] = {
                element: child,
                index: i
              };
              hasKeys = true;
            }
            return acc;
          }

          // Diff all of the nodes that have keys. This lets us re-used elements
          // instead of overriding them and lets us move them around.
          if (hasKeys) {

            // Removals
            forEach(leftKeys, function (leftNode, key) {
              if (rightKeys[key] == null) {
                var leftPath = path + '.' + leftNode.index;
                removeElement(entityId, leftPath, childNodes[leftNode.index]);
              }
            });

            // Update nodes
            forEach(rightKeys, function (rightNode, key) {
              var leftNode = leftKeys[key];

              // We only want updates for now
              if (leftNode == null) return;

              var leftPath = path + '.' + leftNode.index;

              // Updated
              positions[rightNode.index] = diffNode(leftPath, entityId, leftNode.element, rightNode.element, childNodes[leftNode.index]);
            });

            // Update the positions of all child components and event handlers
            forEach(rightKeys, function (rightNode, key) {
              var leftNode = leftKeys[key];

              // We just want elements that have moved around
              if (leftNode == null || leftNode.index === rightNode.index) return;

              var rightPath = path + '.' + rightNode.index;
              var leftPath = path + '.' + leftNode.index;

              // Update all the child component path positions to match
              // the latest positions if they've changed. This is a bit hacky.
              forEach(currentChildren, function (childId, childPath) {
                if (leftPath === childPath) {
                  delete children[entityId][childPath];
                  children[entityId][rightPath] = childId;
                }
              });
            });

            // Now add all of the new nodes last in case their path
            // would have conflicted with one of the previous paths.
            forEach(rightKeys, function (rightNode, key) {
              var rightPath = path + '.' + rightNode.index;
              if (leftKeys[key] == null) {
                positions[rightNode.index] = toNative(entityId, rightPath, rightNode.element);
              }
            });
          } else {
            var maxLength = Math.max(prev.children.length, next.children.length);

            // Now diff all of the nodes that don't have keys
            for (var i = 0; i < maxLength; i++) {
              var leftNode = prev.children[i];
              var rightNode = next.children[i];

              // Removals
              if (rightNode === undefined) {
                removeElement(entityId, path + '.' + i, childNodes[i]);
                continue;
              }

              // New Node
              if (leftNode === undefined) {
                positions[i] = toNative(entityId, path + '.' + i, rightNode);
                continue;
              }

              // Updated
              positions[i] = diffNode(path + '.' + i, entityId, leftNode, rightNode, childNodes[i]);
            }
          }

          // Reposition all the elements
          forEach(positions, function (childEl, newPosition) {
            var target = el.childNodes[newPosition];
            if (childEl && childEl !== target) {
              if (target) {
                el.insertBefore(childEl, target);
              } else {
                el.appendChild(childEl);
              }
            }
          });
        }

        /**
         * Diff the attributes and add/remove them.
         */

        function diffAttributes(prev, next, el, entityId, path) {
          var nextAttrs = next.attributes;
          var prevAttrs = prev.attributes;

          // add new attrs
          forEach(nextAttrs, function (value, name) {
            if (events[name] || !(name in prevAttrs) || prevAttrs[name] !== value) {
              setAttribute(entityId, path, el, name, value);
            }
          });

          // remove old attrs
          forEach(prevAttrs, function (value, name) {
            if (!(name in nextAttrs)) {
              removeAttribute(entityId, path, el, name);
            }
          });
        }

        /**
         * Update a component with the props from the next node. If
         * the component type has changed, we'll just remove the old one
         * and replace it with the new component.
         */

        function diffComponent(path, entityId, prev, next, el) {
          if (next.type !== prev.type) {
            return replaceElement(entityId, path, el, next);
          } else {
            var targetId = children[entityId][path];

            // This is a hack for now
            if (targetId) {
              updateEntityProps(targetId, assign({ children: next.children }, next.attributes));
            }

            return el;
          }
        }

        /**
         * Diff two element nodes.
         */

        function diffElement(path, entityId, prev, next, el) {
          if (next.type !== prev.type) return replaceElement(entityId, path, el, next);
          diffAttributes(prev, next, el, entityId, path);
          diffChildren(path, entityId, prev, next, el);
          return el;
        }

        /**
         * Removes an element from the DOM and unmounts and components
         * that are within that branch
         *
         * side effects:
         *   - removes element from the DOM
         *   - removes internal references
         *
         * @param {String} entityId
         * @param {String} path
         * @param {HTMLElement} el
         */

        function removeElement(entityId, path, el) {
          var childrenByPath = children[entityId];
          var childId = childrenByPath[path];
          var entityHandlers = handlers[entityId] || {};
          var removals = [];

          // If the path points to a component we should use that
          // components element instead, because it might have moved it.
          if (childId) {
            var child = entities[childId];
            el = child.nativeElement;
            unmountEntity(childId);
            removals.push(path);
          } else {

            // Just remove the text node
            if (!isElement(el)) return el && el.parentNode.removeChild(el);

            // Then we need to find any components within this
            // branch and unmount them.
            forEach(childrenByPath, function (childId, childPath) {
              if (childPath === path || isWithinPath(path, childPath)) {
                unmountEntity(childId);
                removals.push(childPath);
              }
            });

            // Remove all events at this path or below it
            forEach(entityHandlers, function (fn, handlerPath) {
              if (handlerPath === path || isWithinPath(path, handlerPath)) {
                removeEvent(entityId, handlerPath);
              }
            });
          }

          // Remove the paths from the object without touching the
          // old object. This keeps the object using fast properties.
          forEach(removals, function (path) {
            delete children[entityId][path];
          });

          // Remove it from the DOM
          el.parentNode.removeChild(el);
        }

        /**
         * Replace an element in the DOM. Removing all components
         * within that element and re-rendering the new virtual node.
         *
         * @param {Entity} entity
         * @param {String} path
         * @param {HTMLElement} el
         * @param {Object} vnode
         *
         * @return {void}
         */

        function replaceElement(entityId, path, el, vnode) {
          var parent = el.parentNode;
          var index = Array.prototype.indexOf.call(parent.childNodes, el);

          // remove the previous element and all nested components. This
          // needs to happen before we create the new element so we don't
          // get clashes on the component paths.
          removeElement(entityId, path, el);

          // then add the new element in there
          var newEl = toNative(entityId, path, vnode);
          var target = parent.childNodes[index];

          if (target) {
            parent.insertBefore(newEl, target);
          } else {
            parent.appendChild(newEl);
          }

          // walk up the tree and update all `entity.nativeElement` references.
          if (entityId !== 'root' && path === '0') {
            updateNativeElement(entityId, newEl);
          }

          return newEl;
        }

        /**
         * Update all entities in a branch that have the same nativeElement. This
         * happens when a component has another component as it's root node.
         *
         * @param {String} entityId
         * @param {HTMLElement} newEl
         *
         * @return {void}
         */

        function updateNativeElement(entityId, newEl) {
          var target = entities[entityId];
          if (target.ownerId === 'root') return;
          if (children[target.ownerId]['0'] === entityId) {
            entities[target.ownerId].nativeElement = newEl;
            updateNativeElement(target.ownerId, newEl);
          }
        }

        /**
         * Set the attribute of an element, performing additional transformations
         * dependning on the attribute name
         *
         * @param {HTMLElement} el
         * @param {String} name
         * @param {String} value
         */

        function setAttribute(entityId, path, el, name, value) {
          if (!value) {
            removeAttribute(entityId, path, el, name);
            return;
          }
          if (events[name]) {
            addEvent(entityId, path, events[name], value);
            return;
          }
          switch (name) {
            case 'checked':
            case 'disabled':
            case 'selected':
              el[name] = true;
              break;
            case 'innerHTML':
              el.innerHTML = value;
              break;
            case 'value':
              setElementValue(el, value);
              break;
            case svg.isAttribute(name):
              el.setAttributeNS(svg.namespace, name, value);
              break;
            default:
              el.setAttribute(name, value);
              break;
          }
        }

        /**
         * Remove an attribute, performing additional transformations
         * dependning on the attribute name
         *
         * @param {HTMLElement} el
         * @param {String} name
         */

        function removeAttribute(entityId, path, el, name) {
          if (events[name]) {
            removeEvent(entityId, path, events[name]);
            return;
          }
          switch (name) {
            case 'checked':
            case 'disabled':
            case 'selected':
              el[name] = false;
              break;
            case 'innerHTML':
              el.innerHTML = '';
            case 'value':
              setElementValue(el, null);
              break;
            default:
              el.removeAttribute(name);
              break;
          }
        }

        /**
         * Checks to see if one tree path is within
         * another tree path. Example:
         *
         * 0.1 vs 0.1.1 = true
         * 0.2 vs 0.3.5 = false
         *
         * @param {String} target
         * @param {String} path
         *
         * @return {Boolean}
         */

        function isWithinPath(target, path) {
          return path.indexOf(target + '.') === 0;
        }

        /**
         * Is the DOM node an element node
         *
         * @param {HTMLElement} el
         *
         * @return {Boolean}
         */

        function isElement(el) {
          return !!(el && el.tagName);
        }

        /**
         * Remove all the child nodes from an element
         *
         * @param {HTMLElement} el
         */

        function removeAllChildren(el) {
          while (el.firstChild) el.removeChild(el.firstChild);
        }

        /**
         * Trigger a hook on a component.
         *
         * @param {String} name Name of hook.
         * @param {Entity} entity The component instance.
         * @param {Array} args To pass along to hook.
         */

        function trigger(name, entity, args) {
          if (typeof entity.component[name] !== 'function') return;
          return entity.component[name].apply(null, args);
        }

        /**
         * Update an entity to match the latest rendered vode. We always
         * replace the props on the component when composing them. This
         * will trigger a re-render on all children below this point.
         *
         * @param {Entity} entity
         * @param {String} path
         * @param {Object} vnode
         *
         * @return {void}
         */

        function updateEntityProps(entityId, nextProps) {
          var entity = entities[entityId];
          entity.pendingProps = defaults({}, nextProps, entity.component.defaultProps || {});
          entity.dirty = true;
          invalidate();
        }

        /**
         * Update component instance state.
         */

        function updateEntityState(entity, nextState) {
          entity.pendingState = assign(entity.pendingState, nextState);
          entity.dirty = true;
          invalidate();
        }

        /**
         * Commit props and state changes to an entity.
         */

        function commit(entity) {
          entity.context = {
            state: entity.pendingState,
            props: entity.pendingProps,
            id: entity.id
          };
          entity.pendingState = assign({}, entity.context.state);
          entity.pendingProps = assign({}, entity.context.props);
          entity.dirty = false;
          if (typeof entity.component.validate === 'function') {
            entity.component.validate(entity.context);
          }
        }

        /**
         * Try to avoid creating new virtual dom if possible.
         *
         * Later we may expose this so you can override, but not there yet.
         */

        function shouldUpdate(entity) {
          if (!entity.dirty) return false;
          if (!entity.component.shouldUpdate) return true;
          var nextProps = entity.pendingProps;
          var nextState = entity.pendingState;
          var bool = entity.component.shouldUpdate(entity.context, nextProps, nextState);
          return bool;
        }

        /**
         * Register an entity.
         *
         * This is mostly to pre-preprocess component properties and values chains.
         *
         * The end result is for every component that gets mounted,
         * you create a set of IO nodes in the network from the `value` definitions.
         *
         * @param {Component} component
         */

        function register(entity) {
          registerEntity(entity);
          var component = entity.component;
          if (component.registered) return;

          // initialize sources once for a component type.
          registerSources(entity);
          component.registered = true;
        }

        /**
         * Add entity to data-structures related to components/entities.
         *
         * @param {Entity} entity
         */

        function registerEntity(entity) {
          var component = entity.component;
          // all entities for this component type.
          var entities = component.entities = component.entities || {};
          // add entity to component list
          entities[entity.id] = entity;
          // map to component so you can remove later.
          components[entity.id] = component;
        }

        /**
         * Initialize sources for a component by type.
         *
         * @param {Entity} entity
         */

        function registerSources(entity) {
          var component = components[entity.id];
          // get 'class-level' sources.
          // if we've already hooked it up, then we're good.
          var sources = component.sources;
          if (sources) return;
          var entities = component.entities;

          // hook up sources.
          var map = component.sourceToPropertyName = {};
          component.sources = sources = [];
          var propTypes = component.propTypes;
          for (var name in propTypes) {
            var data = propTypes[name];
            if (!data) continue;
            if (!data.source) continue;
            sources.push(data.source);
            map[data.source] = name;
          }

          // send value updates to all component instances.
          sources.forEach(function (source) {
            connections[source] = connections[source] || [];
            connections[source].push(update);

            function update(data) {
              var prop = map[source];
              for (var entityId in entities) {
                var entity = entities[entityId];
                var changes = {};
                changes[prop] = data;
                updateEntityProps(entityId, assign(entity.pendingProps, changes));
              }
            }
          });
        }

        /**
         * Set the initial source value on the entity
         *
         * @param {Entity} entity
         */

        function setSources(entity) {
          var component = entity.component;
          var map = component.sourceToPropertyName;
          var sources = component.sources;
          sources.forEach(function (source) {
            var name = map[source];
            if (entity.pendingProps[name] != null) return;
            entity.pendingProps[name] = app.sources[source]; // get latest value plugged into global store
          });
        }

        /**
         * Add all of the DOM event listeners
         */

        function addNativeEventListeners() {
          forEach(events, function (eventType) {
            rootElement.addEventListener(eventType, handleEvent, true);
          });
        }

        /**
         * Add all of the DOM event listeners
         */

        function removeNativeEventListeners() {
          forEach(events, function (eventType) {
            rootElement.removeEventListener(eventType, handleEvent, true);
          });
        }

        /**
         * Handle an event that has occured within the container
         *
         * @param {Event} event
         */

        function handleEvent(event) {
          var target = event.target;
          var eventType = event.type;

          // Walk up the DOM tree and see if there is a handler
          // for this event type higher up.
          while (target) {
            var fn = keypath.get(handlers, [target.__entity__, target.__path__, eventType]);
            if (fn) {
              event.delegateTarget = target;
              if (fn(event) === false) break;
            }
            target = target.parentNode;
          }
        }

        /**
         * Bind events for an element, and all it's rendered child elements.
         *
         * @param {String} path
         * @param {String} event
         * @param {Function} fn
         */

        function addEvent(entityId, path, eventType, fn) {
          keypath.set(handlers, [entityId, path, eventType], function (e) {
            var entity = entities[entityId];
            if (entity) {
              return fn.call(null, e, entity.context, setState(entity));
            } else {
              return fn.call(null, e);
            }
          });
        }

        /**
         * Unbind events for a entityId
         *
         * @param {String} entityId
         */

        function removeEvent(entityId, path, eventType) {
          var args = [entityId];
          if (path) args.push(path);
          if (eventType) args.push(eventType);
          keypath.del(handlers, args);
        }

        /**
         * Unbind all events from an entity
         *
         * @param {Entity} entity
         */

        function removeAllEvents(entityId) {
          keypath.del(handlers, [entityId]);
        }

        /**
         * Used for debugging to inspect the current state without
         * us needing to explicitly manage storing/updating references.
         *
         * @return {Object}
         */

        function inspect() {
          return {
            entities: entities,
            handlers: handlers,
            connections: connections,
            currentElement: currentElement,
            options: options,
            app: app,
            container: container,
            children: children
          };
        }

        /**
         * Return an object that lets us completely remove the automatic
         * DOM rendering and export debugging tools.
         */

        return {
          remove: teardown,
          inspect: inspect
        };
      }

      /**
       * A rendered component instance.
       *
       * This manages the lifecycle, props and state of the component.
       * It's basically just a data object for more straightfoward lookup.
       *
       * @param {Component} component
       * @param {Object} props
       */

      function Entity(component, props, ownerId) {
        this.id = uid();
        this.ownerId = ownerId;
        this.component = component;
        this.propTypes = component.propTypes || {};
        this.context = {};
        this.context.id = this.id;
        this.context.props = defaults(props || {}, component.defaultProps || {});
        this.context.state = this.component.initialState ? this.component.initialState(this.context.props) : {};
        this.pendingProps = assign({}, this.context.props);
        this.pendingState = assign({}, this.context.state);
        this.dirty = false;
        this.virtualElement = null;
        this.nativeElement = null;
        this.displayName = component.name || 'Component';
      }

      /**
       * Retrieve the nearest 'body' ancestor of the given element or else the root
       * element of the document in which stands the given element.
       *
       * This is necessary if you want to attach the events handler to the correct
       * element and be able to dispatch events in document fragments such as
       * Shadow DOM.
       *
       * @param  {HTMLElement} el The element on which we will render an app.
       * @return {HTMLElement}    The root element on which we will attach the events
       *                          handler.
       */

      function getRootElement(el) {
        while (el.parentElement) {
          if (el.tagName === 'BODY' || !el.parentElement) {
            return el;
          }
          el = el.parentElement;
        }
        return el;
      }

      /**
       * Set the value property of an element and keep the text selection
       * for input fields.
       *
       * @param {HTMLElement} el
       * @param {String} value
       */

      function setElementValue(el, value) {
        if (el === document.activeElement && canSelectText(el)) {
          var start = el.selectionStart;
          var end = el.selectionEnd;
          el.value = value;
          el.setSelectionRange(start, end);
        } else {
          el.value = value;
        }
      }

      /**
       * For some reason only certain types of inputs can set the selection range.
       *
       * @param {HTMLElement} el
       *
       * @return {Boolean}
       */

      function canSelectText(el) {
        return el.tagName === 'INPUT' && ['text', 'search', 'password', 'tel', 'url'].indexOf(el.type) > -1;
      }
    }, { "./events": 2, "./node-type": 4, "./svg": 7, "component-raf": 9, "fast.js/forEach": 13, "fast.js/object/assign": 16, "fast.js/reduce": 19, "get-uid": 20, "is-dom": 21, "object-defaults": 24, "object-path": 25 }], 6: [function (_require, module, exports) {
      var defaults = _require('object-defaults');
      var nodeType = _require('./node-type');
      var type = _require('component-type');

      /**
       * Expose `stringify`.
       */

      module.exports = function (app) {
        if (!app.element) {
          throw new Error('No element mounted');
        }

        /**
         * Render to string.
         *
         * @param {Component} component
         * @param {Object} [props]
         * @return {String}
         */

        function stringify(component, optProps, children) {
          var propTypes = component.propTypes || {};
          var props = defaults(optProps || {}, component.defaultProps || {});
          var state = component.initialState ? component.initialState(props) : {};
          props.children = children;

          for (var name in propTypes) {
            var options = propTypes[name];
            if (options.source) {
              props[name] = app.sources[options.source];
            }
          }

          if (component.beforeMount) component.beforeMount({ props: props, state: state });
          if (component.beforeRender) component.beforeRender({ props: props, state: state });
          var node = component.render({ props: props, state: state });
          return stringifyNode(node, '0');
        }

        /**
         * Render a node to a string
         *
         * @param {Node} node
         * @param {Tree} tree
         *
         * @return {String}
         */

        function stringifyNode(node, path) {
          switch (nodeType(node)) {
            case 'empty':
              return '<noscript />';
            case 'text':
              return node;
            case 'element':
              var children = node.children;
              var attributes = node.attributes;
              var tagName = node.type;
              var innerHTML = attributes.innerHTML;
              var str = '<' + tagName + attrs(attributes) + '>';

              if (innerHTML) {
                str += innerHTML;
              } else {
                for (var i = 0, n = children.length; i < n; i++) {
                  str += stringifyNode(children[i], path + '.' + i);
                }
              }

              str += '</' + tagName + '>';
              return str;
            case 'component':
              return stringify(node.type, node.attributes, node.children);
          }

          throw new Error('Invalid type');
        }

        return stringifyNode(app.element, '0');
      };

      /**
       * HTML attributes to string.
       *
       * @param {Object} attributes
       * @return {String}
       * @api private
       */

      function attrs(attributes) {
        var str = '';
        for (var key in attributes) {
          var value = attributes[key];
          if (key === 'innerHTML') continue;
          if (isValidAttributeValue(value)) str += attr(key, attributes[key]);
        }
        return str;
      }

      /**
       * HTML attribute to string.
       *
       * @param {String} key
       * @param {String} val
       * @return {String}
       * @api private
       */

      function attr(key, val) {
        return ' ' + key + '="' + val + '"';
      }

      /**
       * Is a value able to be set a an attribute value?
       *
       * @param {Any} value
       *
       * @return {Boolean}
       */

      function isValidAttributeValue(value) {
        var valueType = type(value);
        switch (valueType) {
          case 'string':
          case 'number':
            return true;

          case 'boolean':
            return value;

          default:
            return false;
        }
      }
    }, { "./node-type": 4, "component-type": 10, "object-defaults": 24 }], 7: [function (_require, module, exports) {
      module.exports = {
        isElement: _require('is-svg-element').isElement,
        isAttribute: _require('is-svg-attribute'),
        namespace: 'http://www.w3.org/2000/svg'
      };
    }, { "is-svg-attribute": 22, "is-svg-element": 23 }], 8: [function (_require, module, exports) {

      /**
       * Expose `Emitter`.
       */

      module.exports = Emitter;

      /**
       * Initialize a new `Emitter`.
       *
       * @api public
       */

      function Emitter(obj) {
        if (obj) return mixin(obj);
      };

      /**
       * Mixin the emitter properties.
       *
       * @param {Object} obj
       * @return {Object}
       * @api private
       */

      function mixin(obj) {
        for (var key in Emitter.prototype) {
          obj[key] = Emitter.prototype[key];
        }
        return obj;
      }

      /**
       * Listen on the given `event` with `fn`.
       *
       * @param {String} event
       * @param {Function} fn
       * @return {Emitter}
       * @api public
       */

      Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
        this._callbacks = this._callbacks || {};
        (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
        return this;
      };

      /**
       * Adds an `event` listener that will be invoked a single
       * time then automatically removed.
       *
       * @param {String} event
       * @param {Function} fn
       * @return {Emitter}
       * @api public
       */

      Emitter.prototype.once = function (event, fn) {
        function on() {
          this.off(event, on);
          fn.apply(this, arguments);
        }

        on.fn = fn;
        this.on(event, on);
        return this;
      };

      /**
       * Remove the given callback for `event` or all
       * registered callbacks.
       *
       * @param {String} event
       * @param {Function} fn
       * @return {Emitter}
       * @api public
       */

      Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
        this._callbacks = this._callbacks || {};

        // all
        if (0 == arguments.length) {
          this._callbacks = {};
          return this;
        }

        // specific event
        var callbacks = this._callbacks['$' + event];
        if (!callbacks) return this;

        // remove all handlers
        if (1 == arguments.length) {
          delete this._callbacks['$' + event];
          return this;
        }

        // remove specific handler
        var cb;
        for (var i = 0; i < callbacks.length; i++) {
          cb = callbacks[i];
          if (cb === fn || cb.fn === fn) {
            callbacks.splice(i, 1);
            break;
          }
        }
        return this;
      };

      /**
       * Emit `event` with the given args.
       *
       * @param {String} event
       * @param {Mixed} ...
       * @return {Emitter}
       */

      Emitter.prototype.emit = function (event) {
        this._callbacks = this._callbacks || {};
        var args = [].slice.call(arguments, 1),
            callbacks = this._callbacks['$' + event];

        if (callbacks) {
          callbacks = callbacks.slice(0);
          for (var i = 0, len = callbacks.length; i < len; ++i) {
            callbacks[i].apply(this, args);
          }
        }

        return this;
      };

      /**
       * Return array of callbacks for `event`.
       *
       * @param {String} event
       * @return {Array}
       * @api public
       */

      Emitter.prototype.listeners = function (event) {
        this._callbacks = this._callbacks || {};
        return this._callbacks['$' + event] || [];
      };

      /**
       * Check if this emitter has `event` handlers.
       *
       * @param {String} event
       * @return {Boolean}
       * @api public
       */

      Emitter.prototype.hasListeners = function (event) {
        return !!this.listeners(event).length;
      };
    }, {}], 9: [function (_require, module, exports) {
      /**
       * Expose `requestAnimationFrame()`.
       */

      exports = module.exports = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || fallback;

      /**
       * Fallback implementation.
       */

      var prev = new Date().getTime();
      function fallback(fn) {
        var curr = new Date().getTime();
        var ms = Math.max(0, 16 - (curr - prev));
        var req = setTimeout(fn, ms);
        prev = curr;
        return req;
      }

      /**
       * Cancel.
       */

      var cancel = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.clearTimeout;

      exports.cancel = function (id) {
        cancel.call(window, id);
      };
    }, {}], 10: [function (_require, module, exports) {
      /**
       * toString ref.
       */

      var toString = Object.prototype.toString;

      /**
       * Return the type of `val`.
       *
       * @param {Mixed} val
       * @return {String}
       * @api public
       */

      module.exports = function (val) {
        switch (toString.call(val)) {
          case '[object Date]':
            return 'date';
          case '[object RegExp]':
            return 'regexp';
          case '[object Arguments]':
            return 'arguments';
          case '[object Array]':
            return 'array';
          case '[object Error]':
            return 'error';
        }

        if (val === null) return 'null';
        if (val === undefined) return 'undefined';
        if (val !== val) return 'nan';
        if (val && val.nodeType === 1) return 'element';

        val = val.valueOf ? val.valueOf() : Object.prototype.valueOf.apply(val);

        return typeof val;
      };
    }, {}], 11: [function (_require, module, exports) {
      'use strict';

      var bindInternal3 = _require('../function/bindInternal3');

      /**
       * # For Each
       *
       * A fast `.forEach()` implementation.
       *
       * @param  {Array}    subject     The array (or array-like) to iterate over.
       * @param  {Function} fn          The visitor function.
       * @param  {Object}   thisContext The context for the visitor.
       */
      module.exports = function fastForEach(subject, fn, thisContext) {
        var length = subject.length,
            iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
            i;
        for (i = 0; i < length; i++) {
          iterator(subject[i], i, subject);
        }
      };
    }, { "../function/bindInternal3": 14 }], 12: [function (_require, module, exports) {
      'use strict';

      var bindInternal4 = _require('../function/bindInternal4');

      /**
       * # Reduce
       *
       * A fast `.reduce()` implementation.
       *
       * @param  {Array}    subject      The array (or array-like) to reduce.
       * @param  {Function} fn           The reducer function.
       * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
       * @param  {Object}   thisContext  The context for the reducer.
       * @return {mixed}                 The final result.
       */
      module.exports = function fastReduce(subject, fn, initialValue, thisContext) {
        var length = subject.length,
            iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
            i,
            result;

        if (initialValue === undefined) {
          i = 1;
          result = subject[0];
        } else {
          i = 0;
          result = initialValue;
        }

        for (; i < length; i++) {
          result = iterator(result, subject[i], i, subject);
        }

        return result;
      };
    }, { "../function/bindInternal4": 15 }], 13: [function (_require, module, exports) {
      'use strict';

      var forEachArray = _require('./array/forEach'),
          forEachObject = _require('./object/forEach');

      /**
       * # ForEach
       *
       * A fast `.forEach()` implementation.
       *
       * @param  {Array|Object} subject     The array or object to iterate over.
       * @param  {Function}     fn          The visitor function.
       * @param  {Object}       thisContext The context for the visitor.
       */
      module.exports = function fastForEach(subject, fn, thisContext) {
        if (subject instanceof Array) {
          return forEachArray(subject, fn, thisContext);
        } else {
          return forEachObject(subject, fn, thisContext);
        }
      };
    }, { "./array/forEach": 11, "./object/forEach": 17 }], 14: [function (_require, module, exports) {
      'use strict';

      /**
       * Internal helper to bind a function known to have 3 arguments
       * to a given context.
       */
      module.exports = function bindInternal3(func, thisContext) {
        return function (a, b, c) {
          return func.call(thisContext, a, b, c);
        };
      };
    }, {}], 15: [function (_require, module, exports) {
      'use strict';

      /**
       * Internal helper to bind a function known to have 4 arguments
       * to a given context.
       */
      module.exports = function bindInternal4(func, thisContext) {
        return function (a, b, c, d) {
          return func.call(thisContext, a, b, c, d);
        };
      };
    }, {}], 16: [function (_require, module, exports) {
      'use strict';

      /**
       * Analogue of Object.assign().
       * Copies properties from one or more source objects to
       * a target object. Existing keys on the target object will be overwritten.
       *
       * > Note: This differs from spec in some important ways:
       * > 1. Will throw if passed non-objects, including `undefined` or `null` values.
       * > 2. Does not support the curious Exception handling behavior, exceptions are thrown immediately.
       * > For more details, see:
       * > https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
       *
       *
       *
       * @param  {Object} target      The target object to copy properties to.
       * @param  {Object} source, ... The source(s) to copy properties from.
       * @return {Object}             The updated target object.
       */
      module.exports = function fastAssign(target) {
        var totalArgs = arguments.length,
            source,
            i,
            totalKeys,
            keys,
            key,
            j;

        for (i = 1; i < totalArgs; i++) {
          source = arguments[i];
          keys = Object.keys(source);
          totalKeys = keys.length;
          for (j = 0; j < totalKeys; j++) {
            key = keys[j];
            target[key] = source[key];
          }
        }
        return target;
      };
    }, {}], 17: [function (_require, module, exports) {
      'use strict';

      var bindInternal3 = _require('../function/bindInternal3');

      /**
       * # For Each
       *
       * A fast object `.forEach()` implementation.
       *
       * @param  {Object}   subject     The object to iterate over.
       * @param  {Function} fn          The visitor function.
       * @param  {Object}   thisContext The context for the visitor.
       */
      module.exports = function fastForEachObject(subject, fn, thisContext) {
        var keys = Object.keys(subject),
            length = keys.length,
            iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
            key,
            i;
        for (i = 0; i < length; i++) {
          key = keys[i];
          iterator(subject[key], key, subject);
        }
      };
    }, { "../function/bindInternal3": 14 }], 18: [function (_require, module, exports) {
      'use strict';

      var bindInternal4 = _require('../function/bindInternal4');

      /**
       * # Reduce
       *
       * A fast object `.reduce()` implementation.
       *
       * @param  {Object}   subject      The object to reduce over.
       * @param  {Function} fn           The reducer function.
       * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
       * @param  {Object}   thisContext  The context for the reducer.
       * @return {mixed}                 The final result.
       */
      module.exports = function fastReduceObject(subject, fn, initialValue, thisContext) {
        var keys = Object.keys(subject),
            length = keys.length,
            iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
            i,
            key,
            result;

        if (initialValue === undefined) {
          i = 1;
          result = subject[keys[0]];
        } else {
          i = 0;
          result = initialValue;
        }

        for (; i < length; i++) {
          key = keys[i];
          result = iterator(result, subject[key], key, subject);
        }

        return result;
      };
    }, { "../function/bindInternal4": 15 }], 19: [function (_require, module, exports) {
      'use strict';

      var reduceArray = _require('./array/reduce'),
          reduceObject = _require('./object/reduce');

      /**
       * # Reduce
       *
       * A fast `.reduce()` implementation.
       *
       * @param  {Array|Object} subject      The array or object to reduce over.
       * @param  {Function}     fn           The reducer function.
       * @param  {mixed}        initialValue The initial value for the reducer, defaults to subject[0].
       * @param  {Object}       thisContext  The context for the reducer.
       * @return {Array|Object}              The array or object containing the results.
       */
      module.exports = function fastReduce(subject, fn, initialValue, thisContext) {
        if (subject instanceof Array) {
          return reduceArray(subject, fn, initialValue, thisContext);
        } else {
          return reduceObject(subject, fn, initialValue, thisContext);
        }
      };
    }, { "./array/reduce": 12, "./object/reduce": 18 }], 20: [function (_require, module, exports) {
      /** generate unique id for selector */
      var counter = Date.now() % 1e9;

      module.exports = function getUid() {
        return (Math.random() * 1e9 >>> 0) + counter++;
      };
    }, {}], 21: [function (_require, module, exports) {
      /*global window*/

      /**
       * Check if object is dom node.
       *
       * @param {Object} val
       * @return {Boolean}
       * @api public
       */

      module.exports = function isNode(val) {
        if (!val || typeof val !== 'object') return false;
        if (window && 'object' == typeof window.Node) return val instanceof window.Node;
        return 'number' == typeof val.nodeType && 'string' == typeof val.nodeName;
      };
    }, {}], 22: [function (_require, module, exports) {
      /**
       * Supported SVG attributes
       */

      exports.attributes = {
        'cx': true,
        'cy': true,
        'd': true,
        'dx': true,
        'dy': true,
        'fill': true,
        'fillOpacity': true,
        'fontFamily': true,
        'fontSize': true,
        'fx': true,
        'fy': true,
        'gradientTransform': true,
        'gradientUnits': true,
        'markerEnd': true,
        'markerMid': true,
        'markerStart': true,
        'offset': true,
        'opacity': true,
        'patternContentUnits': true,
        'patternUnits': true,
        'points': true,
        'preserveAspectRatio': true,
        'r': true,
        'rx': true,
        'ry': true,
        'spreadMethod': true,
        'stopColor': true,
        'stopOpacity': true,
        'stroke': true,
        'strokeDasharray': true,
        'strokeLinecap': true,
        'strokeOpacity': true,
        'strokeWidth': true,
        'textAnchor': true,
        'transform': true,
        'version': true,
        'viewBox': true,
        'x1': true,
        'x2': true,
        'x': true,
        'y1': true,
        'y2': true,
        'y': true
      };

      /**
       * Are element's attributes SVG?
       *
       * @param {String} attr
       */

      module.exports = function (attr) {
        return attr in exports.attributes;
      };
    }, {}], 23: [function (_require, module, exports) {
      /**
       * Supported SVG elements
       *
       * @type {Array}
       */

      exports.elements = {
        'animate': true,
        'circle': true,
        'defs': true,
        'ellipse': true,
        'g': true,
        'line': true,
        'linearGradient': true,
        'mask': true,
        'path': true,
        'pattern': true,
        'polygon': true,
        'polyline': true,
        'radialGradient': true,
        'rect': true,
        'stop': true,
        'svg': true,
        'text': true,
        'tspan': true
      };

      /**
       * Is element's namespace SVG?
       *
       * @param {String} name
       */

      exports.isElement = function (name) {
        return name in exports.elements;
      };
    }, {}], 24: [function (_require, module, exports) {
      'use strict';

      module.exports = function (target) {
        target = target || {};

        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          if (!source) continue;

          Object.getOwnPropertyNames(source).forEach(function (key) {
            if (undefined === target[key]) target[key] = source[key];
          });
        }

        return target;
      };
    }, {}], 25: [function (_require, module, exports) {
      (function (root, factory) {
        'use strict';

        /*istanbul ignore next:cant test*/
        if (typeof module === 'object' && typeof module.exports === 'object') {
          module.exports = factory();
        } else if (typeof define === 'function' && define.amd) {
          // AMD. Register as an anonymous module.
          define([], factory);
        } else {
          // Browser globals
          root.objectPath = factory();
        }
      })(this, function () {
        'use strict';

        var toStr = Object.prototype.toString,
            _hasOwnProperty = Object.prototype.hasOwnProperty;

        function isEmpty(value) {
          if (!value) {
            return true;
          }
          if (isArray(value) && value.length === 0) {
            return true;
          } else if (!isString(value)) {
            for (var i in value) {
              if (_hasOwnProperty.call(value, i)) {
                return false;
              }
            }
            return true;
          }
          return false;
        }

        function toString(type) {
          return toStr.call(type);
        }

        function isNumber(value) {
          return typeof value === 'number' || toString(value) === "[object Number]";
        }

        function isString(obj) {
          return typeof obj === 'string' || toString(obj) === "[object String]";
        }

        function isObject(obj) {
          return typeof obj === 'object' && toString(obj) === "[object Object]";
        }

        function isArray(obj) {
          return typeof obj === 'object' && typeof obj.length === 'number' && toString(obj) === '[object Array]';
        }

        function isBoolean(obj) {
          return typeof obj === 'boolean' || toString(obj) === '[object Boolean]';
        }

        function getKey(key) {
          var intKey = parseInt(key);
          if (intKey.toString() === key) {
            return intKey;
          }
          return key;
        }

        function set(_x, _x2, _x3, _x4) {
          var _again = true;

          _function: while (_again) {
            var obj = _x,
                path = _x2,
                value = _x3,
                doNotReplace = _x4;
            currentPath = oldVal = undefined;
            _again = false;

            if (isNumber(path)) {
              path = [path];
            }
            if (isEmpty(path)) {
              return obj;
            }
            if (isString(path)) {
              _x = obj;
              _x2 = path.split('.').map(getKey);
              _x3 = value;
              _x4 = doNotReplace;
              _again = true;
              continue _function;
            }
            var currentPath = path[0];

            if (path.length === 1) {
              var oldVal = obj[currentPath];
              if (oldVal === void 0 || !doNotReplace) {
                obj[currentPath] = value;
              }
              return oldVal;
            }

            if (obj[currentPath] === void 0) {
              //check if we assume an array
              if (isNumber(path[1])) {
                obj[currentPath] = [];
              } else {
                obj[currentPath] = {};
              }
            }

            _x = obj[currentPath];
            _x2 = path.slice(1);
            _x3 = value;
            _x4 = doNotReplace;
            _again = true;
            continue _function;
          }
        }

        function del(_x5, _x6) {
          var _again2 = true;

          _function2: while (_again2) {
            var obj = _x5,
                path = _x6;
            currentPath = oldVal = undefined;
            _again2 = false;

            if (isNumber(path)) {
              path = [path];
            }

            if (isEmpty(obj)) {
              return void 0;
            }

            if (isEmpty(path)) {
              return obj;
            }
            if (isString(path)) {
              _x5 = obj;
              _x6 = path.split('.');
              _again2 = true;
              continue _function2;
            }

            var currentPath = getKey(path[0]);
            var oldVal = obj[currentPath];

            if (path.length === 1) {
              if (oldVal !== void 0) {
                if (isArray(obj)) {
                  obj.splice(currentPath, 1);
                } else {
                  delete obj[currentPath];
                }
              }
            } else {
              if (obj[currentPath] !== void 0) {
                _x5 = obj[currentPath];
                _x6 = path.slice(1);
                _again2 = true;
                continue _function2;
              }
            }

            return obj;
          }
        }

        var objectPath = function objectPath(obj) {
          return Object.keys(objectPath).reduce(function (proxy, prop) {
            if (typeof objectPath[prop] === 'function') {
              proxy[prop] = objectPath[prop].bind(objectPath, obj);
            }

            return proxy;
          }, {});
        };

        objectPath.has = function (obj, path) {
          if (isEmpty(obj)) {
            return false;
          }

          if (isNumber(path)) {
            path = [path];
          } else if (isString(path)) {
            path = path.split('.');
          }

          if (isEmpty(path) || path.length === 0) {
            return false;
          }

          for (var i = 0; i < path.length; i++) {
            var j = path[i];
            if ((isObject(obj) || isArray(obj)) && _hasOwnProperty.call(obj, j)) {
              obj = obj[j];
            } else {
              return false;
            }
          }

          return true;
        };

        objectPath.ensureExists = function (obj, path, value) {
          return set(obj, path, value, true);
        };

        objectPath.set = function (obj, path, value, doNotReplace) {
          return set(obj, path, value, doNotReplace);
        };

        objectPath.insert = function (obj, path, value, at) {
          var arr = objectPath.get(obj, path);
          at = ~ ~at;
          if (!isArray(arr)) {
            arr = [];
            objectPath.set(obj, path, arr);
          }
          arr.splice(at, 0, value);
        };

        objectPath.empty = function (obj, path) {
          if (isEmpty(path)) {
            return obj;
          }
          if (isEmpty(obj)) {
            return void 0;
          }

          var value, i;
          if (!(value = objectPath.get(obj, path))) {
            return obj;
          }

          if (isString(value)) {
            return objectPath.set(obj, path, '');
          } else if (isBoolean(value)) {
            return objectPath.set(obj, path, false);
          } else if (isNumber(value)) {
            return objectPath.set(obj, path, 0);
          } else if (isArray(value)) {
            value.length = 0;
          } else if (isObject(value)) {
            for (i in value) {
              if (_hasOwnProperty.call(value, i)) {
                delete value[i];
              }
            }
          } else {
            return objectPath.set(obj, path, null);
          }
        };

        objectPath.push = function (obj, path /*, values */) {
          var arr = objectPath.get(obj, path);
          if (!isArray(arr)) {
            arr = [];
            objectPath.set(obj, path, arr);
          }

          arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
        };

        objectPath.coalesce = function (obj, paths, defaultValue) {
          var value;

          for (var i = 0, len = paths.length; i < len; i++) {
            if ((value = objectPath.get(obj, paths[i])) !== void 0) {
              return value;
            }
          }

          return defaultValue;
        };

        objectPath.get = function (obj, path, defaultValue) {
          if (isNumber(path)) {
            path = [path];
          }
          if (isEmpty(path)) {
            return obj;
          }
          if (isEmpty(obj)) {
            return defaultValue;
          }
          if (isString(path)) {
            return objectPath.get(obj, path.split('.'), defaultValue);
          }

          var currentPath = getKey(path[0]);

          if (path.length === 1) {
            if (obj[currentPath] === void 0) {
              return defaultValue;
            }
            return obj[currentPath];
          }

          return objectPath.get(obj[currentPath], path.slice(1), defaultValue);
        };

        objectPath.del = function (obj, path) {
          return del(obj, path);
        };

        return objectPath;
      });
    }, {}] }, {}, [3])(3);
});
}, {}],
3: [function(require, module, exports) {
"use strict";

(function (f) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }g.virtualElement = f();
  }
})(function () {
  var define, module, exports;return (function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof _require == "function" && _require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw (f.code = "MODULE_NOT_FOUND", f);
        }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }return n[o].exports;
    }var i = typeof _require == "function" && _require;for (var o = 0; o < r.length; o++) s(r[o]);return s;
  })({ 1: [function (_require, module, exports) {
      /**
       * Module dependencies.
       */

      var slice = _require('sliced');
      var flatten = _require('array-flatten');

      /**
       * This function lets us create virtual nodes using a simple
       * syntax. It is compatible with JSX transforms so you can use
       * JSX to write nodes that will compile to this function.
       *
       * let node = element('div', { id: 'foo' }, [
       *   element('a', { href: 'http://google.com' }, 'Google')
       * ])
       *
       * You can leave out the attributes or the children if either
       * of them aren't needed and it will figure out what you're
       * trying to do.
       */

      module.exports = element;

      /**
       * Create virtual trees of components.
       *
       * This creates the nicer API for the user.
       * It translates that friendly API into an actual tree of nodes.
       *
       * @param {*} type
       * @param {Object} attributes
       * @param {Array} children
       * @return {Object}
       * @api public
       */

      function element(type, attributes, children) {
        // Default to div with no args
        if (!type) {
          throw new TypeError('element() needs a type.');
        }

        // Skipped adding attributes and we're passing
        // in children instead.
        if (arguments.length === 2 && (typeof attributes === 'string' || Array.isArray(attributes))) {
          children = [attributes];
          attributes = {};
        }

        // Account for JSX putting the children as multiple arguments.
        // This is essentially just the ES6 rest param
        if (arguments.length > 2) {
          children = slice(arguments, 2);
        }

        children = children || [];
        attributes = attributes || {};

        // Flatten nested child arrays. This is how JSX compiles some nodes.
        children = flatten(children, 2);

        // Filter out any `undefined` elements
        children = children.filter(function (i) {
          return typeof i !== 'undefined';
        });

        // if you pass in a function, it's a `Component` constructor.
        // otherwise it's an element.
        return {
          type: type,
          children: children,
          attributes: attributes
        };
      }
    }, { "array-flatten": 2, "sliced": 3 }], 2: [function (_require, module, exports) {
      'use strict';

      /**
       * Expose `arrayFlatten`.
       */
      module.exports = arrayFlatten;

      /**
       * Recursive flatten function with depth.
       *
       * @param  {Array}  array
       * @param  {Array}  result
       * @param  {Number} depth
       * @return {Array}
       */
      function flattenWithDepth(array, result, depth) {
        for (var i = 0; i < array.length; i++) {
          var value = array[i];

          if (depth > 0 && Array.isArray(value)) {
            flattenWithDepth(value, result, depth - 1);
          } else {
            result.push(value);
          }
        }

        return result;
      }

      /**
       * Recursive flatten function. Omitting depth is slightly faster.
       *
       * @param  {Array} array
       * @param  {Array} result
       * @return {Array}
       */
      function flattenForever(array, result) {
        for (var i = 0; i < array.length; i++) {
          var value = array[i];

          if (Array.isArray(value)) {
            flattenForever(value, result);
          } else {
            result.push(value);
          }
        }

        return result;
      }

      /**
       * Flatten an array, with the ability to define a depth.
       *
       * @param  {Array}  array
       * @param  {Number} depth
       * @return {Array}
       */
      function arrayFlatten(array, depth) {
        if (depth == null) {
          return flattenForever(array, []);
        }

        return flattenWithDepth(array, [], depth);
      }
    }, {}], 3: [function (_require, module, exports) {
      module.exports = exports = _require('./lib/sliced');
    }, { "./lib/sliced": 4 }], 4: [function (_require, module, exports) {

      /**
       * An Array.prototype.slice.call(arguments) alternative
       *
       * @param {Object} args something with a length
       * @param {Number} slice
       * @param {Number} sliceEnd
       * @api public
       */

      module.exports = function (args, slice, sliceEnd) {
        var ret = [];
        var len = args.length;

        if (0 === len) return ret;

        var start = slice < 0 ? Math.max(0, slice + len) : slice || 0;

        if (sliceEnd !== undefined) {
          len = sliceEnd < 0 ? sliceEnd + len : sliceEnd;
        }

        while (len-- > start) {
          ret[len - start] = args[len];
        }

        return ret;
      };
    }, {}] }, {}, [1])(1);
});
}, {}],
4: [function(require, module, exports) {
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _container = require('./container');

var _container2 = _interopRequireDefault(_container);

var images = [new _container2['default'](1, 'images/sample.jpg'), new _container2['default'](2, 'images/sample.jpg'), new _container2['default'](3, 'images/sample.jpg'), new _container2['default'](4, 'images/sample.jpg'), new _container2['default'](5, 'images/sample.jpg')];

exports['default'] = function (app) {
  app.set('images', images);

  app.on('route:image', function (p) {
    app.set('image', images.find(function (i) {
      return i.id == p.image;
    }));
  });

  app.on('key:exec', function () {
    var image = app.sources.image;

    if (image) image.transform();
  });
  app.on('key:confirm', function (b) {
    var image = app.sources.image;

    if (image) image.confirmSeed(b).sampleSeed();
  });
};

module.exports = exports['default'];
}, {"./container":9}],
9: [function(require, module, exports) {
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _bodokaiserGeod = require('bodokaiser/geod');

var _bodokaiserGeod2 = _interopRequireDefault(_bodokaiserGeod);

var _bodokaiserAvdown = require('bodokaiser/avdown');

var _bodokaiserAvdown2 = _interopRequireDefault(_bodokaiserAvdown);

var _componentEmitter = require('component/emitter');

var _componentEmitter2 = _interopRequireDefault(_componentEmitter);

var MAX = 0xffffff;

var KERNEL_SIZE = 7;

var COLOR_NEUTRAL = '#5A71E0';
var COLOR_POSITIVE = '#5AE083';
var COLOR_NEGATIVE = '#E05A5A';

var Container = (function (_Emitter) {
  _inherits(Container, _Emitter);

  function Container(id, src) {
    _classCallCheck(this, Container);

    _get(Object.getPrototypeOf(Container.prototype), 'constructor', this).call(this);

    this.id = id;
    this.src = src;
  }

  _createClass(Container, [{
    key: 'load',
    value: function load(callback) {
      var _this = this;

      var el = new Image();

      el.addEventListener('load', function (e) {
        _this.width = el.width;
        _this.height = el.height;

        callback(el);
      });
      el.src = this.src;
    }
  }, {
    key: 'init',
    value: function init(data) {
      var _this2 = this;

      var w = data.width;
      var h = data.height;

      var c = [0, 0, 0].map(function () {
        return new Uint8ClampedArray(w * h);
      });

      for (var i = 0; i < w * h; i++) {
        c[0][i] = data.data[i];
        c[1][i] = data.data[i + 1];
        c[2][i] = data.data[i + 2];
      }

      this.colors = c.map(function (c) {
        var r = (0, _bodokaiserAvdown2['default'])(w, h).image(c).kernel(KERNEL_SIZE).transform();

        _this2.rwidth = r[1];
        _this2.rheight = r[2];

        var d = [0, 0].map(function () {
          return new Uint32Array(r[1] * r[2]);
        });

        d.forEach(function (a) {
          return a.fill(MAX);
        });

        return { weight: r[0], distance: d };
      });

      this.sampleSeed();
    }
  }, {
    key: 'sampleSeed',
    value: function sampleSeed() {
      this.current = [random(0, this.rwidth), random(0, this.rheight)];

      this.emit('seed', {
        x: this.current[0] * KERNEL_SIZE,
        y: this.current[1] * KERNEL_SIZE,
        color: COLOR_NEUTRAL
      });

      return this;
    }
  }, {
    key: 'confirmSeed',
    value: function confirmSeed(bool) {
      var _this3 = this;

      var _current = _slicedToArray(this.current, 2);

      var x = _current[0];
      var y = _current[1];

      this.emit('seed', {
        x: x * KERNEL_SIZE,
        y: y * KERNEL_SIZE,
        color: bool ? COLOR_POSITIVE : COLOR_NEGATIVE
      });

      this.colors.forEach(function (c) {
        c.distance[bool ? 0 : 1][x + y * _this3.rwidth] = 0;
      });

      return this;
    }
  }, {
    key: 'transform',
    value: function transform() {
      var _this4 = this;

      var b = new Uint8ClampedArray(this.width * this.height).fill(0);

      this.colors.forEach(function (c) {
        var w = c.weight;

        c.distance.forEach(function (d) {
          (0, _bodokaiserGeod2['default'])(_this4.rwidth, _this4.rheight).iters(4).weight(w).distance(d).transform();
        });
      });

      var _loop = function (i) {
        var d = _this4.colors.map(function (c) {
          return c.distance;
        }).map(function (d) {
          return d[1][i] - d[0][i];
        }).reduce(function (p, v) {
          return p + v;
        });

        if (d > 0) {
          var x = KERNEL_SIZE * (i % _this4.rwidth);
          var y = KERNEL_SIZE * Math.floor(i / _this4.rwidth);

          b.set([1, 1, 1, 1, 1, 1, 1], x + y * _this4.width);
          b.set([1, 1, 1, 1, 1, 1, 1], x + (y + 1) * _this4.width);
          b.set([1, 1, 1, 1, 1, 1, 1], x + (y + 2) * _this4.width);
        }
      };

      for (var i = 0; i < this.rwidth * this.rheight; i++) {
        _loop(i);
      }

      this.emit('segment', b);
    }
  }]);

  return Container;
})(_componentEmitter2['default']);

exports['default'] = Container;

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = exports['default'];
}, {"bodokaiser/geod":10,"bodokaiser/avdown":11,"component/emitter":12}],
10: [function(require, module, exports) {
'use strict';

var Transform = require('./transform');

module.exports = function (width, height) {
  return new Transform(width, height);
};
}, {"./transform":13}],
13: [function(require, module, exports) {
'use strict';

var DEFAULT_ITERS = 1;

function Transform(width, height) {
  this._iters = DEFAULT_ITERS;

  this._width = width;
  this._height = height;
  this._length = width * height;
}

Transform.prototype.iters = function (iters) {
  this._iters = iters;

  return this;
};

Transform.prototype.weight = function (weight) {
  this._weight = weight || new Uint8Array(this._length);
  if (this._weight.length !== this._length) {
    throw new Error('weight length missmatch');
  }

  return this;
};

Transform.prototype.distance = function (distance) {
  if (!distance) throw new Error('distance required');
  if (distance.length !== this._length) {
    throw new Error('distance length missmatch');
  }
  if (distance.reduce(function (p, c) {
    return p === c ? c : null;
  }) !== null) {
    throw new Error('distance missing unique values');
  }
  this._distance = distance;

  return this;
};

Transform.prototype.transform = function () {
  var dist = this._distance || this.distance()._distance;
  var weigh = this._weight || this.weight()._weight;

  var w = this._width - 1;
  var h = this._height - 1;

  for (var n = 0; n < this._iters; n++) {
    for (var j = 0; j < this._height; j++) {
      for (var i = 0; i < this._width; i++) {
        var k = [kernel(i, j), kernel(h - i, w - j, 1)].map(function (k) {
          return k.filter(outside);
        });

        dist[index(i, j)] = nearest(k[0], i, j);
        dist[index(h - i, w - j)] = nearest(k[1], h - i, w - j);
      }
    }
  }

  function index(x, y) {
    return x + (w + 1) * y;
  }

  function outside(l) {
    return !(l[0] < 0 || l[1] < 0 || l[0] > w || l[1] > h);
  }

  function nearest(k, x, y) {
    var i = index(x, y);

    return k.map(function (k) {
      return index(k[0], k[1]);
    }).map(function (l) {
      return 1 + Math.abs(weigh[i] - weigh[l]) + dist[l];
    }).concat(dist[i]).reduce(function (p, c) {
      return p > c ? c : p;
    });
  }

  return this;
};

module.exports = Transform;

function kernel(x, y, n) {
  var m = n && -1 || 1;

  return [[x - m, y - m], [x + m, y - m], [x, y - m], [x - m, y]];
}
}, {}],
11: [function(require, module, exports) {
'use strict';

var Transform = require('./transform');

module.exports = function (width, heigth) {
  return new Transform(width, heigth);
};
}, {"./transform":14}],
14: [function(require, module, exports) {
'use strict';

function Transform(width, height) {
  if (!Number.isInteger(width) || width < 0) {
    throw new Error('invalid width');
  }
  if (!Number.isInteger(height) || height < 0) {
    throw new Error('invalid height');
  }

  this._width = width;
  this._height = height;
  this._length = width * height;
}

Transform.prototype.image = function (image) {
  if (!ArrayBuffer.isView(image)) throw new Error('typed array required');
  if (image.length !== this._length) throw new Error('invalid image length');

  this._image = image;

  return this;
};

Transform.prototype.kernel = function (factor) {
  if (!Number.isInteger(factor)) throw new Error('factor required');
  if (factor < 2) throw new Error('kernel too small');
  if (factor % 2 !== 1) throw new Error('kernel must be odd');
  if (factor > this._width || factor > this._heigth) {
    throw new Error('kernel must be positive');
  }

  this._factor = factor;

  return this;
};

Transform.prototype.transform = function (callback) {
  var im = this._image || this.image();
  var kf = this._factor || this.kernel();

  var width = this._width;
  var height = this._height;

  var h = Math.floor(this._height / kf);
  var w = Math.floor(this._width / kf);

  var dw = new Uint8ClampedArray(w * h);

  var m = (kf - 1) / 2;

  for (var j = 0; j < h; j++) {
    for (var i = 0; i < w; i++) {
      dw[i + j * w] = kernel(kf, m + i * kf, m + j * kf).map(function (i) {
        return im[i[0] + width * i[1]];
      }).reduce(function (p, v) {
        return p + v;
      }) / Math.pow(kf, 2);
    }
  }

  if (callback) callback(null, dw, w, h);

  return [dw, w, h];
};

module.exports = Transform;

function kernel(kf, x, y) {
  var k = [];

  var s = -(kf - 1) / 2,
      e = (kf - 1) / 2;
  for (var j = s; j <= e; j++) {
    for (var i = s; i <= e; i++) {
      k.push([x + i, y + j]);
    }
  }

  return k;
}
}, {}],
12: [function(require, module, exports) {

/**
 * Expose `Emitter`.
 */

'use strict';

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function (event, fn) {
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function (event) {
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1),
      callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function (event) {
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function (event) {
  return !!this.listeners(event).length;
};
}, {}],
5: [function(require, module, exports) {
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var Y = 0x79;
var N = 0x6e;

var ENTER = 0x0d;

exports['default'] = function (app) {
  window.addEventListener('keypress', function (e) {
    switch (e.keyCode) {
      case Y:
        app.emit('key:confirm', true);break;
      case N:
        app.emit('key:confirm', false);break;
      case ENTER:
        app.emit('key:exec');break;
    }

    e.preventDefault();
  });
};

module.exports = exports['default'];
}, {}],
6: [function(require, module, exports) {
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ianstormtaylorRouter = require('ianstormtaylor/router');

var _ianstormtaylorRouter2 = _interopRequireDefault(_ianstormtaylorRouter);

exports['default'] = function (app) {
  app.router = new _ianstormtaylorRouter2['default']()
  app.router.on('/iswmle', function (c) {
    console.log('index')
    return app.emit('route:index');
  })
  app.router.on('/iswmle/:image', function (c) {
    console.log('imag')
    return app.emit('route:image', c.params);
  });
  app.router.listen()
};

module.exports = exports['default'];
}, {"ianstormtaylor/router":15}],
15: [function(require, module, exports) {
'use strict';

var event = require('event');
var Context = require('./context');
var history = require('history');
var link = require('link-delegate');
var indexof = require('indexof');
var prevent = require('prevent');
var Route = require('./route');
var stop = require('stop');
var url = require('url');

/**
 * Initials
 */

var pop = 'state' in window.history ? true : false;
var bound = false;

/**
 * All the routers
 */

var routers = [];

/**
 * Expose `Router`.
 */

module.exports = exports = Router;

/**
 * Expose `Route`.
 */

exports.Route = Route;

/**
 * Expose `Context`.
 */

exports.Context = Context;

/**
 * Initialize a new `Router`.
 */

function Router() {
  if (!(this instanceof Router)) return new Router();
  routers.push(this);
  this.routes = [];
  bind();
}

/**
 * Use the given `plugin`.
 *
 * @param {Function} plugin
 * @return {Router}
 */

Router.prototype.use = function (plugin) {
  plugin(this);
  return this;
};

/**
 * Attach a route handler.
 *
 * @param {String} path
 * @param {Functions...} (optional)
 * @return {Router}
 */

Router.prototype.on = function (path) {
  var route = this._route = new Route(path);
  var fns = [].slice.call(arguments, 1);
  this['in'].apply(this, fns);
  this.routes.push(route);
  return this;
};

/**
 * Add `in` middleware for the current route.
 *
 * @param {Functions...}
 */

Router.prototype['in'] = function () {
  return this.add('in', [].slice.call(arguments));
};

/**
 * Add `out` middleware for the current route.
 *
 * @param {Functions...}
 */

Router.prototype.out = function () {
  return this.add('out', [].slice.call(arguments));
};

/**
 * Trigger a route at `path`.
 *
 * @param {String} path
 * @return {Router}
 */

Router.prototype.dispatch = function (path) {
  var context = this.context(path);
  var route = this._route;
  if (route && context.previous) route.run('out', context.previous);

  var routes = this.routes;
  for (var i = 0, l = routes.length; i < l; i++) {
    routes[i].run('in', context);
  }

  return this;
};

/**
 * Dispatch a new `path` and push it to the history, or use the current path.
 *
 * @param {String} path (optional)
 * @param {Object} state (optional)
 * @return {Router}
 */

Router.prototype.start = Router.prototype.go = function (path, state) {
  if (!path) {
    path = location.pathname + location.search;
  } else {
    this.push(path, state);
    pop = false;
  }

  this.dispatch(path);
  return this;
};

/**
 * Start the router and listen for link clicks relative to an optional `path`.
 * You can optionally set `start` to false to manage the first dispatch yourself.
 *
 * @param {String} path
 * @param {Boolean} start
 * @return {Router}
 */

Router.prototype.listen = function (path, start) {
  if ('boolean' == typeof path) {
    start = path;
    path = null;
  }

  if (start || start === undefined) this.start();

  var self = this;
  link(function (e) {
    var el = e.delegateTarget;
    var href = el.href;
    if (!el.hasAttribute('href') || !routable(href, path)) return;
    prevent(e);
    stop(e);
    var parsed = url.parse(href);
    self.go(parsed.pathname);
  });

  return this;
};

/**
 * Push a new `path` to the browsers history.
 *
 * @param {String} path
 * @param {Object} state (optional)
 * @return {Router}
 */

Router.prototype.push = function (path, state) {
  history.push(path, state);
  pop = false;
  return this;
};

/**
 * Replace the current path in the browsers history.
 *
 * @param {String} path
 * @param {Object} state (optional)
 * @return {Router}
 */

Router.prototype.replace = function (path, state) {
  history.replace(path, state);
  pop = false;
  return this;
};

/**
 * Add `type` middleware `fns` to the current route.
 *
 * @param {String} type
 * @param {Array of Functions} fns
 * @return {Router}
 * @api private
 */

Router.prototype.add = function (type, fns) {
  var route = this._route;
  if (!route) throw new Error('Must define a route first.');
  for (var i = 0; i < fns.length; i++) route[type](fns[i]);
  return this;
};

/**
 * Generate a new context object for a given `path`.
 *
 * @param {String} path
 * @return {Context}
 * @api private
 */

Router.prototype.context = function (path) {
  var previous = this._context;
  var context = this._context = new Context(path);
  context.previous = previous;
  return context;
};

/**
 * Unbind the router
 *
 * @return {Router}
 * @api private
 */

Router.prototype.unbind = function () {
  var i = indexof(routers, this);
  if (~i) routers.splice(i, 1);
  return this;
};

/*
 * Static: Dispatch a new `path` and push it to the history,
 * or use the current path.
 *
 * @param {String} path (optional)
 * @param {Object} state (optional)
 * @return {Router}
 */

Router.start = Router.go = function (path, state) {
  if (!path) {
    path = location.pathname + location.search;
  } else {
    history.push(path, state);
    pop = false;
  }

  for (var i = 0, router; router = routers[i]; i++) {
    router.dispatch(path);
  }

  return this;
};

/**
 * Check if a given `href` is routable under `path`.
 *
 * @param {String} href
 * @return {Boolean}
 */

function routable(href, path) {
  if (!path) return true;
  var parsed = url.parse(href);
  if (parsed.pathname.indexOf(path) === 0) return true;
  return false;
}

/**
 * Bind to the popstate once
 */

function bind() {
  if (bound) return;
  var initial = location.href;
  event.bind(window, 'popstate', onpop);
  bound = true;

  function onpop(e) {
    if (pop && initial == location.href) return;
    for (var i = 0, router; router = routers[i]; i++) router.go();
    pop = false;
  }
}
}, {"event":16,"./context":17,"history":18,"link-delegate":19,"indexof":20,"prevent":21,"./route":22,"stop":23,"url":24}],
16: [function(require, module, exports) {
'use strict';

var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
    prefix = bind !== 'addEventListener' ? 'on' : '';

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function (el, type, fn, capture) {
  el[bind](prefix + type, fn, capture || false);
  return fn;
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.unbind = function (el, type, fn, capture) {
  el[unbind](prefix + type, fn, capture || false);
  return fn;
};
}, {}],
17: [function(require, module, exports) {
'use strict';

var history = require('history');
var querystring = require('querystring');

/**
 * Expose `Context`.
 */

module.exports = Context;

/**
 * Initialize a new `Context`.
 *
 * @param {String} path
 */

function Context(path) {
  this.path = path || '';
  this.params = [];
  this.state = history.state() || {};
  this.query = this.path.indexOf('?') ? querystring.parse(this.path.split('?')[1]) : {};
}
}, {"history":18,"querystring":25}],
18: [function(require, module, exports) {

/**
 * Get the current path.
 *
 * @return {String}
 */

"use strict";

exports.path = function () {
  return window.location.pathname;
};

/**
 * Get the current state.
 *
 * @return {Object}
 */

exports.state = function () {
  return window.history.state;
};

/**
 * Push a new `url` on to the history.
 *
 * @param {String} url
 * @param {Object} state (optional)
 */

exports.push = function (url, state) {
  window.history.pushState(state, null, url);
};

/**
 * Replace the current url with a new `url`.
 *
 * @param {String} url
 * @param {Object} state (optional)
 */

exports.replace = function (url, state) {
  window.history.replaceState(state, null, url);
};

/**
 * Move back in the history, by an optional number of `steps`.
 *
 * @param {Number} steps (optional)
 */

exports.back = exports.backward = function (steps) {
  steps || (steps = 1);
  window.history.go(-1 * steps);
};

/**
 * Move forward in the history, by an optional number of `steps`.
 *
 * @param {Number} steps (optional)
 */

exports.forward = function (steps) {
  steps || (steps = 1);
  window.history.go(steps);
};
}, {}],
25: [function(require, module, exports) {

/**
 * Module dependencies.
 */

'use strict';

var trim = require('trim');
var type = require('type');

var pattern = /(\w+)\[(\d+)\]/;

/**
 * Safely encode the given string
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

var encode = function encode(str) {
  try {
    return encodeURIComponent(str);
  } catch (e) {
    return str;
  }
};

/**
 * Safely decode the string
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

var decode = function decode(str) {
  try {
    return decodeURIComponent(str.replace(/\+/g, ' '));
  } catch (e) {
    return str;
  }
};

/**
 * Parse the given query `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api public
 */

exports.parse = function (str) {
  if ('string' != typeof str) return {};

  str = trim(str);
  if ('' == str) return {};
  if ('?' == str.charAt(0)) str = str.slice(1);

  var obj = {};
  var pairs = str.split('&');
  for (var i = 0; i < pairs.length; i++) {
    var parts = pairs[i].split('=');
    var key = decode(parts[0]);
    var m;

    if (m = pattern.exec(key)) {
      obj[m[1]] = obj[m[1]] || [];
      obj[m[1]][m[2]] = decode(parts[1]);
      continue;
    }

    obj[parts[0]] = null == parts[1] ? '' : decode(parts[1]);
  }

  return obj;
};

/**
 * Stringify the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api public
 */

exports.stringify = function (obj) {
  if (!obj) return '';
  var pairs = [];

  for (var key in obj) {
    var value = obj[key];

    if ('array' == type(value)) {
      for (var i = 0; i < value.length; ++i) {
        pairs.push(encode(key + '[' + i + ']') + '=' + encode(value[i]));
      }
      continue;
    }

    pairs.push(encode(key) + '=' + encode(obj[key]));
  }

  return pairs.join('&');
};
}, {"trim":26,"type":27}],
26: [function(require, module, exports) {
'use strict';

exports = module.exports = trim;

function trim(str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function (str) {
  if (str.trimLeft) return str.trimLeft();
  return str.replace(/^\s*/, '');
};

exports.right = function (str) {
  if (str.trimRight) return str.trimRight();
  return str.replace(/\s*$/, '');
};
}, {}],
27: [function(require, module, exports) {
/**
 * toString ref.
 */

'use strict';

var toString = Object.prototype.toString;

/**
 * Return the type of `val`.
 *
 * @param {Mixed} val
 * @return {String}
 * @api public
 */

module.exports = function (val) {
  switch (toString.call(val)) {
    case '[object Date]':
      return 'date';
    case '[object RegExp]':
      return 'regexp';
    case '[object Arguments]':
      return 'arguments';
    case '[object Array]':
      return 'array';
    case '[object Error]':
      return 'error';
  }

  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (val !== val) return 'nan';
  if (val && val.nodeType === 1) return 'element';

  val = val.valueOf ? val.valueOf() : Object.prototype.valueOf.apply(val);

  return typeof val;
};
}, {}],
19: [function(require, module, exports) {

/**
 * Module dependencies.
 */

'use strict';

var delegate = require('delegate');
var url = require('url');

/**
 * Handle link delegation on `el` or the document,
 * and invoke `fn(e)` when clickable.
 *
 * @param {Element|Function} el or fn
 * @param {Function} [fn]
 * @api public
 */

module.exports = function (el, fn) {
  // default to document
  if ('function' == typeof el) {
    fn = el;
    el = document;
  }

  delegate.bind(el, 'a', 'click', function (e) {
    if (clickable(e)) fn(e);
  });
};

/**
 * Check if `e` is clickable.
 */

function clickable(e) {
  if (1 != which(e)) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey) return;
  if (e.defaultPrevented) return;

  // target
  var el = e.target;

  // check target
  if (el.target) return;

  // x-origin
  if (url.isCrossDomain(el.href)) return;

  return true;
}

/**
 * Event button.
 */

function which(e) {
  e = e || window.event;
  return null == e.which ? e.button : e.which;
}
}, {"delegate":28,"url":24}],
28: [function(require, module, exports) {
/**
 * Module dependencies.
 */

'use strict';

var closest = require('closest'),
    event = require('event');

/**
 * Delegate event `type` to `selector`
 * and invoke `fn(e)`. A callback function
 * is returned which may be passed to `.unbind()`.
 *
 * @param {Element} el
 * @param {String} selector
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function (el, selector, type, fn, capture) {
  return event.bind(el, type, function (e) {
    var target = e.target || e.srcElement;
    e.delegateTarget = closest(target, selector, true, el);
    if (e.delegateTarget) fn.call(el, e);
  }, capture);
};

/**
 * Unbind event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */

exports.unbind = function (el, type, fn, capture) {
  event.unbind(el, type, fn, capture);
};
}, {"closest":29,"event":16}],
29: [function(require, module, exports) {
/**
 * Module Dependencies
 */

'use strict';

var matches = require('matches-selector');

/**
 * Export `closest`
 */

module.exports = closest;

/**
 * Closest
 *
 * @param {Element} el
 * @param {String} selector
 * @param {Element} scope (optional)
 */

function closest(el, selector, scope) {
  scope = scope || document.documentElement;

  // walk up the dom
  while (el && el !== scope) {
    if (matches(el, selector)) return el;
    el = el.parentNode;
  }

  // check scope for match
  return matches(el, selector) ? el : null;
}
}, {"matches-selector":30}],
30: [function(require, module, exports) {
/**
 * Module dependencies.
 */

'use strict';

var query = require('query');

/**
 * Element prototype.
 */

var proto = Element.prototype;

/**
 * Vendor function.
 */

var vendor = proto.matches || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;

/**
 * Expose `match()`.
 */

module.exports = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  if (!el || el.nodeType !== 1) return false;
  if (vendor) return vendor.call(el, selector);
  var nodes = query.all(selector, el.parentNode);
  for (var i = 0; i < nodes.length; ++i) {
    if (nodes[i] == el) return true;
  }
  return false;
}
}, {"query":31}],
31: [function(require, module, exports) {
'use strict';

function one(selector, el) {
  return el.querySelector(selector);
}

exports = module.exports = function (selector, el) {
  el = el || document;
  return one(selector, el);
};

exports.all = function (selector, el) {
  el = el || document;
  return el.querySelectorAll(selector);
};

exports.engine = function (obj) {
  if (!obj.one) throw new Error('.one callback required');
  if (!obj.all) throw new Error('.all callback required');
  one = obj.one;
  exports.all = obj.all;
  return exports;
};
}, {}],
24: [function(require, module, exports) {

/**
 * Parse the given `url`.
 *
 * @param {String} str
 * @return {Object}
 * @api public
 */

'use strict';

exports.parse = function (url) {
  var a = document.createElement('a');
  a.href = url;
  return {
    href: a.href,
    host: a.host || location.host,
    port: '0' === a.port || '' === a.port ? port(a.protocol) : a.port,
    hash: a.hash,
    hostname: a.hostname || location.hostname,
    pathname: a.pathname.charAt(0) != '/' ? '/' + a.pathname : a.pathname,
    protocol: !a.protocol || ':' == a.protocol ? location.protocol : a.protocol,
    search: a.search,
    query: a.search.slice(1)
  };
};

/**
 * Check if `url` is absolute.
 *
 * @param {String} url
 * @return {Boolean}
 * @api public
 */

exports.isAbsolute = function (url) {
  return 0 == url.indexOf('//') || !! ~url.indexOf('://');
};

/**
 * Check if `url` is relative.
 *
 * @param {String} url
 * @return {Boolean}
 * @api public
 */

exports.isRelative = function (url) {
  return !exports.isAbsolute(url);
};

/**
 * Check if `url` is cross domain.
 *
 * @param {String} url
 * @return {Boolean}
 * @api public
 */

exports.isCrossDomain = function (url) {
  url = exports.parse(url);
  var location = exports.parse(window.location.href);
  return url.hostname !== location.hostname || url.port !== location.port || url.protocol !== location.protocol;
};

/**
 * Return default port for `protocol`.
 *
 * @param  {String} protocol
 * @return {String}
 * @api private
 */
function port(protocol) {
  switch (protocol) {
    case 'http:':
      return 80;
    case 'https:':
      return 443;
    default:
      return location.port;
  }
}
}, {}],
20: [function(require, module, exports) {
"use strict";

module.exports = function (arr, obj) {
  if (arr.indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};
}, {}],
21: [function(require, module, exports) {

/**
 * prevent default on the given `e`.
 *
 * examples:
 *
 *      anchor.onclick = prevent;
 *      anchor.onclick = function(e){
 *        if (something) return prevent(e);
 *      };
 *
 * @param {Event} e
 */

"use strict";

module.exports = function (e) {
  e = e || window.event;
  return e.preventDefault ? e.preventDefault() : e.returnValue = false;
};
}, {}],
22: [function(require, module, exports) {
'use strict';

var regexp = require('path-to-regexp');
var Ware = require('ware');

/**
 * Expose `Route`.
 */

module.exports = Route;

/**
 * Initialize a new `Route` with the given `path`.
 *
 * @param {String} path
 */

function Route(path) {
  this.path = path;
  this.keys = [];
  this.regexp = regexp(path, this.keys);
  this._in = new Ware();
  this._out = new Ware();
}

/**
 * Use `in` middleware `fn`.
 *
 * @param {Function} fn
 * @return {Route}
 */

Route.prototype['in'] = function (fn) {
  this._in.use(this.middleware(fn));
  return this;
};

/**
 * Use `out` middleware `fn`.
 *
 * @param {Function} fn
 * @return {Route}
 */

Route.prototype.out = function (fn) {
  this._out.use(this.middleware(fn));
  return this;
};

/**
 * Run middleware of `type` with `context`.
 *
 * @param {String} type ('in' or 'out')
 * @param {Context} context
 * @return {Route}
 */

Route.prototype.run = function (type, context) {
  var ware = this['_' + type];
  ware.run(context);
  return this;
};

/**
 * Check if the route matches a given `path`, adding matches into `params`.
 *
 * @param {String} path
 * @param {Array} params
 * @return {Boolean}
 */

Route.prototype.match = function (path, params) {
  var keys = this.keys;
  var pathname = path.split('?')[0];
  var m = this.regexp.exec(pathname);
  if (!m) return false;

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = keys[i - 1];
    var val = 'string' == typeof m[i] ? decodeURIComponent(m[i]) : m[i];
    if (key) params[key.name] = val;
    params.push(val);
  }

  return true;
};

/**
 * Return route middleware with the given `fn`.
 *
 * @param {Function} fn
 * @return {Function}
 * @api private
 */

Route.prototype.middleware = function (fn) {
  var self = this;
  var match = function match(context) {
    return self.match(context.path, context.params);
  };

  switch (fn.length) {
    case 3:
      return function (err, ctx, next) {
        match(ctx) ? fn(err, ctx, next) : next();
      };
    case 2:
      return function (ctx, next) {
        match(ctx) ? fn(ctx, next) : next();
      };
    default:
      return function (ctx, next) {
        if (match(ctx)) fn(ctx);next();
      };
  }
};
}, {"path-to-regexp":32,"ware":33}],
32: [function(require, module, exports) {
'use strict';

var isarray = require('isarray');

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp;
module.exports.parse = parse;
module.exports.compile = compile;
module.exports.tokensToFunction = tokensToFunction;
module.exports.tokensToRegExp = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
// Match escaped characters that would otherwise appear in future matches.
// This allows the user to escape special characters that won't transform.
'(\\\\.)',
// Match Express-style parameters and un-named parameters with a prefix
// and optional suffixes. Matches appear as:
//
// "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
// "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
// "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
'([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {String} str
 * @return {Array}
 */
function parse(str) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue;
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var suffix = res[6];
    var asterisk = res[7];

    var repeat = suffix === '+' || suffix === '*';
    var optional = suffix === '?' || suffix === '*';
    var delimiter = prefix || '/';
    var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?');

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      pattern: escapeGroup(pattern)
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens;
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {String}   str
 * @return {Function}
 */
function compile(str) {
  return tokensToFunction(parse(str));
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^' + tokens[i].pattern + '$');
    }
  }

  return function (obj) {
    var path = '';
    var data = obj || {};

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue;
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          continue;
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined');
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"');
        }

        if (value.length === 0) {
          if (token.optional) {
            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty');
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encodeURIComponent(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue;
      }

      segment = encodeURIComponent(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
      }

      path += token.prefix + segment;
    }

    return path;
  };
}

/**
 * Escape a regular expression string.
 *
 * @param  {String} str
 * @return {String}
 */
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1');
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {String} group
 * @return {String}
 */
function escapeGroup(group) {
  return group.replace(/([=!:$\/()])/g, '\\$1');
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {RegExp} re
 * @param  {Array}  keys
 * @return {RegExp}
 */
function attachKeys(re, keys) {
  re.keys = keys;
  return re;
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {String}
 */
function flags(options) {
  return options.sensitive ? '' : 'i';
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {RegExp} path
 * @param  {Array}  keys
 * @return {RegExp}
 */
function regexpToRegexp(path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys);
}

/**
 * Transform an array into a regexp.
 *
 * @param  {Array}  path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function arrayToRegexp(path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys);
}

/**
 * Create a path regexp from string input.
 *
 * @param  {String} path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function stringToRegexp(path, keys, options) {
  var tokens = parse(path);
  var re = tokensToRegExp(tokens, options);

  // Attach keys back to the regexp.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] !== 'string') {
      keys.push(tokens[i]);
    }
  }

  return attachKeys(re, keys);
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {Array}  tokens
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function tokensToRegExp(tokens, options) {
  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';
  var lastToken = tokens[tokens.length - 1];
  var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken);

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = token.pattern;

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (prefix) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithSlash ? '' : '(?=\\/|$)';
  }

  return new RegExp('^' + route, flags(options));
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(String|RegExp|Array)} path
 * @param  {Array}                 [keys]
 * @param  {Object}                [options]
 * @return {RegExp}
 */
function pathToRegexp(path, keys, options) {
  keys = keys || [];

  if (!isarray(keys)) {
    options = keys;
    keys = [];
  } else if (!options) {
    options = {};
  }

  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys, options);
  }

  if (isarray(path)) {
    return arrayToRegexp(path, keys, options);
  }

  return stringToRegexp(path, keys, options);
}
}, {"isarray":34}],
34: [function(require, module, exports) {
'use strict';

module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};
}, {}],
33: [function(require, module, exports) {

/**
 * Expose `Ware`.
 */

'use strict';

module.exports = Ware;

/**
 * Initialize a new `Ware` manager, with optional `fns`.
 *
 * @param {Function or Array or Ware} fn (optional)
 */

function Ware(fn) {
  if (!(this instanceof Ware)) return new Ware(fn);
  this.fns = [];
  if (fn) this.use(fn);
}

/**
 * Use a middleware `fn`.
 *
 * @param {Function or Array or Ware} fn
 * @return {Ware}
 */

Ware.prototype.use = function (fn) {
  if (fn instanceof Ware) {
    return this.use(fn.fns);
  }

  if (fn instanceof Array) {
    for (var i = 0, f; f = fn[i]; i++) this.fns.push(f);
    return this;
  }

  this.fns.push(fn);
  return this;
};

/**
 * Run through the middleware with the given `args` and optional `callback`.
 *
 * @param {Mixed} args...
 * @param {Function} callback (optional)
 * @return {Ware}
 */

Ware.prototype.run = function () {
  var fns = this.fns;
  var i = 0;
  var last = arguments[arguments.length - 1];
  var callback = 'function' == typeof last ? last : null;
  var args = callback ? [].slice.call(arguments, 0, arguments.length - 1) : [].slice.call(arguments);

  function next(_x) {
    var _arguments = arguments;
    var _again = true;

    _function: while (_again) {
      var err = _x;
      fn = arr = undefined;
      _again = false;

      var fn = fns[i++];
      if (!fn) return callback && callback.apply(null, [err].concat(args));

      if (fn.length < args.length + 2 && err) {
        _arguments = [_x = err];
        _again = true;
        continue _function;
      }
      if (fn.length == args.length + 2 && !err) {
        _arguments = [_x = undefined];
        _again = true;
        continue _function;
      }

      var arr = [].slice.call(args);
      if (err) arr.unshift(err);
      arr.push(next);
      fn.apply(null, arr);
    }
  }

  setTimeout(next, 0); // keep it always async
  return this;
};
}, {}],
23: [function(require, module, exports) {

/**
 * stop propagation on the given `e`.
 *
 * examples:
 *
 *      anchor.onclick = require('stop');
 *      anchor.onclick = function(e){
 *        if (!some) return require('stop')(e);
 *      };
 *
 *
 * @param {Event} e
 */

"use strict";

module.exports = function (e) {
  e = e || window.event;
  return e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
};
}, {}],
7: [function(require, module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _dekujsVirtualElement = require('dekujs/virtual-element');

var _dekujsVirtualElement2 = _interopRequireDefault(_dekujsVirtualElement);

var Image = {

  render: function render(_ref) {
    var props = _ref.props;
    var image = props.image;

    return (0, _dekujsVirtualElement2["default"])(
      "div",
      { "class": "col-xs-4" },
      (0, _dekujsVirtualElement2["default"])(
        "a",
        { "class": "thumbnail", href: '/iswmle/' + image.id },
        (0, _dekujsVirtualElement2["default"])("img", { "class": "img-rounded", src: image.src })
      )
    );
  }

};

var Images = {

  propTypes: {
    images: { source: 'images' }
  },

  defaultProp: {
    images: []
  },

  render: function render(_ref2) {
    var props = _ref2.props;
    console.log('props', props)

    var images = props.images.map(function (image) {
      return (0, _dekujsVirtualElement2["default"])(Image, { image: image });
    });

    return (0, _dekujsVirtualElement2["default"])(
      "div",
      { "class": "row" },
      images
    );
  }

};

exports["default"] = Images;
module.exports = exports["default"];
}, {"dekujs/virtual-element":3}],
8: [function(require, module, exports) {
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dekujsVirtualElement = require('dekujs/virtual-element');

var _dekujsVirtualElement2 = _interopRequireDefault(_dekujsVirtualElement);

var RECT_W = 8;
var RECT_H = 8;

var DARKEN = 'rgba(0, 0, 0, 0.6)';

var Canvas = {

  propTypes: {
    image: { source: 'image' }
  },

  render: function render() {
    return (0, _dekujsVirtualElement2['default'])('canvas', null);
  },

  afterRender: function afterRender(_ref, canvas) {
    var props = _ref.props;
    var state = _ref.state;
    var image = props.image;

    image.load(function (img) {
      canvas.width = img.width;
      canvas.height = img.height;

      state.ctx = canvas.getContext('2d');
      state.ctx.drawImage(img, 0, 0);

      image.addEventListener('seed', paintSeed);
      image.addEventListener('segment', paintSegment);
      image.init(state.ctx.getImageData(0, 0, img.width, img.height));
    });

    function paintSeed(seed) {
      state.ctx.fillStyle = seed.color;
      state.ctx.fillRect(seed.x, seed.y, RECT_W, RECT_H);
    }
    function paintSegment(segment) {
      for (var j = 0; j < image.height; j++) {
        for (var i = 0; i < image.width; i++) {
          if (segment[i + j * image.width] === 0) {
            state.ctx.fillStyle = DARKEN;
            state.ctx.fillRect(i, j, 1, 1);
          }
        }
      }
    }
  }

};

exports['default'] = Canvas;
module.exports = exports['default'];
}, {"dekujs/virtual-element":3}]}, {}, {"1":""})
