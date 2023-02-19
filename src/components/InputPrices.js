import InputPrice from './InputPrice';
import Tools from '../data/tools';

// 자료 추가 후 Tools에 해당하는 세공 도구들 보여지게 설정.

function InputPrices(props){
    return (
        <div className='priceInputBox'>
            <InputPrice></InputPrice>
        </div>
    )
} 

export default InputPrices;