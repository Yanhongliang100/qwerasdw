var flag=true;
var audio = document.getElementById('audio-source');
var music = document.getElementById('music');
music.onclick=function (event) {
  if (flag) {
    event.target.style.backgroundPosition='left';
    flag=false;
    audio.pause();
  }else{
    event.target.style.backgroundPosition='right';
    flag=true;
    audio.play();
  }
}

/* 兼容iPhone背景音乐自动播放 */

window.onload=function () {
  setTimeout(function () {
    music.click();
    music.click();
  },12);
}
setTimeout(function(){
  // $(window).scrollTop(1);
},0);
audio.play();
document.addEventListener("WeixinJSBridgeReady", function () {
 WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
   audio.play();
 });
}, false);


if (!browserRedirect()) {
  alert("请在微信中打开");
  var dom = document.getElementById("content").style.display = "none"
  audio.pause();
}else{
  var dom = document.getElementById("content").style.display = "block"
  audio.play();
}






//分享设置
window.HOST='http://api.51xy8.com'
window.shareData = {
  title:document.title,
  link:location.href,
  imgUrl:"http://m.51xy8.com/static/img_h5/h5_logo.png",
  desc:"2017新中产资产配置报告",
}
console.log(isWeiXin());
if (isWeiXin()) {
  weixinShare()
}
function isWeiXin(){
	var ua = window.navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i) == 'micromessenger'){
		return true;
	}else{
		return false;
	}
}
function weixinShare(data){
  var url=HOST+"/api/session/share_weixin_config?url="+encodeURIComponent(window.location.href.split('#')[0]);
  $.ajax({
    type: 'GET',
    url: url,
    data: {},
    dataType: 'json',
    success: function(res){
      console.log(res);
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，
        appId: res.appId, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature,// 必填，签名，见附录1
        jsApiList: [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
    },
    error: function(xhr, type){
      alert('Ajax error!')
    }
  })
	wx.ready(function(){
    // 分享到到朋友圈
		// if (data) shareData=data
    var title=shareData.title;
    var link=shareData.link;
    var imgUrl=shareData.imgUrl;
    var desc=shareData.desc;
    wx.onMenuShareTimeline({
      title: title, // 分享标题
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl:imgUrl , // 分享图标
      success: function () {
        // alert("分享成功")
          // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // alert("取消分享")
          // 用户取消分享后执行的回调函数
      }
    });
    // 分享到给微信好友
    wx.onMenuShareAppMessage({
      title: title, // 分享标题
      desc:desc, // 分享描述
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      type: 'link', // 分享类型,music、video或link，不填默认为link
      // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        // alert("分享成功")
          // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // alert("取消分享")
          // 用户取消分享后执行的回调函数
      }
    });
    //分享到QQ空间
    wx.onMenuShareQZone({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    });

    //分享到QQ
    wx.onMenuShareQQ({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
         // 用户确认分享后执行的回调函数
      },
      cancel: function () {
         // 用户取消分享后执行的回调函数
      }
    });
	});
}

function browserRedirect() {
  var sUserAgent = navigator.userAgent.toLowerCase();
  var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  var bIsAndroid = sUserAgent.match(/android/i) == "android";
  var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    return true;
  } else {
    return false;
  }
}


// window.onload=function () {
//   setTimeout(function () {
//     music.click();
//     music.click();
//   },12);
// }
// setTimeout(function(){
//   $(window).scrollTop(1);
// },0);
// document.addEventListener("WeixinJSBridgeReady", function () {
//  WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
//    audio.play();
//  });
// }, false);
// wx.onMenuShareTimeline({
//     title: '分享标题', // 分享标题
//     link: 'http://www.baidu.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//     imgUrl: 'http://m.kofuf.com/static/img/weblogo.png', // 分享图标
//     success: function () {
//         // 用户确认分享后执行的回调函数
//     },
//     cancel: function () {
//         // 用户取消分享后执行的回调函数
//     }
// });
