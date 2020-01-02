<template>
	<div class="width_1200px">
		<!-- <el-col> -->
					
				<el-col :span="24" >
					<el-col :span="2">
						<el-button type="primary" @click="handleAdd">手工录入</el-button>
					</el-col>
					<el-col :span="2">
						<el-upload ref="upload" class="upload-demo" :show-file-list	="false" auto-upload action="http://127.0.0.1:8000/handle_upload_file"
							:on-success="upload_success">
							<el-button  type="success">导入订单</el-button>				
						</el-upload>
					</el-col>
					<el-col :span="2">
						<el-link type="info" href="http://127.0.0.1:8000/download">下载模板</el-link>
					</el-col >
					<el-col :span="6" :offset="6">
						<el-input v-model="search" placeholder="请输入内容" class="input-with-select" clearable>
							<el-select v-model="select" slot="prepend" placeholder="请选择">
							      <el-option label="姓名" value="1"></el-option>
							      <el-option label="订单号" value="2"></el-option>
							      <el-option label="电话" value="3"></el-option>
							    </el-select>
						</el-input>						
					</el-col >
					<el-col :span="2" >
						<el-button type="primary" class="el-icon-search" >搜索</el-button>
					</el-col >
				</el-col>			
			
			
				<el-table ref="multipleTable"  :data="tableData" v-loading="listLoading" @selection-change="SelsChange" style="width: 100%">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column type="index" width="60">
					</el-table-column>
					<el-table-column label="Date" prop="date" sortable>
					</el-table-column>
					<el-table-column label="Name" prop="name" sortable>
					</el-table-column>
					<el-table-column label="Email" prop="email">
					</el-table-column>
					<el-table-column label="address" prop="address">
					</el-table-column>
					<el-table-column align="right">
						<template slot="header" slot-scope="scope" title="操作">
							<!-- <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
							<el-button size="mini" @click="handleSearch">搜索</el-button> -->
						</template>
						<template slot-scope="scope">
							<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
							<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
						</template>
					</el-table-column>
				</el-table>
			
			
			
				<!--工具条-->
				<el-col :span="24" class="toolbar">
					<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
					<el-button type="info" @click="CancleSelection()">取消选择</el-button>
					<el-pagination layout="total, jumper, prev, pager, next" background @current-change="handleCurrentChange" :page-size="perPageNum"
					 :total="total" style="float:right;">
					</el-pagination>
				</el-col>
			
			
		<!-- </el-col> -->
			<!-- <el-upload
			  class="upload-demo"
			  action="http://127.0.0.1:8000/handle_upload_file"
			  :on-preview="handlePreview"
			  :on-remove="handleRemove"
			  :before-remove="beforeRemove"
			  multiple
			  :limit="3"
			  :on-exceed="handleExceed"
			  :file-list="fileList">
			  <el-button size="small" type="primary">导入订单</el-button>
			  <div slot="tip" class="el-upload__tip">只能上传xls文件，且不超过500kb</div>
			</el-upload> -->
			<!-- <el-button type="success" @click="downLoadMix">下载模板</el-button>			
			<el-upload
			  class="upload-demo"
			  ref="upload"
			  multiple
			  action="http://127.0.0.1:8000/handle_upload_file"
			  :on-preview="handlePreview"
			  :on-remove="handleRemove"
			  :file-list="fileList"
			  :auto-upload="false">
			  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
			  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
			  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload> -->
			
		
		
		
		
		<!--编辑界面-->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="日期">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.date"></el-date-picker>
				</el-form-item>
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Email" prop="name">
					<el-input v-model="editForm.email" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="editForm.address"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
		<!--新增界面-->
		<el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="日期">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.date"></el-date-picker>
				</el-form-item>
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Email" prop="email">
					<el-input v-model="addForm.email" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="addForm.address"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
		
	</div>
</template>

<script>
	import util from '../common/js/util'
	import axios from 'axios';
	import {
		getdatalist,
		editdata,
		adddata,
		adddataPost,
		removedata,
		batchRemovedata,		
	} from '../api/api'

	export default {
		data() {
			return {
				select:"订单号",
				
				tableData: [],
				search: '',
				page: 1,
				total: 60,
				listLoading: false,
				sels: [], //列表选中列				
				perPageNum: 10, //每页显示数量				

				//编辑界面数据
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}]
				},
				editForm: {
					id: 0,
					date: "",
					name: "",
					email: "",
					address: "",
				},
				//新增界面数据
				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}]
				},
				addForm: {
					id: 0,
					date: "",
					name: "",
					email: "",
					address: "",
				},
				fileList: [],
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				console.log("page:", val);
				this.getTableDate();
			},
			SelsChange(val) {
				this.sels = val;
			},		
			upload_success(){
				this.getTableDate();
				// this.$refs.upload.clearFiles()
			},
			
			//获取列表
			// getTableDate() {
			// 	let para = {
			// 		page: this.page,
			// 		search: this.search
			// 	};
			// 	this.listLoading = true;
			// 	getdatalist(para).then((res) => {
			// 		console.log(res);
			// 		// this.total = res.data.total;
			// 		// this.tableData = res.data.datalist;
			// 		this.total =20;
			// 		this.tableData = res.data;
			// 		this.listLoading = false;
			// 	});
			// },
			getTableDate() {
				//解决删掉最后一页记录后，page没有减1问题
				if( this.total == (this.page-1)*this.perPageNum && this.total!=0){
				  this.page-=1;				  
				}
				let para = {
					page: this.page,
					// search: this.search
				};
				this.listLoading = true;
				getdatalist(para).then((res) => {
					console.log(res);					
					this.total =res.data.count;
					this.tableData = res.data.results;
					this.listLoading = false;
				});
			},

			handleEdit(index, row) {
				console.log(index, row);
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//编辑
			editSubmit: function() {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.date = (!para.date || para.date == '') ? '' : util.formatDate.format(new Date(para.date), 'yyyy-MM-dd');
							console.log("para:", para);
							editdata(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getTableDate();
							});
						});
					}
				});
			},
			//显示新增界面
			handleAdd: function() {
				this.addFormVisible = true;
				this.addForm = {
					id: 0,
					date: "",
					name: "",
					email: "",
					address: "",
				};
			},
			//新增
			addSubmit: function() {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.date = (!para.date || para.date == '') ? '' : util.formatDate.format(new Date(para.date), 'yyyy-MM-dd');
							console.log("para:", para);
							// adddata(para).then((res) => {
							adddataPost(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getTableDate();
							});
						});
					}
				});
			},
			
			//删除	
			handleDelete: function(index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = {
						id: row.id
					};
					console.log("para:", para)
					removedata(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});		
						this.total-=1;
						this.getTableDate();
					});
				}).catch(() => {

				});
			},
			// //批量删除
			// batchRemove: function() {
			// 	var ids = this.sels.map(item => item.id).toString();
			// 	this.$confirm('确认删除选中记录吗？', '提示', {
			// 		type: 'warning'
			// 	}).then(() => {
			// 		this.listLoading = true;
			// 		// console.log("ids:",ids)
			// 		// console.log("sels:",this.sels)
			// 		let para = {
			// 			ids: ids
			// 		};
			// 		console.log("para:", para)
			// 		batchRemovedata(para).then((res) => {
			// 			this.listLoading = false;
			// 			//NProgress.done();
			// 			this.$message({
			// 				message: '删除成功',
			// 				type: 'success'
			// 			});
			// 			this.getTableDate();

			// 		});
			// 	}).catch(() => {

			// 	});
			// },
			//批量删除
			batchRemove: function() {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					// console.log("ids:",ids)
					// console.log("sels:",this.sels)
					let para = {
						deleteid: ids
					};
					console.log("para:", para)
					batchRemovedata(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.total-=ids.split(',').length;	//console.log("ids.length:",ids.split(',').length)						
						this.getTableDate();
			
					});
				}).catch(() => {
			
				});
			},
			CancleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			
			// // params 参数 路径 文件名
			// downLoadMix(params, url, title) {
			// 	params = {id: 1};
			// 	url = "http://127.0.0.1:8001/download";
			// 	title = "Table1.xls";
			// 	axios({
			// 		method: 'post',
			// 		url,
			// 		// headers: {
			// 		// 	'Content-Type': 'application/json'
			// 		// },
			// 		data: params,					
			// 		responseType: 'blob'//arraybuffer stream
			// 	}).then(res => {
			// 		let headers = res.headers;
			// 		console.log("res:",res)
			// 		let blob = new Blob([res.data], {
			// 			type: headers['content-Type']
			// 		});
			// 		let link = document.createElement('a');
			// 		// document.body.appendChild(link);
			// 		link.href = window.URL.createObjectURL(blob);
			// 		if (!title) {
			// 			const fileName = headers['content-disposition'];
			// 			title = fileName.includes('filename=') ? fileName.split('=')[1]:'下载的文件';
			// 		}
			// 		link.download = title;
			// 		link.click();					
			// 		window.URL.revokeObjectURL(link.href) // 释放掉blob对象
			// 		// document.body.removeChild(link) // 下载完成移除元素
			// 	});
			// },				
			// submitUpload() {
			// 		console.log("fileList:",this.fileList)
			//         this.$refs.upload.submit();
			//       },
			//       handleRemove(file, fileList) {
			//         console.log(file, fileList);
			//       },
			//       handlePreview(file) {
			//         console.log(file);
			//       },
				// handleRemove(file, fileList) {
				// 	console.log(file, fileList);
				// },
				// handlePreview(file) {
				// 	console.log(file);
				// },
				// handleExceed(files, fileList) {
				// 	this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
				// },
				// beforeRemove(file, fileList) {
				// 	return this.$confirm(`确定移除 ${ file.name }？`);
				// },
		},
		
		mounted() {
			this.getTableDate();
		},
		
		      
		    
	}
</script>
<style>
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .width_1200px {
	  width: 1200px;
  }
</style>