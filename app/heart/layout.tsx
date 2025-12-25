/**
 * HEART PAGE ISOLATED LAYOUT
 * Full-screen immersive experience
 */

export default function HeartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen overflow-hidden">
      {children}
    </div>
  );
}

