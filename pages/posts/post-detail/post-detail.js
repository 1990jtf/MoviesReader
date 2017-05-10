// pages/posts/post-detail/post-detail.js
var newsData = require("../../data/data.js");
//获取应用实例
var app = getApp();
Page({
  data: {
    isPlaying:false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var newsId = options.id;
    //获取当前的news，是使用newsData.dataList[newsId]，因为在data.js中导出使用datalist
    var currentNews = newsData.dataList[newsId];
    console.log("文章详情id:" + newsId);
    console.log(newsData);
    console.log(currentNews);
    this.setData({ currentNews: currentNews, newsId: newsId });
    //wx.clearStorageSync();
    //获取所有文章收藏缓存
    var newsCollected = wx.getStorageSync('news_collected');
    console.log(newsCollected);
    //如果程序是第一次运行，可能就没有缓存，也就获取不到
    if (newsCollected) {
      //获取当前文章收藏缓存
      var isCollected = newsCollected[newsId];
      //并把获取的是否缓存信息更新到data里，方便前台读取
      this.setData({ isCollected: isCollected });
    } else {
      //不存在的情况设置
      var newsCollected = {};
      newsCollected[newsId] = false;
      wx.setStorageSync('news_collected', newsCollected);
    }
    if(app.globalData.g_isPlaying && app.globalData.g_currentMusic == newsId){
        this.setData({
          isPlaying:true
        })
    }else{
        //清空全局变量
        this.setData({
          isPlaying:false
        })
        app.globalData.g_currentMusic=null;
    }
    //音乐事件监听
    var that = this;
    wx.onBackgroundAudioPlay(function(){
        that.setData({
          isPlaying:true
        })
        app.globalData.g_isPlaying=true;
        app.globalData.g_currentMusic=that.data.newsId;

    })
    wx.onBackgroundAudioPause(function(){
        that.setData({
          isPlaying:false
        })
        app.globalData.g_isPlaying=false;
        app.globalData.g_currentMusic=that.data.newsId;

    })
  },
  onCollectedTap: function () {
    var newsId = this.data.newsId;
    console.log("-----------onCollectedTap start---------");
    console.log("newsId:" + newsId);
    console.log(wx.getStorageSync('news_collected'));
    var newsCollected = wx.getStorageSync('news_collected');
    var isCollected = wx.getStorageSync('news_collected')[newsId];
    isCollected = !isCollected;
    newsCollected[newsId] = isCollected;
    //取反后，更新到缓存里
    wx.setStorageSync('news_collected', newsCollected);
    //并把数据更新到前台页面，实现图片切换
    this.setData({ isCollected: isCollected })
    console.log("-----------onCollectedTap end---------");
    wx.showToast({
      title: isCollected ? "收藏成功" : "取消收藏"
    })
  },
  onMusicTap:function(){
    var isPlaying=this.data.isPlaying;
    //获取当前文章的数据
    var currentNews = newsData.dataList[this.data.newsId];
    if(isPlaying){
      //如果在播放把暂停
      wx.pauseBackgroundAudio();
      this.setData({
        isPlaying:false
      })
    }else{
      wx.playBackgroundAudio({
        dataUrl: currentNews.music.url,
        title:currentNews.music.title,
        coverImgUrl:currentNews.music.coverImg,
      });
      this.setData({
        isPlaying:true
      })
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})