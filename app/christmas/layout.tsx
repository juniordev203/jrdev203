/**
 * CHRISTMAS PAGE ISOLATED LAYOUT
 * This layout purposely excludes the global Navigation/Header/Footer
 * to create a full-screen, immersive standalone experience.
 */

export default function ChristmasLayout({
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

