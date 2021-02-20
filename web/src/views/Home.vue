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
					<router-link :to="`/articles/${news._id}`" tag="div" class="py-2 fs-lg d-flex" v-for="(news,index) in category.newsList" :key="index">
						<span class="text-info">[{{news.categoryName}}]</span>
						<span class="px-2">|</span>
						<span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
						<span class="text-gray-1 fs-sm">{{news.createdAt | date}}</span>
					</router-link>
				</template>
			</m-list-card>
			<m-list-card icon="icons-super_hero_ma" title="英雄列表" :categories="heroCats">
				<template #items="{category}">
					<div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
						<div class="p-2 text-center" style="width: 20%;" v-for="(hero,index) in category.heroList" :key="index">
							<img :src="hero.avatar" class="w-100" alt="">
							<div>{{hero.name}}</div>
						</div>
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
	import dayjs from 'dayjs'
	export default {
		filters: {
			date(val) {
				return dayjs(val).format('MM/DD')
			}
		},
		components: {
			swiper, //定义组件
			swiperSlide
		},
		data() {
			return {
				newsCats: [],
				heroCats: [],
				swiperOption: {
					pagination: {
						el: ".pagination-home"
					},
					autoplay: true, //自动切换
					loop: true, //循环
				}
			}
		},
		created() {
			this.fetchNewsCats()
			this.fetchHeroCats()
		},
		methods: {
			async fetchNewsCats() {
				const res = await this.$http.get('news/list')
				this.newsCats = res.data
			},
			async fetchHeroCats() {
				const res = await this.$http.get('heroes/list')
				this.heroCats = res.data
			},
		}
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
