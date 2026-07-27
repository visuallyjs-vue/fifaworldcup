<script setup>
import TeamFlag from "./TeamFlag.vue";
defineProps(['team']);
</script>

<template>
  <div v-if="team" class="vjs-wc-team-info" style="padding: 10px; font-family: sans-serif;">
    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px; background-color: #f3f3f3; padding: 10px;">
      <TeamFlag :team="team" />
    </div>
    <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
      <tbody>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 8px 0; color: #666; font-weight: bold;">Name</td>
          <td style="padding: 8px 0; text-align: right;">{{ team.name_normalised || team.name }}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 8px 0; color: #666; font-weight: bold;">Continent</td>
          <td style="padding: 8px 0; text-align: right;">{{ team.continent }}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 8px 0; color: #666; font-weight: bold;">FIFA Code</td>
          <td style="padding: 8px 0; text-align: right;">{{ team.fifa_code }}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 8px 0; color: #666; font-weight: bold;">Confederation</td>
          <td style="padding: 8px 0; text-align: right;">{{ team.confed }}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 8px 0; color: #666; font-weight: bold;">Group</td>
          <td style="padding: 8px 0; text-align: right;">{{ team.group }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
