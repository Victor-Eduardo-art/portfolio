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

function getProjects () {
    fetch('https://api-dos-projetos-github.victor-eduardo.repl.co')
    .then((res) => {
        return res.json()
    }).then((res) => {
        for (let i = 0; i < res.length; i++) {
            fetch(res[i])
            .then((repo) => {
                if (repo.status == 200) {            
                    return repo.json()
                } else {
                    console.log(`API ERRO, Código do erro: ${repo.status}`)
                }
            }).then((repo) => {
                const projetos = document.querySelectorAll('.projeto')
                const root = document.querySelector('.ctr-projetos')
    
                let descricao = repo.description
                let nome = repo.name
                let screenshot = null
                let url = repo.html_url
    
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

                projeto.appendChild(span)
                projeto.appendChild(ctr_foto)
                root.appendChild(projeto)

                if (projetos.length == res.length -1) {
                    configBotoes()
                }
            })
        }
    })
}

function configBotoes () {
    const projeto = document.querySelectorAll('.projeto')
    const ctr_botoes = document.querySelector('.ctr-botoes')

    for (let i = 0; i < projeto.length; i++) {
        projeto[i].id = `projeto-${i}`
    }

    for (let i = 0; i < projeto.length; i = i + 4) {
        const botao = document.createElement('a')
        botao.href = `#projeto-${i+1}`

        ctr_botoes.appendChild(botao)

        console.log(botao)

        botao.addEventListener('click', () => {
            for (let a = 0; a < document.querySelectorAll('.ctr-botoes a').length; a++) {
                document.querySelectorAll('.ctr-botoes a')[a].classList.remove('ativo')
            }

            botao.classList.add('ativo')
        })
    }

    const botao = document.querySelector('.ctr-botoes a').classList.add('ativo')
}

function iniciar () {
    configMenu()

    if (location.href.indexOf('portfolio') != -1) {
        getProjects()
        
    }

}

window.addEventListener("load", iniciar)