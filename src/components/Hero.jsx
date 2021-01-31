import React from 'react'
import lightHeroMobile from '../images/bg-mobile-light.jpg'
import lightHeroDesktop from '../images/bg-desktop-light.jpg'
import darkHeroMobile from '../images/bg-mobile-dark.jpg'
import darkHeroDesktop from '../images/bg-desktop-dark.jpg'

import "../scss/components/hero.scss"

function Hero({ theme, toggleTheme }) {
  return (
    <div className="hero">
      {
        theme ?
          <picture>
            <source media="(max-width:600px)" srcSet={lightHeroMobile} />
            <source media="(min-width:601px)" srcSet={lightHeroDesktop} />
            <img src={lightHeroDesktop} alt="Hero" />
          </picture> :
          <picture>
            <source media="(max-width:600px)" srcSet={darkHeroMobile} />
            <source media="(min-width:601px)" srcSet={darkHeroDesktop} />
            <img src={darkHeroDesktop} alt="Hero" />
          </picture>
      }
    </div>
  )
}

export default Hero
