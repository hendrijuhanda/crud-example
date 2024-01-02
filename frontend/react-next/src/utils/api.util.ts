"use client";

import axios from "axios";
import { getToken } from "./token.util";

const token = getToken();

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token ? `Bearer ${token}` : undefined,
  },
});
