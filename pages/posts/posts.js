var dataOb = require("../data/data.js");
//dataOb 返回的是一个object对象,dataOb.dataList才是数组

Page({
  data:{
    
  },
  onDetailTap:function(event){
    var newsId=event.currentTarget.dataset.newsid;
    console.log("点击的文章ID："+newsId);
    wx.navigateTo({ 
      url: 'post-detail/post-detail?id='+newsId
    })
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    console.log("onLoad");
    // var newContent=[
    //     {
    //         news_date: "25 nov 2017",
    //         news_title: "微信小程序开放！",
    //         news_img: "/images/post/crab.png",
    //         news_autor_img: "/images/avatar/1.png",
    //         news_content:"新闻测试页面测试页面新闻测试页面测试页面新闻测试页面测试页面新闻测试页面测试页面新闻测试页面测试页面",
    //         news_like:"123",
    //         news_comment:"23"
    //     },
    //     {
    //         news_date: "24 nov 2017",
    //         news_title: "微信小程序开放！",
    //         news_img: "/images/post/cat.png",
    //         news_autor_img: "/images/avatar/2.png",
    //         news_content:"新闻测试页面测试页面新闻测试页面测试页面新闻测试页面测试页面新闻测试页面测试页面新闻测试页面测试页面",
    //         news_like:"123",
    //         news_comment:"23"
    //     },
    //     {
    //         news_date: "23 nov 2017",
    //         news_title: "微信小程序开放！",
    //         news_img: "/images/post/sls.jpg",
    //         news_autor_img: "/images/avatar/3.png",
    //         news_content:"新闻测试页面测试页面新闻测试页面测试页面新闻测试页面测试页面新闻测试页面测试页面新闻测试页面测试页面",
    //         news_like:"123",
    //         news_comment:"23"
    //     },
    //     {
    //         news_date: "22 nov 2017",
    //         news_title: "支持小程序",
    //         news_img: "/images/post/bl.png",
    //         news_autor_img: "/images/avatar/4.png",
    //         news_content:"新闻测试页面测试页面新闻测试页面测试页面新闻测试页面测试页面新闻测试页面测试页面新闻测试页面测试页面",
    //         news_like:"123",
    //         news_comment:"23"
    //     }
    // ]
    //把数据放在data里，方便数据绑定
    this.setData({newContent:dataOb.dataList});
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    //console.log("onReady");
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    //console.log("onShow");
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    //console.log("onHide");
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    //console.log("onUnload");
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    console.log("onPullDownRefresh");
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    //console.log("onReachBottom");
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})