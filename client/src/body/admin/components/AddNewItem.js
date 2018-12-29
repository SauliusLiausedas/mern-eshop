import React, { Component } from 'react';
import itemActions from '../../../services/itemActions';

class AddNewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            quantity: 0,
            picture: '',
            category: '',
            weight: '',
            description: '',
            price: '',
            discount: false
        }
    }

    addItem(e) {
        e.preventDefault();
        const { name, quantity, picture, category, description, weight, price, discount } = this.state;

        if(!name || !quantity || !category || !price) {
            window.alert('Įveskite visus duomenis')
        } else {
            const item = {};
            item.name = name;
            item.quantity = quantity;
            item.picture = picture;
            item.category = category;
            item.properties = {
                description: description,
                weight: weight
            };
            item.price = price;
            item.discount = discount;
            const token = localStorage.getItem('token');
            itemActions.addItem(item, token)
                .then(res => res.json())
                .then(data => {
                    if(data.success === true) {
                        window.alert('Item Added');
                    } else {
                        window.alert(data.message);
                    }
                })
                .catch(err => console.log(err));
        }
    }

    addItemPicture(e) {
        //TODO checkPictureUrl
        this.setState({picture: e.target.value})
    }

    render() {
        const { name, quantity, picture, discount, description, weight } = this.state;
        return(
            <div className='newUser'>
                <form>
                    <label>Prekės pavadinimas</label><br/>
                    <input type='text' placeholder='Pavadinimas' value={ name }
                           onChange={(e) => this.setState({name: e.target.value})}/><br/>
                    <label>Prekių kiekis</label><br/>
                    <input type='number' placeholder='Kiekis' value={ quantity }
                           onChange={(e) => this.setState({ quantity: e.target.value })}/><br/>
                    <label>Prekės nuotrauka</label><br/>
                    <img src={picture} alt={'Prekė'} className={'itemPicture'}/><br/>
                    <input type='text' placeholder={'Nuotraukos URL'} onChange={(e) => this.addItemPicture(e)}/><br/>
                    <label>Kategorija</label>
                    <select onChange={(e) => this.setState({ category: e.target.value })}>
                        <option value={''}>Pasirinkite</option>
                        <option>Medus</option>
                        <option>Bičių produktai</option>
                        <option>Kiti produktai</option>
                        <option>Bitės</option>
                    </select><br/>
                    <label>Svoris</label>
                    <input type={'number'} placeholder={'Svoris kilogramais'} value={ weight } step={0.1} onChange={(e) => this.setState({ weight: e.target.value })}/><br/>
                    <textarea className={'itemDescription'} value={ description } onChange={(e) => this.setState({description: e.target.value})}
                              placeholder={'Pridėkite aprašymą'}/><br/>
                    <label>Nustatykite kainą</label><br/>
                    <input type={'Number'} onChange={(e) => this.setState({ price: e.target.value })} min={0}/><br/>
                    <label>Akcija</label>
                    <input type={'checkbox'} onChange={() => this.setState({ discount: !discount })} /> <br/>
                    <button onClick={(e) => this.addItem(e)} className='btn submitBtn'> Pridėti </button>
                </form>
            </div>
        )
    }
}

export default AddNewUser
