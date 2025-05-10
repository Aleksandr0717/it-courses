import { computed, onMounted, ref, watch, type ComputedRef } from "vue";
import { useUserStore } from "@/stores/UserStore";
import type { IUserInfo } from "@/interfaces";

export function useCheckRegisteredUser() {
  const userStore = useUserStore();
  const currentUser = computed(() => userStore.currentUser);
  const unRegisteredUser = ref(true);

  onMounted(() => {
    const localStorageUser = localStorage.getItem("currentUser");
    const sessionStorageUser = sessionStorage.getItem("currentUser");
    if (!localStorageUser && !sessionStorageUser) {
      unRegisteredUser.value = true;
    }
    if (localStorageUser) {
      unRegisteredUser.value = false;
      userStore.INIT_CURRENT_USER(parseInt(JSON.parse(localStorageUser)));
    }
    if (sessionStorageUser) {
      unRegisteredUser.value = false;
      userStore.INIT_CURRENT_USER(parseInt(JSON.parse(sessionStorageUser)));
    }
  });

  watch(currentUser, (newValue: ComputedRef<IUserInfo | null>) => {
    if (newValue) unRegisteredUser.value = false;
    else {
      unRegisteredUser.value = true;
    }
  }, {immediate: true, deep: true});

  return {
    unRegisteredUser,
  }
};
