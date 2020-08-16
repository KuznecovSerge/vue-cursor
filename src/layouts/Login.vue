<template>
    <div class="login-app__overlay">
        <div class="login-app__container">        
            <div class="login-app">
                <router-view :key="$route.name"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';

export default {
	name: 'app'
};
</script>

<style lang="less">
body {
    /* скопировал с текущего, там вроде намешаны стили от бутстрапа */
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: left;
    background-color: #fff;
}
html {
	font-size: 14px;
}
.login-app__overlay {
    position: fixed;
    overflow: auto;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    &::after {
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 100%;
        content: '';
    }

}
.login-app__container {
    display: inline-block;
    vertical-align: middle;
}
.login-app {
    min-height: 400px;
    display: flex;
    align-items: center;
    align-content: center; 
    justify-content: center;
    padding: 20px 0px; 
}
</style>