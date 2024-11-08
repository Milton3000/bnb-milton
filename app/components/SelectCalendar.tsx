"use client";

import "react-date-range/dist/styles.css"; 
import "react-date-range/dist/theme/default.css";

import { DateRange, RangeKeyDict } from "react-date-range";
import { useState } from "react";
import { eachDayOfInterval } from "date-fns";

// Define a specific type for the date range selection (prev error)
interface DateRangeSelection {
  startDate: Date;
  endDate: Date;
  key: string;
}

export function SelectCalendar({
  booking,
}: {
  booking:
    | {
        startDate: Date;
        endDate: Date;
      }[]
    | undefined;
}) {
  // Initialize state with a correct type and defined `key`
  const [state, setState] = useState<DateRangeSelection[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  let disabledDates: Date[] = [];
  booking?.forEach((bookingItem) => {
    const dateRange = eachDayOfInterval({
      start: new Date(bookingItem.startDate),
      end: new Date(bookingItem.endDate),
    });

    disabledDates = [...disabledDates, ...dateRange];
  });

  return (
    <>
      <input
        type="hidden"
        name="startDate"
        value={state[0].startDate.toISOString()}
      />
      <input
        type="hidden"
        name="endDate"
        value={state[0].endDate.toISOString()}
      />
      <DateRange
        date={new Date()}
        showDateDisplay={false}
        rangeColors={["#F97316"]}
        ranges={state}
        onChange={(item: RangeKeyDict) =>
          setState([
            {
              startDate: item.selection?.startDate || new Date(),
              endDate: item.selection?.endDate || new Date(),
              key: "selection",
            },
          ])
        }
        minDate={new Date()}
        direction="vertical"
        disabledDates={disabledDates}
      />
    </>
  );
}
