// index.js
// 获取应用实例
// import Message from 'tdesign-miniprogram/message/index'
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    powered: {
      by: 'icebreaker',
    },
    showRoot: false,
    theme: "light"
  },
  showTextMessage() {
    // Message.info({
    //   context: this,
    //   offset: [20, 32],
    //   duration: 5000,
    //   icon: false,
    //   content: '这是一条纯文字的消息通知 5s消失',
    // })
  },
  // 事件处理函数
  handleThemeChange: function (e) {
    console.log('current:',this.data.theme)
    this.setData({theme:this.data.theme==='light'?"dark":"light"})
  },
  showModal: function() {
    console.log('ddddd----------')
    this.setData({showRoot:true})
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
        },
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
  },
})
