export const subscribe = (eventName: string, listener: () => any) => {
  try {
    document.addEventListener(eventName, listener);
  } catch (e) {}
};

export const unsubscribe = (eventName: string, listener: () => any) => {
  try {
    document.removeEventListener(eventName, listener);
  } catch (e) {}
};

export const publish = (eventName: string, data?: any) => {
  try {
    const event = new CustomEvent(eventName, { detail: data });

    document.dispatchEvent(event);
  } catch (e) {}
};
