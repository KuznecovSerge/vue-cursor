<template>
	<div class="breadcrumbs">
		<b-breadcrumb class="breadcrumbs__items" :items="breadcrumbList" light />
	</div>
</template>

<script>
export default {
	data: () => {
		return {
			breadcrumbList: []
		};
	},

	watch: {
		$route(newVal, oldVal) {
			const { breadcrumbList } = this;
			const lastItem = breadcrumbList.length
				? breadcrumbList[breadcrumbList.length - 1]
				: null;
			if (lastItem && (lastItem.path === newVal.path || !newVal.meta.title)) {
				lastItem.fullPath = newVal.fullPath;
				return;
			}

			if (breadcrumbList.length === 5) {
				breadcrumbList.shift();
			}

			if (lastItem !== null) {
				lastItem.disabled = false;
			}

			breadcrumbList.push({
				text: newVal.meta.title,
				path: newVal.path,
				to: newVal.fullPath,
				disabled: true
			});
		}
	}
};
</script>

<style lang="less">
.breadcrumbs {
	.breadcrumb {
		background: transparent;
		padding-top: 27px;
		padding-bottom: 24px;
		margin-bottom: 0;
		padding-left: 0;

		&-item {
			font-size: 12px;

			a {
				color: @gray-300;
			}

			&.active {
				color: @black;
			}
		}
	}

	.breadcrumb-item + .breadcrumb-item::before {
		content: '>';
		color: @gray-300;
	}
}
</style>