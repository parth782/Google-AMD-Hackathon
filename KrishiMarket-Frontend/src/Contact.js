import React from "react"
import config from "./config"
import TokenService from "./services/token-service"
import { Link } from 'react-router-dom'

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsByUserId: {},

        };
    }



    componentDidMount() {


        const currentUser = this.props.match.params.userId
        console.log(currentUser)



        let getUserById = `${config.API_ENDPOINT}/users/${currentUser}`;

        fetch(getUserById)
            .then((itemsInList) => itemsInList.json())
            .then((itemsInList) => {
                // TODO get all the details from the user 
                console.log(itemsInList)
                this.setState({
                    itemsByUserId: itemsInList,
                });
                // console.log(this.state);
            })

            .catch((error) => this.setState({ error }));
    }



    render() {



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
            showItemsPage =  
                        <tbody>
                        <tr>  
                            <td>{this.state.itemsByUserId.farm_name} </td>
                            <td>{this.state.itemsByUserId.street_address} </td>
                            <td>{this.state.itemsByUserId.city} </td>
                            <td>{this.state.itemsByUserId.state} </td>
                            <td>{this.state.itemsByUserId.zip} </td>
                        </tr>
                        </tbody>


        }


        return (
            <div className="Inventory">
                <section id="InventoryPage">
                <table className ="inventoryTable">
                <colgroup>
                    <col span = "4"/>
                    <col span = "4"/>
                    <col span = "4"/>
                    <col span = "4"/>
                </colgroup>
                
                <tbody>
                <tr>
                    <th>
                        Farm name
                    </th>
                    <th>
                        Street address
                    </th>

                    <th>
                        City
                    </th>
                    <th>
                        State
                    </th>
                    <th>
                        ZIP
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

export default Contact;
