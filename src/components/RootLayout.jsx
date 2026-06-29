import { Footer } from '@/components/Footer'
import { GridPattern } from '@/components/GridPattern'
import { RootHeader } from '@/components/RootHeader'

export function RootLayout({ children }) {
  return (
    <>
      <RootHeader />

      <div className="relative flex flex-auto overflow-hidden rounded-t-[2.5rem] bg-white pt-14">
        <div className="relative isolate flex w-full flex-col pt-9">
          <GridPattern
            className="absolute inset-x-0 -top-14 -z-10 h-[1000px] w-full fill-neutral-50 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
            yOffset={-96}
          />

          <main className="w-full flex-auto">{children}</main>

          <Footer />
        </div>
      </div>
    </>
  )
}
