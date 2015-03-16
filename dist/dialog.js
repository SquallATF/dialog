/*
 * Created with Sublime Text 2.
 * User: 田想兵
 * Date: 2015-03-16
 * Time: 20:27:54
 * Contact: 55342775@qq.com
 */
function Dialog() {
	var rnd = Math.random().toString().replace('.', '');
	this.id = 'dialog_' + rnd;
	this.settings={};
	this.settings.closeTpl = $('<span class="ui-dialog-close js-dialog-close">X</span>')
}
Dialog.prototype = {
	init: function(settings) {
		var _this = this;
		this.settings = $.extend({}, this.settings, settings);
		if (this.settings.mask) {
			this.mask = $('<div class="ui-dialog-mask"/>');
			$('body').append(this.mask);
		}
		$('body').append('<div class="ui-dialog" id="' + this.id + '"></div>');
		this.dialogContainer = $('#' + this.id);
		this.bindEvent();
		if (this.settings.show) {
			this.show();
		}
		if(this.settings.closeTpl){
			this.dialogContainer.append(this.settings.closeTpl);
		}
	},
	bindEvent: function() {
		var _this = this;
		if (this.settings.trigger) {
			$(this.settings.trigger).click(function() {
				_this.show();
			});
		};
		$(this.dialogContainer).delegate('.js-dialog-close','click',function(){
			_this.hide();
			return false;
		})
		$(window).resize(function() {
			_this.setPosition();
		});
		$(window).scroll(function() {
			_this.setPosition();
		})
	},
	hide: function() {
		if (typeof this.settings.target ==="object" ){
			this.dailogContent.append('body');
		}
		this.dialogContainer.addClass("zoomOut").removeClass('zoomIn');
	},
	show: function() {
		if (typeof this.settings.target === "string") {
			if (/^(\.|\#\w+)/gi.test(this.settings.target)) {
				this.dailogContent = $(this.settings.target);
			} else {
				this.dailogContent = $('<div>' + this.settings.target + '</div>')
			}
		} else {
			this.dailogContent = this.settings.target;
		}
		this.height = this.settings.height || this.dialogContainer.height();
		this.width = this.settings.width || this.dialogContainer.width();
		this.dialogContainer.append(this.dailogContent).show().css({
			height: this.height,
			width: this.width
		}).addClass('zoomIn').removeClass('zoomOut').addClass('animated');
		this.setPosition();
	},
	setPosition: function() {
		var top = (document.body.clientHeight - this.height) / 2 + document.body.scrollTop;
		var left = (document.body.clientWidth - this.width) / 2;
		if (left < 0) {
			left = 0;
		}
		if (top < document.body.scrollTop) {
			top = document.body.scrollTop;
		}
		this.dialogContainer.css({
			top: top,
			left: left
		})
	}
}