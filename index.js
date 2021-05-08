
function App () {
    // O useState simplifica a criação de uma class. Usa o bind em setExpression e atribuiu o valor do state
    // expression para "" no inicio da operação
    const [expression, setExpression] = React.useState("");
    const [answer, setAnswer] = React.useState(0);
    // Quando o botão é apertado, é gerado um simbolo que será adicionado ao setExpression (que aparecera no display)
    const display = (symbol) => {
        setExpression((prev) => prev+symbol);
      
        // if para que o display answer apareça o numero digitado
        if (answer.length=1&&answer==0) {
          setAnswer(symbol);
      } else {
          if ((Number(symbol)||symbol=="0"||symbol===".")&&(!(/[*+/]$/.test(answer[answer.length-1]))&&(answer[answer.length-1]!=="-"))){
              setAnswer((prev) => prev+symbol)
              if (symbol===".") {
                  let lastNumber=answer.match(/[0-9.]+$/g).join("");
                  if(/[.]/g.test(lastNumber)) {
                      setAnswer(answer)
                  }
              }
          } else {
              setAnswer(symbol)
          }
        }
        // if (symbol!==0&&answer[0]==0) {
        //     answer(symbol)
        // }
        // if relacionado ao dois operadores consecutivos
        if(/[*+/]$/.test(expression[expression.length-1])||expression[expression.length-1]==="-") {
            if (/[*-+/]/.test(symbol)) {
                setExpression((prev) => prev.substring(0,prev.length-2)+symbol)
            }
        }
        // if relacionado aos dois operadores consecutivos
        if (/[*+/]$/.test(expression[expression.length-2])&&expression[expression.length-1]==="-"){
            if (/[*-+/]/.test(symbol)) {
                setExpression((prev) => prev.substring(0,prev.length-2)+symbol)
            }
        }
        // If feito para a expressão do "="
        if(expression[expression.length-1]==="="){
            if(/\d/.test(symbol)) {
                setExpression(symbol)
                setAnswer(symbol)
            } else {
                setExpression(answer+symbol)
                setAnswer(0)
            }
        }
        // if para fazer o teste do ponto.
        if (symbol===".") {
            let lastNumber=expression.match(/[0-9.]+$/g).join("");
            if(/[.]/g.test(lastNumber)) {
                setExpression(expression)
                setAnswer(answer)
            }
        }
    }
    const calculate = () => {
        setAnswer(eval(expression));
        setExpression((prev) => prev + "=")
    }
    
    const clear = () => {
        setExpression(prev=>prev
            .split("")
            .slice(0,prev.length-1)
            .join(""));
        setAnswer(0);
    }
    const allClear = () => {
        setExpression("");
        setAnswer(0);
    }
    return (
        <div className="container">
            <div className="grid">
                <div  className="dis">
                    <input  type="text"  value={expression} placeHolder="0" disabled />
                    <div id="display" className="total">{answer}</div>
                </div>
                <button onClick={allClear} id="clear" className="padButton AC red">AC</button>
                <div onClick={clear} className="padButton C red">C</div>
                <div onClick={()=>display("/")} id="divide" className="padButton div">/</div>
                <div onClick={()=>display("*")} id="multiply" className="padButton times">X</div>
                <div onClick={()=>display("7")} id="seven" className="padButton seven dark-gray">7</div>
                <div onClick={()=>display("8")} id="eight" className="padButton eight dark-gray">8</div>
                <div onClick={()=>display("9")} id="nine" className="padButton nine dark-gray">9</div>
                <div onClick={()=>display("-")} id="subtract" className="padButton minus">-</div>
                <div onClick={()=>display("4")} id="four" className="padButton four dark-gray">4</div>
                <div onClick={()=>display("5")} id="five" className="padButton five dark-gray">5</div>
                <div onClick={()=>display("6")} id="six" className="padButton six dark-gray">6</div>
                <div onClick={()=>display("+")} id="add" className="padButton plus">+</div>
                <div onClick={()=>display("1")} id="one" className="padButton one dark-gray">1</div>
                <div onClick={()=>display("2")} id="two"     className="padButton two dark-gray">2</div>
                <div onClick={()=>display("3")} id="three"   className="padButton three dark-gray">3</div>
                <div onClick={calculate} id="equals"         className="padButton equal blue">=</div>
                <div onClick={()=>display("0")} id="zero"    className="padButton zero dark-gray">0</div>
                <div onClick={()=>display(".")} id="decimal" className="padButton dot dark-gray">.</div>
            </div> 
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));