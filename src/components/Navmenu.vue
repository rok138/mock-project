<template> 
<!-- mode="horizontal" -->
	<el-row class="tac">
	  <el-col :span="24">
	    <!-- <h5>默认颜色</h5> -->
	    <el-menu
	      default-active="2"
		  unique-opened			  
		  mode="horizontal"
	      class="el-menu-demo"
	      @open="handleOpen"
	      @close="handleClose"
		  @select="handleSelect"
		  background-color="#545c64"
		  text-color="#fff"
		  active-text-color="#ffd04b">
	      <el-submenu index="1">
	        <template slot="title">
	          <i class="el-icon-location"></i>
	          <span>导航一</span>
	        </template>
	        <el-menu-item-group>
	          <template slot="title">分组一</template>
	          <el-menu-item index="1-1">选项1</el-menu-item>
	          <el-menu-item index="1-2">选项2</el-menu-item>
	        </el-menu-item-group>
	        <el-menu-item-group title="分组2">
	          <el-menu-item index="1-2-1">选项2-1</el-menu-item>
			  <el-menu-item index="1-2-2">选项2-2</el-menu-item>
	        </el-menu-item-group>
	        <el-submenu index="1-4">
	          <template slot="title">选项4</template>
	          <el-menu-item index="1-4-1">选项1</el-menu-item>
			  <el-menu-item index="1-4-2">选项2</el-menu-item>
	        </el-submenu>
	      </el-submenu>
		  <el-submenu index="2">
			  <template slot="title">
			    <i class="el-icon-location"></i>
			    <span>导航二</span>
			  </template>
			  <el-menu-item-group title="分组1">
			    <el-menu-item index="2-1">选项2-1</el-menu-item>
			    <el-menu-item index="2-2">选项2-2</el-menu-item>
			  </el-menu-item-group>
			  <el-menu-item-group title="分组2">
			    <el-menu-item index="2-1-1">选项2-1-1</el-menu-item>
			    <el-menu-item index="2-2-2">选项2-2-2</el-menu-item>
			  </el-menu-item-group>
		  </el-submenu>
	      <el-menu-item index="3" > 
	        <i class="el-icon-document"></i>
	        <span slot="title">导航三</span>
	      </el-menu-item>
	      <el-menu-item index="4">
	        <i class="el-icon-setting"></i>
	        <span slot="title">导航四</span>
	      </el-menu-item>
	    </el-menu>
	  </el-col>
	  
	</el-row>	
	
</template>

<script>
export default {
	methods: {
	  handleOpen(key, keyPath) {
		console.log(key, keyPath);
	  },
	  handleClose(key, keyPath) {
		console.log(key, keyPath);
	  },
	  handleSelect(key, keyPath) {
		console.log(key, keyPath);
	  },
	}
  }
</script>

<style>
</style>
