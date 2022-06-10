
import './customers.css'
import { useState } from 'react'
import firebase from '../../servives/firebaseConection'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiUsers } from 'react-icons/fi'
import { toast } from 'react-toastify'

export default function Customers() {

    const [nomeFantasia, setNomeFantasia] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [endereco, setEndereco] = useState('')

    async function handleAdd(e) {
        e.preventDefault()

        if (nomeFantasia !== '' && cnpj !== '' && endereco !== '') {
            await firebase.firestore().collection('customers')
                .add({
                    nomeFantasia: nomeFantasia,
                    cnpj: cnpj,
                    endereco: endereco
                })
                .then(() => {
                    setNomeFantasia('')
                    setCnpj('')
                    setEndereco('')
                    toast.info('Cliente cadastrado com sucesso!')
                })
                .cath((error) => {
                    console.log(error)
                    toast.error('Erro ao cadastrar este cliente!')
                })
        }else{
            toast.error('Preencha todos os campos!')
        }


    }


    return (
        <div>
            <Header />
            <div className='content'>
                <Title name="Novos Clientes">
                    <FiUsers size={25} />
                </Title>

                <div className='container'>
                    <form className='form-profile' onSubmit={handleAdd}>
                        <label>Nome Cliente</label>
                        <input type="text" value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} />
                        <label>CNPJ</label>
                        <input tupe="text" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
                        <label>Endereço</label>
                        <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} />

                        <button type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>

        </div>
    )
}