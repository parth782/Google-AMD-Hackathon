# 👨🏽‍🌾 Krishi Market 🛒
## Abstract

> Despite the fact that farming is the primary occupation in India, most farmers nowadays are from the lower class and live in abject poverty. When it comes to farming, the innovative procedures and automated machinery that are taking the globe to new heights have lagged behind. Either a lack of knowledge about the latest facilities or their unavailability contributes to farming poverty. Even after all their labour and output, farmers are being taken advantage of by agents in today's market, which keeps them in poverty. Agro-marketing would automate everything, making life simpler and providing the greatest answer to every issue. 

**Krishi Market** will serve as a way for the farmers to sell their products across the country just with some basic knowledge about how to use the website. The site will guide the farmers in all aspects. It is created for farmers who want to sell fresh products to local shoppers and restaurants. All they have to do is to create their own account and include products they are selling into the inventory tables. This removes the middlemen and makes sure that the profit being earned by the farmers is directly going into their respective pockets. Farmers would be able to access the invoices produced and the associated information in their accounts thanks to the marketing facility.  In remote areas without access to the internet, the SMS capability would provide the necessary market information. The government will introduce new programmes for farmers. A special interface will be offered for examining and implementing the website's schemes.


## Problem Statement:
In Conventional Supply Chain as shown in the figure below, Farmers do not sell directly to consumers but to a Middlemen. Middlemen raise prices for consumers while underpaying farmers, leaving farmers poor and unproductive. Farmers encounter high production cost in their effort to boost production but hardly get fair pricing of their produces from middlemen, the bulk farm gate buyers.

<img width="100%" align="center" alt="Conventional Supply Chain" src="https://qph.cf2.quoracdn.net/main-qimg-8f7d693a62de813a31842c033bdca090.webp">

> *How can we eradicate this problem?*
> 
> *Can modern technology help in improving the convention supply chain model for farmers?*


## Problem Solution:
Therefore to solve this problem, we the team **Binary Developers** have decided to come up with a solution of making a web application which will not only reduce the dependency of Farmers on Middlemen but also help them to sell their crops to *retailers, wholesalers, consumers* at a better price. Not only this but this web app would help them to keep track of all their transactions.

<img width="250px" align="center" alt="Tech Based Suppy Chain" src="">

### STEPS TO SETUP LOCAL BUILD OF FRONTEND:
<hr>
 
1. Unzip frontend zip from the google drive link or clone the project from github link provided.
1. After this step , Just run one command npm install in the terminal opened in the same directory where the project exists.This command will basically install all the dependencies on local.
1. Run the command : `npm start` -> It will start react server on local.

### STEPS TO SETUP BACKEND OF PROJECT:

<hr>

1. Unzip backend zip from the google drive link or clone the project from github link provided.
2. After this step , Just run one command npm install in the terminal opened in the same directory where the project exists.This command will basically install all the dependencies on local. 
3. After this install xampp to use mysql service , start mysql service create one new database named as "**KrishiMarket**" , after this step import the sql file provided in the clone of project.
4. Create one file `".env"`. Add the following contents: 

>       DB_HOST=localhost
>       DB_PORT=3306
>       DB_USERNAME='root'
>       DB_PASSWORD=(password of localhost if setup)
>       DB_NAME='farmerbazaar'
>       PORT=8000
>       JWT_SECRET='farmerbazaar is a marketplace for farmers and buyers'
 
1. Run the command : `npm run dev` -> It will start react server on local.



### NOTE:

<hr>

To make frontend setup on local link with backend on local move to file `(./src/config.js) ``just uncomment "API_ENDPOINT"` parameter of localhost and `comment "API_ENDPOINT" `of deployed url.
After this step all operations will be done locally.

## Tech Stack

- Node JS
- Google Cloud
- React
- MySQL
- JWT Authentication

## Features

- Easy and Intuitive UI/UX.
- Direct Communication b/w Farmers \& Consumers.
- Responsive Website.
- Secure Database and Easy Maintenance Of All Transaction Records.

## Future Upgrades 

- Enable Dark Mode.
- Decentralizing Database using Google Cloud Blockchain Node Engine.
- Live Update About Any News/Schemes By Government For Farmers.
- Hindi Translation For The Website.

## Team Members

- [@Parth Johri](https://github.com/ParthJohri)
- [@Parth Gupta](https://github.com/parth782)
- [@Saksham Dhasmana](https://github.com/sakd23)
- [@Ankush Bhagat](https://github.com/ankushbhagat124)

## Screenshots
