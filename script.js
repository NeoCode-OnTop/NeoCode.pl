window.addEventListener("load", async ()=>{

  gsap.to("#intro", {
    opacity: 0,
    delay: 2,
    duration: 1,
    onComplete: ()=> document.getElementById("intro").style.display="none"
  })

  tsParticles.load("particles", {
    particles: {
      number: { value: 80 },
      size: { value: 2 },
      move: { enable: true, speed: 1 },
      links: { enable: true, color: "#6a00ff" }
    }
  })

  loadLegits()
  loadOpinie()
})

document.getElementById("themeToggle").onclick = ()=>{
  document.body.classList.toggle("light")
}

async function loadLegits(){
  const res = await fetch("http://localhost:3000/api/legits")
  const data = await res.json()

  const slider = document.querySelector(".slider")
  slider.innerHTML = ""

  data.forEach(l=>{
    slider.innerHTML += `
      <div class="slide">
        <img src="${l.avatar}" style="width:50px;border-radius:50%">
        <h4>${l.user}</h4>
        <p>${l.produkt}</p>
      </div>
    `
  })
}

async function loadOpinie(){
  const res = await fetch("http://localhost:3000/api/opinie")
  const data = await res.json()

  const container = document.querySelector(".opinions")

  container.innerHTML = `
    <h3>Średnia ocena: ⭐ ${data.average} (${data.count} opinii)</h3>
  `

  data.opinions.forEach(o=>{
    container.innerHTML += `
      <div class="opinion-card">
        <img src="${o.avatar}" style="width:40px;border-radius:50%">
        <strong>${o.user}</strong>
        <p>${"⭐".repeat(o.stars)}</p>
        <p>${o.content}</p>
      </div>
    `
  })
}