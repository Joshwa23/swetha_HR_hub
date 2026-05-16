import { mockHRProfiles, mockSlots } from '../data/mockData';

export const getStore = (key: string, defaultValue: any) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const setStore = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error: any) {
    console.error("Error saving to localStorage", error);
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      alert("Storage limit exceeded. This usually happens if you upload a very large file.");
    } else {
      alert("Error saving data: " + (error?.message || "Unknown error"));
    }
  }
};

export const initStore = () => {
  if (!localStorage.getItem('hrProfiles')) {
    setStore('hrProfiles', mockHRProfiles);
  }
  if (!localStorage.getItem('slots')) {
    setStore('slots', mockSlots);
  }
  if (!localStorage.getItem('bookings')) {
    setStore('bookings', []);
  }
};

export const getLoggedHR = () => getStore('loggedHR', null);
export const setLoggedHR = (hr: Record<string,any> | null) => setStore('loggedHR', hr);
export const logoutHR = () => localStorage.removeItem('loggedHR');

export const getHRProfiles = () => getStore('hrProfiles', mockHRProfiles);
export const setHRProfiles = (profiles: any) => setStore('hrProfiles', profiles);

export const getSlots = (hrId?: string) => {
  const slots = getStore('slots', mockSlots);
  return hrId ? slots.filter((s: any) => s.hrId === hrId) : slots;
};
export const addSlot = (slot: any) => {
  const slots = getStore('slots', mockSlots);
  slots.push({ ...slot, id: Date.now().toString() });
  setStore('slots', slots);
};
export const updateSlot = (slotId: string, updates: any) => {
  const slots = getStore('slots', mockSlots);
  const index = slots.findIndex((s: any) => s.id === slotId);
  if (index !== -1) {
    slots[index] = { ...slots[index], ...updates };
    setStore('slots', slots);
  }
};

export const getBookings = () => getStore('bookings', []);
export const addBooking = (booking: any) => {
  const bookings = getBookings();
  bookings.push({ ...booking, id: Date.now().toString(), status: 'scheduled' });
  setStore('bookings', bookings);
  return bookings[bookings.length - 1];
};
export const updateBooking = (bookingId: string, updates: any) => {
  const bookings = getBookings();
  const index = bookings.findIndex((b: any) => b.id === bookingId);
  if (index !== -1) {
    bookings[index] = { ...bookings[index], ...updates };
    setStore('bookings', bookings);
  }
};
