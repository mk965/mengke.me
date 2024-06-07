import React from 'react'
import Typed from 'typed.js'
import { Twemoji } from '../Twemoji'

export function TypedBios() {
  let el = React.useRef(null)
  let typed = React.useRef(null)

  React.useEffect(() => {
    typed.current = new Typed(el.current, {
      stringsElement: '#bios',
      typeSpeed: 40,
      backSpeed: 10,
      loop: true,
      backDelay: 1000,
    })
    return () => typed.current.destroy()
  }, [])

  return (
    <div>
      <ul id="bios" className="hidden">
        <li>
          Born and Lives in <b className="font-medium">Guilin, China</b>.
        </li>
        <li>
          A crazy fun of <b>The Blue May</b>.
        </li>
        <li>
          The first programming language I learned was <b className="font-medium">PHP</b> !
        </li>
        <li>C# will be my next great langueage.</li>
        <li>A lazy-person in some moments.</li>
        <li>
          Detests repeated work and advocates for <b>automation</b>.
        </li>
      </ul>
      <span ref={el} className="text-neutral-900 dark:text-neutral-200" />
    </div>
  )
}
