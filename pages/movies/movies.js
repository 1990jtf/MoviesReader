var util= require("../../utils/util.js");
var app =getApp();
Page({
  data:{
    "inTheaters":{},
    "comingSoon":{},
    "top250":{},
    "containerShow":true,
    "searchPanelShow":false,
    "searchUrl":"",
    "searchResult":{}
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    var inTheatersUrl = app.globalData.g_url+"/v2/movie/in_theaters"+"?start=0&count=6";
    var comingSoonUrl = app.globalData.g_url+"/v2/movie/coming_soon"+"?start=0&count=6";
    var top250Url = app.globalData.g_url+"/v2/movie/top250"+"?start=0&count=6";  

    this.getMoviesListData(inTheatersUrl,"inTheaters","正在热映");
    this.getMoviesListData(comingSoonUrl,"comingSoon","即将上映");
    this.getMoviesListData(top250Url,"top250","豆瓣top250");
  },
  onMoreTap:function(event){
    var category=event.currentTarget.dataset.category;
    wx.navigateTo({
      url: "more-movie/more-movie?category="+category
    })
  },
  onDetailTap:function(event){
    var movieId=event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: "movie-detail/movie-detail?id="+movieId
    })
  },
  onBindFoucs:function(){
    this.setData({
      containerShow:false,
      searchPanelShow:true
    })
  },
  onCloseTap:function(){
    this.setData({
      containerShow:true,
      searchPanelShow:false
    })
  },
  onBindBlur:function(event){
    var text=event.detail.value;
    var searchUrl=app.globalData.g_url+"/v2/movie/search?q="+text;
    this.getMoviesListData(searchUrl,"searchResult","");
  },
  getMoviesListData:function(url,movieKey,categoryTitle){
    var that = this;
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type":"Application/json"
      }, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data);
        that.processMoviesData(res.data,movieKey,categoryTitle);
      },
      fail: function(res) {
        // fail
      }
    })
  },
  processMoviesData:function(moviesData,movieKey,categoryTitle){
      var movies = [];
      for(var idx in moviesData.subjects){
        //获取每个subject
        var subject =moviesData.subjects[idx];
        var title =subject.title;
        //截取字符串
        if(title.length>=6){
          title= title.substring(0,6)+"...";
        }
        var temp={
            //获取评分，并转化为数组
            stars:util.convertStarsToArray(subject.rating.stars),
            title:title,
            average:subject.rating.average,
            coverageUrl:subject.images.large,
            movieId:subject.id
        }
        movies.push(temp);
        console.log("----------temp--------"+temp.stars);
      }
      
      var readayData={}
      readayData[movieKey]={
        categoryTitle:categoryTitle,
        movies:movies
};
      this.setData(readayData);
      //console.log(this.data);
  },
  onReady:function(){
    
  }
})