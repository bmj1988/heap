# Heap

 Heap is an online auction site with industry specific tweaks. Vendors list for free, agents pay for access to listings. In an effort to make this relationship as equitable as possible, it seeks to streamline much of the buying process for the agent. My goal for the project is sturdiness. No exposed wiring, no breaks, strong simple logic, lazy loading major components based on session state, and lean querying (raw where possible).

## Database Schema Design

![db-schema]

[db-schema]: </backend//static/heap-db-diagram.png>

[Heap on Render](https://heap-latest.onrender.com)

## API Documentation

### Session

<ins>LOG IN</ins>

Logs a user into an account with the correct credentials.

* METHOD: POST
* URL: /api/session/
* Headers: {"Content-Type": "application/json"}
* On Success:
  * Status Code: 200
  * Headers: {"Content-Type": "application/json"}
  * Body:
```json
 {
    "id": 1,
    "firstName": "Mike",
    "email": "demo@user.net",
    "agent": null,
    "owner": true,
 }
 ```
 * Error response:
   * Status Code: 401
   * Headers:
   * Content-Type: application/json
   * Body:

    ```json
    {
      "msg": "Invalid credentials"
    }
    ```

<ins>LOG OUT</ins>

Logs a user out of their account.

* METHOD: DELETE
* URL: /api/session/
* On Success:
  * Status Code: 200
  * Headers: {"Content-Type": "application/json"}
  * Body:
```json
 {
    "message": "success"
 }
 ```


### Shops

#### <ins>Get All User's Shops</ins>

Provides a simple list of all the users shops with no associations, for dropdowns.

* METHOD: GET
* URL: /api/shops/ownerAll
* On Success:
  * Status Code: 200
  * Headers: {"Content-Type": "application/json"}
  * Body:
```json
 { "Shops": [
 {
    "id": 1,
    "name": "Mike's Shop",
    "address": "123 Fake St",
    "city": "Washington",
    "state": "DC"
    },
    {
    "id": 2,
    "name": "Mike's Other Shop",
    "address": "456 Fake St",
    "city": "Washington",
    "state": "DC"
    },
 ]
 }
 ```

 ####<ins>Get Shop Hub</ins>

Provides all the details necessary to populate the shop hub, including current listings and a review aggregate for the shops.

* METHOD: GET
* URL: /api/shops/home
* On Success:
  * Status Code: 200
  * Headers: {"Content-Type": "application/json"}
  * Body:
```json
 { "Shops": [
 {
    "id": 1,
    "name": "Mike's Shop",
    "address": "123 Fake St",
    "city": "Washington",
    "state": "DC",
    "avgRating": 3,
    "Listings": [{
        "id": 1,
        "shopId": 1,
        "ownerId": 1,
        "description": "Stuff for sale",
        "price": "Best offer",
        "image": "www.fakeimage/1.jpg"
    }]
    },
    {
    "id": 2,
    "name": "Mike's Other Shop",
    "address": "456 Fake St",
    "city": "Washington",
    "state": "DC",
    "avgRating": 4,
    },
 ]
 }
 ```

####  <ins>Get Shop Details by Shop Id</ins>

Provides details for a single shop.

* METHOD: GET
* URL: /api/shops/:shopId
* On Success:
  * Status Code: 200
  * Headers: {"Content-Type": "application/json"}
  * Body:
```json

 {
    "id": 1,
    "name": "Mike's Shop",
    "address": "123 Fake St",
    "city": "Washington",
    "state": "DC",
    "avgRating": 3,
    "Listings": [{
        "id": 1,
        "shopId": 1,
        "ownerId": 1,
        "description": "Stuff for sale",
        "price": "Best offer",
        "image": "www.fakeimage/1.jpg"
    }]
    }

 ```

  #### <ins>Edit Shop Details by Shop Id</ins>

Provides details for a single shop.

* METHOD: PUT
* URL: /api/shops/:shopId
* Headers: {"Content-Type": "application/json"}
* Body:
```json
  {
    "name": "Mike's New Shop",
    "address": "789 Fake St",
    "city": "Washington",
    "state": "DC",
  }
  ```
* On Success:
  * Status Code: 200
  * Headers: {"Content-Type": "application/json"}
  * Body:
```json

 {
    "id": 1,
    "ownerId": 1,
    "name": "Mike's New Shop",
    "address": "789 Fake St",
    "city": "Washington",
    "state": "DC",
 }

 ```

  #### <ins>Create New Shop</ins>

Adds a new shop to the database.

* METHOD: POST
* URL: /api/shops/new
* Headers: {"Content-Type": "application/json"}
* Body:
```json
  {
    "name": "Mike's New Shop",
    "address": "789 Fake St",
    "city": "Washington",
    "state": "DC",
  }
  ```
* On Success:
  * Status Code: 200
  * Headers: {"Content-Type": "application/json"}
  * Body:
```json

 {
    "id": 1,
    "ownerId": 1,
    "name": "Mike's New Shop",
    "address": "789 Fake St",
    "city": "Washington",
    "state": "DC",
    "createdOn": "3/15/24"
 }

 ```

  #### <ins>Delete a Shop</ins>

Deletes a shop (or location) from the database.

* METHOD: DELETE
* URL: /api/shops/:shopId
* On Success:
  * Status Code: 200
  * Headers: {"Content-Type": "application/json"}
  * Body:
```json

 {
    "message": "Sucessfully deleted."
 }

 ```

### Listings

### Bids

### Messages

### Agent Reviews

### Shop Reviews
