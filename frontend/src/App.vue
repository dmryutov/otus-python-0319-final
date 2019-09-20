<template>
    <router-view />
</template>

<style lang="scss">
    @import '~nprogress/nprogress.css';
    @import '~handsontable-pro/dist/handsontable.full.min.css';
    @import '~roboto-fontface/css/roboto/roboto-fontface.css';
    @import '~@mdi/font/css/materialdesignicons.css';
    @import 'assets/css/handsontable.fix.css';

    #nprogress {
        .bar {
            height: 3px;
            background: #BDBDBD; // colors.grey.lighten1
        }

        .peg {
            box-shadow: none;
        }
    }
</style>

<style lang="stylus">
    @import '~vuetify/src/stylus/app.styl';
    @import '~vuetify/src/stylus/main.styl';

    /*------------------------------------------------------------------
    [Global]
    */
    body
        font-family: $body-font-family
        font-size: $font-size-root
        font-weight: $font-weights.regular
        line-height: $line-height-root
    h1
        font-size: 48px
        font-weight: $font-weights.thin
        letter-spacing: -1.5
    h2
        font-size: 36px
        font-weight: $font-weights.light
        letter-spacing: -0.5
    h3
        font-size: 24px
        font-weight: $font-weights.light
        letter-spacing: normal
    h4
        font-size: 20px
        font-weight: $font-weights.light
        letter-spacing: normal
    h5
        font-size: 16px
        font-weight: $font-weights.regular
        letter-spacing: normal

    /*------------------------------------------------------------------
    [Components / Card]
    */
    .v-card
        // box-shadow: 0 1px 3px 1px rgba(0,0,0,0.03)
        box-shadow: 0 1px 1px 0 rgba(60,64,67,.08), 0 1px 3px 1px rgba(60,64,67,.16);
        &__actions
            .v-btn
                margin: 0 8px;
                min-width: 56px
                &:first-child
                    margin-left: 0
</style>
