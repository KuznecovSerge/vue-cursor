<template>
	<v-menu
		offset-y
		offset-overflow
		transition="scale-transition"
		max-height="600px"
		class="filtermnu"
		:close-on-content-click="false"
	>
		<template v-slot:activator="{ on }">
			<v-btn
				class="dropdown_button d-flex justify-space-between w-100"
				color="#222222"
				v-on="on"
				light
				outlined
				large
			>
				<span class="catalog-title">{{ selectedItem }}</span>
				<v-icon>mdi-menu-down</v-icon>
			</v-btn>
		</template>
		<v-list dense shaped nav>
			<v-list-group v-for="item in items" :key="item.id" v-model="item.active" no-action>
				<template v-slot:activator>
					<v-list-item-content class="categoryMenu">
						<v-list-item-title  v-text="item.name"></v-list-item-title>
					</v-list-item-content>
				</template>
				<v-list-item
					link
					v-for="subItem in item.childrens"
					:key="subItem.id"
					@click="() => selectSubItem(subItem)"
				>
					<v-list-item-content class="categorySubMenu">
						<v-list-item-title v-text="subItem.name"></v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list-group>
		</v-list>
	</v-menu>
</template>

<script>
export default {
	name: 'CategoryFilter',
	props: {
		placeholder: {
			type: String,
			default: ''
		},

		items: {
			type: Array,
			default: () => []
		},

		onSelectItem: {
			type: Function
		},

		current: {
			type: Number
		}
	},

	data: () => ({
		selected: ''
	}),

	methods: {
		selectSubItem(item) {
			this.selected = item;
			if (this.onSelectItem) {
				this.onSelectItem(item);
			}
		}
	},

	computed: {
		selectedItem() {
			if (this.current > 0) {
				const el = this.items.find(i => i.id == this.current);
				if (el) {
					return el.name;
				}
			}

			return this.placeholder;
		}
	}
};
</script>

<style>
.dropdown_button {
	min-width: 200px;
	width: 200px;
	background: #fff
}

.dropdown_button .v-btn__content {
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 100%;
}

.catalog-title {
	display: block;
	overflow: hidden;
	text-overflow: ellipsis;
}

.v-menu__content::-webkit-scrollbar {
	width: 8px;
}

.v-menu__content::-webkit-scrollbar-track {
	background: #ddd;
}

.v-menu__content::-webkit-scrollbar-thumb {
	background: rgb(79, 67, 103);
	border-radius: 35%;
}
.categoryMenu {
	color: #222222;
	font-weight: 600;
	transition: 0.4s all;
}
.categoryMenu:hover {
	color: #f58e15;
	transition: 0.4s all;
}
.categorySubMenu {
	color: #222222;
	font-weight: 400!important;
	transition: 0.4s all;
}
.categorySubMenu:hover {
	color: #f58e15;
	transition: 0.4s all;
}
</style>