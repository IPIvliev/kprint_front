<template lang="pug">
// callback
.callback
  .container 
    .callback__block
      .callback__img
        img(src="@/assets/img/callback.webp", alt="")
      .callback__content 
        h2.callback__title Хотите узнать больше о наших принтерах или материалах?
        p.callback__text Укажите свои контактные данные и наш менеджер свяжется с вами для консультации
        form(action="#").callback__form
          .callback__input 
            input(type="text" placeholder="Введите номер телефона")
          button(type="submit").btn.btn--red.btn--big Отправить заявку
//	/callback
</template>