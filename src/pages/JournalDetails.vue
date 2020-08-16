<template>
	<div v-if="details != null">
		<b-card
			:title="details.title"
			:img-src="details.image ? `/public/assets/media/${details.image}` : ''"
			img-height="200px"
			img-top
			tag="article"
			class="mb-4 journal-card"
		>
			<b-card-text>
				<div class="d-flex justify-content-between">
					<div class="journal-card__tags" v-if="details.tags.length">
						<span>Категории:</span>
						<b-btn
							class="mr-2"
							size="sm"
							variant="info"
							v-for="tag in details.tags"
							v-bind:key="tag.id"
							@click="() => {
								const tags = $auth.user().tags;
								if (tags.find(t => t.name === tag.name)) {
									unsubscribe(tag);
									return;
								}

								subscribe(tag);
							}"
						>{{ tag.name }}</b-btn>
					</div>
					<div v-else></div>
					<div>
						<b-button-group>
							<b-btn
								text
								icon
								variant="warning"
								@click="$router.push({ name: 'journalDetailsEdit', params: { id: $route.params.id }})"
							>
								<i class="far fa-edit"></i>
							</b-btn>
							<b-btn :variant="isLikedVariant" text icon @click="onLike">
								<i class="far fa-heart"></i>
							</b-btn>
						</b-button-group>
					</div>
				</div>
				<div class="journal-card__content t-6" v-if="details.content">
					<tiny-editor v-model="details.content" :inline="true" />
				</div>
				<CommonComments :entityId="journalEntityId" :referenceId="journalDetailsId" />
			</b-card-text>
		</b-card>
	</div>
	<div v-else>
		<b-spinner variant="primary" label="Получаем данные по журналу.."></b-spinner>
	</div>
</template>

<script>
import CommonComments from '@/components/common/Comments';
import TinyEditor from "@/components/common/TinyEditor";

export default {
	name: 'JournalDetails',

	components: {
		CommonComments,
		TinyEditor
	},

	data: () => ({
		details: null
	}),

	created() {
		this.load();
	},

	computed: {
		journalEntityId() {
			return this.CONST.Entities.Journal;
		},

		journalDetailsId() {
			return Number(this.$route.params.id);
		},

		isLikedVariant() {
			const { likes } = this.currentUser;
			const { $route, CONST } = this;
			if (
				likes &&
				likes.find(
					l =>
						l.entityId === CONST.Entities.Journal &&
						l.referenceId === Number($route.params.id)
				)
			) {
				return 'success';
			}

			return 'outline-success';
		}
	},

	methods: {
		onLike() {
			const { $http, $route, CONST } = this;
			$http
				.post('/api/like', {
					entityId: CONST.Entities.Journal,
					referenceId: $route.params.id
				})
				.then(({ like }) => {
					this.$auth.fetch();
				});
		},

		unsubscribe(tag) {
			const { $http, $auth } = this;
			$http.delete(`/api/users/tag/${encodeURIComponent(tag.name)}`).then(({ data }) => {
				if (data.success) {
					this.$swal('Успех', 'Вы отписались от тега', 'success');
				}

				$auth.fetch();
			}).catch(err => this.$swal("Error", err));
		},

		subscribe(tag) {
			const { $http, $auth } = this;
			$http.post('/api/users/tag', {
					name: encodeURIComponent(tag.name)
				})
				.then(({ data }) => {
					if (data.success) {
						this.$swal('Успех', 'Вы подписались на тег', 'success');
					}

					$auth.fetch();
				}).catch(err => this.$swal("Error", err));;
		},

		load() {
			let { $http, $route } = this;
			const { id } = $route.params;
			$http.get(`/api/journalv2/details/${id}`).then(({ data }) => {
				this.details = data.details;
			});
		}
	}
};
</script>

<style>
.journal-card .card-img-top {
	object-fit: cover;
}
</style>