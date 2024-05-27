import { Button } from '@/components/ui/button';
import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';
import { LoginButton } from '@/components/auth/login-button';

const font = Poppins({
  subsets: ['latin'],
  weight: '600',
});

export default function Home() {
  return (
    <main
      className='h-full flex flex-col items-center justify-center
     bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
      from-sky-400 to-sky-800 '
    >
      <div className={cn('space-y-6 text-center')}>
        <h1
          className={cn(
            'text-6xl font-semibold text-white drop-shadow-md',
            font.className,
          )}
        >
          🔐 Auth
        </h1>
        <p className='text-lg text-white'>A Simple Authentication Service</p>
        <div>
          <LoginButton mode='modal' asChild>
            <Button variant={'secondary'} size={'lg'}>
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
