import { defineStore } from "pinia";
export const useColorStore = defineStore("color", () => {
    const btnPurple = "rgb(145, 151, 244)";
    return {
        btnPurple,
    };
})