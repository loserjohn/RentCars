<template>
	<view class="tui-header">
		<view class="tui-header-top">
			<view class="tui-top-item" :style="type==0?active:''" @click="_filter(0)">最新</view>
			<view class="tui-top-item" :style="type==1?active:''" @click="_filter(1)">综合</view>
			<view class="tui-top-item" :style="type==2?active:''" @click="_filter(2)">热销</view>
			<view class="tui-top-item" :style="type==3?active:''" @click="_filter(3)">价格</view>
			<view class="tui-top-item"  @click="_sort">  
				<view class="u-flex">
					<view class="tui-icon-box " >
						<u-icon name="arrow-upward" :color="sort=='asc'?activeColor:'#999'"></u-icon>
					</view>
					<view class="tui-icon-box ">
						<u-icon name="arrow-downward" :color="sort=='desc'?activeColor:'#999'"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:0,
				sort:'asc',
				active:{
					color:this.activeColor
				}
			};
		},
		props: {
			activeColor: {
				type: String,
				default: '#2F96F3'
			}
		},
		methods:{
			_sort(){
				if(this.sort == 'asc'){
					this.sort = 'desc'
				}else{
					this.sort = 'asc'
				}
				let that = this
				this.$emit('tabChange',{
					type:that.type,
					sort:that.sort
				})
			},
			_filter(k) {
				// this.tui.toast('商城模板中功能~');
				this.type = k
				let that = this
				this.$emit('tabChange',{
					type:that.type,
					sort:that.sort
				})
			}
		}
	}
</script>

<style  scoped>
	/*header*/
	.tui-header {
		width: 100%;
		padding-top: 24upx;
		padding-bottom: 24upx;
		/* box-shadow: 0 15upx 10upx -15upx #f2f2f2; */
		box-sizing: border-box;
		background: #fff;
		/* position: fixed; */
		z-index: 1000;
	}
	
	.tui-header-top,

	
	.tui-top-item {
		height: 26upx;
		line-height: 26upx;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #999;
	}
	.active{
		color: #333;
	}
	.tui-topitem-active {
		position: relative;
		font-weight: bold;
	}
	
	.tui-topitem-active::after {
		content: '';
		position: absolute;
		width: 44upx;
		height: 6upx;
		background: #5677fc;
		border-radius: 6upx;
		bottom: -10upx;
		left: 50%;
		-webkit-transform: translateX(-50%);
		transform: translateX(-50%);
	}
	
	.tui-price-arrow {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 16upx;
		/* background: red; */
	}
	
	.tui-bottom-item .tui-icon-class,
	.tui-screen .tui-icon-class {
		margin-left: 6upx;
	}
	
	.tui-icon-box {
		line-height: 10px !important;
		padding: 0 !important;
		display: block !important;
		position: relative;
	}
	
	.tui-arrow-up {
		top: 3px;
	}
	
	.tui-arrow-down {
		top: -5px;
	}
	
	.tui-hover {
		background: rgba(0, 0, 0, 0.2);
	}
	
</style>
