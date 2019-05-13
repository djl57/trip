const host = 'https://djlun.cn';

// const host = 'http://localhost:8081';

import http from './request.js'

const getOpenId = data => http(host + '/getOpenId', data, 'POST')
const postUserInfo = data => http(host + '/userInfo', data, 'POST')
const postCover = data => http(host + '/cover', data, 'POST')
const getCurPlan = data => http(host + '/getCurPlan', data)
const postPlan = data => http(host + '/plan', data, 'POST')
const getPlans = data => http(host + '/getPlans', data)
const getOnCovers = data => http(host + '/getOnCovers', data)
const editPlan = data => http(host + '/editPlan', data, 'POST')
const coverFinish = data => http(host + '/coverFinish', data, 'POST')
const delPlan = data => http(host + '/delPlan', data, 'POST')

module.exports = {
  getOpenId, postUserInfo, postCover, getCurPlan, postPlan, getPlans, getOnCovers,
  editPlan, coverFinish, delPlan
}