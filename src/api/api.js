import axios from 'axios';

// let base = 'http://127.0.0.1:8000';
let base = '';
export const getdatalist = params => { return axios.get(`${base}/tablelist`, { params: params }); };
export const removedata  = params => { return axios.delete(`${base}/tablelist/${params.id}/`); };
export const batchRemovedata  = params => { return axios.delete(`${base}/tablelist/multiple_delete/`, { params: params }); };
export const editdata = params => { return axios.patch(`${base}/tablelist/${params.id}/`, params ); };
export const adddataPost = params => { return axios.post(`${base}/tablelist/`, params ).then(res => res.data); };
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

// export const getUserList = {
// 	axios.get('${base}/user/list')
// 			  .then(function (response) {
// 				console.log(response);
// 			  })
// 			  .catch(function (error) {
// 				console.log(error);
// 			  });
// }

// export const getdatalist = params => { return axios.get(`${base}/datalist/listpage`, { params: params }); };
// export const removedata  = params => { return axios.get(`${base}/datalist/remove`, { params: params }); };
// export const batchRemovedata  = params => { return axios.get(`${base}/datalist/batchRemove`, { params: params }); };
// export const editdata = params => { return axios.get(`${base}/datalist/edit`, { params: params }); };
// export const adddata = params => { return axios.get(`${base}/datalist/add`, { params: params }); };
// export const adddataPost = params => { return axios.post(`${base}/datalist/add`, params ).then(res => res.data); };
