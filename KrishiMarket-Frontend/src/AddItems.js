import React from "react";
import config from "./config";
import TokenService from "./services/token-service";
import ValidationError from "./validationError";

class AddItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      window.location = "/";
    }
  }

  addItem(event) {
    // console.log('hello there')
    event.preventDefault();
    const data = {};

    const formData = new FormData(event.target);

    for (let value of formData) {
      data[value[0]] = value[1];
    }

    let user_id = TokenService.getUserId();

    let { itemName, itemDescription, itemPrice, itemCount } = data;
    //get the current date in unix format
    const timeElapsed = Date.now();
    //conver the unix format date into string
    const today = new Date(timeElapsed);
    // console.log(itemName, itemDescription, itemPrice, itemCount)
    let payload = {
      users_id: user_id,
      name: itemName,
      description: itemDescription,
      itemPrice: itemPrice,
      itemCount: itemCount,
      img: "no-img.jpg",
    };

    console.log(payload);

    ////////////////POST ITEMS//////////////////////////////////////////////

    fetch(`${config.API_ENDPOINT}/items`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        window.location = "/inventory";
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="AddParent">
        <div className="AddItems">
          <section id="AddItemsPage">
            <form className="additemForm" onSubmit={this.addItem}>
              <label>Item name</label>
              <input
                type="text"
                id="itemName"
                name="itemName"
                placeholder="itemName"
                onChange={(e) => this.changeItemName(e.target.value)}
                required
              />
              {this.state.itemName.touched && (
                <ValidationError message={this.validateItemName()} />
              )}

              <label>Item description</label>
              <input
                type="text"
                id="itemDescription"
                name="itemDescription"
                placeholder="Sweet"
                onChange={(e) => this.changeItemDescription(e.target.value)}
                required
              />
              {this.state.itemDescription.touched && (
                <ValidationError message={this.validateItemDescription()} />
              )}

              <label >Item price</label>
              <input
                type="text"
                id="itemPrice"
                name="itemPrice"
                placeholder="Item price"
                onChange={(e) => this.changeItemPrice(e.target.value)}
                required
              />
              {this.state.itemPrice.touched && (
                <ValidationError message={this.validateItemPrice()} />
              )}

              <label>Item count</label>
              <input
                type="text"
                id="itemCount"
                name="itemCount"
                placeholder="Item count"
                onChange={(e) => this.changeItemCount(e.target.value)}
                required
              />
              {this.state.itemCount.touched && (
                <ValidationError message={this.validateItemCount()} />
              )}

              <button className="go-button" type="submit">
                Add item
              </button>
            </form>
          </section>
        </div>
      </div>
    );
  }
}

export default AddItems;
