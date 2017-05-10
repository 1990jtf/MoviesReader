// pages/movies/more-movie/more-movie.js
var util = require("../../../utils/util.js");
var app = getApp();
Page({
  data: {
    requestUrl: "",
    totalCount: 0,
    isEmpty: true
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var category = options.category;
    var dataUrl = app.globalData.g_url;
    this.setData({
      categoryTitle: category,
      requestUrl: dataUrl
    })
    switch (category) {
      case "正在热映":
        var dataUrl = dataUrl + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        var dataUrl = dataUrl + "/v2/movie/coming_soon";
        break;
      case "豆瓣top250":
        var dataUrl = dataUrl + "/v2/movie/top250";
        break;
    }
    this.setData({
      requestUrl: dataUrl
    })
    this.getMoviesListData(dataUrl);
  },
  onDetailTap:function(event){
    var movieId=event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: "../movie-detail/movie-detail?id="+movieId
    })
  },
  getMoviesListData: function (url) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "Application/json"
      }, // 设置请求的 header
      success: function (res) {
        // success
        //console.log(res.data);
        that.processMoviesData(res.data);
      },
      fail: function (res) {
        // fail
      }
    })
  },
  scrollToLower: function (event) {
    var that = this;
    var totalCount = this.data.totalCount;
    var nextUrl = this.data.requestUrl + "?start=" + totalCount + "&count=20";
    that.getMoviesListData(nextUrl);
    //设置等待ui
    wx.showNavigationBarLoading();
    console.log(nextUrl);
  },
  processMoviesData: function (moviesData) {
    var movies = [];
    var totalCount = this.data.totalCount;
    for (var idx in moviesData.subjects) {
      //获取每个subject
      var subject = moviesData.subjects[idx];
      var title = subject.title;
      //截取字符串
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        //获取评分，并转化为数组
        stars: util.convertStarsToArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp);
      //console.log("----------temp--------"+temp.stars);
    }
    var totalMovies = {};
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies);
    } else {
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies
    });
    this.setData({
      totalCount: totalCount + 20
    })
    //设置等待ui
    wx.hideNavigationBarLoading();
  },
  onReady: function () {
    // 页面渲染完成
    wx.setNavigationBarTitle({
      title: this.data.categoryTitle
    })
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