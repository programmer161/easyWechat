<template>
  <div id="home">
	<!-- 头部栏 -->
	<div class="header">
		<span>哈哈哈</span>
	</div>
	<!-- 头部栏以下 -->
	<div class="part">
		<!-- 内容主体显示区域 -->
		<div class="main" :style="main_height" @click="toggle_other">
			<div class="whole" v-for="(item, index) in items" :key="index" @click="download(item)">
				<div class="flex-left">
					<div class="dialogue" v-if="item.choice==0">
						<span v-text="item.dialogue_text"></span>
						<div class="triangle_outside"></div>
					</div>
					<img class="image" v-if="item.choice==1" :src="item.src" />
					<div class="file" v-if="item.choice==2" :style="fileStyle">
						<img v-if="item.type == 'text/plain'" src="../assets/txt.png"/>
						<img v-else-if="item.type == 'application/pdf'" src="../assets/pdf.png" />
						<img v-else-if="item.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'" src="../assets/word.png"/>
						<img class="image" v-else-if="item.type == 'image/jpeg'" :src="item.src"/>
						<img v-else src="../assets/js.png"/>
						<span v-text="item.name"></span>
						<br/>
						<span v-text="item.size"></span>
					</div>
				</div>
				<div class="flex-right">
					<div class="img"></div>
				</div>
				<a id="flex-footer" name="pos" href="#pos"></a>
			</div>
		</div>
		<!-- 功能选择区域 -->
		<div class="foot" :style="foot_top">
			<div class="head">
				<ul class="tab">
					<li><i class="iconfont">&#xe8c0;</i></li>
					<li><input type="text" v-model="input_dialogue" @keyup="dialogue" @keyup.enter="sendMsg"/></li>
					<li><i class="iconfont">&#xe63d;</i></li>
					<li><i class="iconfont" @click="toggle" v-show="sendIf==0">&#xe61a;</i></li>
					<li><input type="button" class="send" value="发送" @click="sendMsg" v-show="sendIf==1"/></li>
				</ul>
				<hr/>
			</div>
			<!-- 键盘功能 -->
			<div class="body_keyboard body">
				
			</div>
			<!-- 表情功能 -->
			<div class="body_look body">
				
			</div>
			<!-- 文件发送功能 -->
			<div class="body_function body">
				<ul class="function" v-show="isShow==0">
					<li>
						<i class="iconfont">&#xe7f1;</i>
						<input type="file" accept="image/*" id="file_image"/>
					</li>
					<li><i class="iconfont">&#xe61e;</i></li>
					<li><i class="iconfont">&#xe7dd;</i></li>
					<li><i class="iconfont">&#xe609;</i></li>
					<li><i class="iconfont">&#xe66c;</i></li>
					<li><i class="iconfont">&#xe699;</i></li>
					<li><i class="iconfont">&#xe63b;</i></li>
					<li><i class="iconfont">&#xe60d;</i></li>
				</ul>
				<ul class="function-other" v-show="isShow==1">
					<li><i class="iconfont">&#xe671;</i></li>
					<li>
						<i class="iconfont">&#xe64c;</i>
						<input type="file" id="file" />
					</li>
				</ul>
				<input type="radio" id="first" name="page" @click="firstUl"/>
				<input type="radio" id="second" name="page" @click="lastUl" />
			</div>
		</div>
	</div>
  </div>
</template>

<script>
	
</script>
<script>
	import $ from 'jquery';
	export default {
		data() {
			return {
				isShow: 0,
				items: [],
				input_dialogue: '',
				main_height: 'height: 430px;',
				foot_top: 'top: 430px;',
				fileStyle: '',
				sendIf: 0
			}
		},
		methods: {
			// 用第一个单选按钮控制第一部分功能的显示
			firstUl() {
				this.isShow = 0;
			},
			// 用第二个单选按钮控制第二部分功能的显示
			lastUl() {
				this.isShow = 1;
			},
			// 通过键盘事件判断输入文本框中是否含有文本
			// 然后通过文本中的相关内容来控制是否显示发送按钮
			dialogue() {
				if(this.input_dialogue != "") {
					this.sendIf = 1;
				}else {
					this.sendIf = 0;
				}
			},
			// 发送信息，可以通过回车和发送按钮来发送相关的信息
			sendMsg() {
				var obj = {
					choice: 0,
					dialogue_text: this.input_dialogue
				}
				this.items.push(obj);
				this.input_dialogue = '';
				this.sendIf = 0
			},
			// 切换——控制整体底部功能的显示与否
			toggle() {
				this.main_height = 'height: 250px;';
				this.foot_top = 'top: 250px;';
				$(".main").scrollTop($(".main")[0].scrollHeight);
				$("#first").prop('checked',true);
				console.log('first=', $("#first").attr('checked'));
				console.log('second=', $("#second").attr('checked'));
			},
			toggle_other() {
				this.main_height = 'height: 430px;';
				this.foot_top = 'top: 430px;';
				this.isShow = 0;
				console.log('first=', $("#first").attr('checked'));
				console.log('second=', $("#second").attr('checked'));
			},
			// 下载文本文件
			download(item) {
				if(item.type != undefined && item.type != "image/jpeg" && item.type == 'text/plain') {
					var text = item.text;
					var blob = new Blob([text], {type: item.type});
					var $str = "<a id='file' download='" + item.name + "' href='" + window.URL.createObjectURL(blob) + "' target='_blank'></a>"
					$(".whole").append($str);
					$("#file")[0].click();
					$("#file").remove()
				}
			}
		},
		mounted() {
			// 使其能够获取到data中的数据
			var that = this;
			$(function() {
				// 上传图片
				$("#file_image").change(function() {
					var fileImage = this.files[0];
					that.choice = 1;
					var reader = new FileReader();
					reader.readAsDataURL(fileImage);
					reader.onload = function(e) {
						var obj = {
							choice: 1,
							src: e.target.result
						}
						that.items.push(obj);
						$(".main").scrollTop($(".main")[0].scrollHeight);
					}
					console.log('items=', that.items);
				})
				// 上传文件
				$("#file").change(function() {
					var File = this.files[0];
					var size = File.size;
					var company = ['B', 'KB', 'MB', 'GB', 'TB'];
					var fileSize
					for(let i = 0; size > 1;i++) {
						fileSize = size.toFixed(1) + company[i];
						size /= 1025;
					}
					var obj = {};
					var reader = new FileReader();
					// 存储所下载文件的相关信息
					if(File.type==="image/jpeg") {
						that.fileStyle = "background: pink;"
						reader.readAsDataURL(File);
						reader.onload = function(e) {
							obj = {
								choice: 2,
								type: File.type,
								name: '',
								size:'',
								src: e.target.result
							}
							that.items.push(obj);
						}
					}else{
						reader.readAsText(File, 'utf-8');
						reader.onload = function(e) {
							var result = e.target.result;
							obj = {
								choice: 2,
								type: File.type,
								name: File.name,
								size: fileSize,
								text: result
							}
							that.items.push(obj);
						}
					}
					$(".main").scrollTop($(".main")[0].scrollHeight);
				})
			})
		}
	}
</script>

<!-- 使用Less调整布局的显示 -->
<style lang="less" scoped>
	* {
		padding: 0;
		margin: 0;
	}
	// 引入相应的图标，使用字体的引入方式进行引入
	@font-face {
	font-family: 'iconfont';
	src: url('../../fonts/iconfont.eot');
	src: url('../../fonts/iconfont.eot?#iefix') format('embedded-opentype'),
		url('../../fonts/iconfont.woff2') format('woff2'),
		url('../../fonts/iconfont.woff') format('woff'),
		url('../../fonts/iconfont.ttf') format('truetype'),
		url('../../fonts/iconfont.svg#iconfont') format('svg');
	}
	// 自定义相关的字体名称
	.iconfont {
		font-family: "iconfont" !important;
		font-size: 35px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	// 使样式按照HTML整体的布局情况进行相关的显示
	#home {
		margin: 0 auto;
		height: 530px;
		width: 298px;
		overflow: hidden;
		.header {
			width: 100%;
			height: 50px;
			line-height: 50px;
			text-align: center;
			background-color: #f5f5f5;
		}
		.part {
			position: relative;
			width: 100%;
			height: 480px;
			background-color: pink;
			.main {
				width: 100%;
				height: 430px;
				overflow: hidden;
				overflow-y: auto;
				.whole {
					text-align: right;
					overflow: hidden;
					position: relative;
					width: 220px;
					margin-left: 70px;
					cursor: pointer;
					.flex-left {
						float: left;
						width: 170px;
						margin-top: 4px;
						.file {
							width: 170px;
							height: 70px;
							text-align: left;
							background-color: white;
							span {
								font-size: 12px;
							}
							img {
								float: right;
							}
						}
						.dialogue {
							float: right;
							display: inline-block;
							border-radius: 5px;
							flex: 4;
							margin-right: 8px;
							margin-top: 10px;
							padding: 6px;
							margin-bottom: 10px;
							background-color: #98e165;
						}
						.triangle_outside {
							position: absolute;
							left: 162px;
							top:25px;
							border-width: 7px;
							border-style: solid;
							border-color: transparent transparent transparent #98e165;
						}
						.image {
							width: 100px;
						}
					}
					.flex-right {
						float: right;
						width: 40px;
						height: 40px;
						margin-top: 4px;
						.img {
							width: 40px;
							height: 40px;
							background-image: url(../assets/touxiang.png);
							background-size: 100% 100%;
						}
					}
				}
			}
			// 操作滚动条的样式
			.main::-webkit-scrollbar {
				width: 4px;
			}
			.main::-webkit-scrollbar-thumb {
				border-radius: 10px;
				-webkit-box-shadow: inset 0 50 5px rgba(0, 0, 0, 0.2);
				background: rgba(0, 0, 0, 0.2s);
			}
			.main::-webkit-scrollbar-track {
				-webkit-box-shadow: inset 0 50 5px rgba(0, 0, 0, 0.2);
				border-radius: 0;
				background: rgba(0, 0, 0, 0.1);
			}
		}
	}
	.foot {
		position: absolute;
		top: 430px;
		width: 100%;
		height: 230px;
		background-color: #f5f5f5;
		.head {
			width: 100%;
			height: 50px;
			line-height: 50px;
			.tab {
				list-style-type: none;
				li {
					display: inline-block;
					margin: auto 2px;
					cursor: pointer;
				}
				li:nth-child(2) {
					vertical-align: top;
					cursor: text;
				}
				li:nth-child(2) input {
					height: 25px;
				}
				.send {
					width: 35px;
					height: 25px;
					color: white;
					background-color: #98e165;
					cursor: pointer;
					vertical-align: top;
					margin-top: 7px;
					border: none;
				}
			}
		}
		.body {
			margin-top: 25px;
			.function {
				li {
					display: inline-block;
					width: 50px;
					height: 50px;
					line-height: 50px;
					text-align: center;
					margin: 11px 11px 0 11px;
					background-color: white;
					border-radius: 10px;
					cursor: pointer;
				}
				li:first-child {
					position: relative;
				}
				li:first-child input {
					position: absolute;
					top: 0;
					left: 0;
					width: 50px;
					height: 50px;
					opacity: 0;
					cursor: pointer;
				}
			}
			.function-other {
				list-style-type: none;
				li {
					display: inline-block;
					width: 50px;
					height: 50px;
					line-height: 50px;
					text-align: center;
					margin: 11px 11px 60px 11px;
					border-radius: 10px;
					background-color: white;
					cursor: pointer;
				}
				li:last-child {
					position: relative;
				}
				li:last-child input {
					position: absolute;
					top: 0;
					left: 0;
					width: 50px;
					height: 50px;
					opacity: 0;
					cursor: pointer;
				}
			}
			input[name="page"] {
				margin-top: 15px;
				transform: scale(0.7);
			}
			input[name="page"]:first-of-type {
				margin-left: 140px;
				margin-right: 4px;
			}
		}
	}
</style>

