<template>
    <div class="p-4 max-w-xl mx-auto">
        <TabView>
          <TabPanel header="Tab 1" class="p-4">
            <div class="text-lg font-semibold mb-2">Content for Tab 1</div>
            <p class="text-gray-700">
              This is the content inside the first tab. You can style it with Tailwind classes.
            </p>
          </TabPanel>
          <TabPanel header="Tab 2" class="p-4">
            <div class="text-lg font-semibold mb-2">Content for Tab 2</div>
            <p class="text-gray-700">
              This is the content inside the second tab.
            </p>
          </TabPanel>
          <TabPanel header="Tab 3" class="p-4">
            <div class="text-lg font-semibold mb-2">Content for Tab 3</div>
            <p class="text-gray-700">
              This is the content inside the third tab.
            </p>
          </TabPanel>
        </TabView>
      </div>
</template>

<script>
    import TabView from 'primevue/tabview';
    import TabPanel from 'primevue/tabpanel';
</script>