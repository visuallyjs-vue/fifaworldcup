<script setup>
defineProps(['year', 'onViewChange']);
</script>

<template>
  <header class="vjs-fwc-header">
    <div class="vjs-fwc-header-title">
      FIFA World Cup {{ year }}
    </div>
    <nav class="vjs-fwc-header-nav">
      <button @click="onViewChange('teams')" class="vjs-fwc-header-link">
        Teams
      </button>
      <button @click="onViewChange('group-stage')" class="vjs-fwc-header-link">
        Group Stage
      </button>
      <button @click="onViewChange('tournament')" class="vjs-fwc-header-link">
        Tournament
      </button>
    </nav>
  </header>
</template>
