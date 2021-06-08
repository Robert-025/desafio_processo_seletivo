import { Component } from 'react';

import './App.css';

class Github extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listaRepositorios: [],
      nomeRepositorio: ''
    }
  }

  buscarRepositorio = (element) => {

    element.preventDefault();

    console.log('A função está funcionando')

    //Faz a chamada para a API
    fetch('https://api.github.com/users/'+this.state.nomeRepositorio+'/repos')
    
    //Define que a resposta da requisição será em JSON
    .then(resposta => resposta.json())

    //Atualiza o state listaRepositorios com os dados recebidos
    .then(dados => this.setState({ listaRepositorios : dados }))

    //Caso haja um erro, mostra ele no console do navegador
    .catch(erro => console.log(erro));
  }

  atualizaNome = async (nome) => {
    //Atualiza o state nomeRepositorio
    await this.setState({ nomeRepositorio : nome.target.value })

    console.log(this.state.nomeRepositorio)
  }

  mostrarRecentes = (element) => {
    
    element.preventDefault();
  }

  render() {
    return (
      <div className='App'>
        <main>
          <section>
            <h2>Localizador de usuário</h2>
            <form>
              <div>
                <input 
                  type='text' 
                  value={this.state.nomeRepositorio} 
                  onChange={this.atualizaNome} 
                  placeholder='Usuário do GitHub' 
                />
                <button type='submit' onClick={this.buscarRepositorio}>Buscar</button>
              </div>
            </form>
          </section>

          <section>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Data de criação</th>
                  <th>Tamanho</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.listaRepositorios.map((repositorio) => {
                    return(
                      <tr>
                        <td>{repositorio.id}</td>
                        <td>{repositorio.name}</td>
                        <td>{repositorio.description}</td>
                        <td>{repositorio.created_at}</td>
                        <td>{repositorio.size}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </section>
        </main>
      </div>
    )
  }
}

export default Github;
