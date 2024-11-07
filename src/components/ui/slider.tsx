"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, min = 0, max = 144, step = 1, ...props }, ref) => {
  const majorInterval = 6; // Larger notches every 6 steps
  const notchCount = (max - min) / step;

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      min={min}
      max={max}
      step={step}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary dark:bg-blue-500" />
        <div className="absolute inset-0 flex justify-between">
          {Array.from({ length: notchCount + 1 }).map((_, index) => {
            // Only render major notches
            if (index % (majorInterval / step) === 0) {
              return (
                <div
                  key={index}
                  className="bg-black h-full w-[2px] dark:bg-blue-500"
                  style={{
                    left: `${(index / notchCount) * 100}%`,
                  }}
                />
              );
            }
            return null;
          })}
        </div>
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-0 border-2 border-primary bg-background transition-colors disabled:pointer-events-none disabled:opacity-50 dark:border-blue-500" />
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
