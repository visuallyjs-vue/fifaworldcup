<script setup>
import TeamFlag from "./TeamFlag.vue";
defineProps(['stats']);
</script>

<template>
  <div v-if="stats && stats.rankedTeams" class="vjs-fwc-group-stats" style="padding: 10px; font-family: sans-serif; background-color: white; margin: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
      <thead>
        <tr style="border-bottom: 2px solid #eee; text-align: left;">
          <th style="padding: 8px 4px;">#</th>
          <th style="padding: 8px 4px;">Team</th>
          <th style="padding: 8px 4px; text-align: center;">W</th>
          <th style="padding: 8px 4px; text-align: center;">D</th>
          <th style="padding: 8px 4px; text-align: center;">L</th>
          <th style="padding: 8px 4px; text-align: center;">F</th>
          <th style="padding: 8px 4px; text-align: center;">A</th>
          <th style="padding: 8px 4px; text-align: center;">GD</th>
          <th style="padding: 8px 4px; text-align: center;">P</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(team, index) in stats.rankedTeams" :key="team.name" style="border-bottom: 1px solid #eee;">
          <td style="padding: 8px 4px;">{{ index + 1 }}</td>
          <td style="padding: 8px 4px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 20px; height: 20px; border-radius: 50%; overflow: hidden; display: flex; align-items: center; justify-content: center;">
                <TeamFlag :team="team" />
              </div>
              <span>{{ team.name }}</span>
            </div>
          </td>
          <td style="padding: 8px 4px; text-align: center;">{{ stats.wins[team.name] }}</td>
          <td style="padding: 8px 4px; text-align: center;">{{ stats.draws[team.name] }}</td>
          <td style="padding: 8px 4px; text-align: center;">{{ stats.losses[team.name] }}</td>
          <td style="padding: 8px 4px; text-align: center;">{{ stats.goalsFor[team.name] }}</td>
          <td style="padding: 8px 4px; text-align: center;">{{ stats.goalsAgainst[team.name] }}</td>
          <td style="padding: 8px 4px; text-align: center;">
            {{ (stats.goalsFor[team.name] - stats.goalsAgainst[team.name]) > 0 ? `+${stats.goalsFor[team.name] - stats.goalsAgainst[team.name]}` : (stats.goalsFor[team.name] - stats.goalsAgainst[team.name]) }}
          </td>
          <td style="padding: 8px 4px; text-align: center; font-weight: bold;">{{ stats.points[team.name] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
