<template lang="pug">
    div.page-header-wrap
        div.status-bar(:style="isMargin ? {'height':`${$deviceData.statusBarHeight}px` } : ''")
        div.page-header
            section.go-back(
                v-if="hasHistory"
                @click="goBackHandle"
                :style="customStyle"
            )
                <van-icon name="arrow-left" />
            section.title {{ title }}
            section.page-header-right(v-if="$slots && $slots.default")
                slot
</template>
<script>
import { dsCloseWebview } from '@/utils/dsBridge';
import { mapState } from 'vuex';

export default {
    name: 'PageHeader',
    props: {
        title: {
            type: String,
            default: '',
        },
        // 是否设置顶部margin
        isMargin: {
            type: Boolean,
            default: true,
        },
        customStyle: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    computed: {
        ...mapState([
            '$deviceData',
            'history'
        ]),
        hasHistory() {
            return this.history.length > 1
        }
    },
    methods: {
        async goBackHandle() {
            if (!this.hasHistory) {
                await dsCloseWebview();
            } else {
                this.$router.go(-1);
            }
        }
    },
};
</script>
<style lang="scss" scoped>
    .page-header {
        position: relative;
        height: 44px;
        line-height: 44px;
        background: white;
        z-index: 2;
        > .go-back {
            position: absolute;
            top: 0;
            width: 32px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        > .title {
            width: 100%;
            height: 100%;
            font-weight: 500;
            text-align: center;
        }
        &-right {
            position: absolute;
            top: 0;
            right: 20px;
            height: 100%;
        }
    }
</style>
