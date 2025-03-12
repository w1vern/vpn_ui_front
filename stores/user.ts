import { defineStore } from "pinia";
import { apiAuthFetch } from "~/utils/apiAuth";

interface UserDataScheme {
  id: string;
  telegram_id: string;
  telegram_username: string;
  balance: number;
  created_date: string;
  rights: {
    is_server_editor: boolean;
    is_transaction_editor: boolean;
    is_active_period_editor: boolean;
    is_tariff_editor: boolean;
    is_member_rights_editor: boolean;
    is_admin_rights_editor: boolean;
    is_control_panel_user: boolean;
    is_verified: boolean;
  };
  settings: {
    auto_pay: boolean;
    is_active: boolean;
    get_traffic_notifications: boolean;
  };
}

export const useMyUserStore = defineStore("user", () => {
  const userData = ref<UserDataScheme | null>(null);

  const fetchData = async () => {
    const response = await apiAuthFetch("user_info", "GET", "");

    if (response.status === 200 && response._data) {
      userData.value = response._data as UserDataScheme;
    }
  };

  return {
    userData,
    fetchData,
  };
});
