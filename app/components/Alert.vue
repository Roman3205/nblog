<template>
  <UAlert :title="title" :description="description" variant="subtle" :color="type" :icon="alertIcon">
  </UAlert>
</template>

<script lang="ts" setup>
const props = defineProps<{
  type: "info" | "warning" | "success" | "error"
  title: string
  description: string
}>()

const alertIcon = computed(() => {
    switch(props.type) {
        case 'info':
            return 'material-symbols:info-rounded'
        case 'warning':
            return 'material-symbols:warning-rounded'
        case 'success':
            return 'material-symbols:check-circle-rounded'
        case 'error':
            return 'ph:minus-circle-fill'
    }
})
</script>

<style>

</style>