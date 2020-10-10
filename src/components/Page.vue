<template>
    <div class="k-page">
        <transition :name="animationName">
            <keep-alive>
                <router-view /> 
            </keep-alive>
        </transition>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        computed: {
            ...mapGetters('index', ['animationName'])
        },
        mounted() {
            console.log(this.animationName);
        }
    }
</script>
<style lang="scss">
    .k-page {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        overflow: hidden;
    }

    .pageEnter {
        &-enter {
            transform: translate3d(100%, 0, 0);
        }

        &-leave-to {
            transform: translate3d(-100%, 0, 0);
        }

        &-enter-active, &-leave-active {
            // 开启GPU加速
            will-change: transform;
            transition: transform 0.36s;
            position: absolute;
            width:100%;
            left:0;
        }
    }

    .pageLeave {
        &-enter {
            transform: translate3d(-100%, 0, 0);
        }

        &-leave-to {
            transform: translate3d(100%, 0, 0);
        }

        &-enter-active, &-leave-active {
            // 开启GPU加速
            will-change: transform;
            transition: transform 0.36s;
            position: absolute;
            width:100%;
            left:0;
        }
    }
</style>