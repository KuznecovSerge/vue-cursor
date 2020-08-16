<template>
	<div class="mt-3" v-if="reposts.length || demo">
		<p>Репосты:</p>
		<ul>
			<li v-for="repost in reposts" v-bind:key="repost.id">
				<router-link
					class="nav-link"
					:to="`/journal/${repost.journalEntriesId}`"
				>{{ repost.JournalEntries.title }}</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: {
		reposts: Array,
		demo: Boolean
	}
};
</script>

<style scoped>
</style>