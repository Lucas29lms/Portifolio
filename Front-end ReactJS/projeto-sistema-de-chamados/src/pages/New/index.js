
import './new.css'
import { useState, useEffect, useContext } from 'react'
import firebase from '../../servives/firebaseConection'
import { useHistory, useParams } from 'react-router-dom'
import Header from "../../components/Header"
import Title from "../../components/Title"
import { AuthContext } from '../../contexts/auth'
import { FiPlusCircle } from 'react-icons/fi'
import { toast } from 'react-toastify'


export default function New() {
    const { user } = useContext(AuthContext)

    const {id} = useParams()
    const history = useHistory()

    const [loadCustomers, setLoadCustomers] = useState(true)
    const [customers, setCustomers] = useState([])
    const [customersSeleted, setCustomersSelected] = useState(0)

    const [assunto, setAssunto] = useState('Suporte')
    const [status, setStatus] = useState('Aberto')
    const [complemento, setComplemento] = useState('')
    const [idCustomers, setIdCustomers] = useState(false)

    useEffect(() => {
        async function loadCustomers() {

            await firebase.firestore().collection('customers')
                .get()
                .then((snapshot) => {
                    let lista = []

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            nomeFantasia: doc.data().nomeFantasia
                        })
                    })

                    if (lista.length === 0) {
                        console.log('Nenhuma empresa cadastrada!')
                        setCustomers([{ id: '1', nomeFantasia: '' }])
                        setLoadCustomers(false)
                        return;
                    }

                    setCustomers(lista)
                    setLoadCustomers(false)

                    if(id){
                        loadId(lista)
                    }
                })
                .cath((error) => {
                    console.log('Algo deu errado!', error)
                    setLoadCustomers(false)
                    setCustomers([{ id: '1', nomeFantasia: '' }])
                })
        }

        loadCustomers();
    }, [])

    async function loadId(lista){
        await firebase.firestore().collection('chamados').doc(id)
        .get()
        .then((snapshot)=>{
            setAssunto(snapshot.data().assunto)
            setStatus(snapshot.data().status)
            setComplemento(snapshot.data().complemento)

            let index = lista.findIndex(item => item.id === snapshot.data().clienteId)
            setCustomersSelected(index)
            setIdCustomers(true)
        })
        .cath((err)=>{
            console.log('Erro no ID enviado!', err)
            setIdCustomers(false)
        })

    }

    async function handleRegister(e) {
        e.preventDefault()

        if(idCustomers){
            await firebase.firestore().collection('chamados')
            .doc(id)
            .update({
                customers: customers[customersSeleted].nomeFantasia,
                clienteId: customers[customersSeleted].id,
                assunto: assunto,
                status: status,
                complemento: complemento,
                userId: user.uid,
            })
            .then(()=>{
                toast.success('Chamado atualizado com sucesso.')
                setCustomersSelected(0)
                setComplemento('')
                history.push('/dashboard')
            })
            .cath((err)=>{
                toast.error('Erro ao atualizar chamado!')
                console.log(err)
            })
            return;
        }

            await firebase.firestore().collection('chamados')
            
                .add({
                    created: new Date(),
                    customers: customers[customersSeleted].nomeFantasia,
                    clienteId: customers[customersSeleted].id,
                    assunto: assunto,
                    status: status,
                    complemento: complemento,
                    userId: user.uid,
                    userName: user.nome
                })
                .then(() => {
                    toast.success('Chamado aberto com sucesso!')
                    setComplemento('')
                    setCustomersSelected(0)
                })
                .cath((error) => {
                    console.log('Deu erro! ', error)
                    toast.error('Chamado aberto com sucesso!')
                })
        

    }

    function hendleChangeSelected(e) {
        setAssunto(e.target.value)
        console.log(e.target.value)
    }

    function handleOptionChange(e) {
        setStatus(e.target.value)
        console.log(e.target.value)
    }

    function handleChangeCustomers(e) {
        //console.log('Index do cliente selecionado: ', e.target.value)
        //console.log('Cliente selecionado: ', customers[e.target.value])
        setCustomersSelected(e.target.value)
    }


    return (
        <div>
            <Header />

            <div className="content">
                <Title name="Novo Chamado">
                    <FiPlusCircle size={25} />
                </Title>


                <div className="container">

                    <form className='form-profile' onSubmit={handleRegister}>
                        <label>Cliente:</label>

                        {loadCustomers ? (
                            <input type="text" disabled={true} value="Carrengando lista..." />
                        ) : (
                            <select value={customersSeleted} onChange={handleChangeCustomers}>
                                {customers.map((item, index) => {
                                    return (
                                        <option key={item.id} value={index}>
                                            {item.nomeFantasia}
                                        </option>
                                    )
                                })}
                            </select>
                        )}



                        <label>Assunto</label>
                        <select value={assunto} onChange={hendleChangeSelected} >
                            <option value="Suporte" >Suporte</option>
                            <option value="Visita Tecnica" >Visita Tecnica</option>
                            <option value="Financeiro" >Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className="status">
                            <input type="radio" name="radio" value="Aberto" onChange={handleOptionChange} checked={status === 'Aberto'} />
                            <span>Em Aberto</span>
                            <input type="radio" name="radio" value="Progresso" onChange={handleOptionChange} checked={status === 'Progresso'} />
                            <span>Em Progresso</span>
                            <input type="radio" name="radio" value="Atendido" onChange={handleOptionChange} checked={status === 'Atendido'} />
                            <span>Atendido</span>
                        </div>

                        <label>Complemento</label>
                        <textarea type="text" placeholder="Descreva seu problema (opcional)" onChange={(e) => { setComplemento(e.target.value) }} />

                        <button type="submit">Registrar</button>
                    </form>
                </div>
            </div>

        </div>
    )
}