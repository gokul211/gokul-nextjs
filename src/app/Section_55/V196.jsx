'use client';

import Image from 'next/image';

function V196() {
  return (
    <section className="overflow-x-clip bg-purple-50 pt-5 lg:pt-10 md:pt-5">
      <div className="container mx-auto h-full max-w-[calc(var(--spacing)*480)] px-6 pt-14 pb-32 lg:px-16 lg:!max-w-none">
        {/* Top Heading */}
        <div className="mb-14 flex flex-col items-center">
          <p
            className="mb-6 text-center text-2xl leading-tight tracking-wide uppercase"
            style={{
              fontFamily: 'var(--font-roundo)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-blackish)',
            }}
          >
            SHOP THE LATEST SWEETS
          </p>

          <h2
            className="text-center text-4xl md:text-5xl leading-snug tracking-wide uppercase mb-6"
            style={{
              fontFamily: 'var(--font-akina)',
              color: 'var(--color-blackish)',
            }}
          >
            Discover the 4 hidden realms of our Candy Kingdom
          </h2>

          <p
            className="text-center text-lg md:text-xl leading-relaxed max-w-xl"
            style={{
              fontFamily: 'var(--font-roundo)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-blackish)',
            }}
          >
            Welcome to a kingdom of taste, where every realm tells its own story.
            Sugar Rush sparkles with playful sweetness, Sour Power zings with bold
            mischief, Cocoa Bliss glows with chocolatey warmth, and Licorizz
            whispers cool, smoky secrets. Together, they create a world where
            flavor becomes adventure.
          </p>

          {/* Circle button */}
          <a
            target="_top"
            href="/collections"
            className="relative mt-10 aspect-square w-40 md:w-56"
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
                className="absolute top-1/2 left-1/2 aspect-square w-2/3 -translate-x-1/2 -translate-y-1/2 object-contain transition-transform duration-300 hover:scale-110 hover:rotate-[-12deg]"
                src="https://bombon.rs/images/home/certified.svg"
              />
            </div>
          </a>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 gap-y-14 md:grid-cols-2 md:gap-x-6 md:gap-y-20">
          {/* Sugar Rush */}
          <CollectionCard
            title="Sugar Rush"
            description="The pink heart of the kingdom ruled by sparkle, charm, and a dash of royal mischief."
            bgColor="bg-pink-50"
            bgPattern="https://bombon.rs/images/home/collections/sugar-rush/pattern.svg"
            stamp="https://bombon.rs/images/home/collections/sugar-rush/stamp.svg"
            candies={[
              'candy1.png',
              'candy2.png',
              'candy3.png',
              'candy4.png',
              'candy4.png',
            ]}
            link="/shop/sugar-rush"
          />

          {/* Sour Power */}
          <CollectionCard
            title="Sour Power"
            description="A wild green land where clever minds and sour tongues play by their own rules."
            bgColor="bg-sour-100"
            bgPattern="https://bombon.rs/images/home/collections/sour-power/pattern.svg"
            stamp="https://bombon.rs/images/home/collections/sour-power/stamp.svg"
            candies={[
              'candy1.png',
              'candy2.png',
              'candy3.png',
              'candy4.png',
              'candy5.png',
            ]}
            link="/shop/sour-power"
          />

          {/* Cocoa Bliss */}
          <CollectionCard
            title="Cocoa Bliss"
            description="The sun-drenched southern realm: warm, joyful, and steeped in chocolatey delight."
            bgColor="bg-chocolate-100"
            bgPattern="https://bombon.rs/images/home/collections/cocoa-bliss/pattern.svg"
            stamp="https://bombon.rs/images/home/collections/cocoa-bliss/stamp.svg"
            candies={[
              'candy5.png',
              'candy4.png',
              'candy3.png',
              'candy2.png',
              'candy1.png',
            ]}
            link="/shop/cocoa-bliss"
          />

          {/* Licorizz */}
          <CollectionCard
            title="Licorizz"
            description="Elegant and enigmatic, Licorizz is the smoky-black capital of cool – where flavor speaks in whispers."
            bgColor="bg-liquorice-400"
            bgPattern="https://bombon.rs/images/home/collections/licorizz/pattern.svg"
            stamp="https://bombon.rs/images/home/collections/licorizz/stamp.svg"
            candies={[
              'candy1.png',
              'candy2.png',
              'candy3.png',
              'candy4.png',
              'candy1.png',
            ]}
            link="/shop/licorizz"
          />
        </div>
      </div>
    </section>
  );
}

export default V196;

// --- Reusable CollectionCard Component ---
function CollectionCard({ title, description, bgColor, bgPattern, stamp, candies, link }) {
  return (
    <a
      target="_top"
      href={link}
      className="group relative z-0 space-y-8 hover:z-10 flex flex-col items-center"
    >
      <div className="relative w-full">
        <div
          className={`relative flex items-center justify-center overflow-hidden rounded-3xl px-10 py-14 ${bgColor}`}
          style={{
            backgroundImage: `url(${bgPattern})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Image
            alt={`${title} stamp`}
            width={600}
            height={260}
            decoding="async"
            className="relative z-10 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-4"
            src={stamp}
          />
        </div>

        <div className="absolute top-1/2 left-1/2 h-[130%] w-[120%] -translate-x-1/2 -translate-y-1/2 scale-0 transition-transform duration-500 group-hover:scale-100">
          {candies.map((candy, index) => (
            <Image
              key={index}
              alt={`${title} candy${index + 1}`}
              width={240}
              height={240}
              className={`absolute max-w-[12rem] transition-transform duration-500 ${
                index === 0
                  ? 'bottom-0 left-0 rotate-45 group-hover:rotate-0'
                  : index === 1
                  ? 'top-0 left-0 rotate-90 group-hover:rotate-0'
                  : index === 2
                  ? '-top-16 left-1/2 -translate-x-1/2 group-hover:translate-y-0'
                  : index === 3
                  ? 'top-0 right-0 -rotate-90 group-hover:rotate-0'
                  : 'right-0 bottom-0 -rotate-45 group-hover:rotate-0'
              }`}
              src={`https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2F${title
                .toLowerCase()
                .replace(' ', '-')}%2F${candy}&w=640&q=75`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4 px-6 text-center">
        <h3 className="heading-4 font-bold uppercase">{title}</h3>
        <p className="min-h-16 text-lg leading-relaxed">{description}</p>
      </div>

      <button className="button mx-auto inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-4 border-lime bg-lime px-8 py-3 transition-all hover:border-light-lime hover:bg-light-lime">
        Shop now
      </button>
    </a>
  );
}
