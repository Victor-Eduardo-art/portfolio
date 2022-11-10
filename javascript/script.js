function configMenu () {
    const btn_menu = document.querySelector('.btn-menu')
    const icone_btn = document.querySelector('.btn-menu .icone')
    const menu = document.querySelector('header nav')
    const fundo = document.createElement('div')
    const body = document.querySelector('body')
    
    body.appendChild(fundo)

    btn_menu.addEventListener('click', () => {
        icone_btn.classList.toggle('on')
        icone_btn.classList.toggle('off')
        menu.classList.toggle('menu_mobile')
        fundo.classList.toggle('fundo_blur')
        body.classList.toggle('fixo')

    })
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
                    let screenshot = null
                    let url = e.html_url
        
                    screenshot = `https://raw.githubusercontent.com/Victor-Eduardo-art/${nome}/master/screenshots/screenshot.png`
                    
                    const projeto = document.createElement('a')
                    const span = document.createElement('span')
                    const ctr_foto = document.createElement('div')
                    const foto = document.createElement('img')
                    
                    projeto.href = url
                    span.innerHTML = descricao   
                    foto.src = screenshot
                    foto.alt = 'screenshot do projeto'

                    ctr_foto.appendChild(foto)

                    projeto.classList.add('projeto')
                    ctr_foto.classList.add('screenshot')
                    projeto.id = `projeto-${i}`


                    projeto.appendChild(span)
                    projeto.appendChild(ctr_foto)
                    root.appendChild(projeto)
                }
            })
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
    configMenu()

    if (location.href.indexOf('portfolio') != -1) {
        getProjects([false])
        configBotoes()
    }

}

window.addEventListener("load", iniciar)