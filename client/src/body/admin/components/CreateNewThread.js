import React, { Component } from 'react';
import help from '../../../services/helperfunctions';
import news from '../../../services/newsApi';
import blankImage from '../../../images/No-image.png';

class CreateNewThread extends  Component {
    constructor(props) {
        super(props);
        this.state = {
            imageURL: '',
            header: '',
            text: '',
            image: blankImage
        }
    }

    addImageURL(e) {
        this.setState({imageURL: e.target.value})
    }

    addHeader(e) {
        this.setState({header: e.target.value})
    }

    addText(e) {
        this.setState({text: e.target.value})
    }

    checkImage(e) {
        if(e.key === 'Enter') {
            help.checkImageURL(this.state.imageURL)
                .then((url) => this.setState({image: url}))
                .catch(err => console.log(err))
        }
    }

    saveThread() {
        news.createThread(this.state.header, this.state.text, this.state.image)
            .then(() => this.props.cancelNewThread())
            .catch(err => console.log(err))
    }

    render() {
        return(
            <div>
                <div className={'threadDateAndButtons'}>
                    <p className={'threadDate'}> Čia bus straipsnio išsaugojimo data </p>
                    <button onClick={() => this.saveThread()} className={'btn editBtn'}> Išsaugoti </button>
                    <button onClick={() => this.props.cancelNewThread()} className={'btn deleteBtn'}> Atšaukti </button>
                </div>
                <div className={'newsFeedBox'}>
                    <div>
                        <input maxLength={100} onChange={(e) => this.addHeader(e)} placeholder={'Straipsnio pavadinimas'} />
                        <textarea minLength={200} onChange={(e) => this.addText(e)} rows={'10'} cols={'60'} placeholder={'Straipsnio tekstas'} />
                    </div>
                    <div>
                        <input onChange={(e) => this.addImageURL(e)}
                               type={'text'} placeholder={'Nuotraukos URL'}
                                onKeyPress={(e) => this.checkImage(e)}/>
                        <img src={this.state.image} alt={'New thread'} className={'addThreadImage'}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateNewThread