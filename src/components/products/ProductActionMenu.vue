<template>
    <b-dropdown 
        class="product-action-menu"
        variant="link"
        toggle-class="text-decoration-none"
        no-caret
        right
    >
        <template v-slot:button-content>&middot;&middot;&middot;</template>
        <b-dropdown-item @click="publishProduct">
            <div class="product-action-menu__icon">
                <simple-svg src="/assets/media/play.svg" width="25px" height="24px" />
            </div>
            <span>{{product.active ? 'Снять с публикации' : 'Опубликовать'}}</span>
        </b-dropdown-item>
        <b-dropdown-item href="#">
            <div class="product-action-menu__icon">
                <simple-svg src="/assets/media/edit.svg" width="25px" height="24px" />
            </div>
            <span>Редактировать</span>
        </b-dropdown-item>
        <b-dropdown-item href="#">
            <div class="product-action-menu__icon">
                <simple-svg src="/assets/media/copy.svg" width="25px" height="24px" />
            </div>
            <span>Копировать</span>
        </b-dropdown-item>
        <b-dropdown-item href="#" link-class="product-action-menu--warning">
            <div class="product-action-menu__icon">
                <simple-svg src="/assets/media/trash.svg" width="25px" height="24px" />
            </div>
            <span>Удалить</span>
        </b-dropdown-item>
    </b-dropdown>
</template>

<script>
export default {
    name: 'ProductActionMenu',
    props: ['product'],
    data() {
        return {
        } 
    },
    methods: {
        publishProduct() {
            const { id, active } = this.product;
            this.$http.put(`/api/catalog/${id}`, {
				active: !active
			}).then(({data}) => {
                this.$emit('change', data.product);
            }).catch((error) => {
                this.$swal("Ошибка: " + error.message, undefined, "error");
            });
        }
    },
};
</script>

<style lang="less">
.product-action-menu {
    .btn {
        font-size: 28px;
        line-height: 28px;
        font-weight: 500;
        color: @black;
        &:hover {
            color: @orange-100;
        }
        &:active {
            color: @orange-200;
        }
    
    }
    .dropdown-menu {
        padding: 10px 24px;
    }
    .dropdown-item {
        display: flex;
        padding: 10px 0px;
        color: @black;
        &:hover {
            color: @orange-100;
            background: unset;
            svg {
                stroke: @orange-100;
            }
        }
    }
    .dropdown-item&--warning {
        color: #FF0000;
        svg {
            stroke: #FF0000;
        }
    }
    &__icon {
        width: 25px;
        height: 24px;
        margin-right: 15px;
    }
}

</style>