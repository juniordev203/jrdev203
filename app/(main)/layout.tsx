import ScrollProgressCircle from "@/components/ScrollProgressCircle"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ScrollProgressCircle />
      {children}
    </>
  )
}
