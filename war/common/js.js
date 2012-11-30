(function(a, c) {
	function d(g) {
		return !a(g).parents().andSelf().filter(
				function() {
					return a.curCSS(this, "visibility") === "hidden"
							|| a.expr.filters.hidden(this)
				}).length
	}
	a.ui = a.ui || {};
	if (!a.ui.version) {
		a.extend(a.ui, {
			version : "1.8.11",
			keyCode : {
				ALT : 18,
				BACKSPACE : 8,
				CAPS_LOCK : 20,
				COMMA : 188,
				COMMAND : 91,
				COMMAND_LEFT : 91,
				COMMAND_RIGHT : 93,
				CONTROL : 17,
				DELETE : 46,
				DOWN : 40,
				END : 35,
				ENTER : 13,
				ESCAPE : 27,
				HOME : 36,
				INSERT : 45,
				LEFT : 37,
				MENU : 93,
				NUMPAD_ADD : 107,
				NUMPAD_DECIMAL : 110,
				NUMPAD_DIVIDE : 111,
				NUMPAD_ENTER : 108,
				NUMPAD_MULTIPLY : 106,
				NUMPAD_SUBTRACT : 109,
				PAGE_DOWN : 34,
				PAGE_UP : 33,
				PERIOD : 190,
				RIGHT : 39,
				SHIFT : 16,
				SPACE : 32,
				TAB : 9,
				UP : 38,
				WINDOWS : 91
			}
		});
		a.fn
				.extend({
					_focus : a.fn.focus,
					focus : function(g, f) {
						return typeof g === "number" ? this.each(function() {
							var b = this;
							setTimeout(function() {
								a(b).focus();
								f && f.call(b)
							}, g)
						}) : this._focus.apply(this, arguments)
					},
					scrollParent : function() {
						var g;
						g = a.browser.msie
								&& /(static|relative)/.test(this
										.css("position"))
								|| /absolute/.test(this.css("position")) ? this
								.parents()
								.filter(
										function() {
											return /(relative|absolute|fixed)/
													.test(a.curCSS(this,
															"position", 1))
													&& /(auto|scroll)/
															.test(a.curCSS(
																	this,
																	"overflow",
																	1)
																	+ a
																			.curCSS(
																					this,
																					"overflow-y",
																					1)
																	+ a
																			.curCSS(
																					this,
																					"overflow-x",
																					1))
										}).eq(0)
								: this
										.parents()
										.filter(
												function() {
													return /(auto|scroll)/
															.test(a.curCSS(
																	this,
																	"overflow",
																	1)
																	+ a
																			.curCSS(
																					this,
																					"overflow-y",
																					1)
																	+ a
																			.curCSS(
																					this,
																					"overflow-x",
																					1))
												}).eq(0);
						return /fixed/.test(this.css("position")) || !g.length ? a(document)
								: g
					},
					zIndex : function(g) {
						if (g !== c)
							return this.css("zIndex", g);
						if (this.length) {
							g = a(this[0]);
							for ( var f; g.length && g[0] !== document;) {
								f = g.css("position");
								if (f === "absolute" || f === "relative"
										|| f === "fixed") {
									f = parseInt(g.css("zIndex"), 10);
									if (!isNaN(f) && f !== 0)
										return f
								}
								g = g.parent()
							}
						}
						return 0
					},
					disableSelection : function() {
						return this.bind((a.support.selectstart ? "selectstart"
								: "mousedown")
								+ ".ui-disableSelection", function(g) {
							g.preventDefault()
						})
					},
					enableSelection : function() {
						return this.unbind(".ui-disableSelection")
					}
				});
		a.each([ "Width", "Height" ],
				function(g, f) {
					function b(k, p, s, o) {
						a.each(e,
								function() {
									p -= parseFloat(a.curCSS(k, "padding"
											+ this, true)) || 0;
									if (s)
										p -= parseFloat(a.curCSS(k, "border"
												+ this + "Width", true)) || 0;
									if (o)
										p -= parseFloat(a.curCSS(k, "margin"
												+ this, true)) || 0
								});
						return p
					}
					var e = f === "Width" ? [ "Left", "Right" ] : [ "Top",
							"Bottom" ], h = f.toLowerCase(), j = {
						innerWidth : a.fn.innerWidth,
						innerHeight : a.fn.innerHeight,
						outerWidth : a.fn.outerWidth,
						outerHeight : a.fn.outerHeight
					};
					a.fn["inner" + f] = function(k) {
						if (k === c)
							return j["inner" + f].call(this);
						return this.each(function() {
							a(this).css(h, b(this, k) + "px")
						})
					};
					a.fn["outer" + f] = function(k, p) {
						if (typeof k !== "number")
							return j["outer" + f].call(this, k);
						return this.each(function() {
							a(this).css(h, b(this, k, true, p) + "px")
						})
					}
				});
		a
				.extend(
						a.expr[":"],
						{
							data : function(g, f, b) {
								return !!a.data(g, b[3])
							},
							focusable : function(g) {
								var f = g.nodeName.toLowerCase(), b = a.attr(g,
										"tabindex");
								if ("area" === f) {
									f = g.parentNode;
									b = f.name;
									if (!g.href
											|| !b
											|| f.nodeName.toLowerCase() !== "map")
										return false;
									g = a("img[usemap=#" + b + "]")[0];
									return !!g && d(g)
								}
								return (/input|select|textarea|button|object/
										.test(f) ? !g.disabled
										: "a" == f ? g.href || !isNaN(b)
												: !isNaN(b))
										&& d(g)
							},
							tabbable : function(g) {
								var f = a.attr(g, "tabindex");
								return (isNaN(f) || f >= 0)
										&& a(g).is(":focusable")
							}
						});
		a(function() {
			var g = document.body, f = g.appendChild(f = document
					.createElement("div"));
			a.extend(f.style, {
				minHeight : "100px",
				height : "auto",
				padding : 0,
				borderWidth : 0
			});
			a.support.minHeight = f.offsetHeight === 100;
			a.support.selectstart = "onselectstart" in f;
			g.removeChild(f).style.display = "none"
		});
		a.extend(a.ui, {
			plugin : {
				add : function(g, f, b) {
					g = a.ui[g].prototype;
					for ( var e in b) {
						g.plugins[e] = g.plugins[e] || [];
						g.plugins[e].push([ f, b[e] ])
					}
				},
				call : function(g, f, b) {
					if ((f = g.plugins[f]) && g.element[0].parentNode)
						for ( var e = 0; e < f.length; e++)
							g.options[f[e][0]] && f[e][1].apply(g.element, b)
				}
			},
			contains : function(g, f) {
				return document.compareDocumentPosition ? g
						.compareDocumentPosition(f) & 16 : g !== f
						&& g.contains(f)
			},
			hasScroll : function(g, f) {
				if (a(g).css("overflow") === "hidden")
					return false;
				f = f && f === "left" ? "scrollLeft" : "scrollTop";
				var b = false;
				if (g[f] > 0)
					return true;
				g[f] = 1;
				b = g[f] > 0;
				g[f] = 0;
				return b
			},
			isOverAxis : function(g, f, b) {
				return g > f && g < f + b
			},
			isOver : function(g, f, b, e, h, j) {
				return a.ui.isOverAxis(g, b, h) && a.ui.isOverAxis(f, e, j)
			}
		})
	}
})(jQuery);
(function(a, c) {
	if (a.cleanData) {
		var d = a.cleanData;
		a.cleanData = function(f) {
			for ( var b = 0, e; (e = f[b]) != null; b++)
				a(e).triggerHandler("remove");
			d(f)
		}
	} else {
		var g = a.fn.remove;
		a.fn.remove = function(f, b) {
			return this.each(function() {
				if (!b)
					if (!f || a.filter(f, [ this ]).length)
						a("*", this).add([ this ]).each(function() {
							a(this).triggerHandler("remove")
						});
				return g.call(a(this), f, b)
			})
		}
	}
	a.widget = function(f, b, e) {
		var h = f.split(".")[0], j;
		f = f.split(".")[1];
		j = h + "-" + f;
		if (!e) {
			e = b;
			b = a.Widget
		}
		a.expr[":"][j] = function(k) {
			return !!a.data(k, f)
		};
		a[h] = a[h] || {};
		a[h][f] = function(k, p) {
			arguments.length && this._createWidget(k, p)
		};
		b = new b;
		b.options = a.extend(true, {}, b.options);
		a[h][f].prototype = a.extend(true, b, {
			namespace : h,
			widgetName : f,
			widgetEventPrefix : a[h][f].prototype.widgetEventPrefix || f,
			widgetBaseClass : j
		}, e);
		a.widget.bridge(f, a[h][f])
	};
	a.widget.bridge = function(f, b) {
		a.fn[f] = function(e) {
			var h = typeof e === "string", j = Array.prototype.slice.call(
					arguments, 1), k = this;
			e = !h && j.length ? a.extend.apply(null, [ true, e ].concat(j))
					: e;
			if (h && e.charAt(0) === "_")
				return k;
			h ? this.each(function() {
				var p = a.data(this, f), s = p && a.isFunction(p[e]) ? p[e]
						.apply(p, j) : p;
				if (s !== p && s !== c) {
					k = s;
					return false
				}
			}) : this.each(function() {
				var p = a.data(this, f);
				p ? p.option(e || {})._init() : a.data(this, f, new b(e, this))
			});
			return k
		}
	};
	a.Widget = function(f, b) {
		arguments.length && this._createWidget(f, b)
	};
	a.Widget.prototype = {
		widgetName : "widget",
		widgetEventPrefix : "",
		options : {
			disabled : false
		},
		_createWidget : function(f, b) {
			a.data(b, this.widgetName, this);
			this.element = a(b);
			this.options = a.extend(true, {}, this.options, this
					._getCreateOptions(), f);
			var e = this;
			this.element.bind("remove." + this.widgetName, function() {
				e.destroy()
			});
			this._create();
			this._trigger("create");
			this._init()
		},
		_getCreateOptions : function() {
			return a.metadata
					&& a.metadata.get(this.element[0])[this.widgetName]
		},
		_create : function() {
		},
		_init : function() {
		},
		destroy : function() {
			this.element.unbind("." + this.widgetName).removeData(
					this.widgetName);
			this.widget().unbind("." + this.widgetName).removeAttr(
					"aria-disabled").removeClass(
					this.widgetBaseClass + "-disabled ui-state-disabled")
		},
		widget : function() {
			return this.element
		},
		option : function(f, b) {
			var e = f;
			if (arguments.length === 0)
				return a.extend({}, this.options);
			if (typeof f === "string") {
				if (b === c)
					return this.options[f];
				e = {};
				e[f] = b
			}
			this._setOptions(e);
			return this
		},
		_setOptions : function(f) {
			var b = this;
			a.each(f, function(e, h) {
				b._setOption(e, h)
			});
			return this
		},
		_setOption : function(f, b) {
			this.options[f] = b;
			if (f === "disabled")
				this.widget()[b ? "addClass" : "removeClass"](
						this.widgetBaseClass + "-disabled ui-state-disabled")
						.attr("aria-disabled", b);
			return this
		},
		enable : function() {
			return this._setOption("disabled", false)
		},
		disable : function() {
			return this._setOption("disabled", true)
		},
		_trigger : function(f, b, e) {
			var h = this.options[f];
			b = a.Event(b);
			b.type = (f === this.widgetEventPrefix ? f : this.widgetEventPrefix
					+ f).toLowerCase();
			e = e || {};
			if (b.originalEvent) {
				f = a.event.props.length;
				for ( var j; f;) {
					j = a.event.props[--f];
					b[j] = b.originalEvent[j]
				}
			}
			this.element.trigger(b, e);
			return !(a.isFunction(h) && h.call(this.element[0], b, e) === false || b
					.isDefaultPrevented())
		}
	}
})(jQuery);
(function(a) {
	a
			.widget(
					"ui.mouse",
					{
						options : {
							cancel : ":input,option",
							distance : 1,
							delay : 0
						},
						_mouseInit : function() {
							var c = this;
							this.element
									.bind("mousedown." + this.widgetName,
											function(d) {
												return c._mouseDown(d)
											})
									.bind(
											"click." + this.widgetName,
											function(d) {
												if (true === a
														.data(
																d.target,
																c.widgetName
																		+ ".preventClickEvent")) {
													a
															.removeData(
																	d.target,
																	c.widgetName
																			+ ".preventClickEvent");
													d
															.stopImmediatePropagation();
													return false
												}
											});
							this.started = false
						},
						_mouseDestroy : function() {
							this.element.unbind("." + this.widgetName)
						},
						_mouseDown : function(c) {
							c.originalEvent = c.originalEvent || {};
							if (!c.originalEvent.mouseHandled) {
								this._mouseStarted && this._mouseUp(c);
								this._mouseDownEvent = c;
								var d = this, g = c.which == 1, f = typeof this.options.cancel == "string" ? a(
										c.target).parents().add(c.target)
										.filter(this.options.cancel).length
										: false;
								if (!g || f || !this._mouseCapture(c))
									return true;
								this.mouseDelayMet = !this.options.delay;
								if (!this.mouseDelayMet)
									this._mouseDelayTimer = setTimeout(
											function() {
												d.mouseDelayMet = true
											}, this.options.delay);
								if (this._mouseDistanceMet(c)
										&& this._mouseDelayMet(c)) {
									this._mouseStarted = this._mouseStart(c) !== false;
									if (!this._mouseStarted) {
										c.preventDefault();
										return true
									}
								}
								true === a.data(c.target, this.widgetName
										+ ".preventClickEvent")
										&& a.removeData(c.target,
												this.widgetName
														+ ".preventClickEvent");
								this._mouseMoveDelegate = function(b) {
									return d._mouseMove(b)
								};
								this._mouseUpDelegate = function(b) {
									return d._mouseUp(b)
								};
								a(document).bind(
										"mousemove." + this.widgetName,
										this._mouseMoveDelegate).bind(
										"mouseup." + this.widgetName,
										this._mouseUpDelegate);
								c.preventDefault();
								return c.originalEvent.mouseHandled = true
							}
						},
						_mouseMove : function(c) {
							if (a.browser.msie && !(document.documentMode >= 9)
									&& !c.button)
								return this._mouseUp(c);
							if (this._mouseStarted) {
								this._mouseDrag(c);
								return c.preventDefault()
							}
							if (this._mouseDistanceMet(c)
									&& this._mouseDelayMet(c))
								(this._mouseStarted = this._mouseStart(
										this._mouseDownEvent, c) !== false) ? this
										._mouseDrag(c)
										: this._mouseUp(c);
							return !this._mouseStarted
						},
						_mouseUp : function(c) {
							a(document).unbind("mousemove." + this.widgetName,
									this._mouseMoveDelegate).unbind(
									"mouseup." + this.widgetName,
									this._mouseUpDelegate);
							if (this._mouseStarted) {
								this._mouseStarted = false;
								c.target == this._mouseDownEvent.target
										&& a.data(c.target, this.widgetName
												+ ".preventClickEvent", true);
								this._mouseStop(c)
							}
							return false
						},
						_mouseDistanceMet : function(c) {
							return Math.max(Math.abs(this._mouseDownEvent.pageX
									- c.pageX), Math
									.abs(this._mouseDownEvent.pageY - c.pageY)) >= this.options.distance
						},
						_mouseDelayMet : function() {
							return this.mouseDelayMet
						},
						_mouseStart : function() {
						},
						_mouseDrag : function() {
						},
						_mouseStop : function() {
						},
						_mouseCapture : function() {
							return true
						}
					})
})(jQuery);
(function(a) {
	a.ui = a.ui || {};
	var c = /left|center|right/, d = /top|center|bottom/, g = a.fn.position, f = a.fn.offset;
	a.fn.position = function(b) {
		if (!b || !b.of)
			return g.apply(this, arguments);
		b = a.extend({}, b);
		var e = a(b.of), h = e[0], j = (b.collision || "flip").split(" "), k = b.offset ? b.offset
				.split(" ")
				: [ 0, 0 ], p, s, o;
		if (h.nodeType === 9) {
			p = e.width();
			s = e.height();
			o = {
				top : 0,
				left : 0
			}
		} else if (h.setTimeout) {
			p = e.width();
			s = e.height();
			o = {
				top : e.scrollTop(),
				left : e.scrollLeft()
			}
		} else if (h.preventDefault) {
			b.at = "left top";
			p = s = 0;
			o = {
				top : b.of.pageY,
				left : b.of.pageX
			}
		} else {
			p = e.outerWidth();
			s = e.outerHeight();
			o = e.offset()
		}
		a.each([ "my", "at" ], function() {
			var l = (b[this] || "").split(" ");
			if (l.length === 1)
				l = c.test(l[0]) ? l.concat([ "center" ])
						: d.test(l[0]) ? [ "center" ].concat(l) : [ "center",
								"center" ];
			l[0] = c.test(l[0]) ? l[0] : "center";
			l[1] = d.test(l[1]) ? l[1] : "center";
			b[this] = l
		});
		if (j.length === 1)
			j[1] = j[0];
		k[0] = parseInt(k[0], 10) || 0;
		if (k.length === 1)
			k[1] = k[0];
		k[1] = parseInt(k[1], 10) || 0;
		if (b.at[0] === "right")
			o.left += p;
		else if (b.at[0] === "center")
			o.left += p / 2;
		if (b.at[1] === "bottom")
			o.top += s;
		else if (b.at[1] === "center")
			o.top += s / 2;
		o.left += k[0];
		o.top += k[1];
		return this
				.each(function() {
					var l = a(this), q = l.outerWidth(), u = l.outerHeight(), v = parseInt(a
							.curCSS(this, "marginLeft", true)) || 0, z = parseInt(a
							.curCSS(this, "marginTop", true)) || 0, B = q
							+ v
							+ (parseInt(a.curCSS(this, "marginRight", true)) || 0), F = u
							+ z
							+ (parseInt(a.curCSS(this, "marginBottom", true)) || 0), n = a
							.extend({}, o), m;
					if (b.my[0] === "right")
						n.left -= q;
					else if (b.my[0] === "center")
						n.left -= q / 2;
					if (b.my[1] === "bottom")
						n.top -= u;
					else if (b.my[1] === "center")
						n.top -= u / 2;
					n.left = Math.round(n.left);
					n.top = Math.round(n.top);
					m = {
						left : n.left - v,
						top : n.top - z
					};
					a.each([ "left", "top" ], function(y, A) {
						a.ui.position[j[y]] && a.ui.position[j[y]][A](n, {
							targetWidth : p,
							targetHeight : s,
							elemWidth : q,
							elemHeight : u,
							collisionPosition : m,
							collisionWidth : B,
							collisionHeight : F,
							offset : k,
							my : b.my,
							at : b.at
						})
					});
					a.fn.bgiframe && l.bgiframe();
					l.offset(a.extend(n, {
						using : b.using
					}))
				})
	};
	a.ui.position = {
		fit : {
			left : function(b, e) {
				var h = a(window);
				h = e.collisionPosition.left + e.collisionWidth - h.width()
						- h.scrollLeft();
				b.left = h > 0 ? b.left - h : Math.max(b.left
						- e.collisionPosition.left, b.left)
			},
			top : function(b, e) {
				var h = a(window);
				h = e.collisionPosition.top + e.collisionHeight - h.height()
						- h.scrollTop();
				b.top = h > 0 ? b.top - h : Math.max(b.top
						- e.collisionPosition.top, b.top)
			}
		},
		flip : {
			left : function(b, e) {
				if (e.at[0] !== "center") {
					var h = a(window);
					h = e.collisionPosition.left + e.collisionWidth - h.width()
							- h.scrollLeft();
					var j = e.my[0] === "left" ? -e.elemWidth
							: e.my[0] === "right" ? e.elemWidth : 0, k = e.at[0] === "left" ? e.targetWidth
							: -e.targetWidth, p = -2 * e.offset[0];
					b.left += e.collisionPosition.left < 0 ? j + k + p
							: h > 0 ? j + k + p : 0
				}
			},
			top : function(b, e) {
				if (e.at[1] !== "center") {
					var h = a(window);
					h = e.collisionPosition.top + e.collisionHeight
							- h.height() - h.scrollTop();
					var j = e.my[1] === "top" ? -e.elemHeight
							: e.my[1] === "bottom" ? e.elemHeight : 0, k = e.at[1] === "top" ? e.targetHeight
							: -e.targetHeight, p = -2 * e.offset[1];
					b.top += e.collisionPosition.top < 0 ? j + k + p
							: h > 0 ? j + k + p : 0
				}
			}
		}
	};
	if (!a.offset.setOffset) {
		a.offset.setOffset = function(b, e) {
			if (/static/.test(a.curCSS(b, "position")))
				b.style.position = "relative";
			var h = a(b), j = h.offset(), k = parseInt(
					a.curCSS(b, "top", true), 10) || 0, p = parseInt(a.curCSS(
					b, "left", true), 10) || 0;
			j = {
				top : e.top - j.top + k,
				left : e.left - j.left + p
			};
			"using" in e ? e.using.call(b, j) : h.css(j)
		};
		a.fn.offset = function(b) {
			var e = this[0];
			if (!e || !e.ownerDocument)
				return null;
			if (b)
				return this.each(function() {
					a.offset.setOffset(this, b)
				});
			return f.call(this)
		}
	}
})(jQuery);
(function(a) {
	a
			.widget(
					"ui.draggable",
					a.ui.mouse,
					{
						widgetEventPrefix : "drag",
						options : {
							addClasses : true,
							appendTo : "parent",
							axis : false,
							connectToSortable : false,
							containment : false,
							cursor : "auto",
							cursorAt : false,
							grid : false,
							handle : false,
							helper : "original",
							iframeFix : false,
							opacity : false,
							refreshPositions : false,
							revert : false,
							revertDuration : 500,
							scope : "default",
							scroll : true,
							scrollSensitivity : 20,
							scrollSpeed : 20,
							snap : false,
							snapMode : "both",
							snapTolerance : 20,
							stack : false,
							zIndex : false
						},
						_create : function() {
							if (this.options.helper == "original"
									&& !/^(?:r|a|f)/.test(this.element
											.css("position")))
								this.element[0].style.position = "relative";
							this.options.addClasses
									&& this.element.addClass("ui-draggable");
							this.options.disabled
									&& this.element
											.addClass("ui-draggable-disabled");
							this._mouseInit()
						},
						destroy : function() {
							if (this.element.data("draggable")) {
								this.element
										.removeData("draggable")
										.unbind(".draggable")
										.removeClass(
												"ui-draggable ui-draggable-dragging ui-draggable-disabled");
								this._mouseDestroy();
								return this
							}
						},
						_mouseCapture : function(c) {
							var d = this.options;
							if (this.helper || d.disabled
									|| a(c.target).is(".ui-resizable-handle"))
								return false;
							this.handle = this._getHandle(c);
							if (!this.handle)
								return false;
							return true
						},
						_mouseStart : function(c) {
							var d = this.options;
							this.helper = this._createHelper(c);
							this._cacheHelperProportions();
							if (a.ui.ddmanager)
								a.ui.ddmanager.current = this;
							this._cacheMargins();
							this.cssPosition = this.helper.css("position");
							this.scrollParent = this.helper.scrollParent();
							this.offset = this.positionAbs = this.element
									.offset();
							this.offset = {
								top : this.offset.top - this.margins.top,
								left : this.offset.left - this.margins.left
							};
							a.extend(this.offset, {
								click : {
									left : c.pageX - this.offset.left,
									top : c.pageY - this.offset.top
								},
								parent : this._getParentOffset(),
								relative : this._getRelativeOffset()
							});
							this.originalPosition = this.position = this
									._generatePosition(c);
							this.originalPageX = c.pageX;
							this.originalPageY = c.pageY;
							d.cursorAt
									&& this._adjustOffsetFromHelper(d.cursorAt);
							d.containment && this._setContainment();
							if (this._trigger("start", c) === false) {
								this._clear();
								return false
							}
							this._cacheHelperProportions();
							a.ui.ddmanager && !d.dropBehaviour
									&& a.ui.ddmanager.prepareOffsets(this, c);
							this.helper.addClass("ui-draggable-dragging");
							this._mouseDrag(c, true);
							return true
						},
						_mouseDrag : function(c, d) {
							this.position = this._generatePosition(c);
							this.positionAbs = this
									._convertPositionTo("absolute");
							if (!d) {
								d = this._uiHash();
								if (this._trigger("drag", c, d) === false) {
									this._mouseUp({});
									return false
								}
								this.position = d.position
							}
							if (!this.options.axis || this.options.axis != "y")
								this.helper[0].style.left = this.position.left
										+ "px";
							if (!this.options.axis || this.options.axis != "x")
								this.helper[0].style.top = this.position.top
										+ "px";
							a.ui.ddmanager && a.ui.ddmanager.drag(this, c);
							return false
						},
						_mouseStop : function(c) {
							var d = false;
							if (a.ui.ddmanager && !this.options.dropBehaviour)
								d = a.ui.ddmanager.drop(this, c);
							if (this.dropped) {
								d = this.dropped;
								this.dropped = false
							}
							if ((!this.element[0] || !this.element[0].parentNode)
									&& this.options.helper == "original")
								return false;
							if (this.options.revert == "invalid"
									&& !d
									|| this.options.revert == "valid"
									&& d
									|| this.options.revert === true
									|| a.isFunction(this.options.revert)
									&& this.options.revert
											.call(this.element, d)) {
								var g = this;
								a(this.helper).animate(
										this.originalPosition,
										parseInt(this.options.revertDuration,
												10),
										function() {
											g._trigger("stop", c) !== false
													&& g._clear()
										})
							} else
								this._trigger("stop", c) !== false
										&& this._clear();
							return false
						},
						cancel : function() {
							this.helper.is(".ui-draggable-dragging") ? this
									._mouseUp({}) : this._clear();
							return this
						},
						_getHandle : function(c) {
							var d = !this.options.handle
									|| !a(this.options.handle, this.element).length ? true
									: false;
							a(this.options.handle, this.element).find("*")
									.andSelf().each(function() {
										if (this == c.target)
											d = true
									});
							return d
						},
						_createHelper : function(c) {
							var d = this.options;
							c = a.isFunction(d.helper) ? a(d.helper.apply(
									this.element[0], [ c ]))
									: d.helper == "clone" ? this.element
											.clone() : this.element;
							c.parents("body").length
									|| c
											.appendTo(d.appendTo == "parent" ? this.element[0].parentNode
													: d.appendTo);
							c[0] != this.element[0]
									&& !/(fixed|absolute)/.test(c
											.css("position"))
									&& c.css("position", "absolute");
							return c
						},
						_adjustOffsetFromHelper : function(c) {
							if (typeof c == "string")
								c = c.split(" ");
							if (a.isArray(c))
								c = {
									left : +c[0],
									top : +c[1] || 0
								};
							if ("left" in c)
								this.offset.click.left = c.left
										+ this.margins.left;
							if ("right" in c)
								this.offset.click.left = this.helperProportions.width
										- c.right + this.margins.left;
							if ("top" in c)
								this.offset.click.top = c.top
										+ this.margins.top;
							if ("bottom" in c)
								this.offset.click.top = this.helperProportions.height
										- c.bottom + this.margins.top
						},
						_getParentOffset : function() {
							this.offsetParent = this.helper.offsetParent();
							var c = this.offsetParent.offset();
							if (this.cssPosition == "absolute"
									&& this.scrollParent[0] != document
									&& a.ui.contains(this.scrollParent[0],
											this.offsetParent[0])) {
								c.left += this.scrollParent.scrollLeft();
								c.top += this.scrollParent.scrollTop()
							}
							if (this.offsetParent[0] == document.body
									|| this.offsetParent[0].tagName
									&& this.offsetParent[0].tagName
											.toLowerCase() == "html"
									&& a.browser.msie)
								c = {
									top : 0,
									left : 0
								};
							return {
								top : c.top
										+ (parseInt(this.offsetParent
												.css("borderTopWidth"), 10) || 0),
								left : c.left
										+ (parseInt(this.offsetParent
												.css("borderLeftWidth"), 10) || 0)
							}
						},
						_getRelativeOffset : function() {
							if (this.cssPosition == "relative") {
								var c = this.element.position();
								return {
									top : c.top
											- (parseInt(this.helper.css("top"),
													10) || 0)
											+ this.scrollParent.scrollTop(),
									left : c.left
											- (parseInt(
													this.helper.css("left"), 10) || 0)
											+ this.scrollParent.scrollLeft()
								}
							} else
								return {
									top : 0,
									left : 0
								}
						},
						_cacheMargins : function() {
							this.margins = {
								left : parseInt(this.element.css("marginLeft"),
										10) || 0,
								top : parseInt(this.element.css("marginTop"),
										10) || 0,
								right : parseInt(this.element
										.css("marginRight"), 10) || 0,
								bottom : parseInt(this.element
										.css("marginBottom"), 10) || 0
							}
						},
						_cacheHelperProportions : function() {
							this.helperProportions = {
								width : this.helper.outerWidth(),
								height : this.helper.outerHeight()
							}
						},
						_setContainment : function() {
							var c = this.options;
							if (c.containment == "parent")
								c.containment = this.helper[0].parentNode;
							if (c.containment == "document"
									|| c.containment == "window")
								this.containment = [
										(c.containment == "document" ? 0 : a(
												window).scrollLeft())
												- this.offset.relative.left
												- this.offset.parent.left,
										(c.containment == "document" ? 0 : a(
												window).scrollTop())
												- this.offset.relative.top
												- this.offset.parent.top,
										(c.containment == "document" ? 0 : a(
												window).scrollLeft())
												+ a(
														c.containment == "document" ? document
																: window)
														.width()
												- this.helperProportions.width
												- this.margins.left,
										(c.containment == "document" ? 0 : a(
												window).scrollTop())
												+ (a(
														c.containment == "document" ? document
																: window)
														.height() || document.body.parentNode.scrollHeight)
												- this.helperProportions.height
												- this.margins.top ];
							if (!/^(document|window|parent)$/
									.test(c.containment)
									&& c.containment.constructor != Array) {
								var d = a(c.containment)[0];
								if (d) {
									c = a(c.containment).offset();
									var g = a(d).css("overflow") != "hidden";
									this.containment = [
											c.left
													+ (parseInt(a(d).css(
															"borderLeftWidth"),
															10) || 0)
													+ (parseInt(a(d).css(
															"paddingLeft"), 10) || 0),
											c.top
													+ (parseInt(a(d).css(
															"borderTopWidth"),
															10) || 0)
													+ (parseInt(a(d).css(
															"paddingTop"), 10) || 0),
											c.left
													+ (g ? Math.max(
															d.scrollWidth,
															d.offsetWidth)
															: d.offsetWidth)
													- (parseInt(a(d).css(
															"borderLeftWidth"),
															10) || 0)
													- (parseInt(a(d).css(
															"paddingRight"), 10) || 0)
													- this.helperProportions.width
													- this.margins.left
													- this.margins.right,
											c.top
													+ (g ? Math.max(
															d.scrollHeight,
															d.offsetHeight)
															: d.offsetHeight)
													- (parseInt(a(d).css(
															"borderTopWidth"),
															10) || 0)
													- (parseInt(a(d).css(
															"paddingBottom"),
															10) || 0)
													- this.helperProportions.height
													- this.margins.top
													- this.margins.bottom ]
								}
							} else if (c.containment.constructor == Array)
								this.containment = c.containment
						},
						_convertPositionTo : function(c, d) {
							if (!d)
								d = this.position;
							c = c == "absolute" ? 1 : -1;
							var g = this.cssPosition == "absolute"
									&& !(this.scrollParent[0] != document && a.ui
											.contains(this.scrollParent[0],
													this.offsetParent[0])) ? this.offsetParent
									: this.scrollParent, f = /(html|body)/i
									.test(g[0].tagName);
							return {
								top : d.top
										+ this.offset.relative.top
										* c
										+ this.offset.parent.top
										* c
										- (a.browser.safari
												&& a.browser.version < 526
												&& this.cssPosition == "fixed" ? 0
												: (this.cssPosition == "fixed" ? -this.scrollParent
														.scrollTop()
														: f ? 0 : g.scrollTop())
														* c),
								left : d.left
										+ this.offset.relative.left
										* c
										+ this.offset.parent.left
										* c
										- (a.browser.safari
												&& a.browser.version < 526
												&& this.cssPosition == "fixed" ? 0
												: (this.cssPosition == "fixed" ? -this.scrollParent
														.scrollLeft()
														: f ? 0 : g
																.scrollLeft())
														* c)
							}
						},
						_generatePosition : function(c) {
							var d = this.options, g = this.cssPosition == "absolute"
									&& !(this.scrollParent[0] != document && a.ui
											.contains(this.scrollParent[0],
													this.offsetParent[0])) ? this.offsetParent
									: this.scrollParent, f = /(html|body)/i
									.test(g[0].tagName), b = c.pageX, e = c.pageY;
							if (this.originalPosition) {
								if (this.containment) {
									if (c.pageX - this.offset.click.left < this.containment[0])
										b = this.containment[0]
												+ this.offset.click.left;
									if (c.pageY - this.offset.click.top < this.containment[1])
										e = this.containment[1]
												+ this.offset.click.top;
									if (c.pageX - this.offset.click.left > this.containment[2])
										b = this.containment[2]
												+ this.offset.click.left;
									if (c.pageY - this.offset.click.top > this.containment[3])
										e = this.containment[3]
												+ this.offset.click.top
								}
								if (d.grid) {
									e = this.originalPageY
											+ Math
													.round((e - this.originalPageY)
															/ d.grid[1])
											* d.grid[1];
									e = this.containment ? !(e
											- this.offset.click.top < this.containment[1] || e
											- this.offset.click.top > this.containment[3]) ? e
											: !(e - this.offset.click.top < this.containment[1]) ? e
													- d.grid[1]
													: e + d.grid[1]
											: e;
									b = this.originalPageX
											+ Math
													.round((b - this.originalPageX)
															/ d.grid[0])
											* d.grid[0];
									b = this.containment ? !(b
											- this.offset.click.left < this.containment[0] || b
											- this.offset.click.left > this.containment[2]) ? b
											: !(b - this.offset.click.left < this.containment[0]) ? b
													- d.grid[0]
													: b + d.grid[0]
											: b
								}
							}
							return {
								top : e
										- this.offset.click.top
										- this.offset.relative.top
										- this.offset.parent.top
										+ (a.browser.safari
												&& a.browser.version < 526
												&& this.cssPosition == "fixed" ? 0
												: this.cssPosition == "fixed" ? -this.scrollParent
														.scrollTop()
														: f ? 0 : g.scrollTop()),
								left : b
										- this.offset.click.left
										- this.offset.relative.left
										- this.offset.parent.left
										+ (a.browser.safari
												&& a.browser.version < 526
												&& this.cssPosition == "fixed" ? 0
												: this.cssPosition == "fixed" ? -this.scrollParent
														.scrollLeft()
														: f ? 0 : g
																.scrollLeft())
							}
						},
						_clear : function() {
							this.helper.removeClass("ui-draggable-dragging");
							this.helper[0] != this.element[0]
									&& !this.cancelHelperRemoval
									&& this.helper.remove();
							this.helper = null;
							this.cancelHelperRemoval = false
						},
						_trigger : function(c, d, g) {
							g = g || this._uiHash();
							a.ui.plugin.call(this, c, [ d, g ]);
							if (c == "drag")
								this.positionAbs = this
										._convertPositionTo("absolute");
							return a.Widget.prototype._trigger.call(this, c, d,
									g)
						},
						plugins : {},
						_uiHash : function() {
							return {
								helper : this.helper,
								position : this.position,
								originalPosition : this.originalPosition,
								offset : this.positionAbs
							}
						}
					});
	a.extend(a.ui.draggable, {
		version : "1.8.11"
	});
	a.ui.plugin
			.add(
					"draggable",
					"connectToSortable",
					{
						start : function(c, d) {
							var g = a(this).data("draggable"), f = g.options, b = a
									.extend({}, d, {
										item : g.element
									});
							g.sortables = [];
							a(f.connectToSortable).each(function() {
								var e = a.data(this, "sortable");
								if (e && !e.options.disabled) {
									g.sortables.push({
										instance : e,
										shouldRevert : e.options.revert
									});
									e.refreshPositions();
									e._trigger("activate", c, b)
								}
							})
						},
						stop : function(c, d) {
							var g = a(this).data("draggable"), f = a.extend({},
									d, {
										item : g.element
									});
							a
									.each(
											g.sortables,
											function() {
												if (this.instance.isOver) {
													this.instance.isOver = 0;
													g.cancelHelperRemoval = true;
													this.instance.cancelHelperRemoval = false;
													if (this.shouldRevert)
														this.instance.options.revert = true;
													this.instance._mouseStop(c);
													this.instance.options.helper = this.instance.options._helper;
													g.options.helper == "original"
															&& this.instance.currentItem
																	.css({
																		top : "auto",
																		left : "auto"
																	})
												} else {
													this.instance.cancelHelperRemoval = false;
													this.instance._trigger(
															"deactivate", c, f)
												}
											})
						},
						drag : function(c, d) {
							var g = a(this).data("draggable"), f = this;
							a
									.each(
											g.sortables,
											function() {
												this.instance.positionAbs = g.positionAbs;
												this.instance.helperProportions = g.helperProportions;
												this.instance.offset.click = g.offset.click;
												if (this.instance
														._intersectsWith(this.instance.containerCache)) {
													if (!this.instance.isOver) {
														this.instance.isOver = 1;
														this.instance.currentItem = a(
																f)
																.clone()
																.appendTo(
																		this.instance.element)
																.data(
																		"sortable-item",
																		true);
														this.instance.options._helper = this.instance.options.helper;
														this.instance.options.helper = function() {
															return d.helper[0]
														};
														c.target = this.instance.currentItem[0];
														this.instance
																._mouseCapture(
																		c, true);
														this.instance
																._mouseStart(c,
																		true,
																		true);
														this.instance.offset.click.top = g.offset.click.top;
														this.instance.offset.click.left = g.offset.click.left;
														this.instance.offset.parent.left -= g.offset.parent.left
																- this.instance.offset.parent.left;
														this.instance.offset.parent.top -= g.offset.parent.top
																- this.instance.offset.parent.top;
														g
																._trigger(
																		"toSortable",
																		c);
														g.dropped = this.instance.element;
														g.currentItem = g.element;
														this.instance.fromOutside = g
													}
													this.instance.currentItem
															&& this.instance
																	._mouseDrag(c)
												} else if (this.instance.isOver) {
													this.instance.isOver = 0;
													this.instance.cancelHelperRemoval = true;
													this.instance.options.revert = false;
													this.instance
															._trigger(
																	"out",
																	c,
																	this.instance
																			._uiHash(this.instance));
													this.instance._mouseStop(c,
															true);
													this.instance.options.helper = this.instance.options._helper;
													this.instance.currentItem
															.remove();
													this.instance.placeholder
															&& this.instance.placeholder
																	.remove();
													g._trigger("fromSortable",
															c);
													g.dropped = false
												}
											})
						}
					});
	a.ui.plugin.add("draggable", "cursor", {
		start : function() {
			var c = a("body"), d = a(this).data("draggable").options;
			if (c.css("cursor"))
				d._cursor = c.css("cursor");
			c.css("cursor", d.cursor)
		},
		stop : function() {
			var c = a(this).data("draggable").options;
			c._cursor && a("body").css("cursor", c._cursor)
		}
	});
	a.ui.plugin
			.add(
					"draggable",
					"iframeFix",
					{
						start : function() {
							var c = a(this).data("draggable").options;
							a(c.iframeFix === true ? "iframe" : c.iframeFix)
									.each(
											function() {
												a(
														'<div class="ui-draggable-iframeFix" style="background: #fff;"></div>')
														.css(
																{
																	width : this.offsetWidth
																			+ "px",
																	height : this.offsetHeight
																			+ "px",
																	position : "absolute",
																	opacity : "0.001",
																	zIndex : 1E3
																})
														.css(a(this).offset())
														.appendTo("body")
											})
						},
						stop : function() {
							a("div.ui-draggable-iframeFix").each(function() {
								this.parentNode.removeChild(this)
							})
						}
					});
	a.ui.plugin.add("draggable", "opacity", {
		start : function(c, d) {
			c = a(d.helper);
			d = a(this).data("draggable").options;
			if (c.css("opacity"))
				d._opacity = c.css("opacity");
			c.css("opacity", d.opacity)
		},
		stop : function(c, d) {
			c = a(this).data("draggable").options;
			c._opacity && a(d.helper).css("opacity", c._opacity)
		}
	});
	a.ui.plugin
			.add(
					"draggable",
					"scroll",
					{
						start : function() {
							var c = a(this).data("draggable");
							if (c.scrollParent[0] != document
									&& c.scrollParent[0].tagName != "HTML")
								c.overflowOffset = c.scrollParent.offset()
						},
						drag : function(c) {
							var d = a(this).data("draggable"), g = d.options, f = false;
							if (d.scrollParent[0] != document
									&& d.scrollParent[0].tagName != "HTML") {
								if (!g.axis || g.axis != "x")
									if (d.overflowOffset.top
											+ d.scrollParent[0].offsetHeight
											- c.pageY < g.scrollSensitivity)
										d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop
												+ g.scrollSpeed;
									else if (c.pageY - d.overflowOffset.top < g.scrollSensitivity)
										d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop
												- g.scrollSpeed;
								if (!g.axis || g.axis != "y")
									if (d.overflowOffset.left
											+ d.scrollParent[0].offsetWidth
											- c.pageX < g.scrollSensitivity)
										d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft
												+ g.scrollSpeed;
									else if (c.pageX - d.overflowOffset.left < g.scrollSensitivity)
										d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft
												- g.scrollSpeed
							} else {
								if (!g.axis || g.axis != "x")
									if (c.pageY - a(document).scrollTop() < g.scrollSensitivity)
										f = a(document).scrollTop(
												a(document).scrollTop()
														- g.scrollSpeed);
									else if (a(window).height()
											- (c.pageY - a(document)
													.scrollTop()) < g.scrollSensitivity)
										f = a(document).scrollTop(
												a(document).scrollTop()
														+ g.scrollSpeed);
								if (!g.axis || g.axis != "y")
									if (c.pageX - a(document).scrollLeft() < g.scrollSensitivity)
										f = a(document).scrollLeft(
												a(document).scrollLeft()
														- g.scrollSpeed);
									else if (a(window).width()
											- (c.pageX - a(document)
													.scrollLeft()) < g.scrollSensitivity)
										f = a(document).scrollLeft(
												a(document).scrollLeft()
														+ g.scrollSpeed)
							}
							f !== false && a.ui.ddmanager && !g.dropBehaviour
									&& a.ui.ddmanager.prepareOffsets(d, c)
						}
					});
	a.ui.plugin
			.add(
					"draggable",
					"snap",
					{
						start : function() {
							var c = a(this).data("draggable"), d = c.options;
							c.snapElements = [];
							a(
									d.snap.constructor != String ? d.snap.items
											|| ":data(draggable)" : d.snap)
									.each(
											function() {
												var g = a(this), f = g.offset();
												this != c.element[0]
														&& c.snapElements
																.push({
																	item : this,
																	width : g
																			.outerWidth(),
																	height : g
																			.outerHeight(),
																	top : f.top,
																	left : f.left
																})
											})
						},
						drag : function(c, d) {
							for ( var g = a(this).data("draggable"), f = g.options, b = f.snapTolerance, e = d.offset.left, h = e
									+ g.helperProportions.width, j = d.offset.top, k = j
									+ g.helperProportions.height, p = g.snapElements.length - 1; p >= 0; p--) {
								var s = g.snapElements[p].left, o = s
										+ g.snapElements[p].width, l = g.snapElements[p].top, q = l
										+ g.snapElements[p].height;
								if (s - b < e && e < o + b && l - b < j
										&& j < q + b || s - b < e && e < o + b
										&& l - b < k && k < q + b || s - b < h
										&& h < o + b && l - b < j && j < q + b
										|| s - b < h && h < o + b && l - b < k
										&& k < q + b) {
									if (f.snapMode != "inner") {
										var u = Math.abs(l - k) <= b, v = Math
												.abs(q - j) <= b, z = Math
												.abs(s - h) <= b, B = Math
												.abs(o - e) <= b;
										if (u)
											d.position.top = g
													._convertPositionTo(
															"relative",
															{
																top : l
																		- g.helperProportions.height,
																left : 0
															}).top
													- g.margins.top;
										if (v)
											d.position.top = g
													._convertPositionTo(
															"relative", {
																top : q,
																left : 0
															}).top
													- g.margins.top;
										if (z)
											d.position.left = g
													._convertPositionTo(
															"relative",
															{
																top : 0,
																left : s
																		- g.helperProportions.width
															}).left
													- g.margins.left;
										if (B)
											d.position.left = g
													._convertPositionTo(
															"relative", {
																top : 0,
																left : o
															}).left
													- g.margins.left
									}
									var F = u || v || z || B;
									if (f.snapMode != "outer") {
										u = Math.abs(l - j) <= b;
										v = Math.abs(q - k) <= b;
										z = Math.abs(s - e) <= b;
										B = Math.abs(o - h) <= b;
										if (u)
											d.position.top = g
													._convertPositionTo(
															"relative", {
																top : l,
																left : 0
															}).top
													- g.margins.top;
										if (v)
											d.position.top = g
													._convertPositionTo(
															"relative",
															{
																top : q
																		- g.helperProportions.height,
																left : 0
															}).top
													- g.margins.top;
										if (z)
											d.position.left = g
													._convertPositionTo(
															"relative", {
																top : 0,
																left : s
															}).left
													- g.margins.left;
										if (B)
											d.position.left = g
													._convertPositionTo(
															"relative",
															{
																top : 0,
																left : o
																		- g.helperProportions.width
															}).left
													- g.margins.left
									}
									if (!g.snapElements[p].snapping
											&& (u || v || z || B || F))
										g.options.snap.snap
												&& g.options.snap.snap
														.call(
																g.element,
																c,
																a
																		.extend(
																				g
																						._uiHash(),
																				{
																					snapItem : g.snapElements[p].item
																				}));
									g.snapElements[p].snapping = u || v || z
											|| B || F
								} else {
									g.snapElements[p].snapping
											&& g.options.snap.release
											&& g.options.snap.release
													.call(
															g.element,
															c,
															a
																	.extend(
																			g
																					._uiHash(),
																			{
																				snapItem : g.snapElements[p].item
																			}));
									g.snapElements[p].snapping = false
								}
							}
						}
					});
	a.ui.plugin.add("draggable", "stack", {
		start : function() {
			var c = a(this).data("draggable").options;
			c = a.makeArray(a(c.stack)).sort(
					function(g, f) {
						return (parseInt(a(g).css("zIndex"), 10) || 0)
								- (parseInt(a(f).css("zIndex"), 10) || 0)
					});
			if (c.length) {
				var d = parseInt(c[0].style.zIndex) || 0;
				a(c).each(function(g) {
					this.style.zIndex = d + g
				});
				this[0].style.zIndex = d + c.length
			}
		}
	});
	a.ui.plugin.add("draggable", "zIndex", {
		start : function(c, d) {
			c = a(d.helper);
			d = a(this).data("draggable").options;
			if (c.css("zIndex"))
				d._zIndex = c.css("zIndex");
			c.css("zIndex", d.zIndex)
		},
		stop : function(c, d) {
			c = a(this).data("draggable").options;
			c._zIndex && a(d.helper).css("zIndex", c._zIndex)
		}
	})
})(jQuery);
(function(a) {
	a
			.widget(
					"ui.droppable",
					{
						widgetEventPrefix : "drop",
						options : {
							accept : "*",
							activeClass : false,
							addClasses : true,
							greedy : false,
							hoverClass : false,
							scope : "default",
							tolerance : "intersect"
						},
						_create : function() {
							var c = this.options, d = c.accept;
							this.isover = 0;
							this.isout = 1;
							this.accept = a.isFunction(d) ? d : function(g) {
								return g.is(d)
							};
							this.proportions = {
								width : this.element[0].offsetWidth,
								height : this.element[0].offsetHeight
							};
							a.ui.ddmanager.droppables[c.scope] = a.ui.ddmanager.droppables[c.scope]
									|| [];
							a.ui.ddmanager.droppables[c.scope].push(this);
							c.addClasses
									&& this.element.addClass("ui-droppable")
						},
						destroy : function() {
							for ( var c = a.ui.ddmanager.droppables[this.options.scope], d = 0; d < c.length; d++)
								c[d] == this && c.splice(d, 1);
							this.element.removeClass(
									"ui-droppable ui-droppable-disabled")
									.removeData("droppable").unbind(
											".droppable");
							return this
						},
						_setOption : function(c, d) {
							if (c == "accept")
								this.accept = a.isFunction(d) ? d
										: function(g) {
											return g.is(d)
										};
							a.Widget.prototype._setOption
									.apply(this, arguments)
						},
						_activate : function(c) {
							var d = a.ui.ddmanager.current;
							this.options.activeClass
									&& this.element
											.addClass(this.options.activeClass);
							d && this._trigger("activate", c, this.ui(d))
						},
						_deactivate : function(c) {
							var d = a.ui.ddmanager.current;
							this.options.activeClass
									&& this.element
											.removeClass(this.options.activeClass);
							d && this._trigger("deactivate", c, this.ui(d))
						},
						_over : function(c) {
							var d = a.ui.ddmanager.current;
							if (!(!d || (d.currentItem || d.element)[0] == this.element[0]))
								if (this.accept.call(this.element[0],
										d.currentItem || d.element)) {
									this.options.hoverClass
											&& this.element
													.addClass(this.options.hoverClass);
									this._trigger("over", c, this.ui(d))
								}
						},
						_out : function(c) {
							var d = a.ui.ddmanager.current;
							if (!(!d || (d.currentItem || d.element)[0] == this.element[0]))
								if (this.accept.call(this.element[0],
										d.currentItem || d.element)) {
									this.options.hoverClass
											&& this.element
													.removeClass(this.options.hoverClass);
									this._trigger("out", c, this.ui(d))
								}
						},
						_drop : function(c, d) {
							var g = d || a.ui.ddmanager.current;
							if (!g
									|| (g.currentItem || g.element)[0] == this.element[0])
								return false;
							var f = false;
							this.element
									.find(":data(droppable)")
									.not(".ui-draggable-dragging")
									.each(
											function() {
												var b = a.data(this,
														"droppable");
												if (b.options.greedy
														&& !b.options.disabled
														&& b.options.scope == g.options.scope
														&& b.accept
																.call(
																		b.element[0],
																		g.currentItem
																				|| g.element)
														&& a.ui
																.intersect(
																		g,
																		a
																				.extend(
																						b,
																						{
																							offset : b.element
																									.offset()
																						}),
																		b.options.tolerance)) {
													f = true;
													return false
												}
											});
							if (f)
								return false;
							if (this.accept.call(this.element[0], g.currentItem
									|| g.element)) {
								this.options.activeClass
										&& this.element
												.removeClass(this.options.activeClass);
								this.options.hoverClass
										&& this.element
												.removeClass(this.options.hoverClass);
								this._trigger("drop", c, this.ui(g));
								return this.element
							}
							return false
						},
						ui : function(c) {
							return {
								draggable : c.currentItem || c.element,
								helper : c.helper,
								position : c.position,
								offset : c.positionAbs
							}
						}
					});
	a.extend(a.ui.droppable, {
		version : "1.8.11"
	});
	a.ui.intersect = function(c, d, g) {
		if (!d.offset)
			return false;
		var f = (c.positionAbs || c.position.absolute).left, b = f
				+ c.helperProportions.width, e = (c.positionAbs || c.position.absolute).top, h = e
				+ c.helperProportions.height, j = d.offset.left, k = j
				+ d.proportions.width, p = d.offset.top, s = p
				+ d.proportions.height;
		switch (g) {
		case "fit":
			return j <= f && b <= k && p <= e && h <= s;
		case "intersect":
			return j < f + c.helperProportions.width / 2
					&& b - c.helperProportions.width / 2 < k
					&& p < e + c.helperProportions.height / 2
					&& h - c.helperProportions.height / 2 < s;
		case "pointer":
			return a.ui.isOver((c.positionAbs || c.position.absolute).top
					+ (c.clickOffset || c.offset.click).top,
					(c.positionAbs || c.position.absolute).left
							+ (c.clickOffset || c.offset.click).left, p, j,
					d.proportions.height, d.proportions.width);
		case "touch":
			return (e >= p && e <= s || h >= p && h <= s || e < p && h > s)
					&& (f >= j && f <= k || b >= j && b <= k || f < j && b > k);
		default:
			return false
		}
	};
	a.ui.ddmanager = {
		current : null,
		droppables : {
			"default" : []
		},
		prepareOffsets : function(c, d) {
			var g = a.ui.ddmanager.droppables[c.options.scope] || [], f = d ? d.type
					: null, b = (c.currentItem || c.element).find(
					":data(droppable)").andSelf(), e = 0;
			a: for (; e < g.length; e++)
				if (!(g[e].options.disabled || c
						&& !g[e].accept.call(g[e].element[0], c.currentItem
								|| c.element))) {
					for ( var h = 0; h < b.length; h++)
						if (b[h] == g[e].element[0]) {
							g[e].proportions.height = 0;
							continue a
						}
					g[e].visible = g[e].element.css("display") != "none";
					if (g[e].visible) {
						f == "mousedown" && g[e]._activate.call(g[e], d);
						g[e].offset = g[e].element.offset();
						g[e].proportions = {
							width : g[e].element[0].offsetWidth,
							height : g[e].element[0].offsetHeight
						}
					}
				}
		},
		drop : function(c, d) {
			var g = false;
			a.each(a.ui.ddmanager.droppables[c.options.scope] || [],
					function() {
						if (this.options) {
							if (!this.options.disabled
									&& this.visible
									&& a.ui.intersect(c, this,
											this.options.tolerance))
								g = g || this._drop.call(this, d);
							if (!this.options.disabled
									&& this.visible
									&& this.accept.call(this.element[0],
											c.currentItem || c.element)) {
								this.isout = 1;
								this.isover = 0;
								this._deactivate.call(this, d)
							}
						}
					});
			return g
		},
		drag : function(c, d) {
			c.options.refreshPositions && a.ui.ddmanager.prepareOffsets(c, d);
			a
					.each(
							a.ui.ddmanager.droppables[c.options.scope] || [],
							function() {
								if (!(this.options.disabled || this.greedyChild || !this.visible)) {
									var g = a.ui.intersect(c, this,
											this.options.tolerance);
									if (g = !g && this.isover == 1 ? "isout"
											: g && this.isover == 0 ? "isover"
													: null) {
										var f;
										if (this.options.greedy) {
											var b = this.element
													.parents(":data(droppable):eq(0)");
											if (b.length) {
												f = a.data(b[0], "droppable");
												f.greedyChild = g == "isover" ? 1
														: 0
											}
										}
										if (f && g == "isover") {
											f.isover = 0;
											f.isout = 1;
											f._out.call(f, d)
										}
										this[g] = 1;
										this[g == "isout" ? "isover" : "isout"] = 0;
										this[g == "isover" ? "_over" : "_out"]
												.call(this, d);
										if (f && g == "isout") {
											f.isout = 0;
											f.isover = 1;
											f._over.call(f, d)
										}
									}
								}
							})
		}
	}
})(jQuery);
(function(a) {
	a
			.widget(
					"ui.resizable",
					a.ui.mouse,
					{
						widgetEventPrefix : "resize",
						options : {
							alsoResize : false,
							animate : false,
							animateDuration : "slow",
							animateEasing : "swing",
							aspectRatio : false,
							autoHide : false,
							containment : false,
							ghost : false,
							grid : false,
							handles : "e,s,se",
							helper : false,
							maxHeight : null,
							maxWidth : null,
							minHeight : 10,
							minWidth : 10,
							zIndex : 1E3
						},
						_create : function() {
							var g = this, f = this.options;
							this.element.addClass("ui-resizable");
							a.extend(this,
									{
										_aspectRatio : !!f.aspectRatio,
										aspectRatio : f.aspectRatio,
										originalElement : this.element,
										_proportionallyResizeElements : [],
										_helper : f.helper || f.ghost
												|| f.animate ? f.helper
												|| "ui-resizable-helper" : null
									});
							if (this.element[0].nodeName
									.match(/canvas|textarea|input|select|button|img/i)) {
								/relative/.test(this.element.css("position"))
										&& a.browser.opera
										&& this.element.css({
											position : "relative",
											top : "auto",
											left : "auto"
										});
								this.element
										.wrap(a(
												'<div class="ui-wrapper" style="overflow: hidden;"></div>')
												.css(
														{
															position : this.element
																	.css("position"),
															width : this.element
																	.outerWidth(),
															height : this.element
																	.outerHeight(),
															top : this.element
																	.css("top"),
															left : this.element
																	.css("left")
														}));
								this.element = this.element.parent().data(
										"resizable",
										this.element.data("resizable"));
								this.elementIsWrapper = true;
								this.element.css({
									marginLeft : this.originalElement
											.css("marginLeft"),
									marginTop : this.originalElement
											.css("marginTop"),
									marginRight : this.originalElement
											.css("marginRight"),
									marginBottom : this.originalElement
											.css("marginBottom")
								});
								this.originalElement.css({
									marginLeft : 0,
									marginTop : 0,
									marginRight : 0,
									marginBottom : 0
								});
								this.originalResizeStyle = this.originalElement
										.css("resize");
								this.originalElement.css("resize", "none");
								this._proportionallyResizeElements
										.push(this.originalElement.css({
											position : "static",
											zoom : 1,
											display : "block"
										}));
								this.originalElement.css({
									margin : this.originalElement.css("margin")
								});
								this._proportionallyResize()
							}
							this.handles = f.handles
									|| (!a(".ui-resizable-handle", this.element).length ? "e,s,se"
											: {
												n : ".ui-resizable-n",
												e : ".ui-resizable-e",
												s : ".ui-resizable-s",
												w : ".ui-resizable-w",
												se : ".ui-resizable-se",
												sw : ".ui-resizable-sw",
												ne : ".ui-resizable-ne",
												nw : ".ui-resizable-nw"
											});
							if (this.handles.constructor == String) {
								if (this.handles == "all")
									this.handles = "n,e,s,w,se,sw,ne,nw";
								var b = this.handles.split(",");
								this.handles = {};
								for ( var e = 0; e < b.length; e++) {
									var h = a.trim(b[e]), j = a('<div class="ui-resizable-handle '
											+ ("ui-resizable-" + h)
											+ '"></div>');
									/sw|se|ne|nw/.test(h) && j.css({
										zIndex : ++f.zIndex
									});
									"se" == h
											&& j
													.addClass("ui-icon ui-icon-gripsmall-diagonal-se");
									this.handles[h] = ".ui-resizable-" + h;
									this.element.append(j)
								}
							}
							this._renderAxis = function(k) {
								k = k || this.element;
								for ( var p in this.handles) {
									if (this.handles[p].constructor == String)
										this.handles[p] = a(this.handles[p],
												this.element).show();
									if (this.elementIsWrapper
											&& this.originalElement[0].nodeName
													.match(/textarea|input|select|button/i)) {
										var s = a(this.handles[p], this.element), o = 0;
										o = /sw|ne|nw|se|n|s/.test(p) ? s
												.outerHeight() : s.outerWidth();
										s = [
												"padding",
												/ne|nw|n/.test(p) ? "Top"
														: /se|sw|s/.test(p) ? "Bottom"
																: /^e$/.test(p) ? "Right"
																		: "Left" ]
												.join("");
										k.css(s, o);
										this._proportionallyResize()
									}
									a(this.handles[p])
								}
							};
							this._renderAxis(this.element);
							this._handles = a(".ui-resizable-handle",
									this.element).disableSelection();
							this._handles
									.mouseover(function() {
										if (!g.resizing) {
											if (this.className)
												var k = this.className
														.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
											g.axis = k && k[1] ? k[1] : "se"
										}
									});
							if (f.autoHide) {
								this._handles.hide();
								a(this.element)
										.addClass("ui-resizable-autohide")
										.hover(
												function() {
													a(this)
															.removeClass(
																	"ui-resizable-autohide");
													g._handles.show()
												},
												function() {
													if (!g.resizing) {
														a(this)
																.addClass(
																		"ui-resizable-autohide");
														g._handles.hide()
													}
												})
							}
							this._mouseInit()
						},
						destroy : function() {
							this._mouseDestroy();
							var g = function(b) {
								a(b)
										.removeClass(
												"ui-resizable ui-resizable-disabled ui-resizable-resizing")
										.removeData("resizable").unbind(
												".resizable").find(
												".ui-resizable-handle")
										.remove()
							};
							if (this.elementIsWrapper) {
								g(this.element);
								var f = this.element;
								f.after(this.originalElement.css({
									position : f.css("position"),
									width : f.outerWidth(),
									height : f.outerHeight(),
									top : f.css("top"),
									left : f.css("left")
								})).remove()
							}
							this.originalElement.css("resize",
									this.originalResizeStyle);
							g(this.originalElement);
							return this
						},
						_mouseCapture : function(g) {
							var f = false;
							for ( var b in this.handles)
								if (a(this.handles[b])[0] == g.target)
									f = true;
							return !this.options.disabled && f
						},
						_mouseStart : function(g) {
							var f = this.options, b = this.element.position(), e = this.element;
							this.resizing = true;
							this.documentScroll = {
								top : a(document).scrollTop(),
								left : a(document).scrollLeft()
							};
							if (e.is(".ui-draggable")
									|| /absolute/.test(e.css("position")))
								e.css({
									position : "absolute",
									top : b.top,
									left : b.left
								});
							a.browser.opera
									&& /relative/.test(e.css("position"))
									&& e.css({
										position : "relative",
										top : "auto",
										left : "auto"
									});
							this._renderProxy();
							b = c(this.helper.css("left"));
							var h = c(this.helper.css("top"));
							if (f.containment) {
								b += a(f.containment).scrollLeft() || 0;
								h += a(f.containment).scrollTop() || 0
							}
							this.offset = this.helper.offset();
							this.position = {
								left : b,
								top : h
							};
							this.size = this._helper ? {
								width : e.outerWidth(),
								height : e.outerHeight()
							} : {
								width : e.width(),
								height : e.height()
							};
							this.originalSize = this._helper ? {
								width : e.outerWidth(),
								height : e.outerHeight()
							} : {
								width : e.width(),
								height : e.height()
							};
							this.originalPosition = {
								left : b,
								top : h
							};
							this.sizeDiff = {
								width : e.outerWidth() - e.width(),
								height : e.outerHeight() - e.height()
							};
							this.originalMousePosition = {
								left : g.pageX,
								top : g.pageY
							};
							this.aspectRatio = typeof f.aspectRatio == "number" ? f.aspectRatio
									: this.originalSize.width
											/ this.originalSize.height || 1;
							f = a(".ui-resizable-" + this.axis).css("cursor");
							a("body").css("cursor",
									f == "auto" ? this.axis + "-resize" : f);
							e.addClass("ui-resizable-resizing");
							this._propagate("start", g);
							return true
						},
						_mouseDrag : function(g) {
							var f = this.helper, b = this.originalMousePosition, e = this._change[this.axis];
							if (!e)
								return false;
							b = e.apply(this, [ g, g.pageX - b.left || 0,
									g.pageY - b.top || 0 ]);
							if (this._aspectRatio || g.shiftKey)
								b = this._updateRatio(b, g);
							b = this._respectSize(b, g);
							this._propagate("resize", g);
							f.css({
								top : this.position.top + "px",
								left : this.position.left + "px",
								width : this.size.width + "px",
								height : this.size.height + "px"
							});
							!this._helper
									&& this._proportionallyResizeElements.length
									&& this._proportionallyResize();
							this._updateCache(b);
							this._trigger("resize", g, this.ui());
							return false
						},
						_mouseStop : function(g) {
							this.resizing = false;
							var f = this.options, b = this;
							if (this._helper) {
								var e = this._proportionallyResizeElements, h = e.length
										&& /textarea/i.test(e[0].nodeName);
								e = h && a.ui.hasScroll(e[0], "left") ? 0
										: b.sizeDiff.height;
								h = h ? 0 : b.sizeDiff.width;
								h = {
									width : b.helper.width() - h,
									height : b.helper.height() - e
								};
								e = parseInt(b.element.css("left"), 10)
										+ (b.position.left - b.originalPosition.left)
										|| null;
								var j = parseInt(b.element.css("top"), 10)
										+ (b.position.top - b.originalPosition.top)
										|| null;
								f.animate || this.element.css(a.extend(h, {
									top : j,
									left : e
								}));
								b.helper.height(b.size.height);
								b.helper.width(b.size.width);
								this._helper && !f.animate
										&& this._proportionallyResize()
							}
							a("body").css("cursor", "auto");
							this.element.removeClass("ui-resizable-resizing");
							this._propagate("stop", g);
							this._helper && this.helper.remove();
							return false
						},
						_updateCache : function(g) {
							this.offset = this.helper.offset();
							if (d(g.left))
								this.position.left = g.left;
							if (d(g.top))
								this.position.top = g.top;
							if (d(g.height))
								this.size.height = g.height;
							if (d(g.width))
								this.size.width = g.width
						},
						_updateRatio : function(g) {
							var f = this.position, b = this.size, e = this.axis;
							if (g.height)
								g.width = b.height * this.aspectRatio;
							else if (g.width)
								g.height = b.width / this.aspectRatio;
							if (e == "sw") {
								g.left = f.left + (b.width - g.width);
								g.top = null
							}
							if (e == "nw") {
								g.top = f.top + (b.height - g.height);
								g.left = f.left + (b.width - g.width)
							}
							return g
						},
						_respectSize : function(g) {
							var f = this.options, b = this.axis, e = d(g.width)
									&& f.maxWidth && f.maxWidth < g.width, h = d(g.height)
									&& f.maxHeight && f.maxHeight < g.height, j = d(g.width)
									&& f.minWidth && f.minWidth > g.width, k = d(g.height)
									&& f.minHeight && f.minHeight > g.height;
							if (j)
								g.width = f.minWidth;
							if (k)
								g.height = f.minHeight;
							if (e)
								g.width = f.maxWidth;
							if (h)
								g.height = f.maxHeight;
							var p = this.originalPosition.left
									+ this.originalSize.width, s = this.position.top
									+ this.size.height, o = /sw|nw|w/.test(b);
							b = /nw|ne|n/.test(b);
							if (j && o)
								g.left = p - f.minWidth;
							if (e && o)
								g.left = p - f.maxWidth;
							if (k && b)
								g.top = s - f.minHeight;
							if (h && b)
								g.top = s - f.maxHeight;
							if ((f = !g.width && !g.height) && !g.left && g.top)
								g.top = null;
							else if (f && !g.top && g.left)
								g.left = null;
							return g
						},
						_proportionallyResize : function() {
							if (this._proportionallyResizeElements.length)
								for ( var g = this.helper || this.element, f = 0; f < this._proportionallyResizeElements.length; f++) {
									var b = this._proportionallyResizeElements[f];
									if (!this.borderDif) {
										var e = [ b.css("borderTopWidth"),
												b.css("borderRightWidth"),
												b.css("borderBottomWidth"),
												b.css("borderLeftWidth") ], h = [
												b.css("paddingTop"),
												b.css("paddingRight"),
												b.css("paddingBottom"),
												b.css("paddingLeft") ];
										this.borderDif = a
												.map(
														e,
														function(j, k) {
															j = parseInt(j, 10) || 0;
															k = parseInt(h[k],
																	10) || 0;
															return j + k
														})
									}
									a.browser.msie
											&& (a(g).is(":hidden") || a(g)
													.parents(":hidden").length)
											|| b.css({
												height : g.height()
														- this.borderDif[0]
														- this.borderDif[2]
														|| 0,
												width : g.width()
														- this.borderDif[1]
														- this.borderDif[3]
														|| 0
											})
								}
						},
						_renderProxy : function() {
							var g = this.options;
							this.elementOffset = this.element.offset();
							if (this._helper) {
								this.helper = this.helper
										|| a('<div style="overflow:hidden;"></div>');
								var f = a.browser.msie && a.browser.version < 7, b = f ? 1
										: 0;
								f = f ? 2 : -1;
								this.helper.addClass(this._helper).css({
									width : this.element.outerWidth() + f,
									height : this.element.outerHeight() + f,
									position : "absolute",
									left : this.elementOffset.left - b + "px",
									top : this.elementOffset.top - b + "px",
									zIndex : ++g.zIndex
								});
								this.helper.appendTo("body").disableSelection()
							} else
								this.helper = this.element
						},
						_change : {
							e : function(g, f) {
								return {
									width : this.originalSize.width + f
								}
							},
							w : function(g, f) {
								return {
									left : this.originalPosition.left + f,
									width : this.originalSize.width - f
								}
							},
							n : function(g, f, b) {
								return {
									top : this.originalPosition.top + b,
									height : this.originalSize.height - b
								}
							},
							s : function(g, f, b) {
								return {
									height : this.originalSize.height + b
								}
							},
							se : function(g, f, b) {
								return a.extend(this._change.s.apply(this,
										arguments), this._change.e.apply(this,
										[ g, f, b ]))
							},
							sw : function(g, f, b) {
								return a.extend(this._change.s.apply(this,
										arguments), this._change.w.apply(this,
										[ g, f, b ]))
							},
							ne : function(g, f, b) {
								return a.extend(this._change.n.apply(this,
										arguments), this._change.e.apply(this,
										[ g, f, b ]))
							},
							nw : function(g, f, b) {
								return a.extend(this._change.n.apply(this,
										arguments), this._change.w.apply(this,
										[ g, f, b ]))
							}
						},
						_propagate : function(g, f) {
							a.ui.plugin.call(this, g, [ f, this.ui() ]);
							g != "resize" && this._trigger(g, f, this.ui())
						},
						plugins : {},
						ui : function() {
							return {
								originalElement : this.originalElement,
								element : this.element,
								helper : this.helper,
								position : this.position,
								size : this.size,
								originalSize : this.originalSize,
								originalPosition : this.originalPosition
							}
						}
					});
	a.extend(a.ui.resizable, {
		version : "1.8.11"
	});
	a.ui.plugin.add("resizable", "alsoResize", {
		start : function() {
			var g = a(this).data("resizable").options, f = function(b) {
				a(b).each(function() {
					var e = a(this);
					e.data("resizable-alsoresize", {
						width : parseInt(e.width(), 10),
						height : parseInt(e.height(), 10),
						left : parseInt(e.css("left"), 10),
						top : parseInt(e.css("top"), 10),
						position : e.css("position")
					})
				})
			};
			if (typeof g.alsoResize == "object" && !g.alsoResize.parentNode)
				if (g.alsoResize.length) {
					g.alsoResize = g.alsoResize[0];
					f(g.alsoResize)
				} else
					a.each(g.alsoResize, function(b) {
						f(b)
					});
			else
				f(g.alsoResize)
		},
		resize : function(g, f) {
			var b = a(this).data("resizable");
			g = b.options;
			var e = b.originalSize, h = b.originalPosition, j = {
				height : b.size.height - e.height || 0,
				width : b.size.width - e.width || 0,
				top : b.position.top - h.top || 0,
				left : b.position.left - h.left || 0
			}, k = function(p, s) {
				a(p).each(
						function() {
							var o = a(this), l = a(this).data(
									"resizable-alsoresize"), q = {}, u = s
									&& s.length ? s : o
									.parents(f.originalElement[0]).length ? [
									"width", "height" ] : [ "width", "height",
									"top", "left" ];
							a.each(u, function(v, z) {
								if ((v = (l[z] || 0) + (j[z] || 0)) && v >= 0)
									q[z] = v || null
							});
							if (a.browser.opera
									&& /relative/.test(o.css("position"))) {
								b._revertToRelativePosition = true;
								o.css({
									position : "absolute",
									top : "auto",
									left : "auto"
								})
							}
							o.css(q)
						})
			};
			typeof g.alsoResize == "object" && !g.alsoResize.nodeType ? a.each(
					g.alsoResize, function(p, s) {
						k(p, s)
					}) : k(g.alsoResize)
		},
		stop : function() {
			var g = a(this).data("resizable"), f = g.options, b = function(e) {
				a(e).each(function() {
					var h = a(this);
					h.css({
						position : h.data("resizable-alsoresize").position
					})
				})
			};
			if (g._revertToRelativePosition) {
				g._revertToRelativePosition = false;
				typeof f.alsoResize == "object" && !f.alsoResize.nodeType ? a
						.each(f.alsoResize, function(e) {
							b(e)
						}) : b(f.alsoResize)
			}
			a(this).removeData("resizable-alsoresize")
		}
	});
	a.ui.plugin
			.add(
					"resizable",
					"animate",
					{
						stop : function(g) {
							var f = a(this).data("resizable"), b = f.options, e = f._proportionallyResizeElements, h = e.length
									&& /textarea/i.test(e[0].nodeName), j = h
									&& a.ui.hasScroll(e[0], "left") ? 0
									: f.sizeDiff.height;
							h = {
								width : f.size.width
										- (h ? 0 : f.sizeDiff.width),
								height : f.size.height - j
							};
							j = parseInt(f.element.css("left"), 10)
									+ (f.position.left - f.originalPosition.left)
									|| null;
							var k = parseInt(f.element.css("top"), 10)
									+ (f.position.top - f.originalPosition.top)
									|| null;
							f.element.animate(a.extend(h, k && j ? {
								top : k,
								left : j
							} : {}),
									{
										duration : b.animateDuration,
										easing : b.animateEasing,
										step : function() {
											var p = {
												width : parseInt(f.element
														.css("width"), 10),
												height : parseInt(f.element
														.css("height"), 10),
												top : parseInt(f.element
														.css("top"), 10),
												left : parseInt(f.element
														.css("left"), 10)
											};
											e && e.length && a(e[0]).css({
												width : p.width,
												height : p.height
											});
											f._updateCache(p);
											f._propagate("resize", g)
										}
									})
						}
					});
	a.ui.plugin
			.add(
					"resizable",
					"containment",
					{
						start : function() {
							var g = a(this).data("resizable"), f = g.element, b = g.options.containment;
							if (f = b instanceof a ? b.get(0) : /parent/
									.test(b) ? f.parent().get(0) : b) {
								g.containerElement = a(f);
								if (/document/.test(b) || b == document) {
									g.containerOffset = {
										left : 0,
										top : 0
									};
									g.containerPosition = {
										left : 0,
										top : 0
									};
									g.parentData = {
										element : a(document),
										left : 0,
										top : 0,
										width : a(document).width(),
										height : a(document).height()
												|| document.body.parentNode.scrollHeight
									}
								} else {
									var e = a(f), h = [];
									a([ "Top", "Right", "Left", "Bottom" ])
											.each(function(p, s) {
												h[p] = c(e.css("padding" + s))
											});
									g.containerOffset = e.offset();
									g.containerPosition = e.position();
									g.containerSize = {
										height : e.innerHeight() - h[3],
										width : e.innerWidth() - h[1]
									};
									b = g.containerOffset;
									var j = g.containerSize.height, k = g.containerSize.width;
									k = a.ui.hasScroll(f, "left") ? f.scrollWidth
											: k;
									j = a.ui.hasScroll(f) ? f.scrollHeight : j;
									g.parentData = {
										element : f,
										left : b.left,
										top : b.top,
										width : k,
										height : j
									}
								}
							}
						},
						resize : function(g) {
							var f = a(this).data("resizable"), b = f.options, e = f.containerOffset, h = f.position;
							g = f._aspectRatio || g.shiftKey;
							var j = {
								top : 0,
								left : 0
							}, k = f.containerElement;
							if (k[0] != document
									&& /static/.test(k.css("position")))
								j = e;
							if (h.left < (f._helper ? e.left : 0)) {
								f.size.width += f._helper ? f.position.left
										- e.left : f.position.left - j.left;
								if (g)
									f.size.height = f.size.width
											/ b.aspectRatio;
								f.position.left = b.helper ? e.left : 0
							}
							if (h.top < (f._helper ? e.top : 0)) {
								f.size.height += f._helper ? f.position.top
										- e.top : f.position.top;
								if (g)
									f.size.width = f.size.height
											* b.aspectRatio;
								f.position.top = f._helper ? e.top : 0
							}
							f.offset.left = f.parentData.left + f.position.left;
							f.offset.top = f.parentData.top + f.position.top;
							b = Math.abs((f._helper ? f.offset.left - j.left
									: f.offset.left - j.left)
									+ f.sizeDiff.width);
							e = Math.abs((f._helper ? f.offset.top - j.top
									: f.offset.top - e.top)
									+ f.sizeDiff.height);
							h = f.containerElement.get(0) == f.element.parent()
									.get(0);
							j = /relative|absolute/.test(f.containerElement
									.css("position"));
							if (h && j)
								b -= f.parentData.left;
							if (b + f.size.width >= f.parentData.width) {
								f.size.width = f.parentData.width - b;
								if (g)
									f.size.height = f.size.width
											/ f.aspectRatio
							}
							if (e + f.size.height >= f.parentData.height) {
								f.size.height = f.parentData.height - e;
								if (g)
									f.size.width = f.size.height
											* f.aspectRatio
							}
						},
						stop : function() {
							var g = a(this).data("resizable"), f = g.options, b = g.containerOffset, e = g.containerPosition, h = g.containerElement, j = a(g.helper), k = j
									.offset(), p = j.outerWidth()
									- g.sizeDiff.width;
							j = j.outerHeight() - g.sizeDiff.height;
							g._helper && !f.animate
									&& /relative/.test(h.css("position"))
									&& a(this).css({
										left : k.left - e.left - b.left,
										width : p,
										height : j
									});
							g._helper && !f.animate
									&& /static/.test(h.css("position"))
									&& a(this).css({
										left : k.left - e.left - b.left,
										width : p,
										height : j
									})
						}
					});
	a.ui.plugin.add("resizable", "ghost", {
		start : function() {
			var g = a(this).data("resizable"), f = g.options, b = g.size;
			g.ghost = g.originalElement.clone();
			g.ghost.css({
				opacity : 0.25,
				display : "block",
				position : "relative",
				height : b.height,
				width : b.width,
				margin : 0,
				left : 0,
				top : 0
			}).addClass("ui-resizable-ghost").addClass(
					typeof f.ghost == "string" ? f.ghost : "");
			g.ghost.appendTo(g.helper)
		},
		resize : function() {
			var g = a(this).data("resizable");
			g.ghost && g.ghost.css({
				position : "relative",
				height : g.size.height,
				width : g.size.width
			})
		},
		stop : function() {
			var g = a(this).data("resizable");
			g.ghost && g.helper && g.helper.get(0).removeChild(g.ghost.get(0))
		}
	});
	a.ui.plugin
			.add(
					"resizable",
					"grid",
					{
						resize : function() {
							var g = a(this).data("resizable"), f = g.options, b = g.size, e = g.originalSize, h = g.originalPosition, j = g.axis;
							f.grid = typeof f.grid == "number" ? [ f.grid,
									f.grid ] : f.grid;
							var k = Math.round((b.width - e.width)
									/ (f.grid[0] || 1))
									* (f.grid[0] || 1);
							f = Math.round((b.height - e.height)
									/ (f.grid[1] || 1))
									* (f.grid[1] || 1);
							if (/^(se|s|e)$/.test(j)) {
								g.size.width = e.width + k;
								g.size.height = e.height + f
							} else if (/^(ne)$/.test(j)) {
								g.size.width = e.width + k;
								g.size.height = e.height + f;
								g.position.top = h.top - f
							} else {
								if (/^(sw)$/.test(j)) {
									g.size.width = e.width + k;
									g.size.height = e.height + f
								} else {
									g.size.width = e.width + k;
									g.size.height = e.height + f;
									g.position.top = h.top - f
								}
								g.position.left = h.left - k
							}
						}
					});
	var c = function(g) {
		return parseInt(g, 10) || 0
	}, d = function(g) {
		return !isNaN(parseInt(g, 10))
	}
})(jQuery);
(function(a) {
	a
			.widget(
					"ui.selectable",
					a.ui.mouse,
					{
						options : {
							appendTo : "body",
							autoRefresh : true,
							distance : 0,
							filter : "*",
							tolerance : "touch"
						},
						_create : function() {
							var c = this;
							this.element.addClass("ui-selectable");
							this.dragged = false;
							var d;
							this.refresh = function() {
								d = a(c.options.filter, c.element[0]);
								d.each(function() {
									var g = a(this), f = g.offset();
									a.data(this, "selectable-item", {
										element : this,
										$element : g,
										left : f.left,
										top : f.top,
										right : f.left + g.outerWidth(),
										bottom : f.top + g.outerHeight(),
										startselected : false,
										selected : g.hasClass("ui-selected"),
										selecting : g.hasClass("ui-selecting"),
										unselecting : g
												.hasClass("ui-unselecting")
									})
								})
							};
							this.refresh();
							this.selectees = d.addClass("ui-selectee");
							this._mouseInit();
							this.helper = a("<div class='ui-selectable-helper'></div>")
						},
						destroy : function() {
							this.selectees.removeClass("ui-selectee")
									.removeData("selectable-item");
							this.element.removeClass(
									"ui-selectable ui-selectable-disabled")
									.removeData("selectable").unbind(
											".selectable");
							this._mouseDestroy();
							return this
						},
						_mouseStart : function(c) {
							var d = this;
							this.opos = [ c.pageX, c.pageY ];
							if (!this.options.disabled) {
								var g = this.options;
								this.selectees = a(g.filter, this.element[0]);
								this._trigger("start", c);
								a(g.appendTo).append(this.helper);
								this.helper.css({
									left : c.clientX,
									top : c.clientY,
									width : 0,
									height : 0
								});
								g.autoRefresh && this.refresh();
								this.selectees
										.filter(".ui-selected")
										.each(
												function() {
													var f = a.data(this,
															"selectable-item");
													f.startselected = true;
													if (!c.metaKey) {
														f.$element
																.removeClass("ui-selected");
														f.selected = false;
														f.$element
																.addClass("ui-unselecting");
														f.unselecting = true;
														d
																._trigger(
																		"unselecting",
																		c,
																		{
																			unselecting : f.element
																		})
													}
												});
								a(c.target)
										.parents()
										.andSelf()
										.each(
												function() {
													var f = a.data(this,
															"selectable-item");
													if (f) {
														var b = !c.metaKey
																|| !f.$element
																		.hasClass("ui-selected");
														f.$element
																.removeClass(
																		b ? "ui-unselecting"
																				: "ui-selected")
																.addClass(
																		b ? "ui-selecting"
																				: "ui-unselecting");
														f.unselecting = !b;
														f.selecting = b;
														(f.selected = b) ? d
																._trigger(
																		"selecting",
																		c,
																		{
																			selecting : f.element
																		})
																: d
																		._trigger(
																				"unselecting",
																				c,
																				{
																					unselecting : f.element
																				});
														return false
													}
												})
							}
						},
						_mouseDrag : function(c) {
							var d = this;
							this.dragged = true;
							if (!this.options.disabled) {
								var g = this.options, f = this.opos[0], b = this.opos[1], e = c.pageX, h = c.pageY;
								if (f > e) {
									var j = e;
									e = f;
									f = j
								}
								if (b > h) {
									j = h;
									h = b;
									b = j
								}
								this.helper.css({
									left : f,
									top : b,
									width : e - f,
									height : h - b
								});
								this.selectees
										.each(function() {
											var k = a.data(this,
													"selectable-item");
											if (!(!k || k.element == d.element[0])) {
												var p = false;
												if (g.tolerance == "touch")
													p = !(k.left > e
															|| k.right < f
															|| k.top > h || k.bottom < b);
												else if (g.tolerance == "fit")
													p = k.left > f
															&& k.right < e
															&& k.top > b
															&& k.bottom < h;
												if (p) {
													if (k.selected) {
														k.$element
																.removeClass("ui-selected");
														k.selected = false
													}
													if (k.unselecting) {
														k.$element
																.removeClass("ui-unselecting");
														k.unselecting = false
													}
													if (!k.selecting) {
														k.$element
																.addClass("ui-selecting");
														k.selecting = true;
														d
																._trigger(
																		"selecting",
																		c,
																		{
																			selecting : k.element
																		})
													}
												} else {
													if (k.selecting)
														if (c.metaKey
																&& k.startselected) {
															k.$element
																	.removeClass("ui-selecting");
															k.selecting = false;
															k.$element
																	.addClass("ui-selected");
															k.selected = true
														} else {
															k.$element
																	.removeClass("ui-selecting");
															k.selecting = false;
															if (k.startselected) {
																k.$element
																		.addClass("ui-unselecting");
																k.unselecting = true
															}
															d
																	._trigger(
																			"unselecting",
																			c,
																			{
																				unselecting : k.element
																			})
														}
													if (k.selected)
														if (!c.metaKey
																&& !k.startselected) {
															k.$element
																	.removeClass("ui-selected");
															k.selected = false;
															k.$element
																	.addClass("ui-unselecting");
															k.unselecting = true;
															d
																	._trigger(
																			"unselecting",
																			c,
																			{
																				unselecting : k.element
																			})
														}
												}
											}
										});
								return false
							}
						},
						_mouseStop : function(c) {
							var d = this;
							this.dragged = false;
							a(".ui-unselecting", this.element[0])
									.each(
											function() {
												var g = a.data(this,
														"selectable-item");
												g.$element
														.removeClass("ui-unselecting");
												g.unselecting = false;
												g.startselected = false;
												d._trigger("unselected", c, {
													unselected : g.element
												})
											});
							a(".ui-selecting", this.element[0])
									.each(
											function() {
												var g = a.data(this,
														"selectable-item");
												g.$element
														.removeClass(
																"ui-selecting")
														.addClass("ui-selected");
												g.selecting = false;
												g.selected = true;
												g.startselected = true;
												d._trigger("selected", c, {
													selected : g.element
												})
											});
							this._trigger("stop", c);
							this.helper.remove();
							return false
						}
					});
	a.extend(a.ui.selectable, {
		version : "1.8.11"
	})
})(jQuery);
(function(a) {
	a
			.widget(
					"ui.sortable",
					a.ui.mouse,
					{
						widgetEventPrefix : "sort",
						options : {
							appendTo : "parent",
							axis : false,
							connectWith : false,
							containment : false,
							cursor : "auto",
							cursorAt : false,
							dropOnEmpty : true,
							forcePlaceholderSize : false,
							forceHelperSize : false,
							grid : false,
							handle : false,
							helper : "original",
							items : "> *",
							opacity : false,
							placeholder : false,
							revert : false,
							scroll : true,
							scrollSensitivity : 20,
							scrollSpeed : 20,
							scope : "default",
							tolerance : "intersect",
							zIndex : 1E3
						},
						_create : function() {
							this.containerCache = {};
							this.element.addClass("ui-sortable");
							this.refresh();
							this.floating = this.items.length ? /left|right/
									.test(this.items[0].item.css("float"))
									|| /inline|table-cell/
											.test(this.items[0].item
													.css("display")) : false;
							this.offset = this.element.offset();
							this._mouseInit()
						},
						destroy : function() {
							this.element.removeClass(
									"ui-sortable ui-sortable-disabled")
									.removeData("sortable").unbind(".sortable");
							this._mouseDestroy();
							for ( var c = this.items.length - 1; c >= 0; c--)
								this.items[c].item.removeData("sortable-item");
							return this
						},
						_setOption : function(c, d) {
							if (c === "disabled") {
								this.options[c] = d;
								this.widget()[d ? "addClass" : "removeClass"]
										("ui-sortable-disabled")
							} else
								a.Widget.prototype._setOption.apply(this,
										arguments)
						},
						_mouseCapture : function(c, d) {
							if (this.reverting)
								return false;
							if (this.options.disabled
									|| this.options.type == "static")
								return false;
							this._refreshItems(c);
							var g = null, f = this;
							a(c.target).parents().each(function() {
								if (a.data(this, "sortable-item") == f) {
									g = a(this);
									return false
								}
							});
							if (a.data(c.target, "sortable-item") == f)
								g = a(c.target);
							if (!g)
								return false;
							if (this.options.handle && !d) {
								var b = false;
								a(this.options.handle, g).find("*").andSelf()
										.each(function() {
											if (this == c.target)
												b = true
										});
								if (!b)
									return false
							}
							this.currentItem = g;
							this._removeCurrentsFromItems();
							return true
						},
						_mouseStart : function(c, d, g) {
							d = this.options;
							var f = this;
							this.currentContainer = this;
							this.refreshPositions();
							this.helper = this._createHelper(c);
							this._cacheHelperProportions();
							this._cacheMargins();
							this.scrollParent = this.helper.scrollParent();
							this.offset = this.currentItem.offset();
							this.offset = {
								top : this.offset.top - this.margins.top,
								left : this.offset.left - this.margins.left
							};
							this.helper.css("position", "absolute");
							this.cssPosition = this.helper.css("position");
							a.extend(this.offset, {
								click : {
									left : c.pageX - this.offset.left,
									top : c.pageY - this.offset.top
								},
								parent : this._getParentOffset(),
								relative : this._getRelativeOffset()
							});
							this.originalPosition = this._generatePosition(c);
							this.originalPageX = c.pageX;
							this.originalPageY = c.pageY;
							d.cursorAt
									&& this._adjustOffsetFromHelper(d.cursorAt);
							this.domPosition = {
								prev : this.currentItem.prev()[0],
								parent : this.currentItem.parent()[0]
							};
							this.helper[0] != this.currentItem[0]
									&& this.currentItem.hide();
							this._createPlaceholder();
							d.containment && this._setContainment();
							if (d.cursor) {
								if (a("body").css("cursor"))
									this._storedCursor = a("body")
											.css("cursor");
								a("body").css("cursor", d.cursor)
							}
							if (d.opacity) {
								if (this.helper.css("opacity"))
									this._storedOpacity = this.helper
											.css("opacity");
								this.helper.css("opacity", d.opacity)
							}
							if (d.zIndex) {
								if (this.helper.css("zIndex"))
									this._storedZIndex = this.helper
											.css("zIndex");
								this.helper.css("zIndex", d.zIndex)
							}
							if (this.scrollParent[0] != document
									&& this.scrollParent[0].tagName != "HTML")
								this.overflowOffset = this.scrollParent
										.offset();
							this._trigger("start", c, this._uiHash());
							this._preserveHelperProportions
									|| this._cacheHelperProportions();
							if (!g)
								for (g = this.containers.length - 1; g >= 0; g--)
									this.containers[g]._trigger("activate", c,
											f._uiHash(this));
							if (a.ui.ddmanager)
								a.ui.ddmanager.current = this;
							a.ui.ddmanager && !d.dropBehaviour
									&& a.ui.ddmanager.prepareOffsets(this, c);
							this.dragging = true;
							this.helper.addClass("ui-sortable-helper");
							this._mouseDrag(c);
							return true
						},
						_mouseDrag : function(c) {
							this.position = this._generatePosition(c);
							this.positionAbs = this
									._convertPositionTo("absolute");
							if (!this.lastPositionAbs)
								this.lastPositionAbs = this.positionAbs;
							if (this.options.scroll) {
								var d = this.options, g = false;
								if (this.scrollParent[0] != document
										&& this.scrollParent[0].tagName != "HTML") {
									if (this.overflowOffset.top
											+ this.scrollParent[0].offsetHeight
											- c.pageY < d.scrollSensitivity)
										this.scrollParent[0].scrollTop = g = this.scrollParent[0].scrollTop
												+ d.scrollSpeed;
									else if (c.pageY - this.overflowOffset.top < d.scrollSensitivity)
										this.scrollParent[0].scrollTop = g = this.scrollParent[0].scrollTop
												- d.scrollSpeed;
									if (this.overflowOffset.left
											+ this.scrollParent[0].offsetWidth
											- c.pageX < d.scrollSensitivity)
										this.scrollParent[0].scrollLeft = g = this.scrollParent[0].scrollLeft
												+ d.scrollSpeed;
									else if (c.pageX - this.overflowOffset.left < d.scrollSensitivity)
										this.scrollParent[0].scrollLeft = g = this.scrollParent[0].scrollLeft
												- d.scrollSpeed
								} else {
									if (c.pageY - a(document).scrollTop() < d.scrollSensitivity)
										g = a(document).scrollTop(
												a(document).scrollTop()
														- d.scrollSpeed);
									else if (a(window).height()
											- (c.pageY - a(document)
													.scrollTop()) < d.scrollSensitivity)
										g = a(document).scrollTop(
												a(document).scrollTop()
														+ d.scrollSpeed);
									if (c.pageX - a(document).scrollLeft() < d.scrollSensitivity)
										g = a(document).scrollLeft(
												a(document).scrollLeft()
														- d.scrollSpeed);
									else if (a(window).width()
											- (c.pageX - a(document)
													.scrollLeft()) < d.scrollSensitivity)
										g = a(document).scrollLeft(
												a(document).scrollLeft()
														+ d.scrollSpeed)
								}
								g !== false
										&& a.ui.ddmanager
										&& !d.dropBehaviour
										&& a.ui.ddmanager.prepareOffsets(this,
												c)
							}
							this.positionAbs = this
									._convertPositionTo("absolute");
							if (!this.options.axis || this.options.axis != "y")
								this.helper[0].style.left = this.position.left
										+ "px";
							if (!this.options.axis || this.options.axis != "x")
								this.helper[0].style.top = this.position.top
										+ "px";
							for (d = this.items.length - 1; d >= 0; d--) {
								g = this.items[d];
								var f = g.item[0], b = this
										._intersectsWithPointer(g);
								if (b)
									if (f != this.currentItem[0]
											&& this.placeholder[b == 1 ? "next"
													: "prev"]()[0] != f
											&& !a.ui.contains(
													this.placeholder[0], f)
											&& (this.options.type == "semi-dynamic" ? !a.ui
													.contains(this.element[0],
															f)
													: true)) {
										this.direction = b == 1 ? "down" : "up";
										if (this.options.tolerance == "pointer"
												|| this._intersectsWithSides(g))
											this._rearrange(c, g);
										else
											break;
										this._trigger("change", c, this
												._uiHash());
										break
									}
							}
							this._contactContainers(c);
							a.ui.ddmanager && a.ui.ddmanager.drag(this, c);
							this._trigger("sort", c, this._uiHash());
							this.lastPositionAbs = this.positionAbs;
							return false
						},
						_mouseStop : function(c, d) {
							if (c) {
								a.ui.ddmanager && !this.options.dropBehaviour
										&& a.ui.ddmanager.drop(this, c);
								if (this.options.revert) {
									var g = this;
									d = g.placeholder.offset();
									g.reverting = true;
									a(this.helper)
											.animate(
													{
														left : d.left
																- this.offset.parent.left
																- g.margins.left
																+ (this.offsetParent[0] == document.body ? 0
																		: this.offsetParent[0].scrollLeft),
														top : d.top
																- this.offset.parent.top
																- g.margins.top
																+ (this.offsetParent[0] == document.body ? 0
																		: this.offsetParent[0].scrollTop)
													},
													parseInt(
															this.options.revert,
															10) || 500,
													function() {
														g._clear(c)
													})
								} else
									this._clear(c, d);
								return false
							}
						},
						cancel : function() {
							var c = this;
							if (this.dragging) {
								this._mouseUp({
									target : null
								});
								this.options.helper == "original" ? this.currentItem
										.css(this._storedCSS).removeClass(
												"ui-sortable-helper")
										: this.currentItem.show();
								for ( var d = this.containers.length - 1; d >= 0; d--) {
									this.containers[d]._trigger("deactivate",
											null, c._uiHash(this));
									if (this.containers[d].containerCache.over) {
										this.containers[d]._trigger("out",
												null, c._uiHash(this));
										this.containers[d].containerCache.over = 0
									}
								}
							}
							if (this.placeholder) {
								this.placeholder[0].parentNode
										&& this.placeholder[0].parentNode
												.removeChild(this.placeholder[0]);
								this.options.helper != "original"
										&& this.helper
										&& this.helper[0].parentNode
										&& this.helper.remove();
								a.extend(this, {
									helper : null,
									dragging : false,
									reverting : false,
									_noFinalSort : null
								});
								this.domPosition.prev ? a(this.domPosition.prev)
										.after(this.currentItem)
										: a(this.domPosition.parent).prepend(
												this.currentItem)
							}
							return this
						},
						serialize : function(c) {
							var d = this._getItemsAsjQuery(c && c.connected), g = [];
							c = c || {};
							a(d)
									.each(
											function() {
												var f = (a(c.item || this)
														.attr(
																c.attribute
																		|| "id") || "")
														.match(c.expression || /(.+)[-=_](.+)/);
												if (f)
													g
															.push((c.key || f[1]
																	+ "[]")
																	+ "="
																	+ (c.key
																			&& c.expression ? f[1]
																			: f[2]))
											});
							!g.length && c.key && g.push(c.key + "=");
							return g.join("&")
						},
						toArray : function(c) {
							var d = this._getItemsAsjQuery(c && c.connected), g = [];
							c = c || {};
							d.each(function() {
								g.push(a(c.item || this).attr(
										c.attribute || "id")
										|| "")
							});
							return g
						},
						_intersectsWith : function(c) {
							var d = this.positionAbs.left, g = d
									+ this.helperProportions.width, f = this.positionAbs.top, b = f
									+ this.helperProportions.height, e = c.left, h = e
									+ c.width, j = c.top, k = j + c.height, p = this.offset.click.top, s = this.offset.click.left;
							p = f + p > j && f + p < k && d + s > e
									&& d + s < h;
							return this.options.tolerance == "pointer"
									|| this.options.forcePointerForContainers
									|| this.options.tolerance != "pointer"
									&& this.helperProportions[this.floating ? "width"
											: "height"] > c[this.floating ? "width"
											: "height"] ? p
									: e < d + this.helperProportions.width / 2
											&& g - this.helperProportions.width
													/ 2 < h
											&& j < f
													+ this.helperProportions.height
													/ 2
											&& b
													- this.helperProportions.height
													/ 2 < k
						},
						_intersectsWithPointer : function(c) {
							var d = a.ui.isOverAxis(this.positionAbs.top
									+ this.offset.click.top, c.top, c.height);
							c = a.ui.isOverAxis(this.positionAbs.left
									+ this.offset.click.left, c.left, c.width);
							d = d && c;
							c = this._getDragVerticalDirection();
							var g = this._getDragHorizontalDirection();
							if (!d)
								return false;
							return this.floating ? g && g == "right"
									|| c == "down" ? 2 : 1 : c
									&& (c == "down" ? 2 : 1)
						},
						_intersectsWithSides : function(c) {
							var d = a.ui.isOverAxis(this.positionAbs.top
									+ this.offset.click.top, c.top + c.height
									/ 2, c.height);
							c = a.ui.isOverAxis(this.positionAbs.left
									+ this.offset.click.left, c.left + c.width
									/ 2, c.width);
							var g = this._getDragVerticalDirection(), f = this
									._getDragHorizontalDirection();
							return this.floating && f ? f == "right" && c
									|| f == "left" && !c : g
									&& (g == "down" && d || g == "up" && !d)
						},
						_getDragVerticalDirection : function() {
							var c = this.positionAbs.top
									- this.lastPositionAbs.top;
							return c != 0 && (c > 0 ? "down" : "up")
						},
						_getDragHorizontalDirection : function() {
							var c = this.positionAbs.left
									- this.lastPositionAbs.left;
							return c != 0 && (c > 0 ? "right" : "left")
						},
						refresh : function(c) {
							this._refreshItems(c);
							this.refreshPositions();
							return this
						},
						_connectWith : function() {
							var c = this.options;
							return c.connectWith.constructor == String ? [ c.connectWith ]
									: c.connectWith
						},
						_getItemsAsjQuery : function(c) {
							var d = [], g = [], f = this._connectWith();
							if (f && c)
								for (c = f.length - 1; c >= 0; c--)
									for ( var b = a(f[c]), e = b.length - 1; e >= 0; e--) {
										var h = a.data(b[e], "sortable");
										if (h && h != this
												&& !h.options.disabled)
											g
													.push([
															a
																	.isFunction(h.options.items) ? h.options.items
																	.call(h.element)
																	: a(
																			h.options.items,
																			h.element)
																			.not(
																					".ui-sortable-helper")
																			.not(
																					".ui-sortable-placeholder"),
															h ])
									}
							g
									.push([
											a.isFunction(this.options.items) ? this.options.items
													.call(this.element, null, {
														options : this.options,
														item : this.currentItem
													})
													: a(this.options.items,
															this.element)
															.not(
																	".ui-sortable-helper")
															.not(
																	".ui-sortable-placeholder"),
											this ]);
							for (c = g.length - 1; c >= 0; c--)
								g[c][0].each(function() {
									d.push(this)
								});
							return a(d)
						},
						_removeCurrentsFromItems : function() {
							for ( var c = this.currentItem
									.find(":data(sortable-item)"), d = 0; d < this.items.length; d++)
								for ( var g = 0; g < c.length; g++)
									c[g] == this.items[d].item[0]
											&& this.items.splice(d, 1)
						},
						_refreshItems : function(c) {
							this.items = [];
							this.containers = [ this ];
							var d = this.items, g = [ [
									a.isFunction(this.options.items) ? this.options.items
											.call(this.element[0], c, {
												item : this.currentItem
											})
											: a(this.options.items,
													this.element), this ] ], f = this
									._connectWith();
							if (f)
								for ( var b = f.length - 1; b >= 0; b--)
									for ( var e = a(f[b]), h = e.length - 1; h >= 0; h--) {
										var j = a.data(e[h], "sortable");
										if (j && j != this
												&& !j.options.disabled) {
											g
													.push([
															a
																	.isFunction(j.options.items) ? j.options.items
																	.call(
																			j.element[0],
																			c,
																			{
																				item : this.currentItem
																			})
																	: a(
																			j.options.items,
																			j.element),
															j ]);
											this.containers.push(j)
										}
									}
							for (b = g.length - 1; b >= 0; b--) {
								c = g[b][1];
								f = g[b][0];
								h = 0;
								for (e = f.length; h < e; h++) {
									j = a(f[h]);
									j.data("sortable-item", c);
									d.push({
										item : j,
										instance : c,
										width : 0,
										height : 0,
										left : 0,
										top : 0
									})
								}
							}
						},
						refreshPositions : function(c) {
							if (this.offsetParent && this.helper)
								this.offset.parent = this._getParentOffset();
							for ( var d = this.items.length - 1; d >= 0; d--) {
								var g = this.items[d], f = this.options.toleranceElement ? a(
										this.options.toleranceElement, g.item)
										: g.item;
								if (!c) {
									g.width = f.outerWidth();
									g.height = f.outerHeight()
								}
								f = f.offset();
								g.left = f.left;
								g.top = f.top
							}
							if (this.options.custom
									&& this.options.custom.refreshContainers)
								this.options.custom.refreshContainers
										.call(this);
							else
								for (d = this.containers.length - 1; d >= 0; d--) {
									f = this.containers[d].element.offset();
									this.containers[d].containerCache.left = f.left;
									this.containers[d].containerCache.top = f.top;
									this.containers[d].containerCache.width = this.containers[d].element
											.outerWidth();
									this.containers[d].containerCache.height = this.containers[d].element
											.outerHeight()
								}
							return this
						},
						_createPlaceholder : function(c) {
							var d = c || this, g = d.options;
							if (!g.placeholder
									|| g.placeholder.constructor == String) {
								var f = g.placeholder;
								g.placeholder = {
									element : function() {
										var b = a(
												document
														.createElement(d.currentItem[0].nodeName))
												.addClass(
														f
																|| d.currentItem[0].className
																+ " ui-sortable-placeholder")
												.removeClass(
														"ui-sortable-helper")[0];
										if (!f)
											b.style.visibility = "hidden";
										return b
									},
									update : function(b, e) {
										if (!(f && !g.forcePlaceholderSize)) {
											e.height()
													|| e
															.height(d.currentItem
																	.innerHeight()
																	- parseInt(
																			d.currentItem
																					.css("paddingTop") || 0,
																			10)
																	- parseInt(
																			d.currentItem
																					.css("paddingBottom") || 0,
																			10));
											e.width()
													|| e
															.width(d.currentItem
																	.innerWidth()
																	- parseInt(
																			d.currentItem
																					.css("paddingLeft") || 0,
																			10)
																	- parseInt(
																			d.currentItem
																					.css("paddingRight") || 0,
																			10))
										}
									}
								}
							}
							d.placeholder = a(g.placeholder.element.call(
									d.element, d.currentItem));
							d.currentItem.after(d.placeholder);
							g.placeholder.update(d, d.placeholder)
						},
						_contactContainers : function(c) {
							for ( var d = null, g = null, f = this.containers.length - 1; f >= 0; f--)
								if (!a.ui.contains(this.currentItem[0],
										this.containers[f].element[0]))
									if (this
											._intersectsWith(this.containers[f].containerCache)) {
										if (!(d && a.ui.contains(
												this.containers[f].element[0],
												d.element[0]))) {
											d = this.containers[f];
											g = f
										}
									} else if (this.containers[f].containerCache.over) {
										this.containers[f]._trigger("out", c,
												this._uiHash(this));
										this.containers[f].containerCache.over = 0
									}
							if (d)
								if (this.containers.length === 1) {
									this.containers[g]._trigger("over", c, this
											._uiHash(this));
									this.containers[g].containerCache.over = 1
								} else if (this.currentContainer != this.containers[g]) {
									d = 1E4;
									f = null;
									for ( var b = this.positionAbs[this.containers[g].floating ? "left"
											: "top"], e = this.items.length - 1; e >= 0; e--)
										if (a.ui.contains(
												this.containers[g].element[0],
												this.items[e].item[0])) {
											var h = this.items[e][this.containers[g].floating ? "left"
													: "top"];
											if (Math.abs(h - b) < d) {
												d = Math.abs(h - b);
												f = this.items[e]
											}
										}
									if (f || this.options.dropOnEmpty) {
										this.currentContainer = this.containers[g];
										f ? this._rearrange(c, f, null, true)
												: this
														._rearrange(
																c,
																null,
																this.containers[g].element,
																true);
										this._trigger("change", c, this
												._uiHash());
										this.containers[g]._trigger("change",
												c, this._uiHash(this));
										this.options.placeholder.update(
												this.currentContainer,
												this.placeholder);
										this.containers[g]._trigger("over", c,
												this._uiHash(this));
										this.containers[g].containerCache.over = 1
									}
								}
						},
						_createHelper : function(c) {
							var d = this.options;
							c = a.isFunction(d.helper) ? a(d.helper.apply(
									this.element[0], [ c, this.currentItem ]))
									: d.helper == "clone" ? this.currentItem
											.clone() : this.currentItem;
							c.parents("body").length
									|| a(d.appendTo != "parent" ? d.appendTo
											: this.currentItem[0].parentNode)[0]
											.appendChild(c[0]);
							if (c[0] == this.currentItem[0])
								this._storedCSS = {
									width : this.currentItem[0].style.width,
									height : this.currentItem[0].style.height,
									position : this.currentItem.css("position"),
									top : this.currentItem.css("top"),
									left : this.currentItem.css("left")
								};
							if (c[0].style.width == "" || d.forceHelperSize)
								c.width(this.currentItem.width());
							if (c[0].style.height == "" || d.forceHelperSize)
								c.height(this.currentItem.height());
							return c
						},
						_adjustOffsetFromHelper : function(c) {
							if (typeof c == "string")
								c = c.split(" ");
							if (a.isArray(c))
								c = {
									left : +c[0],
									top : +c[1] || 0
								};
							if ("left" in c)
								this.offset.click.left = c.left
										+ this.margins.left;
							if ("right" in c)
								this.offset.click.left = this.helperProportions.width
										- c.right + this.margins.left;
							if ("top" in c)
								this.offset.click.top = c.top
										+ this.margins.top;
							if ("bottom" in c)
								this.offset.click.top = this.helperProportions.height
										- c.bottom + this.margins.top
						},
						_getParentOffset : function() {
							this.offsetParent = this.helper.offsetParent();
							var c = this.offsetParent.offset();
							if (this.cssPosition == "absolute"
									&& this.scrollParent[0] != document
									&& a.ui.contains(this.scrollParent[0],
											this.offsetParent[0])) {
								c.left += this.scrollParent.scrollLeft();
								c.top += this.scrollParent.scrollTop()
							}
							if (this.offsetParent[0] == document.body
									|| this.offsetParent[0].tagName
									&& this.offsetParent[0].tagName
											.toLowerCase() == "html"
									&& a.browser.msie)
								c = {
									top : 0,
									left : 0
								};
							return {
								top : c.top
										+ (parseInt(this.offsetParent
												.css("borderTopWidth"), 10) || 0),
								left : c.left
										+ (parseInt(this.offsetParent
												.css("borderLeftWidth"), 10) || 0)
							}
						},
						_getRelativeOffset : function() {
							if (this.cssPosition == "relative") {
								var c = this.currentItem.position();
								return {
									top : c.top
											- (parseInt(this.helper.css("top"),
													10) || 0)
											+ this.scrollParent.scrollTop(),
									left : c.left
											- (parseInt(
													this.helper.css("left"), 10) || 0)
											+ this.scrollParent.scrollLeft()
								}
							} else
								return {
									top : 0,
									left : 0
								}
						},
						_cacheMargins : function() {
							this.margins = {
								left : parseInt(this.currentItem
										.css("marginLeft"), 10) || 0,
								top : parseInt(this.currentItem
										.css("marginTop"), 10) || 0
							}
						},
						_cacheHelperProportions : function() {
							this.helperProportions = {
								width : this.helper.outerWidth(),
								height : this.helper.outerHeight()
							}
						},
						_setContainment : function() {
							var c = this.options;
							if (c.containment == "parent")
								c.containment = this.helper[0].parentNode;
							if (c.containment == "document"
									|| c.containment == "window")
								this.containment = [
										0 - this.offset.relative.left
												- this.offset.parent.left,
										0 - this.offset.relative.top
												- this.offset.parent.top,
										a(
												c.containment == "document" ? document
														: window).width()
												- this.helperProportions.width
												- this.margins.left,
										(a(
												c.containment == "document" ? document
														: window).height() || document.body.parentNode.scrollHeight)
												- this.helperProportions.height
												- this.margins.top ];
							if (!/^(document|window|parent)$/
									.test(c.containment)) {
								var d = a(c.containment)[0];
								c = a(c.containment).offset();
								var g = a(d).css("overflow") != "hidden";
								this.containment = [
										c.left
												+ (parseInt(a(d).css(
														"borderLeftWidth"), 10) || 0)
												+ (parseInt(a(d).css(
														"paddingLeft"), 10) || 0)
												- this.margins.left,
										c.top
												+ (parseInt(a(d).css(
														"borderTopWidth"), 10) || 0)
												+ (parseInt(a(d).css(
														"paddingTop"), 10) || 0)
												- this.margins.top,
										c.left
												+ (g ? Math.max(d.scrollWidth,
														d.offsetWidth)
														: d.offsetWidth)
												- (parseInt(a(d).css(
														"borderLeftWidth"), 10) || 0)
												- (parseInt(a(d).css(
														"paddingRight"), 10) || 0)
												- this.helperProportions.width
												- this.margins.left,
										c.top
												+ (g ? Math.max(d.scrollHeight,
														d.offsetHeight)
														: d.offsetHeight)
												- (parseInt(a(d).css(
														"borderTopWidth"), 10) || 0)
												- (parseInt(a(d).css(
														"paddingBottom"), 10) || 0)
												- this.helperProportions.height
												- this.margins.top ]
							}
						},
						_convertPositionTo : function(c, d) {
							if (!d)
								d = this.position;
							c = c == "absolute" ? 1 : -1;
							var g = this.cssPosition == "absolute"
									&& !(this.scrollParent[0] != document && a.ui
											.contains(this.scrollParent[0],
													this.offsetParent[0])) ? this.offsetParent
									: this.scrollParent, f = /(html|body)/i
									.test(g[0].tagName);
							return {
								top : d.top
										+ this.offset.relative.top
										* c
										+ this.offset.parent.top
										* c
										- (a.browser.safari
												&& this.cssPosition == "fixed" ? 0
												: (this.cssPosition == "fixed" ? -this.scrollParent
														.scrollTop()
														: f ? 0 : g.scrollTop())
														* c),
								left : d.left
										+ this.offset.relative.left
										* c
										+ this.offset.parent.left
										* c
										- (a.browser.safari
												&& this.cssPosition == "fixed" ? 0
												: (this.cssPosition == "fixed" ? -this.scrollParent
														.scrollLeft()
														: f ? 0 : g
																.scrollLeft())
														* c)
							}
						},
						_generatePosition : function(c) {
							var d = this.options, g = this.cssPosition == "absolute"
									&& !(this.scrollParent[0] != document && a.ui
											.contains(this.scrollParent[0],
													this.offsetParent[0])) ? this.offsetParent
									: this.scrollParent, f = /(html|body)/i
									.test(g[0].tagName);
							if (this.cssPosition == "relative"
									&& !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0]))
								this.offset.relative = this
										._getRelativeOffset();
							var b = c.pageX, e = c.pageY;
							if (this.originalPosition) {
								if (this.containment) {
									if (c.pageX - this.offset.click.left < this.containment[0])
										b = this.containment[0]
												+ this.offset.click.left;
									if (c.pageY - this.offset.click.top < this.containment[1])
										e = this.containment[1]
												+ this.offset.click.top;
									if (c.pageX - this.offset.click.left > this.containment[2])
										b = this.containment[2]
												+ this.offset.click.left;
									if (c.pageY - this.offset.click.top > this.containment[3])
										e = this.containment[3]
												+ this.offset.click.top
								}
								if (d.grid) {
									e = this.originalPageY
											+ Math
													.round((e - this.originalPageY)
															/ d.grid[1])
											* d.grid[1];
									e = this.containment ? !(e
											- this.offset.click.top < this.containment[1] || e
											- this.offset.click.top > this.containment[3]) ? e
											: !(e - this.offset.click.top < this.containment[1]) ? e
													- d.grid[1]
													: e + d.grid[1]
											: e;
									b = this.originalPageX
											+ Math
													.round((b - this.originalPageX)
															/ d.grid[0])
											* d.grid[0];
									b = this.containment ? !(b
											- this.offset.click.left < this.containment[0] || b
											- this.offset.click.left > this.containment[2]) ? b
											: !(b - this.offset.click.left < this.containment[0]) ? b
													- d.grid[0]
													: b + d.grid[0]
											: b
								}
							}
							return {
								top : e
										- this.offset.click.top
										- this.offset.relative.top
										- this.offset.parent.top
										+ (a.browser.safari
												&& this.cssPosition == "fixed" ? 0
												: this.cssPosition == "fixed" ? -this.scrollParent
														.scrollTop()
														: f ? 0 : g.scrollTop()),
								left : b
										- this.offset.click.left
										- this.offset.relative.left
										- this.offset.parent.left
										+ (a.browser.safari
												&& this.cssPosition == "fixed" ? 0
												: this.cssPosition == "fixed" ? -this.scrollParent
														.scrollLeft()
														: f ? 0 : g
																.scrollLeft())
							}
						},
						_rearrange : function(c, d, g, f) {
							g ? g[0].appendChild(this.placeholder[0])
									: d.item[0].parentNode
											.insertBefore(
													this.placeholder[0],
													this.direction == "down" ? d.item[0]
															: d.item[0].nextSibling);
							this.counter = this.counter ? ++this.counter : 1;
							var b = this, e = this.counter;
							window.setTimeout(function() {
								e == b.counter && b.refreshPositions(!f)
							}, 0)
						},
						_clear : function(c, d) {
							this.reverting = false;
							var g = [];
							!this._noFinalSort
									&& this.currentItem[0].parentNode
									&& this.placeholder
											.before(this.currentItem);
							this._noFinalSort = null;
							if (this.helper[0] == this.currentItem[0]) {
								for ( var f in this._storedCSS)
									if (this._storedCSS[f] == "auto"
											|| this._storedCSS[f] == "static")
										this._storedCSS[f] = "";
								this.currentItem.css(this._storedCSS)
										.removeClass("ui-sortable-helper")
							} else
								this.currentItem.show();
							this.fromOutside
									&& !d
									&& g.push(function(b) {
										this._trigger("receive", b, this
												._uiHash(this.fromOutside))
									});
							if ((this.fromOutside
									|| this.domPosition.prev != this.currentItem
											.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem
									.parent()[0])
									&& !d)
								g.push(function(b) {
									this._trigger("update", b, this._uiHash())
								});
							if (!a.ui.contains(this.element[0],
									this.currentItem[0])) {
								d || g.push(function(b) {
									this._trigger("remove", b, this._uiHash())
								});
								for (f = this.containers.length - 1; f >= 0; f--)
									if (a.ui.contains(
											this.containers[f].element[0],
											this.currentItem[0])
											&& !d) {
										g.push(function(b) {
											return function(e) {
												b._trigger("receive", e, this
														._uiHash(this))
											}
										}.call(this, this.containers[f]));
										g.push(function(b) {
											return function(e) {
												b._trigger("update", e, this
														._uiHash(this))
											}
										}.call(this, this.containers[f]))
									}
							}
							for (f = this.containers.length - 1; f >= 0; f--) {
								d
										|| g.push(function(b) {
											return function(e) {
												b._trigger("deactivate", e,
														this._uiHash(this))
											}
										}.call(this, this.containers[f]));
								if (this.containers[f].containerCache.over) {
									g.push(function(b) {
										return function(e) {
											b._trigger("out", e, this
													._uiHash(this))
										}
									}.call(this, this.containers[f]));
									this.containers[f].containerCache.over = 0
								}
							}
							this._storedCursor
									&& a("body").css("cursor",
											this._storedCursor);
							this._storedOpacity
									&& this.helper.css("opacity",
											this._storedOpacity);
							if (this._storedZIndex)
								this.helper.css("zIndex",
										this._storedZIndex == "auto" ? ""
												: this._storedZIndex);
							this.dragging = false;
							if (this.cancelHelperRemoval) {
								if (!d) {
									this._trigger("beforeStop", c, this
											._uiHash());
									for (f = 0; f < g.length; f++)
										g[f].call(this, c);
									this._trigger("stop", c, this._uiHash())
								}
								return false
							}
							d || this._trigger("beforeStop", c, this._uiHash());
							this.placeholder[0].parentNode
									.removeChild(this.placeholder[0]);
							this.helper[0] != this.currentItem[0]
									&& this.helper.remove();
							this.helper = null;
							if (!d) {
								for (f = 0; f < g.length; f++)
									g[f].call(this, c);
								this._trigger("stop", c, this._uiHash())
							}
							this.fromOutside = false;
							return true
						},
						_trigger : function() {
							a.Widget.prototype._trigger.apply(this, arguments) === false
									&& this.cancel()
						},
						_uiHash : function(c) {
							var d = c || this;
							return {
								helper : d.helper,
								placeholder : d.placeholder || a([]),
								position : d.position,
								originalPosition : d.originalPosition,
								offset : d.positionAbs,
								item : d.currentItem,
								sender : c ? c.element : null
							}
						}
					});
	a.extend(a.ui.sortable, {
		version : "1.8.11"
	})
})(jQuery);
(function(a) {
	a
			.widget(
					"ui.accordion",
					{
						options : {
							active : 0,
							animated : "slide",
							autoHeight : true,
							clearStyle : false,
							collapsible : false,
							event : "click",
							fillSpace : false,
							header : "> li > :first-child,> :not(li):even",
							icons : {
								header : "ui-icon-triangle-1-e",
								headerSelected : "ui-icon-triangle-1-s"
							},
							navigation : false,
							navigationFilter : function() {
								return this.href.toLowerCase() === location.href
										.toLowerCase()
							}
						},
						_create : function() {
							var c = this, d = c.options;
							c.running = 0;
							c.element.addClass(
									"ui-accordion ui-widget ui-helper-reset")
									.children("li").addClass(
											"ui-accordion-li-fix");
							c.headers = c.element
									.find(d.header)
									.addClass(
											"ui-accordion-header ui-helper-reset ui-state-default ui-corner-all")
									.bind(
											"mouseenter.accordion",
											function() {
												d.disabled
														|| a(this)
																.addClass(
																		"ui-state-hover")
											})
									.bind(
											"mouseleave.accordion",
											function() {
												d.disabled
														|| a(this)
																.removeClass(
																		"ui-state-hover")
											})
									.bind(
											"focus.accordion",
											function() {
												d.disabled
														|| a(this)
																.addClass(
																		"ui-state-focus")
											})
									.bind(
											"blur.accordion",
											function() {
												d.disabled
														|| a(this)
																.removeClass(
																		"ui-state-focus")
											});
							c.headers
									.next()
									.addClass(
											"ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
							if (d.navigation) {
								var g = c.element.find("a").filter(
										d.navigationFilter).eq(0);
								if (g.length) {
									var f = g.closest(".ui-accordion-header");
									c.active = f.length ? f : g.closest(
											".ui-accordion-content").prev()
								}
							}
							c.active = c._findActive(c.active || d.active)
									.addClass(
											"ui-state-default ui-state-active")
									.toggleClass("ui-corner-all").toggleClass(
											"ui-corner-top");
							c.active.next().addClass(
									"ui-accordion-content-active");
							c._createIcons();
							c.resize();
							c.element.attr("role", "tablist");
							c.headers.attr("role", "tab").bind(
									"keydown.accordion", function(b) {
										return c._keydown(b)
									}).next().attr("role", "tabpanel");
							c.headers.not(c.active || "").attr({
								"aria-expanded" : "false",
								"aria-selected" : "false",
								tabIndex : -1
							}).next().hide();
							c.active.length ? c.active.attr({
								"aria-expanded" : "true",
								"aria-selected" : "true",
								tabIndex : 0
							}) : c.headers.eq(0).attr("tabIndex", 0);
							a.browser.safari
									|| c.headers.find("a").attr("tabIndex", -1);
							d.event
									&& c.headers.bind(d.event.split(" ").join(
											".accordion ")
											+ ".accordion", function(b) {
										c._clickHandler.call(c, b, this);
										b.preventDefault()
									})
						},
						_createIcons : function() {
							var c = this.options;
							if (c.icons) {
								a("<span></span>").addClass(
										"ui-icon " + c.icons.header).prependTo(
										this.headers);
								this.active.children(".ui-icon").toggleClass(
										c.icons.header).toggleClass(
										c.icons.headerSelected);
								this.element.addClass("ui-accordion-icons")
							}
						},
						_destroyIcons : function() {
							this.headers.children(".ui-icon").remove();
							this.element.removeClass("ui-accordion-icons")
						},
						destroy : function() {
							var c = this.options;
							this.element.removeClass(
									"ui-accordion ui-widget ui-helper-reset")
									.removeAttr("role");
							this.headers
									.unbind(".accordion")
									.removeClass(
											"ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top")
									.removeAttr("role").removeAttr(
											"aria-expanded").removeAttr(
											"aria-selected").removeAttr(
											"tabIndex");
							this.headers.find("a").removeAttr("tabIndex");
							this._destroyIcons();
							var d = this.headers
									.next()
									.css("display", "")
									.removeAttr("role")
									.removeClass(
											"ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
							if (c.autoHeight || c.fillHeight)
								d.css("height", "");
							return a.Widget.prototype.destroy.call(this)
						},
						_setOption : function(c, d) {
							a.Widget.prototype._setOption
									.apply(this, arguments);
							c == "active" && this.activate(d);
							if (c == "icons") {
								this._destroyIcons();
								d && this._createIcons()
							}
							if (c == "disabled")
								this.headers.add(this.headers.next())[d ? "addClass"
										: "removeClass"]
										("ui-accordion-disabled ui-state-disabled")
						},
						_keydown : function(c) {
							if (!(this.options.disabled || c.altKey || c.ctrlKey)) {
								var d = a.ui.keyCode, g = this.headers.length, f = this.headers
										.index(c.target), b = false;
								switch (c.keyCode) {
								case d.RIGHT:
								case d.DOWN:
									b = this.headers[(f + 1) % g];
									break;
								case d.LEFT:
								case d.UP:
									b = this.headers[(f - 1 + g) % g];
									break;
								case d.SPACE:
								case d.ENTER:
									this._clickHandler({
										target : c.target
									}, c.target);
									c.preventDefault()
								}
								if (b) {
									a(c.target).attr("tabIndex", -1);
									a(b).attr("tabIndex", 0);
									b.focus();
									return false
								}
								return true
							}
						},
						resize : function() {
							var c = this.options, d;
							if (c.fillSpace) {
								if (a.browser.msie) {
									var g = this.element.parent().css(
											"overflow");
									this.element.parent().css("overflow",
											"hidden")
								}
								d = this.element.parent().height();
								a.browser.msie
										&& this.element.parent().css(
												"overflow", g);
								this.headers.each(function() {
									d -= a(this).outerHeight(true)
								});
								this.headers
										.next()
										.each(
												function() {
													a(this)
															.height(
																	Math
																			.max(
																					0,
																					d
																							- a(
																									this)
																									.innerHeight()
																							+ a(
																									this)
																									.height()))
												}).css("overflow", "auto")
							} else if (c.autoHeight) {
								d = 0;
								this.headers.next().each(
										function() {
											d = Math.max(d, a(this).height("")
													.height())
										}).height(d)
							}
							return this
						},
						activate : function(c) {
							this.options.active = c;
							c = this._findActive(c)[0];
							this._clickHandler({
								target : c
							}, c);
							return this
						},
						_findActive : function(c) {
							return c ? typeof c === "number" ? this.headers
									.filter(":eq(" + c + ")") : this.headers
									.not(this.headers.not(c))
									: c === false ? a([]) : this.headers
											.filter(":eq(0)")
						},
						_clickHandler : function(c, d) {
							var g = this.options;
							if (!g.disabled)
								if (c.target) {
									c = a(c.currentTarget || d);
									d = c[0] === this.active[0];
									g.active = g.collapsible && d ? false
											: this.headers.index(c);
									if (!(this.running || !g.collapsible && d)) {
										var f = this.active;
										j = c.next();
										e = this.active.next();
										h = {
											options : g,
											newHeader : d && g.collapsible ? a([])
													: c,
											oldHeader : this.active,
											newContent : d && g.collapsible ? a([])
													: j,
											oldContent : e
										};
										var b = this.headers
												.index(this.active[0]) > this.headers
												.index(c[0]);
										this.active = d ? a([]) : c;
										this._toggle(j, e, h, d, b);
										f
												.removeClass(
														"ui-state-active ui-corner-top")
												.addClass(
														"ui-state-default ui-corner-all")
												.children(".ui-icon")
												.removeClass(
														g.icons.headerSelected)
												.addClass(g.icons.header);
										if (!d) {
											c
													.removeClass(
															"ui-state-default ui-corner-all")
													.addClass(
															"ui-state-active ui-corner-top")
													.children(".ui-icon")
													.removeClass(g.icons.header)
													.addClass(
															g.icons.headerSelected);
											c
													.next()
													.addClass(
															"ui-accordion-content-active")
										}
									}
								} else if (g.collapsible) {
									this.active
											.removeClass(
													"ui-state-active ui-corner-top")
											.addClass(
													"ui-state-default ui-corner-all")
											.children(".ui-icon").removeClass(
													g.icons.headerSelected)
											.addClass(g.icons.header);
									this.active.next().addClass(
											"ui-accordion-content-active");
									var e = this.active.next(), h = {
										options : g,
										newHeader : a([]),
										oldHeader : g.active,
										newContent : a([]),
										oldContent : e
									}, j = this.active = a([]);
									this._toggle(j, e, h)
								}
						},
						_toggle : function(c, d, g, f, b) {
							var e = this, h = e.options;
							e.toShow = c;
							e.toHide = d;
							e.data = g;
							var j = function() {
								if (e)
									return e._completed.apply(e, arguments)
							};
							e._trigger("changestart", null, e.data);
							e.running = d.size() === 0 ? c.size() : d.size();
							if (h.animated) {
								g = {};
								g = h.collapsible && f ? {
									toShow : a([]),
									toHide : d,
									complete : j,
									down : b,
									autoHeight : h.autoHeight || h.fillSpace
								} : {
									toShow : c,
									toHide : d,
									complete : j,
									down : b,
									autoHeight : h.autoHeight || h.fillSpace
								};
								if (!h.proxied)
									h.proxied = h.animated;
								if (!h.proxiedDuration)
									h.proxiedDuration = h.duration;
								h.animated = a.isFunction(h.proxied) ? h
										.proxied(g) : h.proxied;
								h.duration = a.isFunction(h.proxiedDuration) ? h
										.proxiedDuration(g)
										: h.proxiedDuration;
								f = a.ui.accordion.animations;
								var k = h.duration, p = h.animated;
								if (p && !f[p] && !a.easing[p])
									p = "slide";
								f[p] || (f[p] = function(s) {
									this.slide(s, {
										easing : p,
										duration : k || 700
									})
								});
								f[p](g)
							} else {
								if (h.collapsible && f)
									c.toggle();
								else {
									d.hide();
									c.show()
								}
								j(true)
							}
							d.prev().attr({
								"aria-expanded" : "false",
								"aria-selected" : "false",
								tabIndex : -1
							}).blur();
							c.prev().attr({
								"aria-expanded" : "true",
								"aria-selected" : "true",
								tabIndex : 0
							}).focus()
						},
						_completed : function(c) {
							this.running = c ? 0 : --this.running;
							if (!this.running) {
								this.options.clearStyle
										&& this.toShow.add(this.toHide).css({
											height : "",
											overflow : ""
										});
								this.toHide
										.removeClass("ui-accordion-content-active");
								if (this.toHide.length)
									this.toHide.parent()[0].className = this.toHide
											.parent()[0].className;
								this._trigger("change", null, this.data)
							}
						}
					});
	a
			.extend(
					a.ui.accordion,
					{
						version : "1.8.11",
						animations : {
							slide : function(c, d) {
								c = a.extend({
									easing : "swing",
									duration : 300
								}, c, d);
								if (c.toHide.size())
									if (c.toShow.size()) {
										var g = c.toShow.css("overflow"), f = 0, b = {}, e = {}, h;
										d = c.toShow;
										h = d[0].style.width;
										d
												.width(parseInt(d.parent()
														.width(), 10)
														- parseInt(
																d
																		.css("paddingLeft"),
																10)
														- parseInt(
																d
																		.css("paddingRight"),
																10)
														- (parseInt(
																d
																		.css("borderLeftWidth"),
																10) || 0)
														- (parseInt(
																d
																		.css("borderRightWidth"),
																10) || 0));
										a.each([ "height", "paddingTop",
												"paddingBottom" ], function(j,
												k) {
											e[k] = "hide";
											j = ("" + a.css(c.toShow[0], k))
													.match(/^([\d+-.]+)(.*)$/);
											b[k] = {
												value : j[1],
												unit : j[2] || "px"
											}
										});
										c.toShow.css({
											height : 0,
											overflow : "hidden"
										}).show();
										c.toHide
												.filter(":hidden")
												.each(c.complete)
												.end()
												.filter(":visible")
												.animate(
														e,
														{
															step : function(j,
																	k) {
																if (k.prop == "height")
																	f = k.end
																			- k.start === 0 ? 0
																			: (k.now - k.start)
																					/ (k.end - k.start);
																c.toShow[0].style[k.prop] = f
																		* b[k.prop].value
																		+ b[k.prop].unit
															},
															duration : c.duration,
															easing : c.easing,
															complete : function() {
																c.autoHeight
																		|| c.toShow
																				.css(
																						"height",
																						"");
																c.toShow
																		.css({
																			width : h,
																			overflow : g
																		});
																c.complete()
															}
														})
									} else
										c.toHide.animate({
											height : "hide",
											paddingTop : "hide",
											paddingBottom : "hide"
										}, c);
								else
									c.toShow.animate({
										height : "show",
										paddingTop : "show",
										paddingBottom : "show"
									}, c)
							},
							bounceslide : function(c) {
								this.slide(c,
										{
											easing : c.down ? "easeOutBounce"
													: "swing",
											duration : c.down ? 1E3 : 200
										})
							}
						}
					})
})(jQuery);
(function(a) {
	var c = 0;
	a
			.widget(
					"ui.autocomplete",
					{
						options : {
							appendTo : "body",
							autoFocus : false,
							delay : 300,
							minLength : 1,
							position : {
								my : "left top",
								at : "left bottom",
								collision : "none"
							},
							source : null
						},
						pending : 0,
						_create : function() {
							var d = this, g = this.element[0].ownerDocument, f;
							this.element
									.addClass("ui-autocomplete-input")
									.attr("autocomplete", "off")
									.attr({
										role : "textbox",
										"aria-autocomplete" : "list",
										"aria-haspopup" : "true"
									})
									.bind(
											"keydown.autocomplete",
											function(b) {
												if (!(d.options.disabled || d.element
														.attr("readonly"))) {
													f = false;
													var e = a.ui.keyCode;
													switch (b.keyCode) {
													case e.PAGE_UP:
														d._move("previousPage",
																b);
														break;
													case e.PAGE_DOWN:
														d._move("nextPage", b);
														break;
													case e.UP:
														d._move("previous", b);
														b.preventDefault();
														break;
													case e.DOWN:
														d._move("next", b);
														b.preventDefault();
														break;
													case e.ENTER:
													case e.NUMPAD_ENTER:
														if (d.menu.active) {
															f = true;
															b.preventDefault()
														}
													case e.TAB:
														if (!d.menu.active)
															return;
														d.menu.select(b);
														break;
													case e.ESCAPE:
														d.element.val(d.term);
														d.close(b);
														break;
													default:
														clearTimeout(d.searching);
														d.searching = setTimeout(
																function() {
																	if (d.term != d.element
																			.val()) {
																		d.selectedItem = null;
																		d
																				.search(
																						null,
																						b)
																	}
																},
																d.options.delay);
														break
													}
												}
											}).bind("keypress.autocomplete",
											function(b) {
												if (f) {
													f = false;
													b.preventDefault()
												}
											}).bind(
											"focus.autocomplete",
											function() {
												if (!d.options.disabled) {
													d.selectedItem = null;
													d.previous = d.element
															.val()
												}
											}).bind(
											"blur.autocomplete",
											function(b) {
												if (!d.options.disabled) {
													clearTimeout(d.searching);
													d.closing = setTimeout(
															function() {
																d.close(b);
																d._change(b)
															}, 150)
												}
											});
							this._initSource();
							this.response = function() {
								return d._response.apply(d, arguments)
							};
							this.menu = a("<ul></ul>")
									.addClass("ui-autocomplete")
									.appendTo(
											a(this.options.appendTo || "body",
													g)[0])
									.mousedown(
											function(b) {
												var e = d.menu.element[0];
												a(b.target).closest(
														".ui-menu-item").length
														|| setTimeout(
																function() {
																	a(document)
																			.one(
																					"mousedown",
																					function(
																							h) {
																						h.target !== d.element[0]
																								&& h.target !== e
																								&& !a.ui
																										.contains(
																												e,
																												h.target)
																								&& d
																										.close()
																					})
																}, 1);
												setTimeout(function() {
													clearTimeout(d.closing)
												}, 13)
											})
									.menu(
											{
												focus : function(b, e) {
													e = e.item
															.data("item.autocomplete");
													false !== d._trigger(
															"focus", b, {
																item : e
															})
															&& /^key/
																	.test(b.originalEvent.type)
															&& d.element
																	.val(e.value)
												},
												selected : function(b, e) {
													var h = e.item
															.data("item.autocomplete"), j = d.previous;
													if (d.element[0] !== g.activeElement) {
														d.element.focus();
														d.previous = j;
														setTimeout(function() {
															d.previous = j;
															d.selectedItem = h
														}, 1)
													}
													false !== d._trigger(
															"select", b, {
																item : h
															})
															&& d.element
																	.val(h.value);
													d.term = d.element.val();
													d.close(b);
													d.selectedItem = h
												},
												blur : function() {
													d.menu.element
															.is(":visible")
															&& d.element.val() !== d.term
															&& d.element
																	.val(d.term)
												}
											})
									.zIndex(this.element.zIndex() + 1).css({
										top : 0,
										left : 0
									}).hide().data("menu");
							a.fn.bgiframe && this.menu.element.bgiframe()
						},
						destroy : function() {
							this.element.removeClass("ui-autocomplete-input")
									.removeAttr("autocomplete").removeAttr(
											"role").removeAttr(
											"aria-autocomplete").removeAttr(
											"aria-haspopup");
							this.menu.element.remove();
							a.Widget.prototype.destroy.call(this)
						},
						_setOption : function(d, g) {
							a.Widget.prototype._setOption
									.apply(this, arguments);
							d === "source" && this._initSource();
							if (d === "appendTo")
								this.menu.element.appendTo(a(g || "body",
										this.element[0].ownerDocument)[0]);
							d === "disabled" && g && this.xhr
									&& this.xhr.abort()
						},
						_initSource : function() {
							var d = this, g, f;
							if (a.isArray(this.options.source)) {
								g = this.options.source;
								this.source = function(b, e) {
									e(a.ui.autocomplete.filter(g, b.term))
								}
							} else if (typeof this.options.source === "string") {
								f = this.options.source;
								this.source = function(b, e) {
									d.xhr && d.xhr.abort();
									d.xhr = a.ajax({
										url : f,
										data : b,
										dataType : "json",
										autocompleteRequest : ++c,
										success : function(h) {
											this.autocompleteRequest === c
													&& e(h)
										},
										error : function() {
											this.autocompleteRequest === c
													&& e([])
										}
									})
								}
							} else
								this.source = this.options.source
						},
						search : function(d, g) {
							d = d != null ? d : this.element.val();
							this.term = this.element.val();
							if (d.length < this.options.minLength)
								return this.close(g);
							clearTimeout(this.closing);
							if (this._trigger("search", g) !== false)
								return this._search(d)
						},
						_search : function(d) {
							this.pending++;
							this.element.addClass("ui-autocomplete-loading");
							this.source({
								term : d
							}, this.response)
						},
						_response : function(d) {
							if (!this.options.disabled && d && d.length) {
								d = this._normalize(d);
								this._suggest(d);
								this._trigger("open")
							} else
								this.close();
							this.pending--;
							this.pending
									|| this.element
											.removeClass("ui-autocomplete-loading")
						},
						close : function(d) {
							clearTimeout(this.closing);
							if (this.menu.element.is(":visible")) {
								this.menu.element.hide();
								this.menu.deactivate();
								this._trigger("close", d)
							}
						},
						_change : function(d) {
							this.previous !== this.element.val()
									&& this._trigger("change", d, {
										item : this.selectedItem
									})
						},
						_normalize : function(d) {
							if (d.length && d[0].label && d[0].value)
								return d;
							return a.map(d, function(g) {
								if (typeof g === "string")
									return {
										label : g,
										value : g
									};
								return a.extend({
									label : g.label || g.value,
									value : g.value || g.label
								}, g)
							})
						},
						_suggest : function(d) {
							var g = this.menu.element.empty().zIndex(
									this.element.zIndex() + 1);
							this._renderMenu(g, d);
							this.menu.deactivate();
							this.menu.refresh();
							g.show();
							this._resizeMenu();
							g.position(a.extend({
								of : this.element
							}, this.options.position));
							this.options.autoFocus
									&& this.menu.next(new a.Event("mouseover"))
						},
						_resizeMenu : function() {
							var d = this.menu.element;
							d.outerWidth(Math.max(d.width("").outerWidth(),
									this.element.outerWidth()))
						},
						_renderMenu : function(d, g) {
							var f = this;
							a.each(g, function(b, e) {
								f._renderItem(d, e)
							})
						},
						_renderItem : function(d, g) {
							return a("<li></li>").data("item.autocomplete", g)
									.append(a("<a></a>").text(g.label))
									.appendTo(d)
						},
						_move : function(d, g) {
							if (this.menu.element.is(":visible"))
								if (this.menu.first() && /^previous/.test(d)
										|| this.menu.last() && /^next/.test(d)) {
									this.element.val(this.term);
									this.menu.deactivate()
								} else
									this.menu[d](g);
							else
								this.search(null, g)
						},
						widget : function() {
							return this.menu.element
						}
					});
	a.extend(a.ui.autocomplete, {
		escapeRegex : function(d) {
			return d.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
		},
		filter : function(d, g) {
			var f = new RegExp(a.ui.autocomplete.escapeRegex(g), "i");
			return a.grep(d, function(b) {
				return f.test(b.label || b.value || b)
			})
		}
	})
})(jQuery);
(function(a) {
	a
			.widget(
					"ui.menu",
					{
						_create : function() {
							var c = this;
							this.element
									.addClass(
											"ui-menu ui-widget ui-widget-content ui-corner-all")
									.attr(
											{
												role : "listbox",
												"aria-activedescendant" : "ui-active-menuitem"
											})
									.click(
											function(d) {
												if (a(d.target).closest(
														".ui-menu-item a").length) {
													d.preventDefault();
													c.select(d)
												}
											});
							this.refresh()
						},
						refresh : function() {
							var c = this;
							this.element.children(
									"li:not(.ui-menu-item):has(a)").addClass(
									"ui-menu-item").attr("role", "menuitem")
									.children("a").addClass("ui-corner-all")
									.attr("tabindex", -1).mouseenter(
											function(d) {
												c.activate(d, a(this).parent())
											}).mouseleave(function() {
										c.deactivate()
									})
						},
						activate : function(c, d) {
							this.deactivate();
							if (this.hasScroll()) {
								var g = d.offset().top
										- this.element.offset().top, f = this.element
										.attr("scrollTop"), b = this.element
										.height();
								if (g < 0)
									this.element.attr("scrollTop", f + g);
								else
									g >= b
											&& this.element.attr("scrollTop", f
													+ g - b + d.height())
							}
							this.active = d.eq(0).children("a").addClass(
									"ui-state-hover").attr("id",
									"ui-active-menuitem").end();
							this._trigger("focus", c, {
								item : d
							})
						},
						deactivate : function() {
							if (this.active) {
								this.active.children("a").removeClass(
										"ui-state-hover").removeAttr("id");
								this._trigger("blur");
								this.active = null
							}
						},
						next : function(c) {
							this.move("next", ".ui-menu-item:first", c)
						},
						previous : function(c) {
							this.move("prev", ".ui-menu-item:last", c)
						},
						first : function() {
							return this.active
									&& !this.active.prevAll(".ui-menu-item").length
						},
						last : function() {
							return this.active
									&& !this.active.nextAll(".ui-menu-item").length
						},
						move : function(c, d, g) {
							if (this.active) {
								c = this.active[c + "All"](".ui-menu-item").eq(
										0);
								c.length ? this.activate(g, c) : this.activate(
										g, this.element.children(d))
							} else
								this.activate(g, this.element.children(d))
						},
						nextPage : function(c) {
							if (this.hasScroll())
								if (!this.active || this.last())
									this.activate(c, this.element
											.children(".ui-menu-item:first"));
								else {
									var d = this.active.offset().top, g = this.element
											.height(), f = this.element
											.children(".ui-menu-item")
											.filter(
													function() {
														var b = a(this)
																.offset().top
																- d
																- g
																+ a(this)
																		.height();
														return b < 10
																&& b > -10
													});
									f.length
											|| (f = this.element
													.children(".ui-menu-item:last"));
									this.activate(c, f)
								}
							else
								this.activate(c, this.element.children(
										".ui-menu-item").filter(
										!this.active || this.last() ? ":first"
												: ":last"))
						},
						previousPage : function(c) {
							if (this.hasScroll())
								if (!this.active || this.first())
									this.activate(c, this.element
											.children(".ui-menu-item:last"));
								else {
									var d = this.active.offset().top, g = this.element
											.height();
									result = this.element.children(
											".ui-menu-item").filter(
											function() {
												var f = a(this).offset().top
														- d + g
														- a(this).height();
												return f < 10 && f > -10
											});
									result.length
											|| (result = this.element
													.children(".ui-menu-item:first"));
									this.activate(c, result)
								}
							else
								this.activate(c, this.element.children(
										".ui-menu-item").filter(
										!this.active || this.first() ? ":last"
												: ":first"))
						},
						hasScroll : function() {
							return this.element.height() < this.element
									.attr("scrollHeight")
						},
						select : function(c) {
							this._trigger("selected", c, {
								item : this.active
							})
						}
					})
})(jQuery);
(function(a) {
	var c, d = function(f) {
		a(":ui-button", f.target.form).each(function() {
			var b = a(this).data("button");
			setTimeout(function() {
				b.refresh()
			}, 1)
		})
	}, g = function(f) {
		var b = f.name, e = f.form, h = a([]);
		if (b)
			h = e ? a(e).find("[name='" + b + "']") : a("[name='" + b + "']",
					f.ownerDocument).filter(function() {
				return !this.form
			});
		return h
	};
	a
			.widget(
					"ui.button",
					{
						options : {
							disabled : null,
							text : true,
							label : null,
							icons : {
								primary : null,
								secondary : null
							}
						},
						_create : function() {
							this.element.closest("form").unbind("reset.button")
									.bind("reset.button", d);
							if (typeof this.options.disabled !== "boolean")
								this.options.disabled = this.element
										.attr("disabled");
							this._determineButtonType();
							this.hasTitle = !!this.buttonElement.attr("title");
							var f = this, b = this.options, e = this.type === "checkbox"
									|| this.type === "radio", h = "ui-state-hover"
									+ (!e ? " ui-state-active" : "");
							if (b.label === null)
								b.label = this.buttonElement.html();
							if (this.element.is(":disabled"))
								b.disabled = true;
							this.buttonElement
									.addClass(
											"ui-button ui-widget ui-state-default ui-corner-all")
									.attr("role", "button")
									.bind(
											"mouseenter.button",
											function() {
												if (!b.disabled) {
													a(this).addClass(
															"ui-state-hover");
													this === c
															&& a(this)
																	.addClass(
																			"ui-state-active")
												}
											}).bind(
											"mouseleave.button",
											function() {
												b.disabled
														|| a(this).removeClass(
																h)
											}).bind("focus.button", function() {
										a(this).addClass("ui-state-focus")
									}).bind("blur.button", function() {
										a(this).removeClass("ui-state-focus")
									});
							e && this.element.bind("change.button", function() {
								f.refresh()
							});
							if (this.type === "checkbox")
								this.buttonElement.bind("click.button",
										function() {
											if (b.disabled)
												return false;
											a(this).toggleClass(
													"ui-state-active");
											f.buttonElement.attr(
													"aria-pressed",
													f.element[0].checked)
										});
							else if (this.type === "radio")
								this.buttonElement
										.bind(
												"click.button",
												function() {
													if (b.disabled)
														return false;
													a(this).addClass(
															"ui-state-active");
													f.buttonElement.attr(
															"aria-pressed",
															true);
													var j = f.element[0];
													g(j)
															.not(j)
															.map(
																	function() {
																		return a(
																				this)
																				.button(
																						"widget")[0]
																	})
															.removeClass(
																	"ui-state-active")
															.attr(
																	"aria-pressed",
																	false)
												});
							else {
								this.buttonElement
										.bind(
												"mousedown.button",
												function() {
													if (b.disabled)
														return false;
													a(this).addClass(
															"ui-state-active");
													c = this;
													a(document).one("mouseup",
															function() {
																c = null
															})
												})
										.bind(
												"mouseup.button",
												function() {
													if (b.disabled)
														return false;
													a(this).removeClass(
															"ui-state-active")
												})
										.bind(
												"keydown.button",
												function(j) {
													if (b.disabled)
														return false;
													if (j.keyCode == a.ui.keyCode.SPACE
															|| j.keyCode == a.ui.keyCode.ENTER)
														a(this)
																.addClass(
																		"ui-state-active")
												}).bind(
												"keyup.button",
												function() {
													a(this).removeClass(
															"ui-state-active")
												});
								this.buttonElement.is("a")
										&& this.buttonElement
												.keyup(function(j) {
													j.keyCode === a.ui.keyCode.SPACE
															&& a(this).click()
												})
							}
							this._setOption("disabled", b.disabled)
						},
						_determineButtonType : function() {
							this.type = this.element.is(":checkbox") ? "checkbox"
									: this.element.is(":radio") ? "radio"
											: this.element.is("input") ? "input"
													: "button";
							if (this.type === "checkbox"
									|| this.type === "radio") {
								var f = this.element.parents().filter(":last"), b = "label[for="
										+ this.element.attr("id") + "]";
								this.buttonElement = f.find(b);
								if (!this.buttonElement.length) {
									f = f.length ? f.siblings() : this.element
											.siblings();
									this.buttonElement = f.filter(b);
									if (!this.buttonElement.length)
										this.buttonElement = f.find(b)
								}
								this.element
										.addClass("ui-helper-hidden-accessible");
								(f = this.element.is(":checked"))
										&& this.buttonElement
												.addClass("ui-state-active");
								this.buttonElement.attr("aria-pressed", f)
							} else
								this.buttonElement = this.element
						},
						widget : function() {
							return this.buttonElement
						},
						destroy : function() {
							this.element
									.removeClass("ui-helper-hidden-accessible");
							this.buttonElement
									.removeClass(
											"ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active  ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only")
									.removeAttr("role").removeAttr(
											"aria-pressed").html(
											this.buttonElement.find(
													".ui-button-text").html());
							this.hasTitle
									|| this.buttonElement.removeAttr("title");
							a.Widget.prototype.destroy.call(this)
						},
						_setOption : function(f, b) {
							a.Widget.prototype._setOption
									.apply(this, arguments);
							if (f === "disabled")
								b ? this.element.attr("disabled", true)
										: this.element.removeAttr("disabled");
							this._resetButton()
						},
						refresh : function() {
							var f = this.element.is(":disabled");
							f !== this.options.disabled
									&& this._setOption("disabled", f);
							if (this.type === "radio")
								g(this.element[0])
										.each(
												function() {
													a(this).is(":checked") ? a(
															this)
															.button("widget")
															.addClass(
																	"ui-state-active")
															.attr(
																	"aria-pressed",
																	true)
															: a(this)
																	.button(
																			"widget")
																	.removeClass(
																			"ui-state-active")
																	.attr(
																			"aria-pressed",
																			false)
												});
							else if (this.type === "checkbox")
								this.element.is(":checked") ? this.buttonElement
										.addClass("ui-state-active").attr(
												"aria-pressed", true)
										: this.buttonElement.removeClass(
												"ui-state-active").attr(
												"aria-pressed", false)
						},
						_resetButton : function() {
							if (this.type === "input")
								this.options.label
										&& this.element.val(this.options.label);
							else {
								var f = this.buttonElement
										.removeClass("ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only"), b = a(
										"<span></span>").addClass(
										"ui-button-text").html(
										this.options.label).appendTo(f.empty())
										.text(), e = this.options.icons, h = e.primary
										&& e.secondary, j = [];
								if (e.primary || e.secondary) {
									if (this.options.text)
										j
												.push("ui-button-text-icon"
														+ (h ? "s"
																: e.primary ? "-primary"
																		: "-secondary"));
									e.primary
											&& f
													.prepend("<span class='ui-button-icon-primary ui-icon "
															+ e.primary
															+ "'></span>");
									e.secondary
											&& f
													.append("<span class='ui-button-icon-secondary ui-icon "
															+ e.secondary
															+ "'></span>");
									if (!this.options.text) {
										j.push(h ? "ui-button-icons-only"
												: "ui-button-icon-only");
										this.hasTitle || f.attr("title", b)
									}
								} else
									j.push("ui-button-text-only");
								f.addClass(j.join(" "))
							}
						}
					});
	a
			.widget(
					"ui.buttonset",
					{
						options : {
							items : ":button, :submit, :reset, :checkbox, :radio, a, :data(button)"
						},
						_create : function() {
							this.element.addClass("ui-buttonset")
						},
						_init : function() {
							this.refresh()
						},
						_setOption : function(f, b) {
							f === "disabled"
									&& this.buttons.button("option", f, b);
							a.Widget.prototype._setOption
									.apply(this, arguments)
						},
						refresh : function() {
							this.buttons = this.element
									.find(this.options.items)
									.filter(":ui-button")
									.button("refresh")
									.end()
									.not(":ui-button")
									.button()
									.end()
									.map(function() {
										return a(this).button("widget")[0]
									})
									.removeClass(
											"ui-corner-all ui-corner-left ui-corner-right")
									.filter(":first")
									.addClass("ui-corner-left").end().filter(
											":last")
									.addClass("ui-corner-right").end().end()
						},
						destroy : function() {
							this.element.removeClass("ui-buttonset");
							this.buttons.map(function() {
								return a(this).button("widget")[0]
							}).removeClass("ui-corner-left ui-corner-right")
									.end().button("destroy");
							a.Widget.prototype.destroy.call(this)
						}
					})
})(jQuery);
(function(a, c) {
	var d = {
		buttons : true,
		height : true,
		maxHeight : true,
		maxWidth : true,
		minHeight : true,
		minWidth : true,
		width : true
	}, g = {
		maxHeight : true,
		maxWidth : true,
		minHeight : true,
		minWidth : true
	};
	a
			.widget(
					"ui.dialog",
					{
						options : {
							autoOpen : true,
							buttons : {},
							closeOnEscape : true,
							closeText : "close",
							dialogClass : "",
							draggable : true,
							hide : null,
							height : "auto",
							maxHeight : false,
							maxWidth : false,
							minHeight : 150,
							minWidth : 150,
							modal : false,
							position : {
								my : "center",
								at : "center",
								collision : "fit",
								using : function(f) {
									var b = a(this).css(f).offset().top;
									b < 0 && a(this).css("top", f.top - b)
								}
							},
							resizable : true,
							show : null,
							stack : true,
							title : "",
							width : 300,
							zIndex : 1E3
						},
						_create : function() {
							this.originalTitle = this.element.attr("title");
							if (typeof this.originalTitle !== "string")
								this.originalTitle = "";
							this.options.title = this.options.title
									|| this.originalTitle;
							var f = this, b = f.options, e = b.title
									|| "&#160;", h = a.ui.dialog
									.getTitleId(f.element), j = (f.uiDialog = a("<div></div>"))
									.appendTo(document.body)
									.hide()
									.addClass(
											"ui-dialog ui-widget ui-widget-content ui-corner-all "
													+ b.dialogClass)
									.css({
										zIndex : b.zIndex
									})
									.attr("tabIndex", -1)
									.css("outline", 0)
									.keydown(
											function(s) {
												if (b.closeOnEscape
														&& s.keyCode
														&& s.keyCode === a.ui.keyCode.ESCAPE) {
													f.close(s);
													s.preventDefault()
												}
											}).attr({
										role : "dialog",
										"aria-labelledby" : h
									}).mousedown(function(s) {
										f.moveToTop(false, s)
									});
							f.element.show().removeAttr("title").addClass(
									"ui-dialog-content ui-widget-content")
									.appendTo(j);
							var k = (f.uiDialogTitlebar = a("<div></div>"))
									.addClass(
											"ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix")
									.prependTo(j), p = a('<a href="#"></a>')
									.addClass(
											"ui-dialog-titlebar-close ui-corner-all")
									.attr("role", "button").hover(function() {
										p.addClass("ui-state-hover")
									}, function() {
										p.removeClass("ui-state-hover")
									}).focus(function() {
										p.addClass("ui-state-focus")
									}).blur(function() {
										p.removeClass("ui-state-focus")
									}).click(function(s) {
										f.close(s);
										return false
									}).appendTo(k);
							(f.uiDialogTitlebarCloseText = a("<span></span>"))
									.addClass("ui-icon ui-icon-closethick")
									.text(b.closeText).appendTo(p);
							a("<span></span>").addClass("ui-dialog-title")
									.attr("id", h).html(e).prependTo(k);
							if (a.isFunction(b.beforeclose)
									&& !a.isFunction(b.beforeClose))
								b.beforeClose = b.beforeclose;
							k.find("*").add(k).disableSelection();
							b.draggable && a.fn.draggable && f._makeDraggable();
							b.resizable && a.fn.resizable && f._makeResizable();
							f._createButtons(b.buttons);
							f._isOpen = false;
							a.fn.bgiframe && j.bgiframe()
						},
						_init : function() {
							this.options.autoOpen && this.open()
						},
						destroy : function() {
							var f = this;
							f.overlay && f.overlay.destroy();
							f.uiDialog.hide();
							f.element
									.unbind(".dialog")
									.removeData("dialog")
									.removeClass(
											"ui-dialog-content ui-widget-content")
									.hide().appendTo("body");
							f.uiDialog.remove();
							f.originalTitle
									&& f.element.attr("title", f.originalTitle);
							return f
						},
						widget : function() {
							return this.uiDialog
						},
						close : function(f) {
							var b = this, e, h;
							if (false !== b._trigger("beforeClose", f)) {
								b.overlay && b.overlay.destroy();
								b.uiDialog.unbind("keypress.ui-dialog");
								b._isOpen = false;
								if (b.options.hide)
									b.uiDialog.hide(b.options.hide, function() {
										b._trigger("close", f)
									});
								else {
									b.uiDialog.hide();
									b._trigger("close", f)
								}
								a.ui.dialog.overlay.resize();
								if (b.options.modal) {
									e = 0;
									a(".ui-dialog").each(function() {
										if (this !== b.uiDialog[0]) {
											h = a(this).css("z-index");
											isNaN(h) || (e = Math.max(e, h))
										}
									});
									a.ui.dialog.maxZ = e
								}
								return b
							}
						},
						isOpen : function() {
							return this._isOpen
						},
						moveToTop : function(f, b) {
							var e = this, h = e.options;
							if (h.modal && !f || !h.stack && !h.modal)
								return e._trigger("focus", b);
							if (h.zIndex > a.ui.dialog.maxZ)
								a.ui.dialog.maxZ = h.zIndex;
							if (e.overlay) {
								a.ui.dialog.maxZ += 1;
								e.overlay.$el
										.css(
												"z-index",
												a.ui.dialog.overlay.maxZ = a.ui.dialog.maxZ)
							}
							f = {
								scrollTop : e.element.attr("scrollTop"),
								scrollLeft : e.element.attr("scrollLeft")
							};
							a.ui.dialog.maxZ += 1;
							e.uiDialog.css("z-index", a.ui.dialog.maxZ);
							e.element.attr(f);
							e._trigger("focus", b);
							return e
						},
						open : function() {
							if (!this._isOpen) {
								var f = this, b = f.options, e = f.uiDialog;
								f.overlay = b.modal ? new a.ui.dialog.overlay(f)
										: null;
								f._size();
								f._position(b.position);
								e.show(b.show);
								f.moveToTop(true);
								b.modal
										&& e
												.bind(
														"keypress.ui-dialog",
														function(h) {
															if (h.keyCode === a.ui.keyCode.TAB) {
																var j = a(
																		":tabbable",
																		this), k = j
																		.filter(":first");
																j = j
																		.filter(":last");
																if (h.target === j[0]
																		&& !h.shiftKey) {
																	k.focus(1);
																	return false
																} else if (h.target === k[0]
																		&& h.shiftKey) {
																	j.focus(1);
																	return false
																}
															}
														});
								a(
										f.element
												.find(":tabbable")
												.get()
												.concat(
														e
																.find(
																		".ui-dialog-buttonpane :tabbable")
																.get()
																.concat(e.get())))
										.eq(0).focus();
								f._isOpen = true;
								f._trigger("open");
								return f
							}
						},
						_createButtons : function(f) {
							var b = this, e = false, h = a("<div></div>")
									.addClass(
											"ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), j = a(
									"<div></div>").addClass(
									"ui-dialog-buttonset").appendTo(h);
							b.uiDialog.find(".ui-dialog-buttonpane").remove();
							typeof f === "object" && f !== null
									&& a.each(f, function() {
										return !(e = true)
									});
							if (e) {
								a.each(f, function(k, p) {
									p = a.isFunction(p) ? {
										click : p,
										text : k
									} : p;
									k = a('<button type="button"></button>')
											.attr(p, true).unbind("click")
											.click(
													function() {
														p.click.apply(
																b.element[0],
																arguments)
													}).appendTo(j);
									a.fn.button && k.button()
								});
								h.appendTo(b.uiDialog)
							}
						},
						_makeDraggable : function() {
							function f(k) {
								return {
									position : k.position,
									offset : k.offset
								}
							}
							var b = this, e = b.options, h = a(document), j;
							b.uiDialog
									.draggable({
										cancel : ".ui-dialog-content, .ui-dialog-titlebar-close",
										handle : ".ui-dialog-titlebar",
										containment : "document",
										start : function(k, p) {
											j = e.height === "auto" ? "auto"
													: a(this).height();
											a(this)
													.height(a(this).height())
													.addClass(
															"ui-dialog-dragging");
											b._trigger("dragStart", k, f(p))
										},
										drag : function(k, p) {
											b._trigger("drag", k, f(p))
										},
										stop : function(k, p) {
											e.position = [
													p.position.left
															- h.scrollLeft(),
													p.position.top
															- h.scrollTop() ];
											a(this).removeClass(
													"ui-dialog-dragging")
													.height(j);
											b._trigger("dragStop", k, f(p));
											a.ui.dialog.overlay.resize()
										}
									})
						},
						_makeResizable : function(f) {
							function b(k) {
								return {
									originalPosition : k.originalPosition,
									originalSize : k.originalSize,
									position : k.position,
									size : k.size
								}
							}
							f = f === c ? this.options.resizable : f;
							var e = this, h = e.options, j = e.uiDialog
									.css("position");
							f = typeof f === "string" ? f
									: "n,e,s,w,se,sw,ne,nw";
							e.uiDialog.resizable({
								cancel : ".ui-dialog-content",
								containment : "document",
								alsoResize : e.element,
								maxWidth : h.maxWidth,
								maxHeight : h.maxHeight,
								minWidth : h.minWidth,
								minHeight : e._minHeight(),
								handles : f,
								start : function(k, p) {
									a(this).addClass("ui-dialog-resizing");
									e._trigger("resizeStart", k, b(p))
								},
								resize : function(k, p) {
									e._trigger("resize", k, b(p))
								},
								stop : function(k, p) {
									a(this).removeClass("ui-dialog-resizing");
									h.height = a(this).height();
									h.width = a(this).width();
									e._trigger("resizeStop", k, b(p));
									a.ui.dialog.overlay.resize()
								}
							}).css("position", j).find(".ui-resizable-se")
									.addClass(
											"ui-icon ui-icon-grip-diagonal-se")
						},
						_minHeight : function() {
							var f = this.options;
							return f.height === "auto" ? f.minHeight : Math
									.min(f.minHeight, f.height)
						},
						_position : function(f) {
							var b = [], e = [ 0, 0 ], h;
							if (f) {
								if (typeof f === "string"
										|| typeof f === "object" && "0" in f) {
									b = f.split ? f.split(" ") : [ f[0], f[1] ];
									if (b.length === 1)
										b[1] = b[0];
									a.each([ "left", "top" ], function(j, k) {
										if (+b[j] === b[j]) {
											e[j] = b[j];
											b[j] = k
										}
									});
									f = {
										my : b.join(" "),
										at : b.join(" "),
										offset : e.join(" ")
									}
								}
								f = a.extend({},
										a.ui.dialog.prototype.options.position,
										f)
							} else
								f = a.ui.dialog.prototype.options.position;
							(h = this.uiDialog.is(":visible"))
									|| this.uiDialog.show();
							this.uiDialog.css({
								top : 0,
								left : 0
							}).position(a.extend({
								of : window
							}, f));
							h || this.uiDialog.hide()
						},
						_setOptions : function(f) {
							var b = this, e = {}, h = false;
							a.each(f, function(j, k) {
								b._setOption(j, k);
								if (j in d)
									h = true;
								if (j in g)
									e[j] = k
							});
							h && this._size();
							this.uiDialog.is(":data(resizable)")
									&& this.uiDialog.resizable("option", e)
						},
						_setOption : function(f, b) {
							var e = this, h = e.uiDialog;
							switch (f) {
							case "beforeclose":
								f = "beforeClose";
								break;
							case "buttons":
								e._createButtons(b);
								break;
							case "closeText":
								e.uiDialogTitlebarCloseText.text("" + b);
								break;
							case "dialogClass":
								h.removeClass(e.options.dialogClass).addClass(
										"ui-dialog ui-widget ui-widget-content ui-corner-all "
												+ b);
								break;
							case "disabled":
								b ? h.addClass("ui-dialog-disabled") : h
										.removeClass("ui-dialog-disabled");
								break;
							case "draggable":
								var j = h.is(":data(draggable)");
								j && !b && h.draggable("destroy");
								!j && b && e._makeDraggable();
								break;
							case "position":
								e._position(b);
								break;
							case "resizable":
								(j = h.is(":data(resizable)")) && !b
										&& h.resizable("destroy");
								j && typeof b === "string"
										&& h.resizable("option", "handles", b);
								!j && b !== false && e._makeResizable(b);
								break;
							case "title":
								a(".ui-dialog-title", e.uiDialogTitlebar).html(
										"" + (b || "&#160;"));
								break
							}
							a.Widget.prototype._setOption.apply(e, arguments)
						},
						_size : function() {
							var f = this.options, b, e, h = this.uiDialog
									.is(":visible");
							this.element.show().css({
								width : "auto",
								minHeight : 0,
								height : 0
							});
							if (f.minWidth > f.width)
								f.width = f.minWidth;
							b = this.uiDialog.css({
								height : "auto",
								width : f.width
							}).height();
							e = Math.max(0, f.minHeight - b);
							if (f.height === "auto")
								if (a.support.minHeight)
									this.element.css({
										minHeight : e,
										height : "auto"
									});
								else {
									this.uiDialog.show();
									f = this.element.css("height", "auto")
											.height();
									h || this.uiDialog.hide();
									this.element.height(Math.max(f, e))
								}
							else
								this.element.height(Math.max(f.height - b, 0));
							this.uiDialog.is(":data(resizable)")
									&& this.uiDialog.resizable("option",
											"minHeight", this._minHeight())
						}
					});
	a.extend(a.ui.dialog, {
		version : "1.8.11",
		uuid : 0,
		maxZ : 0,
		getTitleId : function(f) {
			f = f.attr("id");
			if (!f) {
				this.uuid += 1;
				f = this.uuid
			}
			return "ui-dialog-title-" + f
		},
		overlay : function(f) {
			this.$el = a.ui.dialog.overlay.create(f)
		}
	});
	a
			.extend(
					a.ui.dialog.overlay,
					{
						instances : [],
						oldInstances : [],
						maxZ : 0,
						events : a.map(
								"focus,mousedown,mouseup,keydown,keypress,click"
										.split(","), function(f) {
									return f + ".dialog-overlay"
								}).join(" "),
						create : function(f) {
							if (this.instances.length === 0) {
								setTimeout(
										function() {
											a.ui.dialog.overlay.instances.length
													&& a(document)
															.bind(
																	a.ui.dialog.overlay.events,
																	function(e) {
																		if (a(
																				e.target)
																				.zIndex() < a.ui.dialog.overlay.maxZ)
																			return false
																	})
										}, 1);
								a(document)
										.bind(
												"keydown.dialog-overlay",
												function(e) {
													if (f.options.closeOnEscape
															&& e.keyCode
															&& e.keyCode === a.ui.keyCode.ESCAPE) {
														f.close(e);
														e.preventDefault()
													}
												});
								a(window).bind("resize.dialog-overlay",
										a.ui.dialog.overlay.resize)
							}
							var b = (this.oldInstances.pop() || a("<div></div>")
									.addClass("ui-widget-overlay")).appendTo(
									document.body).css({
								width : this.width(),
								height : this.height()
							});
							a.fn.bgiframe && b.bgiframe();
							this.instances.push(b);
							return b
						},
						destroy : function(f) {
							var b = a.inArray(f, this.instances);
							b != -1
									&& this.oldInstances.push(this.instances
											.splice(b, 1)[0]);
							this.instances.length === 0
									&& a([ document, window ]).unbind(
											".dialog-overlay");
							f.remove();
							var e = 0;
							a.each(this.instances, function() {
								e = Math.max(e, this.css("z-index"))
							});
							this.maxZ = e
						},
						height : function() {
							var f, b;
							if (a.browser.msie && a.browser.version < 7) {
								f = Math.max(
										document.documentElement.scrollHeight,
										document.body.scrollHeight);
								b = Math.max(
										document.documentElement.offsetHeight,
										document.body.offsetHeight);
								return f < b ? a(window).height() + "px" : f
										+ "px"
							} else
								return a(document).height() + "px"
						},
						width : function() {
							var f, b;
							if (a.browser.msie && a.browser.version < 7) {
								f = Math.max(
										document.documentElement.scrollWidth,
										document.body.scrollWidth);
								b = Math.max(
										document.documentElement.offsetWidth,
										document.body.offsetWidth);
								return f < b ? a(window).width() + "px" : f
										+ "px"
							} else
								return a(document).width() + "px"
						},
						resize : function() {
							var f = a([]);
							a.each(a.ui.dialog.overlay.instances, function() {
								f = f.add(this)
							});
							f.css({
								width : 0,
								height : 0
							}).css({
								width : a.ui.dialog.overlay.width(),
								height : a.ui.dialog.overlay.height()
							})
						}
					});
	a.extend(a.ui.dialog.overlay.prototype, {
		destroy : function() {
			a.ui.dialog.overlay.destroy(this.$el)
		}
	})
})(jQuery);
(function(a) {
	a
			.widget(
					"ui.slider",
					a.ui.mouse,
					{
						widgetEventPrefix : "slide",
						options : {
							animate : false,
							distance : 0,
							max : 100,
							min : 0,
							orientation : "horizontal",
							range : false,
							step : 1,
							value : 0,
							values : null
						},
						_create : function() {
							var c = this, d = this.options;
							this._mouseSliding = this._keySliding = false;
							this._animateOff = true;
							this._handleIndex = null;
							this._detectOrientation();
							this._mouseInit();
							this.element
									.addClass("ui-slider ui-slider-"
											+ this.orientation
											+ " ui-widget ui-widget-content ui-corner-all");
							d.disabled
									&& this.element
											.addClass("ui-slider-disabled ui-disabled");
							this.range = a([]);
							if (d.range) {
								if (d.range === true) {
									this.range = a("<div></div>");
									if (!d.values)
										d.values = [ this._valueMin(),
												this._valueMin() ];
									if (d.values.length
											&& d.values.length !== 2)
										d.values = [ d.values[0], d.values[0] ]
								} else
									this.range = a("<div></div>");
								this.range.appendTo(this.element).addClass(
										"ui-slider-range");
								if (d.range === "min" || d.range === "max")
									this.range.addClass("ui-slider-range-"
											+ d.range);
								this.range.addClass("ui-widget-header")
							}
							a(".ui-slider-handle", this.element).length === 0
									&& a("<a href='#'></a>").appendTo(
											this.element).addClass(
											"ui-slider-handle");
							if (d.values && d.values.length)
								for (; a(".ui-slider-handle", this.element).length < d.values.length;)
									a("<a href='#'></a>")
											.appendTo(this.element).addClass(
													"ui-slider-handle");
							this.handles = a(".ui-slider-handle", this.element)
									.addClass("ui-state-default ui-corner-all");
							this.handle = this.handles.eq(0);
							this.handles.add(this.range).filter("a").click(
									function(g) {
										g.preventDefault()
									}).hover(
									function() {
										d.disabled
												|| a(this).addClass(
														"ui-state-hover")
									}, function() {
										a(this).removeClass("ui-state-hover")
									}).focus(
									function() {
										if (d.disabled)
											a(this).blur();
										else {
											a(".ui-slider .ui-state-focus")
													.removeClass(
															"ui-state-focus");
											a(this).addClass("ui-state-focus")
										}
									}).blur(function() {
								a(this).removeClass("ui-state-focus")
							});
							this.handles.each(function(g) {
								a(this).data("index.ui-slider-handle", g)
							});
							this.handles
									.keydown(
											function(g) {
												var f = true, b = a(this)
														.data(
																"index.ui-slider-handle"), e, h, j;
												if (!c.options.disabled) {
													switch (g.keyCode) {
													case a.ui.keyCode.HOME:
													case a.ui.keyCode.END:
													case a.ui.keyCode.PAGE_UP:
													case a.ui.keyCode.PAGE_DOWN:
													case a.ui.keyCode.UP:
													case a.ui.keyCode.RIGHT:
													case a.ui.keyCode.DOWN:
													case a.ui.keyCode.LEFT:
														f = false;
														if (!c._keySliding) {
															c._keySliding = true;
															a(this)
																	.addClass(
																			"ui-state-active");
															e = c._start(g, b);
															if (e === false)
																return
														}
														break
													}
													j = c.options.step;
													e = c.options.values
															&& c.options.values.length ? (h = c
															.values(b))
															: (h = c.value());
													switch (g.keyCode) {
													case a.ui.keyCode.HOME:
														h = c._valueMin();
														break;
													case a.ui.keyCode.END:
														h = c._valueMax();
														break;
													case a.ui.keyCode.PAGE_UP:
														h = c
																._trimAlignValue(e
																		+ (c
																				._valueMax() - c
																				._valueMin())
																		/ 5);
														break;
													case a.ui.keyCode.PAGE_DOWN:
														h = c
																._trimAlignValue(e
																		- (c
																				._valueMax() - c
																				._valueMin())
																		/ 5);
														break;
													case a.ui.keyCode.UP:
													case a.ui.keyCode.RIGHT:
														if (e === c._valueMax())
															return;
														h = c._trimAlignValue(e
																+ j);
														break;
													case a.ui.keyCode.DOWN:
													case a.ui.keyCode.LEFT:
														if (e === c._valueMin())
															return;
														h = c._trimAlignValue(e
																- j);
														break
													}
													c._slide(g, b, h);
													return f
												}
											})
									.keyup(
											function(g) {
												var f = a(this)
														.data(
																"index.ui-slider-handle");
												if (c._keySliding) {
													c._keySliding = false;
													c._stop(g, f);
													c._change(g, f);
													a(this).removeClass(
															"ui-state-active")
												}
											});
							this._refreshValue();
							this._animateOff = false
						},
						destroy : function() {
							this.handles.remove();
							this.range.remove();
							this.element
									.removeClass(
											"ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all")
									.removeData("slider").unbind(".slider");
							this._mouseDestroy();
							return this
						},
						_mouseCapture : function(c) {
							var d = this.options, g, f, b, e, h;
							if (d.disabled)
								return false;
							this.elementSize = {
								width : this.element.outerWidth(),
								height : this.element.outerHeight()
							};
							this.elementOffset = this.element.offset();
							g = this._normValueFromMouse({
								x : c.pageX,
								y : c.pageY
							});
							f = this._valueMax() - this._valueMin() + 1;
							e = this;
							this.handles.each(function(j) {
								var k = Math.abs(g - e.values(j));
								if (f > k) {
									f = k;
									b = a(this);
									h = j
								}
							});
							if (d.range === true && this.values(1) === d.min) {
								h += 1;
								b = a(this.handles[h])
							}
							if (this._start(c, h) === false)
								return false;
							this._mouseSliding = true;
							e._handleIndex = h;
							b.addClass("ui-state-active").focus();
							d = b.offset();
							this._clickOffset = !a(c.target).parents()
									.andSelf().is(".ui-slider-handle") ? {
								left : 0,
								top : 0
							}
									: {
										left : c.pageX - d.left - b.width() / 2,
										top : c.pageY
												- d.top
												- b.height()
												/ 2
												- (parseInt(b
														.css("borderTopWidth"),
														10) || 0)
												- (parseInt(
														b
																.css("borderBottomWidth"),
														10) || 0)
												+ (parseInt(b.css("marginTop"),
														10) || 0)
									};
							this.handles.hasClass("ui-state-hover")
									|| this._slide(c, h, g);
							return this._animateOff = true
						},
						_mouseStart : function() {
							return true
						},
						_mouseDrag : function(c) {
							var d = this._normValueFromMouse({
								x : c.pageX,
								y : c.pageY
							});
							this._slide(c, this._handleIndex, d);
							return false
						},
						_mouseStop : function(c) {
							this.handles.removeClass("ui-state-active");
							this._mouseSliding = false;
							this._stop(c, this._handleIndex);
							this._change(c, this._handleIndex);
							this._clickOffset = this._handleIndex = null;
							return this._animateOff = false
						},
						_detectOrientation : function() {
							this.orientation = this.options.orientation === "vertical" ? "vertical"
									: "horizontal"
						},
						_normValueFromMouse : function(c) {
							var d;
							if (this.orientation === "horizontal") {
								d = this.elementSize.width;
								c = c.x
										- this.elementOffset.left
										- (this._clickOffset ? this._clickOffset.left
												: 0)
							} else {
								d = this.elementSize.height;
								c = c.y
										- this.elementOffset.top
										- (this._clickOffset ? this._clickOffset.top
												: 0)
							}
							d = c / d;
							if (d > 1)
								d = 1;
							if (d < 0)
								d = 0;
							if (this.orientation === "vertical")
								d = 1 - d;
							c = this._valueMax() - this._valueMin();
							return this._trimAlignValue(this._valueMin() + d
									* c)
						},
						_start : function(c, d) {
							var g = {
								handle : this.handles[d],
								value : this.value()
							};
							if (this.options.values
									&& this.options.values.length) {
								g.value = this.values(d);
								g.values = this.values()
							}
							return this._trigger("start", c, g)
						},
						_slide : function(c, d, g) {
							var f;
							if (this.options.values
									&& this.options.values.length) {
								f = this.values(d ? 0 : 1);
								if (this.options.values.length === 2
										&& this.options.range === true
										&& (d === 0 && g > f || d === 1
												&& g < f))
									g = f;
								if (g !== this.values(d)) {
									f = this.values();
									f[d] = g;
									c = this._trigger("slide", c, {
										handle : this.handles[d],
										value : g,
										values : f
									});
									this.values(d ? 0 : 1);
									c !== false && this.values(d, g, true)
								}
							} else if (g !== this.value()) {
								c = this._trigger("slide", c, {
									handle : this.handles[d],
									value : g
								});
								c !== false && this.value(g)
							}
						},
						_stop : function(c, d) {
							var g = {
								handle : this.handles[d],
								value : this.value()
							};
							if (this.options.values
									&& this.options.values.length) {
								g.value = this.values(d);
								g.values = this.values()
							}
							this._trigger("stop", c, g)
						},
						_change : function(c, d) {
							if (!this._keySliding && !this._mouseSliding) {
								var g = {
									handle : this.handles[d],
									value : this.value()
								};
								if (this.options.values
										&& this.options.values.length) {
									g.value = this.values(d);
									g.values = this.values()
								}
								this._trigger("change", c, g)
							}
						},
						value : function(c) {
							if (arguments.length) {
								this.options.value = this._trimAlignValue(c);
								this._refreshValue();
								this._change(null, 0)
							}
							return this._value()
						},
						values : function(c, d) {
							var g, f, b;
							if (arguments.length > 1) {
								this.options.values[c] = this
										._trimAlignValue(d);
								this._refreshValue();
								this._change(null, c)
							}
							if (arguments.length)
								if (a.isArray(arguments[0])) {
									g = this.options.values;
									f = arguments[0];
									for (b = 0; b < g.length; b += 1) {
										g[b] = this._trimAlignValue(f[b]);
										this._change(null, b)
									}
									this._refreshValue()
								} else
									return this.options.values
											&& this.options.values.length ? this
											._values(c)
											: this.value();
							else
								return this._values()
						},
						_setOption : function(c, d) {
							var g, f = 0;
							if (a.isArray(this.options.values))
								f = this.options.values.length;
							a.Widget.prototype._setOption
									.apply(this, arguments);
							switch (c) {
							case "disabled":
								if (d) {
									this.handles.filter(".ui-state-focus")
											.blur();
									this.handles.removeClass("ui-state-hover");
									this.handles.attr("disabled", "disabled");
									this.element.addClass("ui-disabled")
								} else {
									this.handles.removeAttr("disabled");
									this.element.removeClass("ui-disabled")
								}
								break;
							case "orientation":
								this._detectOrientation();
								this.element
										.removeClass(
												"ui-slider-horizontal ui-slider-vertical")
										.addClass(
												"ui-slider-" + this.orientation);
								this._refreshValue();
								break;
							case "value":
								this._animateOff = true;
								this._refreshValue();
								this._change(null, 0);
								this._animateOff = false;
								break;
							case "values":
								this._animateOff = true;
								this._refreshValue();
								for (g = 0; g < f; g += 1)
									this._change(null, g);
								this._animateOff = false;
								break
							}
						},
						_value : function() {
							return this._trimAlignValue(this.options.value)
						},
						_values : function(c) {
							var d, g;
							if (arguments.length) {
								d = this.options.values[c];
								return this._trimAlignValue(d)
							} else {
								d = this.options.values.slice();
								for (g = 0; g < d.length; g += 1)
									d[g] = this._trimAlignValue(d[g]);
								return d
							}
						},
						_trimAlignValue : function(c) {
							if (c <= this._valueMin())
								return this._valueMin();
							if (c >= this._valueMax())
								return this._valueMax();
							var d = this.options.step > 0 ? this.options.step
									: 1, g = (c - this._valueMin()) % d;
							alignValue = c - g;
							if (Math.abs(g) * 2 >= d)
								alignValue += g > 0 ? d : -d;
							return parseFloat(alignValue.toFixed(5))
						},
						_valueMin : function() {
							return this.options.min
						},
						_valueMax : function() {
							return this.options.max
						},
						_refreshValue : function() {
							var c = this.options.range, d = this.options, g = this, f = !this._animateOff ? d.animate
									: false, b, e = {}, h, j, k, p;
							if (this.options.values
									&& this.options.values.length)
								this.handles
										.each(function(s) {
											b = (g.values(s) - g._valueMin())
													/ (g._valueMax() - g
															._valueMin()) * 100;
											e[g.orientation === "horizontal" ? "left"
													: "bottom"] = b + "%";
											a(this).stop(1, 1)[f ? "animate"
													: "css"](e, d.animate);
											if (g.options.range === true)
												if (g.orientation === "horizontal") {
													if (s === 0)
														g.range.stop(1, 1)[f ? "animate"
																: "css"]({
															left : b + "%"
														}, d.animate);
													if (s === 1)
														g.range[f ? "animate"
																: "css"]
																(
																		{
																			width : b
																					- h
																					+ "%"
																		},
																		{
																			queue : false,
																			duration : d.animate
																		})
												} else {
													if (s === 0)
														g.range.stop(1, 1)[f ? "animate"
																: "css"]({
															bottom : b + "%"
														}, d.animate);
													if (s === 1)
														g.range[f ? "animate"
																: "css"]
																(
																		{
																			height : b
																					- h
																					+ "%"
																		},
																		{
																			queue : false,
																			duration : d.animate
																		})
												}
											h = b
										});
							else {
								j = this.value();
								k = this._valueMin();
								p = this._valueMax();
								b = p !== k ? (j - k) / (p - k) * 100 : 0;
								e[g.orientation === "horizontal" ? "left"
										: "bottom"] = b + "%";
								this.handle.stop(1, 1)[f ? "animate" : "css"](
										e, d.animate);
								if (c === "min"
										&& this.orientation === "horizontal")
									this.range.stop(1, 1)[f ? "animate" : "css"]
											({
												width : b + "%"
											}, d.animate);
								if (c === "max"
										&& this.orientation === "horizontal")
									this.range[f ? "animate" : "css"]({
										width : 100 - b + "%"
									}, {
										queue : false,
										duration : d.animate
									});
								if (c === "min"
										&& this.orientation === "vertical")
									this.range.stop(1, 1)[f ? "animate" : "css"]
											({
												height : b + "%"
											}, d.animate);
								if (c === "max"
										&& this.orientation === "vertical")
									this.range[f ? "animate" : "css"]({
										height : 100 - b + "%"
									}, {
										queue : false,
										duration : d.animate
									})
							}
						}
					});
	a.extend(a.ui.slider, {
		version : "1.8.11"
	})
})(jQuery);
(function(a, c) {
	function d() {
		return ++f
	}
	function g() {
		return ++b
	}
	var f = 0, b = 0;
	a
			.widget(
					"ui.tabs",
					{
						options : {
							add : null,
							ajaxOptions : null,
							cache : false,
							cookie : null,
							collapsible : false,
							disable : null,
							disabled : [],
							enable : null,
							event : "click",
							fx : null,
							idPrefix : "ui-tabs-",
							load : null,
							panelTemplate : "<div></div>",
							remove : null,
							select : null,
							show : null,
							spinner : "<em>Loading&#8230;</em>",
							tabTemplate : "<li><a href='#{href}'><span>#{label}</span></a></li>"
						},
						_create : function() {
							this._tabify(true)
						},
						_setOption : function(e, h) {
							if (e == "selected")
								this.options.collapsible
										&& h == this.options.selected
										|| this.select(h);
							else {
								this.options[e] = h;
								this._tabify()
							}
						},
						_tabId : function(e) {
							return e.title
									&& e.title.replace(/\s/g, "_").replace(
											/[^\w\u00c0-\uFFFF-]/g, "")
									|| this.options.idPrefix + d()
						},
						_sanitizeSelector : function(e) {
							return e.replace(/:/g, "\\:")
						},
						_cookie : function() {
							var e = this.cookie
									|| (this.cookie = this.options.cookie.name
											|| "ui-tabs-" + g());
							return a.cookie.apply(null, [ e ].concat(a
									.makeArray(arguments)))
						},
						_ui : function(e, h) {
							return {
								tab : e,
								panel : h,
								index : this.anchors.index(e)
							}
						},
						_cleanup : function() {
							this.lis.filter(".ui-state-processing")
									.removeClass("ui-state-processing").find(
											"span:data(label.tabs)").each(
											function() {
												var e = a(this);
												e.html(e.data("label.tabs"))
														.removeData(
																"label.tabs")
											})
						},
						_tabify : function(e) {
							function h(B, F) {
								B.css("display", "");
								!a.support.opacity && F.opacity
										&& B[0].style.removeAttribute("filter")
							}
							var j = this, k = this.options, p = /^#.+/;
							this.list = this.element.find("ol,ul").eq(0);
							this.lis = a(" > li:has(a[href])", this.list);
							this.anchors = this.lis.map(function() {
								return a("a", this)[0]
							});
							this.panels = a([]);
							this.anchors
									.each(function(B, F) {
										var n = a(F).attr("href"), m = n
												.split("#")[0], y;
										if (m
												&& (m === location.toString()
														.split("#")[0] || (y = a("base")[0])
														&& m === y.href)) {
											n = F.hash;
											F.href = n
										}
										if (p.test(n))
											j.panels = j.panels
													.add(j.element
															.find(j
																	._sanitizeSelector(n)));
										else if (n && n !== "#") {
											a.data(F, "href.tabs", n);
											a.data(F, "load.tabs", n.replace(
													/#.*$/, ""));
											n = j._tabId(F);
											F.href = "#" + n;
											F = j.element.find("#" + n);
											if (!F.length) {
												F = a(k.panelTemplate)
														.attr("id", n)
														.addClass(
																"ui-tabs-panel ui-widget-content ui-corner-bottom")
														.insertAfter(
																j.panels[B - 1]
																		|| j.list);
												F.data("destroy.tabs", true)
											}
											j.panels = j.panels.add(F)
										} else
											k.disabled.push(B)
									});
							if (e) {
								this.element
										.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
								this.list
										.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
								this.lis
										.addClass("ui-state-default ui-corner-top");
								this.panels
										.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
								if (k.selected === c) {
									location.hash
											&& this.anchors
													.each(function(B, F) {
														if (F.hash == location.hash) {
															k.selected = B;
															return false
														}
													});
									if (typeof k.selected !== "number"
											&& k.cookie)
										k.selected = parseInt(j._cookie(), 10);
									if (typeof k.selected !== "number"
											&& this.lis
													.filter(".ui-tabs-selected").length)
										k.selected = this.lis.index(this.lis
												.filter(".ui-tabs-selected"));
									k.selected = k.selected
											|| (this.lis.length ? 0 : -1)
								} else if (k.selected === null)
									k.selected = -1;
								k.selected = k.selected >= 0
										&& this.anchors[k.selected]
										|| k.selected < 0 ? k.selected : 0;
								k.disabled = a.unique(
										k.disabled.concat(a.map(this.lis
												.filter(".ui-state-disabled"),
												function(B) {
													return j.lis.index(B)
												}))).sort();
								a.inArray(k.selected, k.disabled) != -1
										&& k.disabled.splice(a.inArray(
												k.selected, k.disabled), 1);
								this.panels.addClass("ui-tabs-hide");
								this.lis
										.removeClass("ui-tabs-selected ui-state-active");
								if (k.selected >= 0 && this.anchors.length) {
									j.element
											.find(
													j
															._sanitizeSelector(j.anchors[k.selected].hash))
											.removeClass("ui-tabs-hide");
									this.lis.eq(k.selected).addClass(
											"ui-tabs-selected ui-state-active");
									j.element
											.queue(
													"tabs",
													function() {
														j
																._trigger(
																		"show",
																		null,
																		j
																				._ui(
																						j.anchors[k.selected],
																						j.element
																								.find(j
																										._sanitizeSelector(j.anchors[k.selected].hash))[0]))
													});
									this.load(k.selected)
								}
								a(window).bind("unload", function() {
									j.lis.add(j.anchors).unbind(".tabs");
									j.lis = j.anchors = j.panels = null
								})
							} else
								k.selected = this.lis.index(this.lis
										.filter(".ui-tabs-selected"));
							this.element[k.collapsible ? "addClass"
									: "removeClass"]("ui-tabs-collapsible");
							k.cookie && this._cookie(k.selected, k.cookie);
							e = 0;
							for ( var s; s = this.lis[e]; e++)
								a(s)[a.inArray(e, k.disabled) != -1
										&& !a(s).hasClass("ui-tabs-selected") ? "addClass"
										: "removeClass"]("ui-state-disabled");
							k.cache === false
									&& this.anchors.removeData("cache.tabs");
							this.lis.add(this.anchors).unbind(".tabs");
							if (k.event !== "mouseover") {
								var o = function(B, F) {
									F.is(":not(.ui-state-disabled)")
											&& F.addClass("ui-state-" + B)
								}, l = function(B, F) {
									F.removeClass("ui-state-" + B)
								};
								this.lis.bind("mouseover.tabs", function() {
									o("hover", a(this))
								});
								this.lis.bind("mouseout.tabs", function() {
									l("hover", a(this))
								});
								this.anchors.bind("focus.tabs", function() {
									o("focus", a(this).closest("li"))
								});
								this.anchors.bind("blur.tabs", function() {
									l("focus", a(this).closest("li"))
								})
							}
							var q, u;
							if (k.fx)
								if (a.isArray(k.fx)) {
									q = k.fx[0];
									u = k.fx[1]
								} else
									q = u = k.fx;
							var v = u ? function(B, F) {
								a(B).closest("li").addClass(
										"ui-tabs-selected ui-state-active");
								F.hide().removeClass("ui-tabs-hide").animate(
										u,
										u.duration || "normal",
										function() {
											h(F, u);
											j._trigger("show", null, j._ui(B,
													F[0]))
										})
							} : function(B, F) {
								a(B).closest("li").addClass(
										"ui-tabs-selected ui-state-active");
								F.removeClass("ui-tabs-hide");
								j._trigger("show", null, j._ui(B, F[0]))
							}, z = q ? function(B, F) {
								F
										.animate(
												q,
												q.duration || "normal",
												function() {
													j.lis
															.removeClass("ui-tabs-selected ui-state-active");
													F.addClass("ui-tabs-hide");
													h(F, q);
													j.element.dequeue("tabs")
												})
							}
									: function(B, F) {
										j.lis
												.removeClass("ui-tabs-selected ui-state-active");
										F.addClass("ui-tabs-hide");
										j.element.dequeue("tabs")
									};
							this.anchors
									.bind(
											k.event + ".tabs",
											function() {
												var B = this, F = a(B).closest(
														"li"), n = j.panels
														.filter(":not(.ui-tabs-hide)"), m = j.element
														.find(j
																._sanitizeSelector(B.hash));
												if (F
														.hasClass("ui-tabs-selected")
														&& !k.collapsible
														|| F
																.hasClass("ui-state-disabled")
														|| F
																.hasClass("ui-state-processing")
														|| j.panels
																.filter(":animated").length
														|| j._trigger("select",
																null, j._ui(
																		this,
																		m[0])) === false) {
													this.blur();
													return false
												}
												k.selected = j.anchors
														.index(this);
												j.abort();
												if (k.collapsible)
													if (F
															.hasClass("ui-tabs-selected")) {
														k.selected = -1;
														k.cookie
																&& j
																		._cookie(
																				k.selected,
																				k.cookie);
														j.element.queue("tabs",
																function() {
																	z(B, n)
																}).dequeue(
																"tabs");
														this.blur();
														return false
													} else if (!n.length) {
														k.cookie
																&& j
																		._cookie(
																				k.selected,
																				k.cookie);
														j.element.queue("tabs",
																function() {
																	v(B, m)
																});
														j.load(j.anchors
																.index(this));
														this.blur();
														return false
													}
												k.cookie
														&& j._cookie(
																k.selected,
																k.cookie);
												if (m.length) {
													n.length
															&& j.element.queue(
																	"tabs",
																	function() {
																		z(B, n)
																	});
													j.element.queue("tabs",
															function() {
																v(B, m)
															});
													j.load(j.anchors
															.index(this))
												} else
													throw "jQuery UI Tabs: Mismatching fragment identifier.";
												a.browser.msie && this.blur()
											});
							this.anchors.bind("click.tabs", function() {
								return false
							})
						},
						_getIndex : function(e) {
							if (typeof e == "string")
								e = this.anchors.index(this.anchors
										.filter("[href$=" + e + "]"));
							return e
						},
						destroy : function() {
							var e = this.options;
							this.abort();
							this.element
									.unbind(".tabs")
									.removeClass(
											"ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible")
									.removeData("tabs");
							this.list
									.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
							this.anchors.each(function() {
								var h = a.data(this, "href.tabs");
								if (h)
									this.href = h;
								var j = a(this).unbind(".tabs");
								a.each([ "href", "load", "cache" ], function(k,
										p) {
									j.removeData(p + ".tabs")
								})
							});
							this.lis
									.unbind(".tabs")
									.add(this.panels)
									.each(
											function() {
												a.data(this, "destroy.tabs") ? a(
														this).remove()
														: a(this)
																.removeClass(
																		"ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")
											});
							e.cookie && this._cookie(null, e.cookie);
							return this
						},
						add : function(e, h, j) {
							if (j === c)
								j = this.anchors.length;
							var k = this, p = this.options;
							h = a(p.tabTemplate.replace(/#\{href\}/g, e)
									.replace(/#\{label\}/g, h));
							e = !e.indexOf("#") ? e.replace("#", "") : this
									._tabId(a("a", h)[0]);
							h.addClass("ui-state-default ui-corner-top").data(
									"destroy.tabs", true);
							var s = k.element.find("#" + e);
							s.length
									|| (s = a(p.panelTemplate).attr("id", e)
											.data("destroy.tabs", true));
							s
									.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
							if (j >= this.lis.length) {
								h.appendTo(this.list);
								s.appendTo(this.list[0].parentNode)
							} else {
								h.insertBefore(this.lis[j]);
								s.insertBefore(this.panels[j])
							}
							p.disabled = a.map(p.disabled, function(o) {
								return o >= j ? ++o : o
							});
							this._tabify();
							if (this.anchors.length == 1) {
								p.selected = 0;
								h.addClass("ui-tabs-selected ui-state-active");
								s.removeClass("ui-tabs-hide");
								this.element.queue("tabs", function() {
									k._trigger("show", null, k._ui(
											k.anchors[0], k.panels[0]))
								});
								this.load(0)
							}
							this._trigger("add", null, this._ui(
									this.anchors[j], this.panels[j]));
							return this
						},
						remove : function(e) {
							e = this._getIndex(e);
							var h = this.options, j = this.lis.eq(e).remove(), k = this.panels
									.eq(e).remove();
							if (j.hasClass("ui-tabs-selected")
									&& this.anchors.length > 1)
								this
										.select(e
												+ (e + 1 < this.anchors.length ? 1
														: -1));
							h.disabled = a.map(a.grep(h.disabled, function(p) {
								return p != e
							}), function(p) {
								return p >= e ? --p : p
							});
							this._tabify();
							this._trigger("remove", null, this._ui(
									j.find("a")[0], k[0]));
							return this
						},
						enable : function(e) {
							e = this._getIndex(e);
							var h = this.options;
							if (a.inArray(e, h.disabled) != -1) {
								this.lis.eq(e).removeClass("ui-state-disabled");
								h.disabled = a.grep(h.disabled, function(j) {
									return j != e
								});
								this._trigger("enable", null, this._ui(
										this.anchors[e], this.panels[e]));
								return this
							}
						},
						disable : function(e) {
							e = this._getIndex(e);
							var h = this.options;
							if (e != h.selected) {
								this.lis.eq(e).addClass("ui-state-disabled");
								h.disabled.push(e);
								h.disabled.sort();
								this._trigger("disable", null, this._ui(
										this.anchors[e], this.panels[e]))
							}
							return this
						},
						select : function(e) {
							e = this._getIndex(e);
							if (e == -1)
								if (this.options.collapsible
										&& this.options.selected != -1)
									e = this.options.selected;
								else
									return this;
							this.anchors.eq(e).trigger(
									this.options.event + ".tabs");
							return this
						},
						load : function(e) {
							e = this._getIndex(e);
							var h = this, j = this.options, k = this.anchors
									.eq(e)[0], p = a.data(k, "load.tabs");
							this.abort();
							if (!p || this.element.queue("tabs").length !== 0
									&& a.data(k, "cache.tabs"))
								this.element.dequeue("tabs");
							else {
								this.lis.eq(e).addClass("ui-state-processing");
								if (j.spinner) {
									var s = a("span", k);
									s.data("label.tabs", s.html()).html(
											j.spinner)
								}
								this.xhr = a.ajax(a.extend({}, j.ajaxOptions, {
									url : p,
									success : function(o, l) {
										h.element.find(
												h._sanitizeSelector(k.hash))
												.html(o);
										h._cleanup();
										j.cache
												&& a
														.data(k, "cache.tabs",
																true);
										h._trigger("load", null, h._ui(
												h.anchors[e], h.panels[e]));
										try {
											j.ajaxOptions.success(o, l)
										} catch (q) {
										}
									},
									error : function(o, l) {
										h._cleanup();
										h._trigger("load", null, h._ui(
												h.anchors[e], h.panels[e]));
										try {
											j.ajaxOptions.error(o, l, e, k)
										} catch (q) {
										}
									}
								}));
								h.element.dequeue("tabs");
								return this
							}
						},
						abort : function() {
							this.element.queue([]);
							this.panels.stop(false, true);
							this.element.queue("tabs", this.element.queue(
									"tabs").splice(-2, 2));
							if (this.xhr) {
								this.xhr.abort();
								delete this.xhr
							}
							this._cleanup();
							return this
						},
						url : function(e, h) {
							this.anchors.eq(e).removeData("cache.tabs").data(
									"load.tabs", h);
							return this
						},
						length : function() {
							return this.anchors.length
						}
					});
	a.extend(a.ui.tabs, {
		version : "1.8.11"
	});
	a.extend(a.ui.tabs.prototype, {
		rotation : null,
		rotate : function(e, h) {
			var j = this, k = this.options, p = j._rotate
					|| (j._rotate = function(s) {
						clearTimeout(j.rotation);
						j.rotation = setTimeout(function() {
							var o = k.selected;
							j.select(++o < j.anchors.length ? o : 0)
						}, e);
						s && s.stopPropagation()
					});
			h = j._unrotate || (j._unrotate = !h ? function(s) {
				s.clientX && j.rotate(null)
			} : function() {
				t = k.selected;
				p()
			});
			if (e) {
				this.element.bind("tabsshow", p);
				this.anchors.bind(k.event + ".tabs", h);
				p()
			} else {
				clearTimeout(j.rotation);
				this.element.unbind("tabsshow", p);
				this.anchors.unbind(k.event + ".tabs", h);
				delete this._rotate;
				delete this._unrotate
			}
			return this
		}
	})
})(jQuery);
(function(a, c) {
	function d() {
		this.debug = false;
		this._curInst = null;
		this._keyEvent = false;
		this._disabledInputs = [];
		this._inDialog = this._datepickerShowing = false;
		this._mainDivId = "ui-datepicker-div";
		this._inlineClass = "ui-datepicker-inline";
		this._appendClass = "ui-datepicker-append";
		this._triggerClass = "ui-datepicker-trigger";
		this._dialogClass = "ui-datepicker-dialog";
		this._disableClass = "ui-datepicker-disabled";
		this._unselectableClass = "ui-datepicker-unselectable";
		this._currentClass = "ui-datepicker-current-day";
		this._dayOverClass = "ui-datepicker-days-cell-over";
		this.regional = [];
		this.regional[""] = {
			closeText : "Done",
			prevText : "Prev",
			nextText : "Next",
			currentText : "Today",
			monthNames : [ "January", "February", "March", "April", "May",
					"June", "July", "August", "September", "October",
					"November", "December" ],
			monthNamesShort : [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
					"Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
			dayNames : [ "Sunday", "Monday", "Tuesday", "Wednesday",
					"Thursday", "Friday", "Saturday" ],
			dayNamesShort : [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
			dayNamesMin : [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
			weekHeader : "Wk",
			dateFormat : "mm/dd/yy",
			firstDay : 0,
			isRTL : false,
			showMonthAfterYear : false,
			yearSuffix : ""
		};
		this._defaults = {
			showOn : "focus",
			showAnim : "fadeIn",
			showOptions : {},
			defaultDate : null,
			appendText : "",
			buttonText : "...",
			buttonImage : "",
			buttonImageOnly : false,
			hideIfNoPrevNext : false,
			navigationAsDateFormat : false,
			gotoCurrent : false,
			changeMonth : false,
			changeYear : false,
			yearRange : "c-10:c+10",
			showOtherMonths : false,
			selectOtherMonths : false,
			showWeek : false,
			calculateWeek : this.iso8601Week,
			shortYearCutoff : "+10",
			minDate : null,
			maxDate : null,
			duration : "fast",
			beforeShowDay : null,
			beforeShow : null,
			onSelect : null,
			onChangeMonthYear : null,
			onClose : null,
			numberOfMonths : 1,
			showCurrentAtPos : 0,
			stepMonths : 1,
			stepBigMonths : 12,
			altField : "",
			altFormat : "",
			constrainInput : true,
			showButtonPanel : false,
			autoSize : false
		};
		a.extend(this._defaults, this.regional[""]);
		this.dpDiv = a('<div id="'
				+ this._mainDivId
				+ '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')
	}
	function g(b, e) {
		a.extend(b, e);
		for ( var h in e)
			if (e[h] == null || e[h] == c)
				b[h] = e[h];
		return b
	}
	a.extend(a.ui, {
		datepicker : {
			version : "1.8.11"
		}
	});
	var f = (new Date).getTime();
	a
			.extend(
					d.prototype,
					{
						markerClassName : "hasDatepicker",
						log : function() {
							this.debug && console.log.apply("", arguments)
						},
						_widgetDatepicker : function() {
							return this.dpDiv
						},
						setDefaults : function(b) {
							g(this._defaults, b || {});
							return this
						},
						_attachDatepicker : function(b, e) {
							var h = null;
							for ( var j in this._defaults) {
								var k = b.getAttribute("date:" + j);
								if (k) {
									h = h || {};
									try {
										h[j] = eval(k)
									} catch (p) {
										h[j] = k
									}
								}
							}
							j = b.nodeName.toLowerCase();
							k = j == "div" || j == "span";
							if (!b.id) {
								this.uuid += 1;
								b.id = "dp" + this.uuid
							}
							var s = this._newInst(a(b), k);
							s.settings = a.extend({}, e || {}, h || {});
							if (j == "input")
								this._connectDatepicker(b, s);
							else
								k && this._inlineDatepicker(b, s)
						},
						_newInst : function(b, e) {
							return {
								id : b[0].id.replace(/([^A-Za-z0-9_-])/g,
										"\\\\$1"),
								input : b,
								selectedDay : 0,
								selectedMonth : 0,
								selectedYear : 0,
								drawMonth : 0,
								drawYear : 0,
								inline : e,
								dpDiv : !e ? this.dpDiv
										: a('<div class="'
												+ this._inlineClass
												+ ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')
							}
						},
						_connectDatepicker : function(b, e) {
							var h = a(b);
							e.append = a([]);
							e.trigger = a([]);
							if (!h.hasClass(this.markerClassName)) {
								this._attachments(h, e);
								h.addClass(this.markerClassName).keydown(
										this._doKeyDown).keypress(
										this._doKeyPress).keyup(this._doKeyUp)
										.bind("setData.datepicker",
												function(j, k, p) {
													e.settings[k] = p
												}).bind("getData.datepicker",
												function(j, k) {
													return this._get(e, k)
												});
								this._autoSize(e);
								a.data(b, "datepicker", e)
							}
						},
						_attachments : function(b, e) {
							var h = this._get(e, "appendText"), j = this._get(
									e, "isRTL");
							e.append && e.append.remove();
							if (h) {
								e.append = a('<span class="'
										+ this._appendClass + '">' + h
										+ "</span>");
								b[j ? "before" : "after"](e.append)
							}
							b.unbind("focus", this._showDatepicker);
							e.trigger && e.trigger.remove();
							h = this._get(e, "showOn");
							if (h == "focus" || h == "both")
								b.focus(this._showDatepicker);
							if (h == "button" || h == "both") {
								h = this._get(e, "buttonText");
								var k = this._get(e, "buttonImage");
								e.trigger = a(this._get(e, "buttonImageOnly") ? a(
										"<img/>").addClass(this._triggerClass)
										.attr({
											src : k,
											alt : h,
											title : h
										})
										: a('<button type="button"></button>')
												.addClass(this._triggerClass)
												.html(
														k == "" ? h : a(
																"<img/>").attr(
																{
																	src : k,
																	alt : h,
																	title : h
																})));
								b[j ? "before" : "after"](e.trigger);
								e.trigger
										.click(function() {
											a.datepicker._datepickerShowing
													&& a.datepicker._lastInput == b[0] ? a.datepicker
													._hideDatepicker()
													: a.datepicker
															._showDatepicker(b[0]);
											return false
										})
							}
						},
						_autoSize : function(b) {
							if (this._get(b, "autoSize") && !b.inline) {
								var e = new Date(2009, 11, 20), h = this._get(
										b, "dateFormat");
								if (h.match(/[DM]/)) {
									var j = function(k) {
										for ( var p = 0, s = 0, o = 0; o < k.length; o++)
											if (k[o].length > p) {
												p = k[o].length;
												s = o
											}
										return s
									};
									e.setMonth(j(this._get(b,
											h.match(/MM/) ? "monthNames"
													: "monthNamesShort")));
									e.setDate(j(this._get(b,
											h.match(/DD/) ? "dayNames"
													: "dayNamesShort"))
											+ 20 - e.getDay())
								}
								b.input.attr("size",
										this._formatDate(b, e).length)
							}
						},
						_inlineDatepicker : function(b, e) {
							var h = a(b);
							if (!h.hasClass(this.markerClassName)) {
								h.addClass(this.markerClassName)
										.append(e.dpDiv).bind(
												"setData.datepicker",
												function(j, k, p) {
													e.settings[k] = p
												}).bind("getData.datepicker",
												function(j, k) {
													return this._get(e, k)
												});
								a.data(b, "datepicker", e);
								this._setDate(e, this._getDefaultDate(e), true);
								this._updateDatepicker(e);
								this._updateAlternate(e);
								e.dpDiv.show()
							}
						},
						_dialogDatepicker : function(b, e, h, j, k) {
							b = this._dialogInst;
							if (!b) {
								this.uuid += 1;
								this._dialogInput = a('<input type="text" id="'
										+ ("dp" + this.uuid)
										+ '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
								this._dialogInput.keydown(this._doKeyDown);
								a("body").append(this._dialogInput);
								b = this._dialogInst = this._newInst(
										this._dialogInput, false);
								b.settings = {};
								a.data(this._dialogInput[0], "datepicker", b)
							}
							g(b.settings, j || {});
							e = e && e.constructor == Date ? this._formatDate(
									b, e) : e;
							this._dialogInput.val(e);
							this._pos = k ? k.length ? k : [ k.pageX, k.pageY ]
									: null;
							if (!this._pos)
								this._pos = [
										document.documentElement.clientWidth
												/ 2
												- 100
												+ (document.documentElement.scrollLeft || document.body.scrollLeft),
										document.documentElement.clientHeight
												/ 2
												- 150
												+ (document.documentElement.scrollTop || document.body.scrollTop) ];
							this._dialogInput.css("left",
									this._pos[0] + 20 + "px").css("top",
									this._pos[1] + "px");
							b.settings.onSelect = h;
							this._inDialog = true;
							this.dpDiv.addClass(this._dialogClass);
							this._showDatepicker(this._dialogInput[0]);
							a.blockUI && a.blockUI(this.dpDiv);
							a.data(this._dialogInput[0], "datepicker", b);
							return this
						},
						_destroyDatepicker : function(b) {
							var e = a(b), h = a.data(b, "datepicker");
							if (e.hasClass(this.markerClassName)) {
								var j = b.nodeName.toLowerCase();
								a.removeData(b, "datepicker");
								if (j == "input") {
									h.append.remove();
									h.trigger.remove();
									e.removeClass(this.markerClassName).unbind(
											"focus", this._showDatepicker)
											.unbind("keydown", this._doKeyDown)
											.unbind("keypress",
													this._doKeyPress).unbind(
													"keyup", this._doKeyUp)
								} else if (j == "div" || j == "span")
									e.removeClass(this.markerClassName).empty()
							}
						},
						_enableDatepicker : function(b) {
							var e = a(b), h = a.data(b, "datepicker");
							if (e.hasClass(this.markerClassName)) {
								var j = b.nodeName.toLowerCase();
								if (j == "input") {
									b.disabled = false;
									h.trigger.filter("button").each(function() {
										this.disabled = false
									}).end().filter("img").css({
										opacity : "1.0",
										cursor : ""
									})
								} else if (j == "div" || j == "span")
									e.children("." + this._inlineClass)
											.children().removeClass(
													"ui-state-disabled");
								this._disabledInputs = a.map(
										this._disabledInputs, function(k) {
											return k == b ? null : k
										})
							}
						},
						_disableDatepicker : function(b) {
							var e = a(b), h = a.data(b, "datepicker");
							if (e.hasClass(this.markerClassName)) {
								var j = b.nodeName.toLowerCase();
								if (j == "input") {
									b.disabled = true;
									h.trigger.filter("button").each(function() {
										this.disabled = true
									}).end().filter("img").css({
										opacity : "0.5",
										cursor : "default"
									})
								} else if (j == "div" || j == "span")
									e.children("." + this._inlineClass)
											.children().addClass(
													"ui-state-disabled");
								this._disabledInputs = a.map(
										this._disabledInputs, function(k) {
											return k == b ? null : k
										});
								this._disabledInputs[this._disabledInputs.length] = b
							}
						},
						_isDisabledDatepicker : function(b) {
							if (!b)
								return false;
							for ( var e = 0; e < this._disabledInputs.length; e++)
								if (this._disabledInputs[e] == b)
									return true;
							return false
						},
						_getInst : function(b) {
							try {
								return a.data(b, "datepicker")
							} catch (e) {
								throw "Missing instance data for this datepicker";
							}
						},
						_optionDatepicker : function(b, e, h) {
							var j = this._getInst(b);
							if (arguments.length == 2 && typeof e == "string")
								return e == "defaults" ? a.extend({},
										a.datepicker._defaults)
										: j ? e == "all" ? a.extend({},
												j.settings) : this._get(j, e)
												: null;
							var k = e || {};
							if (typeof e == "string") {
								k = {};
								k[e] = h
							}
							if (j) {
								this._curInst == j && this._hideDatepicker();
								var p = this._getDateDatepicker(b, true), s = this
										._getMinMaxDate(j, "min"), o = this
										._getMinMaxDate(j, "max");
								g(j.settings, k);
								if (s !== null && k.dateFormat !== c
										&& k.minDate === c)
									j.settings.minDate = this._formatDate(j, s);
								if (o !== null && k.dateFormat !== c
										&& k.maxDate === c)
									j.settings.maxDate = this._formatDate(j, o);
								this._attachments(a(b), j);
								this._autoSize(j);
								this._setDateDatepicker(b, p);
								this._updateDatepicker(j)
							}
						},
						_changeDatepicker : function(b, e, h) {
							this._optionDatepicker(b, e, h)
						},
						_refreshDatepicker : function(b) {
							(b = this._getInst(b)) && this._updateDatepicker(b)
						},
						_setDateDatepicker : function(b, e) {
							if (b = this._getInst(b)) {
								this._setDate(b, e);
								this._updateDatepicker(b);
								this._updateAlternate(b)
							}
						},
						_getDateDatepicker : function(b, e) {
							(b = this._getInst(b)) && !b.inline
									&& this._setDateFromField(b, e);
							return b ? this._getDate(b) : null
						},
						_doKeyDown : function(b) {
							var e = a.datepicker._getInst(b.target), h = true, j = e.dpDiv
									.is(".ui-datepicker-rtl");
							e._keyEvent = true;
							if (a.datepicker._datepickerShowing)
								switch (b.keyCode) {
								case 9:
									a.datepicker._hideDatepicker();
									h = false;
									break;
								case 13:
									h = a("td." + a.datepicker._dayOverClass
											+ ":not(."
											+ a.datepicker._currentClass + ")",
											e.dpDiv);
									h[0] ? a.datepicker._selectDay(b.target,
											e.selectedMonth, e.selectedYear,
											h[0]) : a.datepicker
											._hideDatepicker();
									return false;
								case 27:
									a.datepicker._hideDatepicker();
									break;
								case 33:
									a.datepicker._adjustDate(b.target,
											b.ctrlKey ? -a.datepicker._get(e,
													"stepBigMonths")
													: -a.datepicker._get(e,
															"stepMonths"), "M");
									break;
								case 34:
									a.datepicker._adjustDate(b.target,
											b.ctrlKey ? +a.datepicker._get(e,
													"stepBigMonths")
													: +a.datepicker._get(e,
															"stepMonths"), "M");
									break;
								case 35:
									if (b.ctrlKey || b.metaKey)
										a.datepicker._clearDate(b.target);
									h = b.ctrlKey || b.metaKey;
									break;
								case 36:
									if (b.ctrlKey || b.metaKey)
										a.datepicker._gotoToday(b.target);
									h = b.ctrlKey || b.metaKey;
									break;
								case 37:
									if (b.ctrlKey || b.metaKey)
										a.datepicker._adjustDate(b.target,
												j ? +1 : -1, "D");
									h = b.ctrlKey || b.metaKey;
									if (b.originalEvent.altKey)
										a.datepicker._adjustDate(b.target,
												b.ctrlKey ? -a.datepicker._get(
														e, "stepBigMonths")
														: -a.datepicker._get(e,
																"stepMonths"),
												"M");
									break;
								case 38:
									if (b.ctrlKey || b.metaKey)
										a.datepicker._adjustDate(b.target, -7,
												"D");
									h = b.ctrlKey || b.metaKey;
									break;
								case 39:
									if (b.ctrlKey || b.metaKey)
										a.datepicker._adjustDate(b.target,
												j ? -1 : +1, "D");
									h = b.ctrlKey || b.metaKey;
									if (b.originalEvent.altKey)
										a.datepicker._adjustDate(b.target,
												b.ctrlKey ? +a.datepicker._get(
														e, "stepBigMonths")
														: +a.datepicker._get(e,
																"stepMonths"),
												"M");
									break;
								case 40:
									if (b.ctrlKey || b.metaKey)
										a.datepicker._adjustDate(b.target, +7,
												"D");
									h = b.ctrlKey || b.metaKey;
									break;
								default:
									h = false
								}
							else if (b.keyCode == 36 && b.ctrlKey)
								a.datepicker._showDatepicker(this);
							else
								h = false;
							if (h) {
								b.preventDefault();
								b.stopPropagation()
							}
						},
						_doKeyPress : function(b) {
							var e = a.datepicker._getInst(b.target);
							if (a.datepicker._get(e, "constrainInput")) {
								e = a.datepicker._possibleChars(a.datepicker
										._get(e, "dateFormat"));
								var h = String
										.fromCharCode(b.charCode == c ? b.keyCode
												: b.charCode);
								return b.ctrlKey || b.metaKey || h < " " || !e
										|| e.indexOf(h) > -1
							}
						},
						_doKeyUp : function(b) {
							b = a.datepicker._getInst(b.target);
							if (b.input.val() != b.lastVal)
								try {
									if (a.datepicker.parseDate(a.datepicker
											._get(b, "dateFormat"),
											b.input ? b.input.val() : null,
											a.datepicker._getFormatConfig(b))) {
										a.datepicker._setDateFromField(b);
										a.datepicker._updateAlternate(b);
										a.datepicker._updateDatepicker(b)
									}
								} catch (e) {
									a.datepicker.log(e)
								}
							return true
						},
						_showDatepicker : function(b) {
							b = b.target || b;
							if (b.nodeName.toLowerCase() != "input")
								b = a("input", b.parentNode)[0];
							if (!(a.datepicker._isDisabledDatepicker(b) || a.datepicker._lastInput == b)) {
								var e = a.datepicker._getInst(b);
								a.datepicker._curInst
										&& a.datepicker._curInst != e
										&& a.datepicker._curInst.dpDiv.stop(
												true, true);
								var h = a.datepicker._get(e, "beforeShow");
								g(e.settings, h ? h.apply(b, [ b, e ]) : {});
								e.lastVal = null;
								a.datepicker._lastInput = b;
								a.datepicker._setDateFromField(e);
								if (a.datepicker._inDialog)
									b.value = "";
								if (!a.datepicker._pos) {
									a.datepicker._pos = a.datepicker
											._findPos(b);
									a.datepicker._pos[1] += b.offsetHeight
								}
								var j = false;
								a(b).parents().each(function() {
									j |= a(this).css("position") == "fixed";
									return !j
								});
								if (j && a.browser.opera) {
									a.datepicker._pos[0] -= document.documentElement.scrollLeft;
									a.datepicker._pos[1] -= document.documentElement.scrollTop
								}
								h = {
									left : a.datepicker._pos[0],
									top : a.datepicker._pos[1]
								};
								a.datepicker._pos = null;
								e.dpDiv.empty();
								e.dpDiv.css({
									position : "absolute",
									display : "block",
									top : "-1000px"
								});
								a.datepicker._updateDatepicker(e);
								h = a.datepicker._checkOffset(e, h, j);
								e.dpDiv.css({
									position : a.datepicker._inDialog
											&& a.blockUI ? "static"
											: j ? "fixed" : "absolute",
									display : "none",
									left : h.left + "px",
									top : h.top + "px"
								});
								if (!e.inline) {
									h = a.datepicker._get(e, "showAnim");
									var k = a.datepicker._get(e, "duration"), p = function() {
										a.datepicker._datepickerShowing = true;
										var s = e.dpDiv
												.find("iframe.ui-datepicker-cover");
										if (s.length) {
											var o = a.datepicker
													._getBorders(e.dpDiv);
											s.css({
												left : -o[0],
												top : -o[1],
												width : e.dpDiv.outerWidth(),
												height : e.dpDiv.outerHeight()
											})
										}
									};
									e.dpDiv.zIndex(a(b).zIndex() + 1);
									a.effects && a.effects[h] ? e.dpDiv
											.show(h, a.datepicker._get(e,
													"showOptions"), k, p)
											: e.dpDiv[h || "show"](
													h ? k : null, p);
									if (!h || !k)
										p();
									e.input.is(":visible")
											&& !e.input.is(":disabled")
											&& e.input.focus();
									a.datepicker._curInst = e
								}
							}
						},
						_updateDatepicker : function(b) {
							var e = this, h = a.datepicker._getBorders(b.dpDiv);
							b.dpDiv.empty().append(this._generateHTML(b));
							var j = b.dpDiv.find("iframe.ui-datepicker-cover");
							j.length && j.css({
								left : -h[0],
								top : -h[1],
								width : b.dpDiv.outerWidth(),
								height : b.dpDiv.outerHeight()
							});
							b.dpDiv
									.find(
											"button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a")
									.bind(
											"mouseout",
											function() {
												a(this).removeClass(
														"ui-state-hover");
												this.className
														.indexOf("ui-datepicker-prev") != -1
														&& a(this)
																.removeClass(
																		"ui-datepicker-prev-hover");
												this.className
														.indexOf("ui-datepicker-next") != -1
														&& a(this)
																.removeClass(
																		"ui-datepicker-next-hover")
											})
									.bind(
											"mouseover",
											function() {
												if (!e
														._isDisabledDatepicker(b.inline ? b.dpDiv
																.parent()[0]
																: b.input[0])) {
													a(this)
															.parents(
																	".ui-datepicker-calendar")
															.find("a")
															.removeClass(
																	"ui-state-hover");
													a(this).addClass(
															"ui-state-hover");
													this.className
															.indexOf("ui-datepicker-prev") != -1
															&& a(this)
																	.addClass(
																			"ui-datepicker-prev-hover");
													this.className
															.indexOf("ui-datepicker-next") != -1
															&& a(this)
																	.addClass(
																			"ui-datepicker-next-hover")
												}
											}).end().find(
											"." + this._dayOverClass + " a")
									.trigger("mouseover").end();
							h = this._getNumberOfMonths(b);
							j = h[1];
							j > 1 ? b.dpDiv
									.addClass("ui-datepicker-multi-" + j).css(
											"width", 17 * j + "em")
									: b.dpDiv
											.removeClass(
													"ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4")
											.width("");
							b.dpDiv[(h[0] != 1 || h[1] != 1 ? "add" : "remove")
									+ "Class"]("ui-datepicker-multi");
							b.dpDiv[(this._get(b, "isRTL") ? "add" : "remove")
									+ "Class"]("ui-datepicker-rtl");
							b == a.datepicker._curInst
									&& a.datepicker._datepickerShowing
									&& b.input && b.input.is(":visible")
									&& !b.input.is(":disabled")
									&& b.input[0] != document.activeElement
									&& b.input.focus();
							if (b.yearshtml) {
								var k = b.yearshtml;
								setTimeout(
										function() {
											k === b.yearshtml
													&& b.dpDiv
															.find(
																	"select.ui-datepicker-year:first")
															.replaceWith(
																	b.yearshtml);
											k = b.yearshtml = null
										}, 0)
							}
						},
						_getBorders : function(b) {
							var e = function(h) {
								return {
									thin : 1,
									medium : 2,
									thick : 3
								}[h] || h
							};
							return [ parseFloat(e(b.css("border-left-width"))),
									parseFloat(e(b.css("border-top-width"))) ]
						},
						_checkOffset : function(b, e, h) {
							var j = b.dpDiv.outerWidth(), k = b.dpDiv
									.outerHeight(), p = b.input ? b.input
									.outerWidth() : 0, s = b.input ? b.input
									.outerHeight() : 0, o = document.documentElement.clientWidth
									+ a(document).scrollLeft(), l = document.documentElement.clientHeight
									+ a(document).scrollTop();
							e.left -= this._get(b, "isRTL") ? j - p : 0;
							e.left -= h && e.left == b.input.offset().left ? a(
									document).scrollLeft() : 0;
							e.top -= h && e.top == b.input.offset().top + s ? a(
									document).scrollTop()
									: 0;
							e.left -= Math.min(e.left,
									e.left + j > o && o > j ? Math.abs(e.left
											+ j - o) : 0);
							e.top -= Math.min(e.top,
									e.top + k > l && l > k ? Math.abs(k + s)
											: 0);
							return e
						},
						_findPos : function(b) {
							for ( var e = this._get(this._getInst(b), "isRTL"); b
									&& (b.type == "hidden" || b.nodeType != 1 || a.expr.filters
											.hidden(b));)
								b = b[e ? "previousSibling" : "nextSibling"];
							b = a(b).offset();
							return [ b.left, b.top ]
						},
						_hideDatepicker : function(b) {
							var e = this._curInst;
							if (!(!e || b && e != a.data(b, "datepicker")))
								if (this._datepickerShowing) {
									b = this._get(e, "showAnim");
									var h = this._get(e, "duration"), j = function() {
										a.datepicker._tidyDialog(e);
										this._curInst = null
									};
									a.effects && a.effects[b] ? e.dpDiv
											.hide(b, a.datepicker._get(e,
													"showOptions"), h, j)
											: e.dpDiv[b == "slideDown" ? "slideUp"
													: b == "fadeIn" ? "fadeOut"
															: "hide"](b ? h
													: null, j);
									b || j();
									if (b = this._get(e, "onClose"))
										b.apply(e.input ? e.input[0] : null,
												[ e.input ? e.input.val() : "",
														e ]);
									this._datepickerShowing = false;
									this._lastInput = null;
									if (this._inDialog) {
										this._dialogInput.css({
											position : "absolute",
											left : "0",
											top : "-100px"
										});
										if (a.blockUI) {
											a.unblockUI();
											a("body").append(this.dpDiv)
										}
									}
									this._inDialog = false
								}
						},
						_tidyDialog : function(b) {
							b.dpDiv.removeClass(this._dialogClass).unbind(
									".ui-datepicker-calendar")
						},
						_checkExternalClick : function(b) {
							if (a.datepicker._curInst) {
								b = a(b.target);
								b[0].id != a.datepicker._mainDivId
										&& b.parents("#"
												+ a.datepicker._mainDivId).length == 0
										&& !b
												.hasClass(a.datepicker.markerClassName)
										&& !b
												.hasClass(a.datepicker._triggerClass)
										&& a.datepicker._datepickerShowing
										&& !(a.datepicker._inDialog && a.blockUI)
										&& a.datepicker._hideDatepicker()
							}
						},
						_adjustDate : function(b, e, h) {
							b = a(b);
							var j = this._getInst(b[0]);
							if (!this._isDisabledDatepicker(b[0])) {
								this._adjustInstDate(j, e
										+ (h == "M" ? this._get(j,
												"showCurrentAtPos") : 0), h);
								this._updateDatepicker(j)
							}
						},
						_gotoToday : function(b) {
							b = a(b);
							var e = this._getInst(b[0]);
							if (this._get(e, "gotoCurrent") && e.currentDay) {
								e.selectedDay = e.currentDay;
								e.drawMonth = e.selectedMonth = e.currentMonth;
								e.drawYear = e.selectedYear = e.currentYear
							} else {
								var h = new Date;
								e.selectedDay = h.getDate();
								e.drawMonth = e.selectedMonth = h.getMonth();
								e.drawYear = e.selectedYear = h.getFullYear()
							}
							this._notifyChange(e);
							this._adjustDate(b)
						},
						_selectMonthYear : function(b, e, h) {
							b = a(b);
							var j = this._getInst(b[0]);
							j._selectingMonthYear = false;
							j["selected" + (h == "M" ? "Month" : "Year")] = j["draw"
									+ (h == "M" ? "Month" : "Year")] = parseInt(
									e.options[e.selectedIndex].value, 10);
							this._notifyChange(j);
							this._adjustDate(b)
						},
						_clickMonthYear : function(b) {
							var e = this._getInst(a(b)[0]);
							e.input && e._selectingMonthYear
									&& setTimeout(function() {
										e.input.focus()
									}, 0);
							e._selectingMonthYear = !e._selectingMonthYear
						},
						_selectDay : function(b, e, h, j) {
							var k = a(b);
							if (!(a(j).hasClass(this._unselectableClass) || this
									._isDisabledDatepicker(k[0]))) {
								k = this._getInst(k[0]);
								k.selectedDay = k.currentDay = a("a", j).html();
								k.selectedMonth = k.currentMonth = e;
								k.selectedYear = k.currentYear = h;
								this._selectDate(b, this._formatDate(k,
										k.currentDay, k.currentMonth,
										k.currentYear))
							}
						},
						_clearDate : function(b) {
							b = a(b);
							this._getInst(b[0]);
							this._selectDate(b, "")
						},
						_selectDate : function(b, e) {
							b = this._getInst(a(b)[0]);
							e = e != null ? e : this._formatDate(b);
							b.input && b.input.val(e);
							this._updateAlternate(b);
							var h = this._get(b, "onSelect");
							if (h)
								h.apply(b.input ? b.input[0] : null, [ e, b ]);
							else
								b.input && b.input.trigger("change");
							if (b.inline)
								this._updateDatepicker(b);
							else {
								this._hideDatepicker();
								this._lastInput = b.input[0];
								typeof b.input[0] != "object"
										&& b.input.focus();
								this._lastInput = null
							}
						},
						_updateAlternate : function(b) {
							var e = this._get(b, "altField");
							if (e) {
								var h = this._get(b, "altFormat")
										|| this._get(b, "dateFormat"), j = this
										._getDate(b), k = this.formatDate(h, j,
										this._getFormatConfig(b));
								a(e).each(function() {
									a(this).val(k)
								})
							}
						},
						noWeekends : function(b) {
							b = b.getDay();
							return [ b > 0 && b < 6, "" ]
						},
						iso8601Week : function(b) {
							b = new Date(b.getTime());
							b.setDate(b.getDate() + 4 - (b.getDay() || 7));
							var e = b.getTime();
							b.setMonth(0);
							b.setDate(1);
							return Math.floor(Math.round((e - b) / 864E5) / 7) + 1
						},
						parseDate : function(b, e, h) {
							if (b == null || e == null)
								throw "Invalid arguments";
							e = typeof e == "object" ? e.toString() : e + "";
							if (e == "")
								return null;
							var j = (h ? h.shortYearCutoff : null)
									|| this._defaults.shortYearCutoff;
							j = typeof j != "string" ? j : (new Date)
									.getFullYear()
									% 100 + parseInt(j, 10);
							for ( var k = (h ? h.dayNamesShort : null)
									|| this._defaults.dayNamesShort, p = (h ? h.dayNames
									: null)
									|| this._defaults.dayNames, s = (h ? h.monthNamesShort
									: null)
									|| this._defaults.monthNamesShort, o = (h ? h.monthNames
									: null)
									|| this._defaults.monthNames, l = h = -1, q = -1, u = -1, v = false, z = function(
									D) {
								(D = y + 1 < b.length && b.charAt(y + 1) == D)
										&& y++;
								return D
							}, B = function(D) {
								var E = z(D);
								D = new RegExp("^\\d{1,"
										+ (D == "@" ? 14 : D == "!" ? 20
												: D == "y" && E ? 4
														: D == "o" ? 3 : 2)
										+ "}");
								D = e.substring(m).match(D);
								if (!D)
									throw "Missing number at position " + m;
								m += D[0].length;
								return parseInt(D[0], 10)
							}, F = function(D, E, K) {
								D = z(D) ? K : E;
								for (E = 0; E < D.length; E++)
									if (e.substr(m, D[E].length).toLowerCase() == D[E]
											.toLowerCase()) {
										m += D[E].length;
										return E + 1
									}
								throw "Unknown name at position " + m;
							}, n = function() {
								if (e.charAt(m) != b.charAt(y))
									throw "Unexpected literal at position " + m;
								m++
							}, m = 0, y = 0; y < b.length; y++)
								if (v)
									if (b.charAt(y) == "'" && !z("'"))
										v = false;
									else
										n();
								else
									switch (b.charAt(y)) {
									case "d":
										q = B("d");
										break;
									case "D":
										F("D", k, p);
										break;
									case "o":
										u = B("o");
										break;
									case "m":
										l = B("m");
										break;
									case "M":
										l = F("M", s, o);
										break;
									case "y":
										h = B("y");
										break;
									case "@":
										var A = new Date(B("@"));
										h = A.getFullYear();
										l = A.getMonth() + 1;
										q = A.getDate();
										break;
									case "!":
										A = new Date(
												(B("!") - this._ticksTo1970) / 1E4);
										h = A.getFullYear();
										l = A.getMonth() + 1;
										q = A.getDate();
										break;
									case "'":
										if (z("'"))
											n();
										else
											v = true;
										break;
									default:
										n()
									}
							if (h == -1)
								h = (new Date).getFullYear();
							else if (h < 100)
								h += (new Date).getFullYear()
										- (new Date).getFullYear() % 100
										+ (h <= j ? 0 : -100);
							if (u > -1) {
								l = 1;
								q = u;
								do {
									j = this._getDaysInMonth(h, l - 1);
									if (q <= j)
										break;
									l++;
									q -= j
								} while (1)
							}
							A = this
									._daylightSavingAdjust(new Date(h, l - 1, q));
							if (A.getFullYear() != h || A.getMonth() + 1 != l
									|| A.getDate() != q)
								throw "Invalid date";
							return A
						},
						ATOM : "yy-mm-dd",
						COOKIE : "D, dd M yy",
						ISO_8601 : "yy-mm-dd",
						RFC_822 : "D, d M y",
						RFC_850 : "DD, dd-M-y",
						RFC_1036 : "D, d M y",
						RFC_1123 : "D, d M yy",
						RFC_2822 : "D, d M yy",
						RSS : "D, d M y",
						TICKS : "!",
						TIMESTAMP : "@",
						W3C : "yy-mm-dd",
						_ticksTo1970 : (718685 + Math.floor(492.5)
								- Math.floor(19.7) + Math.floor(4.925))
								* 24 * 60 * 60 * 1E7,
						formatDate : function(b, e, h) {
							if (!e)
								return "";
							var j = (h ? h.dayNamesShort : null)
									|| this._defaults.dayNamesShort, k = (h ? h.dayNames
									: null)
									|| this._defaults.dayNames, p = (h ? h.monthNamesShort
									: null)
									|| this._defaults.monthNamesShort;
							h = (h ? h.monthNames : null)
									|| this._defaults.monthNames;
							var s = function(z) {
								(z = v + 1 < b.length && b.charAt(v + 1) == z)
										&& v++;
								return z
							}, o = function(z, B, F) {
								B = "" + B;
								if (s(z))
									for (; B.length < F;)
										B = "0" + B;
								return B
							}, l = function(z, B, F, n) {
								return s(z) ? n[B] : F[B]
							}, q = "", u = false;
							if (e)
								for ( var v = 0; v < b.length; v++)
									if (u)
										if (b.charAt(v) == "'" && !s("'"))
											u = false;
										else
											q += b.charAt(v);
									else
										switch (b.charAt(v)) {
										case "d":
											q += o("d", e.getDate(), 2);
											break;
										case "D":
											q += l("D", e.getDay(), j, k);
											break;
										case "o":
											q += o(
													"o",
													(e.getTime() - (new Date(e
															.getFullYear(), 0,
															0)).getTime()) / 864E5,
													3);
											break;
										case "m":
											q += o("m", e.getMonth() + 1, 2);
											break;
										case "M":
											q += l("M", e.getMonth(), p, h);
											break;
										case "y":
											q += s("y") ? e.getFullYear() : (e
													.getYear() % 100 < 10 ? "0"
													: "")
													+ e.getYear() % 100;
											break;
										case "@":
											q += e.getTime();
											break;
										case "!":
											q += e.getTime() * 1E4
													+ this._ticksTo1970;
											break;
										case "'":
											if (s("'"))
												q += "'";
											else
												u = true;
											break;
										default:
											q += b.charAt(v)
										}
							return q
						},
						_possibleChars : function(b) {
							for ( var e = "", h = false, j = function(p) {
								(p = k + 1 < b.length && b.charAt(k + 1) == p)
										&& k++;
								return p
							}, k = 0; k < b.length; k++)
								if (h)
									if (b.charAt(k) == "'" && !j("'"))
										h = false;
									else
										e += b.charAt(k);
								else
									switch (b.charAt(k)) {
									case "d":
									case "m":
									case "y":
									case "@":
										e += "0123456789";
										break;
									case "D":
									case "M":
										return null;
									case "'":
										if (j("'"))
											e += "'";
										else
											h = true;
										break;
									default:
										e += b.charAt(k)
									}
							return e
						},
						_get : function(b, e) {
							return b.settings[e] !== c ? b.settings[e]
									: this._defaults[e]
						},
						_setDateFromField : function(b, e) {
							if (b.input.val() != b.lastVal) {
								var h = this._get(b, "dateFormat"), j = b.lastVal = b.input ? b.input
										.val()
										: null, k, p;
								k = p = this._getDefaultDate(b);
								var s = this._getFormatConfig(b);
								try {
									k = this.parseDate(h, j, s) || p
								} catch (o) {
									this.log(o);
									j = e ? "" : j
								}
								b.selectedDay = k.getDate();
								b.drawMonth = b.selectedMonth = k.getMonth();
								b.drawYear = b.selectedYear = k.getFullYear();
								b.currentDay = j ? k.getDate() : 0;
								b.currentMonth = j ? k.getMonth() : 0;
								b.currentYear = j ? k.getFullYear() : 0;
								this._adjustInstDate(b)
							}
						},
						_getDefaultDate : function(b) {
							return this._restrictMinMax(b, this._determineDate(
									b, this._get(b, "defaultDate"), new Date))
						},
						_determineDate : function(b, e, h) {
							var j = function(p) {
								var s = new Date;
								s.setDate(s.getDate() + p);
								return s
							}, k = function(p) {
								try {
									return a.datepicker.parseDate(a.datepicker
											._get(b, "dateFormat"), p,
											a.datepicker._getFormatConfig(b))
								} catch (s) {
								}
								var o = (p.toLowerCase().match(/^c/) ? a.datepicker
										._getDate(b)
										: null)
										|| new Date, l = o.getFullYear(), q = o
										.getMonth();
								o = o.getDate();
								for ( var u = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, v = u
										.exec(p); v;) {
									switch (v[2] || "d") {
									case "d":
									case "D":
										o += parseInt(v[1], 10);
										break;
									case "w":
									case "W":
										o += parseInt(v[1], 10) * 7;
										break;
									case "m":
									case "M":
										q += parseInt(v[1], 10);
										o = Math.min(o, a.datepicker
												._getDaysInMonth(l, q));
										break;
									case "y":
									case "Y":
										l += parseInt(v[1], 10);
										o = Math.min(o, a.datepicker
												._getDaysInMonth(l, q));
										break
									}
									v = u.exec(p)
								}
								return new Date(l, q, o)
							};
							if (e = (e = e == null || e === "" ? h
									: typeof e == "string" ? k(e)
											: typeof e == "number" ? isNaN(e) ? h
													: j(e)
													: new Date(e.getTime()))
									&& e.toString() == "Invalid Date" ? h : e) {
								e.setHours(0);
								e.setMinutes(0);
								e.setSeconds(0);
								e.setMilliseconds(0)
							}
							return this._daylightSavingAdjust(e)
						},
						_daylightSavingAdjust : function(b) {
							if (!b)
								return null;
							b
									.setHours(b.getHours() > 12 ? b.getHours() + 2
											: 0);
							return b
						},
						_setDate : function(b, e, h) {
							var j = !e, k = b.selectedMonth, p = b.selectedYear;
							e = this._restrictMinMax(b, this._determineDate(b,
									e, new Date));
							b.selectedDay = b.currentDay = e.getDate();
							b.drawMonth = b.selectedMonth = b.currentMonth = e
									.getMonth();
							b.drawYear = b.selectedYear = b.currentYear = e
									.getFullYear();
							if ((k != b.selectedMonth || p != b.selectedYear)
									&& !h)
								this._notifyChange(b);
							this._adjustInstDate(b);
							if (b.input)
								b.input.val(j ? "" : this._formatDate(b))
						},
						_getDate : function(b) {
							return !b.currentYear || b.input
									&& b.input.val() == "" ? null : this
									._daylightSavingAdjust(new Date(
											b.currentYear, b.currentMonth,
											b.currentDay))
						},
						_generateHTML : function(b) {
							var e = new Date;
							e = this._daylightSavingAdjust(new Date(e
									.getFullYear(), e.getMonth(), e.getDate()));
							var h = this._get(b, "isRTL"), j = this._get(b,
									"showButtonPanel"), k = this._get(b,
									"hideIfNoPrevNext"), p = this._get(b,
									"navigationAsDateFormat"), s = this
									._getNumberOfMonths(b), o = this._get(b,
									"showCurrentAtPos"), l = this._get(b,
									"stepMonths"), q = s[0] != 1 || s[1] != 1, u = this
									._daylightSavingAdjust(!b.currentDay ? new Date(
											9999, 9, 9)
											: new Date(b.currentYear,
													b.currentMonth,
													b.currentDay)), v = this
									._getMinMaxDate(b, "min"), z = this
									._getMinMaxDate(b, "max");
							o = b.drawMonth - o;
							var B = b.drawYear;
							if (o < 0) {
								o += 12;
								B--
							}
							if (z) {
								var F = this._daylightSavingAdjust(new Date(z
										.getFullYear(), z.getMonth() - s[0]
										* s[1] + 1, z.getDate()));
								for (F = v && F < v ? v : F; this
										._daylightSavingAdjust(new Date(B, o, 1)) > F;) {
									o--;
									if (o < 0) {
										o = 11;
										B--
									}
								}
							}
							b.drawMonth = o;
							b.drawYear = B;
							F = this._get(b, "prevText");
							F = !p ? F : this.formatDate(F,
									this._daylightSavingAdjust(new Date(B, o
											- l, 1)), this._getFormatConfig(b));
							F = this._canAdjustMonth(b, -1, B, o) ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_'
									+ f
									+ ".datepicker._adjustDate('#"
									+ b.id
									+ "', -"
									+ l
									+ ", 'M');\" title=\""
									+ F
									+ '"><span class="ui-icon ui-icon-circle-triangle-'
									+ (h ? "e" : "w")
									+ '">'
									+ F
									+ "</span></a>"
									: k ? ""
											: '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'
													+ F
													+ '"><span class="ui-icon ui-icon-circle-triangle-'
													+ (h ? "e" : "w")
													+ '">'
													+ F + "</span></a>";
							var n = this._get(b, "nextText");
							n = !p ? n : this.formatDate(n,
									this._daylightSavingAdjust(new Date(B, o
											+ l, 1)), this._getFormatConfig(b));
							k = this._canAdjustMonth(b, +1, B, o) ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_'
									+ f
									+ ".datepicker._adjustDate('#"
									+ b.id
									+ "', +"
									+ l
									+ ", 'M');\" title=\""
									+ n
									+ '"><span class="ui-icon ui-icon-circle-triangle-'
									+ (h ? "w" : "e")
									+ '">'
									+ n
									+ "</span></a>"
									: k ? ""
											: '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'
													+ n
													+ '"><span class="ui-icon ui-icon-circle-triangle-'
													+ (h ? "w" : "e")
													+ '">'
													+ n + "</span></a>";
							l = this._get(b, "currentText");
							n = this._get(b, "gotoCurrent") && b.currentDay ? u
									: e;
							l = !p ? l : this.formatDate(l, n, this
									._getFormatConfig(b));
							p = !b.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_'
									+ f
									+ '.datepicker._hideDatepicker();">'
									+ this._get(b, "closeText") + "</button>"
									: "";
							j = j ? '<div class="ui-datepicker-buttonpane ui-widget-content">'
									+ (h ? p : "")
									+ (this._isInRange(b, n) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_'
											+ f
											+ ".datepicker._gotoToday('#"
											+ b.id + "');\">" + l + "</button>"
											: "") + (h ? "" : p) + "</div>"
									: "";
							p = parseInt(this._get(b, "firstDay"), 10);
							p = isNaN(p) ? 0 : p;
							l = this._get(b, "showWeek");
							n = this._get(b, "dayNames");
							this._get(b, "dayNamesShort");
							var m = this._get(b, "dayNamesMin"), y = this._get(
									b, "monthNames"), A = this._get(b,
									"monthNamesShort"), D = this._get(b,
									"beforeShowDay"), E = this._get(b,
									"showOtherMonths"), K = this._get(b,
									"selectOtherMonths");
							this._get(b, "calculateWeek");
							for ( var L = this._getDefaultDate(b), M = "", P = 0; P < s[0]; P++) {
								for ( var R = "", r = 0; r < s[1]; r++) {
									var w = this
											._daylightSavingAdjust(new Date(B,
													o, b.selectedDay)), x = " ui-corner-all", C = "";
									if (q) {
										C += '<div class="ui-datepicker-group';
										if (s[1] > 1)
											switch (r) {
											case 0:
												C += " ui-datepicker-group-first";
												x = " ui-corner-"
														+ (h ? "right" : "left");
												break;
											case s[1] - 1:
												C += " ui-datepicker-group-last";
												x = " ui-corner-"
														+ (h ? "left" : "right");
												break;
											default:
												C += " ui-datepicker-group-middle";
												x = "";
												break
											}
										C += '">'
									}
									C += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'
											+ x
											+ '">'
											+ (/all|left/.test(x) && P == 0 ? h ? k
													: F
													: "")
											+ (/all|right/.test(x) && P == 0 ? h ? F
													: k
													: "")
											+ this._generateMonthYearHeader(b,
													o, B, v, z, P > 0 || r > 0,
													y, A)
											+ '</div><table class="ui-datepicker-calendar"><thead><tr>';
									var G = l ? '<th class="ui-datepicker-week-col">'
											+ this._get(b, "weekHeader")
											+ "</th>"
											: "";
									for (x = 0; x < 7; x++) {
										var H = (x + p) % 7;
										G += "<th"
												+ ((x + p + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"'
														: "")
												+ '><span title="' + n[H]
												+ '">' + m[H] + "</span></th>"
									}
									C += G + "</tr></thead><tbody>";
									G = this._getDaysInMonth(B, o);
									if (B == b.selectedYear
											&& o == b.selectedMonth)
										b.selectedDay = Math.min(b.selectedDay,
												G);
									x = (this._getFirstDayOfMonth(B, o) - p + 7) % 7;
									G = q ? 6 : Math.ceil((x + G) / 7);
									H = this._daylightSavingAdjust(new Date(B,
											o, 1 - x));
									for ( var I = 0; I < G; I++) {
										C += "<tr>";
										var J = !l ? ""
												: '<td class="ui-datepicker-week-col">'
														+ this
																._get(b,
																		"calculateWeek")
																(H) + "</td>";
										for (x = 0; x < 7; x++) {
											var N = D ? D
													.apply(b.input ? b.input[0]
															: null, [ H ]) : [
													true, "" ], O = H
													.getMonth() != o, Q = O
													&& !K || !N[0] || v
													&& H < v || z && H > z;
											J += '<td class="'
													+ ((x + p + 6) % 7 >= 5 ? " ui-datepicker-week-end"
															: "")
													+ (O ? " ui-datepicker-other-month"
															: "")
													+ (H.getTime() == w
															.getTime()
															&& o == b.selectedMonth
															&& b._keyEvent
															|| L.getTime() == H
																	.getTime()
															&& L.getTime() == w
																	.getTime() ? " "
															+ this._dayOverClass
															: "")
													+ (Q ? " "
															+ this._unselectableClass
															+ " ui-state-disabled"
															: "")
													+ (O && !E ? ""
															: " "
																	+ N[1]
																	+ (H
																			.getTime() == u
																			.getTime() ? " "
																			+ this._currentClass
																			: "")
																	+ (H
																			.getTime() == e
																			.getTime() ? " ui-datepicker-today"
																			: ""))
													+ '"'
													+ ((!O || E) && N[2] ? ' title="'
															+ N[2] + '"'
															: "")
													+ (Q ? ""
															: ' onclick="DP_jQuery_'
																	+ f
																	+ ".datepicker._selectDay('#"
																	+ b.id
																	+ "',"
																	+ H
																			.getMonth()
																	+ ","
																	+ H
																			.getFullYear()
																	+ ', this);return false;"')
													+ ">"
													+ (O && !E ? "&#xa0;"
															: Q ? '<span class="ui-state-default">'
																	+ H
																			.getDate()
																	+ "</span>"
																	: '<a class="ui-state-default'
																			+ (H
																					.getTime() == e
																					.getTime() ? " ui-state-highlight"
																					: "")
																			+ (H
																					.getTime() == u
																					.getTime() ? " ui-state-active"
																					: "")
																			+ (O ? " ui-priority-secondary"
																					: "")
																			+ '" href="#">'
																			+ H
																					.getDate()
																			+ "</a>")
													+ "</td>";
											H.setDate(H.getDate() + 1);
											H = this._daylightSavingAdjust(H)
										}
										C += J + "</tr>"
									}
									o++;
									if (o > 11) {
										o = 0;
										B++
									}
									C += "</tbody></table>"
											+ (q ? "</div>"
													+ (s[0] > 0
															&& r == s[1] - 1 ? '<div class="ui-datepicker-row-break"></div>'
															: "")
													: "");
									R += C
								}
								M += R
							}
							M += j
									+ (a.browser.msie
											&& parseInt(a.browser.version, 10) < 7
											&& !b.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>'
											: "");
							b._keyEvent = false;
							return M
						},
						_generateMonthYearHeader : function(b, e, h, j, k, p,
								s, o) {
							var l = this._get(b, "changeMonth"), q = this._get(
									b, "changeYear"), u = this._get(b,
									"showMonthAfterYear"), v = '<div class="ui-datepicker-title">', z = "";
							if (p || !l)
								z += '<span class="ui-datepicker-month">'
										+ s[e] + "</span>";
							else {
								s = j && j.getFullYear() == h;
								var B = k && k.getFullYear() == h;
								z += '<select class="ui-datepicker-month" onchange="DP_jQuery_'
										+ f
										+ ".datepicker._selectMonthYear('#"
										+ b.id
										+ "', this, 'M');\" onclick=\"DP_jQuery_"
										+ f
										+ ".datepicker._clickMonthYear('#"
										+ b.id + "');\">";
								for ( var F = 0; F < 12; F++)
									if ((!s || F >= j.getMonth())
											&& (!B || F <= k.getMonth()))
										z += '<option value="'
												+ F
												+ '"'
												+ (F == e ? ' selected="selected"'
														: "") + ">" + o[F]
												+ "</option>";
								z += "</select>"
							}
							u || (v += z + (p || !(l && q) ? "&#xa0;" : ""));
							b.yearshtml = "";
							if (p || !q)
								v += '<span class="ui-datepicker-year">' + h
										+ "</span>";
							else {
								o = this._get(b, "yearRange").split(":");
								var n = (new Date).getFullYear();
								s = function(m) {
									m = m.match(/c[+-].*/) ? h
											+ parseInt(m.substring(1), 10) : m
											.match(/[+-].*/) ? n
											+ parseInt(m, 10) : parseInt(m, 10);
									return isNaN(m) ? n : m
								};
								e = s(o[0]);
								o = Math.max(e, s(o[1] || ""));
								e = j ? Math.max(e, j.getFullYear()) : e;
								o = k ? Math.min(o, k.getFullYear()) : o;
								for (b.yearshtml += '<select class="ui-datepicker-year" onchange="DP_jQuery_'
										+ f
										+ ".datepicker._selectMonthYear('#"
										+ b.id
										+ "', this, 'Y');\" onclick=\"DP_jQuery_"
										+ f
										+ ".datepicker._clickMonthYear('#"
										+ b.id + "');\">"; e <= o; e++)
									b.yearshtml += '<option value="'
											+ e
											+ '"'
											+ (e == h ? ' selected="selected"'
													: "") + ">" + e
											+ "</option>";
								b.yearshtml += "</select>";
								if (a.browser.mozilla)
									v += '<select class="ui-datepicker-year"><option value="'
											+ h
											+ '" selected="selected">'
											+ h
											+ "</option></select>";
								else {
									v += b.yearshtml;
									b.yearshtml = null
								}
							}
							v += this._get(b, "yearSuffix");
							if (u)
								v += (p || !(l && q) ? "&#xa0;" : "") + z;
							v += "</div>";
							return v
						},
						_adjustInstDate : function(b, e, h) {
							var j = b.drawYear + (h == "Y" ? e : 0), k = b.drawMonth
									+ (h == "M" ? e : 0);
							e = Math.min(b.selectedDay, this._getDaysInMonth(j,
									k))
									+ (h == "D" ? e : 0);
							j = this._restrictMinMax(b, this
									._daylightSavingAdjust(new Date(j, k, e)));
							b.selectedDay = j.getDate();
							b.drawMonth = b.selectedMonth = j.getMonth();
							b.drawYear = b.selectedYear = j.getFullYear();
							if (h == "M" || h == "Y")
								this._notifyChange(b)
						},
						_restrictMinMax : function(b, e) {
							var h = this._getMinMaxDate(b, "min");
							b = this._getMinMaxDate(b, "max");
							e = h && e < h ? h : e;
							return b && e > b ? b : e
						},
						_notifyChange : function(b) {
							var e = this._get(b, "onChangeMonthYear");
							if (e)
								e.apply(b.input ? b.input[0] : null,
										[ b.selectedYear, b.selectedMonth + 1,
												b ])
						},
						_getNumberOfMonths : function(b) {
							b = this._get(b, "numberOfMonths");
							return b == null ? [ 1, 1 ]
									: typeof b == "number" ? [ 1, b ] : b
						},
						_getMinMaxDate : function(b, e) {
							return this._determineDate(b, this._get(b, e
									+ "Date"), null)
						},
						_getDaysInMonth : function(b, e) {
							return 32 - this._daylightSavingAdjust(
									new Date(b, e, 32)).getDate()
						},
						_getFirstDayOfMonth : function(b, e) {
							return (new Date(b, e, 1)).getDay()
						},
						_canAdjustMonth : function(b, e, h, j) {
							var k = this._getNumberOfMonths(b);
							h = this._daylightSavingAdjust(new Date(h, j
									+ (e < 0 ? e : k[0] * k[1]), 1));
							e < 0
									&& h.setDate(this._getDaysInMonth(h
											.getFullYear(), h.getMonth()));
							return this._isInRange(b, h)
						},
						_isInRange : function(b, e) {
							var h = this._getMinMaxDate(b, "min");
							b = this._getMinMaxDate(b, "max");
							return (!h || e.getTime() >= h.getTime())
									&& (!b || e.getTime() <= b.getTime())
						},
						_getFormatConfig : function(b) {
							var e = this._get(b, "shortYearCutoff");
							e = typeof e != "string" ? e : (new Date)
									.getFullYear()
									% 100 + parseInt(e, 10);
							return {
								shortYearCutoff : e,
								dayNamesShort : this._get(b, "dayNamesShort"),
								dayNames : this._get(b, "dayNames"),
								monthNamesShort : this._get(b,
										"monthNamesShort"),
								monthNames : this._get(b, "monthNames")
							}
						},
						_formatDate : function(b, e, h, j) {
							if (!e) {
								b.currentDay = b.selectedDay;
								b.currentMonth = b.selectedMonth;
								b.currentYear = b.selectedYear
							}
							e = e ? typeof e == "object" ? e : this
									._daylightSavingAdjust(new Date(j, h, e))
									: this._daylightSavingAdjust(new Date(
											b.currentYear, b.currentMonth,
											b.currentDay));
							return this.formatDate(this._get(b, "dateFormat"),
									e, this._getFormatConfig(b))
						}
					});
	a.fn.datepicker = function(b) {
		if (!this.length)
			return this;
		if (!a.datepicker.initialized) {
			a(document).mousedown(a.datepicker._checkExternalClick)
					.find("body").append(a.datepicker.dpDiv);
			a.datepicker.initialized = true
		}
		var e = Array.prototype.slice.call(arguments, 1);
		if (typeof b == "string"
				&& (b == "isDisabled" || b == "getDate" || b == "widget"))
			return a.datepicker["_" + b + "Datepicker"].apply(a.datepicker,
					[ this[0] ].concat(e));
		if (b == "option" && arguments.length == 2
				&& typeof arguments[1] == "string")
			return a.datepicker["_" + b + "Datepicker"].apply(a.datepicker,
					[ this[0] ].concat(e));
		return this.each(function() {
			typeof b == "string" ? a.datepicker["_" + b + "Datepicker"].apply(
					a.datepicker, [ this ].concat(e)) : a.datepicker
					._attachDatepicker(this, b)
		})
	};
	a.datepicker = new d;
	a.datepicker.initialized = false;
	a.datepicker.uuid = (new Date).getTime();
	a.datepicker.version = "1.8.11";
	window["DP_jQuery_" + f] = a
})(jQuery);
(function(a, c) {
	a
			.widget(
					"ui.progressbar",
					{
						options : {
							value : 0,
							max : 100
						},
						min : 0,
						_create : function() {
							this.element
									.addClass(
											"ui-progressbar ui-widget ui-widget-content ui-corner-all")
									.attr({
										role : "progressbar",
										"aria-valuemin" : this.min,
										"aria-valuemax" : this.options.max,
										"aria-valuenow" : this._value()
									});
							this.valueDiv = a(
									"<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>")
									.appendTo(this.element);
							this.oldValue = this._value();
							this._refreshValue()
						},
						destroy : function() {
							this.element
									.removeClass(
											"ui-progressbar ui-widget ui-widget-content ui-corner-all")
									.removeAttr("role").removeAttr(
											"aria-valuemin").removeAttr(
											"aria-valuemax").removeAttr(
											"aria-valuenow");
							this.valueDiv.remove();
							a.Widget.prototype.destroy.apply(this, arguments)
						},
						value : function(d) {
							if (d === c)
								return this._value();
							this._setOption("value", d);
							return this
						},
						_setOption : function(d, g) {
							if (d === "value") {
								this.options.value = g;
								this._refreshValue();
								this._value() === this.options.max
										&& this._trigger("complete")
							}
							a.Widget.prototype._setOption
									.apply(this, arguments)
						},
						_value : function() {
							var d = this.options.value;
							if (typeof d !== "number")
								d = 0;
							return Math.min(this.options.max, Math.max(
									this.min, d))
						},
						_percentage : function() {
							return 100 * this._value() / this.options.max
						},
						_refreshValue : function() {
							var d = this.value(), g = this._percentage();
							if (this.oldValue !== d) {
								this.oldValue = d;
								this._trigger("change")
							}
							this.valueDiv.toggleClass("ui-corner-right",
									d === this.options.max).width(
									g.toFixed(0) + "%");
							this.element.attr("aria-valuenow", d)
						}
					});
	a.extend(a.ui.progressbar, {
		version : "1.8.11"
	})
})(jQuery);
jQuery.effects
		|| function(a, c) {
			function d(o) {
				var l;
				if (o && o.constructor == Array && o.length == 3)
					return o;
				if (l = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/
						.exec(o))
					return [ parseInt(l[1], 10), parseInt(l[2], 10),
							parseInt(l[3], 10) ];
				if (l = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/
						.exec(o))
					return [ parseFloat(l[1]) * 2.55, parseFloat(l[2]) * 2.55,
							parseFloat(l[3]) * 2.55 ];
				if (l = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/
						.exec(o))
					return [ parseInt(l[1], 16), parseInt(l[2], 16),
							parseInt(l[3], 16) ];
				if (l = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(o))
					return [ parseInt(l[1] + l[1], 16),
							parseInt(l[2] + l[2], 16),
							parseInt(l[3] + l[3], 16) ];
				if (/rgba\(0, 0, 0, 0\)/.exec(o))
					return k.transparent;
				return k[a.trim(o).toLowerCase()]
			}
			function g(o, l) {
				var q;
				do {
					q = a.curCSS(o, l);
					if (q != "" && q != "transparent" || a.nodeName(o, "body"))
						break;
					l = "backgroundColor"
				} while (o = o.parentNode);
				return d(q)
			}
			function f() {
				var o = document.defaultView ? document.defaultView
						.getComputedStyle(this, null) : this.currentStyle, l = {}, q, u;
				if (o && o.length && o[0] && o[o[0]])
					for ( var v = o.length; v--;) {
						q = o[v];
						if (typeof o[q] == "string") {
							u = q.replace(/\-(\w)/g, function(z, B) {
								return B.toUpperCase()
							});
							l[u] = o[q]
						}
					}
				else
					for (q in o)
						if (typeof o[q] === "string")
							l[q] = o[q];
				return l
			}
			function b(o) {
				var l, q;
				for (l in o) {
					q = o[l];
					if (q == null || a.isFunction(q) || l in s
							|| /scrollbar/.test(l) || !/color/i.test(l)
							&& isNaN(parseFloat(q)))
						delete o[l]
				}
				return o
			}
			function e(o, l) {
				var q = {
					_ : 0
				}, u;
				for (u in l)
					if (o[u] != l[u])
						q[u] = l[u];
				return q
			}
			function h(o, l, q, u) {
				if (typeof o == "object") {
					u = l;
					q = null;
					l = o;
					o = l.effect
				}
				if (a.isFunction(l)) {
					u = l;
					q = null;
					l = {}
				}
				if (typeof l == "number" || a.fx.speeds[l]) {
					u = q;
					q = l;
					l = {}
				}
				if (a.isFunction(q)) {
					u = q;
					q = null
				}
				l = l || {};
				q = q || l.duration;
				q = a.fx.off ? 0 : typeof q == "number" ? q
						: q in a.fx.speeds ? a.fx.speeds[q]
								: a.fx.speeds._default;
				u = u || l.complete;
				return [ o, l, q, u ]
			}
			function j(o) {
				if (!o || typeof o === "number" || a.fx.speeds[o])
					return true;
				if (typeof o === "string" && !a.effects[o])
					return true;
				return false
			}
			a.effects = {};
			a.each([ "backgroundColor", "borderBottomColor", "borderLeftColor",
					"borderRightColor", "borderTopColor", "borderColor",
					"color", "outlineColor" ], function(o, l) {
				a.fx.step[l] = function(q) {
					if (!q.colorInit) {
						q.start = g(q.elem, l);
						q.end = d(q.end);
						q.colorInit = true
					}
					q.elem.style[l] = "rgb("
							+ Math.max(Math.min(
									parseInt(q.pos * (q.end[0] - q.start[0])
											+ q.start[0], 10), 255), 0)
							+ ","
							+ Math.max(Math.min(
									parseInt(q.pos * (q.end[1] - q.start[1])
											+ q.start[1], 10), 255), 0)
							+ ","
							+ Math.max(Math.min(
									parseInt(q.pos * (q.end[2] - q.start[2])
											+ q.start[2], 10), 255), 0) + ")"
				}
			});
			var k = {
				aqua : [ 0, 255, 255 ],
				azure : [ 240, 255, 255 ],
				beige : [ 245, 245, 220 ],
				black : [ 0, 0, 0 ],
				blue : [ 0, 0, 255 ],
				brown : [ 165, 42, 42 ],
				cyan : [ 0, 255, 255 ],
				darkblue : [ 0, 0, 139 ],
				darkcyan : [ 0, 139, 139 ],
				darkgrey : [ 169, 169, 169 ],
				darkgreen : [ 0, 100, 0 ],
				darkkhaki : [ 189, 183, 107 ],
				darkmagenta : [ 139, 0, 139 ],
				darkolivegreen : [ 85, 107, 47 ],
				darkorange : [ 255, 140, 0 ],
				darkorchid : [ 153, 50, 204 ],
				darkred : [ 139, 0, 0 ],
				darksalmon : [ 233, 150, 122 ],
				darkviolet : [ 148, 0, 211 ],
				fuchsia : [ 255, 0, 255 ],
				gold : [ 255, 215, 0 ],
				green : [ 0, 128, 0 ],
				indigo : [ 75, 0, 130 ],
				khaki : [ 240, 230, 140 ],
				lightblue : [ 173, 216, 230 ],
				lightcyan : [ 224, 255, 255 ],
				lightgreen : [ 144, 238, 144 ],
				lightgrey : [ 211, 211, 211 ],
				lightpink : [ 255, 182, 193 ],
				lightyellow : [ 255, 255, 224 ],
				lime : [ 0, 255, 0 ],
				magenta : [ 255, 0, 255 ],
				maroon : [ 128, 0, 0 ],
				navy : [ 0, 0, 128 ],
				olive : [ 128, 128, 0 ],
				orange : [ 255, 165, 0 ],
				pink : [ 255, 192, 203 ],
				purple : [ 128, 0, 128 ],
				violet : [ 128, 0, 128 ],
				red : [ 255, 0, 0 ],
				silver : [ 192, 192, 192 ],
				white : [ 255, 255, 255 ],
				yellow : [ 255, 255, 0 ],
				transparent : [ 255, 255, 255 ]
			}, p = [ "add", "remove", "toggle" ], s = {
				border : 1,
				borderBottom : 1,
				borderColor : 1,
				borderLeft : 1,
				borderRight : 1,
				borderTop : 1,
				borderWidth : 1,
				margin : 1,
				padding : 1
			};
			a.effects.animateClass = function(o, l, q, u) {
				if (a.isFunction(q)) {
					u = q;
					q = null
				}
				return this.queue("fx", function() {
					var v = a(this), z = v.attr("style") || " ", B = b(f
							.call(this)), F, n = v.attr("className");
					a.each(p, function(m, y) {
						o[y] && v[y + "Class"](o[y])
					});
					F = b(f.call(this));
					v.attr("className", n);
					v.animate(e(B, F), l, q, function() {
						a.each(p, function(m, y) {
							o[y] && v[y + "Class"](o[y])
						});
						if (typeof v.attr("style") == "object") {
							v.attr("style").cssText = "";
							v.attr("style").cssText = z
						} else
							v.attr("style", z);
						u && u.apply(this, arguments)
					});
					B = a.queue(this);
					F = B.splice(B.length - 1, 1)[0];
					B.splice(1, 0, F);
					a.dequeue(this)
				})
			};
			a.fn
					.extend({
						_addClass : a.fn.addClass,
						addClass : function(o, l, q, u) {
							return l ? a.effects.animateClass.apply(this, [ {
								add : o
							}, l, q, u ]) : this._addClass(o)
						},
						_removeClass : a.fn.removeClass,
						removeClass : function(o, l, q, u) {
							return l ? a.effects.animateClass.apply(this, [ {
								remove : o
							}, l, q, u ]) : this._removeClass(o)
						},
						_toggleClass : a.fn.toggleClass,
						toggleClass : function(o, l, q, u, v) {
							return typeof l == "boolean" || l === c ? q ? a.effects.animateClass
									.apply(this, [ l ? {
										add : o
									} : {
										remove : o
									}, q, u, v ])
									: this._toggleClass(o, l)
									: a.effects.animateClass.apply(this, [ {
										toggle : o
									}, l, q, u ])
						},
						switchClass : function(o, l, q, u, v) {
							return a.effects.animateClass.apply(this, [ {
								add : l,
								remove : o
							}, q, u, v ])
						}
					});
			a.extend(a.effects, {
				version : "1.8.11",
				save : function(o, l) {
					for ( var q = 0; q < l.length; q++)
						l[q] !== null
								&& o.data("ec.storage." + l[q],
										o[0].style[l[q]])
				},
				restore : function(o, l) {
					for ( var q = 0; q < l.length; q++)
						l[q] !== null
								&& o.css(l[q], o.data("ec.storage." + l[q]))
				},
				setMode : function(o, l) {
					if (l == "toggle")
						l = o.is(":hidden") ? "show" : "hide";
					return l
				},
				getBaseline : function(o, l) {
					var q;
					switch (o[0]) {
					case "top":
						q = 0;
						break;
					case "middle":
						q = 0.5;
						break;
					case "bottom":
						q = 1;
						break;
					default:
						q = o[0] / l.height
					}
					switch (o[1]) {
					case "left":
						o = 0;
						break;
					case "center":
						o = 0.5;
						break;
					case "right":
						o = 1;
						break;
					default:
						o = o[1] / l.width
					}
					return {
						x : o,
						y : q
					}
				},
				createWrapper : function(o) {
					if (o.parent().is(".ui-effects-wrapper"))
						return o.parent();
					var l = {
						width : o.outerWidth(true),
						height : o.outerHeight(true),
						"float" : o.css("float")
					}, q = a("<div></div>").addClass("ui-effects-wrapper").css(
							{
								fontSize : "100%",
								background : "transparent",
								border : "none",
								margin : 0,
								padding : 0
							});
					o.wrap(q);
					q = o.parent();
					if (o.css("position") == "static") {
						q.css({
							position : "relative"
						});
						o.css({
							position : "relative"
						})
					} else {
						a.extend(l, {
							position : o.css("position"),
							zIndex : o.css("z-index")
						});
						a.each([ "top", "left", "bottom", "right" ], function(
								u, v) {
							l[v] = o.css(v);
							if (isNaN(parseInt(l[v], 10)))
								l[v] = "auto"
						});
						o.css({
							position : "relative",
							top : 0,
							left : 0,
							right : "auto",
							bottom : "auto"
						})
					}
					return q.css(l).show()
				},
				removeWrapper : function(o) {
					if (o.parent().is(".ui-effects-wrapper"))
						return o.parent().replaceWith(o);
					return o
				},
				setTransition : function(o, l, q, u) {
					u = u || {};
					a.each(l, function(v, z) {
						unit = o.cssUnit(z);
						if (unit[0] > 0)
							u[z] = unit[0] * q + unit[1]
					});
					return u
				}
			});
			a.fn.extend({
				effect : function(o) {
					var l = h.apply(this, arguments), q = {
						options : l[1],
						duration : l[2],
						callback : l[3]
					};
					l = q.options.mode;
					var u = a.effects[o];
					if (a.fx.off || !u)
						return l ? this[l](q.duration, q.callback) : this
								.each(function() {
									q.callback && q.callback.call(this)
								});
					return u.call(this, q)
				},
				_show : a.fn.show,
				show : function(o) {
					if (j(o))
						return this._show.apply(this, arguments);
					else {
						var l = h.apply(this, arguments);
						l[1].mode = "show";
						return this.effect.apply(this, l)
					}
				},
				_hide : a.fn.hide,
				hide : function(o) {
					if (j(o))
						return this._hide.apply(this, arguments);
					else {
						var l = h.apply(this, arguments);
						l[1].mode = "hide";
						return this.effect.apply(this, l)
					}
				},
				__toggle : a.fn.toggle,
				toggle : function(o) {
					if (j(o) || typeof o === "boolean" || a.isFunction(o))
						return this.__toggle.apply(this, arguments);
					else {
						var l = h.apply(this, arguments);
						l[1].mode = "toggle";
						return this.effect.apply(this, l)
					}
				},
				cssUnit : function(o) {
					var l = this.css(o), q = [];
					a.each([ "em", "px", "%", "pt" ], function(u, v) {
						if (l.indexOf(v) > 0)
							q = [ parseFloat(l), v ]
					});
					return q
				}
			});
			a.easing.jswing = a.easing.swing;
			a
					.extend(
							a.easing,
							{
								def : "easeOutQuad",
								swing : function(o, l, q, u, v) {
									return a.easing[a.easing.def]
											(o, l, q, u, v)
								},
								easeInQuad : function(o, l, q, u, v) {
									return u * (l /= v) * l + q
								},
								easeOutQuad : function(o, l, q, u, v) {
									return -u * (l /= v) * (l - 2) + q
								},
								easeInOutQuad : function(o, l, q, u, v) {
									if ((l /= v / 2) < 1)
										return u / 2 * l * l + q;
									return -u / 2 * (--l * (l - 2) - 1) + q
								},
								easeInCubic : function(o, l, q, u, v) {
									return u * (l /= v) * l * l + q
								},
								easeOutCubic : function(o, l, q, u, v) {
									return u * ((l = l / v - 1) * l * l + 1)
											+ q
								},
								easeInOutCubic : function(o, l, q, u, v) {
									if ((l /= v / 2) < 1)
										return u / 2 * l * l * l + q;
									return u / 2 * ((l -= 2) * l * l + 2) + q
								},
								easeInQuart : function(o, l, q, u, v) {
									return u * (l /= v) * l * l * l + q
								},
								easeOutQuart : function(o, l, q, u, v) {
									return -u
											* ((l = l / v - 1) * l * l * l - 1)
											+ q
								},
								easeInOutQuart : function(o, l, q, u, v) {
									if ((l /= v / 2) < 1)
										return u / 2 * l * l * l * l + q;
									return -u / 2 * ((l -= 2) * l * l * l - 2)
											+ q
								},
								easeInQuint : function(o, l, q, u, v) {
									return u * (l /= v) * l * l * l * l + q
								},
								easeOutQuint : function(o, l, q, u, v) {
									return u
											* ((l = l / v - 1) * l * l * l * l + 1)
											+ q
								},
								easeInOutQuint : function(o, l, q, u, v) {
									if ((l /= v / 2) < 1)
										return u / 2 * l * l * l * l * l + q;
									return u / 2
											* ((l -= 2) * l * l * l * l + 2)
											+ q
								},
								easeInSine : function(o, l, q, u, v) {
									return -u * Math.cos(l / v * (Math.PI / 2))
											+ u + q
								},
								easeOutSine : function(o, l, q, u, v) {
									return u * Math.sin(l / v * (Math.PI / 2))
											+ q
								},
								easeInOutSine : function(o, l, q, u, v) {
									return -u / 2
											* (Math.cos(Math.PI * l / v) - 1)
											+ q
								},
								easeInExpo : function(o, l, q, u, v) {
									return l == 0 ? q : u
											* Math.pow(2, 10 * (l / v - 1)) + q
								},
								easeOutExpo : function(o, l, q, u, v) {
									return l == v ? q + u : u
											* (-Math.pow(2, -10 * l / v) + 1)
											+ q
								},
								easeInOutExpo : function(o, l, q, u, v) {
									if (l == 0)
										return q;
									if (l == v)
										return q + u;
									if ((l /= v / 2) < 1)
										return u / 2
												* Math.pow(2, 10 * (l - 1)) + q;
									return u / 2
											* (-Math.pow(2, -10 * --l) + 2) + q
								},
								easeInCirc : function(o, l, q, u, v) {
									return -u
											* (Math.sqrt(1 - (l /= v) * l) - 1)
											+ q
								},
								easeOutCirc : function(o, l, q, u, v) {
									return u
											* Math
													.sqrt(1 - (l = l / v - 1)
															* l) + q
								},
								easeInOutCirc : function(o, l, q, u, v) {
									if ((l /= v / 2) < 1)
										return -u / 2
												* (Math.sqrt(1 - l * l) - 1)
												+ q;
									return u / 2
											* (Math.sqrt(1 - (l -= 2) * l) + 1)
											+ q
								},
								easeInElastic : function(o, l, q, u, v) {
									var z = 0, B = u;
									if (l == 0)
										return q;
									if ((l /= v) == 1)
										return q + u;
									z || (z = v * 0.3);
									if (B < Math.abs(u)) {
										B = u;
										o = z / 4
									} else
										o = z / (2 * Math.PI)
												* Math.asin(u / B);
									return -(B * Math.pow(2, 10 * (l -= 1)) * Math
											.sin((l * v - o) * 2 * Math.PI / z))
											+ q
								},
								easeOutElastic : function(o, l, q, u, v) {
									var z = 0, B = u;
									if (l == 0)
										return q;
									if ((l /= v) == 1)
										return q + u;
									z || (z = v * 0.3);
									if (B < Math.abs(u)) {
										B = u;
										o = z / 4
									} else
										o = z / (2 * Math.PI)
												* Math.asin(u / B);
									return B
											* Math.pow(2, -10 * l)
											* Math.sin((l * v - o) * 2
													* Math.PI / z) + u + q
								},
								easeInOutElastic : function(o, l, q, u, v) {
									var z = 0, B = u;
									if (l == 0)
										return q;
									if ((l /= v / 2) == 2)
										return q + u;
									z || (z = v * 0.3 * 1.5);
									if (B < Math.abs(u)) {
										B = u;
										o = z / 4
									} else
										o = z / (2 * Math.PI)
												* Math.asin(u / B);
									if (l < 1)
										return -0.5
												* B
												* Math.pow(2, 10 * (l -= 1))
												* Math.sin((l * v - o) * 2
														* Math.PI / z) + q;
									return B
											* Math.pow(2, -10 * (l -= 1))
											* Math.sin((l * v - o) * 2
													* Math.PI / z) * 0.5 + u
											+ q
								},
								easeInBack : function(o, l, q, u, v, z) {
									if (z == c)
										z = 1.70158;
									return u * (l /= v) * l * ((z + 1) * l - z)
											+ q
								},
								easeOutBack : function(o, l, q, u, v, z) {
									if (z == c)
										z = 1.70158;
									return u
											* ((l = l / v - 1) * l
													* ((z + 1) * l + z) + 1)
											+ q
								},
								easeInOutBack : function(o, l, q, u, v, z) {
									if (z == c)
										z = 1.70158;
									if ((l /= v / 2) < 1)
										return u / 2 * l * l
												* (((z *= 1.525) + 1) * l - z)
												+ q;
									return u
											/ 2
											* ((l -= 2)
													* l
													* (((z *= 1.525) + 1) * l + z) + 2)
											+ q
								},
								easeInBounce : function(o, l, q, u, v) {
									return u
											- a.easing.easeOutBounce(o, v - l,
													0, u, v) + q
								},
								easeOutBounce : function(o, l, q, u, v) {
									return (l /= v) < 1 / 2.75 ? u * 7.5625 * l
											* l + q
											: l < 2 / 2.75 ? u
													* (7.5625
															* (l -= 1.5 / 2.75)
															* l + 0.75) + q
													: l < 2.5 / 2.75 ? u
															* (7.5625
																	* (l -= 2.25 / 2.75)
																	* l + 0.9375)
															+ q
															: u
																	* (7.5625
																			* (l -= 2.625 / 2.75)
																			* l + 0.984375)
																	+ q
								},
								easeInOutBounce : function(o, l, q, u, v) {
									if (l < v / 2)
										return a.easing.easeInBounce(o, l * 2,
												0, u, v)
												* 0.5 + q;
									return a.easing.easeOutBounce(o, l * 2 - v,
											0, u, v)
											* 0.5 + u * 0.5 + q
								}
							})
		}(jQuery);
(function(a) {
	a.effects.blind = function(c) {
		return this
				.queue(function() {
					var d = a(this), g = [ "position", "top", "bottom", "left",
							"right" ], f = a.effects.setMode(d, c.options.mode
							|| "hide"), b = c.options.direction || "vertical";
					a.effects.save(d, g);
					d.show();
					var e = a.effects.createWrapper(d).css({
						overflow : "hidden"
					}), h = b == "vertical" ? "height" : "width";
					b = b == "vertical" ? e.height() : e.width();
					f == "show" && e.css(h, 0);
					var j = {};
					j[h] = f == "show" ? b : 0;
					e.animate(j, c.duration, c.options.easing, function() {
						f == "hide" && d.hide();
						a.effects.restore(d, g);
						a.effects.removeWrapper(d);
						c.callback && c.callback.apply(d[0], arguments);
						d.dequeue()
					})
				})
	}
})(jQuery);
(function(a) {
	a.effects.bounce = function(c) {
		return this
				.queue(function() {
					var d = a(this), g = [ "position", "top", "bottom", "left",
							"right" ], f = a.effects.setMode(d, c.options.mode
							|| "effect"), b = c.options.direction || "up", e = c.options.distance || 20, h = c.options.times || 5, j = c.duration || 250;
					/show|hide/.test(f) && g.push("opacity");
					a.effects.save(d, g);
					d.show();
					a.effects.createWrapper(d);
					var k = b == "up" || b == "down" ? "top" : "left";
					b = b == "up" || b == "left" ? "pos" : "neg";
					e = c.options.distance || (k == "top" ? d.outerHeight({
						margin : true
					}) / 3 : d.outerWidth({
						margin : true
					}) / 3);
					if (f == "show")
						d.css("opacity", 0).css(k, b == "pos" ? -e : e);
					if (f == "hide")
						e /= h * 2;
					f != "hide" && h--;
					if (f == "show") {
						var p = {
							opacity : 1
						};
						p[k] = (b == "pos" ? "+=" : "-=") + e;
						d.animate(p, j / 2, c.options.easing);
						e /= 2;
						h--
					}
					for (p = 0; p < h; p++) {
						var s = {}, o = {};
						s[k] = (b == "pos" ? "-=" : "+=") + e;
						o[k] = (b == "pos" ? "+=" : "-=") + e;
						d.animate(s, j / 2, c.options.easing).animate(o, j / 2,
								c.options.easing);
						e = f == "hide" ? e * 2 : e / 2
					}
					if (f == "hide") {
						p = {
							opacity : 0
						};
						p[k] = (b == "pos" ? "-=" : "+=") + e;
						d.animate(p, j / 2, c.options.easing, function() {
							d.hide();
							a.effects.restore(d, g);
							a.effects.removeWrapper(d);
							c.callback && c.callback.apply(this, arguments)
						})
					} else {
						s = {};
						o = {};
						s[k] = (b == "pos" ? "-=" : "+=") + e;
						o[k] = (b == "pos" ? "+=" : "-=") + e;
						d.animate(s, j / 2, c.options.easing).animate(
								o,
								j / 2,
								c.options.easing,
								function() {
									a.effects.restore(d, g);
									a.effects.removeWrapper(d);
									c.callback
											&& c.callback
													.apply(this, arguments)
								})
					}
					d.queue("fx", function() {
						d.dequeue()
					});
					d.dequeue()
				})
	}
})(jQuery);
(function(a) {
	a.effects.clip = function(c) {
		return this.queue(function() {
			var d = a(this), g = [ "position", "top", "bottom", "left",
					"right", "height", "width" ], f = a.effects.setMode(d,
					c.options.mode || "hide"), b = c.options.direction
					|| "vertical";
			a.effects.save(d, g);
			d.show();
			var e = a.effects.createWrapper(d).css({
				overflow : "hidden"
			});
			e = d[0].tagName == "IMG" ? e : d;
			var h = {
				size : b == "vertical" ? "height" : "width",
				position : b == "vertical" ? "top" : "left"
			};
			b = b == "vertical" ? e.height() : e.width();
			if (f == "show") {
				e.css(h.size, 0);
				e.css(h.position, b / 2)
			}
			var j = {};
			j[h.size] = f == "show" ? b : 0;
			j[h.position] = f == "show" ? 0 : b / 2;
			e.animate(j, {
				queue : false,
				duration : c.duration,
				easing : c.options.easing,
				complete : function() {
					f == "hide" && d.hide();
					a.effects.restore(d, g);
					a.effects.removeWrapper(d);
					c.callback && c.callback.apply(d[0], arguments);
					d.dequeue()
				}
			})
		})
	}
})(jQuery);
(function(a) {
	a.effects.drop = function(c) {
		return this.queue(function() {
			var d = a(this), g = [ "position", "top", "bottom", "left",
					"right", "opacity" ], f = a.effects.setMode(d,
					c.options.mode || "hide"), b = c.options.direction
					|| "left";
			a.effects.save(d, g);
			d.show();
			a.effects.createWrapper(d);
			var e = b == "up" || b == "down" ? "top" : "left";
			b = b == "up" || b == "left" ? "pos" : "neg";
			var h = c.options.distance || (e == "top" ? d.outerHeight({
				margin : true
			}) / 2 : d.outerWidth({
				margin : true
			}) / 2);
			if (f == "show")
				d.css("opacity", 0).css(e, b == "pos" ? -h : h);
			var j = {
				opacity : f == "show" ? 1 : 0
			};
			j[e] = (f == "show" ? b == "pos" ? "+=" : "-=" : b == "pos" ? "-="
					: "+=")
					+ h;
			d.animate(j, {
				queue : false,
				duration : c.duration,
				easing : c.options.easing,
				complete : function() {
					f == "hide" && d.hide();
					a.effects.restore(d, g);
					a.effects.removeWrapper(d);
					c.callback && c.callback.apply(this, arguments);
					d.dequeue()
				}
			})
		})
	}
})(jQuery);
(function(a) {
	a.effects.explode = function(c) {
		return this
				.queue(function() {
					var d = c.options.pieces ? Math.round(Math
							.sqrt(c.options.pieces)) : 3, g = c.options.pieces ? Math
							.round(Math.sqrt(c.options.pieces))
							: 3;
					c.options.mode = c.options.mode == "toggle" ? a(this).is(
							":visible") ? "hide" : "show" : c.options.mode;
					var f = a(this).show().css("visibility", "hidden"), b = f
							.offset();
					b.top -= parseInt(f.css("marginTop"), 10) || 0;
					b.left -= parseInt(f.css("marginLeft"), 10) || 0;
					for ( var e = f.outerWidth(true), h = f.outerHeight(true), j = 0; j < d; j++)
						for ( var k = 0; k < g; k++)
							f
									.clone()
									.appendTo("body")
									.wrap("<div></div>")
									.css({
										position : "absolute",
										visibility : "visible",
										left : -k * (e / g),
										top : -j * (h / d)
									})
									.parent()
									.addClass("ui-effects-explode")
									.css(
											{
												position : "absolute",
												overflow : "hidden",
												width : e / g,
												height : h / d,
												left : b.left
														+ k
														* (e / g)
														+ (c.options.mode == "show" ? (k - Math
																.floor(g / 2))
																* (e / g)
																: 0),
												top : b.top
														+ j
														* (h / d)
														+ (c.options.mode == "show" ? (j - Math
																.floor(d / 2))
																* (h / d)
																: 0),
												opacity : c.options.mode == "show" ? 0
														: 1
											})
									.animate(
											{
												left : b.left
														+ k
														* (e / g)
														+ (c.options.mode == "show" ? 0
																: (k - Math
																		.floor(g / 2))
																		* (e / g)),
												top : b.top
														+ j
														* (h / d)
														+ (c.options.mode == "show" ? 0
																: (j - Math
																		.floor(d / 2))
																		* (h / d)),
												opacity : c.options.mode == "show" ? 1
														: 0
											}, c.duration || 500);
					setTimeout(function() {
						c.options.mode == "show" ? f.css({
							visibility : "visible"
						}) : f.css({
							visibility : "visible"
						}).hide();
						c.callback && c.callback.apply(f[0]);
						f.dequeue();
						a("div.ui-effects-explode").remove()
					}, c.duration || 500)
				})
	}
})(jQuery);
(function(a) {
	a.effects.fade = function(c) {
		return this
				.queue(function() {
					var d = a(this), g = a.effects.setMode(d, c.options.mode
							|| "hide");
					d.animate({
						opacity : g
					}, {
						queue : false,
						duration : c.duration,
						easing : c.options.easing,
						complete : function() {
							c.callback && c.callback.apply(this, arguments);
							d.dequeue()
						}
					})
				})
	}
})(jQuery);
(function(a) {
	a.effects.fold = function(c) {
		return this
				.queue(function() {
					var d = a(this), g = [ "position", "top", "bottom", "left",
							"right" ], f = a.effects.setMode(d, c.options.mode
							|| "hide"), b = c.options.size || 15, e = !!c.options.horizFirst, h = c.duration ? c.duration / 2
							: a.fx.speeds._default / 2;
					a.effects.save(d, g);
					d.show();
					var j = a.effects.createWrapper(d).css({
						overflow : "hidden"
					}), k = f == "show" != e, p = k ? [ "width", "height" ] : [
							"height", "width" ];
					k = k ? [ j.width(), j.height() ]
							: [ j.height(), j.width() ];
					var s = /([0-9]+)%/.exec(b);
					if (s)
						b = parseInt(s[1], 10) / 100 * k[f == "hide" ? 0 : 1];
					if (f == "show")
						j.css(e ? {
							height : 0,
							width : b
						} : {
							height : b,
							width : 0
						});
					e = {};
					s = {};
					e[p[0]] = f == "show" ? k[0] : b;
					s[p[1]] = f == "show" ? k[1] : 0;
					j.animate(e, h, c.options.easing)
							.animate(
									s,
									h,
									c.options.easing,
									function() {
										f == "hide" && d.hide();
										a.effects.restore(d, g);
										a.effects.removeWrapper(d);
										c.callback
												&& c.callback.apply(d[0],
														arguments);
										d.dequeue()
									})
				})
	}
})(jQuery);
(function(a) {
	a.effects.highlight = function(c) {
		return this.queue(function() {
			var d = a(this), g = [ "backgroundImage", "backgroundColor",
					"opacity" ], f = a.effects.setMode(d, c.options.mode
					|| "show"), b = {
				backgroundColor : d.css("backgroundColor")
			};
			if (f == "hide")
				b.opacity = 0;
			a.effects.save(d, g);
			d.show().css({
				backgroundImage : "none",
				backgroundColor : c.options.color || "#ffff99"
			}).animate(
					b,
					{
						queue : false,
						duration : c.duration,
						easing : c.options.easing,
						complete : function() {
							f == "hide" && d.hide();
							a.effects.restore(d, g);
							f == "show" && !a.support.opacity
									&& this.style.removeAttribute("filter");
							c.callback && c.callback.apply(this, arguments);
							d.dequeue()
						}
					})
		})
	}
})(jQuery);
(function(a) {
	a.effects.pulsate = function(c) {
		return this
				.queue(function() {
					var d = a(this), g = a.effects.setMode(d, c.options.mode
							|| "show");
					times = (c.options.times || 5) * 2 - 1;
					duration = c.duration ? c.duration / 2
							: a.fx.speeds._default / 2;
					isVisible = d.is(":visible");
					animateTo = 0;
					if (!isVisible) {
						d.css("opacity", 0).show();
						animateTo = 1
					}
					if (g == "hide" && isVisible || g == "show" && !isVisible)
						times--;
					for (g = 0; g < times; g++) {
						d.animate({
							opacity : animateTo
						}, duration, c.options.easing);
						animateTo = (animateTo + 1) % 2
					}
					d.animate({
						opacity : animateTo
					}, duration, c.options.easing, function() {
						animateTo == 0 && d.hide();
						c.callback && c.callback.apply(this, arguments)
					});
					d.queue("fx", function() {
						d.dequeue()
					}).dequeue()
				})
	}
})(jQuery);
(function(a) {
	a.effects.puff = function(c) {
		return this
				.queue(function() {
					var d = a(this), g = a.effects.setMode(d, c.options.mode
							|| "hide"), f = parseInt(c.options.percent, 10) || 150, b = f / 100, e = {
						height : d.height(),
						width : d.width()
					};
					a.extend(c.options, {
						fade : true,
						mode : g,
						percent : g == "hide" ? f : 100,
						from : g == "hide" ? e : {
							height : e.height * b,
							width : e.width * b
						}
					});
					d.effect("scale", c.options, c.duration, c.callback);
					d.dequeue()
				})
	};
	a.effects.scale = function(c) {
		return this.queue(function() {
			var d = a(this), g = a.extend(true, {}, c.options), f = a.effects
					.setMode(d, c.options.mode || "effect"), b = parseInt(
					c.options.percent, 10)
					|| (parseInt(c.options.percent, 10) == 0 ? 0
							: f == "hide" ? 0 : 100), e = c.options.direction
					|| "both", h = c.options.origin;
			if (f != "effect") {
				g.origin = h || [ "middle", "center" ];
				g.restore = true
			}
			h = {
				height : d.height(),
				width : d.width()
			};
			d.from = c.options.from || (f == "show" ? {
				height : 0,
				width : 0
			} : h);
			b = {
				y : e != "horizontal" ? b / 100 : 1,
				x : e != "vertical" ? b / 100 : 1
			};
			d.to = {
				height : h.height * b.y,
				width : h.width * b.x
			};
			if (c.options.fade) {
				if (f == "show") {
					d.from.opacity = 0;
					d.to.opacity = 1
				}
				if (f == "hide") {
					d.from.opacity = 1;
					d.to.opacity = 0
				}
			}
			g.from = d.from;
			g.to = d.to;
			g.mode = f;
			d.effect("size", g, c.duration, c.callback);
			d.dequeue()
		})
	};
	a.effects.size = function(c) {
		return this
				.queue(function() {
					var d = a(this), g = [ "position", "top", "bottom", "left",
							"right", "width", "height", "overflow", "opacity" ], f = [
							"position", "top", "bottom", "left", "right",
							"overflow", "opacity" ], b = [ "width", "height",
							"overflow" ], e = [ "fontSize" ], h = [
							"borderTopWidth", "borderBottomWidth",
							"paddingTop", "paddingBottom" ], j = [
							"borderLeftWidth", "borderRightWidth",
							"paddingLeft", "paddingRight" ], k = a.effects
							.setMode(d, c.options.mode || "effect"), p = c.options.restore || false, s = c.options.scale
							|| "both", o = c.options.origin, l = {
						height : d.height(),
						width : d.width()
					};
					d.from = c.options.from || l;
					d.to = c.options.to || l;
					if (o) {
						o = a.effects.getBaseline(o, l);
						d.from.top = (l.height - d.from.height) * o.y;
						d.from.left = (l.width - d.from.width) * o.x;
						d.to.top = (l.height - d.to.height) * o.y;
						d.to.left = (l.width - d.to.width) * o.x
					}
					var q = {
						from : {
							y : d.from.height / l.height,
							x : d.from.width / l.width
						},
						to : {
							y : d.to.height / l.height,
							x : d.to.width / l.width
						}
					};
					if (s == "box" || s == "both") {
						if (q.from.y != q.to.y) {
							g = g.concat(h);
							d.from = a.effects.setTransition(d, h, q.from.y,
									d.from);
							d.to = a.effects.setTransition(d, h, q.to.y, d.to)
						}
						if (q.from.x != q.to.x) {
							g = g.concat(j);
							d.from = a.effects.setTransition(d, j, q.from.x,
									d.from);
							d.to = a.effects.setTransition(d, j, q.to.x, d.to)
						}
					}
					if (s == "content" || s == "both")
						if (q.from.y != q.to.y) {
							g = g.concat(e);
							d.from = a.effects.setTransition(d, e, q.from.y,
									d.from);
							d.to = a.effects.setTransition(d, e, q.to.y, d.to)
						}
					a.effects.save(d, p ? g : f);
					d.show();
					a.effects.createWrapper(d);
					d.css("overflow", "hidden").css(d.from);
					if (s == "content" || s == "both") {
						h = h.concat([ "marginTop", "marginBottom" ]).concat(e);
						j = j.concat([ "marginLeft", "marginRight" ]);
						b = g.concat(h).concat(j);
						d
								.find("*[width]")
								.each(
										function() {
											child = a(this);
											p && a.effects.save(child, b);
											var u = {
												height : child.height(),
												width : child.width()
											};
											child.from = {
												height : u.height * q.from.y,
												width : u.width * q.from.x
											};
											child.to = {
												height : u.height * q.to.y,
												width : u.width * q.to.x
											};
											if (q.from.y != q.to.y) {
												child.from = a.effects
														.setTransition(child,
																h, q.from.y,
																child.from);
												child.to = a.effects
														.setTransition(child,
																h, q.to.y,
																child.to)
											}
											if (q.from.x != q.to.x) {
												child.from = a.effects
														.setTransition(child,
																j, q.from.x,
																child.from);
												child.to = a.effects
														.setTransition(child,
																j, q.to.x,
																child.to)
											}
											child.css(child.from);
											child
													.animate(
															child.to,
															c.duration,
															c.options.easing,
															function() {
																p
																		&& a.effects
																				.restore(
																						child,
																						b)
															})
										})
					}
					d.animate(d.to, {
						queue : false,
						duration : c.duration,
						easing : c.options.easing,
						complete : function() {
							d.to.opacity === 0
									&& d.css("opacity", d.from.opacity);
							k == "hide" && d.hide();
							a.effects.restore(d, p ? g : f);
							a.effects.removeWrapper(d);
							c.callback && c.callback.apply(this, arguments);
							d.dequeue()
						}
					})
				})
	}
})(jQuery);
(function(a) {
	a.effects.shake = function(c) {
		return this
				.queue(function() {
					var d = a(this), g = [ "position", "top", "bottom", "left",
							"right" ];
					a.effects.setMode(d, c.options.mode || "effect");
					var f = c.options.direction || "left", b = c.options.distance || 20, e = c.options.times || 3, h = c.duration
							|| c.options.duration || 140;
					a.effects.save(d, g);
					d.show();
					a.effects.createWrapper(d);
					var j = f == "up" || f == "down" ? "top" : "left", k = f == "up"
							|| f == "left" ? "pos" : "neg";
					f = {};
					var p = {}, s = {};
					f[j] = (k == "pos" ? "-=" : "+=") + b;
					p[j] = (k == "pos" ? "+=" : "-=") + b * 2;
					s[j] = (k == "pos" ? "-=" : "+=") + b * 2;
					d.animate(f, h, c.options.easing);
					for (b = 1; b < e; b++)
						d.animate(p, h, c.options.easing).animate(s, h,
								c.options.easing);
					d.animate(p, h, c.options.easing).animate(f, h / 2,
							c.options.easing, function() {
								a.effects.restore(d, g);
								a.effects.removeWrapper(d);
								c.callback && c.callback.apply(this, arguments)
							});
					d.queue("fx", function() {
						d.dequeue()
					});
					d.dequeue()
				})
	}
})(jQuery);
(function(a) {
	a.effects.slide = function(c) {
		return this
				.queue(function() {
					var d = a(this), g = [ "position", "top", "bottom", "left",
							"right" ], f = a.effects.setMode(d, c.options.mode
							|| "show"), b = c.options.direction || "left";
					a.effects.save(d, g);
					d.show();
					a.effects.createWrapper(d).css({
						overflow : "hidden"
					});
					var e = b == "up" || b == "down" ? "top" : "left";
					b = b == "up" || b == "left" ? "pos" : "neg";
					var h = c.options.distance || (e == "top" ? d.outerHeight({
						margin : true
					}) : d.outerWidth({
						margin : true
					}));
					if (f == "show")
						d.css(e, b == "pos" ? isNaN(h) ? "-" + h : -h : h);
					var j = {};
					j[e] = (f == "show" ? b == "pos" ? "+=" : "-="
							: b == "pos" ? "-=" : "+=")
							+ h;
					d.animate(j, {
						queue : false,
						duration : c.duration,
						easing : c.options.easing,
						complete : function() {
							f == "hide" && d.hide();
							a.effects.restore(d, g);
							a.effects.removeWrapper(d);
							c.callback && c.callback.apply(this, arguments);
							d.dequeue()
						}
					})
				})
	}
})(jQuery);
(function(a) {
	a.effects.transfer = function(c) {
		return this.queue(function() {
			var d = a(this), g = a(c.options.to), f = g.offset();
			g = {
				top : f.top,
				left : f.left,
				height : g.innerHeight(),
				width : g.innerWidth()
			};
			f = d.offset();
			var b = a('<div class="ui-effects-transfer"></div>').appendTo(
					document.body).addClass(c.options.className).css({
				top : f.top,
				left : f.left,
				height : d.innerHeight(),
				width : d.innerWidth(),
				position : "absolute"
			}).animate(g, c.duration, c.options.easing, function() {
				b.remove();
				c.callback && c.callback.apply(d[0], arguments);
				d.dequeue()
			})
		})
	}
})(jQuery);
(function(a) {
	function c() {
		if (a.fn.ajaxSubmit.debug) {
			var d = "[jquery.form] " + Array.prototype.join.call(arguments, "");
			if (window.console && window.console.log)
				window.console.log(d);
			else
				window.opera && window.opera.postError
						&& window.opera.postError(d)
		}
	}
	a.fn.ajaxSubmit = function(d) {
		function g(l) {
			function q(I) {
				return I.contentWindow ? I.contentWindow.document
						: I.contentDocument ? I.contentDocument : I.document
			}
			function u() {
				function I() {
					try {
						var S = q(D).readyState;
						c("state = " + S);
						S.toLowerCase() == "uninitialized" && setTimeout(I, 50)
					} catch (T) {
						c("Server abort: ", T, " (", T.name, ")");
						v(P);
						L && clearTimeout(L);
						L = undefined
					}
				}
				var J = e.attr("target"), N = e.attr("action");
				z.setAttribute("target", y);
				f || z.setAttribute("method", "POST");
				N != n.url && z.setAttribute("action", n.url);
				if (!n.skipEncodingOverride && (!f || /post/i.test(f)))
					e.attr({
						encoding : "multipart/form-data",
						enctype : "multipart/form-data"
					});
				if (n.timeout)
					L = setTimeout(function() {
						K = true;
						v(M)
					}, n.timeout);
				var O = [];
				try {
					if (n.extraData)
						for ( var Q in n.extraData)
							O
									.push(a(
											'<input type="hidden" name="' + Q
													+ '" />').attr("value",
											n.extraData[Q]).appendTo(z)[0]);
					if (!n.iframeTarget) {
						A.appendTo("body");
						D.attachEvent ? D.attachEvent("onload", v) : D
								.addEventListener("load", v, false)
					}
					setTimeout(I, 15);
					z.submit()
				} finally {
					z.setAttribute("action", N);
					J ? z.setAttribute("target", J) : e.removeAttr("target");
					a(O).remove()
				}
			}
			function v(I) {
				if (!(E.aborted || x)) {
					try {
						r = q(D)
					} catch (J) {
						c("cannot access response document: ", J);
						I = P
					}
					if (I === M && E)
						E.abort("timeout");
					else if (I == P && E)
						E.abort("server abort");
					else {
						if (!r || r.location.href == n.iframeSrc)
							if (!K)
								return;
						D.detachEvent ? D.detachEvent("onload", v) : D
								.removeEventListener("load", v, false);
						I = "success";
						var N;
						try {
							if (K)
								throw "timeout";
							var O = n.dataType == "xml" || r.XMLDocument
									|| a.isXMLDoc(r);
							c("isXml=" + O);
							if (!O
									&& window.opera
									&& (r.body == null || r.body.innerHTML == ""))
								if (--w) {
									c("requeing onLoad callback, DOM not available");
									setTimeout(v, 250);
									return
								}
							var Q = r.body ? r.body : r.documentElement;
							E.responseText = Q ? Q.innerHTML : null;
							E.responseXML = r.XMLDocument ? r.XMLDocument : r;
							if (O)
								n.dataType = "xml";
							E.getResponseHeader = function(Y) {
								return {
									"content-type" : n.dataType
								}[Y]
							};
							if (Q) {
								E.status = Number(Q.getAttribute("status"))
										|| E.status;
								E.statusText = Q.getAttribute("statusText")
										|| E.statusText
							}
							var S = (n.dataType || "").toLowerCase(), T = /(json|script|text)/
									.test(S);
							if (T || n.textarea) {
								var U = r.getElementsByTagName("textarea")[0];
								if (U) {
									E.responseText = U.value;
									E.status = Number(U.getAttribute("status"))
											|| E.status;
									E.statusText = U.getAttribute("statusText")
											|| E.statusText
								} else if (T) {
									var V = r.getElementsByTagName("pre")[0], W = r
											.getElementsByTagName("body")[0];
									if (V)
										E.responseText = V.textContent ? V.textContent
												: V.innerText;
									else if (W)
										E.responseText = W.textContent ? W.textContent
												: W.innerText
								}
							} else if (S == "xml" && !E.responseXML
									&& E.responseText != null)
								E.responseXML = C(E.responseText);
							try {
								R = H(E, S, n)
							} catch (Z) {
								I = "parsererror";
								E.error = N = Z || I
							}
						} catch (X) {
							c("error caught: ", X);
							I = "error";
							E.error = N = X || I
						}
						if (E.aborted) {
							c("upload aborted");
							I = null
						}
						if (E.status)
							I = E.status >= 200 && E.status < 300
									|| E.status === 304 ? "success" : "error";
						if (I === "success") {
							n.success
									&& n.success.call(n.context, R, "success",
											E);
							m && a.event.trigger("ajaxSuccess", [ E, n ])
						} else if (I) {
							if (N == undefined)
								N = E.statusText;
							n.error && n.error.call(n.context, E, I, N);
							m && a.event.trigger("ajaxError", [ E, n, N ])
						}
						m && a.event.trigger("ajaxComplete", [ E, n ]);
						m && !--a.active && a.event.trigger("ajaxStop");
						n.complete && n.complete.call(n.context, E, I);
						x = true;
						n.timeout && clearTimeout(L);
						setTimeout(function() {
							n.iframeTarget || A.remove();
							E.responseXML = null
						}, 100)
					}
				}
			}
			var z = e[0], B, F, n, m, y, A, D, E, K, L;
			B = !!a.fn.prop;
			if (l)
				if (B)
					for (F = 0; F < l.length; F++) {
						B = a(z[l[F].name]);
						B.prop("disabled", false)
					}
				else
					for (F = 0; F < l.length; F++) {
						B = a(z[l[F].name]);
						B.removeAttr("disabled")
					}
			if (a(":input[name=submit],:input[id=submit]", z).length)
				alert('Error: Form elements must not have name or id of "submit".');
			else {
				n = a.extend(true, {}, a.ajaxSettings, d);
				n.context = n.context || n;
				y = "jqFormIO" + (new Date).getTime();
				if (n.iframeTarget) {
					A = a(n.iframeTarget);
					B = A.attr("name");
					if (B == null)
						A.attr("name", y);
					else
						y = B
				} else {
					A = a('<iframe name="' + y + '" src="' + n.iframeSrc
							+ '" />');
					A.css({
						position : "absolute",
						top : "-1000px",
						left : "-1000px"
					})
				}
				D = A[0];
				E = {
					aborted : 0,
					responseText : null,
					responseXML : null,
					status : 0,
					statusText : "n/a",
					getAllResponseHeaders : function() {
					},
					getResponseHeader : function() {
					},
					setRequestHeader : function() {
					},
					abort : function(I) {
						var J = I === "timeout" ? "timeout" : "aborted";
						c("aborting upload... " + J);
						this.aborted = 1;
						A.attr("src", n.iframeSrc);
						E.error = J;
						n.error && n.error.call(n.context, E, J, I);
						m && a.event.trigger("ajaxError", [ E, n, J ]);
						n.complete && n.complete.call(n.context, E, J)
					}
				};
				(m = n.global) && !a.active++ && a.event.trigger("ajaxStart");
				m && a.event.trigger("ajaxSend", [ E, n ]);
				if (n.beforeSend
						&& n.beforeSend.call(n.context, E, n) === false)
					n.global && a.active--;
				else if (!E.aborted) {
					if (l = z.clk)
						if ((B = l.name) && !l.disabled) {
							n.extraData = n.extraData || {};
							n.extraData[B] = l.value;
							if (l.type == "image") {
								n.extraData[B + ".x"] = z.clk_x;
								n.extraData[B + ".y"] = z.clk_y
							}
						}
					var M = 1, P = 2;
					n.forceSync ? u() : setTimeout(u, 10);
					var R, r, w = 50, x, C = a.parseXML
							|| function(I, J) {
								if (window.ActiveXObject) {
									J = new ActiveXObject("Microsoft.XMLDOM");
									J.async = "false";
									J.loadXML(I)
								} else
									J = (new DOMParser).parseFromString(I,
											"text/xml");
								return J
										&& J.documentElement
										&& J.documentElement.nodeName != "parsererror" ? J
										: null
							}, G = a.parseJSON || function(I) {
						return window.eval("(" + I + ")")
					}, H = function(I, J, N) {
						var O = I.getResponseHeader("content-type") || "", Q = J === "xml"
								|| !J && O.indexOf("xml") >= 0;
						I = Q ? I.responseXML : I.responseText;
						Q && I.documentElement.nodeName === "parsererror"
								&& a.error && a.error("parsererror");
						if (N && N.dataFilter)
							I = N.dataFilter(I, J);
						if (typeof I === "string")
							if (J === "json" || !J && O.indexOf("json") >= 0)
								I = G(I);
							else if (J === "script" || !J
									&& O.indexOf("javascript") >= 0)
								a.globalEval(I);
						return I
					}
				}
			}
		}
		if (!this.length) {
			c("ajaxSubmit: skipping submit process - no element selected");
			return this
		}
		var f, b, e = this;
		if (typeof d == "function")
			d = {
				success : d
			};
		f = this.attr("method");
		b = this.attr("action");
		if (b = (b = typeof b === "string" ? a.trim(b) : "")
				|| window.location.href || "")
			b = (b.match(/^([^#]+)/) || [])[1];
		d = a
				.extend(true,
						{
							url : b,
							success : a.ajaxSettings.success,
							type : f || "GET",
							iframeSrc : /^https/i.test(window.location.href
									|| "") ? "javascript:false" : "about:blank"
						}, d);
		b = {};
		this.trigger("form-pre-serialize", [ this, d, b ]);
		if (b.veto) {
			c("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
			return this
		}
		if (d.beforeSerialize && d.beforeSerialize(this, d) === false) {
			c("ajaxSubmit: submit aborted via beforeSerialize callback");
			return this
		}
		var h, j, k = this.formToArray(d.semantic);
		if (d.data) {
			d.extraData = d.data;
			for (h in d.data)
				if (a.isArray(d.data[h]))
					for ( var p in d.data[h])
						k.push({
							name : h,
							value : d.data[h][p]
						});
				else {
					j = d.data[h];
					j = a.isFunction(j) ? j() : j;
					k.push({
						name : h,
						value : j
					})
				}
		}
		if (d.beforeSubmit && d.beforeSubmit(k, this, d) === false) {
			c("ajaxSubmit: submit aborted via beforeSubmit callback");
			return this
		}
		this.trigger("form-submit-validate", [ k, this, d, b ]);
		if (b.veto) {
			c("ajaxSubmit: submit vetoed via form-submit-validate trigger");
			return this
		}
		h = a.param(k);
		if (d.type.toUpperCase() == "GET") {
			d.url += (d.url.indexOf("?") >= 0 ? "&" : "?") + h;
			d.data = null
		} else
			d.data = h;
		var s = [];
		d.resetForm && s.push(function() {
			e.resetForm()
		});
		d.clearForm && s.push(function() {
			e.clearForm()
		});
		if (!d.dataType && d.target) {
			var o = d.success || function() {
			};
			s.push(function(l) {
				var q = d.replaceTarget ? "replaceWith" : "html";
				a(d.target)[q](l).each(o, arguments)
			})
		} else
			d.success && s.push(d.success);
		d.success = function(l, q, u) {
			for ( var v = d.context || d, z = 0, B = s.length; z < B; z++)
				s[z].apply(v, [ l, q, u || e, e ])
		};
		h = a("input:file", this).length > 0;
		p = e.attr("enctype") == "multipart/form-data"
				|| e.attr("encoding") == "multipart/form-data";
		if (d.iframe !== false && (h || d.iframe || p))
			d.closeKeepAlive ? a.get(d.closeKeepAlive, function() {
				g(k)
			}) : g(k);
		else {
			if (a.browser.msie && f == "get" && typeof d.type === "undefined") {
				h = e[0].getAttribute("method");
				if (typeof h === "string")
					d.type = h
			}
			a.ajax(d)
		}
		this.trigger("form-submit-notify", [ this, d ]);
		return this
	};
	a.fn.ajaxForm = function(d) {
		if (this.length === 0) {
			var g = {
				s : this.selector,
				c : this.context
			};
			if (!a.isReady && g.s) {
				c("DOM not ready, queuing ajaxForm");
				a(function() {
					a(g.s, g.c).ajaxForm(d)
				});
				return this
			}
			c("terminating; zero elements found by selector"
					+ (a.isReady ? "" : " (DOM not ready)"));
			return this
		}
		return this.ajaxFormUnbind().bind("submit.form-plugin", function(f) {
			if (!f.isDefaultPrevented()) {
				f.preventDefault();
				a(this).ajaxSubmit(d)
			}
		}).bind("click.form-plugin", function(f) {
			var b = f.target, e = a(b);
			if (!e.is(":submit,input:image")) {
				b = e.closest(":submit");
				if (b.length == 0)
					return;
				b = b[0]
			}
			var h = this;
			h.clk = b;
			if (b.type == "image")
				if (f.offsetX != undefined) {
					h.clk_x = f.offsetX;
					h.clk_y = f.offsetY
				} else if (typeof a.fn.offset == "function") {
					e = e.offset();
					h.clk_x = f.pageX - e.left;
					h.clk_y = f.pageY - e.top
				} else {
					h.clk_x = f.pageX - b.offsetLeft;
					h.clk_y = f.pageY - b.offsetTop
				}
			setTimeout(function() {
				h.clk = h.clk_x = h.clk_y = null
			}, 100)
		})
	};
	a.fn.ajaxFormUnbind = function() {
		return this.unbind("submit.form-plugin click.form-plugin")
	};
	a.fn.formToArray = function(d) {
		var g = [];
		if (this.length === 0)
			return g;
		var f = this[0], b = d ? f.getElementsByTagName("*") : f.elements;
		if (!b)
			return g;
		var e, h, j, k, p, s;
		e = 0;
		for (p = b.length; e < p; e++) {
			h = b[e];
			if (j = h.name)
				if (d && f.clk && h.type == "image") {
					if (!h.disabled && f.clk == h) {
						g.push({
							name : j,
							value : a(h).val()
						});
						g.push({
							name : j + ".x",
							value : f.clk_x
						}, {
							name : j + ".y",
							value : f.clk_y
						})
					}
				} else if ((k = a.fieldValue(h, true))
						&& k.constructor == Array) {
					h = 0;
					for (s = k.length; h < s; h++)
						g.push({
							name : j,
							value : k[h]
						})
				} else
					k !== null && typeof k != "undefined" && g.push({
						name : j,
						value : k
					})
		}
		if (!d && f.clk) {
			d = a(f.clk);
			b = d[0];
			if ((j = b.name) && !b.disabled && b.type == "image") {
				g.push({
					name : j,
					value : d.val()
				});
				g.push({
					name : j + ".x",
					value : f.clk_x
				}, {
					name : j + ".y",
					value : f.clk_y
				})
			}
		}
		return g
	};
	a.fn.formSerialize = function(d) {
		return a.param(this.formToArray(d))
	};
	a.fn.fieldSerialize = function(d) {
		var g = [];
		this.each(function() {
			var f = this.name;
			if (f) {
				var b = a.fieldValue(this, d);
				if (b && b.constructor == Array)
					for ( var e = 0, h = b.length; e < h; e++)
						g.push({
							name : f,
							value : b[e]
						});
				else
					b !== null && typeof b != "undefined" && g.push({
						name : this.name,
						value : b
					})
			}
		});
		return a.param(g)
	};
	a.fn.fieldValue = function(d) {
		for ( var g = [], f = 0, b = this.length; f < b; f++) {
			var e = a.fieldValue(this[f], d);
			e === null || typeof e == "undefined" || e.constructor == Array
					&& !e.length
					|| (e.constructor == Array ? a.merge(g, e) : g.push(e))
		}
		return g
	};
	a.fieldValue = function(d, g) {
		var f = d.name, b = d.type, e = d.tagName.toLowerCase();
		if (g === undefined)
			g = true;
		if (g
				&& (!f || d.disabled || b == "reset" || b == "button"
						|| (b == "checkbox" || b == "radio") && !d.checked
						|| (b == "submit" || b == "image") && d.form
						&& d.form.clk != d || e == "select"
						&& d.selectedIndex == -1))
			return null;
		if (e == "select") {
			e = d.selectedIndex;
			if (e < 0)
				return null;
			g = [];
			d = d.options;
			f = (b = b == "select-one") ? e + 1 : d.length;
			for (e = b ? e : 0; e < f; e++) {
				var h = d[e];
				if (h.selected) {
					var j = h.value;
					j
							|| (j = h.attributes && h.attributes.value
									&& !h.attributes.value.specified ? h.text
									: h.value);
					if (b)
						return j;
					g.push(j)
				}
			}
			return g
		}
		return a(d).val()
	};
	a.fn.clearForm = function() {
		return this.each(function() {
			a("input,select,textarea", this).clearFields()
		})
	};
	a.fn.clearFields = a.fn.clearInputs = function() {
		var d = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
		return this.each(function() {
			var g = this.type, f = this.tagName.toLowerCase();
			if (d.test(g) || f == "textarea")
				this.value = "";
			else if (g == "checkbox" || g == "radio")
				this.checked = false;
			else if (f == "select")
				this.selectedIndex = -1
		})
	};
	a.fn.resetForm = function() {
		return this.each(function() {
			if (typeof this.reset == "function"
					|| typeof this.reset == "object" && !this.reset.nodeType)
				this.reset()
		})
	};
	a.fn.enable = function(d) {
		if (d === undefined)
			d = true;
		return this.each(function() {
			this.disabled = !d
		})
	};
	a.fn.selected = function(d) {
		if (d === undefined)
			d = true;
		return this.each(function() {
			var g = this.type;
			if (g == "checkbox" || g == "radio")
				this.checked = d;
			else if (this.tagName.toLowerCase() == "option") {
				g = a(this).parent("select");
				d && g[0] && g[0].type == "select-one"
						&& g.find("option").selected(false);
				this.selected = d
			}
		})
	};
	a.fn.ajaxSubmit.debug = false
})(jQuery);
eval(function(a, c, d, g, f, b) {
	f = function(e) {
		return (e < c ? "" : f(parseInt(e / c)))
				+ ((e %= c) > 35 ? String.fromCharCode(e + 29) : e.toString(36))
	};
	if (!"".replace(/^/, String)) {
		for (; d--;)
			b[f(d)] = g[d] || f(d);
		g = [ function(e) {
			return b[e]
		} ];
		f = function() {
			return "\\w+"
		};
		d = 1
	}
	for (; d--;)
		if (g[d])
			a = a.replace(new RegExp("\\b" + f(d) + "\\b", "g"), g[d]);
	return a
}
		(
				"(9($){$.1s.A=9(o){z 4.14(9(){2H r(4,o)})};8 q={W:F,23:1,1G:1,u:7,15:3,16:7,1H:'2I',24:'2J',1i:0,B:7,1j:7,1I:7,25:7,26:7,27:7,28:7,29:7,2a:7,2b:7,1J:'<N></N>',1K:'<N></N>',2c:'2d',2e:'2d',1L:7,1M:7};$.A=9(e,o){4.5=$.17({},q,o||{});4.Q=F;4.D=7;4.H=7;4.t=7;4.R=7;4.S=7;4.O=!4.5.W?'1N':'2f';4.E=!4.5.W?'2g':'2h';8 a='',1d=e.J.1d(' ');1k(8 i=0;i<1d.K;i++){6(1d[i].2i('A-2j')!=-1){$(e).1t(1d[i]);8 a=1d[i];1l}}6(e.2k=='2K'||e.2k=='2L'){4.t=$(e);4.D=4.t.18();6(4.D.1m('A-H')){6(!4.D.18().1m('A-D'))4.D=4.D.B('<N></N>');4.D=4.D.18()}X 6(!4.D.1m('A-D'))4.D=4.t.B('<N></N>').18()}X{4.D=$(e);4.t=$(e).2M('>2l,>2m,N>2l,N>2m')}6(a!=''&&4.D.18()[0].J.2i('A-2j')==-1)4.D.B('<N 2N=\" '+a+'\"></N>');4.H=4.t.18();6(!4.H.K||!4.H.1m('A-H'))4.H=4.t.B('<N></N>').18();4.S=$('.A-11',4.D);6(4.S.u()==0&&4.5.1K!=7)4.S=4.H.1u(4.5.1K).11();4.S.V(4.J('A-11'));4.R=$('.A-19',4.D);6(4.R.u()==0&&4.5.1J!=7)4.R=4.H.1u(4.5.1J).11();4.R.V(4.J('A-19'));4.H.V(4.J('A-H'));4.t.V(4.J('A-t'));4.D.V(4.J('A-D'));8 b=4.5.16!=7?1n.1O(4.1o()/4.5.16):7;8 c=4.t.2O('1v');8 d=4;6(c.u()>0){8 f=0,i=4.5.1G;c.14(9(){d.1P(4,i++);f+=d.T(4,b)});4.t.y(4.O,f+'U');6(!o||o.u===L)4.5.u=c.u()}4.D.y('1w','1x');4.R.y('1w','1x');4.S.y('1w','1x');4.2n=9(){d.19()};4.2o=9(){d.11()};4.1Q=9(){d.2p()};6(4.5.1j!=7)4.5.1j(4,'2q');6($.2r.2s){4.1e(F,F);$(2t).1y('2P',9(){d.1z()})}X 4.1z()};8 r=$.A;r.1s=r.2Q={A:'0.2.3'};r.1s.17=r.17=$.17;r.1s.17({1z:9(){4.C=7;4.G=7;4.Y=7;4.12=7;4.1a=F;4.1f=7;4.P=7;4.Z=F;6(4.Q)z;4.t.y(4.E,4.1A(4.5.1G)+'U');8 p=4.1A(4.5.23);4.Y=4.12=7;4.1p(p,F);$(2t).1R('2u',4.1Q).1y('2u',4.1Q)},2v:9(){4.t.2w();4.t.y(4.E,'2R');4.t.y(4.O,'2S');6(4.5.1j!=7)4.5.1j(4,'2v');4.1z()},2p:9(){6(4.P!=7&&4.Z)4.t.y(4.E,r.I(4.t.y(4.E))+4.P);4.P=7;4.Z=F;6(4.5.1I!=7)4.5.1I(4);6(4.5.16!=7){8 a=4;8 b=1n.1O(4.1o()/4.5.16),O=0,E=0;$('1v',4.t).14(9(i){O+=a.T(4,b);6(i+1<a.C)E=O});4.t.y(4.O,O+'U');4.t.y(4.E,-E+'U')}4.15(4.C,F)},2T:9(){4.Q=1g;4.1e()},2U:9(){4.Q=F;4.1e()},u:9(s){6(s!=L){4.5.u=s;6(!4.Q)4.1e()}z 4.5.u},2V:9(i,a){6(a==L||!a)a=i;6(4.5.u!==7&&a>4.5.u)a=4.5.u;1k(8 j=i;j<=a;j++){8 e=4.M(j);6(!e.K||e.1m('A-1b-1B'))z F}z 1g},M:9(i){z $('.A-1b-'+i,4.t)},2x:9(i,s){8 e=4.M(i),1S=0,2x=0;6(e.K==0){8 c,e=4.1C(i),j=r.I(i);1q(c=4.M(--j)){6(j<=0||c.K){j<=0?4.t.2y(e):c.1T(e);1l}}}X 1S=4.T(e);e.1t(4.J('A-1b-1B'));1U s=='2W'?e.2X(s):e.2w().2Y(s);8 a=4.5.16!=7?1n.1O(4.1o()/4.5.16):7;8 b=4.T(e,a)-1S;6(i>0&&i<4.C)4.t.y(4.E,r.I(4.t.y(4.E))-b+'U');4.t.y(4.O,r.I(4.t.y(4.O))+b+'U');z e},1V:9(i){8 e=4.M(i);6(!e.K||(i>=4.C&&i<=4.G))z;8 d=4.T(e);6(i<4.C)4.t.y(4.E,r.I(4.t.y(4.E))+d+'U');e.1V();4.t.y(4.O,r.I(4.t.y(4.O))-d+'U')},19:9(){4.1D();6(4.P!=7&&!4.Z)4.1W(F);X 4.15(((4.5.B=='1X'||4.5.B=='G')&&4.5.u!=7&&4.G==4.5.u)?1:4.C+4.5.15)},11:9(){4.1D();6(4.P!=7&&4.Z)4.1W(1g);X 4.15(((4.5.B=='1X'||4.5.B=='C')&&4.5.u!=7&&4.C==1)?4.5.u:4.C-4.5.15)},1W:9(b){6(4.Q||4.1a||!4.P)z;8 a=r.I(4.t.y(4.E));!b?a-=4.P:a+=4.P;4.Z=!b;4.Y=4.C;4.12=4.G;4.1p(a)},15:9(i,a){6(4.Q||4.1a)z;4.1p(4.1A(i),a)},1A:9(i){6(4.Q||4.1a)z;i=r.I(i);6(4.5.B!='1c')i=i<1?1:(4.5.u&&i>4.5.u?4.5.u:i);8 a=4.C>i;8 b=r.I(4.t.y(4.E));8 f=4.5.B!='1c'&&4.C<=1?1:4.C;8 c=a?4.M(f):4.M(4.G);8 j=a?f:f-1;8 e=7,l=0,p=F,d=0;1q(a?--j>=i:++j<i){e=4.M(j);p=!e.K;6(e.K==0){e=4.1C(j).V(4.J('A-1b-1B'));c[a?'1u':'1T'](e)}c=e;d=4.T(e);6(p)l+=d;6(4.C!=7&&(4.5.B=='1c'||(j>=1&&(4.5.u==7||j<=4.5.u))))b=a?b+d:b-d}8 g=4.1o();8 h=[];8 k=0,j=i,v=0;8 c=4.M(i-1);1q(++k){e=4.M(j);p=!e.K;6(e.K==0){e=4.1C(j).V(4.J('A-1b-1B'));c.K==0?4.t.2y(e):c[a?'1u':'1T'](e)}c=e;8 d=4.T(e);6(d==0){2Z('30: 31 1N/2f 32 1k 33. 34 35 36 37 38 39. 3a...');z 0}6(4.5.B!='1c'&&4.5.u!==7&&j>4.5.u)h.3b(e);X 6(p)l+=d;v+=d;6(v>=g)1l;j++}1k(8 x=0;x<h.K;x++)h[x].1V();6(l>0){4.t.y(4.O,4.T(4.t)+l+'U');6(a){b-=l;4.t.y(4.E,r.I(4.t.y(4.E))-l+'U')}}8 n=i+k-1;6(4.5.B!='1c'&&4.5.u&&n>4.5.u)n=4.5.u;6(j>n){k=0,j=n,v=0;1q(++k){8 e=4.M(j--);6(!e.K)1l;v+=4.T(e);6(v>=g)1l}}8 o=n-k+1;6(4.5.B!='1c'&&o<1)o=1;6(4.Z&&a){b+=4.P;4.Z=F}4.P=7;6(4.5.B!='1c'&&n==4.5.u&&(n-k+1)>=1){8 m=r.10(4.M(n),!4.5.W?'1r':'1Y');6((v-m)>g)4.P=v-g-m}1q(i--\>o)b+=4.T(4.M(i));4.Y=4.C;4.12=4.G;4.C=o;4.G=n;z b},1p:9(p,a){6(4.Q||4.1a)z;4.1a=1g;8 b=4;8 c=9(){b.1a=F;6(p==0)b.t.y(b.E,0);6(b.5.B=='1X'||b.5.B=='G'||b.5.u==7||b.G<b.5.u)b.2z();b.1e();b.1Z('2A')};4.1Z('3c');6(!4.5.1H||a==F){4.t.y(4.E,p+'U');c()}X{8 o=!4.5.W?{'2g':p}:{'2h':p};4.t.1p(o,4.5.1H,4.5.24,c)}},2z:9(s){6(s!=L)4.5.1i=s;6(4.5.1i==0)z 4.1D();6(4.1f!=7)z;8 a=4;4.1f=3d(9(){a.19()},4.5.1i*3e)},1D:9(){6(4.1f==7)z;3f(4.1f);4.1f=7},1e:9(n,p){6(n==L||n==7){8 n=!4.Q&&4.5.u!==0&&((4.5.B&&4.5.B!='C')||4.5.u==7||4.G<4.5.u);6(!4.Q&&(!4.5.B||4.5.B=='C')&&4.5.u!=7&&4.G>=4.5.u)n=4.P!=7&&!4.Z}6(p==L||p==7){8 p=!4.Q&&4.5.u!==0&&((4.5.B&&4.5.B!='G')||4.C>1);6(!4.Q&&(!4.5.B||4.5.B=='G')&&4.5.u!=7&&4.C==1)p=4.P!=7&&4.Z}8 a=4;4.R[n?'1y':'1R'](4.5.2c,4.2n)[n?'1t':'V'](4.J('A-19-1E')).20('1E',n?F:1g);4.S[p?'1y':'1R'](4.5.2e,4.2o)[p?'1t':'V'](4.J('A-11-1E')).20('1E',p?F:1g);6(4.R.K>0&&(4.R[0].1h==L||4.R[0].1h!=n)&&4.5.1L!=7){4.R.14(9(){a.5.1L(a,4,n)});4.R[0].1h=n}6(4.S.K>0&&(4.S[0].1h==L||4.S[0].1h!=p)&&4.5.1M!=7){4.S.14(9(){a.5.1M(a,4,p)});4.S[0].1h=p}},1Z:9(a){8 b=4.Y==7?'2q':(4.Y<4.C?'19':'11');4.13('25',a,b);6(4.Y!==4.C){4.13('26',a,b,4.C);4.13('27',a,b,4.Y)}6(4.12!==4.G){4.13('28',a,b,4.G);4.13('29',a,b,4.12)}4.13('2a',a,b,4.C,4.G,4.Y,4.12);4.13('2b',a,b,4.Y,4.12,4.C,4.G)},13:9(a,b,c,d,e,f,g){6(4.5[a]==L||(1U 4.5[a]!='2B'&&b!='2A'))z;8 h=1U 4.5[a]=='2B'?4.5[a][b]:4.5[a];6(!$.3g(h))z;8 j=4;6(d===L)h(j,c,b);X 6(e===L)4.M(d).14(9(){h(j,4,d,c,b)});X{1k(8 i=d;i<=e;i++)6(i!==7&&!(i>=f&&i<=g))4.M(i).14(9(){h(j,4,i,c,b)})}},1C:9(i){z 4.1P('<1v></1v>',i)},1P:9(e,i){8 a=$(e).V(4.J('A-1b')).V(4.J('A-1b-'+i));a.20('3h',i);z a},J:9(c){z c+' '+c+(!4.5.W?'-3i':'-W')},T:9(e,d){8 a=e.2C!=L?e[0]:e;8 b=!4.5.W?a.1F+r.10(a,'2D')+r.10(a,'1r'):a.2E+r.10(a,'2F')+r.10(a,'1Y');6(d==L||b==d)z b;8 w=!4.5.W?d-r.10(a,'2D')-r.10(a,'1r'):d-r.10(a,'2F')-r.10(a,'1Y');$(a).y(4.O,w+'U');z 4.T(a)},1o:9(){z!4.5.W?4.H[0].1F-r.I(4.H.y('3j'))-r.I(4.H.y('3k')):4.H[0].2E-r.I(4.H.y('3l'))-r.I(4.H.y('3m'))},3n:9(i,s){6(s==L)s=4.5.u;z 1n.3o((((i-1)/s)-1n.3p((i-1)/s))*s)+1}});r.17({3q:9(d){z $.17(q,d||{})},10:9(e,p){6(!e)z 0;8 a=e.2C!=L?e[0]:e;6(p=='1r'&&$.2r.2s){8 b={'1w':'1x','3r':'3s','1N':'1i'},21,22;$.2G(a,b,9(){21=a.1F});b['1r']=0;$.2G(a,b,9(){22=a.1F});z 22-21}z r.I($.y(a,p))},I:9(v){v=3t(v);z 3u(v)?0:v}})})(3v);",
				62,
				218,
				"||||this|options|if|null|var|function||||||||||||||||||||list|size||||css|return|jcarousel|wrap|first|container|lt|false|last|clip|intval|className|length|undefined|get|div|wh|tail|locked|buttonNext|buttonPrev|dimension|px|addClass|vertical|else|prevFirst|inTail|margin|prev|prevLast|callback|each|scroll|visible|extend|parent|next|animating|item|circular|split|buttons|timer|true|jcarouselstate|auto|initCallback|for|break|hasClass|Math|clipping|animate|while|marginRight|fn|removeClass|before|li|display|block|bind|setup|pos|placeholder|create|stopAuto|disabled|offsetWidth|offset|animation|reloadCallback|buttonNextHTML|buttonPrevHTML|buttonNextCallback|buttonPrevCallback|width|ceil|format|funcResize|unbind|old|after|typeof|remove|scrollTail|both|marginBottom|notify|attr|oWidth|oWidth2|start|easing|itemLoadCallback|itemFirstInCallback|itemFirstOutCallback|itemLastInCallback|itemLastOutCallback|itemVisibleInCallback|itemVisibleOutCallback|buttonNextEvent|click|buttonPrevEvent|height|left|top|indexOf|skin|nodeName|ul|ol|funcNext|funcPrev|reload|init|browser|safari|window|resize|reset|empty|add|prepend|startAuto|onAfterAnimation|object|jquery|marginLeft|offsetHeight|marginTop|swap|new|normal|swing|UL|OL|find|class|children|load|prototype|0px|10px|lock|unlock|has|string|html|append|alert|jCarousel|No|set|items|This|will|cause|an|infinite|loop|Aborting|push|onBeforeAnimation|setTimeout|1000|clearTimeout|isFunction|jcarouselindex|horizontal|borderLeftWidth|borderRightWidth|borderTopWidth|borderBottomWidth|index|round|floor|defaults|float|none|parseInt|isNaN|jQuery"
						.split("|"), 0, {}));
(function(a) {
	a.alerts = {
		verticalOffset : -75,
		horizontalOffset : 0,
		repositionOnResize : true,
		overlayOpacity : 0.01,
		overlayColor : "#FFF",
		draggable : true,
		okButton : "&nbsp;Delete&nbsp;",
		cancelButton : "&nbsp;Cancel&nbsp;",
		dialogClass : null,
		alert : function(c, d, g) {
			if (d == null)
				d = "Alert";
			a.alerts._show(d, c, null, "alert", function(f) {
				g && g(f)
			})
		},
		confirm : function(c, d, g) {
			if (d == null)
				d = "Confirm";
			a.alerts._show(d, c, null, "confirm", function(f) {
				g && g(f)
			})
		},
		prompt : function(c, d, g, f) {
			if (g == null)
				g = "Prompt";
			a.alerts._show(g, c, d, "prompt", function(b) {
				f && f(b)
			})
		},
		_show : function(c, d, g, f, b) {
			a.alerts._hide();
			a.alerts._overlay("show");
			a("BODY")
					.append(
							'<div id="popup_container"><h1 id="popup_title"></h1><div id="popup_content"><div id="popup_message"></div></div></div>');
			a.alerts.dialogClass
					&& a("#popup_container").addClass(a.alerts.dialogClass);
			var e = a.browser.msie && parseInt(a.browser.version) <= 6 ? "absolute"
					: "fixed";
			a("#popup_container").css({
				position : e,
				zIndex : 99999,
				padding : 0,
				margin : 0
			});
			a("#popup_title").text(c);
			a("#popup_content").addClass(f);
			a("#popup_message").text(d);
			a("#popup_message").html(
					a("#popup_message").text().replace(/\n/g, "<br />"));
			a("#popup_container").css({
				minWidth : a("#popup_container").outerWidth(),
				maxWidth : a("#popup_container").outerWidth()
			});
			a.alerts._reposition();
			a.alerts._maintainPosition(true);
			switch (f) {
			case "alert":
				a("#popup_message").after(
						'<div id="popup_panel"><input type="button" value="'
								+ a.alerts.okButton
								+ '" id="popup_ok" /></div>');
				a("#popup_ok").click(function() {
					a.alerts._hide();
					b(true)
				});
				a("#popup_ok").focus().keypress(function(j) {
					if (j.keyCode == 13 || j.keyCode == 27)
						a("#popup_ok").trigger("click")
				});
				break;
			case "confirm":
				a("#popup_message")
						.after(
								'<div id="popup_panel"><input type="button" value="'
										+ a.alerts.okButton
										+ '" id="popup_ok" /> <input type="button" value="'
										+ a.alerts.cancelButton
										+ '" id="popup_cancel" /></div>');
				a("#popup_ok").click(function() {
					a.alerts._hide();
					b && b(true)
				});
				a("#popup_cancel").click(function() {
					a.alerts._hide();
					b && b(false)
				});
				a("#popup_ok").focus();
				a("#popup_ok, #popup_cancel").keypress(function(j) {
					j.keyCode == 13 && a("#popup_ok").trigger("click");
					j.keyCode == 27 && a("#popup_cancel").trigger("click")
				});
				break;
			case "prompt":
				a("#popup_message")
						.append(
								'<br /><input type="text" size="30" id="popup_prompt" />')
						.after(
								'<div id="popup_panel"><input type="button" value="'
										+ a.alerts.okButton
										+ '" id="popup_ok" /> <input type="button" value="'
										+ a.alerts.cancelButton
										+ '" id="popup_cancel" /></div>');
				a("#popup_prompt").width(a("#popup_message").width());
				a("#popup_ok").click(function() {
					var j = a("#popup_prompt").val();
					a.alerts._hide();
					b && b(j)
				});
				a("#popup_cancel").click(function() {
					a.alerts._hide();
					b && b(null)
				});
				a("#popup_prompt, #popup_ok, #popup_cancel").keypress(
						function(j) {
							j.keyCode == 13 && a("#popup_ok").trigger("click");
							j.keyCode == 27
									&& a("#popup_cancel").trigger("click")
						});
				g && a("#popup_prompt").val(g);
				a("#popup_prompt").focus().select();
				break
			}
			if (a.alerts.draggable)
				try {
					a("#popup_container").draggable({
						handle : a("#popup_title")
					});
					a("#popup_title").css({
						cursor : "move"
					})
				} catch (h) {
				}
		},
		_hide : function() {
			a("#popup_container").remove();
			a.alerts._overlay("hide");
			a.alerts._maintainPosition(false)
		},
		_overlay : function(c) {
			switch (c) {
			case "show":
				a.alerts._overlay("hide");
				a("BODY").append('<div id="popup_overlay"></div>');
				a("#popup_overlay").css({
					position : "absolute",
					zIndex : 99998,
					top : "0px",
					left : "0px",
					width : "100%",
					height : a(document).height(),
					background : a.alerts.overlayColor,
					opacity : a.alerts.overlayOpacity
				});
				break;
			case "hide":
				a("#popup_overlay").remove();
				break
			}
		},
		_reposition : function() {
			var c = a(window).height() / 2
					- a("#popup_container").outerHeight() / 2
					+ a.alerts.verticalOffset, d = a(window).width() / 2
					- a("#popup_container").outerWidth() / 2
					+ a.alerts.horizontalOffset;
			if (c < 0)
				c = 0;
			if (d < 0)
				d = 0;
			if (a.browser.msie && parseInt(a.browser.version) <= 6)
				c += a(window).scrollTop();
			a("#popup_container").css({
				top : c + "px",
				left : d + "px"
			});
			a("#popup_overlay").height(a(document).height())
		},
		_maintainPosition : function(c) {
			if (a.alerts.repositionOnResize)
				switch (c) {
				case true:
					a(window).bind("resize", a.alerts._reposition);
					break;
				case false:
					a(window).unbind("resize", a.alerts._reposition);
					break
				}
		}
	};
	jAlert = function(c, d, g) {
		a.alerts.alert(c, d, g)
	};
	jConfirm = function(c, d, g) {
		a.alerts.confirm(c, d, g)
	};
	jPrompt = function(c, d, g, f) {
		a.alerts.prompt(c, d, g, f)
	}
})(jQuery);
(function(a) {
	a.fn.tipsy = function(c) {
		c = a.extend({}, a.fn.tipsy.defaults, c);
		return this
				.each(function() {
					var d = a.fn.tipsy.elementOptions(this, c);
					a(this)
							.hover(
									function() {
										a.data(this, "cancel.tipsy", true);
										var g = a.data(this, "active.tipsy");
										if (!g) {
											g = a('<div class="tipsy"><div class="tipsy-inner"/></div>');
											g.css({
												position : "absolute",
												zIndex : 1E5
											});
											a.data(this, "active.tipsy", g)
										}
										if (a(this).attr("title")
												|| typeof a(this).attr(
														"original-title") != "string")
											a(this)
													.attr(
															"original-title",
															a(this).attr(
																	"title")
																	|| "")
													.removeAttr("title");
										var f;
										if (typeof d.title == "string")
											f = a(this)
													.attr(
															d.title == "title" ? "original-title"
																	: d.title);
										else if (typeof d.title == "function")
											f = d.title.call(this);
										g.find(".tipsy-inner")[d.html ? "html"
												: "text"](f || d.fallback);
										f = a.extend({}, a(this).offset(), {
											width : this.offsetWidth,
											height : this.offsetHeight
										});
										g.get(0).className = "tipsy";
										g.remove().css({
											top : 0,
											left : 0,
											visibility : "hidden",
											display : "block"
										}).appendTo(document.body);
										var b = g[0].offsetWidth, e = g[0].offsetHeight;
										switch ((typeof d.gravity == "function" ? d.gravity
												.call(this)
												: d.gravity).charAt(0)) {
										case "n":
											g.css(
													{
														top : f.top + f.height,
														left : f.left + f.width
																/ 2 - b / 2
													}).addClass("tipsy-north");
											break;
										case "s":
											g.css(
													{
														top : f.top - e,
														left : f.left + f.width
																/ 2 - b / 2
													}).addClass("tipsy-south");
											break;
										case "e":
											g.css(
													{
														top : f.top + f.height
																/ 2 - e / 2,
														left : f.left - b
													}).addClass("tipsy-east");
											break;
										case "w":
											g.css(
													{
														top : f.top + f.height
																/ 2 - e / 2,
														left : f.left + f.width
													}).addClass("tipsy-west");
											break
										}
										d.fade ? g.css({
											opacity : 0,
											display : "block",
											visibility : "visible"
										}).animate({
											opacity : 0.8
										}) : g.css({
											visibility : "visible"
										})
									},
									function() {
										a.data(this, "cancel.tipsy", false);
										var g = this;
										setTimeout(function() {
											if (!a.data(this, "cancel.tipsy")) {
												var f = a.data(g,
														"active.tipsy");
												d.fade ? f.stop().fadeOut(
														function() {
															a(this).remove()
														}) : f.remove()
											}
										}, 100)
									})
				})
	};
	a.fn.tipsy.elementOptions = function(c, d) {
		return a.metadata ? a.extend({}, d, a(c).metadata()) : d
	};
	a.fn.tipsy.defaults = {
		fade : false,
		fallback : "",
		gravity : "n",
		html : false,
		title : "title"
	};
	a.fn.tipsy.autoNS = function() {
		return a(this).offset().top > a(document).scrollTop()
				+ a(window).height() / 2 ? "s" : "n"
	};
	a.fn.tipsy.autoWE = function() {
		return a(this).offset().left > a(document).scrollLeft()
				+ a(window).width() / 2 ? "e" : "w"
	}
})(jQuery);
new (function(a) {
	var c = a.separator || "&", d = a.spaces === false ? false : true, g = (a.prefix === false ? false
			: true) ? a.hash === true ? "#" : "?" : "", f = a.numbers === false ? false
			: true;
	jQuery.query = new (function() {
		var b = function(k, p) {
			return k != undefined && k !== null
					&& (p ? k.constructor == p : true)
		}, e = function(k) {
			for ( var p = /\[([^[]*)\]/g, s = /^([^[]+)(\[.*\])?$/.exec(k), o = s[1], l = []; k = p
					.exec(s[2]);)
				l.push(k[1]);
			return [ o, l ]
		}, h = function(k, p, s) {
			var o = p.shift();
			if (typeof k != "object")
				k = null;
			if (o === "") {
				k || (k = []);
				if (b(k, Array))
					k.push(p.length == 0 ? s : h(null, p.slice(0), s));
				else if (b(k, Object)) {
					for (o = 0; k[o++] != null;)
						;
					k[--o] = p.length == 0 ? s : h(k[o], p.slice(0), s)
				} else {
					k = [];
					k.push(p.length == 0 ? s : h(null, p.slice(0), s))
				}
			} else if (o && o.match(/^\s*[0-9]+\s*$/)) {
				var l = parseInt(o, 10);
				k || (k = []);
				k[l] = p.length == 0 ? s : h(k[l], p.slice(0), s)
			} else if (o) {
				l = o.replace(/^\s*|\s*$/g, "");
				k || (k = {});
				if (b(k, Array)) {
					var q = {};
					for (o = 0; o < k.length; ++o)
						q[o] = k[o];
					k = q
				}
				k[l] = p.length == 0 ? s : h(k[l], p.slice(0), s)
			} else
				return s;
			return k
		}, j = function(k) {
			var p = this;
			p.keys = {};
			k.queryObject ? jQuery.each(k.get(), function(s, o) {
				p.SET(s, o)
			})
					: jQuery
							.each(
									arguments,
									function() {
										var s = "" + this;
										s = s.replace(/^[?#]/, "");
										s = s.replace(/[;&]$/, "");
										if (d)
											s = s.replace(/[+]/g, " ");
										jQuery
												.each(
														s.split(/[&;]/),
														function() {
															var o = decodeURIComponent(this
																	.split("=")[0]
																	|| ""), l = decodeURIComponent(this
																	.split("=")[1]
																	|| "");
															if (o) {
																if (f)
																	if (/^[+-]?[0-9]+\.[0-9]*$/
																			.test(l))
																		l = parseFloat(l);
																	else if (/^[+-]?[0-9]+$/
																			.test(l))
																		l = parseInt(
																				l,
																				10);
																l = !l
																		&& l !== 0 ? true
																		: l;
																if (l !== false
																		&& l !== true
																		&& typeof l != "number")
																	l = l;
																p.SET(o, l)
															}
														})
									});
			return p
		};
		j.prototype = {
			queryObject : true,
			has : function(k, p) {
				k = this.get(k);
				return b(k, p)
			},
			GET : function(k) {
				if (!b(k))
					return this.keys;
				var p = e(k);
				k = p[1];
				for (p = this.keys[p[0]]; p != null && k.length != 0;)
					p = p[k.shift()];
				return typeof p == "number" ? p : p || ""
			},
			get : function(k) {
				k = this.GET(k);
				if (b(k, Object))
					return jQuery.extend(true, {}, k);
				else if (b(k, Array))
					return k.slice(0);
				return k
			},
			SET : function(k, p) {
				p = !b(p) ? null : p;
				k = e(k);
				var s = k[0];
				this.keys[s] = h(this.keys[s], k[1].slice(0), p);
				return this
			},
			set : function(k, p) {
				return this.copy().SET(k, p)
			},
			REMOVE : function(k) {
				return this.SET(k, null).COMPACT()
			},
			remove : function(k) {
				return this.copy().REMOVE(k)
			},
			EMPTY : function() {
				var k = this;
				jQuery.each(k.keys, function(p) {
					delete k.keys[p]
				});
				return k
			},
			load : function(k) {
				var p = k.replace(/^.*?[#](.+?)(?:\?.+)?$/, "$1"), s = k
						.replace(/^.*?[?](.+?)(?:#.+)?$/, "$1");
				return new j(k.length == s.length ? "" : s,
						k.length == p.length ? "" : p)
			},
			empty : function() {
				return this.copy().EMPTY()
			},
			copy : function() {
				return new j(this)
			},
			COMPACT : function() {
				function k(p) {
					var s = typeof p == "object" ? b(p, Array) ? [] : {} : p;
					if (typeof p == "object") {
						function o(l, q, u) {
							if (b(l, Array))
								l.push(u);
							else
								l[q] = u
						}
						jQuery.each(p, function(l, q) {
							if (!b(q))
								return true;
							o(s, l, k(q))
						})
					}
					return s
				}
				this.keys = k(this.keys);
				return this
			},
			compact : function() {
				return this.copy().COMPACT()
			},
			toString : function() {
				var k = [], p = [], s = function(q) {
					q += "";
					if (d)
						q = q.replace(/ /g, "+");
					return encodeURIComponent(q)
				}, o = function(q, u, v) {
					if (!(!b(v) || v === false)) {
						u = [ s(u) ];
						if (v !== true) {
							u.push("=");
							u.push(s(v))
						}
						q.push(u.join(""))
					}
				}, l = function(q, u) {
					var v = function(z) {
						return !u || u == "" ? "" + z : [ u, "[", z, "]" ]
								.join("")
					};
					jQuery.each(q, function(z, B) {
						typeof B == "object" ? l(B, v(z)) : o(p, v(z), B)
					})
				};
				l(this.keys);
				p.length > 0 && k.push(g);
				k.push(p.join(c));
				return k.join("")
			}
		};
		return new j(location.search, location.hash)
	})
})(jQuery.query || {});
(function(a) {
	function c() {
		var e = d(this);
		isNaN(e.datetime) || a(this).text(g(e.datetime));
		return this
	}
	function d(e) {
		e = a(e);
		if (!e.data("timeago")) {
			e.data("timeago", {
				datetime : b.datetime(e)
			});
			var h = a.trim(e.text());
			h.length > 0 && e.attr("title", h)
		}
		return e.data("timeago")
	}
	function g(e) {
		return b.inWords(f(e))
	}
	function f(e) {
		return (new Date).getTime() - e.getTime()
	}
	a.timeago = function(e) {
		return e instanceof Date ? g(e) : typeof e == "string" ? g(a.timeago
				.parse(e)) : g(a.timeago.datetime(e))
	};
	var b = a.timeago;
	a.extend(a.timeago, {
		settings : {
			refreshMillis : 6E4,
			allowFuture : false,
			strings : {
				prefixAgo : null,
				prefixFromNow : null,
				suffixAgo : "ago",
				suffixFromNow : "from now",
				seconds : "less than a minute",
				minute : "about a minute",
				minutes : "%d minutes",
				hour : "about an hour",
				hours : "about %d hours",
				day : "a day",
				days : "%d days",
				month : "about a month",
				months : "%d months",
				year : "about a year",
				years : "%d years",
				numbers : []
			}
		},
		inWords : function(e) {
			function h(u, v) {
				return (a.isFunction(u) ? u(v) : u).replace(/%d/i, j.numbers
						&& j.numbers[v] || v)
			}
			var j = this.settings.strings, k = j.prefixAgo, p = j.suffixAgo;
			if (this.settings.allowFuture) {
				if (e < 0) {
					k = j.prefixFromNow;
					p = j.suffixFromNow
				}
				e = Math.abs(e)
			}
			e = e / 1E3;
			var s = e / 60, o = s / 60, l = o / 24, q = l / 365;
			e = e < 45 && h(j.seconds, Math.round(e)) || e < 90
					&& h(j.minute, 1) || s < 45 && h(j.minutes, Math.round(s))
					|| s < 90 && h(j.hour, 1) || o < 24
					&& h(j.hours, Math.round(o)) || o < 48 && h(j.day, 1)
					|| l < 30 && h(j.days, Math.floor(l)) || l < 60
					&& h(j.month, 1) || l < 365
					&& h(j.months, Math.floor(l / 30)) || q < 2 && h(j.year, 1)
					|| h(j.years, Math.floor(q));
			return a.trim([ k, e, p ].join(" "))
		},
		parse : function(e) {
			e = a.trim(e);
			e = e.replace(/-/, "/").replace(/-/, "/");
			e = e.replace(/T/, " ").replace(/Z/, " UTC");
			e = e.replace(/([\+-]\d\d)\:?(\d\d)/, " $1$2");
			e = e.replace(/(\.\d+)/, "");
			return new Date(e)
		},
		datetime : function(e) {
			e = a(e).get(0).tagName.toLowerCase() == "time" ? a(e).attr(
					"datetime") : a(e).attr("title");
			return b.parse(e)
		}
	});
	a.fn.timeago = function() {
		var e = this;
		e.each(c);
		var h = b.settings;
		h.refreshMillis > 0 && setInterval(function() {
			e.each(c)
		}, h.refreshMillis);
		return e
	};
	document.createElement("abbr");
	document.createElement("time")
})(jQuery);
(function(a) {
	a.pageless = function(c) {
		a.isFunction(c) ? c.call() : a.pageless.init(c)
	};
	a.pageless.settings = {
		currentPage : 1,
		pagination : ".pagination",
		url : location.href,
		params : {},
		distance : 100,
		loaderImage : "",
		marker : null,
		scrape : function(c) {
			return c
		}
	};
	a.pageless.loaderHtml = function() {
		return a.pageless.settings.loaderHtml
				|| '<div id="pageless-loader" style="display:none;text-align:center;width:100%;"></div>'
	};
	a.pageless.init = function(c) {
		if (!a.pageless.settings.inited) {
			a.pageless.settings.inited = true;
			c && a.extend(a.pageless.settings, c);
			a.pageless.settings.pagination
					&& a(a.pageless.settings.pagination).remove();
			a.pageless.startListener()
		}
	};
	a.pageless.isLoading = false;
	a.fn.pageless = function(c) {
		a.pageless.init(c);
		a.pageless.el = a(this);
		if (c.loader && a(this).find(c.loader).length)
			a.pageless.loader = a(this).find(c.loader);
		else {
			a.pageless.loader = a(a.pageless.loaderHtml());
			a(this).append(a.pageless.loader);
			c.loaderHtml || a("#pageless-loader .msg").html(c.loaderMsg)
		}
	};
	a.pageless.loading = function(c) {
		if (c === true) {
			a.pageless.isLoading = true;
			a.pageless.loader && a.pageless.loader.fadeIn("normal")
		} else {
			a.pageless.isLoading = false;
			a.pageless.loader && a.pageless.loader.fadeOut("normal")
		}
	};
	a.pageless.stopListener = function() {
		a(window).unbind(".pageless");
		a("#" + a.pageless.settings.loader).hide()
	};
	a.pageless.startListener = function() {
		a(window).bind("scroll.pageless", a.pageless.scroll);
		a("#" + a.pageless.settings.loader).show()
	};
	a.pageless.scroll = function() {
		if (a.pageless.settings.totalPages <= a.pageless.settings.currentPage) {
			a.pageless.stopListener();
			a.pageless.settings.afterStopListener
					&& a.pageless.settings.afterStopListener.call()
		} else {
			var c = a(document).height() - a(window).scrollTop()
					- a(window).height();
			if (!a.pageless.isLoading && c < a.pageless.settings.distance) {
				a.pageless.loading(true);
				a.pageless.settings.currentPage++;
				a.extend(a.pageless.settings.params, {
					page : a.pageless.settings.currentPage
				});
				a.pageless.settings.marker
						&& a.extend(a.pageless.settings.params, {
							marker : a.pageless.settings.marker
						});
				c = a.pageless.settings.url;
				c = c.split("#")[0];
				a.ajax({
					url : c,
					type : "GET",
					dataType : "html",
					data : a.pageless.settings.params,
					success : function(d) {
						d = a.pageless.settings.scrape(d);
						a.pageless.loader ? a.pageless.loader.before(d)
								: a.pageless.el.append(d);
						a.pageless.loading(false);
						a.pageless.settings.complete
								&& a.pageless.settings.complete.call()
					}
				})
			}
		}
	}
})(jQuery);
var new_pins = {
	html : "",
	number : 0,
	old_title : ""
}, followers_json = null, cache = {}, lastXhr, media_url = "http://assets.pinterest.com/";
$("html")
		.ajaxSend(
				function(a, c, d) {
					function g(f) {
						var b = null;
						if (document.cookie && document.cookie != "")
							for ( var e = document.cookie.split(";"), h = 0; h < e.length; h++) {
								var j = jQuery.trim(e[h]);
								if (j.substring(0, f.length + 1) == f + "=") {
									b = decodeURIComponent(j
											.substring(f.length + 1));
									break
								}
							}
						return b
					}
					/^http:.*/.test(d.url)
							|| /^https:.*/.test(d.url)
							|| c
									.setRequestHeader("X-CSRFToken",
											g("csrftoken"))
				});
function setCookie(a, c, d) {
	if (d) {
		var g = new Date;
		g.setTime(g.getTime() + d * 24 * 60 * 60 * 1E3);
		d = "; expires=" + g.toGMTString()
	} else
		d = "";
	document.cookie = a + "=" + c + d + "; path=/"
}
function getCookie(a) {
	a = a + "=";
	for ( var c = document.cookie.split(";"), d = 0; d < c.length; d++) {
		for ( var g = c[d]; g.charAt(0) == " ";)
			g = g.substring(1, g.length);
		if (g.indexOf(a) == 0)
			return g.substring(a.length, g.length)
	}
	return null
}
function deleteCookie(a) {
	setCookie(a, "", -1)
}
$
		.extend({
			getUrlVars : function() {
				for ( var a = [], c, d = window.location.href.slice(
						window.location.href.indexOf("?") + 1).split("&"), g = 0; g < d.length; g++) {
					c = d[g].split("=");
					a.push(c[0]);
					a[c[0]] = c[1]
				}
				return a
			},
			getUrlVar : function(a) {
				return $.getUrlVars()[a]
			}
		});
(function(a) {
	a.fn.extend({
		defaultValue : function(c, d) {
			a(this).focus(function() {
				a(this).val() == c && a(this).val("")
			}).blur(function() {
				if (a(this).val() == "") {
					a(this).val(c);
					d && a(this).addClass(d)
				}
			})
		}
	})
})(jQuery);
if (!Array.indexOf)
	Array.prototype.indexOf = function(a) {
		for ( var c = 0; c < this.length; c++)
			if (this[c] == a)
				return c;
		return -1
	};
function is_video(a) {
	return /^http:\/\/img\.youtube\.com\/vi\/[a-zA-Z0-9\-_]+\/0\.jpg$/.test(a)
}
function getHTML(a) {
	var c = $(a).wrap("<div />").parent().html();
	$(a).unwrap();
	return c
}
var ScrollToTop = ScrollToTop
		|| {
			id : "ScrollToTop",
			control : $("#" + this.id),
			setup : function() {
				var a = "<a id='"
						+ ScrollToTop.id
						+ "' href='#' class='Button WhiteButton Offscreen Indicator'><strong>Scroll to Top</strong><span></span></a>";
				$("body").append(a);
				var c = $(window).height() / 2;
				$(window)
						.scroll(
								function() {
									(window.innerWidth ? window.pageYOffset
											: document.documentElement.scrollTop) >= c ? $(
											"#ScrollToTop").removeClass(
											"Offscreen")
											: $("#ScrollToTop").addClass(
													"Offscreen")
								});
				$("#ScrollToTop").click(function() {
					$("html, body").animate({
						scrollTop : "0px"
					}, 400);
					return false
				})
			}
		}, Modal = Modal || {
	setup : function() {
		$(document).keydown(function(a) {
			if (a.keyCode == 27) {
				var c = $(".ModalContainer:visible").attr("id");
				if (c)
					Modal.close(c);
				else
					$("#zoomScroll").length && window.history.back();
				a.preventDefault()
			}
		})
	},
	show : function(a) {
		var c = $("#" + a);
		a = $(".modal:first", c);
		$("body").addClass("noscroll");
		c.show();
		var d = a.outerHeight();
		a.css("margin-bottom", "-" + d / 2 + "px");
		setTimeout(function() {
			c.addClass("visible");
			c.css("-webkit-transform", "none")
		}, 1);
		return false
	},
	close : function(a) {
		var c = $("#" + a);
		$("#zoomScroll").length === 0 && $("body").removeClass("noscroll");
		c.removeClass("visible");
		setTimeout(function() {
			c.hide();
			c.css("-webkit-transform", "translateZ(0)")
		}, 251);
		return false
	}
};
$(document)
		.ready(
				function() {
					ScrollToTop.setup();
					Modal.setup();
					$(".tipsyHover").tipsy({
						gravity : "n",
						delayIn : 0.1,
						delayOut : 0.1,
						opacity : 0.7,
						live : true,
						html : true
					});
					$("#query").focus(function() {
						cache && $(this).catcomplete("search", $(this).val())
					});
					$
							.widget(
									"custom.catcomplete",
									$.ui.autocomplete,
									{
										_renderMenu : function(c, d) {
											var g = this, f = "";
											$
													.each(
															d,
															function(b, e) {
																if (e.category != f) {
																	c
																			.append("<li class='ui-autocomplete-category'>"
																					+ e.category
																					+ "</li>");
																	f = e.category
																}
																g._renderItem(
																		c, e)
															});
											d = {
												link : "/search/?q="
														+ this.term
											};
											$("<li></li>")
													.data("item.autocomplete",
															d)
													.append(
															"<a href='/search/?q="
																	+ this.term
																	+ "' class='ui-corner-all' tabindex='-1' style='font-weight:bold; min-height:0 !important;'>Search for "
																	+ this.term
																	+ "</a>")
													.appendTo(c)
										}
									});
					var a = $("#query").catcomplete(
							{
								source : function(c, d) {
									Tagging.getFriends(c, function(g) {
										var f = g;
										if (myboards) {
											f = tagmate.filter_options(
													myboards, c.term);
											f = g.concat(f)
										}
										for (g = 0; g < f.length; g++)
											f[g].value = f[g].label;
										d(f)
									})
								},
								minLength : 1,
								delay : 0,
								appendTo : "#SearchAutocompleteHolder",
								select : function(c, d) {
									document.location.href = d.item.link
								}
							});
					if (typeof a.data("catcomplete") != "undefined")
						a.data("catcomplete")._renderItem = function(c, d) {
							var g = "<a href='"
									+ d.link
									+ "'><img src='"
									+ d.image
									+ "' class='AutocompletePhoto' alt='Photo of "
									+ d.label
									+ "' width='38px' height='38px'/><span class='AutocompleteName'>"
									+ d.label + "</span></a>";
							return $("<li></li>").data("item.autocomplete", d)
									.append(g).appendTo(c)
						};
					$("#query").defaultValue("Search", "default_value");
					$("#Search #query_button").click(function() {
						$("#Search form").submit();
						return false
					});
					$("body")
							.on(
									"click",
									"a",
									function() {
										var c = $(this).attr("href");
										if (!c.match(/^(http|https):\/\//)
												|| c
														.match(/(http:\/\/|https:\/\/|\.)pinterest\.com/gi)
												|| $(this).hasClass("safelink"))
											return true;
										var d = $(this).parents(".pin").attr(
												"data-id")
												|| $(this).parents(".pin")
														.attr("pin-id")
												|| $(this).attr("data-id");
										d = d ? "&pin=" + d : "";
										window.open("/offsite/?url="
												+ encodeURIComponent(c)
												+ "&token="
												+ getCookie("csrftoken") + d);
										return false
									})
				});
Twitter = new (function() {
	var a = this;
	this.startTwitterConnect = function() {
		a._twitterWindow = window.open("/twitter/connect/", "Pinterest",
				"location=0,status=0,width=800,height=400");
		a._twitterInterval = window.setInterval(a.completeTwitterConnect, 1E3)
	};
	this.completeTwitterConnect = function() {
		if (a._twitterWindow.closed) {
			window.clearInterval(a._twitterInterval);
			window.location.reload()
		}
	}
});
Facebook = new (function() {
	var a = this;
	this.startFacebookConnect = function(c, d, g, f) {
		g = g == undefined ? true : g;
		var b = "/facebook/connect/", e = "?";
		if (c) {
			b += e + "scope=" + c;
			e = "&"
		}
		if (d) {
			b += e + "enable_timeline=1";
			e = "&"
		}
		if (f)
			b += e + "ref_page=" + f;
		a._facebookWindow = window.open(b, "Pinterest",
				"location=0,status=0,width=800,height=400");
		if (g)
			a._facebookInterval = window.setInterval(
					this.completeFacebookConnect, 1E3)
	};
	this.completeFacebookConnect = function() {
		if (a._facebookWindow.closed) {
			window.clearInterval(a._facebookInterval);
			window.location.reload()
		}
	}
});
(function(a) {
	function c(g) {
		return typeof g == "object" ? g : {
			top : g,
			left : g
		}
	}
	var d = a.scrollTo = function(g, f, b) {
		a(window).scrollTo(g, f, b)
	};
	d.defaults = {
		axis : "xy",
		duration : parseFloat(a.fn.jquery) >= 1.3 ? 0 : 1
	};
	d.window = function() {
		return a(window)._scrollable()
	};
	a.fn._scrollable = function() {
		return this.map(function() {
			var g = this;
			if (!(!g.nodeName || a.inArray(g.nodeName.toLowerCase(), [
					"iframe", "#document", "html", "body" ]) != -1))
				return g;
			g = (g.contentWindow || g).document || g.ownerDocument || g;
			return a.browser.safari || g.compatMode == "BackCompat" ? g.body
					: g.documentElement
		})
	};
	a.fn.scrollTo = function(g, f, b) {
		if (typeof f == "object") {
			b = f;
			f = 0
		}
		if (typeof b == "function")
			b = {
				onAfter : b
			};
		if (g == "max")
			g = 9E9;
		b = a.extend({}, d.defaults, b);
		f = f || b.speed || b.duration;
		b.queue = b.queue && b.axis.length > 1;
		if (b.queue)
			f /= 2;
		b.offset = c(b.offset);
		b.over = c(b.over);
		return this
				._scrollable()
				.each(
						function() {
							function e(l) {
								j.animate(s, f, b.easing, l && function() {
									l.call(this, g, b)
								})
							}
							var h = this, j = a(h), k = g, p, s = {}, o = j
									.is("html,body");
							switch (typeof k) {
							case "number":
							case "string":
								if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(k)) {
									k = c(k);
									break
								}
								k = a(k, this);
							case "object":
								if (k.is || k.style)
									p = (k = a(k)).offset()
							}
							a
									.each(
											b.axis.split(""),
											function(l, q) {
												var u = q == "x" ? "Left"
														: "Top", v = u
														.toLowerCase(), z = "scroll"
														+ u, B = h[z], F = d
														.max(h, q);
												if (p) {
													s[z] = p[v]
															+ (o ? 0
																	: B
																			- j
																					.offset()[v]);
													if (b.margin) {
														s[z] -= parseInt(k
																.css("margin"
																		+ u)) || 0;
														s[z] -= parseInt(k
																.css("border"
																		+ u
																		+ "Width")) || 0
													}
													s[z] += b.offset[v] || 0;
													if (b.over[v])
														s[z] += k[q == "x" ? "width"
																: "height"]()
																* b.over[v]
												} else {
													q = k[v];
													s[z] = q.slice
															&& q.slice(-1) == "%" ? parseFloat(q)
															/ 100 * F
															: q
												}
												if (/^\d+$/.test(s[z]))
													s[z] = s[z] <= 0 ? 0 : Math
															.min(s[z], F);
												if (!l && b.queue) {
													B != s[z]
															&& e(b.onAfterFirst);
													delete s[z]
												}
											});
							e(b.onAfter)
						}).end()
	};
	d.max = function(g, f) {
		var b = f == "x" ? "Width" : "Height";
		f = "scroll" + b;
		if (!a(g).is("html,body"))
			return g[f] - a(g)[b.toLowerCase()]();
		b = "client" + b;
		var e = g.ownerDocument.documentElement;
		g = g.ownerDocument.body;
		return Math.max(e[f], g[f]) - Math.min(e[b], g[b])
	}
})(jQuery);
(function() {
	jQuery
			.each(
					{
						getSelection : function() {
							var a = this.jquery ? this[0] : this;
							return ("selectionStart" in a && function() {
								var c = a.selectionEnd - a.selectionStart;
								return {
									start : a.selectionStart,
									end : a.selectionEnd,
									length : c,
									text : a.value.substr(a.selectionStart, c)
								}
							} || document.selection && function() {
								a.focus();
								var c = document.selection.createRange();
								if (c == null)
									return {
										start : 0,
										end : a.value.length,
										length : 0
									};
								var d = a.createTextRange(), g = d.duplicate();
								d.moveToBookmark(c.getBookmark());
								g.setEndPoint("EndToStart", d);
								var f = g.text.length, b = f;
								for (d = 0; d < f; d++)
									g.text.charCodeAt(d) == 13 && b--;
								f = g = c.text.length;
								for (d = 0; d < g; d++)
									c.text.charCodeAt(d) == 13 && f--;
								return {
									start : b,
									end : b + f,
									length : f,
									text : c.text
								}
							} || function() {
								return {
									start : 0,
									end : a.value.length,
									length : 0
								}
							})()
						},
						setSelection : function(a, c) {
							var d = this.jquery ? this[0] : this, g = a || 0, f = c || 0;
							return ("selectionStart" in d && function() {
								d.focus();
								d.selectionStart = g;
								d.selectionEnd = f;
								return this
							} || document.selection && function() {
								d.focus();
								var b = d.createTextRange(), e = g;
								for (i = 0; i < e; i++)
									if (d.value[i].search(/[\r\n]/) != -1)
										g -= 0.5;
								e = f;
								for (i = 0; i < e; i++)
									if (d.value[i].search(/[\r\n]/) != -1)
										f -= 0.5;
								b.moveEnd("textedit", -1);
								b.moveStart("character", g);
								b.moveEnd("character", f - g);
								b.select();
								return this
							} || function() {
								return this
							})()
						},
						replaceSelection : function(a) {
							var c = this.jquery ? this[0] : this, d = a || "";
							return ("selectionStart" in c
									&& function() {
										c.value = c.value.substr(0,
												c.selectionStart)
												+ d
												+ c.value.substr(
														c.selectionEnd,
														c.value.length);
										return this
									}
									|| document.selection
									&& function() {
										c.focus();
										document.selection.createRange().text = d;
										return this
									} || function() {
								c.value += d;
								return this
							})()
						}
					}, function(a) {
						jQuery.fn[a] = this
					})
})();
var tagmate = tagmate
		|| {
			USER_TAG_EXPR : "@\\w+(?: \\w*)?",
			HASH_TAG_EXPR : "#\\w+",
			USD_TAG_EXPR : "\\$(?:(?:\\d{1,3}(?:\\,\\d{3})+)|(?:\\d+))(?:\\.\\d{2})?",
			GBP_TAG_EXPR : "\\\u00a3(?:(?:\\d{1,3}(?:\\,\\d{3})+)|(?:\\d+))(?:\\.\\d{2})?",
			filter_options : function(a, c) {
				for ( var d = [], g = 0; g < a.length; g++) {
					var f = a[g].label.toLowerCase(), b = c.toLowerCase();
					b.length <= f.length && f.indexOf(b) == 0 && d.push(a[g])
				}
				return d
			},
			sort_options : function(a) {
				return a.sort(function(c, d) {
					c = c.label.toLowerCase();
					d = d.label.toLowerCase();
					if (c > d)
						return 1;
					else if (c < d)
						return -1;
					return 0
				})
			}
		};
(function(a) {
	function c(b, e, h) {
		b = b.substring(h || 0).search(e);
		return b >= 0 ? b + (h || 0) : b
	}
	function d(b) {
		return b.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
	}
	function g(b, e, h) {
		var j = {};
		for (tok in e)
			if (h && h[tok]) {
				var k = {}, p = {};
				for (key in h[tok]) {
					var s = h[tok][key].value, o = h[tok][key].label, l = d(tok
							+ o), q = [ "(?:^(", ")$|^(", ")\\W|\\W(",
							")\\W|\\W(", ")$)" ].join(l), u = 0;
					for (q = new RegExp(q, "gm"); (u = c(b.val(), q, u)) > -1;) {
						var v = p[u] ? p[u] : null;
						if (!v || k[v].length < o.length)
							p[u] = s;
						k[s] = o;
						u += o.length + 1
					}
				}
				for (u in p)
					j[tok + p[u]] = tok
			} else {
				k = null;
				for (q = new RegExp("(" + e[tok] + ")", "gm"); k = q.exec(b
						.val());)
					j[k[1]] = tok
			}
		b = [];
		for (l in j)
			b.push(l);
		return b
	}
	var f = {
		"@" : tagmate.USER_TAG_EXPR,
		"#" : tagmate.HASH_TAG_EXPR,
		$ : tagmate.USD_TAG_EXPR,
		"\u00a3" : tagmate.GBP_TAG_EXPR
	};
	a.fn
			.extend({
				getTags : function(b, e) {
					var h = a(this);
					b = b || h.data("_tagmate_tagchars");
					e = e || h.data("_tagmate_sources");
					return g(h, b, e)
				},
				tagmate : function(b) {
					function e(o, l, q) {
						for (l = new RegExp("[" + l + "]"); q >= 0
								&& !l.test(o[q]); q--)
							;
						return q
					}
					function h(o) {
						var l = o.val(), q = o.getSelection(), u = -1;
						o = null;
						for (tok in s.tagchars) {
							var v = e(l, tok, q.start);
							if (v > u) {
								u = v;
								o = tok
							}
						}
						l = l.substring(u + 1, q.start);
						if ((new RegExp("^" + s.tagchars[o])).exec(o + l))
							return o + l;
						return null
					}
					function j(o, l, q) {
						var u = o.val(), v = o.getSelection();
						v = e(u, l[0], v.start);
						var z = u.substr(0, v);
						u = u.substr(v + l.length);
						o.val(z + l[0] + q + u);
						u = v + q.length + 1;
						o.setSelection(u, u);
						s.replace_tag && s.replace_tag(l, q)
					}
					function k(o, l) {
						l = tagmate.sort_options(l);
						for ( var q = 0; q < l.length; q++) {
							var u = l[q].label, v = l[q].image;
							q == 0 && o.html("");
							var z = "<span>" + u + "</span>";
							if (v)
								z = "<img src='" + v + "' alt='" + u + "'/>"
										+ z;
							u = s.menu_option_class;
							if (q == 0)
								u += " " + s.menu_option_active_class;
							o.append("<div class='" + u + "'>" + z + "</div>")
						}
					}
					function p(o, l) {
						var q = l == "down" ? ":first-child" : ":last-child", u = l == "down" ? "next"
								: "prev";
						l = o.children("." + s.menu_option_active_class);
						if (l.length == 0)
							l = o.children(q);
						else {
							l.removeClass(s.menu_option_active_class);
							l = l[u]().length > 0 ? l[u]() : l
						}
						l.addClass(s.menu_option_active_class);
						u = o.children();
						var v = Math.floor(a(o).height() / a(u[0]).height()) - 1;
						if (a(o).height() % a(u[0]).height() > 0)
							v -= 1;
						for (q = 0; q < u.length
								&& a(u[q]).html() != a(l).html(); q++)
							;
						q > v && q - v >= 0 && q - v < u.length
								&& o.scrollTo(u[q - v])
					}
					var s = {
						tagchars : f,
						sources : null,
						capture_tag : null,
						replace_tag : null,
						menu : null,
						menu_class : "tagmate-menu",
						menu_option_class : "tagmate-menu-option",
						menu_option_active_class : "tagmate-menu-option-active"
					};
					return this
							.each(function() {
								function o() {
									v.hide();
									var B = h(l);
									if (B) {
										var F = B[0], n = B.substr(1), m = l
												.getSelection(), y = e(l.val(),
												F, m.start);
										m.start - y <= B.length
												&& function(A) {
													if (typeof s.sources[F] === "object")
														A(tagmate
																.filter_options(
																		s.sources[F],
																		n));
													else
														typeof s.sources[F] === "function" ? s.sources[F]
																({
																	term : n
																}, A)
																: A()
												}
														(function(A) {
															if (A
																	&& A.length > 0) {
																k(v, A);
																v
																		.css(
																				"top",
																				l
																						.outerHeight()
																						- 1
																						+ "px");
																v.show();
																for ( var D = l
																		.data("_tagmate_sources"), E = 0; E < A.length; E++) {
																	for ( var K = false, L = 0; !K
																			&& L < D[F].length; L++)
																		K = D[F][L].value == A[E].value;
																	K
																			|| D[F]
																					.push(A[E])
																}
															}
															B
																	&& s.capture_tag
																	&& s
																			.capture_tag(B)
														})
									}
								}
								b && a.extend(s, b);
								var l = a(this);
								l.data("_tagmate_tagchars", s.tagchars);
								var q = {};
								for ( var u in s.sources)
									q[u] = [];
								l.data("_tagmate_sources", q);
								var v = s.menu;
								if (!v) {
									v = a("<div class='" + s.menu_class
											+ "'></div>");
									l.after(v)
								}
								l.offset();
								v.css("position", "absolute");
								v.hide();
								var z = false;
								a(l)
										.unbind(".tagmate")
										.bind("focus.tagmate", function() {
											o()
										})
										.bind("blur.tagmate", function() {
											setTimeout(function() {
												v.hide()
											}, 300)
										})
										.bind("click.tagmate", function() {
											o()
										})
										.bind(
												"keydown.tagmate",
												function(B) {
													if (v.is(":visible"))
														if (B.keyCode == 40) {
															p(v, "down");
															z = true;
															return false
														} else if (B.keyCode == 38) {
															p(v, "up");
															z = true;
															return false
														} else if (B.keyCode == 13) {
															B = v
																	.children(
																			"."
																					+ s.menu_option_active_class)
																	.text();
															var F = h(l);
															if (F && B) {
																j(l, F, B);
																v.hide();
																z = true;
																return false
															}
														} else if (B.keyCode == 27) {
															v.hide();
															z = true;
															return false
														}
												}).bind("keyup.tagmate",
												function() {
													if (z) {
														z = false;
														return true
													}
													o()
												});
								a(
										"." + s.menu_class + " ."
												+ s.menu_option_class).die(
										"click.tagmate").live("click.tagmate",
										function() {
											var B = a(this).text(), F = h(l);
											j(l, F, B);
											l.keyup()
										})
							})
				}
			})
})(jQuery);
(function(a) {
	function c(f) {
		var b;
		if (f && f.constructor == Array && f.length == 3)
			return f;
		if (b = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/
				.exec(f))
			return [ parseInt(b[1]), parseInt(b[2]), parseInt(b[3]) ];
		if (b = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/
				.exec(f))
			return [ parseFloat(b[1]) * 2.55, parseFloat(b[2]) * 2.55,
					parseFloat(b[3]) * 2.55 ];
		if (b = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(f))
			return [ parseInt(b[1], 16), parseInt(b[2], 16), parseInt(b[3], 16) ];
		if (b = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(f))
			return [ parseInt(b[1] + b[1], 16), parseInt(b[2] + b[2], 16),
					parseInt(b[3] + b[3], 16) ];
		return g[a.trim(f).toLowerCase()]
	}
	function d(f, b) {
		var e;
		do {
			e = a.curCSS(f, b);
			if (e != "" && e != "transparent" || a.nodeName(f, "body"))
				break;
			b = "backgroundColor"
		} while (f = f.parentNode);
		return c(e)
	}
	a.each([ "backgroundColor", "borderBottomColor", "borderLeftColor",
			"borderRightColor", "borderTopColor", "color", "outlineColor" ],
			function(f, b) {
				a.fx.step[b] = function(e) {
					if (e.state == 0) {
						e.start = d(e.elem, b);
						e.end = c(e.end)
					}
					e.elem.style[b] = "rgb("
							+ [
									Math.max(Math.min(parseInt(e.pos
											* (e.end[0] - e.start[0])
											+ e.start[0]), 255), 0),
									Math.max(Math.min(parseInt(e.pos
											* (e.end[1] - e.start[1])
											+ e.start[1]), 255), 0),
									Math.max(Math.min(parseInt(e.pos
											* (e.end[2] - e.start[2])
											+ e.start[2]), 255), 0) ].join(",")
							+ ")"
				}
			});
	var g = {
		aqua : [ 0, 255, 255 ],
		azure : [ 240, 255, 255 ],
		beige : [ 245, 245, 220 ],
		black : [ 0, 0, 0 ],
		blue : [ 0, 0, 255 ],
		brown : [ 165, 42, 42 ],
		cyan : [ 0, 255, 255 ],
		darkblue : [ 0, 0, 139 ],
		darkcyan : [ 0, 139, 139 ],
		darkgrey : [ 169, 169, 169 ],
		darkgreen : [ 0, 100, 0 ],
		darkkhaki : [ 189, 183, 107 ],
		darkmagenta : [ 139, 0, 139 ],
		darkolivegreen : [ 85, 107, 47 ],
		darkorange : [ 255, 140, 0 ],
		darkorchid : [ 153, 50, 204 ],
		darkred : [ 139, 0, 0 ],
		darksalmon : [ 233, 150, 122 ],
		darkviolet : [ 148, 0, 211 ],
		fuchsia : [ 255, 0, 255 ],
		gold : [ 255, 215, 0 ],
		green : [ 0, 128, 0 ],
		indigo : [ 75, 0, 130 ],
		khaki : [ 240, 230, 140 ],
		lightblue : [ 173, 216, 230 ],
		lightcyan : [ 224, 255, 255 ],
		lightgreen : [ 144, 238, 144 ],
		lightgrey : [ 211, 211, 211 ],
		lightpink : [ 255, 182, 193 ],
		lightyellow : [ 255, 255, 224 ],
		lime : [ 0, 255, 0 ],
		magenta : [ 255, 0, 255 ],
		maroon : [ 128, 0, 0 ],
		navy : [ 0, 0, 128 ],
		olive : [ 128, 128, 0 ],
		orange : [ 255, 165, 0 ],
		pink : [ 255, 192, 203 ],
		purple : [ 128, 0, 128 ],
		violet : [ 128, 0, 128 ],
		red : [ 255, 0, 0 ],
		silver : [ 192, 192, 192 ],
		white : [ 255, 255, 255 ],
		yellow : [ 255, 255, 0 ]
	}
})(jQuery);
jQuery.cookie = function(a, c, d) {
	if (arguments.length > 1 && String(c) !== "[object Object]") {
		d = jQuery.extend({}, d);
		if (c === null || c === undefined)
			d.expires = -1;
		if (typeof d.expires === "number") {
			var g = d.expires, f = d.expires = new Date;
			f.setDate(f.getDate() + g)
		}
		c = String(c);
		return document.cookie = [ encodeURIComponent(a), "=",
				d.raw ? c : encodeURIComponent(c),
				d.expires ? "; expires=" + d.expires.toUTCString() : "",
				d.path ? "; path=" + d.path : "",
				d.domain ? "; domain=" + d.domain : "",
				d.secure ? "; secure" : "" ].join("")
	}
	d = c || {};
	f = d.raw ? function(b) {
		return b
	} : decodeURIComponent;
	return (g = (new RegExp("(?:^|; )" + encodeURIComponent(a) + "=([^;]*)"))
			.exec(document.cookie)) ? f(g[1]) : null
};
if (!window.JSON)
	window.JSON = {};
(function() {
	function a(p) {
		return p < 10 ? "0" + p : p
	}
	function c(p) {
		b.lastIndex = 0;
		return b.test(p) ? '"'
				+ p.replace(b, function(s) {
					var o = j[s];
					return typeof o === "string" ? o : "\\u"
							+ ("0000" + s.charCodeAt(0).toString(16)).slice(-4)
				}) + '"' : '"' + p + '"'
	}
	function d(p, s) {
		var o, l, q = e, u, v = s[p];
		if (v && typeof v === "object" && typeof v.toJSON === "function")
			v = v.toJSON(p);
		if (typeof k === "function")
			v = k.call(s, p, v);
		switch (typeof v) {
		case "string":
			return c(v);
		case "number":
			return isFinite(v) ? String(v) : "null";
		case "boolean":
		case "null":
			return String(v);
		case "object":
			if (!v)
				return "null";
			e += h;
			u = [];
			if (Object.prototype.toString.apply(v) === "[object Array]") {
				l = v.length;
				for (p = 0; p < l; p += 1)
					u[p] = d(p, v) || "null";
				s = u.length === 0 ? "[]" : e ? "[\n" + e + u.join(",\n" + e)
						+ "\n" + q + "]" : "[" + u.join(",") + "]";
				e = q;
				return s
			}
			if (k && typeof k === "object") {
				l = k.length;
				for (p = 0; p < l; p += 1) {
					o = k[p];
					if (typeof o === "string")
						if (s = d(o, v))
							u.push(c(o) + (e ? ": " : ":") + s)
				}
			} else
				for (o in v)
					if (Object.hasOwnProperty.call(v, o))
						if (s = d(o, v))
							u.push(c(o) + (e ? ": " : ":") + s);
			s = u.length === 0 ? "{}" : e ? "{\n" + e + u.join(",\n" + e)
					+ "\n" + q + "}" : "{" + u.join(",") + "}";
			e = q;
			return s
		}
	}
	if (typeof Date.prototype.toJSON !== "function") {
		Date.prototype.toJSON = function() {
			return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-"
					+ a(this.getUTCMonth() + 1) + "-" + a(this.getUTCDate())
					+ "T" + a(this.getUTCHours()) + ":"
					+ a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds())
					+ "Z" : null
		};
		String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
			return this.valueOf()
		}
	}
	var g = window.JSON, f = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, b = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, e, h, j = {
		"\u0008" : "\\b",
		"\t" : "\\t",
		"\n" : "\\n",
		"\u000c" : "\\f",
		"\r" : "\\r",
		'"' : '\\"',
		"\\" : "\\\\"
	}, k;
	if (typeof g.stringify !== "function")
		g.stringify = function(p, s, o) {
			var l;
			h = e = "";
			if (typeof o === "number")
				for (l = 0; l < o; l += 1)
					h += " ";
			else if (typeof o === "string")
				h = o;
			if ((k = s) && typeof s !== "function"
					&& (typeof s !== "object" || typeof s.length !== "number"))
				throw new Error("JSON.stringify");
			return d("", {
				"" : p
			})
		};
	if (typeof g.parse !== "function")
		g.parse = function(p, s) {
			function o(l, q) {
				var u, v, z = l[q];
				if (z && typeof z === "object")
					for (u in z)
						if (Object.hasOwnProperty.call(z, u)) {
							v = o(z, u);
							if (v !== undefined)
								z[u] = v;
							else
								delete z[u]
						}
				return s.call(l, q, z)
			}
			p = String(p);
			f.lastIndex = 0;
			if (f.test(p))
				p = p.replace(f, function(l) {
					return "\\u"
							+ ("0000" + l.charCodeAt(0).toString(16)).slice(-4)
				});
			if (/^[\],:{}\s]*$/
					.test(p
							.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
							.replace(
									/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
									"]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
				p = eval("(" + p + ")");
				return typeof s === "function" ? o({
					"" : p
				}, "") : p
			}
			throw new SyntaxError("JSON.parse");
		}
})();
(function() {
	function a(r, w, x) {
		if (r === w)
			return r !== 0 || 1 / r == 1 / w;
		if (r == null || w == null)
			return r === w;
		if (r._chain)
			r = r._wrapped;
		if (w._chain)
			w = w._wrapped;
		if (r.isEqual && m.isFunction(r.isEqual))
			return r.isEqual(w);
		if (w.isEqual && m.isFunction(w.isEqual))
			return w.isEqual(r);
		var C = j.call(r);
		if (C != j.call(w))
			return false;
		switch (C) {
		case "[object String]":
			return r == String(w);
		case "[object Number]":
			return r != +r ? w != +w : r == 0 ? 1 / r == 1 / w : r == +w;
		case "[object Date]":
		case "[object Boolean]":
			return +r == +w;
		case "[object RegExp]":
			return r.source == w.source && r.global == w.global
					&& r.multiline == w.multiline
					&& r.ignoreCase == w.ignoreCase
		}
		if (typeof r != "object" || typeof w != "object")
			return false;
		for ( var G = x.length; G--;)
			if (x[G] == r)
				return true;
		x.push(r);
		G = 0;
		var H = true;
		if (C == "[object Array]") {
			G = r.length;
			if (H = G == w.length)
				for (; G--;)
					if (!(H = G in r == G in w && a(r[G], w[G], x)))
						break
		} else {
			if ("constructor" in r != "constructor" in w
					|| r.constructor != w.constructor)
				return false;
			for ( var I in r)
				if (m.has(r, I)) {
					G++;
					if (!(H = m.has(w, I) && a(r[I], w[I], x)))
						break
				}
			if (H) {
				for (I in w)
					if (m.has(w, I) && !G--)
						break;
				H = !G
			}
		}
		x.pop();
		return H
	}
	var c = this, d = c._, g = {}, f = Array.prototype, b = Object.prototype, e = f.slice, h = f.unshift, j = b.toString, k = b.hasOwnProperty, p = f.forEach, s = f.map, o = f.reduce, l = f.reduceRight, q = f.filter, u = f.every, v = f.some, z = f.indexOf, B = f.lastIndexOf;
	b = Array.isArray;
	var F = Object.keys, n = Function.prototype.bind, m = function(r) {
		return new M(r)
	};
	if (typeof exports !== "undefined") {
		if (typeof module !== "undefined" && module.exports)
			exports = module.exports = m;
		exports._ = m
	} else
		c._ = m;
	m.VERSION = "1.3.1";
	var y = m.each = m.forEach = function(r, w, x) {
		if (r != null)
			if (p && r.forEach === p)
				r.forEach(w, x);
			else if (r.length === +r.length)
				for ( var C = 0, G = r.length; C < G; C++) {
					if (C in r && w.call(x, r[C], C, r) === g)
						return
				}
			else
				for (C in r)
					if (m.has(r, C))
						if (w.call(x, r[C], C, r) === g)
							return
	};
	m.map = m.collect = function(r, w, x) {
		var C = [];
		if (r == null)
			return C;
		if (s && r.map === s)
			return r.map(w, x);
		y(r, function(G, H, I) {
			C[C.length] = w.call(x, G, H, I)
		});
		if (r.length === +r.length)
			C.length = r.length;
		return C
	};
	m.reduce = m.foldl = m.inject = function(r, w, x, C) {
		var G = arguments.length > 2;
		if (r == null)
			r = [];
		if (o && r.reduce === o) {
			if (C)
				w = m.bind(w, C);
			return G ? r.reduce(w, x) : r.reduce(w)
		}
		y(r, function(H, I, J) {
			if (G)
				x = w.call(C, x, H, I, J);
			else {
				x = H;
				G = true
			}
		});
		if (!G)
			throw new TypeError("Reduce of empty array with no initial value");
		return x
	};
	m.reduceRight = m.foldr = function(r, w, x, C) {
		var G = arguments.length > 2;
		if (r == null)
			r = [];
		if (l && r.reduceRight === l) {
			if (C)
				w = m.bind(w, C);
			return G ? r.reduceRight(w, x) : r.reduceRight(w)
		}
		var H = m.toArray(r).reverse();
		if (C && !G)
			w = m.bind(w, C);
		return G ? m.reduce(H, w, x, C) : m.reduce(H, w)
	};
	m.find = m.detect = function(r, w, x) {
		var C;
		A(r, function(G, H, I) {
			if (w.call(x, G, H, I)) {
				C = G;
				return true
			}
		});
		return C
	};
	m.filter = m.select = function(r, w, x) {
		var C = [];
		if (r == null)
			return C;
		if (q && r.filter === q)
			return r.filter(w, x);
		y(r, function(G, H, I) {
			if (w.call(x, G, H, I))
				C[C.length] = G
		});
		return C
	};
	m.reject = function(r, w, x) {
		var C = [];
		if (r == null)
			return C;
		y(r, function(G, H, I) {
			w.call(x, G, H, I) || (C[C.length] = G)
		});
		return C
	};
	m.every = m.all = function(r, w, x) {
		var C = true;
		if (r == null)
			return C;
		if (u && r.every === u)
			return r.every(w, x);
		y(r, function(G, H, I) {
			if (!(C = C && w.call(x, G, H, I)))
				return g
		});
		return C
	};
	var A = m.some = m.any = function(r, w, x) {
		w || (w = m.identity);
		var C = false;
		if (r == null)
			return C;
		if (v && r.some === v)
			return r.some(w, x);
		y(r, function(G, H, I) {
			if (C || (C = w.call(x, G, H, I)))
				return g
		});
		return !!C
	};
	m.include = m.contains = function(r, w) {
		var x = false;
		if (r == null)
			return x;
		if (z && r.indexOf === z)
			return r.indexOf(w) != -1;
		return x = A(r, function(C) {
			return C === w
		})
	};
	m.invoke = function(r, w) {
		var x = e.call(arguments, 2);
		return m.map(r, function(C) {
			return (m.isFunction(w) ? w || C : C[w]).apply(C, x)
		})
	};
	m.pluck = function(r, w) {
		return m.map(r, function(x) {
			return x[w]
		})
	};
	m.max = function(r, w, x) {
		if (!w && m.isArray(r))
			return Math.max.apply(Math, r);
		if (!w && m.isEmpty(r))
			return -Infinity;
		var C = {
			computed : -Infinity
		};
		y(r, function(G, H, I) {
			H = w ? w.call(x, G, H, I) : G;
			H >= C.computed && (C = {
				value : G,
				computed : H
			})
		});
		return C.value
	};
	m.min = function(r, w, x) {
		if (!w && m.isArray(r))
			return Math.min.apply(Math, r);
		if (!w && m.isEmpty(r))
			return Infinity;
		var C = {
			computed : Infinity
		};
		y(r, function(G, H, I) {
			H = w ? w.call(x, G, H, I) : G;
			H < C.computed && (C = {
				value : G,
				computed : H
			})
		});
		return C.value
	};
	m.shuffle = function(r) {
		var w = [], x;
		y(r, function(C, G) {
			if (G == 0)
				w[0] = C;
			else {
				x = Math.floor(Math.random() * (G + 1));
				w[G] = w[x];
				w[x] = C
			}
		});
		return w
	};
	m.sortBy = function(r, w, x) {
		return m.pluck(m.map(r, function(C, G, H) {
			return {
				value : C,
				criteria : w.call(x, C, G, H)
			}
		}).sort(function(C, G) {
			C = C.criteria;
			G = G.criteria;
			return C < G ? -1 : C > G ? 1 : 0
		}), "value")
	};
	m.groupBy = function(r, w) {
		var x = {}, C = m.isFunction(w) ? w : function(G) {
			return G[w]
		};
		y(r, function(G, H) {
			H = C(G, H);
			(x[H] || (x[H] = [])).push(G)
		});
		return x
	};
	m.sortedIndex = function(r, w, x) {
		x || (x = m.identity);
		for ( var C = 0, G = r.length; C < G;) {
			var H = C + G >> 1;
			x(r[H]) < x(w) ? (C = H + 1) : (G = H)
		}
		return C
	};
	m.toArray = function(r) {
		if (!r)
			return [];
		if (r.toArray)
			return r.toArray();
		if (m.isArray(r))
			return e.call(r);
		if (m.isArguments(r))
			return e.call(r);
		return m.values(r)
	};
	m.size = function(r) {
		return m.toArray(r).length
	};
	m.first = m.head = function(r, w, x) {
		return w != null && !x ? e.call(r, 0, w) : r[0]
	};
	m.initial = function(r, w, x) {
		return e.call(r, 0, r.length - (w == null || x ? 1 : w))
	};
	m.last = function(r, w, x) {
		return w != null && !x ? e.call(r, Math.max(r.length - w, 0))
				: r[r.length - 1]
	};
	m.rest = m.tail = function(r, w, x) {
		return e.call(r, w == null || x ? 1 : w)
	};
	m.compact = function(r) {
		return m.filter(r, function(w) {
			return !!w
		})
	};
	m.flatten = function(r, w) {
		return m.reduce(r, function(x, C) {
			if (m.isArray(C))
				return x.concat(w ? C : m.flatten(C));
			x[x.length] = C;
			return x
		}, [])
	};
	m.without = function(r) {
		return m.difference(r, e.call(arguments, 1))
	};
	m.uniq = m.unique = function(r, w, x) {
		x = x ? m.map(r, x) : r;
		var C = [];
		m.reduce(x, function(G, H, I) {
			if (0 == I || (w === true ? m.last(G) != H : !m.include(G, H))) {
				G[G.length] = H;
				C[C.length] = r[I]
			}
			return G
		}, []);
		return C
	};
	m.union = function() {
		return m.uniq(m.flatten(arguments, true))
	};
	m.intersection = m.intersect = function(r) {
		var w = e.call(arguments, 1);
		return m.filter(m.uniq(r), function(x) {
			return m.every(w, function(C) {
				return m.indexOf(C, x) >= 0
			})
		})
	};
	m.difference = function(r) {
		var w = m.flatten(e.call(arguments, 1));
		return m.filter(r, function(x) {
			return !m.include(w, x)
		})
	};
	m.zip = function() {
		for ( var r = e.call(arguments), w = m.max(m.pluck(r, "length")), x = new Array(
				w), C = 0; C < w; C++)
			x[C] = m.pluck(r, "" + C);
		return x
	};
	m.indexOf = function(r, w, x) {
		if (r == null)
			return -1;
		var C;
		if (x) {
			x = m.sortedIndex(r, w);
			return r[x] === w ? x : -1
		}
		if (z && r.indexOf === z)
			return r.indexOf(w);
		x = 0;
		for (C = r.length; x < C; x++)
			if (x in r && r[x] === w)
				return x;
		return -1
	};
	m.lastIndexOf = function(r, w) {
		if (r == null)
			return -1;
		if (B && r.lastIndexOf === B)
			return r.lastIndexOf(w);
		for ( var x = r.length; x--;)
			if (x in r && r[x] === w)
				return x;
		return -1
	};
	m.range = function(r, w, x) {
		if (arguments.length <= 1) {
			w = r || 0;
			r = 0
		}
		x = arguments[2] || 1;
		for ( var C = Math.max(Math.ceil((w - r) / x), 0), G = 0, H = new Array(
				C); G < C;) {
			H[G++] = r;
			r += x
		}
		return H
	};
	var D = function() {
	};
	m.bind = function(r, w) {
		var x, C;
		if (r.bind === n && n)
			return n.apply(r, e.call(arguments, 1));
		if (!m.isFunction(r))
			throw new TypeError;
		C = e.call(arguments, 2);
		return x = function() {
			if (!(this instanceof x))
				return r.apply(w, C.concat(e.call(arguments)));
			D.prototype = r.prototype;
			var G = new D, H = r.apply(G, C.concat(e.call(arguments)));
			if (Object(H) === H)
				return H;
			return G
		}
	};
	m.bindAll = function(r) {
		var w = e.call(arguments, 1);
		if (w.length == 0)
			w = m.functions(r);
		y(w, function(x) {
			r[x] = m.bind(r[x], r)
		});
		return r
	};
	m.memoize = function(r, w) {
		var x = {};
		w || (w = m.identity);
		return function() {
			var C = w.apply(this, arguments);
			return m.has(x, C) ? x[C] : (x[C] = r.apply(this, arguments))
		}
	};
	m.delay = function(r, w) {
		var x = e.call(arguments, 2);
		return setTimeout(function() {
			return r.apply(r, x)
		}, w)
	};
	m.defer = function(r) {
		return m.delay.apply(m, [ r, 1 ].concat(e.call(arguments, 1)))
	};
	m.throttle = function(r, w) {
		var x, C, G, H, I, J = m.debounce(function() {
			I = H = false
		}, w);
		return function() {
			x = this;
			C = arguments;
			var N = function() {
				G = null;
				I && r.apply(x, C);
				J()
			};
			G || (G = setTimeout(N, w));
			if (H)
				I = true;
			else
				r.apply(x, C);
			J();
			H = true
		}
	};
	m.debounce = function(r, w) {
		var x;
		return function() {
			var C = this, G = arguments;
			clearTimeout(x);
			x = setTimeout(function() {
				x = null;
				r.apply(C, G)
			}, w)
		}
	};
	m.once = function(r) {
		var w = false, x;
		return function() {
			if (w)
				return x;
			w = true;
			return x = r.apply(this, arguments)
		}
	};
	m.wrap = function(r, w) {
		return function() {
			var x = [ r ].concat(e.call(arguments, 0));
			return w.apply(this, x)
		}
	};
	m.compose = function() {
		var r = arguments;
		return function() {
			for ( var w = arguments, x = r.length - 1; x >= 0; x--)
				w = [ r[x].apply(this, w) ];
			return w[0]
		}
	};
	m.after = function(r, w) {
		if (r <= 0)
			return w();
		return function() {
			if (--r < 1)
				return w.apply(this, arguments)
		}
	};
	m.keys = F || function(r) {
		if (r !== Object(r))
			throw new TypeError("Invalid object");
		var w = [];
		for ( var x in r)
			if (m.has(r, x))
				w[w.length] = x;
		return w
	};
	m.values = function(r) {
		return m.map(r, m.identity)
	};
	m.functions = m.methods = function(r) {
		var w = [];
		for ( var x in r)
			m.isFunction(r[x]) && w.push(x);
		return w.sort()
	};
	m.extend = function(r) {
		y(e.call(arguments, 1), function(w) {
			for ( var x in w)
				r[x] = w[x]
		});
		return r
	};
	m.defaults = function(r) {
		y(e.call(arguments, 1), function(w) {
			for ( var x in w)
				if (r[x] == null)
					r[x] = w[x]
		});
		return r
	};
	m.clone = function(r) {
		if (!m.isObject(r))
			return r;
		return m.isArray(r) ? r.slice() : m.extend({}, r)
	};
	m.tap = function(r, w) {
		w(r);
		return r
	};
	m.isEqual = function(r, w) {
		return a(r, w, [])
	};
	m.isEmpty = function(r) {
		if (m.isArray(r) || m.isString(r))
			return r.length === 0;
		for ( var w in r)
			if (m.has(r, w))
				return false;
		return true
	};
	m.isElement = function(r) {
		return !!(r && r.nodeType == 1)
	};
	m.isArray = b || function(r) {
		return j.call(r) == "[object Array]"
	};
	m.isObject = function(r) {
		return r === Object(r)
	};
	m.isArguments = function(r) {
		return j.call(r) == "[object Arguments]"
	};
	if (!m.isArguments(arguments))
		m.isArguments = function(r) {
			return !!(r && m.has(r, "callee"))
		};
	m.isFunction = function(r) {
		return j.call(r) == "[object Function]"
	};
	m.isString = function(r) {
		return j.call(r) == "[object String]"
	};
	m.isNumber = function(r) {
		return j.call(r) == "[object Number]"
	};
	m.isNaN = function(r) {
		return r !== r
	};
	m.isBoolean = function(r) {
		return r === true || r === false || j.call(r) == "[object Boolean]"
	};
	m.isDate = function(r) {
		return j.call(r) == "[object Date]"
	};
	m.isRegExp = function(r) {
		return j.call(r) == "[object RegExp]"
	};
	m.isNull = function(r) {
		return r === null
	};
	m.isUndefined = function(r) {
		return r === void 0
	};
	m.has = function(r, w) {
		return k.call(r, w)
	};
	m.noConflict = function() {
		c._ = d;
		return this
	};
	m.identity = function(r) {
		return r
	};
	m.times = function(r, w, x) {
		for ( var C = 0; C < r; C++)
			w.call(x, C)
	};
	m.escape = function(r) {
		return ("" + r).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(
				/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;")
				.replace(/\//g, "&#x2F;")
	};
	m.mixin = function(r) {
		y(m.functions(r), function(w) {
			R(w, m[w] = r[w])
		})
	};
	var E = 0;
	m.uniqueId = function(r) {
		var w = E++;
		return r ? r + w : w
	};
	m.templateSettings = {
		evaluate : /<%([\s\S]+?)%>/g,
		interpolate : /<%=([\s\S]+?)%>/g,
		escape : /<%-([\s\S]+?)%>/g
	};
	var K = /.^/, L = function(r) {
		return r.replace(/\\\\/g, "\\").replace(/\\'/g, "'")
	};
	m.template = function(r, w) {
		var x = m.templateSettings;
		r = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('"
				+ r.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(
						x.escape || K, function(G, H) {
							return "',_.escape(" + L(H) + "),'"
						}).replace(x.interpolate || K, function(G, H) {
					return "'," + L(H) + ",'"
				}).replace(
						x.evaluate || K,
						function(G, H) {
							return "');" + L(H).replace(/[\r\n\t]/g, " ")
									+ ";__p.push('"
						}).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(
						/\t/g, "\\t") + "');}return __p.join('');";
		var C = new Function("obj", "_", r);
		if (w)
			return C(w, m);
		return function(G) {
			return C.call(this, G, m)
		}
	};
	m.chain = function(r) {
		return m(r).chain()
	};
	var M = function(r) {
		this._wrapped = r
	};
	m.prototype = M.prototype;
	var P = function(r, w) {
		return w ? m(r).chain() : r
	}, R = function(r, w) {
		M.prototype[r] = function() {
			var x = e.call(arguments);
			h.call(x, this._wrapped);
			return P(w.apply(m, x), this._chain)
		}
	};
	m.mixin(m);
	y([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ],
			function(r) {
				var w = f[r];
				M.prototype[r] = function() {
					var x = this._wrapped;
					w.apply(x, arguments);
					var C = x.length;
					if ((r == "shift" || r == "splice") && C === 0)
						delete x[0];
					return P(x, this._chain)
				}
			});
	y([ "concat", "join", "slice" ], function(r) {
		var w = f[r];
		M.prototype[r] = function() {
			return P(w.apply(this._wrapped, arguments), this._chain)
		}
	});
	M.prototype.chain = function() {
		this._chain = true;
		return this
	};
	M.prototype.value = function() {
		return this._wrapped
	}
}).call(this);
(function() {
	var a = this, c = a.Backbone, d = Array.prototype.slice, g = Array.prototype.splice, f;
	f = typeof exports !== "undefined" ? exports : (a.Backbone = {});
	f.VERSION = "0.9.1";
	var b = a._;
	if (!b && typeof require !== "undefined")
		b = require("underscore");
	var e = a.jQuery || a.Zepto || a.ender;
	f.setDomLibrary = function(n) {
		e = n
	};
	f.noConflict = function() {
		a.Backbone = c;
		return this
	};
	f.emulateHTTP = false;
	f.emulateJSON = false;
	f.Events = {
		on : function(n, m, y) {
			var A;
			n = n.split(/\s+/);
			for ( var D = this._callbacks || (this._callbacks = {}); A = n
					.shift();) {
				A = D[A] || (D[A] = {});
				var E = A.tail || (A.tail = A.next = {});
				E.callback = m;
				E.context = y;
				A.tail = E.next = {}
			}
			return this
		},
		off : function(n, m, y) {
			var A, D, E;
			if (n) {
				if (D = this._callbacks)
					for (n = n.split(/\s+/); A = n.shift();) {
						E = D[A];
						delete D[A];
						if (m && E)
							for (; (E = E.next) && E.next;)
								E.callback === m && (!y || E.context === y)
										|| this.on(A, E.callback, E.context)
					}
			} else
				delete this._callbacks;
			return this
		},
		trigger : function(n) {
			var m, y, A, D;
			if (!(y = this._callbacks))
				return this;
			A = y.all;
			for ((n = n.split(/\s+/)).push(null); m = n.shift();) {
				A && n.push({
					next : A.next,
					tail : A.tail,
					event : m
				});
				if (m = y[m])
					n.push({
						next : m.next,
						tail : m.tail
					})
			}
			for (D = d.call(arguments, 1); m = n.pop();) {
				y = m.tail;
				for (A = m.event ? [ m.event ].concat(D) : D; (m = m.next) !== y;)
					m.callback.apply(m.context || this, A)
			}
			return this
		}
	};
	f.Events.bind = f.Events.on;
	f.Events.unbind = f.Events.off;
	f.Model = function(n, m) {
		var y;
		n || (n = {});
		if (m && m.parse)
			n = this.parse(n);
		if (y = B(this, "defaults"))
			n = b.extend({}, y, n);
		if (m && m.collection)
			this.collection = m.collection;
		this.attributes = {};
		this._escapedAttributes = {};
		this.cid = b.uniqueId("c");
		if (!this.set(n, {
			silent : true
		}))
			throw new Error("Can't create an invalid model");
		delete this._changed;
		this._previousAttributes = b.clone(this.attributes);
		this.initialize.apply(this, arguments)
	};
	b
			.extend(
					f.Model.prototype,
					f.Events,
					{
						idAttribute : "id",
						initialize : function() {
						},
						toJSON : function() {
							return b.clone(this.attributes)
						},
						get : function(n) {
							return this.attributes[n]
						},
						escape : function(n) {
							var m;
							if (m = this._escapedAttributes[n])
								return m;
							m = this.attributes[n];
							return this._escapedAttributes[n] = b
									.escape(m == null ? "" : "" + m)
						},
						has : function(n) {
							return this.attributes[n] != null
						},
						set : function(n, m, y) {
							var A, D;
							if (b.isObject(n) || n == null) {
								A = n;
								y = m
							} else {
								A = {};
								A[n] = m
							}
							y || (y = {});
							if (!A)
								return this;
							if (A instanceof f.Model)
								A = A.attributes;
							if (y.unset)
								for (D in A)
									A[D] = void 0;
							if (!this._validate(A, y))
								return false;
							if (this.idAttribute in A)
								this.id = A[this.idAttribute];
							m = this.attributes;
							var E = this._escapedAttributes, K = this._previousAttributes
									|| {}, L = this._setting;
							this._changed || (this._changed = {});
							this._setting = true;
							for (D in A) {
								n = A[D];
								b.isEqual(m[D], n) || delete E[D];
								y.unset ? delete m[D] : (m[D] = n);
								if (this._changing
										&& !b.isEqual(this._changed[D], n)) {
									this.trigger("change:" + D, this, n, y);
									this._moreChanges = true
								}
								delete this._changed[D];
								if (!b.isEqual(K[D], n)
										|| b.has(m, D) != b.has(K, D))
									this._changed[D] = n
							}
							if (!L) {
								!y.silent && this.hasChanged()
										&& this.change(y);
								this._setting = false
							}
							return this
						},
						unset : function(n, m) {
							(m || (m = {})).unset = true;
							return this.set(n, null, m)
						},
						clear : function(n) {
							(n || (n = {})).unset = true;
							return this.set(b.clone(this.attributes), n)
						},
						fetch : function(n) {
							n = n ? b.clone(n) : {};
							var m = this, y = n.success;
							n.success = function(A, D, E) {
								if (!m.set(m.parse(A, E), n))
									return false;
								y && y(m, A)
							};
							n.error = f.wrapError(n.error, m, n);
							return (this.sync || f.sync).call(this, "read",
									this, n)
						},
						save : function(n, m, y) {
							var A, D;
							if (b.isObject(n) || n == null) {
								A = n;
								y = m
							} else {
								A = {};
								A[n] = m
							}
							y = y ? b.clone(y) : {};
							if (y.wait)
								D = b.clone(this.attributes);
							n = b.extend({}, y, {
								silent : true
							});
							if (A && !this.set(A, y.wait ? n : y))
								return false;
							var E = this, K = y.success;
							y.success = function(L, M, P) {
								M = E.parse(L, P);
								if (y.wait)
									M = b.extend(A || {}, M);
								if (!E.set(M, y))
									return false;
								K ? K(E, L) : E.trigger("sync", E, L, y)
							};
							y.error = f.wrapError(y.error, E, y);
							m = this.isNew() ? "create" : "update";
							m = (this.sync || f.sync).call(this, m, this, y);
							y.wait && this.set(D, n);
							return m
						},
						destroy : function(n) {
							n = n ? b.clone(n) : {};
							var m = this, y = n.success, A = function() {
								m.trigger("destroy", m, m.collection, n)
							};
							if (this.isNew())
								return A();
							n.success = function(E) {
								n.wait && A();
								y ? y(m, E) : m.trigger("sync", m, E, n)
							};
							n.error = f.wrapError(n.error, m, n);
							var D = (this.sync || f.sync).call(this, "delete",
									this, n);
							n.wait || A();
							return D
						},
						url : function() {
							var n = B(this.collection, "url")
									|| B(this, "urlRoot") || F();
							if (this.isNew())
								return n;
							return n
									+ (n.charAt(n.length - 1) == "/" ? "" : "/")
									+ encodeURIComponent(this.id)
						},
						parse : function(n) {
							return n
						},
						clone : function() {
							return new this.constructor(this.attributes)
						},
						isNew : function() {
							return this.id == null
						},
						change : function(n) {
							if (this._changing || !this.hasChanged())
								return this;
							this._moreChanges = this._changing = true;
							for ( var m in this._changed)
								this.trigger("change:" + m, this,
										this._changed[m], n);
							for (; this._moreChanges;) {
								this._moreChanges = false;
								this.trigger("change", this, n)
							}
							this._previousAttributes = b.clone(this.attributes);
							delete this._changed;
							this._changing = false;
							return this
						},
						hasChanged : function(n) {
							if (!arguments.length)
								return !b.isEmpty(this._changed);
							return this._changed && b.has(this._changed, n)
						},
						changedAttributes : function(n) {
							if (!n)
								return this.hasChanged() ? b
										.clone(this._changed) : false;
							var m, y = false, A = this._previousAttributes;
							for ( var D in n)
								if (!b.isEqual(A[D], m = n[D]))
									(y || (y = {}))[D] = m;
							return y
						},
						previous : function(n) {
							if (!arguments.length || !this._previousAttributes)
								return null;
							return this._previousAttributes[n]
						},
						previousAttributes : function() {
							return b.clone(this._previousAttributes)
						},
						isValid : function() {
							return !this.validate(this.attributes)
						},
						_validate : function(n, m) {
							if (m.silent || !this.validate)
								return true;
							n = b.extend({}, this.attributes, n);
							n = this.validate(n, m);
							if (!n)
								return true;
							m && m.error ? m.error(this, n, m) : this.trigger(
									"error", this, n, m);
							return false
						}
					});
	f.Collection = function(n, m) {
		m || (m = {});
		if (m.comparator)
			this.comparator = m.comparator;
		this._reset();
		this.initialize.apply(this, arguments);
		n && this.reset(n, {
			silent : true,
			parse : m.parse
		})
	};
	b.extend(f.Collection.prototype, f.Events, {
		model : f.Model,
		initialize : function() {
		},
		toJSON : function() {
			return this.map(function(n) {
				return n.toJSON()
			})
		},
		add : function(n, m) {
			var y, A, D, E, K, L = {}, M = {};
			m || (m = {});
			n = b.isArray(n) ? n.slice() : [ n ];
			y = 0;
			for (A = n.length; y < A; y++) {
				if (!(D = n[y] = this._prepareModel(n[y], m)))
					throw new Error(
							"Can't add an invalid model to a collection");
				if (L[E = D.cid] || this._byCid[E] || (K = D.id) != null
						&& (M[K] || this._byId[K]))
					throw new Error(
							"Can't add the same model to a collection twice");
				L[E] = M[K] = D
			}
			for (y = 0; y < A; y++) {
				(D = n[y]).on("all", this._onModelEvent, this);
				this._byCid[D.cid] = D;
				if (D.id != null)
					this._byId[D.id] = D
			}
			this.length += A;
			g.apply(this.models,
					[ m.at != null ? m.at : this.models.length, 0 ].concat(n));
			this.comparator && this.sort({
				silent : true
			});
			if (m.silent)
				return this;
			y = 0;
			for (A = this.models.length; y < A; y++)
				if (L[(D = this.models[y]).cid]) {
					m.index = y;
					D.trigger("add", D, this, m)
				}
			return this
		},
		remove : function(n, m) {
			var y, A, D, E;
			m || (m = {});
			n = b.isArray(n) ? n.slice() : [ n ];
			y = 0;
			for (A = n.length; y < A; y++)
				if (E = this.getByCid(n[y]) || this.get(n[y])) {
					delete this._byId[E.id];
					delete this._byCid[E.cid];
					D = this.indexOf(E);
					this.models.splice(D, 1);
					this.length--;
					if (!m.silent) {
						m.index = D;
						E.trigger("remove", E, this, m)
					}
					this._removeReference(E)
				}
			return this
		},
		get : function(n) {
			if (n == null)
				return null;
			return this._byId[n.id != null ? n.id : n]
		},
		getByCid : function(n) {
			return n && this._byCid[n.cid || n]
		},
		at : function(n) {
			return this.models[n]
		},
		sort : function(n) {
			n || (n = {});
			if (!this.comparator)
				throw new Error("Cannot sort a set without a comparator");
			var m = b.bind(this.comparator, this);
			if (this.comparator.length == 1)
				this.models = this.sortBy(m);
			else
				this.models.sort(m);
			n.silent || this.trigger("reset", this, n);
			return this
		},
		pluck : function(n) {
			return b.map(this.models, function(m) {
				return m.get(n)
			})
		},
		reset : function(n, m) {
			n || (n = []);
			m || (m = {});
			for ( var y = 0, A = this.models.length; y < A; y++)
				this._removeReference(this.models[y]);
			this._reset();
			this.add(n, {
				silent : true,
				parse : m.parse
			});
			m.silent || this.trigger("reset", this, m);
			return this
		},
		fetch : function(n) {
			n = n ? b.clone(n) : {};
			if (n.parse === undefined)
				n.parse = true;
			var m = this, y = n.success;
			n.success = function(A, D, E) {
				m[n.add ? "add" : "reset"](m.parse(A, E), n);
				y && y(m, A)
			};
			n.error = f.wrapError(n.error, m, n);
			return (this.sync || f.sync).call(this, "read", this, n)
		},
		create : function(n, m) {
			var y = this;
			m = m ? b.clone(m) : {};
			n = this._prepareModel(n, m);
			if (!n)
				return false;
			m.wait || y.add(n, m);
			var A = m.success;
			m.success = function(D, E) {
				m.wait && y.add(D, m);
				A ? A(D, E) : D.trigger("sync", n, E, m)
			};
			n.save(null, m);
			return n
		},
		parse : function(n) {
			return n
		},
		chain : function() {
			return b(this.models).chain()
		},
		_reset : function() {
			this.length = 0;
			this.models = [];
			this._byId = {};
			this._byCid = {}
		},
		_prepareModel : function(n, m) {
			if (n instanceof f.Model) {
				if (!n.collection)
					n.collection = this
			} else {
				n = n;
				m.collection = this;
				n = new this.model(n, m);
				n._validate(n.attributes, m) || (n = false)
			}
			return n
		},
		_removeReference : function(n) {
			this == n.collection && delete n.collection;
			n.off("all", this._onModelEvent, this)
		},
		_onModelEvent : function(n, m, y, A) {
			if (!((n == "add" || n == "remove") && y != this)) {
				n == "destroy" && this.remove(m, A);
				if (m && n === "change:" + m.idAttribute) {
					delete this._byId[m.previous(m.idAttribute)];
					this._byId[m.id] = m
				}
				this.trigger.apply(this, arguments)
			}
		}
	});
	b.each([ "forEach", "each", "map", "reduce", "reduceRight", "find",
			"detect", "filter", "select", "reject", "every", "all", "some",
			"any", "include", "contains", "invoke", "max", "min", "sortBy",
			"sortedIndex", "toArray", "size", "first", "initial", "rest",
			"last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty",
			"groupBy" ], function(n) {
		f.Collection.prototype[n] = function() {
			return b[n].apply(b, [ this.models ].concat(b.toArray(arguments)))
		}
	});
	f.Router = function(n) {
		n || (n = {});
		if (n.routes)
			this.routes = n.routes;
		this._bindRoutes();
		this.initialize.apply(this, arguments)
	};
	var h = /:\w+/g, j = /\*\w+/g, k = /[-[\]{}()+?.,\\^$|#\s]/g;
	b.extend(f.Router.prototype, f.Events, {
		initialize : function() {
		},
		route : function(n, m, y) {
			f.history || (f.history = new f.History);
			b.isRegExp(n) || (n = this._routeToRegExp(n));
			y || (y = this[m]);
			f.history.route(n, b.bind(function(A) {
				A = this._extractParameters(n, A);
				y && y.apply(this, A);
				this.trigger.apply(this, [ "route:" + m ].concat(A));
				f.history.trigger("route", this, m, A)
			}, this));
			return this
		},
		navigate : function(n, m) {
			f.history.navigate(n, m)
		},
		_bindRoutes : function() {
			if (this.routes) {
				var n = [];
				for ( var m in this.routes)
					n.unshift([ m, this.routes[m] ]);
				m = 0;
				for ( var y = n.length; m < y; m++)
					this.route(n[m][0], n[m][1], this[n[m][1]])
			}
		},
		_routeToRegExp : function(n) {
			n = n.replace(k, "\\$&").replace(h, "([^/]+)").replace(j, "(.*?)");
			return new RegExp("^" + n + "$")
		},
		_extractParameters : function(n, m) {
			return n.exec(m).slice(1)
		}
	});
	f.History = function() {
		this.handlers = [];
		b.bindAll(this, "checkUrl")
	};
	var p = /^[#\/]/, s = /msie [\w.]+/, o = false;
	b
			.extend(
					f.History.prototype,
					f.Events,
					{
						interval : 50,
						getFragment : function(n, m) {
							if (n == null)
								if (this._hasPushState || m) {
									n = window.location.pathname;
									if (m = window.location.search)
										n += m
								} else
									n = window.location.hash;
							n = decodeURIComponent(n);
							n.indexOf(this.options.root)
									|| (n = n.substr(this.options.root.length));
							return n.replace(p, "")
						},
						start : function(n) {
							if (o)
								throw new Error(
										"Backbone.history has already been started");
							this.options = b.extend({}, {
								root : "/"
							}, this.options, n);
							this._wantsHashChange = this.options.hashChange !== false;
							this._wantsPushState = !!this.options.pushState;
							this._hasPushState = !!(this.options.pushState
									&& window.history && window.history.pushState);
							n = this.getFragment();
							var m = document.documentMode;
							if (m = s.exec(navigator.userAgent.toLowerCase())
									&& (!m || m <= 7)) {
								this.iframe = e(
										'<iframe src="javascript:0" tabindex="-1" />')
										.hide().appendTo("body")[0].contentWindow;
								this.navigate(n)
							}
							if (this._hasPushState)
								e(window).bind("popstate", this.checkUrl);
							else if (this._wantsHashChange
									&& "onhashchange" in window && !m)
								e(window).bind("hashchange", this.checkUrl);
							else if (this._wantsHashChange)
								this._checkUrlInterval = setInterval(
										this.checkUrl, this.interval);
							this.fragment = n;
							o = true;
							n = window.location;
							m = n.pathname == this.options.root;
							if (this._wantsHashChange && this._wantsPushState
									&& !this._hasPushState && !m) {
								this.fragment = this.getFragment(null, true);
								window.location.replace(this.options.root + "#"
										+ this.fragment);
								return true
							} else if (this._wantsPushState
									&& this._hasPushState && m && n.hash) {
								this.fragment = n.hash.replace(p, "");
								window.history.replaceState({}, document.title,
										n.protocol + "//" + n.host
												+ this.options.root
												+ this.fragment)
							}
							if (!this.options.silent)
								return this.loadUrl()
						},
						stop : function() {
							e(window).unbind("popstate", this.checkUrl).unbind(
									"hashchange", this.checkUrl);
							clearInterval(this._checkUrlInterval);
							o = false
						},
						route : function(n, m) {
							this.handlers.unshift({
								route : n,
								callback : m
							})
						},
						checkUrl : function() {
							var n = this.getFragment();
							if (n == this.fragment && this.iframe)
								n = this.getFragment(this.iframe.location.hash);
							if (n == this.fragment
									|| n == decodeURIComponent(this.fragment))
								return false;
							this.iframe && this.navigate(n);
							this.loadUrl()
									|| this.loadUrl(window.location.hash)
						},
						loadUrl : function(n) {
							var m = this.fragment = this.getFragment(n);
							return b.any(this.handlers, function(y) {
								if (y.route.test(m)) {
									y.callback(m);
									return true
								}
							})
						},
						navigate : function(n, m) {
							if (!o)
								return false;
							if (!m || m === true)
								m = {
									trigger : m
								};
							var y = (n || "").replace(p, "");
							if (!(this.fragment == y || this.fragment == decodeURIComponent(y))) {
								if (this._hasPushState) {
									if (y.indexOf(this.options.root) != 0)
										y = this.options.root + y;
									this.fragment = y;
									window.history[m.replace ? "replaceState"
											: "pushState"]({}, document.title,
											y)
								} else if (this._wantsHashChange) {
									this.fragment = y;
									this._updateHash(window.location, y,
											m.replace);
									if (this.iframe
											&& y != this
													.getFragment(this.iframe.location.hash)) {
										m.replace
												|| this.iframe.document.open()
														.close();
										this._updateHash(this.iframe.location,
												y, m.replace)
									}
								} else
									window.location.assign(this.options.root
											+ n);
								m.trigger && this.loadUrl(n)
							}
						},
						_updateHash : function(n, m, y) {
							if (y)
								n.replace(n.toString().replace(
										/(javascript:|#).*$/, "")
										+ "#" + m);
							else
								n.hash = m
						}
					});
	f.View = function(n) {
		this.cid = b.uniqueId("view");
		this._configure(n || {});
		this._ensureElement();
		this.initialize.apply(this, arguments);
		this.delegateEvents()
	};
	var l = /^(\S+)\s*(.*)$/, q = [ "model", "collection", "el", "id",
			"attributes", "className", "tagName" ];
	b.extend(f.View.prototype, f.Events, {
		tagName : "div",
		$ : function(n) {
			return this.$el.find(n)
		},
		initialize : function() {
		},
		render : function() {
			return this
		},
		remove : function() {
			this.$el.remove();
			return this
		},
		make : function(n, m, y) {
			n = document.createElement(n);
			m && e(n).attr(m);
			y && e(n).html(y);
			return n
		},
		setElement : function(n, m) {
			this.$el = e(n);
			this.el = this.$el[0];
			m !== false && this.delegateEvents();
			return this
		},
		delegateEvents : function(n) {
			if (n || (n = B(this, "events"))) {
				this.undelegateEvents();
				for ( var m in n) {
					var y = n[m];
					b.isFunction(y) || (y = this[n[m]]);
					if (!y)
						throw new Error('Event "' + n[m] + '" does not exist');
					var A = m.match(l), D = A[1];
					A = A[2];
					y = b.bind(y, this);
					D += ".delegateEvents" + this.cid;
					A === "" ? this.$el.bind(D, y) : this.$el.delegate(A, D, y)
				}
			}
		},
		undelegateEvents : function() {
			this.$el.unbind(".delegateEvents" + this.cid)
		},
		_configure : function(n) {
			if (this.options)
				n = b.extend({}, this.options, n);
			for ( var m = 0, y = q.length; m < y; m++) {
				var A = q[m];
				if (n[A])
					this[A] = n[A]
			}
			this.options = n
		},
		_ensureElement : function() {
			if (this.el)
				this.setElement(this.el, false);
			else {
				var n = B(this, "attributes") || {};
				if (this.id)
					n.id = this.id;
				if (this.className)
					n["class"] = this.className;
				this.setElement(this.make(this.tagName, n), false)
			}
		}
	});
	f.Model.extend = f.Collection.extend = f.Router.extend = f.View.extend = function(
			n, m) {
		n = z(this, n, m);
		n.extend = this.extend;
		return n
	};
	var u = {
		create : "POST",
		update : "PUT",
		"delete" : "DELETE",
		read : "GET"
	};
	f.sync = function(n, m, y) {
		var A = u[n], D = {
			type : A,
			dataType : "json"
		};
		if (!y.url)
			D.url = B(m, "url") || F();
		if (!y.data && m && (n == "create" || n == "update")) {
			D.contentType = "application/json";
			D.data = JSON.stringify(m.toJSON())
		}
		if (f.emulateJSON) {
			D.contentType = "application/x-www-form-urlencoded";
			D.data = D.data ? {
				model : D.data
			} : {}
		}
		if (f.emulateHTTP)
			if (A === "PUT" || A === "DELETE") {
				if (f.emulateJSON)
					D.data._method = A;
				D.type = "POST";
				D.beforeSend = function(E) {
					E.setRequestHeader("X-HTTP-Method-Override", A)
				}
			}
		if (D.type !== "GET" && !f.emulateJSON)
			D.processData = false;
		return e.ajax(b.extend(D, y))
	};
	f.wrapError = function(n, m, y) {
		return function(A, D) {
			D = A === m ? D : A;
			n ? n(m, D, y) : m.trigger("error", m, D, y)
		}
	};
	var v = function() {
	}, z = function(n, m, y) {
		var A;
		A = m && m.hasOwnProperty("constructor") ? m.constructor : function() {
			n.apply(this, arguments)
		};
		b.extend(A, n);
		v.prototype = n.prototype;
		A.prototype = new v;
		m && b.extend(A.prototype, m);
		y && b.extend(A, y);
		A.prototype.constructor = A;
		A.__super__ = n.prototype;
		return A
	}, B = function(n, m) {
		if (!(n && n[m]))
			return null;
		return b.isFunction(n[m]) ? n[m]() : n[m]
	}, F = function() {
		throw new Error('A "url" property or function must be specified');
	}
}).call(this);
var BoardLayout = function() {
	return {
		setup : function() {
			if (!this.setupComplete) {
				$(document).ready(function() {
					BoardLayout.allPins()
				});
				$(window).resize(function() {
					BoardLayout.allPins()
				});
				$(function() {
					Like.gridListeners();
					Follow.listeners();
					Comment.gridComment();
					RepinDialog.setup();
					RepinDialog.grid();
					Zoom.setup()
				});
				this.setupComplete = true
			}
		},
		pinsContainer : ".BoardLayout",
		pinArray : [],
		orderedPins : [],
		mappedPins : {},
		nextPin : function(a) {
			a = this.orderedPins.indexOf(a) + 1;
			if (a >= this.orderedPins.length)
				return 0;
			return this.orderedPins[a]
		},
		previousPin : function(a) {
			a = this.orderedPins.indexOf(a) - 1;
			if (a >= this.orderedPins.length)
				return 0;
			return this.orderedPins[a]
		},
		columnCount : 4,
		columns : 0,
		columnWidthInner : 192,
		columnMargin : 15,
		columnPadding : 30,
		columnContainerWidth : 0,
		allPins : function() {
			var a = document.documentElement.clientWidth;
			this.columnWidthOuter = this.columnWidthInner + this.columnMargin
					+ this.columnPadding;
			this.columns = Math.max(this.columnCount, parseInt(a
					/ this.columnWidthOuter));
			a = this.columnWidthOuter * this.columns - this.columnMargin;
			document.getElementById("profile") && this.columns--;
			document.getElementById("wrapper").style.width = a + "px";
			$(".LiquidContainer").css("width", a + "px");
			for (a = 0; a < this.columns; a++)
				this.pinArray[a] = 0;
			a = $(this.pinsContainer + " .pin");
			document.getElementById("SortableButtons") ? this.showPins() : this
					.flowPins(a, true)
		},
		newPins : function() {
			this.flowPins($(this.pinsContainer + ":last .pin"))
		},
		flowPins : function(a, c) {
			if (c) {
				this.mappedPins = {};
				this.orderedPins = []
			}
			for (i = 0; i < a.length; i++) {
				c = a[i];
				var d = $(c).attr("data-id");
				if (d && this.mappedPins[d])
					$(c).remove();
				else {
					var g = jQuery.inArray(Math.min.apply(Math, this.pinArray),
							this.pinArray), f = this.pinArray[g];
					c.style.top = f + "px";
					c.style.left = g * this.columnWidthOuter + "px";
					this.pinArray[g] = f + c.offsetHeight + this.columnMargin;
					this.mappedPins[d] = this.orderedPins.length;
					this.orderedPins.push(d)
				}
			}
			document.getElementById("ColumnContainer").style.height = Math.max
					.apply(Math, this.pinArray)
					+ "px";
			this.showPins();
			LazyLoad.invalidate()
		},
		showPins : function() {
			$.browser.msie && parseInt($.browser.version) == 7
					|| $(this.pinsContainer).animate({
						opacity : "1"
					}, 300)
		},
		imageLoaded : function() {
			$(this).removeClass("lazy")
		}
	}
}();
var LazyLoad = new (function() {
	var a = this, c = 0, d = 0, g = 100, f = $(window);
	a.images = {};
	a.invalidate = function() {
		$("img.lazy").each(function(s, o) {
			s = $(o);
			a.images[s.attr("data-id")] = s;
			e(s) && h(s)
		})
	};
	a.check = function() {
		var s, o = false;
		return function() {
			if (!o) {
				o = true;
				clearTimeout(s);
				s = setTimeout(function() {
					o = false;
					b()
				}, 200)
			}
		}
	}();
	var b = function() {
		var s = 0, o = 0;
		for ( var l in a.images) {
			var q = a.images[l];
			s++;
			if (e(q)) {
				h(q);
				o++
			}
		}
	};
	a.stop = function() {
		f.unbind("scroll", j);
		f.unbind("resize", k)
	};
	var e = function(s) {
		return s.offset().top <= g
	}, h = function(s) {
		if (s.hasClass("lazy")) {
			var o = s.attr("data-src"), l = s.attr("data-id");
			s.load(function() {
				if (s[0])
					s[0].style.opacity = "1";
				delete a.images[l]
			});
			s.attr("src", o);
			s.removeClass("lazy");
			if (s[0])
				s[0].style.opacity = "0"
		}
	}, j = function() {
		c = $(window).scrollTop();
		p();
		a.check()
	}, k = function() {
		d = $(window).height();
		p();
		a.check()
	}, p = function() {
		g = c + d + 600
	};
	f.ready(function() {
		j();
		k()
	});
	f.scroll(j);
	f.resize(k)
});
var BoardPicker = function() {
	return {
		setup : function(a, c, d) {
			a = $(a);
			var g = $(".BoardListOverlay", a.parent()), f = $(".BoardList", a), b = $(
					".CurrentBoard", a), e = $("ul", f);
			a.click(function() {
				f.show();
				g.show()
			});
			g.click(function() {
				f.hide();
				g.hide()
			});
			$("li", e).live("click", function() {
				b.text($(this).text());
				g.hide();
				f.hide();
				c && c($(this).attr("data"));
				return false
			});
			a = $(".CreateBoard", f);
			var h = $("input", a), j = $(".Button", a);
			$("strong", j);
			var k = $(".CreateBoardStatus", a);
			h.defaultValue("Create New Board");
			j.click(function() {
				if (j.attr("disabled") == "disabled")
					return false;
				if (h.val() == "Create New Board") {
					k.html("Enter a board name").css("color", "red").show();
					return false
				}
				k.html("").hide();
				j.addClass("disabled").attr("disabled", "disabled");
				$.post("/board/create/", {
					name : h.val(),
					pass_category : true
				}, function(p) {
					if (p && p.status == "success") {
						e.append("<li data='" + p.id + "'><span>" + p.name
								+ "</span></li>");
						f.hide();
						b.text(p.name);
						h.val("").blur();
						j.removeClass("disabled").removeAttr("disabled");
						d && d(p.id)
					} else {
						k.html(p.message).css("color", "red").show();
						j.removeClass("disabled").removeAttr("disabled")
					}
				}, "json");
				return false
			})
		}
	}
}();
var AddDialog = function() {
	return {
		setup : function(a) {
			var c = "#" + a, d = $(c), g = $(".Buttons .RedButton", d), f = $(
					".mainerror", d), b = $(".DescriptionTextarea", d);
			BoardPicker.setup(c + " .BoardPicker", function(e) {
				$(c + " #id_board").val(e)
			}, function(e) {
				$(c + " #id_board").val(e)
			});
			AddDialog.shareCheckboxes(a);
			Tagging.initTextarea(c + " .DescriptionTextarea");
			Tagging.priceTag(c + " .DescriptionTextarea", c + " .ImagePicker");
			CharacterCount.setup(c + " .DescriptionTextarea", c
					+ " .CharacterCount", c + " .Button");
			g.click(function() {
				if (g.hasClass("disabled"))
					return false;
				trackGAEvent("pin", "clicked", "add_dialogue");
				if (b.val() === "" || b.val() === "Describe your pin...") {
					f.html("Please describe your pin").slideDown(300);
					return false
				} else
					f.slideUp(300, function() {
						f.html("")
					});
				g.addClass("disabled").children("strong").html("Pinning...");
				$("#id_details", d).val(b.val());
				Tagging.loadTags(c + " .DescriptionTextarea", c
						+ " #peeps_holder", c + " #id_tags", c
						+ " #currency_holder");
				$("form", d).ajaxSubmit({
					url : "/pin/create/",
					type : "POST",
					dataType : "json",
					iframe : true,
					success : function(e) {
						if (e.status == "success") {
							trackGAEvent("pin", "success", "add_dialogue");
							window.location = e.url
						} else {
							f.html(e.message).slideDown(300);
							AddDialog.reset(a)
						}
					}
				});
				return false
			})
		},
		reset : function(a) {
			a === "CreateBoard" && CreateBoardDialog.reset();
			a === "ScrapePin" && ScrapePinDialog.reset();
			a === "UploadPin" && UploadPinDialog.reset();
			AddDialog._resets[a] && AddDialog._resets[a]()
		},
		close : function(a, c) {
			$("#" + a).addClass("super");
			Modal.show(c)
		},
		childClose : function(a, c) {
			var d = this, g = $("#" + c);
			$(".ModalContainer", g);
			d.reset(c);
			$("#" + a).removeClass("super");
			Modal.close(a);
			Modal.close(c)
		},
		pinBottom : function(a) {
			var c = $("#" + a);
			$(".PinBottom", c).slideDown(300, function() {
				var d = $(".modal:first", c);
				d.css("margin-bottom", "-" + d.outerHeight() / 2 + "px")
			})
		},
		shareCheckboxes : function(a) {
			function c(f) {
				var b = $("#" + a + " .publish_to_" + f), e = $("#" + a
						+ " #id_publish_to_" + f);
				b.change(function() {
					if (b.is(":checked")) {
						e.attr("checked", "checked");
						b.parent().addClass("active")
					} else {
						e.removeAttr("checked");
						b.parent().removeClass("active")
					}
				});
				var h = b.is(":checked");
				return function() {
					if (h) {
						b.parent().addClass("active");
						b.attr("checked", "checked")
					} else {
						b.parent().removeClass("active");
						b.removeAttr("checked")
					}
				}
			}
			var d = c("facebook"), g = c("twitter");
			AddDialog._resets = AddDialog._resets || {};
			AddDialog._resets[a] = function() {
				d();
				g()
			}
		}
	}
}();
var Home = function() {
	return {
		setup : function() {
			var a = null, c = $(window), d = false;
			$(window).scroll(function() {
				var g = c.scrollTop() >= 44;
				a || (a = $("#CategoriesBar, .Nag"));
				if (!d && g) {
					a.addClass("fixed");
					d = true
				} else if (d && !g) {
					a.removeClass("fixed");
					d = false
				}
			});
			$("#home_request_invite_button")
					.click(
							function() {
								var g = $(this);
								if ($("#home_request_invite").val() == "Your Email Address"
										|| $("#home_request_invite").val() == "")
									$(".signup span").html(
											"Please enter an email").css(
											"color", "red");
								else {
									g.addClass("pressed").attr("disabled",
											"disabled");
									$
											.post(
													"/",
													{
														email : $(
																"#home_request_invite")
																.val()
													},
													function(f) {
														if (f.status == "success") {
															$(".signup span")
																	.html(
																			"Thanks. You're on the list!")
																	.css(
																			"color",
																			"green");
															$(
																	"#home_request_invite")
																	.val("")
														} else {
															$(".signup span")
																	.html(
																			f.message)
																	.css(
																			"color",
																			"red");
															this_button
																	.removeAttr(
																			"disabled")
																	.removeClass(
																			"pressed")
														}
													}, "json")
								}
								return false
							});
			$(".remove_activity_rec")
					.live(
							"click",
							function() {
								$this_element = $(this);
								$
										.get(
												"/remove_follow_recommend/?rec_id="
														+ $(this)
																.attr(
																		"data-remove_id"),
												function(g) {
													if (g
															&& g.status == "success") {
														window.activity_feed
																.update_ui_followed_succeeded($this_element);
														g = $(this)
																.parent()
																.siblings(
																		".hidden")[0];
														$(g).removeClass(
																"hidden")
													} else
														alert(g.message)
												})
							});
			$(".remove_activity_invite").live(
					"click",
					function() {
						var g = $(this);
						$.get("/remove_invite/?rec_id="
								+ $(this).attr("data-remove_id"), function(f) {
							if (f.status == "success") {
								window.activity_feed.update_ui_invited_user(g);
								f = $(this).parent().siblings(".hidden")[0];
								$(f).removeClass("hidden")
							} else
								alert(f.message)
						})
					});
			$("#follow_all_link").live(
					"click",
					function() {
						$.get("/follow_all_recommends/", function(g) {
							g && g.status == "success" ? window.activity_feed
									.update_ui_followed_all_recommened()
									: alert(g.message)
						})
					});
			$("#invite_all_link").live(
					"click",
					function() {
						$.get("/invite_all/", function(g) {
							g && g.status == "success" ? window.activity_feed
									.update_ui_invited_all_users()
									: alert(g.message)
						})
					})
		},
		activityFeedSupport : function() {
			this.init = function() {
				this.invite_all_link = $("#invite_all_link");
				this.follow_all_link = $("#follow_all_link")
			};
			this.update_ui_invited_user = function(a) {
				this.fade_row(a);
				if (this.invite_all_link && this.invite_all_link.length)
					if (this.invite_all_link.attr("data-total_count")) {
						a = this.invite_all_link.attr("data-total_count");
						if (a == "1")
							this.hide_invites();
						else {
							this.invite_all_link
									.attr("data-total_count", a - 1);
							this.invite_all_link.html("Invite all (" + (a - 1)
									+ ")")
						}
					}
			};
			this.update_ui_followed_succeeded = function(a) {
				this.fade_row(a);
				if (this.follow_all_link && this.follow_all_link.length)
					if (this.follow_all_link.attr("data-total_count")) {
						a = this.follow_all_link.attr("data-total_count");
						if (a == "1")
							this.hide_recommends();
						else {
							this.follow_all_link
									.attr("data-total_count", a - 1);
							this.follow_all_link.html("Follow all (" + (a - 1)
									+ ")")
						}
					}
			};
			this.update_ui_invited_all_users = function() {
				this.hide_invites()
			};
			this.update_ui_followed_all_recommened = function() {
				this.hide_recommends()
			};
			this.fade_row = function(a) {
				a.parents(".story:first").fadeOut()
			};
			this.hide_invites = function() {
				this.invite_all_link.parents("#invite_friends:first").fadeOut()
			};
			this.hide_recommends = function() {
				this.follow_all_link.parents("#recommended_friends:first")
						.fadeOut()
			}
		}
	}
}();
var GetNewPins = function() {
	return {
		timeout : null,
		timeoutLength : 8192,
		timeoutLengthMax : 524288,
		marker : 0,
		indicator : "#NewIndicator",
		newPins : {
			html : "",
			number : 0,
			old_title : $("title").html()
		},
		setTimeout : function() {
			var a = this;
			a.timeout = setTimeout("GetNewPins.checkForPins()", a.timeoutLength)
		},
		resetTimeout : function() {
			window.clearTimeout(this.timeout);
			this.setTimeout()
		},
		trigerOnScroll : function() {
			var a = this;
			a.setTimeout();
			$(window).bind("scroll", function() {
				a.timeoutLength = 8192;
				a.resetTimeout()
			})
		},
		checkForPins : function() {
			var a = this;
			$
					.get(
							"/new/",
							{
								marker : a.marker
							},
							function(c) {
								if (c.number > 0) {
									var d = a.indicator;
									a.marker = c.marker;
									a.newPins.html += c.html;
									a.newPins.number += c.number;
									c = a.newPins.number === 1 ? a.newPins.number
											+ " new pin"
											: a.newPins.number + " new pins";
									$("title").html(
											"(" + a.newPins.number + ") "
													+ a.newPins.old_title);
									$(d).html(
											"<strong>" + c
													+ "</strong><span></span>");
									$(d).hasClass("Offscreen")
											&& $(d).removeClass("Offscreen");
									if (a.timeoutLength < a.timeoutLengthMax)
										a.timeoutLength *= 2;
									a.setTimeout()
								}
							})
		},
		showNewPins : function() {
			var a = this, c = a.indicator;
			$(".feed").length > 0 ? $(".feed").after(a.newPins.html) : $(
					"#ColumnContainer").prepend(a.newPins.html);
			BoardLayout.allPins();
			$(c).addClass("Offscreen");
			$(c).html("<strong>&nbsp;</strong><span></span>");
			$("title").html(a.newPins.old_title);
			a.newPins = {
				html : "",
				number : 0,
				old_title : $("title").html()
			};
			a.resetTimeout();
			$("html, body").animate({
				scrollTop : "0px"
			}, 400);
			return false
		}
	}
}();
var BoardSort = BoardSort
		|| {
			StartButton : "#slk_sort_boards",
			SaveButton : "#SortSave",
			FollowButtons : ".followBoard .button",
			Container : ".sortable",
			Objects : ".pinBoard",
			Helper : "#SortableHelper",
			showControls : function() {
				$(this.Helper).slideDown();
				$(this.FollowButtons).hide();
				$(this.StartButton).hide();
				$(this.Objects).addClass("inMotion")
			},
			hideControls : function() {
				$(this.Helper).slideUp();
				$(this.FollowButtons).show();
				$(this.StartButton).show();
				$(this.Objects).removeClass("inMotion")
			},
			start : function() {
				this.showControls();
				$(this.Container).sortable();
				return false
			},
			save : function() {
				trackGAEvent("rearrange_board_save", "clicked");
				this.hideControls();
				$(this.Container).sortable("destroy");
				$(this.Objects).removeClass("inMotion");
				var a = [];
				$(this.Objects).each(function() {
					a.push(this.id.replace("board", ""))
				});
				$
						.post(
								$(this.SaveButton).attr("href"),
								{
									order_array : a.toString()
								},
								function(c) {
									if (c.status == "success") {
										trackGAEvent("rearrange_board_save",
												"success");
										console.log("Sorting saved.");
										$("#SortStatus").html("Saved!").css(
												"color", "green").stop().css(
												"opacity", "1").animate({
											opacity : "0"
										}, 5E3)
									} else {
										console.log("Sorting failed.");
										$("#SortStatus")
												.html(
														"Saved Failed &mdash; <a href='#' onclick='boardSort.save(); return false' style='font-weight: 300;'>Try Again</a>?")
												.css("color", "#221919").css(
														"opacity", "1")
									}
								});
				return false
			},
			cancel : function() {
				this.hideControls();
				window.location.reload();
				return false
			}
		};
var SendMessage = SendMessage
		|| {
			setup : function() {
				var a = $("#SendMessage form"), c = $("#SendMessage textarea"), d = $("#SendMessage a"), g = c
						.val(), f = c.height() * 3;
				c.live("focus", function() {
					d.show();
					if (c.val().match(/^Write/)) {
						c.val("");
						c.css("height", f)
					}
				});
				c.live("blur", function() {
					c.val() === "" && c.val(g)
				});
				d.live("click", function() {
					trackGAEvent("send_message", "clicked");
					var b = c.val().trim();
					if (b === "" || b.match(/^Write/)) {
						alert("Please enter a message first!");
						return false
					} else {
						d.html("<strong>Sending</strong><span></span>")
								.addClass("disabled");
						c.val("")
					}
					$.post(a.attr("action"), {
						message : b
					}, function(e) {
						if (e.status === "success") {
							trackGAEvent("send_message", "success");
							d.html("<strong>Send</strong><span></span>")
									.removeClass("disabled");
							c.val(g);
							$("#ProfileSidebar .activity").prepend(e.html);
							BoardLayout.allPins()
						} else
							alert(e.message)
					});
					return false
				})
			}
		};
var Follow = function() {
	return {
		listeners : function() {
			var a = this;
			$(".followbutton").live("click", function() {
				trackGAEvent("follow_board", "clicked");
				a.followBoard($(this));
				return false
			});
			$(".unfollowbutton").live("click", function() {
				trackGAEvent("unfollow_board", "clicked");
				a.unfollowBoard($(this));
				return false
			});
			$(".followuserbutton").live("click", function() {
				trackGAEvent("follow_user", "clicked");
				a.followUser($(this));
				return false
			});
			$(".unfollowuserbutton").live("click", function() {
				trackGAEvent("unfollow_user", "clicked");
				a.unfollowUser($(this));
				return false
			})
		},
		followBoard : function(a) {
			var c = $("strong", a);
			c.text("Unfollow");
			a.removeClass("followbutton").addClass(
					"disabled clickable unfollowbutton").attr("disabled",
					"disabled");
			$.ajax({
				url : a.attr("href"),
				type : "POST",
				dataType : "json",
				error : function() {
					c.text("Follow");
					a.removeClass("disabled clickable unfollowbutton")
							.addClass("followbutton").attr("disabled", "")
				},
				success : function() {
					trackGAEvent("follow_board", "success");
					a.attr("disabled", "")
				}
			})
		},
		unfollowBoard : function(a) {
			var c = $("strong", a);
			c.text("Follow");
			a.removeClass("disabled clickable unfollowbutton").addClass(
					"followbutton").attr("disabled", "disabled");
			$.ajax({
				url : a.attr("href"),
				type : "POST",
				dataType : "json",
				data : {
					unfollow : 1
				},
				error : function() {
					c.text("Unfollow");
					a.removeClass("followbutton").addClass(
							"disabled clickable unfollowbutton").attr(
							"disabled", "")
				},
				success : function() {
					trackGAEvent("unfollow_board", "success");
					a.attr("disabled", "")
				}
			})
		},
		followUser : function(a) {
			var c = $("strong", a), d = $("#profile").length != 0 ? "Unfollow All"
					: "Unfollow";
			c.text(d);
			a.removeClass("followuserbutton").addClass(
					"disabled unfollowuserbutton").attr("disabled", "disabled");
			c = $(".followbutton");
			$(".strong", c).text("Unfollow");
			c.removeClass("followbutton").addClass(
					"disabled clickable unfollowbutton");
			$.ajax({
				url : a.attr("href"),
				type : "POST",
				dataType : "json",
				error : function() {
				},
				success : function() {
					trackGAEvent("follow_user", "success");
					a.attr("disabled", "").addClass("clickable")
				}
			})
		},
		unfollowUser : function(a) {
			var c = $("strong", a), d = $("#profile").length != 0 ? "Follow All"
					: "Follow";
			c.text(d);
			a.removeClass("disabled clickable unfollowuserbutton").addClass(
					"followuserbutton").attr("disabled", "disabled");
			c = $(".unfollowbutton");
			$("strong", c).text("Follow");
			c.removeClass("disabled clickable unfollowbutton").addClass(
					"followbutton");
			$.ajax({
				url : a.attr("href"),
				type : "POST",
				dataType : "json",
				data : {
					unfollow : 1
				},
				error : function() {
				},
				success : function() {
					trackGAEvent("unfollow_user", "success");
					a.attr("disabled", "")
				}
			})
		},
		followUserHomeActivity : function(a) {
			$.ajax({
				url : a.attr("href"),
				type : "POST",
				dataType : "json",
				data : {
					is_home : true
				},
				error : function() {
				},
				success : function() {
					trackGAEvent("follow_user_home_activity", "success");
					window.activity_feed.update_ui_followed_succeeded(a)
				}
			})
		}
	}
}();
var Comment = function() {
	return {
		defaultText : "Add a comment...",
		clearDefaultText : function(a) {
			var c = this;
			a.live("focus", function() {
				$(this).val() === c.defaultText && $(this).val("")
			});
			a.live("blur", function() {
				$(this).val() === "" && $(this).val(c.defaultText)
			})
		},
		gridShowButton : function(a) {
			a.show();
			BoardLayout.allPins()
		},
		gridComment : function() {
			var a = this, c = $(".write textarea");
			a.clearDefaultText(c);
			$("#ColumnContainer").on(
					"focus",
					".write .GridComment",
					function() {
						var d = $(this).parents(".pin").first(), g = $(this)
								.parent().find(".Button");
						a.gridShowButton(g);
						g = a.getCommenters(d.find(".comments .comment"));
						d = a.getPinner(d.find("div.attribution:first"));
						g[d.link] = d;
						Tagging.initTextarea($(this), g)
					});
			$("#ColumnContainer")
					.on(
							"click",
							".actions .comment",
							function() {
								trackGAEvent("comment_button", "clicked");
								var d = $(this), g = d.parents(".pin").find(
										".write"), f = g.find(".Button");
								if (d.hasClass("disabled")) {
									g.slideUp("fast", function() {
										g.find("textarea").blur();
										BoardLayout.allPins()
									});
									d.removeClass("disabled clickable")
								} else {
									f.css("visibility", "hidden");
									g.slideDown("fast", function() {
										f.css("visibility", "visible");
										g.find("textarea").focus()
									});
									d.addClass("disabled clickable")
								}
								$(this).parents(".pin");
								return false
							});
			$("#ColumnContainer")
					.on(
							"click",
							".write .Button",
							function() {
								trackGAEvent("comment_submit", "clicked",
										"grid");
								var d = $(this), g = d.parent(), f = d
										.parents("form"), b = d.parents(".pin"), e = $(
										".CommentsCount", b), h = $(".stats", b), j = $(
										"textarea", b), k = j.val(), p = $(
										"div.comments", b), s = $(".all", b), o = h
										.html() === "" ? true : false, l = String
										.fromCharCode(160);
								if (k != a.defaultText && k != "") {
									Tagging.loadTags($(".GridComment", g), $(
											".pin_comment_replies", g));
									if (!d.hasClass("disabled")) {
										d.addClass("disabled");
										$
												.ajax({
													url : f.attr("action"),
													type : "POST",
													dataType : "json",
													data : {
														text : k,
														replies : $(
																".pin_comment_replies",
																g).val(),
														home : "1"
													},
													error : function(q) {
														alert(q.message)
													},
													success : function(q) {
														trackGAEvent(
																"comment_submit",
																"success",
																"grid");
														q = $(q.html).hide();
														if (s.length != 0) {
															var u = s
																	.find("span"), v = u
																	.text();
															v = parseInt(v, 10);
															v++;
															s.before(q);
															u.text(v);
															e
																	.text(v
																			+ " comments"
																			+ l
																			+ l)
														} else if (p.length === 0) {
															b
																	.find(
																			".attribution")
																	.after(
																			"<div class='comments colormuted'></div>");
															b.find(".comments")
																	.html(q);
															h
																	.append("<span class='CommentsCount'>1 comment"
																			+ l
																			+ l
																			+ "</span>");
															o
																	&& BoardLayout
																			.allPins()
														} else {
															b
																	.find(
																			"div.comments .comment:last")
																	.after(q);
															u = parseInt(e
																	.html());
															e
																	.html((u + 1)
																			.toString()
																			+ " comments"
																			+ l
																			+ l)
														}
														j.remove();
														f
																.prepend("<textarea>"
																		+ a.defaultText
																		+ "</textarea>");
														q
																.slideDown(
																		"fast",
																		function() {
																			BoardLayout
																					.allPins()
																		})
													},
													complete : function() {
														d
																.removeClass("disabled")
													}
												})
									}
								}
								return false
							})
		},
		closeupComment : function() {
			var a = this, c = $("#CloseupComment"), d = $("#PostComment");
			a.clearDefaultText(c);
			c.focus(function() {
				$("#PinAddCommentControls").slideDown(250)
			});
			c.bind("keyup", function() {
				var f = $("#CloseupComment").val();
				f != Comment.defaultText && f != "" ? d.removeClass("disabled")
						: d.addClass("disabled")
			});
			a = this.getCommenters(".PinComments .comment");
			var g = this.getPinner("#PinPinner");
			a[g.link] = g;
			Tagging.initTextarea("#CloseupComment", a);
			d.click(function() {
				trackGAEvent("comment_submit", "clicked", "closeup");
				Tagging.loadTags("#CloseupComment", "#pin_comment_replies");
				var f = $(this);
				f.find("strong");
				var b = $("#pin_comment_replies").val(), e = c.val();
				if (e != Comment.defaultText && e != "") {
					$.trim(e);
					if (!f.hasClass("disabled")) {
						f.addClass("disabled");
						$.ajax({
							url : $("#post_comment_url").val(),
							type : "POST",
							dataType : "json",
							data : {
								text : e,
								replies : b
							},
							error : function(h) {
								alert(h.message)
							},
							success : function(h) {
								trackGAEvent("comment_submit", "success",
										"closeup");
								Tagging.initTextarea("#CloseupComment");
								c.val("");
								$("#pin_comment_replies").val("");
								h = $(h.html).css({
									"background-color" : "#fbffcc"
								});
								$(".PinComments").append(h);
								h.removeClass("hidden").animate({
									backgroundColor : "#f2f0f0",
									display : "block"
								}, 1200)
							}
						})
					}
				}
				return false
			})
		},
		zoomComment : function() {
			var a = this, c = $("#zoom"), d = $("#CloseupComment", c), g = $(
					"#PostComment", c);
			a.clearDefaultText(d);
			d.focus(function() {
				$("#PinAddCommentControls", c).slideDown(250)
			});
			d.bind("keyup", function() {
				var e = d.val();
				e != Comment.defaultText && e != "" ? g.removeClass("disabled")
						: g.addClass("disabled")
			});
			var f = this.getCommenters("#zoom .PinComments .comment"), b = this
					.getPinner("#PinPinner");
			f[b.link] = b;
			Tagging.initTextarea("#CloseupComment", f);
			g.click(function() {
				trackGAEvent("comment_submit", "clicked", "zoom");
				Tagging.loadTags("#CloseupComment", "#pin_comment_replies");
				var e = $(this);
				e.find("strong");
				var h = $("#pin_comment_replies", c).val(), j = d.val();
				if (j != Comment.defaultText && j != "") {
					$.trim(j);
					if (!e.hasClass("disabled")) {
						e.addClass("disabled");
						$.ajax({
							url : $("#post_comment_url", c).val(),
							type : "POST",
							dataType : "json",
							data : {
								text : j,
								replies : h
							},
							error : function(k) {
								alert(k.message)
							},
							success : function(k) {
								trackGAEvent("comment_submit", "success",
										"zoom");
								Tagging.initTextarea("#CloseupComment");
								d.val(a.defaultText);
								$("#pin_comment_replies", c).val("");
								k = $(k.html).css({
									"background-color" : "#fbffcc"
								});
								$(".PinComments", c).append(k);
								k.removeClass("hidden").animate({
									backgroundColor : "#ffffff",
									display : "block"
								}, 220)
							}
						})
					}
				}
				return false
			})
		},
		getCommenters : function(a) {
			var c = {};
			$(a).each(function(d, g) {
				g = $(g);
				d = g.find("p a:first").attr("href");
				!d || c[d] || (c[d] = {
					label : g.find("p a:first").text(),
					value : d.replace(/\//g, ""),
					image : g.find("img:first").attr("src"),
					link : d
				})
			});
			return c
		},
		getPinner : function(a) {
			a = $(a);
			var c = a.find("a").attr("href");
			return {
				label : a.find("p:first a:first").text(),
				value : c.replace(/\//g, ""),
				image : a.find("a img:first").attr("src"),
				link : c
			}
		}
	}
}();
var Zoom = function() {
	return {
		HTMLloading : "<div id='loading'><img src='" + media_url
				+ "images/rotating_pin.png' alt='Loading Animation' /></div>",
		HTMLshow : "<div id='zoomScroll' class='visible loading'><div id='zoom' class='pin' pin-id='%PIN_ID%'></div></div>",
		HTMLzoom : "<div id='zoomScroll'><div id='zoom' class='pin' pin-id='%PIN_ID%'></div></div>",
		setup : function() {
			if (window.location.hash == "#_=_")
				window.location.hash = "";
			var a = this, c = !navigator.userAgent
					.match(/ipad|ipod|iphone|android/i)
					&& window.history.pushState;
			isWebkit = $.browser.webkit;
			(isFireFox = $.browser.mozilla)
					&& $("body").addClass("extraScroll");
			if (c) {
				var d = this.router = new Backbone.Router({
					routes : {
						"pin/:id/" : "open",
						".*" : "close"
					}
				});
				d.on("route:open", function(g) {
					isWebkit ? a.zoom(g) : a.show(g);
					a.open = true
				});
				d.on("route:close", function() {
					a.close()
				});
				Backbone.history.start({
					pushState : true,
					silent : true
				});
				if (isWebkit) {
					zoomTimer = 220;
					c = '<style type="text/css">#zoomScroll,#zoomScroll.visible #zoom,#zoomScroll.visible .PinImage img,#zoom .PriceContainer,#zoom .PriceContainer *,#zoom .convo .ImgLink,#zoom .convo .ImgLink img,#zoom .comments .comment,#zoom #loading img{-moz-transition: all '
							+ zoomTimer
							/ 1E3
							+ "s ease-out; -webkit-transition: all "
							+ zoomTimer / 1E3 + "s ease-out;}</style>";
					$("head").append(c);
					$("#ColumnContainer").on("mousedown", ".PinImage",
							function() {
								$(this).parents(".pin").addClass("spring")
							});
					$("#ColumnContainer").on("mouseout", ".spring", function() {
						$(this).removeClass("spring")
					})
				}
				$("#ColumnContainer").on("click", ".PinImage", function(g) {
					if (g.cntrlKey || g.metaKey)
						return true;
					g = $(this).parents(".pin").attr("data-id");
					trackGAEvent("zoom_pin", "clicked", "grid_closeup");
					d.navigate("/pin/" + g + "/", {
						trigger : true
					});
					return false
				})
			}
		},
		zoom : function(a) {
			var c = this;
			htmlZoom = c.HTMLzoom.replace("%PIN_ID%", a);
			$("body").addClass("noscroll").append(htmlZoom);
			var d = $("#zoomScroll"), g = $("#zoom");
			setTimeout(function() {
				d.addClass("visible");
				var e = $(window).width() / 2;
				g.css("left", e + "px");
				b.filmDimensions[1] != 0 && b.elem.css({
					width : b.filmDimensions[0] + "px",
					height : b.filmDimensions[1] + "px"
				});
				if (f.isVideo) {
					$(".PinImage", g).css("background-color", "black");
					b.elem.css({
						opacity : "0"
					})
				}
				setTimeout(function() {
					zoomFinished = true;
					d.addClass("loading");
					f.isVideo ? f.elem.find(".video").show() : b.elem.attr(
							"src", b.src)
				}, zoomTimer)
			}, 1);
			var f = {};
			f.id = a;
			f.elem = $('div[data-id="' + f.id + '"]');
			f.elem.addClass("zoomed");
			f.elem.find(".video").hide();
			f.HTMLimage = getHTML(f.elem.find(".PinImage"));
			f.offset = f.elem.offset();
			f.isVideo = f.elem.find(".video").length;
			f.elem.removeClass("spring");
			var b = {};
			b.src = f.elem.find(".PinImageImg").attr("src").replace("_b.jpg",
					"_f.jpg");
			b.preload = new Image;
			b.preload.src = b.src;
			g.html(f.HTMLimage).css({
				top : f.offset.top - $(window).scrollTop() + "px",
				left : f.offset.left + "px"
			}).append(c.HTMLloading).find(".PinImage").attr("href",
					"javascript:void[0]").wrap(
					"<div id='PinImageHolder'></div>");
			b.elem = $(".PinImageImg", g);
			b.origin = $(".zoomed .PinImageImg");
			b.thumbDimensions = f.isVideo ? [ "192", "144" ] : [
					b.origin.width(), b.origin.height() ];
			b.filmDimensions = f.isVideo ? [ "600", "450" ] : [
					f.elem.attr("data-width"), f.elem.attr("data-height") ];
			b.elem.css({
				width : b.thumbDimensions[0] + "px",
				height : b.thumbDimensions[1] + "px"
			});
			c.ajax(f.id);
			c.closeListeners(f.id)
		},
		show : function(a) {
			var c = this, d = c.HTMLshow.replace("%PIN_ID%", a);
			$("body").addClass("noscroll").append(d);
			$("#zoomScroll");
			d = $("#zoom");
			var g = {};
			g.id = a;
			g.elem = $('div[data-id="' + g.id + '"]');
			g.elem.addClass("zoomed");
			g.HTMLimage = getHTML(g.elem.find(".PinImage"));
			g.isVideo = g.elem.find(".video").length;
			d.html(g.HTMLimage).append(c.HTMLloading).find(".PinImage").attr(
					"href", "javascript:void[0]").wrap(
					"<div id='PinImageHolder'></div>");
			a = $(window).width() / 2;
			d.css("left", (isFireFox ? a - 7 : a) + "px");
			a = {};
			a.elem = $(".PinImageImg", d);
			a.src = g.elem.find(".PinImageImg").attr("src").replace("_b.jpg",
					"_f.jpg");
			a.filmDimensions = g.isVideo ? [ "600", "450" ] : [
					g.elem.attr("data-width"), g.elem.attr("data-height") ];
			g.isVideo && d.find(".video").remove();
			a.elem.attr("src", a.src).css({
				width : a.filmDimensions[0] + "px",
				height : a.filmDimensions[1] + "px"
			});
			c.ajax(g.id);
			c.closeListeners(g.id)
		},
		ajax : function(a) {
			var c = this, d = $("#zoom");
			this.cancelAjax();
			this.xhr = $
					.ajax({
						url : "/pin/" + a + "/",
						dataType : "json",
						error : function(g, f) {
							if (f !== "abort") {
								f = "Could not fetch pin :-/";
								if (navigator.onLine) {
									if (g.status === 404)
										f = "This pin has been deleted."
								} else
									f = "No Internet Connection :-/";
								d
										.append(
												"<div id='error'><p class='colormuted'></p></div>")
										.removeClass("loaded");
								$("#error p").html(f)
							}
						},
						success : function(g) {
							if (isWebkit)
								typeof zoomFinished != "undefined" ? c
										.renderSuccess(g) : d.one(
										"webkitTransitionEnd", function() {
											c.renderSuccess(g)
										});
							else
								isFireFox && c.renderSuccess(g)
						},
						complete : function() {
							c.xhr = null
						},
						timeout : 2E4
					})
		},
		renderSuccess : function(a) {
			var c = $("#zoomScroll"), d = $("#zoom");
			d.prepend(a.header);
			$("#PinImageHolder").append(a.buttons);
			d.append(a.footer);
			c.addClass("loaded");
			c.removeClass("loading")
		},
		closeListeners : function() {
			var a = this;
			$("#zoomScroll")
					.click(
							function(c) {
								if ($(c.target)
										.is(
												"#zoomScroll, #SocialShare ul, #SocialShare li")) {
									window.history.back();
									a.close();
									a.cancelAjax()
								}
							})
		},
		close : function() {
			if (this.open) {
				trackGAEvent("zoom_pin", "closed", "grid_closeup");
				$("#zoomScroll").remove();
				$("body").removeClass("noscroll");
				$(".zoomed").removeClass("zoomed");
				delete zoomFinished;
				return this.open = false
			}
		},
		cancelAjax : function() {
			if (this.xhr && this.xhr.abort) {
				this.xhr.abort();
				this.xhr = null
			}
		}
	}
}();
var Like = function() {
	return {
		ajaxLike : function(a, c, d, g) {
			$.ajax({
				url : "/pin/" + a + "/like/",
				type : "POST",
				dataType : "json",
				data : g,
				error : function(f) {
					c(f)
				},
				success : function(f) {
					d(f)
				},
				timeout : 2E4
			})
		},
		ajaxUnlike : function(a, c, d, g) {
			$.ajax({
				url : "/pin/" + a + "/like/",
				type : "POST",
				dataType : "json",
				data : g,
				error : function(f) {
					c(f)
				},
				success : function(f) {
					d(f)
				},
				timeout : 2E4
			})
		},
		gridListeners : function() {
			var a = this;
			$("#ColumnContainer").on("click", ".likebutton", function() {
				trackGAEvent("like", "clicked", "grid");
				a.gridLike($(this));
				return false
			});
			$("#ColumnContainer").on("click", ".unlikebutton", function() {
				trackGAEvent("unlike", "clicked", "grid");
				a.gridUnlike($(this));
				return false
			})
		},
		gridLike : function(a) {
			a.removeClass("likebutton").addClass("disabled unlikebutton")
					.children("strong").html("Unlike");
			var c = a.parents(".pin"), d = c.children(".stats"), g = d
					.find(".LikesCount"), f = d.html() === "" ? true : false, b = String
					.fromCharCode(160);
			if (g.length === 0) {
				d.append("<span class='LikesCount'>1 like" + b + b + "</span>");
				f && BoardLayout.allPins()
			} else {
				d = parseInt(g.html());
				g.html((d + 1).toString() + " likes" + b + b)
			}
			this.ajaxLike(c.attr("data-id"), function() {
			}, function(e) {
				if (e.status == "success") {
					trackGAEvent("like", "success");
					a.addClass("clickable")
				} else {
					var h = 0;
					if (g.length > 0)
						h = parseInt(g.html());
					if (h > 2)
						g.html((h - 1).toString() + " likes" + b + b);
					else {
						g.remove();
						BoardLayout.allPins()
					}
					a.removeClass("disabled unlikebutton").addClass(
							"likebutton");
					alert(e.message)
				}
			})
		},
		gridUnlike : function(a) {
			a.removeClass("disabled clickable unlikebutton").addClass(
					"likebutton").children("strong").html("<em></em> Like");
			a = a.parents(".pin");
			var c = a.children(".stats").find(".LikesCount"), d = parseInt(c
					.html()), g = String.fromCharCode(160);
			if (d === 1) {
				c.remove();
				BoardLayout.allPins()
			} else
				c.html((d - 1).toString() + " likes" + g + g);
			this.ajaxUnlike(a.attr("data-id"), function() {
			}, function() {
				trackGAEvent("unlike", "success")
			}, {
				unlike : 1
			})
		},
		zoomListeners : function() {
			var a = this;
			$("#PinImageHolder").on("click", ".ZoomLikeButton", function() {
				trackGAEvent("like", "clicked", "zoom");
				a.zoomLike($(this));
				return false
			});
			$("#PinImageHolder").on("click", ".ZoomUnlikeButton", function() {
				a.zoomUnlike($(this));
				return false
			})
		},
		zoomLike : function(a) {
			a.removeClass("ZoomLikeButton").addClass(
					"ZoomUnlikeButton disabled clickable").children("strong")
					.html("Unlike").children("em").remove();
			this.gridLike($(".zoomed .likebutton"))
		},
		zoomUnlike : function(a) {
			a.removeClass("ZoomUnlikeButton disabled clickable ").addClass(
					"ZoomLikeButton").children("strong").html("Like").prepend(
					"<em></em>");
			this.gridUnlike($(".zoomed .unlikebutton"))
		},
		closeupListeners : function() {
			var a = this;
			$("#PinActionButtons").on("click", ".like_pin", function() {
				trackGAEvent("like", "clicked", "closeup");
				a.closeupLike($(this));
				return false
			});
			$("#PinActionButtons").on("click", ".unlike_pin", function() {
				trackGAEvent("unlike", "clicked", "closeup");
				a.closeupUnlike($(this));
				return false
			})
		},
		closeupLike : function(a) {
			var c = this, d = $("#PinLikes");
			a.removeClass("like_pin").addClass("disabled clickable unlike_pin")
					.children("strong").html("Unlike");
			d.removeClass("hidden");
			a = a.attr("data-id");
			c.ajaxLike(a, function() {
				c.closeupUnlike()
			}, function(g) {
				trackGAEvent("like", "success");
				d.append(g.html)
			})
		},
		closeupUnlike : function(a) {
			var c = this, d = $("#PinLikes");
			a.removeClass("disabled clickable unlike_pin").addClass("like_pin")
					.children("strong").html("<em></em>Like");
			$("a", d).length === 1 && d.addClass("hidden");
			a = a.attr("data-id");
			c.ajaxUnlike(a, function() {
				c.closeupLike()
			}, function(g) {
				console.log(g);
				trackGAEvent("unlike", "success");
				$("#PinLikes a[href='/" + g.username + "/']").fadeOut("fast")
						.remove()
			}, {
				unlike : 1
			})
		}
	}
}();
var Closeup = function() {
	return {
		setup : function() {
			$("#PinReport").live("click", function() {
				trackGAEvent("pinreport", "clicked", "closeup");
				Modal.show("ReportModal");
				return false
			});
			$("#ReportModal .Button")
					.click(
							function() {
								trackGAEvent("report_modal", "clicked",
										"closeup");
								$
										.post(
												"flag/",
												{
													reason : $(
															"#ReportModal input[name=reason]:checked")
															.siblings("label")
															.text(),
													explanation : $(
															"#ReportModal textarea")
															.val()
												},
												function(a) {
													$(
															"#ReportModal .SubmitButton")
															.addClass(
																	"disabled")
															.text(
																	"Reporting...");
													if (a.status == "success") {
														trackGAEvent(
																"report_modal",
																"success",
																"closeup");
														$("#ReportModal .modal")
																.addClass(
																		"PostSuccess");
														$(
																"#ReportModal .modal form")
																.hide();
														$(".PostSuccess")
																.append(
																		'<p class="ReportSuccess">Thanks for reporting this pin! Our team will review the pin and delete it if it violates the <a href="/about/terms/">Pinterest Terms of Use</a>.</p>');
														setTimeout(
																'Modal.close("ReportModal"); Closeup.resetReportModal(); $("#ReportModal .SubmitButton").addClass("disabled").html("<strong>Send Email</strong><span></span>"); ',
																5E3);
														$("#PinReport")
																.remove()
													} else
														alert(a.message)
												}, "json");
								return false
							});
			$("#EmailModal form")
					.submit(
							function() {
								trackGAEvent("email_modal", "submit", "closeup");
								var a = $("#MessageRecipientName").val(), c = $(
										"#MessageRecipientEmail").val(), d = $(
										"#MessageBody").val();
								if (!a) {
									$("#MessageRecipientName").parent().find(
											".error").html(
											"Please enter recipient name.");
									return false
								}
								if (!c) {
									$("#MessageRecipientEmail").parent().find(
											".error").html(
											"Please enter recipient email.");
									return false
								}
								$("#EmailModal .SubmitButton").addClass(
										"disabled").text("Sending...");
								$
										.ajax({
											type : "POST",
											url : $(this).attr("action"),
											data : {
												name : a,
												email : c,
												message : d
											},
											complete : function(g) {
												g = $.parseJSON(g.responseText);
												if (g.status == "success") {
													trackGAEvent("email_modal",
															"success",
															"closeup");
													$(
															"#EmailModal .SubmitButton")
															.text("Sent!");
													setTimeout(
															"Modal.close('EmailModal'); Closeup.resetEmailModal(); $('#EmailModal .SubmitButton').addClass('disabled').html('<strong>Send Email</strong><span></span>');",
															500)
												} else {
													$(
															"#EmailModal .SubmitButton")
															.removeClass(
																	"disabled")
															.html(
																	"<strong>Send Email</strong><span></span>");
													g.message == "Invalid email address"
															&& $(
																	"#MessageRecipientEmail")
																	.parent()
																	.after(
																			$("#EmailModal .error"));
													$("#EmailModal .error")
															.html(g.message)
												}
											}
										});
								return false
							});
			$("#SocialShare #PinEmbed").click(
					function() {
						trackGAEvent("pin_embed", "clicked", "closeup");
						var a = $("#PinImageHolder img");
						if ($("#PinImageHolder iframe").length)
							a = $("#PinImageHolder iframe");
						var c = a.width();
						a = a.height();
						max_closeup_image_width = c;
						max_closeup_image_height = a;
						$("#EmbedImageWidth").val(c);
						$("#EmbedImageHeight").val(a);
						$("#EmbedHTMLCode").val(
								embed_code_html_1 + c + "' height ='" + a
										+ embed_code_html_2);
						Modal.show("EmbedModal");
						return false
					});
			$("#EmbedImageWidth").keyup(
					function() {
						$(this).val() > max_closeup_image_width
								&& $("#EmbedImageWidth").val(
										max_closeup_image_width);
						var a = parseInt($("#EmbedImageWidth").val()
								* max_closeup_image_height
								/ max_closeup_image_width);
						$("#EmbedImageHeight").val(a);
						$("#EmbedHTMLCode").val(
								embed_code_html_1 + $("#EmbedImageWidth").val()
										+ "' height ='"
										+ $("#EmbedImageHeight").val()
										+ embed_code_html_2);
						return false
					});
			$("#EmbedImageHeight").keyup(
					function() {
						$(this).val() > max_closeup_image_height
								&& $("#EmbedImageHeight").val(
										max_closeup_image_height);
						var a = parseInt(Math.ceil($("#EmbedImageHeight").val()
								* max_closeup_image_width
								/ max_closeup_image_height));
						$("#EmbedImageWidth").val(a);
						$("#EmbedHTMLCode").val(
								embed_code_html_1 + $("#EmbedImageWidth").val()
										+ "' height ='"
										+ $("#EmbedImageHeight").val()
										+ embed_code_html_2);
						return false
					});
			$(".DeleteComment").live(
					"click",
					function() {
						trackGAEvent("delete_comment", "clicked", "closeup");
						var a = $(this);
						if (a.attr("ban"))
							if (!confirm("Are you sure you want to ban "
									+ a.attr("username") + "?"))
								return false;
						a.trigger("mouseleave");
						var c = a.parents(".comment");
						c.slideUp("slow");
						$.ajax({
							url : a.attr("href"),
							type : "POST",
							dataType : "json",
							data : {
								comment : a.attr("data")
							},
							error : function(d) {
								c.show();
								d.message.length > 0 && alert(d.message)
							},
							success : function() {
								trackGAEvent("delete_comment", "success",
										"closeup");
								c.remove()
							}
						});
						return false
					})
		},
		resetReportModal : function() {
			$("#ReportModal .PostSuccess").removeClass("PostSuccess");
			$("#ReportModal .ReportSuccess").remove();
			$('#ReportModal .option input[type="radio"]')
					.attr("checked", false);
			$("#ReportModal select option:first-child").attr("selected",
					"selected");
			$("#ReportModal .Button").addClass("disabled");
			$("#ReportPin").val("").blur();
			$("#ReportModal form").show()
		},
		resetEmailModal : function() {
			$("#MessageRecipientEmail").val("").blur();
			$("#MessageRecipientName").val("").blur();
			$("#MessageBody").val("").blur();
			$("#EmailModal .error").html("")
		}
	}
}();
var InviteForm = function() {
	return {
		setup : function() {
			var a = $("#SendInvites"), c = $("#EmailAddresses .email");
			a.click(function() {
				trackGAEvent("invite_form", "clicked");
				c.each(function() {
					var d = $(this), g = $("textarea[name=message]"), f = d
							.parent("li").children(".helper");
					!d.val() == ""
							&& $.post("/invite/new/", {
								name : "somebody",
								message : g.val(),
								email : d.val()
							}, function(b) {
								if (b.status == "success") {
									trackGAEvent("invite_form", "success");
									d.removeClass("error");
									f.html("Invite Sent!")
											.css("color", "green").slideDown();
									d.val("").keyup();
									g.val("").keyup()
								} else {
									d.addClass("error");
									f.html(b.message).css("color", "red")
											.slideDown()
								}
							}, "json")
				});
				return false
			})
		}
	}
}();
var FancyForm = function() {
	return {
		inputs : ".Form input, .Form textarea",
		button : ".SubmitButton",
		setup : function() {
			var a = this;
			this.inputs = $(this.inputs);
			a.inputs.each(function() {
				var c = $(this);
				a.checkVal(c)
			});
			a.inputs.live("keyup blur", function() {
				var c = $(this);
				a.checkVal(c);
				var d = c.parents("ul"), g = c.parents(".Form").find(a.button);
				c.parents("li").hasClass("NoCheck") || a.checkDisabled(d, g)
			});
			$(a.button).live("click", function() {
				var c = $(this).attr("data-form");
				if ($(this).hasClass("disabled"))
					return false;
				else
					$("#" + c + " form").submit()
			})
		},
		checkVal : function(a) {
			a.val().length > 0 ? a.parent("li").addClass("val") : a
					.parent("li").removeClass("val")
		},
		checkDisabled : function(a, c) {
			a.children("li:not(.optional)").length <= a.children("li.val").length ? c
					.removeClass("disabled")
					: c.addClass("disabled")
		}
	}
}();
var MAX_PIN_CHARACTER_COUNT = 500, CharacterCount = CharacterCount || {
	setup : function(a, c, d) {
		a = $(a);
		c = $(c);
		d = $(d);
		a.focus(function() {
			CharacterCount.showCount(a, c, d)
		}).bind("keyup.cc input.cc paste.cc", function() {
			CharacterCount.showCount(a, c, d)
		})
	},
	truncateData : function(a, c) {
		a = $(a);
		c = c || 500;
		a.val().length > c && a.val(a.val().substr(0, c - 3) + "...")
	},
	showCount : function(a, c, d) {
		a = MAX_PIN_CHARACTER_COUNT - a.val().length;
		c.text(a);
		a < 0 || a >= 500 ? d.addClass("disabled") : d.removeClass("disabled");
		a < 0 ? c.addClass("error") : c.removeClass("error")
	}
};
var Tagging = function() {
	return {
		friends : null,
		friendsLinks : {},
		getFriends : function(a, c, d) {
			var g = a.term;
			(function(f) {
				Tagging.friends ? f() : $.get("/x2ns4tdf0cd7cc9b/_getfriends/",
						function(b) {
							Tagging.friends = [];
							$.each(b,
									function(e, h) {
										Tagging.friends.push({
											label : h.name,
											value : h.username,
											image : h.image,
											link : "/" + h.username + "/",
											category : "People"
										});
										Tagging.friendsLinks["/" + h.username
												+ "/"] = 1
									});
							f()
						})
			})(function() {
				var f = [];
				if (d)
					for (name in d)
						Tagging.friendsLinks[name] || !d.hasOwnProperty(name)
								|| f.push(d[name]);
				f = f.concat(Tagging.friends);
				if (g)
					f = tagmate.filter_options(f, g);
				c(f)
			})
		},
		initInput : function(a, c, d) {
			a = $(a);
			var g = $("<div class='CollabAutocompleteHolder'></div>");
			a.after(g);
			a.autocomplete({
				source : Tagging.getFriends,
				minLength : 1,
				delay : 5,
				appendTo : g,
				change : function(f, b) {
					c && c(b.item)
				},
				select : function(f, b) {
					c && c(b.item);
					return false
				},
				position : {
					my : "left top",
					at : "left bottom",
					offset : "0 -1"
				}
			}).keydown(function(f) {
				f.which == 13 && d && d()
			});
			a.data("autocomplete")._renderItem = function(f, b) {
				return $("<li></li>")
						.data("item.autocomplete", b)
						.append(
								"<a href='"
										+ b.link
										+ "'><img src='"
										+ b.image
										+ "' class='AutocompletePhoto' alt='Photo of "
										+ b.label
										+ "' width='38px' height='38px'/><span class='AutocompleteName'>"
										+ b.label + "</span></a>").appendTo(f)
			}
		},
		initTextarea : function(a, c) {
			a = $(a);
			var d = {};
			d["@"] = tagmate.USER_TAG_EXPR;
			d["#"] = tagmate.HASH_TAG_EXPR;
			d.$ = tagmate.USD_TAG_EXPR;
			d["\u00a3"] = tagmate.GBP_TAG_EXPR;
			a.tagmate({
				tagchars : d,
				sources : {
					"@" : function(g, f) {
						Tagging.getFriends(g, f, c)
					}
				}
			})
		},
		loadTags : function(a, c, d, g) {
			a = $(a).getTags();
			for ( var f = [], b = [], e = null, h = 0; h < a.length; h++) {
				a[h][0] == "@" && f.push(a[h].substr(1));
				a[h][0] == "#" && b.push(a[h].substr(1));
				if (a[h][0] == "$" || a[h][0] == "\u00a3")
					e = a[h]
			}
			$(c).val(f.join(","));
			$(d).val(b.join(","));
			$(g).val(e)
		},
		priceTag : function(a, c) {
			function d() {
				var g = $(".price", c);
				if (g.length <= 0) {
					g = $("<div class='price'></div>");
					c.prepend(g)
				}
				var f = a.getTags({
					$ : tagmate.USD_TAG_EXPR,
					"\u00a3" : tagmate.GBP_TAG_EXPR
				});
				if (f && f.length > 0) {
					g.text(f[f.length - 1]);
					g.addClass("visible")
				} else {
					g.removeClass("visible");
					g.text("")
				}
			}
			a = $(a);
			c = $(c);
			a.unbind(".priceTag").bind("keyup.priceTag", d).bind(
					"focus.priceTag", d).bind("change.priceTag", d);
			d()
		}
	}
}();
var RepinDialog = RepinDialog
		|| {
			setup : function() {
				var a = $("#Repin"), c = $("form", a), d = $(
						".Buttons .Button", a), g = $("strong", d), f = $(
						".DescriptionTextarea", a), b = $(".CharacterCount", a), e = $(
						".mainerror", a);
				BoardPicker.setup("#Repin .BoardPicker", function(h) {
					$("#repin_board", a).val(h)
				}, function(h) {
					$("#repin_board", a).val(h)
				});
				AddDialog.shareCheckboxes("Repin");
				CharacterCount.setup(f, b, d);
				d.click(function() {
					if (f.val() == "" || f.val() == "Describe your pin.") {
						e.html("Please enter a description.").slideDown();
						return false
					}
					$("#Repin #repin_details").val(f.val());
					Tagging.loadTags(f, "#Repin #repin_comment_replies",
							"#Repin #repin_tags",
							"#Repin #repin_currency_holder");
					c.submit();
					return false
				});
				c
						.submit(function() {
							if (d.hasClass("disabled"))
								return false;
							trackGAEvent("repin_submit", "clicked", "dialogue");
							d.addClass("disabled");
							g.html("Pinning...");
							$
									.ajax({
										type : "POST",
										url : $(this).attr("action"),
										dataType : "json",
										data : $(this).serialize(),
										success : function(h) {
											if (h.status == "success") {
												trackGAEvent("repin_submit",
														"success", "dialogue");
												var j = $(".PostSuccess", a);
												$(".BoardLink", j).attr("href",
														h.board_url).text(
														h.board_name);
												$(".PinLink", j).attr("href",
														h.repin_url);
												j.show();
												setTimeout(function() {
													a.addClass("super")
												}, 1);
												setTimeout(function() {
													RepinDialog.reset()
												}, 2500);
												$("#CloseupRight").length > 0
														&& $("#PinRepins")
																.append(
																		'<a href="'
																				+ h.repin_user_url
																				+ '" class="CommenterImage" title="Repinned by <a href=\'#\'>'
																				+ h.repin_user_name
																				+ "</a> to <a href='#'>"
																				+ h.board_name
																				+ '</a>"><img src="'
																				+ h.repin_user_image
																				+ '" alt="Thumbnail of" /></a>')
											} else {
												d.removeClass("disabled");
												g.html("Pin It")
											}
										},
										error : function() {
											d.removeAttr("disabled").html(
													"Pin It")
										}
									});
							return false
						})
			},
			grid : function() {
				$(".repin_link").live("click", function() {
					trackGAEvent("repin_button", "clicked", "board_layout");
					pinID = $(this).parents(".pin").attr("data-id");
					RepinDialog.show(pinID);
					return false
				})
			},
			show : function(a) {
				var c = $("#Repin");
				$
						.getJSON(
								"/pin/" + a + "/repindata/",
								{},
								function(d) {
									$(".DescriptionTextarea", c).val(d.details)
											.parent("li").addClass("val");
									var g = '<img src="' + d.imgurl + '" />';
									if (d.video)
										g = '<img src="'
												+ media_url
												+ 'images/VideoIndicator.png" alt="Video Icon" class="video" />'
												+ g;
									d.buyable
											&& $(".ImagePicker .price", c)
													.html("$" + d.buyable);
									$(".Images", c).html(g);
									$("#repin_pin_id", c).val(a);
									$("#repin_tags", c).val(d.tags.join(","));
									$("#repin_comment_replies", c).val(
											d.reply_usernames.join(","));
									$("form", c).attr("action",
											"/pin/" + a + "/repin/");
									Tagging
											.initTextarea("#Repin .DescriptionTextarea");
									Tagging.priceTag(
											"#Repin .DescriptionTextarea",
											"#Repin .Images");
									CharacterCount.truncateData(
											"#Repin .DescriptionTextarea", 500);
									Modal.show("Repin");
									setTimeout(function() {
										$(".DescriptionTextarea", c).focus()
												.select()
									}, 350)
								})
			},
			reset : function() {
				var a = $("#Repin");
				Modal.close("Repin");
				a.removeClass("visible").removeClass("super");
				$(".PostSuccess", a).hide();
				$("form", a).attr("action", "");
				$(".DescriptionTextarea", a).val("");
				$(".ImagePicker .Images", a).html("");
				$(".price", a).removeClass("visible").html("");
				$(".mainerror", a).html("");
				$(".Buttons .RedButton", a).removeClass("disabled");
				$(".Buttons .RedButton strong", a).html("Pin It");
				$("#repin_pin_id", a).val("")
			}
		};
var ScrapePinDialog = ScrapePinDialog
		|| {
			id : "ScrapePin",
			setup : function() {
				var a = this;
				AddDialog.setup(a.id);
				a.initScraperInput()
			},
			initScraperInput : function() {
				function a(j) {
					return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
							.test(j)
				}
				function c(j) {
					var k = true;
					if (j.indexOf("http") != 0)
						j = "http://" + j;
					if (j == "")
						k = false;
					if (j == "http://")
						k = false;
					if (j.length < 2)
						k = false;
					if (j.indexOf(".") == -1)
						k = false;
					a(j) || (k = false);
					return k
				}
				function d() {
					var j = $("#" + ScrapePinDialog.id), k = $(
							"#ScrapePinInput").val();
					if (h !== k) {
						h = k;
						if (c(k)) {
							if (k.indexOf("http") != 0)
								k = "http://" + k;
							$(".load", j).show();
							$(".ImagePicker .Images ul", j).empty();
							k = escape(k);
							setTimeout(g, 5E3);
							images_count = 0;
							imagesArray = [];
							msg = "";
							$.getJSON("/pin/create/find_images/", {
								url : k
							}, function(p) {
								if (p.status === "success") {
									images_count = p.images.length;
									for ( var s = 0; s < p.images.length; s++) {
										urlImage = new Image;
										urlImage.src = p.images[s];
										msg += "<br/>Loading " + urlImage.src;
										urlImage.onload = function() {
											images_count -= 1;
											images_count == 0 && f()
										};
										imagesArray.push(urlImage)
									}
									p.title.length > 80 ? $("#id_title").val(
											p.title.substring(0, 79)) : $(
											"#id_title").val(p.title);
									$(".load", j).hide();
									$("#id_link").val($("#scrape_url").val());
									$("#PinSourceURL").html("Source: " + k)
											.removeClass("hidden");
									AddDialog.pinBottom("ScrapePin");
									$(".Arrows", j).addClass("holla").show();
									$("#ScrapeButton").removeClass("disabled")
								} else {
									$(".load", j).hide();
									$("#ScrapeButton").removeClass("disabled");
									alert("We couldn't find any images: "
											+ p.message)
								}
							})
						} else
							alert("Not a valid URL!")
					}
				}
				function g() {
					if (images_count > 0) {
						images_count = -1;
						f()
					}
				}
				function f() {
					strHtml = "";
					imgFound = false;
					for ( var j = foundCtr = 0; j < imagesArray.length; j++) {
						img = imagesArray[j];
						if (img.width >= 150 && img.height >= 50) {
							imgFound = true;
							foundCtr++;
							strHtml += "<li>"
									+ (is_video(img.src) ? media_url
											+ "images/VideoIndicator.png' alt='Video Icon' class='video' />"
											: "") + "<img src='" + img.src
									+ "' width='156px' alt='' /></li>"
						}
					}
					if (strHtml != "") {
						$("#ScrapePin .ImagePicker .Images ul").html(strHtml);
						b(foundCtr)
					} else
						alert("No Large Images Found.")
				}
				function b() {
					var j = function(p, s) {
						im = $(s).find("img")[0];
						if ($(im).hasClass("video"))
							im = $(s).find("img")[1];
						src = $(im).attr("src");
						$("#id_img_url").val(src);
						$("#id_link").val($("#ScrapePinInput").val())
					}, k = $("#ScrapePin .ImagePicker .Images").jcarousel(
							{
								buttonNextHTML : null,
								buttonPrevHTML : null,
								initCallback : function(p) {
									$("#ScrapePin .imagePickerNext").click(
											function() {
												p.next();
												return false
											});
									$("#ScrapePin .imagePickerPrevious").click(
											function() {
												p.prev();
												return false
											})
								},
								animation : "fast",
								itemVisibleInCallback : {
									onAfterAnimation : j
								},
								scroll : 1
							});
					j(k, $("#ScrapePin .ImagePicker").find("li")[0], 1, "next")
				}
				function e() {
					var j = $("#ScrapeButton");
					if (c($("#ScrapePinInput").val())) {
						j.addClass("disabled");
						d()
					} else {
						alert("Please enter a valid website URL");
						j.removeClass("disabled")
					}
				}
				var h = "";
				$("#ScrapePinInput").bind("keydown", function(j) {
					j.keyCode === 13 && e()
				});
				$("#ScrapeButton").click(function() {
					e();
					return false
				})
			},
			reset : function() {
				var a = $("#" + this.id);
				$("#ScrapePinInput", a).val("");
				$(".PinBottom", a).hide();
				$(".modal", a).css("margin-bottom", "0");
				$(".Buttons .Button", a).removeClass("disabled");
				$(".Buttons .Button strong", a).html("Pin It");
				ScrapePinDialog.initScraperInput()
			}
		};
var PeoplePages = PeoplePages
		|| {
			setup : function() {
				$("#MorePeople")
						.live(
								"click",
								function() {
									var a = $(this), c = a.attr("href");
									a
											.html('<strong><img src="'
													+ media_url
													+ 'images/ajaxload2.gif" alt="Loader" /></strong><span></span>');
									$
											.get(
													c,
													function(d) {
														if (d.status == "success") {
															$("#PeopleList")
																	.append(
																			d.html);
															if (d.page != undefined) {
																d = $.query
																		.load(c)
																		.set(
																				"page",
																				d.page);
																a
																		.html(
																				"<strong>More</strong><span></span>")
																		.attr(
																				"href",
																				d)
															} else
																a.remove()
														} else
															alert(d.message)
													}, "json");
									return false
								})
			}
		};
var Nag = Nag
		|| {
			setup : function(a) {
				var c = $(".Nag").outerHeight();
				$("#" + a + " .NagSpacer").css("height", c + "px");
				if ($(".CloseupLeft").length > 0) {
					a = parseInt($(".CloseupLeft").css("top"), 10) + c;
					$(".CloseupLeft").css("top", a + "px")
				}
			},
			hide : function(a) {
				a = $("#" + a);
				var c = $(".Nag", a).outerHeight();
				$(".Sheet", a).css("top", "-" + c + "px").css("bottom",
						c + "px");
				setTimeout(
						"$('.UndoSheet').css('top','0px').css('bottom','0px')",
						1100)
			}
		};
var CategorizeBoard = function() {
	return {
		setup : function(a) {
			Nag.setup(a);
			$("#" + a + " select").bind(
					"change",
					function() {
						$("#" + a + " option:selected").attr("value") != ""
								&& setTimeout("CategorizeBoard.hideSheets()",
										100)
					})
		},
		hideSheets : function() {
			Nag.hide("CategoryCallout");
			CategorizeBoard.addCategory()
		},
		addCategory : function() {
			var a = $("#CategorySelect option:selected"), c = a.text();
			a = a.attr("value");
			$("#CategoryCallout .UndoSheet").show().find("p span").text(c);
			$.post(boardEndpoint, {
				category : a
			}, function(d) {
				data = $.parseJSON(d);
				if (!data.status == "success") {
					$("#CategoryCallout .error").html(data.message).show();
					CategorizeBoard.undoCategory()
				}
			});
			return false
		},
		undoCategory : function() {
			$("#CategoryCallout .Nag").outerHeight();
			$(".UndoSheet").css("top", "-100px").css("bottom", "100px");
			$("#CategorySelect option:first").attr("selected", "selected");
			$.post(boardEndpoint, {
				undo : "1"
			}, function() {
			});
			setTimeout("CategorizeBoard.newHeights()", 750)
		},
		newHeights : function() {
			$("#CategoryCallout .Sheet1").css("top", "auto").css("bottom",
					"auto !important");
			$("#CategoryCallout .Sheet2").css("top", "0px").css("bottom",
					"-3px");
			$("#CategoryCallout .Sheet3").css("top", "0px").css("bottom",
					"-5px")
		}
	}
}();
var UploadPinDialog = UploadPinDialog
		|| {
			id : "UploadPin",
			setup : function() {
				var a = this, c = $("#" + a.id);
				AddDialog.setup(a.id);
				$("input[type=file]", c)
						.change(
								function() {
									trackGAEvent("upload_file", "submitted");
									AddDialog.pinBottom(a.id);
									$(".ImagePicker ul", c)
											.html(
													"<li><img src='{{ MEDIA_URL }}images/load2.gif' class='load' alt='Loading Indicator' /></li>");
									$(".ImagePicker .load", c).show();
									$("form", c)
											.ajaxSubmit(
													{
														type : "POST",
														dataType : "json",
														iframe : true,
														url : "/pin/preview/",
														success : function(d) {
															if (d.status === "success") {
																trackGAEvent(
																		"upload_file",
																		"success");
																$(".load", c)
																		.hide();
																$(
																		".ImagePicker ul",
																		c)
																		.html(
																				"<li><img src='"
																						+ d.image_url
																						+ "' /></li>")
															} else
																alert(d.message)
														}
													});
									return false
								})
			},
			reset : function() {
				var a = $("#" + this.id);
				$("input[type=file]", a).val("");
				$(".PinBottom", a).hide();
				$(".modal", a).css("margin-bottom", "0");
				$(".Buttons .Button", a).removeClass("disabled");
				$(".Buttons .Button strong", a).html("Pin It")
			}
		};
var CreateBoardDialog = function() {
	return {
		setup : function() {
			function a() {
				if (!f) {
					f = true;
					Tagging.initInput("#CreateBoard #collaborator_name",
							function(b) {
								g = b
							}, function() {
								$("#CreateBoard #submit_collaborator").click()
							})
				}
			}
			function c() {
				var b = [];
				$("#CurrentCollaborators .Collaborator", d).each(function() {
					b.push($(this).attr("username"))
				});
				return b
			}
			var d = $("#CreateBoard"), g = null, f = false;
			a();
			$("#collaborator_name").defaultValue("Name or Email Address");
			$("#submit_collaborator", d)
					.click(
							function() {
								trackGAEvent("submit_board_collaborator",
										"clicked", "create_board_dialogue");
								if (g) {
									var b = '<li username="'
											+ g.value
											+ '" class="Collaborator"><a href="http://pinterest.com/'
											+ g.value
											+ '"><img class="collaborator_image" src="'
											+ g.image
											+ '" alt="Collaborator Photo"></a><a class="collaborator_name" href="http://pinterest.com/'
											+ g.value
											+ '">'
											+ g.label
											+ '</a><a href="#" class="delete_collaborator" value="'
											+ g.value + '">Remove</a></li>';
									$("#CurrentCollaborators", d).prepend(b);
									$("#collaborator_name", d).val("");
									g = null
								}
							});
			$(".delete_collaborator", d).live(
					"click",
					function() {
						trackGAEvent("delete_collaborator", "clicked",
								"create_board_dialogue");
						$(this).parent().remove();
						return false
					});
			$("input[name='change_BoardCollaborators']", d).change(function() {
				switch ($(this).val()) {
				case "me":
					$("#add_collaborators", d).hide();
					break;
				case "multiple":
					$("#add_collaborators", d).show();
					a();
					break;
				default:
					$("#add_collaborators", d).hide();
					break
				}
			});
			BoardPicker.setup("#CreateBoard .BoardPicker", function(b) {
				$("#id_category", d).val(b)
			});
			$("#BoardName", d).keyup(
					function() {
						$(".board_name.error", d).html() !== ""
								&& $(".board_name.error", d).html("")
					});
			$(".Submit .Button", d)
					.click(
							function() {
								trackGAEvent("create_board", "clicked",
										"create_board_dialogue");
								if ($("#BoardName", d).val() == "Board Name"
										|| $("#BoardName", d).val() == "") {
									$(".CreateBoardStatus", d).html(
											"Please enter a board name").show();
									return false
								}
								if (!$("#id_category", d).val()) {
									$(".CreateBoardStatus", d).html(
											"Please select a category").show();
									return false
								}
								var b = $(".Submit .Button", d), e = b
										.children("strong");
								b.attr("disabled", "disabled").addClass(
										"disabled");
								e.html("Creating &hellip;");
								$
										.post(
												"/board/create/",
												{
													name : $("#BoardName", d)
															.val(),
													category : $(
															"#id_category", d)
															.val(),
													collaborator : $(
															"input[name='change_BoardCollaborators']:checked",
															d).val(),
													"collaborators[]" : c()
												},
												function(h) {
													if (h.status == "success") {
														trackGAEvent(
																"create_board",
																"success",
																"create_board_dialogue");
														d.hide();
														$("#BoardName", d).val(
																"Board Name");
														$(".CreateBoardStatus",
																d).html("")
																.hide();
														$("#id_category", d)
																.val("");
														$(".CurrentCategory", d)
																.text(
																		"Select a Category");
														window.location = h.url
													} else {
														$(".CreateBoardStatus",
																d).html(
																h.message)
																.show();
														b
																.removeAttr(
																		"disabled")
																.removeClass(
																		"pressed")
																.html("Create")
													}
												}, "json");
								return false
							})
		},
		reset : function() {
			$("#BoardName").val("");
			$("input[value='me']").attr("checked", true);
			$("#CurrentCollaborators").empty()
		}
	}
}();
var Login = function() {
	return {
		setup : function() {
			var a = $(".AuthForm"), c = $(".non_inputs", a), d = $(
					"#id_password", a), g = function(f) {
				if (f.keyCode === 13) {
					a.submit();
					$(".Button", a).addClass("disabled");
					d.unbind("keydown")
				}
			};
			d.bind("focus", function() {
				d.bind("keydown", function(f) {
					g(f)
				})
			});
			$("#resetPassword").click(function() {
				$("#id_password").parent().fadeOut(500, function() {
					c.css("margin-top", 0)
				});
				c.animate({
					marginTop : "-50px"
				});
				c.parents("form").attr("action", "/password/reset/");
				$(".Button strong", c).text("Reset");
				$("#resetPassword").fadeOut(500);
				$("#backToLogin").fadeIn(500);
				return false
			});
			$("#backToLogin").click(function() {
				$("#id_password").parent().fadeIn(500, function() {
					c.css("margin-top", 0)
				});
				c.css({
					"margin-top" : "-50px"
				}).animate({
					marginTop : "0px"
				});
				c.parents("form").attr("action", "/login/");
				$(".Button strong", c).text("Login");
				$("#resetPassword").fadeIn(500);
				$("#backToLogin").fadeOut(500);
				return false
			})
		}
	}
}();
var EditPin = function() {
	return {
		setup : function() {
			Tagging.initTextarea("#description_pin_edit");
			Tagging.priceTag("#description_pin_edit", "#PinEditPreview");
			$("#PinEdit").submit(
					function() {
						Tagging.loadTags("#description_pin_edit",
								"#id_pin_replies", "#pin_tags", "#id_buyable")
					});
			$("#description_pin_edit").keyup(function() {
				$("#postDescription").html($(this).val())
			})
		},
		deletePin : function() {
			var a = $("#DeletePin .SubmitButton");
			a.addClass("disabled");
			$("strong", a).text("Deleting...");
			$.post("/pin/" + pinID + "/delete/", {}, function(c) {
				if (c.status == "success") {
					trackGAEvent("delete_pin", "success");
					window.location = c.url
				} else
					alert(c.message)
			}, "json")
		}
	}
}();
var EditBoard = function() {
	return {
		setup : function() {
			var a = this;
			$("#BoardEdit #collaborator_name").defaultValue("Enter a name");
			$(".pinability input[name='change_BoardCollaborators']").change(
					function() {
						var c = $("#BoardEdit").find("#add_collaborators");
						switch ($(this).val()) {
						case "me":
							c.hide();
							$("#id_public").attr("checked", false);
							break;
						case "multiple":
							c.show();
							$("#id_public").attr("checked", false);
							a.init_ac();
							break;
						default:
							c.hide();
							$("#id_public").attr("checked", true);
							break
						}
					});
			BoardPicker.setup("#BoardEdit .BoardPicker", function(c) {
				$("#BoardEdit #id_category").val(c)
			});
			$("#BoardEdit #submit_collaborator")
					.click(
							function() {
								trackGAEvent("submit_collaborator", "clicked",
										"edit_board_dialogue");
								if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
										.test($("#BoardEdit #collaborator_name")
												.val())) {
									$("#InviteCollaborator").show();
									$("#InviteCollaborator #invite_email").val(
											$("#BoardEdit #collaborator_name")
													.val());
									invite_email = $(
											"#BoardEdit #collaborator_name")
											.val();
									$("#invite_email, #invite_message").blur();
									$("#BoardEdit #collaborator_name").val(
											"Enter a name")
								} else {
									$("#BoardEdit #add_collaborators")
											.children("input").serialize();
									$
											.post(
													board_collaborator,
													$(
															"#BoardEdit #add_collaborators")
															.children("input")
															.serialize(),
													function(c) {
														if (c.status == "success") {
															trackGAEvent(
																	"submit_collaborator",
																	"success",
																	"edit_board_dialogue");
															$(
																	"#BoardEdit #collaborator_username")
																	.val("");
															$(
																	"#BoardEdit #collaborator_name")
																	.val("");
															c = '<li><a href="'
																	+ c.profile_url
																	+ '"><img class="collaborator_image" src="'
																	+ c.avatar_url
																	+ '" alt="Collaborator Photo" /></a><a class="collaborator_name" href="'
																	+ c.profile_url
																	+ '">'
																	+ c.full_name
																	+ '</a><a href="#" class="delete_collaborator" value="'
																	+ c.username
																	+ '">Remove</a></li>';
															$(
																	"#BoardEdit #add_collaborators ul")
																	.prepend(c)
														} else
															alert(c.message)
													})
								}
								return false
							});
			$("#BoardEdit .delete_collaborator")
					.live(
							"click",
							function() {
								trackGAEvent("delete_colaborator", "clicked",
										"edit_board_dialogue");
								var c = $(this);
								$
										.post(
												board_collaborator,
												{
													collaborator_username : c
															.attr("value"),
													remove : true
												},
												function(d) {
													if (d.status == "success") {
														trackGAEvent(
																"delete_collaborator",
																"success",
																"edit_board_dialogue");
														c.parent().remove()
													} else
														alert("something went wrong. Could not remove you as collaborator. Try Again")
												});
								return false
							});
			$("#invite_submit").submit(
					function() {
						trackGAEvent("invite_board", "submit",
								"edit_board_dialogue");
						$.post("/invite/new/", {
							name : "somebody",
							email : $("#invite_email").val(),
							message : $("#invite_message").val(),
							board_user : board_username,
							board_name : board_slug
						}, function(c) {
							data = $.parseJSON(c);
							if (data.status == "success") {
								trackGAEvent("invite_board", "success",
										"edit_board_dialogue");
								$("#invite_name").val("");
								$("#invite_email").val("");
								$("#invite_response").html(
										"Invite sent successfully to "
												+ invite_email + ".").show()
										.delay(2E3).fadeOut(500)
							} else
								$("#invite_response").html(data.message)
						});
						return false
					});
			$("#invite_submit")
					.submit(
							function() {
								var c = 'Hi!\n\nI wanted to invite you to Pinterest so you can help contribute to my pinboard, "'
										+ board_body_name
										+ '". Pinterest is a place to catalog things you love. You can create pinboards on anything, from fashion, to gadgets, to art.\n\nEnjoy!';
								$("#InviteCollaborator").fadeOut(250);
								$("#InviteCollaborator #invite_email").val("");
								$("#InviteCollaborator #invite_message").val(c);
								$("#InviteCollaborator #invite_response").val(
										"")
							})
		},
		init_ac : function() {
			if (!ac_init) {
				ac_init = true;
				Tagging.initInput("#BoardEdit #collaborator_name", function(a) {
					$("#BoardEdit #collaborator_username").val(a.value);
					$("#BoardEdit #collaborator_name").val(a.label)
				}, function() {
					$("#BoardEdit #submit_collaborator").click()
				})
			}
		},
		deleteBoard : function() {
			trackGAEvent("delete_board", "clicked", "edit_board_dialogue");
			var a = $("#DeleteBoard .SubmitButton");
			a.addClass("disabled");
			$("strong", a).text("Deleting...");
			$
					.ajax({
						type : "DELETE",
						dataType : "json",
						url : board_settings,
						success : function(c) {
							trackGAEvent("delete_board", "success",
									"edit_board_dialogue");
							if (c.status == "done")
								window.location = "/";
							else
								alert("Board delete failed - please refresh and try again. We are very sorry :-/")
						},
						error : function() {
							alert("Board delete failed - please refresh and try again. We are very sorry :-/")
						}
					})
		}
	}
}();
(function(a) {
	a.fn
			.extend({
				switcher : function(c) {
					a.extend({}, c);
					if (!(a.browser.msie && a.browser.version < 9))
						return this
								.each(function(d) {
									function g() {
										h.checkbox.bind("change.switch", e);
										h.switcher.live("click.switch", b)
									}
									function f() {
										return a('<div class="switch"><div class="shadow"></div><div class="border"><div class="knob"><div class="circle"><div class="inner circle"></div></div><div class="labels"><label class="on">On</label><label class="off">Off</label></div></div></div></div>')
									}
									function b() {
										h.checkbox.attr("checked") !== "checked" ? h.checkbox
												.prop("checked", true)
												: h.checkbox.prop("checked",
														false);
										e()
									}
									function e() {
										h.x = h.switcher.find(".knob").offset().left;
										var j = a(".shadow", h.switcher);
										if (h.checkbox.attr("checked") == "checked") {
											a(".knob", h.switcher).css(
													"margin-left", "62%");
											j.addClass("on");
											console.log("moveKnob on")
										} else {
											a(".knob", h.switcher).css(
													"margin-left", "0%");
											j.removeClass("on");
											console.log("moveKnob off")
										}
									}
									var h = {
										checkbox : a(),
										switcher : a(),
										clicked : false,
										moved : false,
										startX : 0,
										x : 0
									};
									h.switcher = f(d);
									h.checkbox = a(this);
									h.checkbox.hide();
									h.checkbox.after(h.switcher);
									h.startX = h.switcher.find(".knob")
											.offset().left;
									g();
									e()
								})
				}
			})
})(jQuery);
