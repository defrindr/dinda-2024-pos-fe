<script lang="ts" setup>
import InputField from '@/components/Auth/Login/InputFieldAuthComponent.vue'
import { useAuthStore } from '@/stores/auth'
import { reactive } from 'vue'

const authStore = useAuthStore()

const form = reactive({ username: '', password: '' })

const onSubmit = () => authStore.actionLogin(form)
</script>

<template>
  <div class="card-body login-card-body">
    <p class="login-box-msg">Sign in to start your session</p>
    <InputField v-model="form.username" type="text" placeholder="John.doe" icon="fas fa-user" />
    <InputField v-model="form.password" type="password" placeholder="********" icon="fas fa-lock" />

    <div class="row">
      <div class="col-8"></div>
      <!-- /.col -->
      <div class="col-4">
        <button @click="onSubmit" type="submit" class="btn btn-primary btn-block">Sign In</button>
      </div>
      <!-- /.col -->
    </div>
  </div>
</template>
