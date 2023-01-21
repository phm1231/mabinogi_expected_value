import "./layout.css";
import InputPrices from "../InputPrices";
import SelectList from '../SelectList';
import InputOption from "../InputOption";

function Section(){
    return(
        <section>
            <h3>세공 도구 가격</h3>
            <InputPrices/>
            <InputOption/>
        </section>
    )
}

export default Section;