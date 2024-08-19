<template>
  <Button  label="Register" @click="handleClick"></Button>
</template>

<script setup>
import Button from 'primevue/button';

const props = defineProps({
    onClick: {
        type: Function,
        required: true
    }
});

const handleClick = () => {
    if (props.onClick) {
        props.onClick();
    }
};
</script>