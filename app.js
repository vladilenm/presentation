document.querySelector('.menu').addEventListener('click', animateMenu)
const controller = new ScrollMagic.Controller()
const slides = document.querySelectorAll('.slide')
const header = document.querySelector('.header')

slides.forEach((slide, idx) => {
  const revealImg = slide.querySelector('.slide-img-reveal')
  const img = slide.querySelector('img')
  const revealText = slide.querySelector('.slide-text-reveal')

  const options = { defaults: { duration: 1, ease: 'power2.inOut' } }
  const timeline = gsap.timeline(options)

  timeline.fromTo(revealImg, { x: '0%' }, { x: '100%' })
  timeline.fromTo(img, { scale: 3 }, { scale: 1 }, '-=1')
  timeline.fromTo(revealText, { x: '0%' }, { x: '-100%' }, '-=0.5')
  timeline.fromTo(header, { opacity: 0 }, { opacity: 1 })

  const scene = new ScrollMagic.Scene({
    triggerElement: slide,
    triggerHook: 0.2,
    reverse: false,
  })
    // .addIndicators()
    .setTween(timeline)
    .addTo(controller)

  const pageOptions = { defaults: { duration: 1, ease: 'power1.inOut' } }
  const pageTimeline = gsap.timeline(pageOptions)

  const next = slides.length - 1 === idx ? 'end' : slides[idx + 1]

  pageTimeline.fromTo(next, { y: '0%' }, { y: '50%' })
  pageTimeline.fromTo(
    slide,
    { opacity: 1, scale: 1 },
    { opacity: 0, scale: 0.5 }
  )
  pageTimeline.fromTo(next, { y: '50%' }, { y: '0%' })

  const pageScene = new ScrollMagic.Scene({
    triggerHook: 0,
    duration: '100%',
    triggerElement: slide,
  })
    // .addIndicators({
    //   name: 'page',
    // })
    .setPin(slide, { pushFollowers: false })
    .setTween(pageTimeline)
    .addTo(controller)
})

function animateMenu(event) {
  if (!event.target.classList.contains('active')) {
    event.target.classList.add('active')
    gsap.to('.line1', 0.5, { rotate: '45', y: 5, background: '#000' })
    gsap.to('.line2', 0.5, { rotate: '-45', y: -5, background: '#000' })
    gsap.to('.logo', 1, { color: '#000' })
    gsap.to('.navbar', 1, { clipPath: 'circle(2500px at 100% -10%)' })
    document.body.classList.add('no-scroll')
  } else {
    event.target.classList.remove('active')
    gsap.to('.line1', 0.5, { rotate: 0, y: 0, background: '#fff' })
    gsap.to('.line2', 0.5, { rotate: 0, y: 0, background: '#fff' })
    gsap.to('.logo', 1, { color: '#fff' })
    gsap.to('.navbar', 1, { clipPath: 'circle(50px at 100% -10%)' })
    document.body.classList.remove('no-scroll')
  }
}
