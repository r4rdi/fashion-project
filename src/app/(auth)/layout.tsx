import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="absolute top-4 left-4 md:top-8 md:left-8">
        <Link href="/" className="text-xl font-bold uppercase tracking-wider">
          Lumina
        </Link>
      </div>
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-background p-8 shadow-sm">
        {children}
      </div>
    </div>
  );
}
