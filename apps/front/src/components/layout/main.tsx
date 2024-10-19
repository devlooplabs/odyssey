interface MainProps {
  children: React.ReactNode;
}

export function Main({ children }: MainProps) {
  return (
    <main className="flex-1">
      <div className="flex-1 items-start">
        {children}
      </div>
    </main>
  );
}
