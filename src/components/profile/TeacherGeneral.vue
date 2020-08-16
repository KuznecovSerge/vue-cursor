<template>
    <div class="row">
        <TeacherNavigate 
            class="teacher-profile__leftmenu"
            @input="activeComponent = $event"
        />
        <component 
            class="col p-0"
            :is="activeComponent"
        />
    </div>
</template>

<script>
import TeacherNavigate from '@/components/profile/TeacherNavigate';
import TeacherProducts from '@/components/profile/partner/TeacherProducts';
//old design
import PartnerSection from '@/components/profile/PartnerSection';
import AdminSection from '@/components/profile/AdminSection';
export default {
	name: 'TeacherGeneral',

	components: {
        TeacherNavigate,
        TeacherProducts,
        PartnerSection,
        AdminSection
    },

    data() {
        return {
            activeComponent: 'TeacherProducts',
        }
    }
};
</script>

<style lang="less">
.teacher-profile {
    &__leftmenu {
        margin-right: 32px;
    }
}
</style>