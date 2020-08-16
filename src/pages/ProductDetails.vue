<template>
	<div v-if="success">
		<CatalogItem :product="item" :clickable="false" :withPopover="false">
			<template v-slot:content>
				<div class="pl-4 pr-4">
                    <CoursesList 
                        :courses="courses"
                    />
					<TinyEditor :content="item.content" :disabled="true" :inline="true" />
				</div>
			</template>
		</CatalogItem>
	</div>
	<div v-else>
		<v-alert type="error">{{ message }}</v-alert>
	</div>
</template>

<script>
import CatalogItem from '@/components/catalog/CatalogItem';
import TinyEditor from '@/components/common/TinyEditor';
import CoursesList from '@/components/course/CoursesList';

export default {
	name: 'ProductDetails',

	components: {
		CatalogItem,
		TinyEditor,
		CoursesList
	},

	data: () => ({
		success: true,
		message: '',
		item: new Object(),
		courses: [],
		contentHTML: ''
	}),

	beforeCreate() {
		const id = this.$route.params.id;
		this.$http
			.get(`/api/product/details/${this.$route.params.id}`)
			.then(res => {
				const data = res.data.details;
				this.success = data.success;
				this.message = data.message;
				if (data.success) {
					this.item = data.item;
					if (this.item.courses && this.item.courses.length) {
						this.courses = this.item.courses;
					}
				}
			});
	}
};
</script>

<style >
</style>