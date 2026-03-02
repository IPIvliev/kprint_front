<template>
  <div class="login__buttons">
    <div class="login__buttons-row">
      <div class="login__btn">
        <router-link class="btn btn--gray" to="/login">Вход</router-link>
      </div>
      <div class="login__btn">
        <router-link class="btn btn--black" to="/registration">Регистрация</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 768px) and (max-width: 1199.98px) {
  .login__buttons {
    display: block;
    padding: 4px;
    border-radius: 16px;
    margin-bottom: 32px;
    background-color: #dbddde;
  }

  .login__buttons-row {
    display: flex;
    margin-left: -4px;
  }

  .login__btn {
    width: 50%;
    padding-left: 4px;
  }

  .login__btn .btn {
    width: 100%;
  }
}
</style>
