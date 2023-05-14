import React from 'react'

class Myorders extends React.Component{
    render() {



        // console.log(this.state.itemsByUserId.length)
        let showOrdersPage = ''
        //by default show there are no items
        // if (this.state.itemsByUserId.length === 0) {
        //     showItemsPage =
        //     <tbody>
        //         <tr className="itemsByUser">
        //             <td>No items here</td>
        //      </tr>
        //     </tbody>
                
        // }
        // // if there are items 
        // else {

        //     // display details for each one of the items
        //     showItemsPage = this.state.itemsByUserId.map((item, key) => {
        //         let itemDetailsUrl = `/item-details/${item.id}`
        //         if (item) {
        //             return (
        //                 <tbody key = {key}>
        //                 <tr>  
        //                     <td><Link to={itemDetailsUrl}>{item.name} </Link></td>
        //                     <td>{item.description} </td>
        //                     <td>{item.itemPrice} </td>
        //                     <td>{item.itemCount} </td>
        //                 </tr>
        //                 </tbody>
        //             )
        //         }
        //     })
        // }


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
                        Name
                    </th>
                    <th>
                        Description
                    </th>

                    <th>
                        Price
                    </th>
                    <th>
                        Date Placed
                    </th>
                    <th>
                        Bill
                    </th>
                </tr>
                </tbody>
                    {showOrdersPage}
                    </table>

                </section>
            </div>
        );
    }
}

export default Myorders;