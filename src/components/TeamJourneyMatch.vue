<script setup>
import MatchSummary from "./MatchSummary.vue";

defineProps(['data']);
</script>

<template>
  <div class="vjs-fwc-team-journey-item" style="width: 400px;">
    <div class="vjs-fwc-team-journey-item-summary">
      <MatchSummary :data="data"/>
    </div>
    <div class="vjs-fwc-team-journey-item-details">
      <div class="vjs-fwc-team-journey-item-round">
        {{ data.group ? `${data.group} - ${data.round}` : data.round }}
      </div>
      <div class="vjs-fwc-team-journey-item-info">
        <span>{{ data.date }}</span>
        <span class="vjs-fwc-team-journey-item-separator">|</span>
        <span>{{ data.time }}</span>
      </div>
      <div class="vjs-fwc-team-journey-item-ground">
        {{ data.ground }}
      </div>
    </div>
  </div>
</template>
