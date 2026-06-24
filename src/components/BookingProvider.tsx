"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface BookingContextType {
  isBookingOpen: boolean;
  setBookingOpen: (open: boolean) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isBookingOpen, setBookingOpen] = useState(false);

  return (
    <BookingContext.Provider value={{ isBookingOpen, setBookingOpen }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
