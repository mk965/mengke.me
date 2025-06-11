export function LiquidGlass({ children }: { children: React.ReactNode }) {
  return (
    <>
      <svg style={{ display: 'none' }}>
        <filter
          id="glass-distortion"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.001 0.005"
            numOctaves="1"
            seed="14"
            result="turbulence"
          />

          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>

          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />

          <feSpecularLighting
            in="softMap"
            surfaceScale="5"
            specularConstant="1"
            specularExponent="100"
            lightingColor="white"
            result="specLight"
          >
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>

          <feComposite
            in="specLight"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litImage"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale="200"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div className="flex flex-col items-center justify-center gap-6">
        <div className="relative flex cursor-pointer items-center justify-center gap-2 rounded-full p-2.5 font-semibold shadow-lg shadow-black/20 transition-all duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,2.2)] hover:p-3">
          <div
            className="absolute inset-0 isolate z-0 rounded-full backdrop-blur-[3px]"
            style={{ filter: 'url(#glass-distortion)' }}
          ></div>
          <div className="absolute inset-0 z-10 rounded-full bg-white/25"></div>
          <div className="absolute inset-0 z-20 rounded-full shadow-[inset_2px_2px_1px_0_rgba(255,255,255,0.5),inset_-1px_-1px_1px_1px_rgba(255,255,255,0.5)]"></div>
          <div className="z-30 rounded-full">{children}</div>
        </div>
      </div>
    </>
  )
}
