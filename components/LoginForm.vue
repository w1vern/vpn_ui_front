<template>
  <div class="min-w-24 border rounded-2xl mb-16">
    <Form v-slot="$form" @submit="onFormSubmit" class="m-8">
      <div class="flex flex-col gap-3 items-center">
        <FloatLabel variant="on">
          <InputText v-model="telegramID" id="telegram-id-input" name="telegram-id" type="text"
            :disabled="isCodeSended" />
          <label for="telegram-id-input">Telegram ID</label>
        </FloatLabel>
        <div v-if="isCodeSended">
          <FloatLabel variant="on">
            <InputText v-model="telegramCode" id="telegram-secret-input" name="telegram-secret" type="text" />
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

const isCodeSended = ref(false);
const sendCodeText = ref('Send Code');
const telegramID = ref('');
const telegramCode = ref('');
const toast = useToast();

interface fetchResponseScheme {
  message?: string;
  detail?: string;
}

async function sendCode() {
  try {
    const response = await $fetch<fetchResponseScheme>("/api/auth/tg_code", {
      method: "POST",
      body: JSON.stringify({ tg_id: telegramID.value }),
    })

    isCodeSended.value = true;
    sendCodeText.value = 'Resend Code';
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: "Try checking Telegram ID" });
  }
}

async function onFormSubmit(form_data: FormSubmitEvent) {
  try {
    const response = await $fetch<fetchResponseScheme>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        tg_id: telegramID.value,
        tg_code: telegramCode.value,
      }),
    })

    toast.add({ severity: 'success', summary: 'Success', detail: "You're logged in!" });
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: "Try checking Secret Code" });
  }
}
</script>

<style></style>