<script setup>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { onMounted, ref, reactive } from "vue";
import axiosInstance from "@/composables/axios";
import { toastError } from "@/composables/helper.js";
import { useTheme } from "vuetify";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const theme = useTheme();
console.log(theme.global.current.value.colors);
const chartData = reactive({
  labels: null,
  datasets: [
    {
      label: "Users",
      data: [30, 4],
      fill: true,
      backgroundColor: theme.global.current.value.colors.primary,
      borderColor: theme.global.current.value.colors["on-background"],
      color: theme.global.current.value.colors["on-background"],
    },
  ],
});
const chartOptions = {
  responsive: true,
};
const isLoading = ref(false);
const getData = async () => {
  isLoading.value = true;
  try {
    const response = await axiosInstance.get(`/users/usersByMonth`, {
      withCredentials: true,
    });
    chartData.labels = await response.data.map(
      (d) => `${d.month} ${d.year.toString()}`
    );
    chartData.datasets[0].data = [...response.data.map((d) => d.count)];
  } catch (err) {
    toastError(err);
  } finally {
    isLoading.value = false;
  }
};
onMounted(async () => {
  await getData();
});
</script>
<template>
  <Line
    :key="chartData.labels || chartData.datasets"
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>
