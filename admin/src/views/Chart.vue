<template>
	<div>
		<el-tree node-key="_id" :props="defaultProps" lazy ref="tree" :load="loadNode" :default-expanded-keys="[1]">
			<span class="custom-tree-node" slot-scope="{ node, data }">
				<span> {{ node.label }}</span>
				<span>
					<el-button style="margin-right: 10px;" :disabled="node.level == 1" type="text" size="mini" @click.stop="() => openEditModal(node,data)"
					 icon="el-icon-edit">
						编辑
					</el-button>
				</span>
				<!-- 				<span>
					<el-button style="margin-right: 10px;" :disabled="node.level == 1" type="text" size="mini" @click.stop="() => openEditModal(node,data)"
					 icon="el-icon-edit">
						编辑
					</el-button>
					<el-button style="margin-right: 10px;" type="text" size="mini" @click.stop="() => openAddModal(node,data)" icon="el-icon-plus">
						添加下级
					</el-button>
					<el-button :disabled="node.level == 1" type="text" size="mini" @click.stop="() => remove(node, data)" icon="el-icon-delete">
						删除
					</el-button>
				</span> -->
			</span>
		</el-tree>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				defaultProps: {
					node: "",
					editForm: "",
					label: 'Name'
				},
				newData: [],
				data: {
					"router": [{
						"id": 1,
						"parentID": null,
						"name": "k8s总览",
						"path": "/",
						"title": null,
						"icon": null,
						"isHidden": "false",
						"componentPath": null,
						"perm": "kubernetes:dashboard:read",
						"chirdMenu": [
							{ "id": 3, "parentID": 1, "name": "总览", "path": "dashboard", "title": "总览", "icon": "pc", "isHidden": "false", "componentPath": "dashboard/index", "perm": "kubernetes:dashboard:read", "chirdMenu": [] }
						]
					}, {
						"id": 5,
						"parentID": null,
						"name": "平台组件",
						"path": "/platform",
						"title": "平台组件",
						"icon": "yun",
						"isHidden": "false",
						"componentPath": null,
						"perm": "platform",
						"chirdMenu": [{
							"id": 6,
							"parentID": 5,
							"name": "应用与服务",
							"path": "kubernetes",
							"title": "应用与服务",
							"icon": null,
							"isHidden": "false",
							"componentPath": "@/layout/nested",
							"perm": "playform:appservice",
							"chirdMenu": [
								{ "id": 7, "parentID": 6, "name": "应用包管理", "path": "packages", "title": "应用包管理", "icon": null, "isHidden": "false", "componentPath": "kubernetes/app/package/index", "perm": "platform:appservice:apppackage:read", "chirdMenu": [] },
								{ "id": 8, "parentID": 6, "name": "应用列表", "path": "apps", "title": "应用管理", "icon": null, "isHidden": "false", "componentPath": "kubernetes/app/index", "perm": "platform:appservice:applist:read", "chirdMenu": [] },
								{ "id": 9, "parentID": 6, "name": "应用详情", "path": "apps/detail/:app_name", "title": "应用详情", "icon": null, "isHidden": "true", "componentPath": "kubernetes/app/detail/index", "perm": "platform:appservice:appdetails:read", "chirdMenu": [] },
								{ "id": 10, "parentID": 6, "name": "创建服务", "path": "service/:app_name/create", "title": "创建服务", "icon": null, "isHidden": "true", "componentPath": "kubernetes/app/create/index", "perm": "platform:appservice:createservice:write", "chirdMenu": [] },
								{ "id": 11, "parentID": 6, "name": "服务列表", "path": "service/:app_name", "title": "服务列表", "icon": null, "isHidden": "true", "componentPath": "kubernetes/app/service/index", "perm": "platform:appservice:servicelist:read", "chirdMenu": [] },
								{ "id": 12, "parentID": 6, "name": "容器列表", "path": "containers", "title": "容器列表", "icon": null, "isHidden": "false", "componentPath": "kubernetes/app/container/index", "perm": "platform:appservice:containerlist:read", "chirdMenu": [] },
								{ "id": 13, "parentID": 6, "name": "日志管理", "path": "logs", "title": "日志管理", "icon": null, "isHidden": "false", "componentPath": "kubernetes/app/log/index", "perm": "platform:appservice:log:read", "chirdMenu": [] },
								{ "id": 14, "parentID": 6, "name": "镜像仓库", "path": "repos", "title": "镜像仓库", "icon": null, "isHidden": "false", "componentPath": "kubernetes/app/repo/index", "perm": "platform:appservice:repo:read", "chirdMenu": [] },
								{ "id": 15, "parentID": 6, "name": "配置组管理", "path": "configMap", "title": "配置组管理", "icon": null, "isHidden": "false", "componentPath": "kubernetes/app/configMap/index", "perm": "platform:appservice:configmap", "chirdMenu": [] },
								{ "id": 16, "parentID": 6, "name": "通知告警", "path": "alarm", "title": "通知告警", "icon": null, "isHidden": "false", "componentPath": "kubernetes/app/alarm/index", "perm": "platform:appservice:alarm", "chirdMenu": [] },
								{ "id": 19, "parentID": 6, "name": "镜像详情", "path": "repos/:repo_name", "title": "镜像详情", "icon": null, "isHidden": "true", "componentPath": "kubernetes/app/repo/detail/index", "perm": "platform:appservice:repo:read", "chirdMenu": [] }
							]
						}, {
							"id": 26,
							"parentID": 5,
							"name": "云主机",
							"path": "openstack",
							"title": "云主机",
							"icon": null,
							"isHidden": "false",
							"componentPath": "@/layout/nested",
							"perm": "platform:openstack",
							"chirdMenu": [
								{ "id": 27, "parentID": 26, "name": "计算服务", "path": "ecs", "title": "计算服务", "icon": null, "isHidden": "false", "componentPath": "openstack/jisuan", "perm": "platform:openstack:ecs:read", "chirdMenu": [] },
								{ "id": 28, "parentID": 26, "name": "存储", "path": "storage", "title": "存储", "icon": null, "isHidden": "false", "componentPath": "openstack/cunchu", "perm": "platform:openstack:storage:read", "chirdMenu": [] },
								{ "id": 29, "parentID": 26, "name": "网络", "path": "network", "title": "网络", "icon": null, "isHidden": "false", "componentPath": "openstack/network", "perm": "platform:openstack:network:read", "chirdMenu": [] },
								{ "id": 30, "parentID": 26, "name": "安全组", "path": "securitygroup", "title": "安全组", "icon": null, "isHidden": "false", "componentPath": "openstack/safeGroup", "perm": "platform:openstack:security:read", "chirdMenu": [] },
								{ "id": 31, "parentID": 26, "name": "网络详情", "path": "network/detail", "title": "网络详情", "icon": null, "isHidden": "true", "componentPath": "openstack/networkDetail", "perm": "platform:openstack:network:read", "chirdMenu": [] },
								{ "id": 35, "parentID": 26, "name": "路由详情", "path": "network/router/detail", "title": "路由详情", "icon": null, "isHidden": "true", "componentPath": "openstack/routerDetail", "perm": "platform:openstack:network:router:read", "chirdMenu": [] },
								{ "id": 36, "parentID": 26, "name": "管理规则", "path": "securitygroup/managerules", "title": "管理规则", "icon": "", "isHidden": "true", "componentPath": "openstack/manageRules", "perm": "platform:openstack:security:read", "chirdMenu": [] },
								{ "id": 51, "parentID": 26, "name": "浮动ip", "path": "floatingips", "title": "浮动ip", "icon": "", "isHidden": "false", "componentPath": "openstack/floatIp", "perm": "platform", "chirdMenu": [] },
								{ "id": 52, "parentID": 26, "name": "概况", "path": "statistics", "title": "概况", "icon": "", "isHidden": "false", "componentPath": "openstack/survey", "perm": "platform", "chirdMenu": [] }
							]
						}]
					}, {
						"id": 32,
						"parentID": null,
						"name": "个人信息管理",
						"path": "/profile",
						"title": "个人信息",
						"icon": null,
						"isHidden": "true",
						"componentPath": null,
						"perm": "platform",
						"chirdMenu": [
							{ "id": 33, "parentID": 32, "name": "个人信息", "path": "/profile/index", "title": "个人信息", "icon": null, "isHidden": "true", "componentPath": "user/personal/index", "perm": "platform", "chirdMenu": [] }
						]
					}, {
						"id": 53,
						"parentID": null,
						"name": "操作审计",
						"path": "/logs",
						"title": "操作审计",
						"icon": "tree",
						"isHidden": "false",
						"componentPath": null,
						"perm": "platform",
						"chirdMenu": [
							{ "id": 55, "parentID": 53, "name": "操作审计", "path": "index", "title": "操作审计", "icon": "", "isHidden": "false", "componentPath": "log/index", "perm": "platform", "chirdMenu": [] }
						]
					}]
				},
				"meta": { "msg": "获取成功", "status": 200 }
			}
		},
		created() {
			//this.data===你给的数据
			for (var i = 0; i < this.data.router.length; i++) {
				var obj = this.data.router[i]
				this.newData.push(obj.id)
				if (obj.chirdMenu.length > 0) {
					for (var j = 0; j < obj.chirdMenu.length; j++) {
						this.newData.push(obj.chirdMenu[j].id)
						if (obj.chirdMenu[j].chirdMenu.length > 0) {
							for (var k = 0; k < obj.chirdMenu[j].chirdMenu.length; k++) {
								this.newData.push(obj.chirdMenu[j].chirdMenu[k].id)
							}
						}
					}
				}
			}
			console.log(this.newData)
		},
		methods: {
			// 编辑节点
			openEditModal(node, data) {
				// this.node = node;
				// this.editForm = { ...data };
				// // this.EditModal = true
			},
			async loadNode(node, resolve) {
				if (node.level == 0) {
					return resolve([{ _id: 0, Name: "全部分类", parent: null }])
				}
				if (node.level > 0) {

					const res = await this.$http.get('rest/categories')
					resolve(res.data)

					// let ID = node.data.ID
					// var data = {
					// 	"FuncCode": "GetChart",
					// 	"Data": {
					// 		"Params": [
					// 			"UniChart",
					// 			ID
					// 		]
					// 	},
					// }
					// let response = await Joggle.get(data)
					// 	.then((response) => {
					// 		if (response.indexOf("Fail:") == -1) {
					// 			resolve(JSON.parse(response))
					// 		} else {
					// 			this.$message.warning(response)
					// 		}
					// 	})
				}
			},
		}
	}
</script>

<style>
</style>
