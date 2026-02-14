<script setup>
</script>

<template>
  <div class="clicker-block">
    <div>монета</div>
  </div>
</template>

<style scoped>
.clicker-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #242424;
  color: #fff;
  border-radius: 12px;
  width: fit-content;
  margin: 2rem auto;
}

.balance {
  font-size: 20px;
  font-weight: 600;
}

button {
  padding: 0.5rem 1rem;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: #00f0ff;
  color: #000;
  transition: 0.2s;
}

button:hover {
  background: #00d0ff;
}
</style>
