import React from "react"
import config from "./config"
import TokenService from "./services/token-service"
import ValidationError from "./validationError"


class ItemDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemDetails: {},

            itemName: {
                value: "",
                touched: false,
            },
            itemDescription: {
                value: "",
                touched: false,
            },
            itemPrice: {
                value: "",
                touched: false,
            },
            itemCount: {
                value: "",
                touched: false,
            },

        };
    }


    changeItemName(itemName) {
        this.setState({
            itemName: { value: itemName, touched: true },
        });
    }

    changeItemDescription(itemDescription) {
        this.setState({
            itemDescription: { value: itemDescription, touched: true },
        });
    }

    changeItemPrice(itemPrice) {
        this.setState({
            itemPrice: { value: itemPrice, touched: true },
        });
    }

    changeItemCount(itemCount) {
        this.setState({
            itemCount: { value: itemCount, touched: true },
        });
    }


    validateItemName() {
        const itemName = this.state.itemName.value.trim();
        if (itemName.length === 0) {
            return <p className="input-error">Item name is required</p>;
        } else if (itemName.length < 2) {
            return (
                <p className="input-error">
                    Item name must be at least 2 characters long
                </p>
            );
        }
    }


    validateItemDescription() {
        const itemDescription = this.state.itemDescription.value.trim();
        if (itemDescription.length === 0) {
            return <p className="input-error">Item description is required</p>;
        } else if (itemDescription.length < 2) {
            return (
                <p className="input-error">
                    Item description must be at least 2 characters long
                </p>
            );
        }
    }


    validateItemPrice() {
        const itemPrice = this.state.itemPrice.value.trim();
        if (itemPrice.length === 0) {
            return <p className="input-error">Item price is required</p>;
        } else if (itemPrice.length < 1) {
            return (
                <p className="input-error">
                    Item price must be at least 1 characters long
                </p>
            );
        }
    }


    validateItemCount() {
        const itemCount = this.state.itemCount.value.trim();
        if (itemCount.length === 0) {
            return <p className="input-error">Item count is required</p>;
        } else if (itemCount.length < 1) {
            return (
                <p className="input-error">
                    Item price must be at least 1 characters long
                </p>
            );
        }
    }

    componentDidMount() {


        //if the user is not logged in, send him to landing page
        if (!TokenService.hasAuthToken()) {
            window.location = '/'
        }

        const itemId = this.props.match.params.itemId;



        let getItemDetailsUrl = `${config.API_ENDPOINT}/items/${itemId}`;

        fetch(getItemDetailsUrl)
            .then((itemDetails) => itemDetails.json())
            .then((itemDetails) => {
                console.log(itemDetails)
                this.setState({
                    itemDetails: itemDetails,
                });
                // console.log(this.state);
            })

            .catch((error) => this.setState({ error }));
    }


    updateItem(event) {

        // console.log('hello there')
        event.preventDefault()
        const data = {}

        const formData = new FormData(event.target)

        for (let value of formData) {
            data[value[0]] = value[1]
        }
        console.log(data);
        let user_id = TokenService.getUserId();

        let { itemName, itemDescription, itemPrice, itemCount } = data;
        //get the current date in unix format 
        const timeElapsed = Date.now();
        //conver the unix format date into string
        const today = new Date(timeElapsed);
        
        let payload = {
            users_id: user_id,
            name: itemName,
            description: itemDescription,
            itemPrice: itemPrice,
            itemCount: itemCount,
            img: "no-img.jpg",
           

        }



    //     console.log(this.props)

    
const itemId = window.location.href.split("/")[4]


        fetch(`${config.API_ENDPOINT}/items/${itemId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then(responseJson => {
                window.location = '/inventory'
            })
            .catch(err => {
                console.log(err);
            });

    }

    render() {







        // console.log(this.state.itemDetails.length)
        let showItemsDetailsPage = ''
        //by default show there are no items
        if (this.state.itemDetails.length === 0) {
            showItemsDetailsPage =
                <div className="itemsDetails">
                    No item details here
             </div>
        }
        // if there are items 
        else {

            // display details for each one of the items
            showItemsDetailsPage =
                <li>
                    <form className="itemDetails" onSubmit={this.updateItem}>
                        <label htmlFor="itemName">Item name</label>
                        <input
                            type="text"
                            id="itemName"
                            name="itemName"
                            placeholder="Tomatoes"
                            defaultValue = {this.state.itemDetails.name}
                            onChange={(e) =>
                                this.changeItemName(e.target.value)
                            }
                            required
                        />
                        {this.state.itemName.touched && (
                            <ValidationError
                                message={this.validateItemName()}
                            />
                        )}
                        <label htmlFor="itemDescription">Item description</label>
                        <input
                            type="text"
                            id="itemDescription"
                            name="itemDescription"
                            placeholder="Sweet"
                            defaultValue = {this.state.itemDetails.description}
                            onChange={(e) =>
                                this.changeItemDescription(e.target.value)
                            }
                            required
                        />
                        {this.state.itemDescription.touched && (
                            <ValidationError
                                message={this.validateItemDescription()}
                            />
                        )}


                        <label htmlFor="itemPrice">Item price</label>
                        <input
                            type="text"
                            id="itemPrice"
                            name="itemPrice"
                            placeholder="Item price"
                            defaultValue = {this.state.itemDetails.itemPrice}
                            onChange={(e) =>
                                this.changeItemPrice(e.target.value)
                            }
                            required
                        />
                        {this.state.itemPrice.touched && (
                            <ValidationError
                                message={this.validateItemPrice()}
                            />
                        )}


                        <label htmlFor="itemCount">Item count</label>
                        <input
                            type="text"
                            id="itemCount"
                            name="itemCount"
                            placeholder="Item count"
                            defaultValue = {this.state.itemDetails.itemCount}
                            onChange={(e) =>
                                this.changeItemCount(e.target.value)
                            }
                            required
                        />
                        {this.state.itemCount.touched && (
                            <ValidationError
                                message={this.validateItemCount()}
                            />
                        )}

                        <button
                            className="go-button"
                            type="submit"
                        >
                            Update item
                        </button>
                    </form>

                </li>
        }




        return (
            <div className="UpdateItems">
                <section id="UpdateItemsPage">
                    {showItemsDetailsPage}
         </section>
            </div>
        );
    }
}

export default ItemDetails;
