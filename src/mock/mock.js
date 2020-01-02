//方法一：
import Mock from 'mockjs';
const  Random = Mock.Random;
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某'
  }
];
const adminInfo=[
 {
  name:'admin',
  password:'admin',
  email:'4399@qq.com'
 },{
  name:'test',
  password:'test',
  email:'1341313944@qq.com'
 },{
  name:'admin',
  password:'abc123',
  email:'112360@qq.com'
 },
 ]

const datalist = [];

for (let i = 0; i < 25; i++) {
  datalist.push(Mock.mock({
	id: ("id-"+Mock.Random.guid()),
    date: Random.date(),
    name: Random.cname(),
    email:Random.email("163.com"),
    address: Random.county(true),
  }));
}
let _datalist =datalist;
let mockA = new MockAdapter(axios);

	//不带参数请求
	// Mock.mock('/user', 'get', adminInfo);
	// Mock.mock('/datalist', 'get', _datalist);
	// mockA.onGet('/datalist').reply(200, _datalist);

	//获取用户列表（分页）
	mockA.onGet('/tablelist').reply(config => {		
		let {page} = config.params;
		let datafilter = _datalist;
	 //  let {page, search} = config.params;
	 //  let datafilter = _datalist.filter(d => {
		// if (search && d.name.indexOf(search) == -1) return false;
		// return true;
	 //  });
	  let total = datafilter.length;
	  datafilter = datafilter.filter((u, index) => index < 10 * page && index >= 10 * (page - 1));
	  return new Promise((resolve, reject) => {
		setTimeout(() => {
		  resolve([200, {
			count: total,
			results: datafilter
		  }]);
		}, 100);
	  });
	});
	//带参数请求
	//删除
	mockA.onDelete(/\/tablelist\/id-.*\//).reply(config => {	
		console.log("config:",config)
		let len1 = "/tablelist/".length
		let id  = config.url.substr(len1,(config.url.length-1-len1));
		console.log("id:",id)
		// let { id } = config.params;
		_datalist = _datalist.filter(u => u.id !== id);
		return new Promise((resolve, reject) => {
		  setTimeout(() => {
			resolve([200, {
			  code: 200,
			  msg: '删除成功'
			}]);
		  }, 1000);
		});	
	});  
	//批量删除用户
    mockA.onDelete('/tablelist/multiple_delete/').reply(config => {
      let { deleteid } = config.params;
      let ids = deleteid.split(',');
	  console.log("ids:",ids)
      _datalist = _datalist.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([204, {
            code: 204,
            msg: '删除成功'
          }]);
        }, 1000);
      });
    });
	//编辑用户
    mockA.onPatch(/\/tablelist\/.*\//).reply(config => {
      // let { id, date, name, email, address } = config.params;
	  let { id, date, name, email, address } = JSON.parse(config.data);
      _datalist.some(u => {
        if (u.id === id) {
		  u.date = date;
          u.name = name;
		  u.email = email; 
          u.address = address;                  
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 1000);
      });
    });	
	//新增用户
	mockA.onPost('/tablelist/').reply(config => { //config是axios config 
	  let { id, date, name, email, address } = JSON.parse(config.data); 
	  _datalist.push({		
		id: Mock.Random.guid(), 
	    date : date,
	    name : name,
	    email : email,
	    address : address  
	  });
	  return new Promise((resolve, reject) => {
	    setTimeout(() => {
	      resolve([200, {
	        code: 200,
	        msg: '新增成功'
	      }]);
	    }, 1000);
	  });
	});
	//登陆	
	mockA.onPost('/login').reply(config => { 
	  let {username, password} = JSON.parse(config.data);
	  return new Promise((resolve, reject) => {
	    let user = null;
	    setTimeout(() => {
	      let hasUser = LoginUsers.some(u => {
	        if (u.username === username && u.password === password) {
	          user = JSON.parse(JSON.stringify(u));
	          user.password = undefined;
	          return true;
	        }
	      });
	  
	      if (hasUser) {
	        resolve([200, { code: 200, msg: '请求成功', user }]);
	      } else {
	        resolve([200, { code: 500, msg: '账号或密码错误' }]);
	      }
	    }, 1000);
	  });
	});
	//下载）
	mockA.onPost('/downLoadMix').reply(config => {
	  let {id} = JSON.parse(config.data);
	  // let {username, password} = JSON.parse(config.data);
	  return new Promise((resolve, reject) => {
		setTimeout(() => {
		  resolve([200, {
			code: 200,
			headers: {
				// 'Content-Type': 'text/html; charset=utf-8',
				'content-Type': 'text/html; charset=utf-8',
				'content-disposition':'attachment;filename=App.vue'
			},
			data: "F:\SQL\Vue.js\vue_work\mock-project\src\App.vue"
			// data: Random.image('200x100', '#50B347', '#FFF', 'Mock.js')
		  }]);
		}, 1000);
	  });
	});
	//下载）
	mockA.onPost('/handle_upload_file').reply(config => {
	  let {id} = JSON.parse(config.data);
	  // let {username, password} = JSON.parse(config.data);
	  return new Promise((resolve, reject) => {
		setTimeout(() => {
		  resolve([200, {
			code: 200,
			headers: {
				// 'Content-Type': 'text/html; charset=utf-8',
				'content-Type': 'text/html; charset=utf-8',
				'content-disposition':'attachment;filename=App.vue'
			},
			data: "F:\SQL\Vue.js\vue_work\mock-project\src\App.vue"
			// data: Random.image('200x100', '#50B347', '#FFF', 'Mock.js')
		  }]);
		}, 1000);
	  });
	});
	
export default {
	name:'mock'
}

