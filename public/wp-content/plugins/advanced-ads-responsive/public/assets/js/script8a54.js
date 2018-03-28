var advanced_ads_resizetimeout=1000;var advanced_ads_cookieexpires=14;if(!advanced_ads_get_cookie('advanced_ads_browser_width')||advanced_ads_get_cookie('advanced_ads_browser_width')!==advanced_ads_get_browser_width()){advanced_ads_save_width();}
if(window.addEventListener){window.addEventListener("resize",advanced_ads_resize_window,false);}else if(window.attachEvent){window.attachEvent("onresize",advanced_ads_resize_window);}
function advanced_ads_resize_window(){advads_resize_delay(function(){advanced_ads_save_width();},advanced_ads_resizetimeout);}
function advanced_ads_save_width(){var width=advanced_ads_get_browser_width();advanced_ads_set_cookie('advanced_ads_browser_width',width,advanced_ads_cookieexpires);}
var advads_resize_delay=(function(){var timer=0;return function(callback,ms){clearTimeout(timer);timer=setTimeout(callback,ms);};})();function advanced_ads_get_cookie(c_name)
{var i,x,y,ARRcookies=document.cookie.split(";");for(i=0;i<ARRcookies.length;i++)
{x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);x=x.replace(/^\s+|\s+$/g,"");if(x==c_name)
{return unescape(y);}}}
function advanced_ads_set_cookie(name,value,exdays,path,domain,secure)
{var exdate=new Date();exdate.setDate(exdate.getDate()+ exdays);document.cookie=name+"="+ escape(value)+
((exdate==null)?"":"; expires="+ exdate.toUTCString())+
((path==null)?"; path=/":"; path="+ path)+
((domain==null)?"":"; domain="+ domain)+
((secure==null)?"":"; secure");}
function advanced_ads_check_cookie(c_name)
{var c_value=advanced_ads_get_cookie(c_name);if(c_value!=null&&c_value!="")
{return false;}
return true;}
function advanced_ads_get_browser_width(){return jQuery(window).width();var browserWidth=0;if(typeof(window.innerWidth)=='number'){browserWidth=window.innerWidth;}else if(document.documentElement&&document.documentElement.clientWidth){browserWidth=document.documentElement.clientWidth;}else if(document.body&&document.body.clientWidth){browserWidth=document.body.clientWidth;}
return browserWidth;}