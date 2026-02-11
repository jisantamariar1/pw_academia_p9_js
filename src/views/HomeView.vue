<template>
  <div class="home">
    <WelcomeCard />
  </div>
</template>

<script>
// Comentario arriba de la línea
// Importamos el componente de bienvenida
import WelcomeCard from '@/components/WelcomeCard.vue';

export default {
  name: 'HomeView',
  components: {
    WelcomeCard
  }
}
</script>

<style scoped>
.home {
  min-height: calc(100vh - 80px);
  background-color: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>