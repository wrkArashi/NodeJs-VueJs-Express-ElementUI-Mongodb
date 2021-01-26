<template>
	<div>
		<swiper :options="swiperOption">
			<swiper-slide>
				<img class="w-100" src="../assets/images/index1.jpeg" alt="">
			</swiper-slide>
			<swiper-slide>
				<img class="w-100" src="../assets/images/index2.jpeg" alt="">
			</swiper-slide>
			<swiper-slide>
				<img class="w-100" src="../assets/images/index3.jpeg" alt="">
			</swiper-slide>
			<div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
		</swiper>
		<!-- end of swiper -->
		<div class="nav-icons bg-white mt-3 text-center pt-3 text-grey-1">
			<div class="d-flex flex-wrap">
				<div class="nav-item mb-3" v-for="n in 10" :key="n">
					<i class="sprite sprite-news"></i>
					<div class="py-2">爆料站</div>
				</div>
			</div>
			<div class="bg-light py-2 fs-sm">
				<i class="sprite sprite-arrow mr-1"></i>
				<span>收起</span>
			</div>
		</div>
		<!-- end of nav icons -->
		<div class="card bg-white p-3 mt-3">
			<m-list-card icon="cc-menu-circle" title="新闻资讯" :categories="newsCats">
				<template #items="{category}">
					<div class="py-2" v-for="(news,index) in category.newsList" :key="index">
						<span>{{news.categoryName}}</span>
						<span>|</span>
						<span>{{news.title}}</span>
						<span>{{news.data}}</span>
					</div>
				</template>
			</m-list-card>
			<!-- 			<m-card icon="icons-super_hero_ma" title="英雄列表"></m-card>
			<m-card icon="shipin" title="精彩视频"></m-card> -->
			<p>222</p>
			<p></p>
		</div>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper' //导入组件
	export default {
		components: {
			swiper, //定义组件
			swiperSlide
		},
		data() {
			return {
				newsCats: [{
					name: "热门",
					newsList: new Array(5).fill({}).map(v => ({
						cd: v,
						categoryName: '热门',
						title: '这是标题丫丫丫空间设计女iu欸i焦恩俊',
						data: '06/01'
					}))
				}, {
					name: "新闻",
					newsList: new Array(5).fill({}).map(v => ({
						cd: v,
						categoryName: '新闻',
						title: '返回饿啊霍夫卡了化肥挥发',
						data: '06/01'
					}))
				}, {
					name: "公告",
					newsList: new Array(5).fill({}).map(v => ({
						cd: v,
						categoryName: '公告',
						title: '和玉帝角色皇帝JFK大祭司持续扩大',
						data: '06/01'
					}))
				}, ],
				swiperOption: {
					pagination: {
						el: ".pagination-home"
					},
					autoplay: true, //自动切换
					loop: true, //循环
					// setWrapperSize: true,
					// autoHeight: true, //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化
					// slidesPerView: 1,
					// mousewheel: true,
					// mousewheelControl: true,
					// resistanceRatio: 0,
					// observeParents: true,
					// observer: true
				}
			}
		},
	}
</script>

<style lang="scss">
	@import '../assets/scss/variables';

	.pagination-home {
		.swiper-pagination-bullet {
			opacity: 1;
			border-radius: 0.1538rem;
			background: map-get($colors, 'white');

			&.swiper-pagination-bullet-active {
				background: map-get($colors, 'info');
			}
		}
	}

	.nav-icons {
		border-top: 1px solid $border-color;
		border-bottom: 1px solid $border-color;

		.nav-item {
			width: 25%;
			border-right: 1px solid $border-color;

			&:nth-child(4n) {
				border-right: none;
			}
		}
	}
</style>
