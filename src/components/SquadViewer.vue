<script setup>
import Player from "./Player.vue";
defineProps(['squad']);
</script>

<template>
  <div v-if="squad" class="vjs-wc-squad-info" style="padding: 10px;">
    <h3>PLAYERS</h3>
    <div style="display: flex; flex-wrap: wrap;">
      <Player v-for="player in squad.players" :key="player.name" :player="player" />
    </div>
  </div>
</template>
