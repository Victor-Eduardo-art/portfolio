function organizeProjects () {
    const projetos = document.querySelectorAll('.projeto')
    const secao = document.querySelectorAll('.secao')

    for (let i = 0; i < secao.length; i++) {

        secao[i].appendChild(projetos[i])
        secao[i].appendChild(projetos[i + 1])

        console.log(`${i} - ${i + 1}`)
        console.log(secao[i])

    }
}

function getProjects (api_propria) {
    if (api_propria[0] != true) {
        fetch('https://api.github.com/users/Victor-Eduardo-art/repos')
        // E-commerce-product-page
        .then((res) => {
            if (res.status == 200) {
                console.log('API OK')
    
                return res.json()
            } else {
                console.log(`API ERRO, Código do erro: ${res.status}`)
            }
        }).then((res) => {
            const root = document.querySelector('.ctr-projetos')

            res.map((e, i) => {
                if (i < 16) {
                    let descricao = e.description
                    let nome = e.name
                    let screenshot = e.url
                    let url = e.html_url
        
                    screenshot = `https://raw.githubusercontent.com/${screenshot}/master/screenshots/screenshot.png`
                    
                    const projeto = document.createElement('a')
                    const span = document.createElement('span')
                    const ctr_foto = document.createElement('div')
                    const foto = document.createElement('img')
                    
                    projeto.href = url
                    span.innerHTML = descricao   
                    // foto.src = screenshot
                    foto.alt = 'screenshot do projeto'

                    ctr_foto.appendChild(foto)

                    projeto.classList.add('projeto')
                    ctr_foto.classList.add('screenshot')


                    projeto.appendChild(span)
                    projeto.appendChild(ctr_foto)
                    root.appendChild(projeto)
                    
                    if (i%4 == 0) {
                        const ctr_secoes = document.createElement('div')
                        
                        ctr_secoes.classList.add('ctr-secoes')
                        ctr_secoes.id = Math.ceil(i/4 + 1)
                        
                        root.appendChild(ctr_secoes)

                        const secao = document.createElement('div') // seção superior
                        const secao2 = document.createElement('div') // seção inferior

                        secao.classList.add('secao')
                        secao2.classList.add('secao')

                        ctr_secoes.appendChild(secao)
                        ctr_secoes.appendChild(secao2)
                    }

                }
            })

            organizeProjects()
        })
    } else {
        console.log('em criação..')
    }
}

function configBotoes () {
    const botoes = document.querySelectorAll('.ctr-botoes a')

    for (let i = 0; i < botoes.length; i++) {
        botoes[i].addEventListener('click', () => {
            for (let a = 0; a < botoes.length; a++) {
                botoes[a].classList.remove('ativo')
            }

            botoes[i].classList.add('ativo')
        })
    }
}

function iniciar () {
    if (location.href.indexOf('portfolio') != -1)
    getProjects([false])
    configBotoes()

}

window.addEventListener("load", iniciar)