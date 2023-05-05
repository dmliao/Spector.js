(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // window-shim.js
  var fakeWindow;
  var init_window_shim = __esm({
    "window-shim.js"() {
      fakeWindow = {};
      if (typeof window !== "undefined") {
        fakeWindow = window;
      }
      fakeWindow.criRequest = async (options, callback) => {
        const { host, port, path } = options;
        const url = `http://${host}:${port}${path}`;
        console.log(url);
        try {
          const res = await fetch({
            url,
            method: "get"
          });
          const responseText = await res.text();
          callback(null, responseText);
        } catch (e) {
          callback(e, null);
        }
      };
    }
  });

  // node_modules/localforage/dist/localforage.js
  var require_localforage = __commonJS({
    "node_modules/localforage/dist/localforage.js"(exports, module) {
      init_window_shim();
      (function(f) {
        if (typeof exports === "object" && typeof module !== "undefined") {
          module.exports = f();
        } else if (typeof define === "function" && define.amd) {
          define([], f);
        } else {
          var g;
          if (typeof fakeWindow !== "undefined") {
            g = fakeWindow;
          } else if (typeof global !== "undefined") {
            g = global;
          } else if (typeof self !== "undefined") {
            g = self;
          } else {
            g = this;
          }
          g.localforage = f();
        }
      })(function() {
        var define2, module2, exports2;
        return function e(t, n, r) {
          function s(o2, u) {
            if (!n[o2]) {
              if (!t[o2]) {
                var a = typeof __require == "function" && __require;
                if (!u && a)
                  return a(o2, true);
                if (i)
                  return i(o2, true);
                var f = new Error("Cannot find module '" + o2 + "'");
                throw f.code = "MODULE_NOT_FOUND", f;
              }
              var l = n[o2] = { exports: {} };
              t[o2][0].call(l.exports, function(e2) {
                var n2 = t[o2][1][e2];
                return s(n2 ? n2 : e2);
              }, l, l.exports, e, t, n, r);
            }
            return n[o2].exports;
          }
          var i = typeof __require == "function" && __require;
          for (var o = 0; o < r.length; o++)
            s(r[o]);
          return s;
        }({ 1: [function(_dereq_, module3, exports3) {
          (function(global2) {
            "use strict";
            var Mutation = global2.MutationObserver || global2.WebKitMutationObserver;
            var scheduleDrain;
            {
              if (Mutation) {
                var called = 0;
                var observer = new Mutation(nextTick);
                var element = global2.document.createTextNode("");
                observer.observe(element, {
                  characterData: true
                });
                scheduleDrain = function() {
                  element.data = called = ++called % 2;
                };
              } else if (!global2.setImmediate && typeof global2.MessageChannel !== "undefined") {
                var channel = new global2.MessageChannel();
                channel.port1.onmessage = nextTick;
                scheduleDrain = function() {
                  channel.port2.postMessage(0);
                };
              } else if ("document" in global2 && "onreadystatechange" in global2.document.createElement("script")) {
                scheduleDrain = function() {
                  var scriptEl = global2.document.createElement("script");
                  scriptEl.onreadystatechange = function() {
                    nextTick();
                    scriptEl.onreadystatechange = null;
                    scriptEl.parentNode.removeChild(scriptEl);
                    scriptEl = null;
                  };
                  global2.document.documentElement.appendChild(scriptEl);
                };
              } else {
                scheduleDrain = function() {
                  setTimeout(nextTick, 0);
                };
              }
            }
            var draining;
            var queue = [];
            function nextTick() {
              draining = true;
              var i, oldQueue;
              var len = queue.length;
              while (len) {
                oldQueue = queue;
                queue = [];
                i = -1;
                while (++i < len) {
                  oldQueue[i]();
                }
                len = queue.length;
              }
              draining = false;
            }
            module3.exports = immediate;
            function immediate(task) {
              if (queue.push(task) === 1 && !draining) {
                scheduleDrain();
              }
            }
          }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof fakeWindow !== "undefined" ? fakeWindow : {});
        }, {}], 2: [function(_dereq_, module3, exports3) {
          "use strict";
          var immediate = _dereq_(1);
          function INTERNAL() {
          }
          var handlers = {};
          var REJECTED = ["REJECTED"];
          var FULFILLED = ["FULFILLED"];
          var PENDING = ["PENDING"];
          module3.exports = Promise2;
          function Promise2(resolver) {
            if (typeof resolver !== "function") {
              throw new TypeError("resolver must be a function");
            }
            this.state = PENDING;
            this.queue = [];
            this.outcome = void 0;
            if (resolver !== INTERNAL) {
              safelyResolveThenable(this, resolver);
            }
          }
          Promise2.prototype["catch"] = function(onRejected) {
            return this.then(null, onRejected);
          };
          Promise2.prototype.then = function(onFulfilled, onRejected) {
            if (typeof onFulfilled !== "function" && this.state === FULFILLED || typeof onRejected !== "function" && this.state === REJECTED) {
              return this;
            }
            var promise = new this.constructor(INTERNAL);
            if (this.state !== PENDING) {
              var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
              unwrap(promise, resolver, this.outcome);
            } else {
              this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
            }
            return promise;
          };
          function QueueItem(promise, onFulfilled, onRejected) {
            this.promise = promise;
            if (typeof onFulfilled === "function") {
              this.onFulfilled = onFulfilled;
              this.callFulfilled = this.otherCallFulfilled;
            }
            if (typeof onRejected === "function") {
              this.onRejected = onRejected;
              this.callRejected = this.otherCallRejected;
            }
          }
          QueueItem.prototype.callFulfilled = function(value) {
            handlers.resolve(this.promise, value);
          };
          QueueItem.prototype.otherCallFulfilled = function(value) {
            unwrap(this.promise, this.onFulfilled, value);
          };
          QueueItem.prototype.callRejected = function(value) {
            handlers.reject(this.promise, value);
          };
          QueueItem.prototype.otherCallRejected = function(value) {
            unwrap(this.promise, this.onRejected, value);
          };
          function unwrap(promise, func, value) {
            immediate(function() {
              var returnValue;
              try {
                returnValue = func(value);
              } catch (e) {
                return handlers.reject(promise, e);
              }
              if (returnValue === promise) {
                handlers.reject(promise, new TypeError("Cannot resolve promise with itself"));
              } else {
                handlers.resolve(promise, returnValue);
              }
            });
          }
          handlers.resolve = function(self2, value) {
            var result = tryCatch(getThen, value);
            if (result.status === "error") {
              return handlers.reject(self2, result.value);
            }
            var thenable = result.value;
            if (thenable) {
              safelyResolveThenable(self2, thenable);
            } else {
              self2.state = FULFILLED;
              self2.outcome = value;
              var i = -1;
              var len = self2.queue.length;
              while (++i < len) {
                self2.queue[i].callFulfilled(value);
              }
            }
            return self2;
          };
          handlers.reject = function(self2, error) {
            self2.state = REJECTED;
            self2.outcome = error;
            var i = -1;
            var len = self2.queue.length;
            while (++i < len) {
              self2.queue[i].callRejected(error);
            }
            return self2;
          };
          function getThen(obj) {
            var then = obj && obj.then;
            if (obj && (typeof obj === "object" || typeof obj === "function") && typeof then === "function") {
              return function appyThen() {
                then.apply(obj, arguments);
              };
            }
          }
          function safelyResolveThenable(self2, thenable) {
            var called = false;
            function onError(value) {
              if (called) {
                return;
              }
              called = true;
              handlers.reject(self2, value);
            }
            function onSuccess(value) {
              if (called) {
                return;
              }
              called = true;
              handlers.resolve(self2, value);
            }
            function tryToUnwrap() {
              thenable(onSuccess, onError);
            }
            var result = tryCatch(tryToUnwrap);
            if (result.status === "error") {
              onError(result.value);
            }
          }
          function tryCatch(func, value) {
            var out = {};
            try {
              out.value = func(value);
              out.status = "success";
            } catch (e) {
              out.status = "error";
              out.value = e;
            }
            return out;
          }
          Promise2.resolve = resolve;
          function resolve(value) {
            if (value instanceof this) {
              return value;
            }
            return handlers.resolve(new this(INTERNAL), value);
          }
          Promise2.reject = reject;
          function reject(reason) {
            var promise = new this(INTERNAL);
            return handlers.reject(promise, reason);
          }
          Promise2.all = all;
          function all(iterable) {
            var self2 = this;
            if (Object.prototype.toString.call(iterable) !== "[object Array]") {
              return this.reject(new TypeError("must be an array"));
            }
            var len = iterable.length;
            var called = false;
            if (!len) {
              return this.resolve([]);
            }
            var values = new Array(len);
            var resolved = 0;
            var i = -1;
            var promise = new this(INTERNAL);
            while (++i < len) {
              allResolver(iterable[i], i);
            }
            return promise;
            function allResolver(value, i2) {
              self2.resolve(value).then(resolveFromAll, function(error) {
                if (!called) {
                  called = true;
                  handlers.reject(promise, error);
                }
              });
              function resolveFromAll(outValue) {
                values[i2] = outValue;
                if (++resolved === len && !called) {
                  called = true;
                  handlers.resolve(promise, values);
                }
              }
            }
          }
          Promise2.race = race;
          function race(iterable) {
            var self2 = this;
            if (Object.prototype.toString.call(iterable) !== "[object Array]") {
              return this.reject(new TypeError("must be an array"));
            }
            var len = iterable.length;
            var called = false;
            if (!len) {
              return this.resolve([]);
            }
            var i = -1;
            var promise = new this(INTERNAL);
            while (++i < len) {
              resolver(iterable[i]);
            }
            return promise;
            function resolver(value) {
              self2.resolve(value).then(function(response) {
                if (!called) {
                  called = true;
                  handlers.resolve(promise, response);
                }
              }, function(error) {
                if (!called) {
                  called = true;
                  handlers.reject(promise, error);
                }
              });
            }
          }
        }, { "1": 1 }], 3: [function(_dereq_, module3, exports3) {
          (function(global2) {
            "use strict";
            if (typeof global2.Promise !== "function") {
              global2.Promise = _dereq_(2);
            }
          }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof fakeWindow !== "undefined" ? fakeWindow : {});
        }, { "2": 2 }], 4: [function(_dereq_, module3, exports3) {
          "use strict";
          var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
            return typeof obj;
          } : function(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
          };
          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }
          function getIDB() {
            try {
              if (typeof indexedDB !== "undefined") {
                return indexedDB;
              }
              if (typeof webkitIndexedDB !== "undefined") {
                return webkitIndexedDB;
              }
              if (typeof mozIndexedDB !== "undefined") {
                return mozIndexedDB;
              }
              if (typeof OIndexedDB !== "undefined") {
                return OIndexedDB;
              }
              if (typeof msIndexedDB !== "undefined") {
                return msIndexedDB;
              }
            } catch (e) {
              return;
            }
          }
          var idb = getIDB();
          function isIndexedDBValid() {
            try {
              if (!idb || !idb.open) {
                return false;
              }
              var isSafari = typeof openDatabase !== "undefined" && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);
              var hasFetch = typeof fetch === "function" && fetch.toString().indexOf("[native code") !== -1;
              return (!isSafari || hasFetch) && typeof indexedDB !== "undefined" && // some outdated implementations of IDB that appear on Samsung
              // and HTC Android devices <4.4 are missing IDBKeyRange
              // See: https://github.com/mozilla/localForage/issues/128
              // See: https://github.com/mozilla/localForage/issues/272
              typeof IDBKeyRange !== "undefined";
            } catch (e) {
              return false;
            }
          }
          function createBlob(parts, properties) {
            parts = parts || [];
            properties = properties || {};
            try {
              return new Blob(parts, properties);
            } catch (e) {
              if (e.name !== "TypeError") {
                throw e;
              }
              var Builder = typeof BlobBuilder !== "undefined" ? BlobBuilder : typeof MSBlobBuilder !== "undefined" ? MSBlobBuilder : typeof MozBlobBuilder !== "undefined" ? MozBlobBuilder : WebKitBlobBuilder;
              var builder = new Builder();
              for (var i = 0; i < parts.length; i += 1) {
                builder.append(parts[i]);
              }
              return builder.getBlob(properties.type);
            }
          }
          if (typeof Promise === "undefined") {
            _dereq_(3);
          }
          var Promise$1 = Promise;
          function executeCallback(promise, callback) {
            if (callback) {
              promise.then(function(result) {
                callback(null, result);
              }, function(error) {
                callback(error);
              });
            }
          }
          function executeTwoCallbacks(promise, callback, errorCallback) {
            if (typeof callback === "function") {
              promise.then(callback);
            }
            if (typeof errorCallback === "function") {
              promise["catch"](errorCallback);
            }
          }
          function normalizeKey(key2) {
            if (typeof key2 !== "string") {
              console.warn(key2 + " used as a key, but it is not a string.");
              key2 = String(key2);
            }
            return key2;
          }
          function getCallback() {
            if (arguments.length && typeof arguments[arguments.length - 1] === "function") {
              return arguments[arguments.length - 1];
            }
          }
          var DETECT_BLOB_SUPPORT_STORE = "local-forage-detect-blob-support";
          var supportsBlobs = void 0;
          var dbContexts = {};
          var toString = Object.prototype.toString;
          var READ_ONLY = "readonly";
          var READ_WRITE = "readwrite";
          function _binStringToArrayBuffer(bin) {
            var length2 = bin.length;
            var buf = new ArrayBuffer(length2);
            var arr = new Uint8Array(buf);
            for (var i = 0; i < length2; i++) {
              arr[i] = bin.charCodeAt(i);
            }
            return buf;
          }
          function _checkBlobSupportWithoutCaching(idb2) {
            return new Promise$1(function(resolve) {
              var txn = idb2.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
              var blob = createBlob([""]);
              txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, "key");
              txn.onabort = function(e) {
                e.preventDefault();
                e.stopPropagation();
                resolve(false);
              };
              txn.oncomplete = function() {
                var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
                var matchedEdge = navigator.userAgent.match(/Edge\//);
                resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
              };
            })["catch"](function() {
              return false;
            });
          }
          function _checkBlobSupport(idb2) {
            if (typeof supportsBlobs === "boolean") {
              return Promise$1.resolve(supportsBlobs);
            }
            return _checkBlobSupportWithoutCaching(idb2).then(function(value) {
              supportsBlobs = value;
              return supportsBlobs;
            });
          }
          function _deferReadiness(dbInfo) {
            var dbContext = dbContexts[dbInfo.name];
            var deferredOperation = {};
            deferredOperation.promise = new Promise$1(function(resolve, reject) {
              deferredOperation.resolve = resolve;
              deferredOperation.reject = reject;
            });
            dbContext.deferredOperations.push(deferredOperation);
            if (!dbContext.dbReady) {
              dbContext.dbReady = deferredOperation.promise;
            } else {
              dbContext.dbReady = dbContext.dbReady.then(function() {
                return deferredOperation.promise;
              });
            }
          }
          function _advanceReadiness(dbInfo) {
            var dbContext = dbContexts[dbInfo.name];
            var deferredOperation = dbContext.deferredOperations.pop();
            if (deferredOperation) {
              deferredOperation.resolve();
              return deferredOperation.promise;
            }
          }
          function _rejectReadiness(dbInfo, err) {
            var dbContext = dbContexts[dbInfo.name];
            var deferredOperation = dbContext.deferredOperations.pop();
            if (deferredOperation) {
              deferredOperation.reject(err);
              return deferredOperation.promise;
            }
          }
          function _getConnection(dbInfo, upgradeNeeded) {
            return new Promise$1(function(resolve, reject) {
              dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();
              if (dbInfo.db) {
                if (upgradeNeeded) {
                  _deferReadiness(dbInfo);
                  dbInfo.db.close();
                } else {
                  return resolve(dbInfo.db);
                }
              }
              var dbArgs = [dbInfo.name];
              if (upgradeNeeded) {
                dbArgs.push(dbInfo.version);
              }
              var openreq = idb.open.apply(idb, dbArgs);
              if (upgradeNeeded) {
                openreq.onupgradeneeded = function(e) {
                  var db = openreq.result;
                  try {
                    db.createObjectStore(dbInfo.storeName);
                    if (e.oldVersion <= 1) {
                      db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                    }
                  } catch (ex) {
                    if (ex.name === "ConstraintError") {
                      console.warn('The database "' + dbInfo.name + '" has been upgraded from version ' + e.oldVersion + " to version " + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                    } else {
                      throw ex;
                    }
                  }
                };
              }
              openreq.onerror = function(e) {
                e.preventDefault();
                reject(openreq.error);
              };
              openreq.onsuccess = function() {
                var db = openreq.result;
                db.onversionchange = function(e) {
                  e.target.close();
                };
                resolve(db);
                _advanceReadiness(dbInfo);
              };
            });
          }
          function _getOriginalConnection(dbInfo) {
            return _getConnection(dbInfo, false);
          }
          function _getUpgradedConnection(dbInfo) {
            return _getConnection(dbInfo, true);
          }
          function _isUpgradeNeeded(dbInfo, defaultVersion) {
            if (!dbInfo.db) {
              return true;
            }
            var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
            var isDowngrade = dbInfo.version < dbInfo.db.version;
            var isUpgrade = dbInfo.version > dbInfo.db.version;
            if (isDowngrade) {
              if (dbInfo.version !== defaultVersion) {
                console.warn('The database "' + dbInfo.name + `" can't be downgraded from version ` + dbInfo.db.version + " to version " + dbInfo.version + ".");
              }
              dbInfo.version = dbInfo.db.version;
            }
            if (isUpgrade || isNewStore) {
              if (isNewStore) {
                var incVersion = dbInfo.db.version + 1;
                if (incVersion > dbInfo.version) {
                  dbInfo.version = incVersion;
                }
              }
              return true;
            }
            return false;
          }
          function _encodeBlob(blob) {
            return new Promise$1(function(resolve, reject) {
              var reader = new FileReader();
              reader.onerror = reject;
              reader.onloadend = function(e) {
                var base64 = btoa(e.target.result || "");
                resolve({
                  __local_forage_encoded_blob: true,
                  data: base64,
                  type: blob.type
                });
              };
              reader.readAsBinaryString(blob);
            });
          }
          function _decodeBlob(encodedBlob) {
            var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
            return createBlob([arrayBuff], { type: encodedBlob.type });
          }
          function _isEncodedBlob(value) {
            return value && value.__local_forage_encoded_blob;
          }
          function _fullyReady(callback) {
            var self2 = this;
            var promise = self2._initReady().then(function() {
              var dbContext = dbContexts[self2._dbInfo.name];
              if (dbContext && dbContext.dbReady) {
                return dbContext.dbReady;
              }
            });
            executeTwoCallbacks(promise, callback, callback);
            return promise;
          }
          function _tryReconnect(dbInfo) {
            _deferReadiness(dbInfo);
            var dbContext = dbContexts[dbInfo.name];
            var forages = dbContext.forages;
            for (var i = 0; i < forages.length; i++) {
              var forage = forages[i];
              if (forage._dbInfo.db) {
                forage._dbInfo.db.close();
                forage._dbInfo.db = null;
              }
            }
            dbInfo.db = null;
            return _getOriginalConnection(dbInfo).then(function(db) {
              dbInfo.db = db;
              if (_isUpgradeNeeded(dbInfo)) {
                return _getUpgradedConnection(dbInfo);
              }
              return db;
            }).then(function(db) {
              dbInfo.db = dbContext.db = db;
              for (var i2 = 0; i2 < forages.length; i2++) {
                forages[i2]._dbInfo.db = db;
              }
            })["catch"](function(err) {
              _rejectReadiness(dbInfo, err);
              throw err;
            });
          }
          function createTransaction(dbInfo, mode, callback, retries) {
            if (retries === void 0) {
              retries = 1;
            }
            try {
              var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
              callback(null, tx);
            } catch (err) {
              if (retries > 0 && (!dbInfo.db || err.name === "InvalidStateError" || err.name === "NotFoundError")) {
                return Promise$1.resolve().then(function() {
                  if (!dbInfo.db || err.name === "NotFoundError" && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                    if (dbInfo.db) {
                      dbInfo.version = dbInfo.db.version + 1;
                    }
                    return _getUpgradedConnection(dbInfo);
                  }
                }).then(function() {
                  return _tryReconnect(dbInfo).then(function() {
                    createTransaction(dbInfo, mode, callback, retries - 1);
                  });
                })["catch"](callback);
              }
              callback(err);
            }
          }
          function createDbContext() {
            return {
              // Running localForages sharing a database.
              forages: [],
              // Shared database.
              db: null,
              // Database readiness (promise).
              dbReady: null,
              // Deferred operations on the database.
              deferredOperations: []
            };
          }
          function _initStorage(options) {
            var self2 = this;
            var dbInfo = {
              db: null
            };
            if (options) {
              for (var i in options) {
                dbInfo[i] = options[i];
              }
            }
            var dbContext = dbContexts[dbInfo.name];
            if (!dbContext) {
              dbContext = createDbContext();
              dbContexts[dbInfo.name] = dbContext;
            }
            dbContext.forages.push(self2);
            if (!self2._initReady) {
              self2._initReady = self2.ready;
              self2.ready = _fullyReady;
            }
            var initPromises = [];
            function ignoreErrors() {
              return Promise$1.resolve();
            }
            for (var j = 0; j < dbContext.forages.length; j++) {
              var forage = dbContext.forages[j];
              if (forage !== self2) {
                initPromises.push(forage._initReady()["catch"](ignoreErrors));
              }
            }
            var forages = dbContext.forages.slice(0);
            return Promise$1.all(initPromises).then(function() {
              dbInfo.db = dbContext.db;
              return _getOriginalConnection(dbInfo);
            }).then(function(db) {
              dbInfo.db = db;
              if (_isUpgradeNeeded(dbInfo, self2._defaultConfig.version)) {
                return _getUpgradedConnection(dbInfo);
              }
              return db;
            }).then(function(db) {
              dbInfo.db = dbContext.db = db;
              self2._dbInfo = dbInfo;
              for (var k = 0; k < forages.length; k++) {
                var forage2 = forages[k];
                if (forage2 !== self2) {
                  forage2._dbInfo.db = dbInfo.db;
                  forage2._dbInfo.version = dbInfo.version;
                }
              }
            });
          }
          function getItem(key2, callback) {
            var self2 = this;
            key2 = normalizeKey(key2);
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self2._dbInfo.storeName);
                    var req = store.get(key2);
                    req.onsuccess = function() {
                      var value = req.result;
                      if (value === void 0) {
                        value = null;
                      }
                      if (_isEncodedBlob(value)) {
                        value = _decodeBlob(value);
                      }
                      resolve(value);
                    };
                    req.onerror = function() {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function iterate(iterator, callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self2._dbInfo.storeName);
                    var req = store.openCursor();
                    var iterationNumber = 1;
                    req.onsuccess = function() {
                      var cursor = req.result;
                      if (cursor) {
                        var value = cursor.value;
                        if (_isEncodedBlob(value)) {
                          value = _decodeBlob(value);
                        }
                        var result = iterator(value, cursor.key, iterationNumber++);
                        if (result !== void 0) {
                          resolve(result);
                        } else {
                          cursor["continue"]();
                        }
                      } else {
                        resolve();
                      }
                    };
                    req.onerror = function() {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function setItem(key2, value, callback) {
            var self2 = this;
            key2 = normalizeKey(key2);
            var promise = new Promise$1(function(resolve, reject) {
              var dbInfo;
              self2.ready().then(function() {
                dbInfo = self2._dbInfo;
                if (toString.call(value) === "[object Blob]") {
                  return _checkBlobSupport(dbInfo.db).then(function(blobSupport) {
                    if (blobSupport) {
                      return value;
                    }
                    return _encodeBlob(value);
                  });
                }
                return value;
              }).then(function(value2) {
                createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self2._dbInfo.storeName);
                    if (value2 === null) {
                      value2 = void 0;
                    }
                    var req = store.put(value2, key2);
                    transaction.oncomplete = function() {
                      if (value2 === void 0) {
                        value2 = null;
                      }
                      resolve(value2);
                    };
                    transaction.onabort = transaction.onerror = function() {
                      var err2 = req.error ? req.error : req.transaction.error;
                      reject(err2);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function removeItem(key2, callback) {
            var self2 = this;
            key2 = normalizeKey(key2);
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self2._dbInfo.storeName);
                    var req = store["delete"](key2);
                    transaction.oncomplete = function() {
                      resolve();
                    };
                    transaction.onerror = function() {
                      reject(req.error);
                    };
                    transaction.onabort = function() {
                      var err2 = req.error ? req.error : req.transaction.error;
                      reject(err2);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function clear(callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self2._dbInfo.storeName);
                    var req = store.clear();
                    transaction.oncomplete = function() {
                      resolve();
                    };
                    transaction.onabort = transaction.onerror = function() {
                      var err2 = req.error ? req.error : req.transaction.error;
                      reject(err2);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function length(callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self2._dbInfo.storeName);
                    var req = store.count();
                    req.onsuccess = function() {
                      resolve(req.result);
                    };
                    req.onerror = function() {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function key(n, callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              if (n < 0) {
                resolve(null);
                return;
              }
              self2.ready().then(function() {
                createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self2._dbInfo.storeName);
                    var advanced = false;
                    var req = store.openKeyCursor();
                    req.onsuccess = function() {
                      var cursor = req.result;
                      if (!cursor) {
                        resolve(null);
                        return;
                      }
                      if (n === 0) {
                        resolve(cursor.key);
                      } else {
                        if (!advanced) {
                          advanced = true;
                          cursor.advance(n);
                        } else {
                          resolve(cursor.key);
                        }
                      }
                    };
                    req.onerror = function() {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function keys(callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self2._dbInfo.storeName);
                    var req = store.openKeyCursor();
                    var keys2 = [];
                    req.onsuccess = function() {
                      var cursor = req.result;
                      if (!cursor) {
                        resolve(keys2);
                        return;
                      }
                      keys2.push(cursor.key);
                      cursor["continue"]();
                    };
                    req.onerror = function() {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function dropInstance(options, callback) {
            callback = getCallback.apply(this, arguments);
            var currentConfig = this.config();
            options = typeof options !== "function" && options || {};
            if (!options.name) {
              options.name = options.name || currentConfig.name;
              options.storeName = options.storeName || currentConfig.storeName;
            }
            var self2 = this;
            var promise;
            if (!options.name) {
              promise = Promise$1.reject("Invalid arguments");
            } else {
              var isCurrentDb = options.name === currentConfig.name && self2._dbInfo.db;
              var dbPromise = isCurrentDb ? Promise$1.resolve(self2._dbInfo.db) : _getOriginalConnection(options).then(function(db) {
                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;
                dbContext.db = db;
                for (var i = 0; i < forages.length; i++) {
                  forages[i]._dbInfo.db = db;
                }
                return db;
              });
              if (!options.storeName) {
                promise = dbPromise.then(function(db) {
                  _deferReadiness(options);
                  var dbContext = dbContexts[options.name];
                  var forages = dbContext.forages;
                  db.close();
                  for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                  }
                  var dropDBPromise = new Promise$1(function(resolve, reject) {
                    var req = idb.deleteDatabase(options.name);
                    req.onerror = function() {
                      var db2 = req.result;
                      if (db2) {
                        db2.close();
                      }
                      reject(req.error);
                    };
                    req.onblocked = function() {
                      console.warn('dropInstance blocked for database "' + options.name + '" until all open connections are closed');
                    };
                    req.onsuccess = function() {
                      var db2 = req.result;
                      if (db2) {
                        db2.close();
                      }
                      resolve(db2);
                    };
                  });
                  return dropDBPromise.then(function(db2) {
                    dbContext.db = db2;
                    for (var i2 = 0; i2 < forages.length; i2++) {
                      var _forage = forages[i2];
                      _advanceReadiness(_forage._dbInfo);
                    }
                  })["catch"](function(err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function() {
                    });
                    throw err;
                  });
                });
              } else {
                promise = dbPromise.then(function(db) {
                  if (!db.objectStoreNames.contains(options.storeName)) {
                    return;
                  }
                  var newVersion = db.version + 1;
                  _deferReadiness(options);
                  var dbContext = dbContexts[options.name];
                  var forages = dbContext.forages;
                  db.close();
                  for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                    forage._dbInfo.version = newVersion;
                  }
                  var dropObjectPromise = new Promise$1(function(resolve, reject) {
                    var req = idb.open(options.name, newVersion);
                    req.onerror = function(err) {
                      var db2 = req.result;
                      db2.close();
                      reject(err);
                    };
                    req.onupgradeneeded = function() {
                      var db2 = req.result;
                      db2.deleteObjectStore(options.storeName);
                    };
                    req.onsuccess = function() {
                      var db2 = req.result;
                      db2.close();
                      resolve(db2);
                    };
                  });
                  return dropObjectPromise.then(function(db2) {
                    dbContext.db = db2;
                    for (var j = 0; j < forages.length; j++) {
                      var _forage2 = forages[j];
                      _forage2._dbInfo.db = db2;
                      _advanceReadiness(_forage2._dbInfo);
                    }
                  })["catch"](function(err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function() {
                    });
                    throw err;
                  });
                });
              }
            }
            executeCallback(promise, callback);
            return promise;
          }
          var asyncStorage = {
            _driver: "asyncStorage",
            _initStorage,
            _support: isIndexedDBValid(),
            iterate,
            getItem,
            setItem,
            removeItem,
            clear,
            length,
            key,
            keys,
            dropInstance
          };
          function isWebSQLValid() {
            return typeof openDatabase === "function";
          }
          var BASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
          var BLOB_TYPE_PREFIX = "~~local_forage_type~";
          var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;
          var SERIALIZED_MARKER = "__lfsc__:";
          var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;
          var TYPE_ARRAYBUFFER = "arbf";
          var TYPE_BLOB = "blob";
          var TYPE_INT8ARRAY = "si08";
          var TYPE_UINT8ARRAY = "ui08";
          var TYPE_UINT8CLAMPEDARRAY = "uic8";
          var TYPE_INT16ARRAY = "si16";
          var TYPE_INT32ARRAY = "si32";
          var TYPE_UINT16ARRAY = "ur16";
          var TYPE_UINT32ARRAY = "ui32";
          var TYPE_FLOAT32ARRAY = "fl32";
          var TYPE_FLOAT64ARRAY = "fl64";
          var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;
          var toString$1 = Object.prototype.toString;
          function stringToBuffer(serializedString) {
            var bufferLength = serializedString.length * 0.75;
            var len = serializedString.length;
            var i;
            var p = 0;
            var encoded1, encoded2, encoded3, encoded4;
            if (serializedString[serializedString.length - 1] === "=") {
              bufferLength--;
              if (serializedString[serializedString.length - 2] === "=") {
                bufferLength--;
              }
            }
            var buffer = new ArrayBuffer(bufferLength);
            var bytes = new Uint8Array(buffer);
            for (i = 0; i < len; i += 4) {
              encoded1 = BASE_CHARS.indexOf(serializedString[i]);
              encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
              encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
              encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);
              bytes[p++] = encoded1 << 2 | encoded2 >> 4;
              bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
              bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
            }
            return buffer;
          }
          function bufferToString(buffer) {
            var bytes = new Uint8Array(buffer);
            var base64String = "";
            var i;
            for (i = 0; i < bytes.length; i += 3) {
              base64String += BASE_CHARS[bytes[i] >> 2];
              base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
              base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
              base64String += BASE_CHARS[bytes[i + 2] & 63];
            }
            if (bytes.length % 3 === 2) {
              base64String = base64String.substring(0, base64String.length - 1) + "=";
            } else if (bytes.length % 3 === 1) {
              base64String = base64String.substring(0, base64String.length - 2) + "==";
            }
            return base64String;
          }
          function serialize(value, callback) {
            var valueType = "";
            if (value) {
              valueType = toString$1.call(value);
            }
            if (value && (valueType === "[object ArrayBuffer]" || value.buffer && toString$1.call(value.buffer) === "[object ArrayBuffer]")) {
              var buffer;
              var marker = SERIALIZED_MARKER;
              if (value instanceof ArrayBuffer) {
                buffer = value;
                marker += TYPE_ARRAYBUFFER;
              } else {
                buffer = value.buffer;
                if (valueType === "[object Int8Array]") {
                  marker += TYPE_INT8ARRAY;
                } else if (valueType === "[object Uint8Array]") {
                  marker += TYPE_UINT8ARRAY;
                } else if (valueType === "[object Uint8ClampedArray]") {
                  marker += TYPE_UINT8CLAMPEDARRAY;
                } else if (valueType === "[object Int16Array]") {
                  marker += TYPE_INT16ARRAY;
                } else if (valueType === "[object Uint16Array]") {
                  marker += TYPE_UINT16ARRAY;
                } else if (valueType === "[object Int32Array]") {
                  marker += TYPE_INT32ARRAY;
                } else if (valueType === "[object Uint32Array]") {
                  marker += TYPE_UINT32ARRAY;
                } else if (valueType === "[object Float32Array]") {
                  marker += TYPE_FLOAT32ARRAY;
                } else if (valueType === "[object Float64Array]") {
                  marker += TYPE_FLOAT64ARRAY;
                } else {
                  callback(new Error("Failed to get type for BinaryArray"));
                }
              }
              callback(marker + bufferToString(buffer));
            } else if (valueType === "[object Blob]") {
              var fileReader = new FileReader();
              fileReader.onload = function() {
                var str = BLOB_TYPE_PREFIX + value.type + "~" + bufferToString(this.result);
                callback(SERIALIZED_MARKER + TYPE_BLOB + str);
              };
              fileReader.readAsArrayBuffer(value);
            } else {
              try {
                callback(JSON.stringify(value));
              } catch (e) {
                console.error("Couldn't convert value into a JSON string: ", value);
                callback(null, e);
              }
            }
          }
          function deserialize(value) {
            if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
              return JSON.parse(value);
            }
            var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
            var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);
            var blobType;
            if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
              var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
              blobType = matcher[1];
              serializedString = serializedString.substring(matcher[0].length);
            }
            var buffer = stringToBuffer(serializedString);
            switch (type) {
              case TYPE_ARRAYBUFFER:
                return buffer;
              case TYPE_BLOB:
                return createBlob([buffer], { type: blobType });
              case TYPE_INT8ARRAY:
                return new Int8Array(buffer);
              case TYPE_UINT8ARRAY:
                return new Uint8Array(buffer);
              case TYPE_UINT8CLAMPEDARRAY:
                return new Uint8ClampedArray(buffer);
              case TYPE_INT16ARRAY:
                return new Int16Array(buffer);
              case TYPE_UINT16ARRAY:
                return new Uint16Array(buffer);
              case TYPE_INT32ARRAY:
                return new Int32Array(buffer);
              case TYPE_UINT32ARRAY:
                return new Uint32Array(buffer);
              case TYPE_FLOAT32ARRAY:
                return new Float32Array(buffer);
              case TYPE_FLOAT64ARRAY:
                return new Float64Array(buffer);
              default:
                throw new Error("Unkown type: " + type);
            }
          }
          var localforageSerializer = {
            serialize,
            deserialize,
            stringToBuffer,
            bufferToString
          };
          function createDbTable(t, dbInfo, callback, errorCallback) {
            t.executeSql("CREATE TABLE IF NOT EXISTS " + dbInfo.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], callback, errorCallback);
          }
          function _initStorage$1(options) {
            var self2 = this;
            var dbInfo = {
              db: null
            };
            if (options) {
              for (var i in options) {
                dbInfo[i] = typeof options[i] !== "string" ? options[i].toString() : options[i];
              }
            }
            var dbInfoPromise = new Promise$1(function(resolve, reject) {
              try {
                dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
              } catch (e) {
                return reject(e);
              }
              dbInfo.db.transaction(function(t) {
                createDbTable(t, dbInfo, function() {
                  self2._dbInfo = dbInfo;
                  resolve();
                }, function(t2, error) {
                  reject(error);
                });
              }, reject);
            });
            dbInfo.serializer = localforageSerializer;
            return dbInfoPromise;
          }
          function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
            t.executeSql(sqlStatement, args, callback, function(t2, error) {
              if (error.code === error.SYNTAX_ERR) {
                t2.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [dbInfo.storeName], function(t3, results) {
                  if (!results.rows.length) {
                    createDbTable(t3, dbInfo, function() {
                      t3.executeSql(sqlStatement, args, callback, errorCallback);
                    }, errorCallback);
                  } else {
                    errorCallback(t3, error);
                  }
                }, errorCallback);
              } else {
                errorCallback(t2, error);
              }
            }, errorCallback);
          }
          function getItem$1(key2, callback) {
            var self2 = this;
            key2 = normalizeKey(key2);
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                var dbInfo = self2._dbInfo;
                dbInfo.db.transaction(function(t) {
                  tryExecuteSql(t, dbInfo, "SELECT * FROM " + dbInfo.storeName + " WHERE key = ? LIMIT 1", [key2], function(t2, results) {
                    var result = results.rows.length ? results.rows.item(0).value : null;
                    if (result) {
                      result = dbInfo.serializer.deserialize(result);
                    }
                    resolve(result);
                  }, function(t2, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function iterate$1(iterator, callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                var dbInfo = self2._dbInfo;
                dbInfo.db.transaction(function(t) {
                  tryExecuteSql(t, dbInfo, "SELECT * FROM " + dbInfo.storeName, [], function(t2, results) {
                    var rows = results.rows;
                    var length2 = rows.length;
                    for (var i = 0; i < length2; i++) {
                      var item = rows.item(i);
                      var result = item.value;
                      if (result) {
                        result = dbInfo.serializer.deserialize(result);
                      }
                      result = iterator(result, item.key, i + 1);
                      if (result !== void 0) {
                        resolve(result);
                        return;
                      }
                    }
                    resolve();
                  }, function(t2, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function _setItem(key2, value, callback, retriesLeft) {
            var self2 = this;
            key2 = normalizeKey(key2);
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                if (value === void 0) {
                  value = null;
                }
                var originalValue = value;
                var dbInfo = self2._dbInfo;
                dbInfo.serializer.serialize(value, function(value2, error) {
                  if (error) {
                    reject(error);
                  } else {
                    dbInfo.db.transaction(function(t) {
                      tryExecuteSql(t, dbInfo, "INSERT OR REPLACE INTO " + dbInfo.storeName + " (key, value) VALUES (?, ?)", [key2, value2], function() {
                        resolve(originalValue);
                      }, function(t2, error2) {
                        reject(error2);
                      });
                    }, function(sqlError) {
                      if (sqlError.code === sqlError.QUOTA_ERR) {
                        if (retriesLeft > 0) {
                          resolve(_setItem.apply(self2, [key2, originalValue, callback, retriesLeft - 1]));
                          return;
                        }
                        reject(sqlError);
                      }
                    });
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function setItem$1(key2, value, callback) {
            return _setItem.apply(this, [key2, value, callback, 1]);
          }
          function removeItem$1(key2, callback) {
            var self2 = this;
            key2 = normalizeKey(key2);
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                var dbInfo = self2._dbInfo;
                dbInfo.db.transaction(function(t) {
                  tryExecuteSql(t, dbInfo, "DELETE FROM " + dbInfo.storeName + " WHERE key = ?", [key2], function() {
                    resolve();
                  }, function(t2, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function clear$1(callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                var dbInfo = self2._dbInfo;
                dbInfo.db.transaction(function(t) {
                  tryExecuteSql(t, dbInfo, "DELETE FROM " + dbInfo.storeName, [], function() {
                    resolve();
                  }, function(t2, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function length$1(callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                var dbInfo = self2._dbInfo;
                dbInfo.db.transaction(function(t) {
                  tryExecuteSql(t, dbInfo, "SELECT COUNT(key) as c FROM " + dbInfo.storeName, [], function(t2, results) {
                    var result = results.rows.item(0).c;
                    resolve(result);
                  }, function(t2, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function key$1(n, callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                var dbInfo = self2._dbInfo;
                dbInfo.db.transaction(function(t) {
                  tryExecuteSql(t, dbInfo, "SELECT key FROM " + dbInfo.storeName + " WHERE id = ? LIMIT 1", [n + 1], function(t2, results) {
                    var result = results.rows.length ? results.rows.item(0).key : null;
                    resolve(result);
                  }, function(t2, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function keys$1(callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                var dbInfo = self2._dbInfo;
                dbInfo.db.transaction(function(t) {
                  tryExecuteSql(t, dbInfo, "SELECT key FROM " + dbInfo.storeName, [], function(t2, results) {
                    var keys2 = [];
                    for (var i = 0; i < results.rows.length; i++) {
                      keys2.push(results.rows.item(i).key);
                    }
                    resolve(keys2);
                  }, function(t2, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function getAllStoreNames(db) {
            return new Promise$1(function(resolve, reject) {
              db.transaction(function(t) {
                t.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function(t2, results) {
                  var storeNames = [];
                  for (var i = 0; i < results.rows.length; i++) {
                    storeNames.push(results.rows.item(i).name);
                  }
                  resolve({
                    db,
                    storeNames
                  });
                }, function(t2, error) {
                  reject(error);
                });
              }, function(sqlError) {
                reject(sqlError);
              });
            });
          }
          function dropInstance$1(options, callback) {
            callback = getCallback.apply(this, arguments);
            var currentConfig = this.config();
            options = typeof options !== "function" && options || {};
            if (!options.name) {
              options.name = options.name || currentConfig.name;
              options.storeName = options.storeName || currentConfig.storeName;
            }
            var self2 = this;
            var promise;
            if (!options.name) {
              promise = Promise$1.reject("Invalid arguments");
            } else {
              promise = new Promise$1(function(resolve) {
                var db;
                if (options.name === currentConfig.name) {
                  db = self2._dbInfo.db;
                } else {
                  db = openDatabase(options.name, "", "", 0);
                }
                if (!options.storeName) {
                  resolve(getAllStoreNames(db));
                } else {
                  resolve({
                    db,
                    storeNames: [options.storeName]
                  });
                }
              }).then(function(operationInfo) {
                return new Promise$1(function(resolve, reject) {
                  operationInfo.db.transaction(function(t) {
                    function dropTable(storeName) {
                      return new Promise$1(function(resolve2, reject2) {
                        t.executeSql("DROP TABLE IF EXISTS " + storeName, [], function() {
                          resolve2();
                        }, function(t2, error) {
                          reject2(error);
                        });
                      });
                    }
                    var operations = [];
                    for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {
                      operations.push(dropTable(operationInfo.storeNames[i]));
                    }
                    Promise$1.all(operations).then(function() {
                      resolve();
                    })["catch"](function(e) {
                      reject(e);
                    });
                  }, function(sqlError) {
                    reject(sqlError);
                  });
                });
              });
            }
            executeCallback(promise, callback);
            return promise;
          }
          var webSQLStorage = {
            _driver: "webSQLStorage",
            _initStorage: _initStorage$1,
            _support: isWebSQLValid(),
            iterate: iterate$1,
            getItem: getItem$1,
            setItem: setItem$1,
            removeItem: removeItem$1,
            clear: clear$1,
            length: length$1,
            key: key$1,
            keys: keys$1,
            dropInstance: dropInstance$1
          };
          function isLocalStorageValid() {
            try {
              return typeof localStorage !== "undefined" && "setItem" in localStorage && // in IE8 typeof localStorage.setItem === 'object'
              !!localStorage.setItem;
            } catch (e) {
              return false;
            }
          }
          function _getKeyPrefix(options, defaultConfig) {
            var keyPrefix = options.name + "/";
            if (options.storeName !== defaultConfig.storeName) {
              keyPrefix += options.storeName + "/";
            }
            return keyPrefix;
          }
          function checkIfLocalStorageThrows() {
            var localStorageTestKey = "_localforage_support_test";
            try {
              localStorage.setItem(localStorageTestKey, true);
              localStorage.removeItem(localStorageTestKey);
              return false;
            } catch (e) {
              return true;
            }
          }
          function _isLocalStorageUsable() {
            return !checkIfLocalStorageThrows() || localStorage.length > 0;
          }
          function _initStorage$2(options) {
            var self2 = this;
            var dbInfo = {};
            if (options) {
              for (var i in options) {
                dbInfo[i] = options[i];
              }
            }
            dbInfo.keyPrefix = _getKeyPrefix(options, self2._defaultConfig);
            if (!_isLocalStorageUsable()) {
              return Promise$1.reject();
            }
            self2._dbInfo = dbInfo;
            dbInfo.serializer = localforageSerializer;
            return Promise$1.resolve();
          }
          function clear$2(callback) {
            var self2 = this;
            var promise = self2.ready().then(function() {
              var keyPrefix = self2._dbInfo.keyPrefix;
              for (var i = localStorage.length - 1; i >= 0; i--) {
                var key2 = localStorage.key(i);
                if (key2.indexOf(keyPrefix) === 0) {
                  localStorage.removeItem(key2);
                }
              }
            });
            executeCallback(promise, callback);
            return promise;
          }
          function getItem$2(key2, callback) {
            var self2 = this;
            key2 = normalizeKey(key2);
            var promise = self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              var result = localStorage.getItem(dbInfo.keyPrefix + key2);
              if (result) {
                result = dbInfo.serializer.deserialize(result);
              }
              return result;
            });
            executeCallback(promise, callback);
            return promise;
          }
          function iterate$2(iterator, callback) {
            var self2 = this;
            var promise = self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              var keyPrefix = dbInfo.keyPrefix;
              var keyPrefixLength = keyPrefix.length;
              var length2 = localStorage.length;
              var iterationNumber = 1;
              for (var i = 0; i < length2; i++) {
                var key2 = localStorage.key(i);
                if (key2.indexOf(keyPrefix) !== 0) {
                  continue;
                }
                var value = localStorage.getItem(key2);
                if (value) {
                  value = dbInfo.serializer.deserialize(value);
                }
                value = iterator(value, key2.substring(keyPrefixLength), iterationNumber++);
                if (value !== void 0) {
                  return value;
                }
              }
            });
            executeCallback(promise, callback);
            return promise;
          }
          function key$2(n, callback) {
            var self2 = this;
            var promise = self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              var result;
              try {
                result = localStorage.key(n);
              } catch (error) {
                result = null;
              }
              if (result) {
                result = result.substring(dbInfo.keyPrefix.length);
              }
              return result;
            });
            executeCallback(promise, callback);
            return promise;
          }
          function keys$2(callback) {
            var self2 = this;
            var promise = self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              var length2 = localStorage.length;
              var keys2 = [];
              for (var i = 0; i < length2; i++) {
                var itemKey = localStorage.key(i);
                if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
                  keys2.push(itemKey.substring(dbInfo.keyPrefix.length));
                }
              }
              return keys2;
            });
            executeCallback(promise, callback);
            return promise;
          }
          function length$2(callback) {
            var self2 = this;
            var promise = self2.keys().then(function(keys2) {
              return keys2.length;
            });
            executeCallback(promise, callback);
            return promise;
          }
          function removeItem$2(key2, callback) {
            var self2 = this;
            key2 = normalizeKey(key2);
            var promise = self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              localStorage.removeItem(dbInfo.keyPrefix + key2);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function setItem$2(key2, value, callback) {
            var self2 = this;
            key2 = normalizeKey(key2);
            var promise = self2.ready().then(function() {
              if (value === void 0) {
                value = null;
              }
              var originalValue = value;
              return new Promise$1(function(resolve, reject) {
                var dbInfo = self2._dbInfo;
                dbInfo.serializer.serialize(value, function(value2, error) {
                  if (error) {
                    reject(error);
                  } else {
                    try {
                      localStorage.setItem(dbInfo.keyPrefix + key2, value2);
                      resolve(originalValue);
                    } catch (e) {
                      if (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED") {
                        reject(e);
                      }
                      reject(e);
                    }
                  }
                });
              });
            });
            executeCallback(promise, callback);
            return promise;
          }
          function dropInstance$2(options, callback) {
            callback = getCallback.apply(this, arguments);
            options = typeof options !== "function" && options || {};
            if (!options.name) {
              var currentConfig = this.config();
              options.name = options.name || currentConfig.name;
              options.storeName = options.storeName || currentConfig.storeName;
            }
            var self2 = this;
            var promise;
            if (!options.name) {
              promise = Promise$1.reject("Invalid arguments");
            } else {
              promise = new Promise$1(function(resolve) {
                if (!options.storeName) {
                  resolve(options.name + "/");
                } else {
                  resolve(_getKeyPrefix(options, self2._defaultConfig));
                }
              }).then(function(keyPrefix) {
                for (var i = localStorage.length - 1; i >= 0; i--) {
                  var key2 = localStorage.key(i);
                  if (key2.indexOf(keyPrefix) === 0) {
                    localStorage.removeItem(key2);
                  }
                }
              });
            }
            executeCallback(promise, callback);
            return promise;
          }
          var localStorageWrapper = {
            _driver: "localStorageWrapper",
            _initStorage: _initStorage$2,
            _support: isLocalStorageValid(),
            iterate: iterate$2,
            getItem: getItem$2,
            setItem: setItem$2,
            removeItem: removeItem$2,
            clear: clear$2,
            length: length$2,
            key: key$2,
            keys: keys$2,
            dropInstance: dropInstance$2
          };
          var sameValue = function sameValue2(x, y) {
            return x === y || typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y);
          };
          var includes = function includes2(array, searchElement) {
            var len = array.length;
            var i = 0;
            while (i < len) {
              if (sameValue(array[i], searchElement)) {
                return true;
              }
              i++;
            }
            return false;
          };
          var isArray = Array.isArray || function(arg) {
            return Object.prototype.toString.call(arg) === "[object Array]";
          };
          var DefinedDrivers = {};
          var DriverSupport = {};
          var DefaultDrivers = {
            INDEXEDDB: asyncStorage,
            WEBSQL: webSQLStorage,
            LOCALSTORAGE: localStorageWrapper
          };
          var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];
          var OptionalDriverMethods = ["dropInstance"];
          var LibraryMethods = ["clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem"].concat(OptionalDriverMethods);
          var DefaultConfig = {
            description: "",
            driver: DefaultDriverOrder.slice(),
            name: "localforage",
            // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
            // we can use without a prompt.
            size: 4980736,
            storeName: "keyvaluepairs",
            version: 1
          };
          function callWhenReady(localForageInstance, libraryMethod) {
            localForageInstance[libraryMethod] = function() {
              var _args = arguments;
              return localForageInstance.ready().then(function() {
                return localForageInstance[libraryMethod].apply(localForageInstance, _args);
              });
            };
          }
          function extend() {
            for (var i = 1; i < arguments.length; i++) {
              var arg = arguments[i];
              if (arg) {
                for (var _key in arg) {
                  if (arg.hasOwnProperty(_key)) {
                    if (isArray(arg[_key])) {
                      arguments[0][_key] = arg[_key].slice();
                    } else {
                      arguments[0][_key] = arg[_key];
                    }
                  }
                }
              }
            }
            return arguments[0];
          }
          var LocalForage = function() {
            function LocalForage2(options) {
              _classCallCheck(this, LocalForage2);
              for (var driverTypeKey in DefaultDrivers) {
                if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                  var driver = DefaultDrivers[driverTypeKey];
                  var driverName = driver._driver;
                  this[driverTypeKey] = driverName;
                  if (!DefinedDrivers[driverName]) {
                    this.defineDriver(driver);
                  }
                }
              }
              this._defaultConfig = extend({}, DefaultConfig);
              this._config = extend({}, this._defaultConfig, options);
              this._driverSet = null;
              this._initDriver = null;
              this._ready = false;
              this._dbInfo = null;
              this._wrapLibraryMethodsWithReady();
              this.setDriver(this._config.driver)["catch"](function() {
              });
            }
            LocalForage2.prototype.config = function config(options) {
              if ((typeof options === "undefined" ? "undefined" : _typeof(options)) === "object") {
                if (this._ready) {
                  return new Error("Can't call config() after localforage has been used.");
                }
                for (var i in options) {
                  if (i === "storeName") {
                    options[i] = options[i].replace(/\W/g, "_");
                  }
                  if (i === "version" && typeof options[i] !== "number") {
                    return new Error("Database version must be a number.");
                  }
                  this._config[i] = options[i];
                }
                if ("driver" in options && options.driver) {
                  return this.setDriver(this._config.driver);
                }
                return true;
              } else if (typeof options === "string") {
                return this._config[options];
              } else {
                return this._config;
              }
            };
            LocalForage2.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
              var promise = new Promise$1(function(resolve, reject) {
                try {
                  var driverName = driverObject._driver;
                  var complianceError = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
                  if (!driverObject._driver) {
                    reject(complianceError);
                    return;
                  }
                  var driverMethods = LibraryMethods.concat("_initStorage");
                  for (var i = 0, len = driverMethods.length; i < len; i++) {
                    var driverMethodName = driverMethods[i];
                    var isRequired = !includes(OptionalDriverMethods, driverMethodName);
                    if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== "function") {
                      reject(complianceError);
                      return;
                    }
                  }
                  var configureMissingMethods = function configureMissingMethods2() {
                    var methodNotImplementedFactory = function methodNotImplementedFactory2(methodName) {
                      return function() {
                        var error = new Error("Method " + methodName + " is not implemented by the current driver");
                        var promise2 = Promise$1.reject(error);
                        executeCallback(promise2, arguments[arguments.length - 1]);
                        return promise2;
                      };
                    };
                    for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                      var optionalDriverMethod = OptionalDriverMethods[_i];
                      if (!driverObject[optionalDriverMethod]) {
                        driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                      }
                    }
                  };
                  configureMissingMethods();
                  var setDriverSupport = function setDriverSupport2(support) {
                    if (DefinedDrivers[driverName]) {
                      console.info("Redefining LocalForage driver: " + driverName);
                    }
                    DefinedDrivers[driverName] = driverObject;
                    DriverSupport[driverName] = support;
                    resolve();
                  };
                  if ("_support" in driverObject) {
                    if (driverObject._support && typeof driverObject._support === "function") {
                      driverObject._support().then(setDriverSupport, reject);
                    } else {
                      setDriverSupport(!!driverObject._support);
                    }
                  } else {
                    setDriverSupport(true);
                  }
                } catch (e) {
                  reject(e);
                }
              });
              executeTwoCallbacks(promise, callback, errorCallback);
              return promise;
            };
            LocalForage2.prototype.driver = function driver() {
              return this._driver || null;
            };
            LocalForage2.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
              var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error("Driver not found."));
              executeTwoCallbacks(getDriverPromise, callback, errorCallback);
              return getDriverPromise;
            };
            LocalForage2.prototype.getSerializer = function getSerializer(callback) {
              var serializerPromise = Promise$1.resolve(localforageSerializer);
              executeTwoCallbacks(serializerPromise, callback);
              return serializerPromise;
            };
            LocalForage2.prototype.ready = function ready(callback) {
              var self2 = this;
              var promise = self2._driverSet.then(function() {
                if (self2._ready === null) {
                  self2._ready = self2._initDriver();
                }
                return self2._ready;
              });
              executeTwoCallbacks(promise, callback, callback);
              return promise;
            };
            LocalForage2.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
              var self2 = this;
              if (!isArray(drivers)) {
                drivers = [drivers];
              }
              var supportedDrivers = this._getSupportedDrivers(drivers);
              function setDriverToConfig() {
                self2._config.driver = self2.driver();
              }
              function extendSelfWithDriver(driver) {
                self2._extend(driver);
                setDriverToConfig();
                self2._ready = self2._initStorage(self2._config);
                return self2._ready;
              }
              function initDriver(supportedDrivers2) {
                return function() {
                  var currentDriverIndex = 0;
                  function driverPromiseLoop() {
                    while (currentDriverIndex < supportedDrivers2.length) {
                      var driverName = supportedDrivers2[currentDriverIndex];
                      currentDriverIndex++;
                      self2._dbInfo = null;
                      self2._ready = null;
                      return self2.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                    }
                    setDriverToConfig();
                    var error = new Error("No available storage method found.");
                    self2._driverSet = Promise$1.reject(error);
                    return self2._driverSet;
                  }
                  return driverPromiseLoop();
                };
              }
              var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function() {
                return Promise$1.resolve();
              }) : Promise$1.resolve();
              this._driverSet = oldDriverSetDone.then(function() {
                var driverName = supportedDrivers[0];
                self2._dbInfo = null;
                self2._ready = null;
                return self2.getDriver(driverName).then(function(driver) {
                  self2._driver = driver._driver;
                  setDriverToConfig();
                  self2._wrapLibraryMethodsWithReady();
                  self2._initDriver = initDriver(supportedDrivers);
                });
              })["catch"](function() {
                setDriverToConfig();
                var error = new Error("No available storage method found.");
                self2._driverSet = Promise$1.reject(error);
                return self2._driverSet;
              });
              executeTwoCallbacks(this._driverSet, callback, errorCallback);
              return this._driverSet;
            };
            LocalForage2.prototype.supports = function supports(driverName) {
              return !!DriverSupport[driverName];
            };
            LocalForage2.prototype._extend = function _extend(libraryMethodsAndProperties) {
              extend(this, libraryMethodsAndProperties);
            };
            LocalForage2.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
              var supportedDrivers = [];
              for (var i = 0, len = drivers.length; i < len; i++) {
                var driverName = drivers[i];
                if (this.supports(driverName)) {
                  supportedDrivers.push(driverName);
                }
              }
              return supportedDrivers;
            };
            LocalForage2.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
              for (var i = 0, len = LibraryMethods.length; i < len; i++) {
                callWhenReady(this, LibraryMethods[i]);
              }
            };
            LocalForage2.prototype.createInstance = function createInstance(options) {
              return new LocalForage2(options);
            };
            return LocalForage2;
          }();
          var localforage_js = new LocalForage();
          module3.exports = localforage_js;
        }, { "3": 3 }] }, {}, [4])(4);
      });
    }
  });

  // popup/popup.ts
  init_window_shim();
  var import_localforage = __toESM(require_localforage(), 1);

  // node_modules/slim-select/dist/slimselect.es.js
  init_window_shim();
  function generateID() {
    return Math.random().toString(36).substring(2, 10);
  }
  function hasClassInTree(element, className) {
    function hasClass(e, c) {
      if (c && e && e.classList && e.classList.contains(c)) {
        return e;
      }
      if (c && e && e.dataset && e.dataset.id && e.dataset.id === className) {
        return e;
      }
      return null;
    }
    function parentByClass(e, c) {
      if (!e || e === document) {
        return null;
      } else if (hasClass(e, c)) {
        return e;
      } else {
        return parentByClass(e.parentNode, c);
      }
    }
    return hasClass(element, className) || parentByClass(element, className);
  }
  function debounce(func, wait = 50, immediate = false) {
    let timeout;
    return function(...args) {
      const context = self;
      const later = () => {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        func.apply(context, args);
      }
    };
  }
  function isEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  function kebabCase(str) {
    const result = str.replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, (match) => "-" + match.toLowerCase());
    return str[0] === str[0].toUpperCase() ? result.substring(1) : result;
  }
  var Settings = class {
    constructor(settings) {
      this.id = "";
      this.style = "";
      this.class = [];
      this.isMultiple = false;
      this.isOpen = false;
      this.isFullOpen = false;
      this.intervalMove = null;
      if (!settings) {
        settings = {};
      }
      this.id = "ss-" + generateID();
      this.style = settings.style || "";
      this.class = settings.class || [];
      this.disabled = settings.disabled !== void 0 ? settings.disabled : false;
      this.alwaysOpen = settings.alwaysOpen !== void 0 ? settings.alwaysOpen : false;
      this.showSearch = settings.showSearch !== void 0 ? settings.showSearch : true;
      this.searchPlaceholder = settings.searchPlaceholder || "Search";
      this.searchText = settings.searchText || "No Results";
      this.searchingText = settings.searchingText || "Searching...";
      this.searchHighlight = settings.searchHighlight !== void 0 ? settings.searchHighlight : false;
      this.closeOnSelect = settings.closeOnSelect !== void 0 ? settings.closeOnSelect : true;
      this.contentLocation = settings.contentLocation || document.body;
      this.contentPosition = settings.contentPosition || "absolute";
      this.openPosition = settings.openPosition || "auto";
      this.placeholderText = settings.placeholderText !== void 0 ? settings.placeholderText : "Select Value";
      this.allowDeselect = settings.allowDeselect !== void 0 ? settings.allowDeselect : false;
      this.hideSelected = settings.hideSelected !== void 0 ? settings.hideSelected : false;
      this.showOptionTooltips = settings.showOptionTooltips !== void 0 ? settings.showOptionTooltips : false;
      this.minSelected = settings.minSelected || 0;
      this.maxSelected = settings.maxSelected || 1e3;
      this.timeoutDelay = settings.timeoutDelay || 200;
      this.maxValuesShown = settings.maxValuesShown || 20;
      this.maxValuesMessage = settings.maxValuesMessage || "{number} selected";
    }
  };
  var Optgroup = class {
    constructor(optgroup) {
      this.id = !optgroup.id || optgroup.id === "" ? generateID() : optgroup.id;
      this.label = optgroup.label || "";
      this.selectAll = optgroup.selectAll === void 0 ? false : optgroup.selectAll;
      this.closable = optgroup.closable || "off";
      this.options = [];
      if (optgroup.options) {
        for (const o of optgroup.options) {
          this.options.push(new Option(o));
        }
      }
    }
  };
  var Option = class {
    constructor(option) {
      this.id = !option.id || option.id === "" ? generateID() : option.id;
      this.value = option.value === void 0 ? option.text : option.value;
      this.text = option.text || "";
      this.html = option.html || "";
      this.selected = option.selected !== void 0 ? option.selected : false;
      this.display = option.display !== void 0 ? option.display : true;
      this.disabled = option.disabled !== void 0 ? option.disabled : false;
      this.mandatory = option.mandatory !== void 0 ? option.mandatory : false;
      this.placeholder = option.placeholder !== void 0 ? option.placeholder : false;
      this.class = option.class || "";
      this.style = option.style || "";
      this.data = option.data || {};
    }
  };
  var Store = class {
    constructor(type, data) {
      this.selectType = "single";
      this.data = [];
      this.selectType = type;
      this.setData(data);
    }
    validateDataArray(data) {
      if (!Array.isArray(data)) {
        return new Error("Data must be an array");
      }
      for (let dataObj of data) {
        if (dataObj instanceof Optgroup || "label" in dataObj) {
          if (!("label" in dataObj)) {
            return new Error("Optgroup must have a label");
          }
          if ("options" in dataObj && dataObj.options) {
            for (let option of dataObj.options) {
              return this.validateOption(option);
            }
          }
        } else if (dataObj instanceof Option || "text" in dataObj) {
          return this.validateOption(dataObj);
        } else {
          return new Error("Data object must be a valid optgroup or option");
        }
      }
      return null;
    }
    validateOption(option) {
      if (!("text" in option)) {
        return new Error("Option must have a text");
      }
      return null;
    }
    partialToFullData(data) {
      let dataFinal = [];
      data.forEach((dataObj) => {
        if (dataObj instanceof Optgroup || "label" in dataObj) {
          let optOptions = [];
          if ("options" in dataObj && dataObj.options) {
            dataObj.options.forEach((option) => {
              optOptions.push(new Option(option));
            });
          }
          if (optOptions.length > 0) {
            dataFinal.push(new Optgroup(dataObj));
          }
        }
        if (dataObj instanceof Option || "text" in dataObj) {
          dataFinal.push(new Option(dataObj));
        }
      });
      return dataFinal;
    }
    setData(data) {
      this.data = this.partialToFullData(data);
      if (this.selectType === "single") {
        this.setSelectedBy("value", this.getSelected());
      }
    }
    getData() {
      return this.filter(null, true);
    }
    getDataOptions() {
      return this.filter(null, false);
    }
    addOption(option) {
      this.setData(this.getData().concat(new Option(option)));
    }
    setSelectedBy(selectedType, selectedValues) {
      let firstOption = null;
      let hasSelected = false;
      for (let dataObj of this.data) {
        if (dataObj instanceof Optgroup) {
          for (let option of dataObj.options) {
            if (!firstOption) {
              firstOption = option;
            }
            option.selected = hasSelected ? false : selectedValues.includes(option[selectedType]);
            if (option.selected && this.selectType === "single") {
              hasSelected = true;
            }
          }
        }
        if (dataObj instanceof Option) {
          if (!firstOption) {
            firstOption = dataObj;
          }
          dataObj.selected = hasSelected ? false : selectedValues.includes(dataObj[selectedType]);
          if (dataObj.selected && this.selectType === "single") {
            hasSelected = true;
          }
        }
      }
      if (this.selectType === "single" && firstOption && !hasSelected) {
        firstOption.selected = true;
      }
    }
    getSelected() {
      let selectedOptions = this.getSelectedOptions();
      let selectedValues = [];
      selectedOptions.forEach((option) => {
        selectedValues.push(option.value);
      });
      return selectedValues;
    }
    getSelectedOptions() {
      return this.filter((opt) => {
        return opt.selected;
      }, false);
    }
    getSelectedIDs() {
      let selectedOptions = this.getSelectedOptions();
      let selectedIDs = [];
      selectedOptions.forEach((op) => {
        selectedIDs.push(op.id);
      });
      return selectedIDs;
    }
    getOptgroupByID(id) {
      for (let dataObj of this.data) {
        if (dataObj instanceof Optgroup && dataObj.id === id) {
          return dataObj;
        }
      }
      return null;
    }
    getOptionByID(id) {
      let options = this.filter((opt) => {
        return opt.id === id;
      }, false);
      return options.length ? options[0] : null;
    }
    search(search, searchFilter) {
      search = search.trim();
      if (search === "") {
        return this.getData();
      }
      return this.filter((opt) => {
        return searchFilter(opt, search);
      }, true);
    }
    filter(filter, includeOptgroup) {
      const dataSearch = [];
      this.data.forEach((dataObj) => {
        if (dataObj instanceof Optgroup) {
          let optOptions = [];
          dataObj.options.forEach((option) => {
            if (!filter || filter(option)) {
              if (!includeOptgroup) {
                dataSearch.push(new Option(option));
              } else {
                optOptions.push(new Option(option));
              }
            }
          });
          if (optOptions.length > 0) {
            let optgroup = new Optgroup(dataObj);
            optgroup.options = optOptions;
            dataSearch.push(optgroup);
          }
        }
        if (dataObj instanceof Option) {
          if (!filter || filter(dataObj)) {
            dataSearch.push(new Option(dataObj));
          }
        }
      });
      return dataSearch;
    }
    getSelectType() {
      return this.selectType;
    }
  };
  var Render = class {
    constructor(settings, store, callbacks) {
      this.classes = {
        main: "ss-main",
        placeholder: "ss-placeholder",
        values: "ss-values",
        single: "ss-single",
        max: "ss-max",
        value: "ss-value",
        valueText: "ss-value-text",
        valueDelete: "ss-value-delete",
        valueOut: "ss-value-out",
        deselect: "ss-deselect",
        deselectPath: "M10,10 L90,90 M10,90 L90,10",
        arrow: "ss-arrow",
        arrowClose: "M10,30 L50,70 L90,30",
        arrowOpen: "M10,70 L50,30 L90,70",
        content: "ss-content",
        openAbove: "ss-open-above",
        openBelow: "ss-open-below",
        search: "ss-search",
        searchHighlighter: "ss-search-highlight",
        searching: "ss-searching",
        addable: "ss-addable",
        addablePath: "M50,10 L50,90 M10,50 L90,50",
        list: "ss-list",
        optgroup: "ss-optgroup",
        optgroupLabel: "ss-optgroup-label",
        optgroupLabelText: "ss-optgroup-label-text",
        optgroupActions: "ss-optgroup-actions",
        optgroupSelectAll: "ss-selectall",
        optgroupSelectAllBox: "M60,10 L10,10 L10,90 L90,90 L90,50",
        optgroupSelectAllCheck: "M30,45 L50,70 L90,10",
        optgroupClosable: "ss-closable",
        option: "ss-option",
        optionDelete: "M10,10 L90,90 M10,90 L90,10",
        highlighted: "ss-highlighted",
        open: "ss-open",
        close: "ss-close",
        selected: "ss-selected",
        error: "ss-error",
        disabled: "ss-disabled",
        hide: "ss-hide"
      };
      this.store = store;
      this.settings = settings;
      this.callbacks = callbacks;
      this.main = this.mainDiv();
      this.content = this.contentDiv();
      this.updateClassStyles();
      this.updateAriaAttributes();
      this.settings.contentLocation.appendChild(this.content.main);
    }
    enable() {
      this.main.main.classList.remove(this.classes.disabled);
      this.content.search.input.disabled = false;
    }
    disable() {
      this.main.main.classList.add(this.classes.disabled);
      this.content.search.input.disabled = true;
    }
    open() {
      this.main.arrow.path.setAttribute("d", this.classes.arrowOpen);
      this.main.main.classList.add(this.settings.openPosition === "up" ? this.classes.openAbove : this.classes.openBelow);
      this.main.main.setAttribute("aria-expanded", "true");
      this.moveContent();
      const selectedOptions = this.store.getSelectedOptions();
      if (selectedOptions.length) {
        const selectedId = selectedOptions[selectedOptions.length - 1].id;
        const selectedOption = this.content.list.querySelector('[data-id="' + selectedId + '"]');
        if (selectedOption) {
          this.ensureElementInView(this.content.list, selectedOption);
        }
      }
    }
    close() {
      this.main.main.classList.remove(this.classes.openAbove);
      this.main.main.classList.remove(this.classes.openBelow);
      this.main.main.setAttribute("aria-expanded", "false");
      this.content.main.classList.remove(this.classes.openAbove);
      this.content.main.classList.remove(this.classes.openBelow);
      this.main.arrow.path.setAttribute("d", this.classes.arrowClose);
    }
    updateClassStyles() {
      this.main.main.className = "";
      this.main.main.removeAttribute("style");
      this.content.main.className = "";
      this.content.main.removeAttribute("style");
      this.main.main.classList.add(this.classes.main);
      this.content.main.classList.add(this.classes.content);
      if (this.settings.style !== "") {
        this.main.main.style.cssText = this.settings.style;
        this.content.main.style.cssText = this.settings.style;
      }
      if (this.settings.class.length) {
        for (const c of this.settings.class) {
          if (c.trim() !== "") {
            this.main.main.classList.add(c.trim());
            this.content.main.classList.add(c.trim());
          }
        }
      }
      if (this.settings.contentPosition === "relative") {
        this.content.main.classList.add("ss-" + this.settings.contentPosition);
      }
    }
    updateAriaAttributes() {
      this.main.main.role = "combobox";
      this.main.main.setAttribute("aria-haspopup", "listbox");
      this.main.main.setAttribute("aria-controls", this.content.main.id);
      this.main.main.setAttribute("aria-expanded", "false");
      this.content.main.setAttribute("role", "listbox");
    }
    mainDiv() {
      var _a;
      const main = document.createElement("div");
      main.dataset.id = this.settings.id;
      main.id = this.settings.id;
      main.tabIndex = 0;
      main.onkeydown = (e) => {
        switch (e.key) {
          case "ArrowUp":
          case "ArrowDown":
            this.callbacks.open();
            e.key === "ArrowDown" ? this.highlight("down") : this.highlight("up");
            return false;
          case "Tab":
            this.callbacks.close();
            return true;
          case "Enter":
          case " ":
            this.callbacks.open();
            const highlighted = this.content.list.querySelector("." + this.classes.highlighted);
            if (highlighted) {
              highlighted.click();
            }
            return false;
          case "Escape":
            this.callbacks.close();
            return false;
        }
      };
      main.onclick = (e) => {
        if (this.settings.disabled) {
          return;
        }
        this.settings.isOpen ? this.callbacks.close() : this.callbacks.open();
      };
      const values = document.createElement("div");
      values.classList.add(this.classes.values);
      main.appendChild(values);
      const deselect = document.createElement("div");
      deselect.classList.add(this.classes.deselect);
      const selectedOptions = (_a = this.store) === null || _a === void 0 ? void 0 : _a.getSelectedOptions();
      if (!this.settings.allowDeselect || this.settings.isMultiple && selectedOptions && selectedOptions.length <= 0) {
        deselect.classList.add(this.classes.hide);
      } else {
        deselect.classList.remove(this.classes.hide);
      }
      deselect.onclick = (e) => {
        e.stopPropagation();
        if (this.settings.disabled) {
          return;
        }
        let shouldDelete = true;
        const before = this.store.getSelectedOptions();
        const after = [];
        if (this.callbacks.beforeChange) {
          shouldDelete = this.callbacks.beforeChange(after, before) === true;
        }
        if (shouldDelete) {
          if (this.settings.isMultiple) {
            this.callbacks.setSelected([], false);
            this.updateDeselectAll();
          } else {
            this.callbacks.setSelected([""], false);
          }
          if (this.settings.closeOnSelect) {
            this.callbacks.close();
          }
          if (this.callbacks.afterChange) {
            this.callbacks.afterChange(after);
          }
        }
      };
      const deselectSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      deselectSvg.setAttribute("viewBox", "0 0 100 100");
      const deselectPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      deselectPath.setAttribute("d", this.classes.deselectPath);
      deselectSvg.appendChild(deselectPath);
      deselect.appendChild(deselectSvg);
      main.appendChild(deselect);
      const arrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      arrow.classList.add(this.classes.arrow);
      arrow.setAttribute("viewBox", "0 0 100 100");
      const arrowPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      arrowPath.setAttribute("d", this.classes.arrowClose);
      if (this.settings.alwaysOpen) {
        arrow.classList.add(this.classes.hide);
      }
      arrow.appendChild(arrowPath);
      main.appendChild(arrow);
      return {
        main,
        values,
        deselect: {
          main: deselect,
          svg: deselectSvg,
          path: deselectPath
        },
        arrow: {
          main: arrow,
          path: arrowPath
        }
      };
    }
    mainFocus(eventType) {
      if (eventType !== "click") {
        this.main.main.focus({ preventScroll: true });
      }
    }
    placeholder() {
      const placeholderOption = this.store.filter((o) => o.placeholder, false);
      let placeholderText = this.settings.placeholderText;
      if (placeholderOption.length) {
        if (placeholderOption[0].html !== "") {
          placeholderText = placeholderOption[0].html;
        } else if (placeholderOption[0].text !== "") {
          placeholderText = placeholderOption[0].text;
        }
      }
      const placeholder = document.createElement("div");
      placeholder.classList.add(this.classes.placeholder);
      placeholder.innerHTML = placeholderText;
      return placeholder;
    }
    renderValues() {
      if (!this.settings.isMultiple) {
        this.renderSingleValue();
        return;
      }
      this.renderMultipleValues();
    }
    renderSingleValue() {
      const selected = this.store.filter((o) => {
        return o.selected && !o.placeholder;
      }, false);
      const selectedSingle = selected.length > 0 ? selected[0] : null;
      if (!selectedSingle) {
        this.main.values.innerHTML = this.placeholder().outerHTML;
      } else {
        const singleValue = document.createElement("div");
        singleValue.classList.add(this.classes.single);
        if (selectedSingle.html) {
          singleValue.innerHTML = selectedSingle.html;
        } else {
          singleValue.innerText = selectedSingle.text;
        }
        this.main.values.innerHTML = singleValue.outerHTML;
      }
      if (!this.settings.allowDeselect || !selected.length) {
        this.main.deselect.main.classList.add(this.classes.hide);
      } else {
        this.main.deselect.main.classList.remove(this.classes.hide);
      }
    }
    renderMultipleValues() {
      let currentNodes = this.main.values.childNodes;
      let selectedOptions = this.store.filter((opt) => {
        return opt.selected && opt.display;
      }, false);
      if (selectedOptions.length === 0) {
        this.main.values.innerHTML = this.placeholder().outerHTML;
        return;
      } else {
        const placeholder = this.main.values.querySelector("." + this.classes.placeholder);
        if (placeholder) {
          placeholder.remove();
        }
      }
      if (selectedOptions.length > this.settings.maxValuesShown) {
        const singleValue = document.createElement("div");
        singleValue.classList.add(this.classes.max);
        singleValue.textContent = this.settings.maxValuesMessage.replace("{number}", selectedOptions.length.toString());
        this.main.values.innerHTML = singleValue.outerHTML;
        return;
      } else {
        const maxValuesMessage = this.main.values.querySelector("." + this.classes.max);
        if (maxValuesMessage) {
          maxValuesMessage.remove();
        }
      }
      let removeNodes = [];
      for (let i = 0; i < currentNodes.length; i++) {
        const node = currentNodes[i];
        const id = node.getAttribute("data-id");
        if (id) {
          const found = selectedOptions.filter((opt) => {
            return opt.id === id;
          }, false);
          if (!found.length) {
            removeNodes.push(node);
          }
        }
      }
      for (const n of removeNodes) {
        n.classList.add(this.classes.valueOut);
        setTimeout(() => {
          if (this.main.values.hasChildNodes() && this.main.values.contains(n)) {
            this.main.values.removeChild(n);
          }
        }, 100);
      }
      currentNodes = this.main.values.childNodes;
      for (let d = 0; d < selectedOptions.length; d++) {
        let shouldAdd = true;
        for (let i = 0; i < currentNodes.length; i++) {
          if (selectedOptions[d].id === String(currentNodes[i].dataset.id)) {
            shouldAdd = false;
          }
        }
        if (shouldAdd) {
          if (currentNodes.length === 0) {
            this.main.values.appendChild(this.multipleValue(selectedOptions[d]));
          } else if (d === 0) {
            this.main.values.insertBefore(this.multipleValue(selectedOptions[d]), currentNodes[d]);
          } else {
            currentNodes[d - 1].insertAdjacentElement("afterend", this.multipleValue(selectedOptions[d]));
          }
        }
      }
      this.updateDeselectAll();
    }
    multipleValue(option) {
      const value = document.createElement("div");
      value.classList.add(this.classes.value);
      value.dataset.id = option.id;
      const text = document.createElement("div");
      text.classList.add(this.classes.valueText);
      text.innerText = option.text;
      value.appendChild(text);
      if (!option.mandatory) {
        const deleteDiv = document.createElement("div");
        deleteDiv.classList.add(this.classes.valueDelete);
        deleteDiv.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (this.settings.disabled) {
            return;
          }
          let shouldDelete = true;
          const before = this.store.getSelectedOptions();
          const after = before.filter((o) => {
            return o.selected && o.id !== option.id;
          }, true);
          if (this.settings.minSelected && after.length < this.settings.minSelected) {
            return;
          }
          if (this.callbacks.beforeChange) {
            shouldDelete = this.callbacks.beforeChange(after, before) === true;
          }
          if (shouldDelete) {
            let selectedValues = [];
            for (const o of after) {
              if (o instanceof Optgroup) {
                for (const c of o.options) {
                  selectedValues.push(c.value);
                }
              }
              if (o instanceof Option) {
                selectedValues.push(o.value);
              }
            }
            this.callbacks.setSelected(selectedValues, false);
            if (this.settings.closeOnSelect) {
              this.callbacks.close();
            }
            if (this.callbacks.afterChange) {
              this.callbacks.afterChange(after);
            }
            this.updateDeselectAll();
          }
        };
        const deleteSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        deleteSvg.setAttribute("viewBox", "0 0 100 100");
        const deletePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        deletePath.setAttribute("d", this.classes.optionDelete);
        deleteSvg.appendChild(deletePath);
        deleteDiv.appendChild(deleteSvg);
        value.appendChild(deleteDiv);
      }
      return value;
    }
    contentDiv() {
      const main = document.createElement("div");
      main.dataset.id = this.settings.id;
      main.id = this.settings.id;
      const search = this.searchDiv();
      main.appendChild(search.main);
      const list = this.listDiv();
      main.appendChild(list);
      return {
        main,
        search,
        list
      };
    }
    moveContent() {
      if (this.settings.contentPosition === "relative") {
        this.moveContentBelow();
        return;
      }
      if (this.settings.openPosition === "down") {
        this.moveContentBelow();
        return;
      } else if (this.settings.openPosition === "up") {
        this.moveContentAbove();
        return;
      }
      if (this.putContent() === "up") {
        this.moveContentAbove();
      } else {
        this.moveContentBelow();
      }
    }
    searchDiv() {
      const main = document.createElement("div");
      const input = document.createElement("input");
      const addable = document.createElement("div");
      main.classList.add(this.classes.search);
      const searchReturn = {
        main,
        input
      };
      if (!this.settings.showSearch) {
        main.classList.add(this.classes.hide);
        input.readOnly = true;
      }
      input.type = "search";
      input.placeholder = this.settings.searchPlaceholder;
      input.tabIndex = -1;
      input.setAttribute("aria-label", this.settings.searchPlaceholder);
      input.setAttribute("autocapitalize", "off");
      input.setAttribute("autocomplete", "off");
      input.setAttribute("autocorrect", "off");
      input.oninput = debounce((e) => {
        this.callbacks.search(e.target.value);
      }, 100);
      input.onkeydown = (e) => {
        switch (e.key) {
          case "ArrowUp":
          case "ArrowDown":
            e.key === "ArrowDown" ? this.highlight("down") : this.highlight("up");
            return false;
          case "Tab":
            this.callbacks.close();
            return true;
          case "Escape":
            this.callbacks.close();
            return false;
          case "Enter":
          case " ":
            if (this.callbacks.addable && e.ctrlKey) {
              addable.click();
              return false;
            } else {
              const highlighted = this.content.list.querySelector("." + this.classes.highlighted);
              if (highlighted) {
                highlighted.click();
                return false;
              }
            }
            return true;
        }
      };
      main.appendChild(input);
      if (this.callbacks.addable) {
        addable.classList.add(this.classes.addable);
        const plus = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        plus.setAttribute("viewBox", "0 0 100 100");
        const plusPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        plusPath.setAttribute("d", this.classes.addablePath);
        plus.appendChild(plusPath);
        addable.appendChild(plus);
        addable.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!this.callbacks.addable) {
            return;
          }
          const inputValue = this.content.search.input.value.trim();
          if (inputValue === "") {
            this.content.search.input.focus();
            return;
          }
          const runFinish = (oo) => {
            let newOption = new Option(oo);
            this.callbacks.addOption(newOption);
            if (this.settings.isMultiple) {
              let values = this.store.getSelected();
              values.push(newOption.value);
              this.callbacks.setSelected(values, true);
            } else {
              this.callbacks.setSelected([newOption.value], true);
            }
            this.callbacks.search("");
            if (this.settings.closeOnSelect) {
              setTimeout(() => {
                this.callbacks.close();
              }, 100);
            }
          };
          const addableValue = this.callbacks.addable(inputValue);
          if (addableValue === false || addableValue === void 0 || addableValue === null) {
            return;
          }
          if (addableValue instanceof Promise) {
            addableValue.then((value) => {
              if (typeof value === "string") {
                runFinish({
                  text: value,
                  value
                });
              } else {
                runFinish(value);
              }
            });
          } else if (typeof addableValue === "string") {
            runFinish({
              text: addableValue,
              value: addableValue
            });
          } else {
            runFinish(addableValue);
          }
          return;
        };
        main.appendChild(addable);
        searchReturn.addable = {
          main: addable,
          svg: plus,
          path: plusPath
        };
      }
      return searchReturn;
    }
    searchFocus() {
      this.content.search.input.focus();
    }
    getOptions(notPlaceholder = false, notDisabled = false, notHidden = false) {
      let query = "." + this.classes.option;
      if (notPlaceholder) {
        query += ":not(." + this.classes.placeholder + ")";
      }
      if (notDisabled) {
        query += ":not(." + this.classes.disabled + ")";
      }
      if (notHidden) {
        query += ":not(." + this.classes.hide + ")";
      }
      return Array.from(this.content.list.querySelectorAll(query));
    }
    highlight(dir) {
      const options = this.getOptions(true, true, true);
      if (options.length === 0) {
        return;
      }
      if (options.length === 1) {
        if (!options[0].classList.contains(this.classes.highlighted)) {
          options[0].classList.add(this.classes.highlighted);
          return;
        }
      }
      for (let i = 0; i < options.length; i++) {
        if (options[i].classList.contains(this.classes.highlighted)) {
          const prevOption = options[i];
          prevOption.classList.remove(this.classes.highlighted);
          const prevParent = prevOption.parentElement;
          if (prevParent && prevParent.classList.contains(this.classes.open)) {
            const optgroupLabel = prevParent.querySelector("." + this.classes.optgroupLabel);
            if (optgroupLabel) {
              optgroupLabel.click();
            }
          }
          let selectOption = options[dir === "down" ? i + 1 < options.length ? i + 1 : 0 : i - 1 >= 0 ? i - 1 : options.length - 1];
          selectOption.classList.add(this.classes.highlighted);
          this.ensureElementInView(this.content.list, selectOption);
          const selectParent = selectOption.parentElement;
          if (selectParent && selectParent.classList.contains(this.classes.close)) {
            const optgroupLabel = selectParent.querySelector("." + this.classes.optgroupLabel);
            if (optgroupLabel) {
              optgroupLabel.click();
            }
          }
          return;
        }
      }
      options[dir === "down" ? 0 : options.length - 1].classList.add(this.classes.highlighted);
      this.ensureElementInView(this.content.list, options[dir === "down" ? 0 : options.length - 1]);
    }
    listDiv() {
      const options = document.createElement("div");
      options.classList.add(this.classes.list);
      return options;
    }
    renderError(error) {
      this.content.list.innerHTML = "";
      const errorDiv = document.createElement("div");
      errorDiv.classList.add(this.classes.error);
      errorDiv.textContent = error;
      this.content.list.appendChild(errorDiv);
    }
    renderSearching() {
      this.content.list.innerHTML = "";
      const searchingDiv = document.createElement("div");
      searchingDiv.classList.add(this.classes.searching);
      searchingDiv.textContent = this.settings.searchingText;
      this.content.list.appendChild(searchingDiv);
    }
    renderOptions(data) {
      this.content.list.innerHTML = "";
      if (data.length === 0) {
        const noResults = document.createElement("div");
        noResults.classList.add(this.classes.search);
        noResults.innerHTML = this.settings.searchText;
        this.content.list.appendChild(noResults);
        return;
      }
      for (const d of data) {
        if (d instanceof Optgroup) {
          const optgroupEl = document.createElement("div");
          optgroupEl.classList.add(this.classes.optgroup);
          const optgroupLabel = document.createElement("div");
          optgroupLabel.classList.add(this.classes.optgroupLabel);
          optgroupEl.appendChild(optgroupLabel);
          const optgroupLabelText = document.createElement("div");
          optgroupLabelText.classList.add(this.classes.optgroupLabelText);
          optgroupLabelText.textContent = d.label;
          optgroupLabel.appendChild(optgroupLabelText);
          const optgroupActions = document.createElement("div");
          optgroupActions.classList.add(this.classes.optgroupActions);
          optgroupLabel.appendChild(optgroupActions);
          if (this.settings.isMultiple && d.selectAll) {
            const selectAll = document.createElement("div");
            selectAll.classList.add(this.classes.optgroupSelectAll);
            let allSelected = true;
            for (const o of d.options) {
              if (!o.selected) {
                allSelected = false;
                break;
              }
            }
            if (allSelected) {
              selectAll.classList.add(this.classes.selected);
            }
            const selectAllText = document.createElement("span");
            selectAllText.textContent = "Select All";
            selectAll.appendChild(selectAllText);
            const selectAllSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            selectAllSvg.setAttribute("viewBox", "0 0 100 100");
            selectAll.appendChild(selectAllSvg);
            const selectAllBox = document.createElementNS("http://www.w3.org/2000/svg", "path");
            selectAllBox.setAttribute("d", this.classes.optgroupSelectAllBox);
            selectAllSvg.appendChild(selectAllBox);
            const selectAllCheck = document.createElementNS("http://www.w3.org/2000/svg", "path");
            selectAllCheck.setAttribute("d", this.classes.optgroupSelectAllCheck);
            selectAllSvg.appendChild(selectAllCheck);
            selectAll.addEventListener("click", (e) => {
              e.preventDefault();
              e.stopPropagation();
              const currentSelected = this.store.getSelected();
              if (allSelected) {
                const newSelected = currentSelected.filter((s) => {
                  for (const o of d.options) {
                    if (s === o.value) {
                      return false;
                    }
                  }
                  return true;
                });
                this.callbacks.setSelected(newSelected, true);
                return;
              } else {
                const newSelected = currentSelected.concat(d.options.map((o) => o.value));
                this.callbacks.setSelected(newSelected, true);
              }
            });
            optgroupActions.appendChild(selectAll);
          }
          if (d.closable !== "off") {
            const optgroupClosable = document.createElement("div");
            optgroupClosable.classList.add(this.classes.optgroupClosable);
            const optgroupClosableSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            optgroupClosableSvg.setAttribute("viewBox", "0 0 100 100");
            optgroupClosableSvg.classList.add(this.classes.arrow);
            optgroupClosable.appendChild(optgroupClosableSvg);
            const optgroupClosableArrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
            optgroupClosableSvg.appendChild(optgroupClosableArrow);
            if (d.options.some((o) => o.selected) || this.content.search.input.value.trim() !== "") {
              optgroupClosable.classList.add(this.classes.open);
              optgroupClosableArrow.setAttribute("d", this.classes.arrowOpen);
            } else if (d.closable === "open") {
              optgroupEl.classList.add(this.classes.open);
              optgroupClosableArrow.setAttribute("d", this.classes.arrowOpen);
            } else if (d.closable === "close") {
              optgroupEl.classList.add(this.classes.close);
              optgroupClosableArrow.setAttribute("d", this.classes.arrowClose);
            }
            optgroupLabel.addEventListener("click", (e) => {
              e.preventDefault();
              e.stopPropagation();
              if (optgroupEl.classList.contains(this.classes.close)) {
                optgroupEl.classList.remove(this.classes.close);
                optgroupEl.classList.add(this.classes.open);
                optgroupClosableArrow.setAttribute("d", this.classes.arrowOpen);
              } else {
                optgroupEl.classList.remove(this.classes.open);
                optgroupEl.classList.add(this.classes.close);
                optgroupClosableArrow.setAttribute("d", this.classes.arrowClose);
              }
            });
            optgroupActions.appendChild(optgroupClosable);
          }
          optgroupEl.appendChild(optgroupLabel);
          for (const o of d.options) {
            optgroupEl.appendChild(this.option(o));
          }
          this.content.list.appendChild(optgroupEl);
        }
        if (d instanceof Option) {
          this.content.list.appendChild(this.option(d));
        }
      }
    }
    option(option) {
      if (option.placeholder) {
        const placeholder = document.createElement("div");
        placeholder.classList.add(this.classes.option);
        placeholder.classList.add(this.classes.hide);
        return placeholder;
      }
      const optionEl = document.createElement("div");
      optionEl.dataset.id = option.id;
      optionEl.id = option.id;
      optionEl.classList.add(this.classes.option);
      optionEl.setAttribute("role", "option");
      if (option.class) {
        option.class.split(" ").forEach((dataClass) => {
          optionEl.classList.add(dataClass);
        });
      }
      if (option.style) {
        optionEl.style.cssText = option.style;
      }
      if (this.settings.searchHighlight && this.content.search.input.value.trim() !== "") {
        optionEl.innerHTML = this.highlightText(option.html !== "" ? option.html : option.text, this.content.search.input.value, this.classes.searchHighlighter);
      } else if (option.html !== "") {
        optionEl.innerHTML = option.html;
      } else {
        optionEl.textContent = option.text;
      }
      if (this.settings.showOptionTooltips && optionEl.textContent) {
        optionEl.setAttribute("title", optionEl.textContent);
      }
      if (!option.display) {
        optionEl.classList.add(this.classes.hide);
      }
      if (option.disabled) {
        optionEl.classList.add(this.classes.disabled);
      }
      if (option.selected && this.settings.hideSelected) {
        optionEl.classList.add(this.classes.hide);
      }
      if (option.selected) {
        optionEl.classList.add(this.classes.selected);
        optionEl.setAttribute("aria-selected", "true");
        this.main.main.setAttribute("aria-activedescendant", optionEl.id);
      } else {
        optionEl.classList.remove(this.classes.selected);
        optionEl.setAttribute("aria-selected", "false");
      }
      optionEl.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const selectedOptions = this.store.getSelected();
        const element = e.currentTarget;
        const elementID = String(element.dataset.id);
        if (option.disabled || option.selected && !this.settings.allowDeselect) {
          return;
        }
        if (this.settings.isMultiple && this.settings.maxSelected <= selectedOptions.length && !option.selected || this.settings.isMultiple && this.settings.minSelected >= selectedOptions.length && option.selected) {
          return;
        }
        let shouldUpdate = false;
        const before = this.store.getSelectedOptions();
        let after = [];
        if (this.settings.isMultiple) {
          if (option.selected) {
            after = before.filter((o) => o.id !== elementID);
          } else {
            after = before.concat(option);
          }
        }
        if (!this.settings.isMultiple) {
          if (option.selected) {
            after = [];
          } else {
            after = [option];
          }
        }
        if (!this.callbacks.beforeChange) {
          shouldUpdate = true;
        }
        if (this.callbacks.beforeChange) {
          if (this.callbacks.beforeChange(after, before) === false) {
            shouldUpdate = false;
          } else {
            shouldUpdate = true;
          }
        }
        if (shouldUpdate) {
          if (!this.store.getOptionByID(elementID)) {
            this.callbacks.addOption(option);
          }
          this.callbacks.setSelected(after.map((o) => o.value), false);
          if (this.settings.closeOnSelect) {
            this.callbacks.close();
          }
          if (this.callbacks.afterChange) {
            this.callbacks.afterChange(after);
          }
        }
      });
      return optionEl;
    }
    destroy() {
      this.main.main.remove();
      this.content.main.remove();
    }
    highlightText(str, search, className) {
      let completedString = str;
      const regex = new RegExp("(" + search.trim() + ")(?![^<]*>[^<>]*</)", "i");
      if (!str.match(regex)) {
        return str;
      }
      const matchStartPosition = str.match(regex).index;
      const matchEndPosition = matchStartPosition + str.match(regex)[0].toString().length;
      const originalTextFoundByRegex = str.substring(matchStartPosition, matchEndPosition);
      completedString = completedString.replace(regex, `<mark class="${className}">${originalTextFoundByRegex}</mark>`);
      return completedString;
    }
    moveContentAbove() {
      const mainHeight = this.main.main.offsetHeight;
      const contentHeight = this.content.main.offsetHeight;
      this.main.main.classList.remove(this.classes.openBelow);
      this.main.main.classList.add(this.classes.openAbove);
      this.content.main.classList.remove(this.classes.openBelow);
      this.content.main.classList.add(this.classes.openAbove);
      const containerRect = this.main.main.getBoundingClientRect();
      this.content.main.style.margin = "-" + (mainHeight + contentHeight - 1) + "px 0px 0px 0px";
      this.content.main.style.top = containerRect.top + containerRect.height + fakeWindow.scrollY + "px";
      this.content.main.style.left = containerRect.left + fakeWindow.scrollX + "px";
      this.content.main.style.width = containerRect.width + "px";
    }
    moveContentBelow() {
      this.main.main.classList.remove(this.classes.openAbove);
      this.main.main.classList.add(this.classes.openBelow);
      this.content.main.classList.remove(this.classes.openAbove);
      this.content.main.classList.add(this.classes.openBelow);
      const containerRect = this.main.main.getBoundingClientRect();
      this.content.main.style.margin = "-1px 0px 0px 0px";
      if (this.settings.contentPosition !== "relative") {
        this.content.main.style.top = containerRect.top + containerRect.height + fakeWindow.scrollY + "px";
        this.content.main.style.left = containerRect.left + fakeWindow.scrollX + "px";
        this.content.main.style.width = containerRect.width + "px";
      }
    }
    ensureElementInView(container, element) {
      const cTop = container.scrollTop + container.offsetTop;
      const cBottom = cTop + container.clientHeight;
      const eTop = element.offsetTop;
      const eBottom = eTop + element.clientHeight;
      if (eTop < cTop) {
        container.scrollTop -= cTop - eTop;
      } else if (eBottom > cBottom) {
        container.scrollTop += eBottom - cBottom;
      }
    }
    putContent() {
      const mainHeight = this.main.main.offsetHeight;
      const mainRect = this.main.main.getBoundingClientRect();
      const contentHeight = this.content.main.offsetHeight;
      const spaceBelow = fakeWindow.innerHeight - (mainRect.top + mainHeight);
      if (spaceBelow <= contentHeight) {
        if (mainRect.top > contentHeight) {
          return "up";
        } else {
          return "down";
        }
      }
      return "down";
    }
    updateDeselectAll() {
      if (!this.store || !this.settings) {
        return;
      }
      const selected = this.store.getSelectedOptions();
      const hasSelectedItems = selected && selected.length > 0;
      const isMultiple = this.settings.isMultiple;
      const allowDeselect = this.settings.allowDeselect;
      const deselectButton = this.main.deselect.main;
      const hideClass = this.classes.hide;
      if (allowDeselect && !(isMultiple && !hasSelectedItems)) {
        deselectButton.classList.remove(hideClass);
      } else {
        deselectButton.classList.add(hideClass);
      }
    }
  };
  var Select = class {
    constructor(select) {
      this.listen = false;
      this.observer = null;
      this.select = select;
      this.select.addEventListener("change", this.valueChange.bind(this), {
        passive: true
      });
      this.observer = new MutationObserver(this.observeCall.bind(this));
      this.changeListen(true);
    }
    enable() {
      this.select.disabled = false;
    }
    disable() {
      this.select.disabled = true;
    }
    hideUI() {
      this.select.tabIndex = -1;
      this.select.style.display = "none";
      this.select.setAttribute("aria-hidden", "true");
    }
    showUI() {
      this.select.removeAttribute("tabindex");
      this.select.style.display = "";
      this.select.removeAttribute("aria-hidden");
    }
    changeListen(listen) {
      this.listen = listen;
      if (listen) {
        if (this.observer) {
          this.observer.observe(this.select, {
            subtree: true,
            childList: true,
            attributes: true
          });
        }
      }
      if (!listen) {
        if (this.observer) {
          this.observer.disconnect();
        }
      }
    }
    valueChange(ev) {
      if (this.listen && this.onValueChange) {
        this.onValueChange(this.getSelectedValues());
      }
      return true;
    }
    observeCall(mutations) {
      if (!this.listen) {
        return;
      }
      let classChanged = false;
      let disabledChanged = false;
      let optgroupOptionChanged = false;
      for (const m of mutations) {
        if (m.target === this.select) {
          if (m.attributeName === "disabled") {
            disabledChanged = true;
          }
          if (m.attributeName === "class") {
            classChanged = true;
          }
        }
        if (m.target.nodeName === "OPTGROUP" || m.target.nodeName === "OPTION") {
          optgroupOptionChanged = true;
        }
      }
      if (classChanged && this.onClassChange) {
        this.onClassChange(this.select.className.split(" "));
      }
      if (disabledChanged && this.onDisabledChange) {
        this.changeListen(false);
        this.onDisabledChange(this.select.disabled);
        this.changeListen(true);
      }
      if (optgroupOptionChanged && this.onOptionsChange) {
        this.changeListen(false);
        this.onOptionsChange(this.getData());
        this.changeListen(true);
      }
    }
    getData() {
      let data = [];
      const nodes = this.select.childNodes;
      for (const n of nodes) {
        if (n.nodeName === "OPTGROUP") {
          data.push(this.getDataFromOptgroup(n));
        }
        if (n.nodeName === "OPTION") {
          data.push(this.getDataFromOption(n));
        }
      }
      return data;
    }
    getDataFromOptgroup(optgroup) {
      let data = {
        id: optgroup.id,
        label: optgroup.label,
        selectAll: optgroup.dataset ? optgroup.dataset.selectall === "true" : false,
        closable: optgroup.dataset ? optgroup.dataset.closable : "off",
        options: []
      };
      const options = optgroup.childNodes;
      for (const o of options) {
        if (o.nodeName === "OPTION") {
          data.options.push(this.getDataFromOption(o));
        }
      }
      return data;
    }
    getDataFromOption(option) {
      return {
        id: option.id,
        value: option.value,
        text: option.text,
        html: option.dataset && option.dataset.html ? option.dataset.html : "",
        selected: option.selected,
        display: option.style.display === "none" ? false : true,
        disabled: option.disabled,
        mandatory: option.dataset ? option.dataset.mandatory === "true" : false,
        placeholder: option.dataset.placeholder === "true",
        class: option.className,
        style: option.style.cssText,
        data: option.dataset
      };
    }
    getSelectedValues() {
      let values = [];
      const options = this.select.childNodes;
      for (const o of options) {
        if (o.nodeName === "OPTGROUP") {
          const optgroupOptions = o.childNodes;
          for (const oo of optgroupOptions) {
            if (oo.nodeName === "OPTION") {
              const option = oo;
              if (option.selected) {
                values.push(option.value);
              }
            }
          }
        }
        if (o.nodeName === "OPTION") {
          const option = o;
          if (option.selected) {
            values.push(option.value);
          }
        }
      }
      return values;
    }
    setSelected(value) {
      this.changeListen(false);
      const options = this.select.childNodes;
      for (const o of options) {
        if (o.nodeName === "OPTGROUP") {
          const optgroup = o;
          const optgroupOptions = optgroup.childNodes;
          for (const oo of optgroupOptions) {
            if (oo.nodeName === "OPTION") {
              const option = oo;
              option.selected = value.includes(option.value);
            }
          }
        }
        if (o.nodeName === "OPTION") {
          const option = o;
          option.selected = value.includes(option.value);
        }
      }
      this.changeListen(true);
    }
    updateSelect(id, style, classes) {
      this.changeListen(false);
      if (id) {
        this.select.dataset.id = id;
      }
      if (style) {
        this.select.style.cssText = style;
      }
      if (classes) {
        this.select.className = "";
        classes.forEach((c) => {
          if (c.trim() !== "") {
            this.select.classList.add(c.trim());
          }
        });
      }
      this.changeListen(true);
    }
    updateOptions(data) {
      this.changeListen(false);
      this.select.innerHTML = "";
      for (const d of data) {
        if (d instanceof Optgroup) {
          this.select.appendChild(this.createOptgroup(d));
        }
        if (d instanceof Option) {
          this.select.appendChild(this.createOption(d));
        }
      }
      this.select.dispatchEvent(new Event("change"));
      this.changeListen(true);
    }
    createOptgroup(optgroup) {
      const optgroupEl = document.createElement("optgroup");
      optgroupEl.id = optgroup.id;
      optgroupEl.label = optgroup.label;
      if (optgroup.selectAll) {
        optgroupEl.dataset.selectAll = "true";
      }
      if (optgroup.closable !== "off") {
        optgroupEl.dataset.closable = optgroup.closable;
      }
      if (optgroup.options) {
        for (const o of optgroup.options) {
          optgroupEl.appendChild(this.createOption(o));
        }
      }
      return optgroupEl;
    }
    createOption(info) {
      const optionEl = document.createElement("option");
      optionEl.id = info.id;
      optionEl.value = info.value;
      optionEl.innerHTML = info.text;
      if (info.html !== "") {
        optionEl.setAttribute("data-html", info.html);
      }
      if (info.selected) {
        optionEl.selected = info.selected;
      }
      if (info.disabled) {
        optionEl.disabled = true;
      }
      if (info.display === false) {
        optionEl.style.display = "none";
      }
      if (info.placeholder) {
        optionEl.setAttribute("data-placeholder", "true");
      }
      if (info.mandatory) {
        optionEl.setAttribute("data-mandatory", "true");
      }
      if (info.class) {
        info.class.split(" ").forEach((optionClass) => {
          optionEl.classList.add(optionClass);
        });
      }
      if (info.data && typeof info.data === "object") {
        Object.keys(info.data).forEach((key) => {
          optionEl.setAttribute("data-" + kebabCase(key), info.data[key]);
        });
      }
      return optionEl;
    }
    destroy() {
      this.changeListen(false);
      this.select.removeEventListener("change", this.valueChange.bind(this));
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
      delete this.select.dataset.id;
      this.showUI();
    }
  };
  var SlimSelect = class {
    constructor(config) {
      var _a;
      this.events = {
        search: void 0,
        searchFilter: (opt, search) => {
          return opt.text.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        },
        addable: void 0,
        beforeChange: void 0,
        afterChange: void 0,
        beforeOpen: void 0,
        afterOpen: void 0,
        beforeClose: void 0,
        afterClose: void 0
      };
      this.windowResize = debounce(() => {
        if (!this.settings.isOpen && !this.settings.isFullOpen) {
          return;
        }
        this.render.moveContent();
      });
      this.windowScroll = debounce(() => {
        if (!this.settings.isOpen && !this.settings.isFullOpen) {
          return;
        }
        this.render.moveContent();
      });
      this.documentClick = (e) => {
        if (!this.settings.isOpen) {
          return;
        }
        if (e.target && !hasClassInTree(e.target, this.settings.id)) {
          this.close(e.type);
        }
      };
      this.windowVisibilityChange = () => {
        if (document.hidden) {
          this.close();
        }
      };
      this.selectEl = typeof config.select === "string" ? document.querySelector(config.select) : config.select;
      if (!this.selectEl) {
        if (config.events && config.events.error) {
          config.events.error(new Error("Could not find select element"));
        }
        return;
      }
      if (this.selectEl.tagName !== "SELECT") {
        if (config.events && config.events.error) {
          config.events.error(new Error("Element isnt of type select"));
        }
        return;
      }
      if (this.selectEl.dataset.ssid) {
        this.destroy();
      }
      this.settings = new Settings(config.settings);
      const debounceEvents = ["afterChange", "beforeOpen", "afterOpen", "beforeClose", "afterClose"];
      for (const key in config.events) {
        if (!config.events.hasOwnProperty(key)) {
          continue;
        }
        if (debounceEvents.indexOf(key) !== -1) {
          this.events[key] = debounce(config.events[key], 100);
        } else {
          this.events[key] = config.events[key];
        }
      }
      this.settings.disabled = ((_a = config.settings) === null || _a === void 0 ? void 0 : _a.disabled) ? config.settings.disabled : this.selectEl.disabled;
      this.settings.isMultiple = this.selectEl.multiple;
      this.settings.style = this.selectEl.style.cssText;
      this.settings.class = this.selectEl.className.split(" ");
      this.select = new Select(this.selectEl);
      this.select.updateSelect(this.settings.id, this.settings.style, this.settings.class);
      this.select.hideUI();
      this.select.onValueChange = (values) => {
        this.setSelected(values);
      };
      this.select.onClassChange = (classes) => {
        this.settings.class = classes;
        this.render.updateClassStyles();
      };
      this.select.onDisabledChange = (disabled) => {
        if (disabled) {
          this.disable();
        } else {
          this.enable();
        }
      };
      this.select.onOptionsChange = (data) => {
        this.setData(data);
      };
      this.store = new Store(this.settings.isMultiple ? "multiple" : "single", config.data ? config.data : this.select.getData());
      if (config.data) {
        this.select.updateOptions(this.store.getData());
      }
      const callbacks = {
        open: this.open.bind(this),
        close: this.close.bind(this),
        addable: this.events.addable ? this.events.addable : void 0,
        setSelected: this.setSelected.bind(this),
        addOption: this.addOption.bind(this),
        search: this.search.bind(this),
        beforeChange: this.events.beforeChange,
        afterChange: this.events.afterChange
      };
      this.render = new Render(this.settings, this.store, callbacks);
      this.render.renderValues();
      this.render.renderOptions(this.store.getData());
      const selectAriaLabel = this.selectEl.getAttribute("aria-label");
      const selectAriaLabelledBy = this.selectEl.getAttribute("aria-labelledby");
      if (selectAriaLabel) {
        this.render.main.main.setAttribute("aria-label", selectAriaLabel);
      } else if (selectAriaLabelledBy) {
        this.render.main.main.setAttribute("aria-labelledby", selectAriaLabelledBy);
      }
      if (this.selectEl.parentNode) {
        this.selectEl.parentNode.insertBefore(this.render.main.main, this.selectEl.nextSibling);
      }
      document.addEventListener("click", this.documentClick);
      fakeWindow.addEventListener("resize", this.windowResize, false);
      if (this.settings.openPosition === "auto") {
        fakeWindow.addEventListener("scroll", this.windowScroll, false);
      }
      document.addEventListener("visibilitychange", this.windowVisibilityChange);
      if (this.settings.disabled) {
        this.disable();
      }
      if (this.settings.alwaysOpen) {
        this.open();
      }
      this.selectEl.slim = this;
    }
    enable() {
      this.settings.disabled = false;
      this.select.enable();
      this.render.enable();
    }
    disable() {
      this.settings.disabled = true;
      this.select.disable();
      this.render.disable();
    }
    getData() {
      return this.store.getData();
    }
    setData(data) {
      const selected = this.store.getSelected();
      const err = this.store.validateDataArray(data);
      if (err) {
        if (this.events.error) {
          this.events.error(err);
        }
        return;
      }
      this.store.setData(data);
      const dataClean = this.store.getData();
      this.select.updateOptions(dataClean);
      this.render.renderValues();
      this.render.renderOptions(dataClean);
      if (this.events.afterChange && !isEqual(selected, this.store.getSelected())) {
        this.events.afterChange(this.store.getSelectedOptions());
      }
    }
    getSelected() {
      return this.store.getSelected();
    }
    setSelected(value, runAfterChange = true) {
      const selected = this.store.getSelected();
      this.store.setSelectedBy("value", Array.isArray(value) ? value : [value]);
      const data = this.store.getData();
      this.select.updateOptions(data);
      this.render.renderValues();
      if (this.render.content.search.input.value !== "") {
        this.search(this.render.content.search.input.value);
      } else {
        this.render.renderOptions(data);
      }
      if (runAfterChange && this.events.afterChange && !isEqual(selected, this.store.getSelected())) {
        this.events.afterChange(this.store.getSelectedOptions());
      }
    }
    addOption(option) {
      const selected = this.store.getSelected();
      if (!this.store.getDataOptions().some((o) => {
        var _a;
        return o.value === ((_a = option.value) !== null && _a !== void 0 ? _a : option.text);
      })) {
        this.store.addOption(option);
      }
      const data = this.store.getData();
      this.select.updateOptions(data);
      this.render.renderValues();
      this.render.renderOptions(data);
      if (this.events.afterChange && !isEqual(selected, this.store.getSelected())) {
        this.events.afterChange(this.store.getSelectedOptions());
      }
    }
    open() {
      if (this.settings.disabled || this.settings.isOpen) {
        return;
      }
      if (this.events.beforeOpen) {
        this.events.beforeOpen();
      }
      this.render.open();
      if (this.settings.showSearch) {
        this.render.searchFocus();
      }
      this.settings.isOpen = true;
      setTimeout(() => {
        if (this.events.afterOpen) {
          this.events.afterOpen();
        }
        if (this.settings.isOpen) {
          this.settings.isFullOpen = true;
        }
      }, this.settings.timeoutDelay);
      if (this.settings.contentPosition === "absolute") {
        if (this.settings.intervalMove) {
          clearInterval(this.settings.intervalMove);
        }
        this.settings.intervalMove = setInterval(this.render.moveContent.bind(this.render), 500);
      }
    }
    close(eventType = null) {
      if (!this.settings.isOpen || this.settings.alwaysOpen) {
        return;
      }
      if (this.events.beforeClose) {
        this.events.beforeClose();
      }
      this.render.close();
      if (this.render.content.search.input.value !== "") {
        this.search("");
      }
      this.render.mainFocus(eventType);
      this.settings.isOpen = false;
      this.settings.isFullOpen = false;
      setTimeout(() => {
        if (this.events.afterClose) {
          this.events.afterClose();
        }
      }, this.settings.timeoutDelay);
      if (this.settings.intervalMove) {
        clearInterval(this.settings.intervalMove);
      }
    }
    search(value) {
      if (this.render.content.search.input.value !== value) {
        this.render.content.search.input.value = value;
      }
      if (!this.events.search) {
        this.render.renderOptions(value === "" ? this.store.getData() : this.store.search(value, this.events.searchFilter));
        return;
      }
      this.render.renderSearching();
      const searchResp = this.events.search(value, this.store.getSelectedOptions());
      if (searchResp instanceof Promise) {
        searchResp.then((data) => {
          this.render.renderOptions(this.store.partialToFullData(data));
        }).catch((err) => {
          this.render.renderError(typeof err === "string" ? err : err.message);
        });
        return;
      } else if (Array.isArray(searchResp)) {
        this.render.renderOptions(this.store.partialToFullData(searchResp));
      } else {
        this.render.renderError("Search event must return a promise or an array of data");
      }
    }
    destroy() {
      document.removeEventListener("click", this.documentClick);
      fakeWindow.removeEventListener("resize", this.windowResize, false);
      if (this.settings.openPosition === "auto") {
        fakeWindow.removeEventListener("scroll", this.windowScroll, false);
      }
      document.removeEventListener("visibilitychange", this.windowVisibilityChange);
      this.store.setData([]);
      this.render.destroy();
      this.select.destroy();
    }
  };

  // popup/popup.ts
  var noTargetView;
  var hasTargetView;
  var loadingTargetView;
  var targetListSelector;
  var refreshTargetsButtons;
  var captureUI;
  var captureTargetLabel;
  var quickCaptureCheckbox;
  var fullCaptureCheckbox;
  var commandCountInput;
  var isConnectedToDevice = false;
  fakeWindow.onload = () => {
    initialize();
    fetchTargets();
  };
  var selectableTargets = {};
  var initialize = () => {
    noTargetView = document.getElementById("noTargets");
    hasTargetView = document.getElementById("hasTargets");
    loadingTargetView = document.getElementById("loadingTargets");
    setVisibleView(true);
    targetListSelector = new SlimSelect({
      select: "#targets",
      events: {
        afterChange: (newVal) => {
          const selectedOption = newVal[0];
          const targetWrapper = selectableTargets[selectedOption.text];
          if (!targetWrapper) {
            return;
          }
          targetWrapper.onSelected(targetWrapper.target);
        }
      }
    });
    refreshTargetsButtons = document.querySelectorAll(".refreshTargetButton");
    for (let button of refreshTargetsButtons) {
      button.onclick = async () => {
        setVisibleView(true);
        await import_localforage.default.removeItem("saved_target");
        await __debug_fetchTargets();
      };
    }
    captureUI = document.getElementById("captureUI");
    captureTargetLabel = document.getElementById("captureTarget");
    captureUI.style.display = "none";
    const captureButton = document.getElementById("captureNow");
    captureButton.onclick = capture;
    quickCaptureCheckbox = document.getElementById("quickCapture");
    fullCaptureCheckbox = document.getElementById("fullCapture");
    commandCountInput = document.getElementById("captureOnLoadCount");
  };
  var setVisibleView = (isLoading = false) => {
    if (isLoading) {
      loadingTargetView.style.display = "flex";
      noTargetView.style.display = "none";
      hasTargetView.style.display = "none";
      return;
    }
    if (!isConnectedToDevice) {
      loadingTargetView.style.display = "none";
      noTargetView.style.display = "block";
      hasTargetView.style.display = "none";
    } else {
      loadingTargetView.style.display = "none";
      noTargetView.style.display = "none";
      hasTargetView.style.display = "block";
    }
  };
  var populateTargetList = (targets, onSelectTarget) => {
    const options = [];
    options.push({
      text: "Select a tab to attach to.",
      placeholder: true
    });
    selectableTargets = {};
    const existingSelected = targetListSelector.getSelected();
    for (let target of targets) {
      selectableTargets[target.title] = {
        target,
        onSelected: onSelectTarget ?? (async (target2) => {
          const targetResponse = await chrome.runtime.sendMessage({
            type: "attachToTarget",
            target: target2
          });
          if (targetResponse.type === "connectedToTarget") {
            await onConnectedTarget(targetResponse.target);
          } else if (targetResponse.type === "error") {
            await onDisconnectedTarget();
          }
        })
      };
      const option = {
        text: target.title
      };
      if (existingSelected.includes(option.text)) {
        option.selected = true;
      }
      options.push(option);
    }
    ;
    targetListSelector.setData(options);
  };
  var fetchTargets = async () => {
    captureUI.style.display = "none";
    const response = await chrome.runtime.sendMessage({ type: "getTargets" });
    switch (response.type) {
      case "listOfTargets":
        isConnectedToDevice = true;
        setVisibleView();
        populateTargetList(response.targets);
        break;
      case "error":
        isConnectedToDevice = false;
        targetListSelector.setData([]);
        await onDisconnectedTarget();
        break;
    }
  };
  var __debug_fetchTargets = async () => {
    console.log("DEBUG: fetching dummy targets");
    isConnectedToDevice = true;
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    populateTargetList([
      {
        url: "http://test.com",
        title: "Test1",
        description: "A test URL",
        id: "abcde",
        type: "tab",
        webSocketDebuggerUrl: "none",
        devtoolsFrontendUrl: "none"
      },
      {
        url: "http://test.com",
        title: "Test2",
        description: "A test URL 2",
        id: "abcdef",
        type: "tab",
        webSocketDebuggerUrl: "none",
        devtoolsFrontendUrl: "none"
      }
    ], async (target) => {
      await onConnectedTarget(target);
    });
    setVisibleView();
  };
  var onConnectedTarget = async (target) => {
    setVisibleView();
    captureTargetLabel.innerHTML = "Attached to remote tab: " + target.title;
    captureUI.style.display = "block";
    await import_localforage.default.setItem("saved_target", target);
  };
  var onDisconnectedTarget = async () => {
    captureUI.style.display = "none";
    setVisibleView();
    await import_localforage.default.removeItem("saved_target");
  };
  var capture = async () => {
    var commandCount = parseInt(commandCountInput.value);
    if (commandCount < 0 || commandCount === Number.NaN) {
      commandCount = 500;
    }
    await chrome.runtime.sendMessage({
      type: "startCapture",
      captureOnLoadCount: commandCount,
      quickCapture: quickCaptureCheckbox.checked,
      fullCapture: fullCaptureCheckbox.checked
    });
  };
})();
/*! Bundled license information:

localforage/dist/localforage.js:
  (*!
      localForage -- Offline Storage, Improved
      Version 1.10.0
      https://localforage.github.io/localForage
      (c) 2013-2017 Mozilla, Apache License 2.0
  *)
*/
