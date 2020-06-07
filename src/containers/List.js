import React, { Fragment } from 'react';
import Card from '../components/Card/Card'

const API = 'http://www.omdbapi.com/?i=tt3896198&apikey=8f298e7f'

class List extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [],
            searchTerm: '',
            error: '',
            loading: true
        }
    }

    async componentDidMount(){
        const res = await fetch(`${API}&s=batman`)
        const resJSON = await res.json()
        // console.log(resJSON)
        this.setState({data: resJSON.Search, loading: false})
    }

    async handleSubmit(e){
        e.preventDefault();
        if(!this.state.searchTerm){
            this.setState({error: 'Please dont send a empty search..'})
        }

        const res = await fetch(`${API}&s=${this.state.searchTerm}`);
        const data = await res.json();

        if(!data.Search){
            return this.setState({error: 'There are not results'});
        }

        this.setState({data: data.Search, error: '', searchTerm: ''});
    }
    render() {

        const {data, loading} = this.state;
        if(loading){
            return <div>Loading...</div>
        }

        return(
            <Fragment>
                <div className="col-md-4 offset-md-4 p-4">
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search.."
                            onChange={e => this.setState({searchTerm: e.target.value})}
                            value={this.state.searchTerm}
                            autoFocus
                        />
                    </form>
                    <p className="text-white">{this.state.error ? this.state.error : ''}</p>
                </div>

                <div className="row">
                    {
                        data.map((movie,i) => {
                            return <Card movie={movie} key={i} />
                        })
                    }
                </div>
            </Fragment>
        )
    }
}

export default List;