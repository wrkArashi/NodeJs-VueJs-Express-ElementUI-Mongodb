<template>
	<m-card :icon="icon" :title="title">
		<div class="nav jc-between">
			<div class="nav-item" v-for="(category,index) in categories" :key="index" :class="{active:active===index}" @click="active=index">
				<div class="nav-link">{{category.name}}</div>
			</div>
		</div>
		<div class="pt-3">
			<swiper>
				<swiper-slide v-for="(category,index) in categories" :key="index">
					<slot name="items" :category="category"></slot>
			<!-- 		<div class="py-2" v-for="n in 5" :key="n">
						<span>[新闻]</span>
						<span>|</span>
						<span>快手直播拔开始，助你心爱的主播出道！</span>
						<span>06/02</span>
					</div> -->
				</swiper-slide>
			</swiper>
		</div>
	</m-card>
</template>

<script>
	export default {
		props: {
			icon: { type: String, required: true },
			title: { type: String, required: true },
			categories: { type: Array, required: true }
		},
		data() {
			return {
				active: 0
			}
		}
	}
</script>

<style>
</style>
