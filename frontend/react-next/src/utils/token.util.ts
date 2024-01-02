"use client";

export const getToken = () => {
  try {
    return localStorage.getItem("token");
  } catch (e) {
    return null;
  }
};

export const storeToken = (value: string) => {
  try {
    localStorage.setItem("token", value);
  } catch (e) {}
};

export const deleteToken = () => {
  try {
    localStorage.removeItem("token");
  } catch (e) {}
};
