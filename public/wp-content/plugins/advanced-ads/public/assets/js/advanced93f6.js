advads={max_per_session:function(e,t){var o=1;if((void 0===t||0===parseInt(t))&&(t=1),this.cookie_exists(e)){if(this.get_cookie(e)>=t)return!0;o+=parseInt(this.get_cookie(e))}return this.set_cookie(e,o),!1},count_up:function(e,t){var o=1;this.cookie_exists(e)&&(o+=parseInt(this.get_cookie(e))),this.set_cookie(e,o)},set_cookie_exists:function(e){return get_cookie(e)?!0:(set_cookie(e,"",0),!1)},get_cookie:function(e){var t,o,i,n=document.cookie.split(";");for(t=0;t<n.length;t++)if(o=n[t].substr(0,n[t].indexOf("=")),i=n[t].substr(n[t].indexOf("=")+1),o=o.replace(/^\s+|\s+$/g,""),o===e)return unescape(i)},set_cookie:function(e,t,o,i,n,s){var r=24*o*60*60;this.set_cookie_sec(e,t,r,i,n,s)},set_cookie_sec:function(e,t,o,i,n,s){var r=new Date;r.setSeconds(r.getSeconds()+parseInt(o)),document.cookie=e+"="+escape(t)+(null==o?"":"; expires="+r.toUTCString())+(null==i?"; path=/":"; path="+i)+(null==n?"":"; domain="+n)+(null==s?"":"; secure")},cookie_exists:function(e){var t=this.get_cookie(e);return null!==t&&""!==t&&void 0!==t?!0:!1},move:function(e,t,o){var i=jQuery(e);if("undefined"==typeof o&&(o={}),"undefined"==typeof o.css&&(o.css={}),"undefined"==typeof o.method&&(o.method="prependTo"),""===t&&"undefined"!=typeof o.target)switch(o.target){case"wrapper":var n="left";"undefined"!=typeof o.offset&&(n=o.offset),t=this.find_wrapper(e,n)}switch(o.method){case"insertBefore":i.insertBefore(t);break;case"insertAfter":i.insertAfter(t);break;case"appendTo":i.appendTo(t);break;case"prependTo":i.prependTo(t);break;default:i.prependTo(t)}},fix_element:function(e,t){var o=jQuery(e),i=o.parent();("static"===i.css("position")||""===i.css("position"))&&i.css("position","relative"),"undefined"!=typeof t&&t.is_invisible&&o.show();var n=parseInt(o.offset().top),s=parseInt(o.offset().left);"undefined"!=typeof t&&t.is_invisible&&o.hide(),o.css("position","fixed").css("top",n+"px").css("left",s+"px")},find_wrapper:function(e,t){var o;return jQuery("body").children().each(function(i,n){if(n.id!==e.substring(1)){var s=jQuery(n);if("right"===t&&s.offset().left+jQuery(s).width()<jQuery(window).width()||"left"===t&&s.offset().left>0)return("static"===s.css("position")||""===s.css("position"))&&s.css("position","relative"),o=n,!1}}),o},center_fixed_element:function(e){var t=jQuery(e),o=jQuery(window).width()/2-parseInt(t.css("width"))/2;t.css("left",o+"px")},center_vertically:function(e){var t=jQuery(e),o=jQuery(window).height()/2-parseInt(t.css("height"))/2;t.css("top",o+"px")},close:function(e){var t=jQuery(e);t.remove()}},jQuery(document).ready(function(){if(localStorage.getItem("advads_frontend_picker")){var e,t=jQuery("<div id='advads-picker-overlay'>"),o=[document.body,document.documentElement,document];t.css({position:"absolute",border:"solid 2px #428bca",backgroundColor:"rgba(66,139,202,0.5)",boxSizing:"border-box",zIndex:1e6,pointerEvents:"none"}).prependTo("body"),jQuery(document).mousemove(function(i){if(i.target!==e){if(~o.indexOf(i.target))return e=null,void t.hide();var n=jQuery(i.target),s=n.offset(),r=n.outerWidth(),a=n.outerHeight();e=i.target,t.css({top:s.top,left:s.left,width:r,height:a}).show(),console.log(jQuery(e).getPath())}}),jQuery(document).click(function(t){var o=jQuery(e).getPath();localStorage.setItem("advads_frontend_element",o),window.location=localStorage.getItem("advads_prev_url")})}}),jQuery.fn.extend({getPath:function(e,t){if("undefined"==typeof e&&(e=""),"undefined"==typeof t&&(t=0),this.is("html"))return"html > "+e;if(2===t)return e;var o=this.get(0).nodeName.toLowerCase(),i=this.attr("id"),n=this.attr("class");return"undefined"!=typeof i?(o+="#"+i,t+=1):"undefined"!=typeof n&&(o+="."+n.split(/[\s\n]+/).join(".")),this.siblings(o).length&&(o+=":eq("+this.index()+")"),""===e?this.parent().getPath(o,t):this.parent().getPath(o+" > "+e,t)}});