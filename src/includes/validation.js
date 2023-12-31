import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage as VeeError,
  configure,
} from 'vee-validate'
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minVal,
  max_value as maxVal,
  confirmed,
  not_one_of as excluded
} from '@vee-validate/rules'

export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('VeeError', VeeError)

    defineRule('required', required)
    defineRule('tos', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alpha_spaces', alphaSpaces)
    defineRule('email', email)
    defineRule('min_value', minVal)
    defineRule('max_value', maxVal)
    defineRule('confirmed', confirmed)
    defineRule('excluded', excluded)
    defineRule('songTitleValidation', required)

    configure({
        generateMessage: ctx => {
            const messages={
                required:`The field ${ctx.field} is required`,
                min:`The field ${ctx.field} is too short`,
                max:`The field ${ctx.field} is too long`,
                alpha_spaces:`The field ${ctx.field} may only contain alphabetical characters and spaces`,
                email:`The field ${ctx.field} must be a valid email`,
                min_value:`The field ${ctx.field} is too low`,
                max_value:`The field ${ctx.field} is too high`,
                confirmed:`The field ${ctx.field} confirmation does not match`,
                excluded:`You are not allowed to use this value for the field ${ctx.field}`,
                tos:`You must accept the Terms of Service`,
                songTitleValidation:`The field song title should not be empty`
            }

            const message=messages[ctx.rule.name] ? messages[ctx.rule.name] : `The field ${ctx.field} is invalid`

            return message
        },
        validateOnBlur: true,
        validateOnChange: true,
        validateOnInput: false,
        validateOnModelUpdate: true,
    })
  }
}
