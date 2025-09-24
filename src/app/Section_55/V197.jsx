'use client';

import Image from 'next/image';

function V197() {
  return (
    <section className="overflow-x-clip bg-purple-50 pt-5 lg:pt-10 md:pt-5">
      <div className="container mx-auto h-full max-w-[calc(var(--spacing)*480)] px-30 pt-24 pb-32 lg:px-16 lg:!max-w-none md:pt-14"> 
 <div className="mb-20 flex flex-col items-start max-md:mb-14 max-md:items-center max-sm:mb-10">
      {/* Top small heading */}
      <p
        className="mb-[1.875rem] max-md:text-center text-[1.875rem] leading-[1.1] tracking-[0.04em] uppercase"
        style={{ fontFamily: 'var(--font-roundo)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-blackish)' }}
      >
        SHOP THE LATEST SWEETS
      </p>

      {/* Text + Circle Row */}
      <div className="flex flex-row items-center justify-between gap-4 max-md:justify-start">
        {/* Left side text */}
        <div className="flex w-2/3 flex-col gap-8 max-md:w-full max-md:gap-2">
          <h2
            className="text-left max-md:w-full max-md:text-center text-[5rem] leading-[1.1] tracking-[0.04em] uppercase"
            style={{ fontFamily: 'var(--font-akina)', color: 'var(--color-blackish)' }}
          >
            Discover the 4 hidden realms of our Candy Kingdom
          </h2>

          <p
            className="text-left max-md:mt-8 max-md:text-center text-[1.5rem] leading-[1.4]"
            style={{ fontFamily: 'var(--font-roundo)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-blackish)' }}
          >
            Welcome to a kingdom of taste, where every realm tells its own story.
            Sugar Rush sparkles with playful sweetness, Sour Power zings with bold
            mischief, Cocoa Bliss glows with chocolatey warmth, and Licorizz
            whispers cool, smoky secrets. Together, they create a world where
            flavor becomes adventure.
          </p>
        </div>

        {/* Right side circle */}
        <a
          target="_top"
          className="relative aspect-square min-w-[14rem] max-md:hidden"
          href="/collections"
        >
          <div className="relative h-full w-full">
            <Image
              alt="Button"
              loading="lazy"
              width={290}
              height={290}
              decoding="async"
              style={{ animationDuration: '6s' }}
              className="animate-spin"
              src="https://bombon.rs/images/home/hero/stiker.svg"
            />
            <Image
              alt="Certified candy classics"
              loading="lazy"
              width={120}
              height={120}
              decoding="async"
              className="absolute top-1/2 left-1/2 aspect-square w-5/7 -translate-x-1/2 -translate-y-1/2 object-contain transition-transform duration-300 hover:scale-120 hover:rotate-[-12deg]"
              src="https://bombon.rs/images/home/certified.svg"
            />
          </div>
        </a>
      </div>
    </div>
        {/* --- end updated div --- */}

        <div className="grid grid-cols-2 gap-x-6 gap-y-20 max-md:grid-cols-1 max-md:gap-y-10">
          {/* Sugar Rush */}
          <a
            target="_top"
            className="group relative z-0 space-y-8 hover:z-10 md:flex md:flex-col md:justify-center sm:space-y-6"
            href="/shop/sugar-rush"
          >
            <div className="relative">
              <div className="relative flex items-center justify-center overflow-hidden rounded-3xl bg-pink-50 px-16 py-15 sm:px-10 sm:py-20" style={{ backgroundImage: 'url(https://bombon.rs/images/home/collections/sugar-rush/pattern.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <Image
                  alt="Sugar Rush stamp"
                  width={600}
                  height={260}
                  decoding="async"
                  className="relative z-10 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-4"
                  src="https://bombon.rs/images/home/collections/sugar-rush/stamp.svg"
                />
              </div>

              <div className="absolute top-1/2 left-1/2 h-[130%] w-[120%] -translate-x-1/2 -translate-y-1/2 scale-0 transition-transform duration-500 group-hover:scale-100 md:h-[110%] md:w-[110%]">
                <Image
                  alt="candy1"
                  width={240}
                  height={240}
                  className="absolute bottom-0 left-0 max-w-[15rem] rotate-45 transition-transform duration-500 group-hover:rotate-0 lg:max-w-48 md:!max-w-[10rem]"
                  src="https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Fsugar-rush%2Fcandy1.png&w=640&q=75"
                />
                <Image
                  alt="candy2"
                  width={240}
                  height={240}
                  className="absolute top-0 left-0 max-w-[15rem] rotate-90 transition-transform duration-500 group-hover:rotate-0 lg:max-w-48 md:!max-w-[10rem]"
                  src="https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Fsugar-rush%2Fcandy2.png&w=640&q=75"
                />
                <Image
                  alt="candy3"
                  width={240}
                  height={240}
                  className="absolute -top-16 left-1/2 max-w-[15rem] -translate-x-1/2 transition-transform duration-500 group-hover:translate-y-0 lg:max-w-48 md:!max-w-[10rem]"
                  src="https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Fsugar-rush%2Fcandy3.png&w=640&q=75"
                />
                <Image
                  alt="candy4"
                  width={240}
                  height={240}
                  className="absolute top-0 right-0 max-w-[15rem] -rotate-90 transition-transform duration-500 group-hover:rotate-0 lg:max-w-48 md:!max-w-[10rem]"
                  src="https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Fsugar-rush%2Fcandy4.png&w=640&q=75"
                />
                <Image
                  alt="candy5"
                  width={240}
                  height={240}
                  className="absolute right-0 bottom-0 max-w-[15rem] -rotate-45 transition-transform duration-500 group-hover:rotate-0 lg:max-w-48 md:!max-w-[10rem]"
                  src="https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Fsugar-rush%2Fcandy4.png&w=640&q=75"
                />
              </div>
            </div>

            <div className="space-y-4 px-6 md:flex md:flex-col md:items-center md:justify-center sm:px-4">
              <h3 className="heading-4 font-bold uppercase md:text-center" style={{ color: 'var(--color-blackish)' }}>Sugar Rush</h3>
              <p
                className="min-h-16 line-clamp-3 md:text-center text-[1.5rem] leading-[1.4]"
                style={{ fontFamily: 'var(--font-roundo)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-blackish)' }}
              >
                The pink heart of the kingdom ruled by sparkle, charm, and a dash of royal mischief.
              </p>
            </div>

            <button
              data-slot="button"
              className="button mx-6 inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border-4 border-lime bg-lime px-8 py-3 outline-none transition-all hover:border-light-lime hover:bg-light-lime active:border-lime disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none md:mx-auto md:max-w-fit md:px-10"
            >
              Shop now
            </button>
          </a>

          {/* Sour Power */}
          <a
            target="_top"
            className="group relative z-0 space-y-8 hover:z-10 md:flex md:flex-col md:justify-center sm:space-y-6"
            href="/shop/sour-power"
          >
            <div className="relative">
              <div className="relative flex items-center justify-center overflow-hidden rounded-3xl bg-sour-100 px-16 py-15 sm:px-10 sm:py-20" style={{ backgroundImage: 'url(https://bombon.rs/images/home/collections/sour-power/pattern.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>

                <Image
                  alt="Sour Power stamp"
                  width={600}
                  height={260}
                  decoding="async"
                  className="relative z-10 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-4"
                  src="https://bombon.rs/images/home/collections/sour-power/stamp.svg"
                />
              </div>

              <div className="absolute top-1/2 left-1/2 h-[130%] w-[120%] -translate-x-1/2 -translate-y-1/2 scale-0 transition-transform duration-500 group-hover:scale-100 md:h-[110%] md:w-[110%]">
                <Image
                  alt="sour candy1"
                  width={240}
                  height={240}
                  className="absolute bottom-0 left-0 max-w-[15rem] rotate-45 transition-transform duration-500 group-hover:rotate-0 lg:max-w-48 md:!max-w-[10rem]"
                  src="https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Fsour-power%2Fcandy1.png&w=640&q=75"
                />
                <Image
                  alt="sour candy2"
                  width={240}
                  height={240}
                  className="absolute top-0 left-0 max-w-[15rem] rotate-90 transition-transform duration-500 group-hover:rotate-0 lg:max-w-48 md:!max-w-[10rem]"
                  src="https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Fsour-power%2Fcandy2.png&w=640&q=75"
                />
                <Image
                  alt="sour candy3"
                  width={240}
                  height={240}
                  className="absolute -top-16 left-1/2 max-w-[15rem] -translate-x-1/2 transition-transform duration-500 group-hover:translate-y-0 lg:max-w-48 md:!max-w-[10rem]"
                  src="https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Fsour-power%2Fcandy3.png&w=640&q=75"
                />
                <Image
                  alt="sour candy4"
                  width={240}
                  height={240}
                  className="absolute top-0 right-0 max-w-[15rem] -rotate-90 transition-transform duration-500 group-hover:rotate-0 lg:max-w-48 md:!max-w-[10rem]"
                  src="https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Fsour-power%2Fcandy4.png&w=640&q=75"
                />
                <Image
                  alt="sour candy5"
                  width={240}
                  height={240}
                  className="absolute right-0 bottom-0 max-w-[15rem] -rotate-45 transition-transform duration-500 group-hover:rotate-0 lg:max-w-48 md:!max-w-[10rem]"
                  src="https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Fsour-power%2Fcandy5.png&w=640&q=75"
                />
              </div>
            </div>

            <div className="space-y-4 px-6 md:flex md:flex-col md:items-center md:justify-center sm:px-4">
              <h3 className="heading-4 font-bold uppercase md:text-center" style={{ color: 'var(--color-blackish)' }}>Sour Power</h3>
              <p
                className="min-h-16 line-clamp-3 md:text-center text-[1.5rem] leading-[1.4]"
                style={{ fontFamily: 'var(--font-roundo)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-blackish)' }}
              >
                A wild green land where clever minds and sour tongues play by their own rules.
              </p>
            </div>

            <button
              data-slot="button"
              className="button mx-6 inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border-4 border-lime bg-lime px-8 py-3 outline-none transition-all hover:border-light-lime hover:bg-light-lime active:border-lime disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none md:mx-auto md:max-w-fit md:px-10"
            >
              Shop now
            </button>
          </a>

          {/* Cocoa Bliss */}
          <a
            target="_top"
            className="group relative z-0 space-y-8 hover:z-10 md:flex md:flex-col md:justify-center sm:space-y-6"
            href="/shop/cocoa-bliss"
          >
            <div className="relative">
              <div className="relative flex items-center justify-center overflow-hidden rounded-3xl bg-chocolate-100 px-16 py-15 sm:px-10 sm:py-20" style={{ backgroundImage: 'url(https://bombon.rs/images/home/collections/cocoa-bliss/pattern.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>

                <Image
                  alt="Cocoa Bliss stamp"
                  width={600}
                  height={260}
                  decoding="async"
                  className="relative z-10 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-4"
                  src="https://bombon.rs/images/home/collections/cocoa-bliss/stamp.svg"
                />
              </div>

              <div className="absolute top-1/2 left-1/2 h-[130%] w-[120%] -translate-x-1/2 -translate-y-1/2 scale-0 transition-transform duration-500 group-hover:scale-100 md:h-[110%] md:w-[110%]">
                <Image
                  alt="cocoa candy5"
                  width={240}
                  height={240}
                  className="absolute bottom-0 left-0 max-w-[15rem] rotate-45 transition-transform duration-500 group-hover:rotate-0 lg:max-w-48 md:!max-w-[10rem]"
                  src="https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Fcocoa-bliss%2Fcandy5.png&w=640&q=75"
                />
                <Image
                  alt="cocoa candy4"
                  width={240}
                  height={240}
                  className="absolute top-0 left-0 max-w-[15rem] rotate-90 transition-transform duration-500 group-hover:rotate-0 lg:max-w-48 md:!max-w-[10rem]"
                  src="https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Fcocoa-bliss%2Fcandy4.png&w=640&q=75"
                />
                <Image
                  alt="cocoa candy3"
                  width={240}
                  height={240}
                  className="absolute -top-16 left-1/2 max-w-[15rem] -translate-x-1/2 transition-transform duration-500 group-hover:translate-y-0 lg:max-w-48 md:!max-w-[10rem]"
                  src="https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Fcocoa-bliss%2Fcandy3.png&w=640&q=75"
                />
                <Image
                  alt="cocoa candy2"
                  width={240}
                  height={240}
                  className="absolute top-0 right-0 max-w-[15rem] -rotate-90 transition-transform duration-500 group-hover:rotate-0 lg:max-w-48 md:!max-w-[10rem]"
                  src="https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Fcocoa-bliss%2Fcandy2.png&w=640&q=75"
                />
                <Image
                  alt="cocoa candy1"
                  width={240}
                  height={240}
                  className="absolute right-0 bottom-0 max-w-[15rem] -rotate-45 transition-transform duration-500 group-hover:rotate-0 lg:max-w-48 md:!max-w-[10rem]"
                  src="https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Fcocoa-bliss%2Fcandy1.png&w=640&q=75"
                />
              </div>
            </div>

            <div className="space-y-4 px-6 md:flex md:flex-col md:items-center md:justify-center sm:px-4">
              <h3 className="heading-4 font-bold uppercase md:text-center" style={{ color: 'var(--color-blackish)' }}>Cocoa Bliss</h3>
              <p
                className="min-h-16 line-clamp-3 md:text-center text-[1.5rem] leading-[1.4]"
                style={{ fontFamily: 'var(--font-roundo)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-blackish)' }}
              >
                The sun-drenched southern realm: warm, joyful, and steeped in chocolatey delight.
              </p>
            </div>

            <button
              data-slot="button"
              className="button mx-6 inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border-4 border-lime bg-lime px-8 py-3 outline-none transition-all hover:border-light-lime hover:bg-light-lime active:border-lime disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none md:mx-auto md:max-w-fit md:px-10"
            >
              Shop now
            </button>
          </a>

          {/* Licorizz */}
          <a
            target="_top"
            className="group relative z-0 space-y-8 hover:z-10 md:flex md:flex-col md:justify-center sm:space-y-6"
            href="/shop/licorizz"
          >
            <div className="relative">
              <div className="relative flex items-center justify-center overflow-hidden rounded-3xl bg-liquorice-400 px-16 py-15 sm:px-10 sm:py-20" style={{ backgroundImage: 'url(https://bombon.rs/images/home/collections/licorizz/pattern.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>

                <Image
                  alt="Licorizz stamp"
                  width={600}
                  height={260}
                  decoding="async"
                  className="relative z-10 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-4"
                  src="https://bombon.rs/images/home/collections/licorizz/stamp.svg"
                />
              </div>

              <div className="absolute top-1/2 left-1/2 h-[130%] w-[120%] -translate-x-1/2 -translate-y-1/2 scale-0 transition-transform duration-500 group-hover:scale-100 md:h-[110%] md:w-[110%]">
                <Image
                  alt="lic candy1"
                  width={240}
                  height={240}
                  className="absolute bottom-0 left-0 max-w-[15rem] rotate-45 transition-transform duration-500 group-hover:rotate-0 lg:max-w-48 md:!max-w-[10rem]"
                  src="https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Flicorizz%2Fcandy1.png&w=640&q=75"
                />
                <Image
                  alt="lic candy2"
                  width={240}
                  height={240}
                  className="absolute top-0 left-0 max-w-[15rem] rotate-90 transition-transform duration-500 group-hover:rotate-0 lg:max-w-48 md:!max-w-[10rem]"
                  src="https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Flicorizz%2Fcandy2.png&w=640&q=75"
                />
                <Image
                  alt="lic candy3"
                  width={240}
                  height={240}
                  className="absolute -top-16 left-1/2 max-w-[15rem] -translate-x-1/2 transition-transform duration-500 group-hover:translate-y-0 lg:max-w-48 md:!max-w-[10rem]"
                  src="https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Flicorizz%2Fcandy3.png&w=640&q=75"
                />
                <Image
                  alt="lic candy4"
                  width={240}
                  height={240}
                  className="absolute top-0 right-0 max-w-[15rem] -rotate-90 transition-transform duration-500 group-hover:rotate-0 lg:max-w-48 md:!max-w-[10rem]"
                  src="https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Flicorizz%2Fcandy4.png&w=640&q=75"
                />
                <Image
                  alt="lic candy5"
                  width={240}
                  height={240}
                  className="absolute right-0 bottom-0 max-w-[15rem] -rotate-45 transition-transform duration-500 group-hover:rotate-0 lg:max-w-48 md:!max-w-[10rem]"
                  src="https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Flicorizz%2Fcandy1.png&w=640&q=75"
                />
              </div>
            </div>

            <div className="space-y-4 px-6 md:flex md:flex-col md:items-center md:justify-center sm:px-4">
              <h3 className="heading-4 font-bold uppercase md:text-center" style={{ color: 'var(--color-blackish)' }}>Licorizz</h3>
              <p
                className="min-h-16 line-clamp-3 md:text-center text-[1.5rem] leading-[1.4]"
                style={{ fontFamily: 'var(--font-roundo)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-blackish)' }}
              >
                Elegant and enigmatic, Licorizz is the smoky-black capital of cool – where flavor speaks in whispers.
              </p>
            </div>

            <button
              data-slot="button"
              className="button mx-6 inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border-4 border-lime bg-lime px-8 py-3 outline-none transition-all hover:border-light-lime hover:bg-light-lime active:border-lime disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none md:mx-auto md:max-w-fit md:px-10"
            >
              Shop now
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default V197;