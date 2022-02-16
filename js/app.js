const form = document.querySelector('#busca-cep')
const cepInput = document.querySelector('#cep')
const cepBtn = document.querySelector('#btn-cep')
const dados = document.querySelectorAll('.dados')

const searchingCep = async () => {
  const cep = cepInput.value
  const apiURL = `https://viacep.com.br/ws/${cep}/json/`

  if (validZipCode(cep)) {
    const data = await fetch(apiURL)
    const address = await data.json()
    
    if (address.hasOwnProperty('erro')) {
      clearForm()
      return swal('CEP não encontrado!', 'Por favor digite um valor válido.', 'error')
    }

    return fillOutForm(address)
  }
  clearForm()
  return swal('CEP não encontrado!', 'Por favor digite um valor válido.', 'error')
}

const validZipCode = cep => cep.length === 8 && /^[0-9]+$/.test(cep)

const fillOutForm = (address) => {
    addActive()
    logradouro.innerHTML = address.logradouro
    bairro.innerHTML = address.bairro
    gia.innerHTML = address.gia
    ibge.innerHTML = address.ibge
    uf.innerHTML = address.uf
    cidade.innerHTML = address.localidade
}

const clearForm = () => {
  rmActive()
  cepInput.value = ''
  logradouro.innerHTML = ''
  bairro.innerHTML = ''
  gia.innerHTML = ''
  ibge.innerHTML = ''
  uf.innerHTML = ''
  cidade.innerHTML = ''
}

const addActive = () => {
  dados.forEach(element => element.classList.add('active'))
}

const rmActive = () => [
  dados.forEach(element => element.classList.remove('active'))
]

form.addEventListener('submit', event => {
  event.preventDefault()
  searchingCep()
})

cepBtn.addEventListener('click', () => {
  searchingCep()
})