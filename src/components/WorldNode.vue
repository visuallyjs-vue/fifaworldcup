<script setup>

defineProps({
  obj: Object,
})

</script>

<template>
  <div class="vjs-world" data-vjs-target="true">
    {{ obj.data.label }}
  </div>
</template>

