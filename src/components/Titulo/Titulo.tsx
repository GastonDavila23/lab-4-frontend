import './Titulo.sass'
type Props = {
    texto: string
}
const Titulo: React.FC<Props> = ({ texto }) => {
    return (
        <h2 className='subtitulo'>{texto}</h2>
    )
}
export default Titulo