export const subscribe = (eventName: string, listener: EventListener) => {
  try {
    document.addEventListener(eventName, listener);
  } catch (e) {}
};

export const unsubscribe = (eventName: string, listener: EventListener) => {
  try {
    document.removeEventListener(eventName, listener);
  } catch (e) {}
};

export const publish = (eventName: string, data?: any) => {
  try {
    const event = data
      ? new CustomEvent(eventName, { detail: data })
      : new CustomEvent(eventName);

    document.dispatchEvent(event);
  } catch (e) {}
};
