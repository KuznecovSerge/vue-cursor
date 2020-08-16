<template>
	<b-row class="row mc-journal">
		<div class="mc-journal-header">
			<span class="mc-journal-header__title col-md-6">Журналы</span>
			<div class="mc-journal__filters">
				<div class="mc-journal__filter">
					<search-input
						:hasbutton="false"
						placeholder="Поиск по журналам"
						v-model="findstr"
						@search="filter.findstr = findstr"
					/>
				</div>
				<div class="mc-journal__filter">
					<mc-cascader
						v-model="filterSortModel"
						:options="filterPopularSort"
						placeholder="По популярности"
						:clearable="true"
					>
						<template v-slot:icon>
							<img width="24" height="24" src="/assets/media/filters.svg" />
						</template>
					</mc-cascader>
				</div>
			</div>
		</div>
		<!-- <journal-tag-slider /> -->
		<b-row class="mc-journal-body" v-if="!loading">
			<b-col sm="12" md="9" class="mt-3">
				<div class="mc-journal-body__list">
					<journal-card
						v-for="(journal, idx) in journals.slice(0, 5)"
						:key="idx"
						:type="!idx ? 'full' : idx > 1 && idx < 5 ? 'flat' : ''"
						:journal="journal"
					/>
				</div>
				<div class="mc-journal-body__cards" v-if="journals.length > 5">
					<journal-card v-for="(journal, idx) in journals.slice(5)" :key="idx" :journal="journal" />
				</div>
				<span v-if="showMoreJournals" class="mc-btn-white xl col-md-12" @click="fetchNext(true)">Показать больше статей</span>
			</b-col>
			<b-col sm="12" md="3" class="pl-6 mt-3">
				<div>
					<div class="mc-journal-tags">
						<span class="mc-journal-tags__title">Популярные теги</span>
						<div class="mc-journal-tags__body tags">
							<div class="tags__item" v-for="(item, index) in tags" :key="index">
								<span>{{ item.tag.name }}</span>
							</div>
						</div>
					</div>
				</div>
			</b-col>
		</b-row>
		<loader v-else />
	</b-row>
</template>

<script>
import SearchInput from '@/components/catalog/SearchInput';
import McCascader from '@/components/common/mc-cascader';
import JournalTagSlider from '@/components/journal/JournalTagSlider';
import JournalCard from '@/components/journal/JournalCard';
import { popularSort } from '@/components/journal/sort';
import loader from "@/components/loader";

export default {
	components: {
		SearchInput,
		McCascader,
		JournalTagSlider,
		JournalCard,
		loader
	},

	data: () => {
		return {
			filter: {
				findstr: '',
				sort: '',
				direction: '',
				limit: 8
			},
			journals: null,
			journalsCount: 0,
			tags: [],
			findstr: '',
			findstrDebounce: null,
			loading: true
		};
	},

	mounted() {
		this.fetchNext();
		this.fetchTags();
	},

	methods: {
		journalCardType(index) {
			if (!index) {
				return 'full';
			} else if (index > 1 && index < 4) {
				return 'flat';
			}

			return '';
		},

		fetchNext(append) {
			if (!append) this.loading = true;

			const offset = this.journals ? this.journals.length : 0;

			this.$http.get('/api/journalv2', {
				params: {
					offset,
					...this.filter
				}
			}).then(({ data }) => {
				const { journals, journalsCount } = data;

				this.journalsCount = journalsCount;
				if (append) {
					if (!this.journals) {
						this.journals = [];
					}

					this.journals = this.journals.concat(journals);
					return;
				}

				this.journals = journals;
			}).finally(() => {
				if (!append) this.loading = false;
			});
		},

		fetchTags() {
			this.$http.get('/api/journalv2/tags/top').then(({ data }) => {
				this.tags = data.tags;
			});
		}
	},

	computed: {
		filterPopularSort() {
			return popularSort;
		},

		showMoreJournals() {
			const { journals, journalsCount } = this;

			return (journalsCount - journals.length) > 0;
		},

		filterSortModel: {
			get() {
				const { sort, direction } = this.filter;

				return [sort, direction];
			},

			set(value) {
				const { filter } = this;
				const [sort, direction] = value;

				this.journals = [];
				this.filter = { ...filter, sort, direction };
			}
		},

		journalsSorted() {
			const { journals } = this;

			return journals.sort((a, b) => a.likesCount > b.likesCount);
		}
	},

	watch: {
		findstr(newValue, oldValue) {
			if (newValue.length < 3) return;

			clearTimeout(this.findstrDebounce);

			this.findstrDebounce = setTimeout(() => {
				this.journals = [];
				this.filter.findstr = newValue;
			}, 450);
		},

		filter: {
			handler: function(newVal, oldVal) {
				this.fetchNext();
			},
			deep: true
		}
	}
};
</script>

<style lang="less">
.mc-journal {
	overflow: hidden;
	position: relative;

	.mc-journal-tags {
		background: @white;
		border: 1px solid @border-color;
		display: flex;
		flex-direction: column;

		.mc-journal-tags__title {
			padding: 16px 24px;
			font-weight: 500;
			font-size: 18px;
			line-height: 130%;
			color: @black;
			border-bottom: 1px solid @border-color;
		}

		.mc-journal-tags__body {
			padding: 24px;
		}
	}

	.mc-journal__filters {
		display: flex;

		.mc-journal__filter {
			width: 290px;
			padding-right: 0;

			&:not(:last-child) {
				margin-right: 32px;
			}
		}
	}

	.mc-journal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		flex-wrap: wrap;
		padding-bottom: 25px;
		border-bottom: 1px solid @border-color;

		.mc-journal-header__title {
			font-size: 40px;
			line-height: 47px;
			color: @black;
			padding-left: 0;
		}
	}

	.mc-journal-body {
		margin-top: 40px;
		width: 100%;

		.mc-journal-body__cards {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			margin-bottom: 40px;

			.mc-journal-card {
				width: 294px;
				min-height: 396px;
			}
		}

		.mc-journal-body__list {
			.mc-journal-card--full {
				display: inline-flex;
				width: 65%;
				min-width: 620px;

				& + .mc-journal-card {
					display: inline-flex;
					vertical-align: top;
					width: 30%;
					margin-left: 40px;
				}
			}

			.mc-journal-card {
				margin-bottom: 40px;
			}
		}
	}
}
</style>