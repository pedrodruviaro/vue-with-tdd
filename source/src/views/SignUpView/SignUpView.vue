<script setup>
import axios from 'axios';
import { reactive, computed, onMounted } from 'vue';

const formState = reactive({
  username: '',
  email: '',
  password: '',
  passwordRepeat: ''
});

const isButtonDisabled = computed(() => {
  return formState.password || formState.passwordRepeat
    ? formState.password !== formState.passwordRepeat
    : true;
});

const handleSubmit = () => {
  const { username, email, password } = formState;

  axios.post('/api/v1/users', {
    username,
    email,
    password
  });
};
</script>

<template>
  <div class="col-lg-6 offset-lg-3 offset-md-2">
    <form class="card" @submit.prevent="handleSubmit">
      <div class="card-header text-center">
        <h1>Sign Up</h1>
      </div>

      <div class="card-body">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input id="username" class="form-control" v-model="formState.username" />
        </div>

        <div class="mb-3">
          <label class="form-label" for="email">E-Mail</label>
          <input id="email" class="form-control" v-model="formState.email" />
        </div>

        <div class="mb-3">
          <label class="form-label" for="password">Password</label>
          <input type="password" class="form-control" id="password" v-model="formState.password" />
        </div>

        <div class="mb-3">
          <label class="form-label" for="passwordRepeat">Password Repeat</label>
          <input
            type="password"
            class="form-control"
            id="passwordRepeat"
            v-model="formState.passwordRepeat"
          />
        </div>

        <div class="text-center">
          <button class="btn btn-primary" :disabled="isButtonDisabled">Sign Up</button>
        </div>
      </div>
    </form>
  </div>
</template>
