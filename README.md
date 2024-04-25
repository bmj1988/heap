# Heap

## About

[![Image from Gyazo](https://i.gyazo.com/1e91892a374fa7aee55d9cb32fbd7260.png)](https://gyazo.com/1e91892a374fa7aee55d9cb32fbd7260)

 Heap is an online auction site with industry specific tweaks. Vendors list for free, agents pay for access to listings. In an effort to make this relationship as equitable as possible, it seeks to streamline much of the buying process for the agent. My goal for the project is sturdiness. No exposed wiring, no breaks, strong simple logic, lazy loading major components based on redux store, and lean querying (raw where possible).


## Links

[Live Site](https://heap-latest.onrender.com)
<br/>
[API Docs](https://github.com/bmj1988/heap/wiki/API-Documentation)
<br/>
[DB Schema](https://github.com/bmj1988/heap/wiki/DB-Schema)

## Docker Image

docker.io/bmj1988/heap:latest

## Tech
Stuff I used for development:
<br/>
PostgresQL db
<br/>
psql CLI
<br/>
bcrypt
<br/>
CORS
<br/>
csurf
<br/>
Postbird
<br/>
Postman
<br/>
PGAdmin
<br/>
Express
<br/>
Sequelize
<br/>
AWS S3 image hosting
<br/>
JWT
<br/>
Multer
<br/>
React
<br/>
React-Icons
<br/>
Vite

And Docker and Render for deployment.


## <ins>Current Features</ins>

### Listings

[![Image from Gyazo](https://i.gyazo.com/3902b946373de09752b161adbba00c45.gif)](https://gyazo.com/3902b946373de09752b161adbba00c45)

A vendor account can post listings to Heap seamlessly from the splash page widget, as well as monitor, update and delete them from both the main page and from the listings tab available from the profile menu.

Once a listing is closed, it becomes a "Closed listing" -- all bids, messages, images and other data associated to the listing are deleted -- and is represented by a few rows for record-keeping purposes.

### Shops

A shop is just a location where the items from a listing are meant to be picked up by the agent with the winning bid. For the sake of covenience, any new address entered into a create new listing form will create a new "Shop" represented by an address instead of a name. The shop hub allows vendors to edit or delete their shops as well as monitor open listings by location.


### Bids

[![Image from Gyazo](https://i.gyazo.com/b566a678b75b5a9b3b2f22f76726e955.gif)](https://gyazo.com/b566a678b75b5a9b3b2f22f76726e955)

An agent account can place bids on any open listing. A vendor then chooses which bid they wish to accept and an address for the listing is automatically sent out to the agent for pickup. An agent's main feed allows listings to be bid on directly. Currently accepted bids are monitored via the Accepted Bids tracker widget on the homepage, and all open and won bids can be accessed through the "Open bids" and "History" tabs in the profile menu.

### Messaging

[![Image from Gyazo](https://i.gyazo.com/64afe4655a755b44acb3becc8f6c4948.png)](https://gyazo.com/64afe4655a755b44acb3becc8f6c4948)

Messaging opens up between users once a bid is placed on a listing. After this, a vendor may message an agent at any time, however an agent may only message a vendor after having been messaged, or their bid accepted (at which point the vendor will auto-send an acceptance message to the agent). Messages are deleted once the listings they were initiated over, are closed or deleted.

### Images

All images uploaded through the create listing widget and create listing page are automatically stored to the app's AWS S3 bucket and are tied to the listing itself -- if the listing is deleted or closed, the image is deleted.

## <ins>Instructions</ins>

To run Heap simply clone the repo and build an env based off of the .env.example. After that initiate sequelize and use the CLI to migrate and seed. Once the DB is prepared with any data you'd like, simply enter npm start in the backend folder and npm run dev in the frontend folder. Pressing "o" into the command line which runs the vite frontend will open a browser window with heap.

## <ins>Planned Updates</ins>

No auction app would be complete without a review system, and one for both agents and vendors has been worked out. Once the project is greenlit, I will have more resources to devote to minor tweaks and quality of life improvements. All these last small bits are in preparation for the shift to a mobile project via React-Native, which I view as a vital element of the project. After this, the card system (which will be integrated in a major feature implementation for Firms) and the Firm role are my highest priorities.
