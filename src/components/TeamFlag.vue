<script setup>
import { computed } from 'vue';
import { FIFACountryCode } from "../fifa-converter.js";

const props = defineProps(['team']);

const isoCode = computed(() => {
  return props.team ? FIFACountryCode(props.team.fifa_code)?.ISO2?.toLowerCase() : null;
});
</script>

<template>
  <template v-if="team">
    <img v-if="isoCode" class="vjs-fwc-team-flag" :src="`https://static.visuallyjs.com/img/flags/1x1/${isoCode}.svg`" :alt="team.name" />
    <span v-else>{{ team.fifa_code }}</span>
  </template>
</template>
