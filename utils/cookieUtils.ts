import Cookies from "js-cookie";

const defaultCookieOptions: Cookies.CookieAttributes = {
  expires: 10,
  path: "/",
};

export const setCookie = (
  key: string,
  value: string,
  options?: Cookies.CookieAttributes
): void => {
  let cookieOptions: Cookies.CookieAttributes = { ...defaultCookieOptions };

  if (options) {
    cookieOptions = { ...cookieOptions, ...options };
  }
  Cookies.set(key, value, cookieOptions);
};

export const getCookie = (key: string): string | null => {
  const cookieValue = Cookies.get(key);
  return cookieValue ?? null;
};

export const clearCookie = (key: string): void => {
  Cookies.remove(key);
};
