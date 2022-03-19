const ufInput = document.getElementById('uf-input');
const cidadeInput = document.getElementById('cidade-input');
const logradouroInput = document.getElementById('logradouro-input');
const cepInput = document.getElementById('cep-input');
const btnComCep = document.getElementById('btn-comcep');
const btnSemCep = document.getElementById('btn-semcep');
const div = document.getElementById('answer');

clickSemCep = async (uf, cidade, logradouro) => {
  const response = await fetch(`https://viacep.com.br/ws/${uf}/${cidade}/${logradouro}/json/`)
  const data = await response.json();
  return(data);
}

clickComCep = async (cep) => {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const data = await response.json();
  return(data);
}

retornaRespostaArray = (data) => {
  div.innerHTML = '';
  const erro = "NÃO ENCONTRADO";
  if (data.length === 0) {
    alert('Esse endereço não existe!');
  } else {
    data.forEach((retorno, index) => {
      const resultado = document.createElement('h3');
      resultado.innerText = `Resultado ${index + 1}`;
      div.appendChild(resultado);
      if (retorno.cep === '') {
        const cep = document.createElement('p');
        cep.innerText = `CEP: ${erro}`;
        div.appendChild(cep);
      } else {
        const cep = document.createElement('p');
        cep.innerText = `CEP: ${retorno.cep}`;
        div.appendChild(cep);
      }
      if (retorno.uf === '') {
        const uf = document.createElement('p');
        uf.innerText = `UF: ${erro}`;
        div.appendChild(uf);
      } else {
        const uf = document.createElement('p');
        uf.innerText = `UF: ${retorno.uf}`;
        div.appendChild(uf);
      }
      if (retorno.localidade === '') {
        const localidade = document.createElement('p');
        localidade.innerText = `Cidade: ${erro}`;
        div.appendChild(localidade);
      } else {
        const localidade = document.createElement('p');
        localidade.innerText = `Cidade: ${retorno.localidade}`;
        div.appendChild(localidade);
      }
      if (retorno.bairro === '') {
        const bairro = document.createElement('p');
        bairro.innerText = `Bairro: ${erro}`;
        div.appendChild(bairro);
      } else {
        const bairro = document.createElement('p');
        bairro.innerText = `Bairro: ${retorno.bairro}`;
        div.appendChild(bairro);
      }
      if (retorno.logradouro === '') {
        const logradouro = document.createElement('p');
        logradouro.innerText = `Logradouro: ${erro}`;
        div.appendChild(logradouro);
      } else {
        const logradouro = document.createElement('p');
        logradouro.innerText = `Logradouro: ${retorno.logradouro}`;
        div.appendChild(logradouro);
      }
      if (retorno.ddd === '') {
        const ddd = document.createElement('p');
        ddd.innerText = `DDD: ${erro}`;
        div.appendChild(ddd);
      } else {
        const ddd = document.createElement('p');
        ddd.innerText = `DDD: (${retorno.ddd})`;
        div.appendChild(ddd);
      }
    })
  }
}

retornaResposta = (data) => {
  div.innerHTML = '';
  const erro = "NÃO ENCONTRADO";
  if (data.erro) {
    alert('Esse CEP não existe!');
  } else {
    if (data.cep === '') {
      const cep = document.createElement('p');
      cep.innerText = `CEP: ${erro}`;
      div.appendChild(cep);
    } else {
      const cep = document.createElement('p');
      cep.innerText = `CEP: ${data.cep}`;
      div.appendChild(cep);
    }
    if (data.uf === '') {
      const uf = document.createElement('p');
      uf.innerText = `UF: ${erro}`;
      div.appendChild(uf);
    } else {
      const uf = document.createElement('p');
      uf.innerText = `UF: ${data.uf}`;
      div.appendChild(uf);
    }
    if (data.localidade === '') {
      const localidade = document.createElement('p');
      localidade.innerText = `Cidade: ${erro}`;
      div.appendChild(localidade);
    } else {
      const localidade = document.createElement('p');
      localidade.innerText = `Cidade: ${data.localidade}`;
      div.appendChild(localidade);
    }
    if (data.bairro === '') {
      const bairro = document.createElement('p');
      bairro.innerText = `Bairro: ${erro}`;
      div.appendChild(bairro);
    } else {
      const bairro = document.createElement('p');
      bairro.innerText = `Bairro: ${data.bairro}`;
      div.appendChild(bairro);
    }
    if (data.logradouro === '') {
      const logradouro = document.createElement('p');
      logradouro.innerText = `Logradouro: ${erro}`;
      div.appendChild(logradouro);
    } else {
      const logradouro = document.createElement('p');
      logradouro.innerText = `Logradouro: ${data.logradouro}`;
      div.appendChild(logradouro);
    }
    if (data.ddd === '') {
      const ddd = document.createElement('p');
      ddd.innerText = `DDD: ${erro}`;
      div.appendChild(ddd);
    } else {
      const ddd = document.createElement('p');
      ddd.innerText = `DDD: (${data.ddd})`;
      div.appendChild(ddd);
    }
  }
}

respostaSemCep = async () => {
  const ufValue = ufInput.value;
  const cidadeValue = cidadeInput.value;
  const logradouroValue = logradouroInput.value;
  if (ufValue.length != 2) {
    alert('UF incorreta!');
  } else if (cidadeValue.length < 3 || logradouroValue.length < 3) {
    alert('Cidade e logradouro devem conter no mínimo 3 letras!')
  } else {
    const data = await clickSemCep(ufValue, cidadeValue, logradouroValue);
    retornaRespostaArray(data);
  }
}

respostaComCep = async () => {
  const cepValue = cepInput.value;
  if (cepValue.length !== 8) {
    alert('CEP inválido!');
  } else {
    const data = await clickComCep(cepValue);
    retornaResposta(data);
  }
}

btnSemCep.addEventListener('click', respostaSemCep);
btnComCep.addEventListener('click', respostaComCep);