import React from "react"
import config from "./config"
import TokenService from "./services/token-service"
import ValidationError from "./validationError"
import { Link } from 'react-router-dom'

class ShoppersSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsByUserId: [],
            searchTerm: {
                value: "",
                touched: false,
            },
            error: null

        };
    }
    componentDidMount() {
        let getItemsByUserIdUrl = `${config.API_ENDPOINT}/items/`;

        fetch(getItemsByUserIdUrl)
            .then((itemsInList) => itemsInList.json())
            .then((itemsInList) => {
                console.log(itemsInList)
                this.setState({
                    itemsByUserId: itemsInList,
                });
                // console.log(this.state);
            })

            .catch((error) => this.setState({ error }));
    }

    changeSearchTerm(searchTerm) {
        this.setState({
            searchTerm: { value: searchTerm },
        });
    }

    validateSearchTerm() {
        const searchTerm = this.state.searchTerm.value.trim();
       if (searchTerm.length >0 && searchTerm.length < 2) {
            return (
                "SearchTerm must be at least 2 characters long"
            );
        }
    }

    searchForm = (event) => {

        event.preventDefault();
        const { searchTerm } = event.target;
        console.log("searchTerm:", searchTerm.value);
        let getItemsBySearchTermUrl = `${config.API_ENDPOINT}/items/keyword/${searchTerm.value}`;
        fetch(getItemsBySearchTermUrl)
            .then((itemsBySearchTerm) => itemsBySearchTerm.json())
            .then((itemsBySearchTerm) => {
                console.log(itemsBySearchTerm)
                this.setState({
                    itemsByUserId: itemsBySearchTerm,
                });
                console.log(this.state);
            })
            .catch((error) => this.setState({ error }));

    };
    ShowAll = () => {

        window.location = '/'
    }
    render() {

        const msg = this.state.error ? <p>
            {this.state.error}
        </p> :
            <div></div>;

        // console.log(this.state.itemsByUserId.length)
        let showItemsPage = ''
        //by default show there are no items
        if (this.state.itemsByUserId.length === 0) {
            showItemsPage =
                <tbody>
                    <tr className="itemsByUser">
                        <td>No items here</td>
                    </tr>
                </tbody>

        }
        // if there are items 
        else {

            // display details for each one of the items
            showItemsPage = this.state.itemsByUserId.map((item, key) => {
                // console.log(item)
                let itemDetailsUrl = `/contact/${item.users_id}`
                if (item) {
                    return (
                        <tbody key={key}>
                            <tr>
                                <td>{item.name} </td>
                                <td>{item.description} </td>
                                <td>{item.itemPrice} </td>
                                <td>{item.itemCount} </td>
                                <td><Link to={itemDetailsUrl}>Contact </Link></td>
                            </tr>
                        </tbody>
                    )
                }
            })
        }


        return (
            <div className="Inventory">
                <section id="InventoryPage">
                    <form className="searchForm" onSubmit={this.searchForm}>
                        <div className="errorMessage">
                            {msg}
                        </div>
                        
                        <input
                            type="text"
                            id="searchTerm"
                            name="searchTerm"
                            placeholder="Produce name"
                            onChange={(e) =>
                                this.changeSearchTerm(e.target.value)
                            }
                            required
                        />
                        {this.state.searchTerm.touched && (
                            <ValidationError
                                message={this.validateSearchTerm()}
                            />
                        )}
                        <ValidationError
                            message={this.validateSearchTerm()}
                        />

                        <div className="button-wrapper">
                            <button
                                
                                className="go-button"
                                type="submit"
                                style={{fontWeight: '100' }
                            }
                            >
                                Search
                        </button>

                            <Link className="show-button" to="/" onClick={this.ShowAll}>
                                <span className='navlink-text'>Show all</span>
                            </Link>
                        </div>
                    </form>




                    <table className="inventoryTable">
                        <colgroup>
                            <col span="4" />
                            <col span="4" />
                            <col span="4" />
                            <col span="4" />
                        </colgroup>

                        <tbody>
                            <tr>
                                <th>
                                    Name
                    </th>
                                <th>
                                    Description
                    </th>

                                <th>
                                    Price
                    </th>
                                <th>
                                    Count
                    </th>
                            </tr>
                        </tbody>
                        {showItemsPage}
                    </table>

                </section>
            </div>
        );
    }
}

export default ShoppersSearch;
