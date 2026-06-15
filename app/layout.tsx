export const metadata = {
  title: "SLOWCUTS",
  description: "The cut that earns the wait.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
