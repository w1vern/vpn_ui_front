<template>
  <div class="min-w-24 border rounded-2xl mb-16">
    <Form v-slot="$form" @submit="onFormSubmit" class="m-8">
      <div class="flex flex-col gap-3 items-center">
        <FloatLabel variant="on">
          <InputText v-model="telegramID" id="telegram-id-input" name="telegram_id" type="text"
            :disabled="isCodeSended" />
          <label for="telegram-id-input">Telegram ID</label>
        </FloatLabel>
        <div v-if="isCodeSended">
          <FloatLabel variant="on">
            <InputText id="telegram-secret-input" name="telegram_secret" type="text" />
            <label for="telegram-secret-input">Telegram Secret</label>
          </FloatLabel>
        </div>
        <div class="flex w-full">
          <Button class="grow mr-3" @click="sendCode" severity="primary">{{ sendCodeText }}</Button>
          <Button class="grow" label="Log In" type="submit" severity="secondary" :disabled="!isCodeSended"></Button>
        </div>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from '@primevue/forms';
import { apiAuthFetch } from '~/utils/apiAuth';

const isCodeSended = ref(false);
const sendCodeText = ref('Send Code');
const telegramID = ref('');
const toast = useToast();
const store = useMyUserStore();

async function sendCode() {
  const response = await apiAuthFetch('tg_code', "POST", JSON.stringify({ tg_id: telegramID.value }));
  if (response.status === 200) {
    toast.add({ severity: "success", summary: 'Success', detail: response.message, life: 3000 });
    isCodeSended.value = true;
    sendCodeText.value = 'Resend Code';
  }
  else {
    toast.add({ severity: 'error', summary: 'Error', detail: response.message, life: 5000 });
  }
}

async function onFormSubmit(form_data: FormSubmitEvent) {
  const response = await apiAuthFetch('login', "POST", JSON.stringify({ tg_id: form_data.values.telegram_id, tg_code: form_data.values.telegram_secret }));
  if (response.status === 200) {
    toast.add({ severity: "success", summary: 'Success', detail: response.message, life: 3000 });
    await store.fetchData();
    navigateTo('/');
  }
  else {
    toast.add({ severity: 'error', summary: 'Error', detail: response.message, life: 5000 });
  }
}
</script>

<style></style>