import {createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import ar from '@/locales/ar.json'
import hi from '@/locales/hi.json'
import ml from '@/locales/ml.json'

export default createI18n({
    locale:'en',
    fallbackLocale:'en',
    messages:{
        en,
        ar,
        hi,
        ml
    }
})