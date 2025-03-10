<script setup>
import axiosInstance from "@/composables/axios";
import { toastError } from "@/composables/helper.js";
import { socket } from "@/composables/socket";
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const cardLabelsCopy = defineModel("cardLabelsCopy");
const cardLabels = defineModel("cardLabels");
const newLabelMenu = defineModel("newLabelMenu");

const props = defineProps({
  boardLabels: Array,
  cardId: String,
  boardId: String,
  listId: String,
  isButton: Boolean,
});

const emit = defineEmits(["updateCard", "openEditLabel"]);
const loading = ref(false);

const updateCardLabels = async (labels) => {
  loading.value = true;
  try {
    const res = await axiosInstance.put(`/card/labels/${props.cardId}`, {
      labels: labels.map((label) => label.id),
    });
    emit("updateCard", res.data);
    cardLabels.value = res.data.labels;
    socket.emit("update-cards", props.boardId, [props.listId]);
    socket.emit("update-card", props.cardId);
  } catch (err) {
    toastError(err);
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <div class="flex" :class="!isButton ? 'pb-5' : ''">
    <div
      class="flex items-center flex-wrap gap-2"
      v-if="cardLabels.length > 0 && !isButton"
    >
      <template v-for="label in cardLabels">
        <v-btn :color="label.color" variant="flat">
          <p v-if="label.title">
            {{ label.title.toUpperCase() }}
          </p>
        </v-btn>
      </template>
    </div>

    <v-menu
      :close-on-content-click="false"
      class="flex justify-center items-center"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          :variant="isButton ? 'tonal' : 'text'"
          :class="isButton ? 'w-full' : ''"
        >
          <div v-if="!isButton">
            <Icon icon="ph:plus" width="20" />
          </div>
          <template v-slot:prepend v-if="isButton">
            <icon icon="ph:tag" width="20" />
          </template>
          <p class="text-md" v-if="isButton">Labels</p>
        </v-btn>
      </template>
      <v-card class="relative">
        <v-card-title class="text-center relative"> Labels </v-card-title>
        <v-card-text>
          <v-item-group
            v-model="cardLabelsCopy"
            multiple
            class="space-y-2 my-2 w-96"
          >
            <v-item
              v-for="label in boardLabels"
              :value="label"
              v-slot="{ isSelected, toggle }"
            >
              <div class="flex items-center">
                <v-btn
                  class="w-11/12"
                  :color="label.color"
                  @click="
                    async () => {
                      await toggle();
                      await updateCardLabels(cardLabelsCopy);
                    }
                  "
                >
                  <p v-if="label.title">
                    {{ label.title.toUpperCase() }}
                  </p>
                  <template v-slot:prepend v-if="isSelected">
                    <Icon icon="ph:check" width="20" />
                  </template>
                </v-btn>
                <v-btn
                  icon
                  variant="text"
                  size="small"
                  @click="$emit('openEditLabel', label)"
                >
                  <Icon icon="ph:pencil-simple" width="20" />
                </v-btn>
              </div>
            </v-item>
          </v-item-group>
          <v-btn @click="newLabelMenu = true" variant="tonal" class="w-full">
            Add a new label
          </v-btn>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>
