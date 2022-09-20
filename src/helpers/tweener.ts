export default function (callback: (alpha: number) => void, duration = 1000) {
  const start = performance.now()

  const loop = () => {
    let delta = (performance.now() - start) / duration
    if (delta > 1) return
    callback(delta)
    requestAnimationFrame(loop)
  }
  loop()
}
