<template>
    <Button label="Login" @click="handleClick" class="w-16 py-1 text-white bg-blue-600 rounded-md hover:bg-blue-500 shadow-md  "/>
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
        
    }
</script>