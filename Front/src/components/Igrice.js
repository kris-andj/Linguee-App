import React, {useState} from "react";
import "./Igrice.css"



const Igrice = ()=>{
    
    const[selectedGame, setSelectedGame]= useState('');
    
    const handleGameChange=(event)=>{
        setSelectedGame(event.target.value);
    };


const renderContent = () =>{
    switch(selectedGame){
        case 'Kvizovi':
            return <p>Ovo je Kviz igra.</p>
            case 'Asocijacije':
                return <p>Ovo je Asocijacije igra.</p>
                case 'Zaokruzivanje':
                    return <p>Ovo je Zaokruživanje igra</p> 
                    default:
                        return <p>Izaberite igru iz padajućeg menija.</p>
    }
};

return (
    <div>
        <h2>Igrice</h2>
        
        <label htmlFor="gameSelect">Izaberite igru:</label>
        <select id="gameSelect" value={selectedGame} onChange={handleGameChange}>
            <option value="">Odaberite igru!</option>
            <option value="Kvizovi">Kvizovi</option>
            <option value="Asocijacije">Asocijacije</option>
            <option value="Zaokruzivanje">Zaokruzivanje</option>
        </select>
        
    <div>
    {renderContent()}
    </div>
    </div>
);
};
export default Igrice;