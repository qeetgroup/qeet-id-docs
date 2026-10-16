"use client";

import { useSyncExternalStore } from "react";
import { defaultSdk, isSdkId, type SdkId, sdkStorageKey } from "@/lib/sdks";

/**
 * The reader's SDK lives on `<html data-sdk>`. The inline script in the root layout sets it before
 * the first paint (sdk-script.ts), so the styles that show the chosen SDK's code (sdk-styles.tsx)
 * apply without a flash; this store reads and changes the same attribute, so React and CSS never
 * disagree.
 */
const event = "qeet-id:sdk";

function read(): SdkId {
  const value = document.documentElement.dataset.sdk;
  return isSdkId(value) ? value : defaultSdk;
}

function subscribe(onChange: () => void) {
  window.addEventListener(event, onChange);
  // Another tab changed the choice.
  const onStorage = (e: StorageEvent) => {
    if (e.key === sdkStorageKey && isSdkId(e.newValue)) setSdk(e.newValue);
  };
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(event, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

/** Choose an SDK for every page, and remember it. */
export function setSdk(id: SdkId) {
  const root = document.documentElement;
  if (root.dataset.sdk === id) return;
  root.dataset.sdk = id;
  try {
    localStorage.setItem(sdkStorageKey, id);
  } catch {
    // Storage can be unavailable (private mode); the choice still holds for this page.
  }
  window.dispatchEvent(new Event(event));
}

/**
 * The chosen SDK. The server and the hydrating client both render the default, so markup never
 * mismatches; the real choice follows straight after hydration — and the styles have shown it all
 * along.
 */
export function useSdk(): SdkId {
  return useSyncExternalStore(subscribe, read, () => defaultSdk);
}
