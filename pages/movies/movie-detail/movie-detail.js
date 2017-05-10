// pages/movies/movie-detail/movie-detail.js
var util = require("../../../utils/util.js");
var app = getApp();
Page({
  data: {
    movie: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var movieId = options.id;
    //获取豆瓣单个电影连接
    var detailUrl = app.globalData.g_url + "/v2/movie/subject/" + movieId;
    this.getMoviesListData(detailUrl);
    console.log(detailUrl);
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
        that.processMoviesData(res.data);
      },
      fail: function (res) {
        // fail
      }
    })
  },
  processMoviesData: function (movieData) {
    console.log(movieData);
    var data = movieData;
    var director = {
      avatar: "",
      name: "",
      id: ""
    }
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large

      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }
    var movie = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes: data.genres.join("、"),
      stars: util.convertStarsToArray(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: util.convertToCastString(data.casts),
      castsInfo: util.convertToCastInfos(data.casts),
      summary: data.summary
      //summary: data.summary.substring(0, 100) + "..."
    }
    this.setData({
      movie: movie
    });
    console.log(this.data.movie);
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: "电影详情"
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