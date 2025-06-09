'use client'
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'  
import { motion } from 'framer-motion'

const buttonVariants = cva(
  'rounded-[20px] gap-2 inline-flex items-center justify-center whitespace-nowrap rounded-[12px] text-sm ring-offset-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-[#000000] text-white transition ease-in-out delay-150',
        destructive: 'bg-destructive text-destructive-foreground',
        outline:
          'border-2 border-[#2E3881] bg-[#F0F8FF] text-[#2E3881] font-bold duration-300 transition ease-in-out delay-150',
        secondary: 'bg-secondary text-secondary-foreground',
        ghost: '',
        link: 'text-primary underline-offset-4',
      },
      size: {
        default: 'h-12 px-8',
        sm: 'h-9 rounded-md px-6',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isAnimated?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, isAnimated = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    if (isAnimated) {
      return (
        <motion.div
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.9 }}
        >
          <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
          />
        </motion.div>
      )
    } else {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      )
    }
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
