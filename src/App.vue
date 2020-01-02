<template>
  <div id="app">	  	
		<!-- <Test>test</Test>
		<Test2></Test2>
		<TableList></TableList>
		<Login></Login> -->
		<!-- <Test></Test> -->
		<el-container>					
			<el-header><Navmenu></Navmenu></el-header>				    
			<!-- <el-row type="flex" > -->
			<el-row style="display: flex; " >
				<el-aside width="200px" ><!-- <Aside></Aside> --></el-aside>
				<!-- <el-aside width="200px" ><Aside></Aside></el-aside> -->
				<!-- <el-aside ><Aside></Aside></el-aside> -->
				<el-main ><TableList></TableList></el-main>
			</el-row>
		</el-container>
		
		
  </div>
</template>

<script>
import TableList from './components/TableList.vue'
import Login from './components/Login.vue'
import Navmenu from './components/Navmenu.vue'
import Aside from './components/Aside.vue'
import Test from './components/Test.vue'

export default {
  name: 'app',
  components: {    
	TableList,
	Login,
	Navmenu,
	Aside,
	Test,
  },  
}
</script>

<style>
body,html {
	padding:100;
	margin: 200;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  background-color: #006600;
}
</style>
<style>
  .el-header, .el-footer {
    /* background-color: #B3C0D1; */
	background-color:#545c64;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 50px;	
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>