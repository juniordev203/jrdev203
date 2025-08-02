import Cookies from "js-cookie";
import { COOKIE_KEYS } from "@/lib/keys";

export const setAccessTokenCookie = (accessToken: string) => {
  Cookies.set(COOKIE_KEYS.ACCESS_TOKEN, accessToken, {
    expires: 7, // days
    sameSite: "strict",
  });
};

export const getAccessTokenCookie = (): string | undefined => {
  return Cookies.get(COOKIE_KEYS.ACCESS_TOKEN);
};

export const clearAccessTokenCookie = () => {
  Cookies.remove(COOKIE_KEYS.ACCESS_TOKEN);
};

export const setRefreshTokenCookie = (refreshToken: string) => {
  Cookies.set(COOKIE_KEYS.REFRESH_TOKEN, refreshToken, {
    expires: 30, // 30 days
    sameSite: "strict",
  });
};
export const getRefreshTokenCookie = (): string | undefined => {
  return Cookies.get(COOKIE_KEYS.REFRESH_TOKEN);
};
export const clearRefreshTokenCookie = () => {
  Cookies.remove(COOKIE_KEYS.REFRESH_TOKEN);
};
export const clearAllCookies = () => {
  clearAccessTokenCookie();
  clearRefreshTokenCookie();
};
export const setAccountIdLocalStorage = (accountId: number) => {
  localStorage.setItem(COOKIE_KEYS.ACCOUNT_ID, accountId.toString());
};
