<template>
	<div class="mc-socialshare">
		<social-sharing :networks="addmynetworks" :url="iamhere" inline-template>
			<div class="mc-socialshare-box">
				<network network="twitter">
					<i class="fa fa-twitter"></i>
				</network>
				<network network="facebook">
					<i class="fa fa-fw fa-facebook"></i>
				</network>
				<network network="vk">
					<i class="fa fa-vk"></i>
				</network>
				<span>
					<i class="fa fa-external-link" id="popover-button-sync"></i>
				</span>
			</div>
		</social-sharing>
		<b-popover
			ref="popover"
			target="popover-button-sync"
			@show="open"
			placement="rightbottom"
			title="Поделиться статьей"
		>Ссылка скопирована в буфер обмена!</b-popover>
	</div>
</template>

<script>
import SocialSharing from 'vue-social-sharing';

export default {
	components: {
		SocialSharing
	},
	props: ['value'],
	data() {
		return {
			addmynetworks: {
				copylink: {
					sharer: '',
					type: 'direct'
				}
			}
		};
	},
	computed: {
		iamhere() {
			return window.location.href;
		}
	},
	methods: {
		open(evt) {
			navigator.clipboard.writeText(this.iamhere);
			setTimeout(() => {
				this.$refs.popover.$emit('close');
			}, 3000);
		}
	}
};
</script>

<style lang="less">
.mc-socialshare {
	.mc-socialshare-box {
		span:not(:last-child) {
			margin-right: 8px;
		}
    }
    
	&-box {
		display: flex;
	}

	.fa {
		width: 40px;
		height: 40px;
		text-align: center;
		vertical-align: middle;
		font-size: 20px;
		color: white;
		padding: 8px;
		cursor: pointer;
	}

	.fa-twitter {
		background: #1894ed;
	}
	.fa-facebook {
		background: #395aa6;
	}
	.fa-vk {
		background: #4680c2;
	}
	.fa-external-link {
		background: #f58e15;
	}
}
</style>