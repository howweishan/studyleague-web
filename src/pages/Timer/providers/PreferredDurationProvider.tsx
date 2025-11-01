import { createContext, useState, useContext, useEffect } from "react";
import { TIMER_DURATIONS } from '../constants/timer'

interface PreferredDurations {
  pomodoro: number
  shortBreak: number
  longBreak: number
}

interface PreferredDurationsContextType {
  durations: PreferredDurations
  setDurations: React.Dispatch<React.SetStateAction<PreferredDurations>>
}

const PreferredDurationContext = createContext<PreferredDurationsContextType | null>(null);

function PreferredDurationProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [durations, _setDurations] = useState<PreferredDurations>({
    pomodoro: TIMER_DURATIONS.POMODORO,
    shortBreak: TIMER_DURATIONS.SHORT_BREAK,
    longBreak: TIMER_DURATIONS.LONG_BREAK
  })

  useEffect(() => {
    const storedDurations = localStorage.getItem('preferredDurations');

    if (storedDurations) {
      _setDurations(JSON.parse(storedDurations));
    }
  }, [])

  return (
    <PreferredDurationContext value={{
      durations,
      setDurations: (newDurations) => {
        _setDurations(newDurations);

        localStorage.setItem('preferredDurations', JSON.stringify(
          typeof newDurations === 'function' ? newDurations(durations) : newDurations
        ));
      }
    }}>
      {children}
    </PreferredDurationContext>
  )
}

export function usePreferredDurations() {
  const context = useContext(PreferredDurationContext);

  if (!context) {
    throw new Error("usePreferredDurations must be used within a PreferredDurationProvider");
  }

  return context;
}

export default PreferredDurationProvider