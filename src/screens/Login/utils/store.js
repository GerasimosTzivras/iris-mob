import {
  atom,
  selector,
  useRecoilValue,
  useSetRecoilState,
  useRecoilState,
} from "recoil";
import { storeEffect, loggingEffect } from "../../../shared/utils/store";

export const authState = atom({
  key: "AuthState",
  default: null,
  effects_UNSTABLE: [storeEffect("auth"), loggingEffect],
});
export const announcementsState = atom({
  key: "AnnouncementsState",
  default: null,
  effects_UNSTABLE: [storeEffect("announcements"), loggingEffect],
});
export const announcementsData = selector({
  key: "Announcements",
  get: ({ get }) => get(announcementsState)?.data,
});

const showChangePasswordState = atom({
  key: "showChangePasswdState",
  default: false,
});

const darkModeState = atom({
  key: "darkModeState",
  default: false,
  effects_UNSTABLE: [storeEffect("darkMode"), loggingEffect],
});

const isHafState = atom({
  key: "isHafState",
  default: "true",
});

export const tokenState = selector({
  key: "TokenState",
  get: ({ get }) => {
    return get(authState)?.token;
  },
});

export const expiresState = selector({
  key: "ExpiresState",
  get: ({ get }) => get(authState)?.expires,
});

export const userState = selector({
  key: "UserState",
  get: ({ get }) => get(authState)?.user,
});

export const profileState = selector({
  key: "ProfileState",
  get: ({ get }) => get(authState)?.profile,
});

export function useAuth() {
  const setAuth = useSetRecoilState(authState);
  const setAnnouncements = useSetRecoilState(announcementsState);
  const announcements = useRecoilValue(announcementsData);
  const token = useRecoilValue(tokenState);
  const user = useRecoilValue(userState);
  const profile = useRecoilValue(profileState);
  const expires = useRecoilValue(expiresState);
  const expired = expires && new Date() > new Date(expires);
  const isHaf = useRecoilValue(isHafState);
  const darkMode = useRecoilValue(darkModeState);
  const setDarkMode = useSetRecoilState(darkModeState);
  if (expired) {
    console.debug("auth ->", "token expired at", expires);
    setAuth(null);
    setAnnouncements(null);
    return {};
  }

  function signOut() {
    setAnnouncements(null);
    setAuth(null);
  }

  function switchDarkMode() {
    setDarkMode(!darkMode);
  }

  function switchProfile(p) {
    setAuth((state) => ({ ...state, profile: p }));
  }

  return {
    token,
    user,
    profile,
    switchProfile,
    signOut,
    isHaf,
    announcements,
    darkMode,
    switchDarkMode,
  };
}

export function useChangePasswordStore() {
  const [showChangePasswd, setShowChangePasswd] = useRecoilState(
    showChangePasswordState
  );
  return { showChangePasswd, setShowChangePasswd };
}
