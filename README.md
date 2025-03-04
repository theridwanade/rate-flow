# Rate Flow

Rate Flow is a currency rates API proxy built with Express, Node.js, and TypeScript. It utilizes the Open Exchange Rates API with its free tier, which provides 1,000 free calls per month.

This app acts as an intermediary between the original API by fetching exchange rate data, storing it in a database, and reducing the need to call the original API repeatedly. This approach helps save power, costs, and API key quota. The techniques used in this app can be applied to any project requiring currency conversion data. Since the 1,000-call quota may not always be sufficient due to redundant calls, this app ensures data availability while allowing for manipulation and optimization.

## Features

- Fetches available currency codes and saves them to a file in the public folder, reducing API calls and database queries.
- Retrieves the latest currency rates from the API (limited to a USD base rate) and manipulates the data to generate exchange rates for all available currencies.
- Implements logic for pairwise currency conversion.
- Provides a dedicated job URL to fetch and update the latest currency rate data efficiently.

## Endpoints

### **Jobs Routes** (`/jobs`)

Handles scheduled jobs related to fetching and updating currency rates.

#### **Save Currency Codes** (`GET /jobs/currency-codes`)

- Fetches and stores available currency codes to the filesystem (`public` folder).
- **Request Body:** _None_
- **Response:**
    
    ```json
    {
      "message": "Currency codes saved successfully",
      "status": 200
    }
    ```
    

#### **Update Currency Rates** (`GET /jobs/update-rates`)

- Fetches and stores the latest currency rates from the external API.
- **Request Body:** _None_
- **Response:**
    
    ```json
    {
      "message": "Currency rates saved successfully",
      "status": 200
    }
    ```
    

### **API Routes** (`/api`)

Main API routes for currency-related operations.

### **Currency Codes** (`GET /api/currencies.json`)

- Retrieves saved currency codes from the filesystem.
- **Request Body:** _None_
- **Response:**
    
    ```json
    {
      "AED": "United Arab Emirates Dirham",
      "AFN": "Afghan Afghani",
      "ALL": "Albanian Lek",
      "AMD": "Armenian Dram",
      "ANG": "Netherlands Antillean Guilder",
      "AOA": ...
    }
    ```
    

### **Update Rates** (`GET /api/update-rates`)

- Triggers an update to fetch the latest currency rates from the external API and stores them in the database.
- **Request Body:** _None_
- **Response:**
    
    ```json
    {
      "message": "Rates updated successfully"
    }
    ```
    

### **Latest Rates** (`GET /api/latest.json`)

- Retrieves the most recent exchange rates from the stored database values.
- **Query Parameters:**
    - `base` (string, optional) - Base currency (default: `USD`)
    - `symbols` (string, optional) - Comma-separated list of currency codes
- **Request Body:** _None_
- **Response:**
    
    ```json
    {
      "base": "USD",
      "rates": {
        "EUR": 0.85,
        "GBP": 0.75,
        "NGN": 450
      }
    }
    ```
    

### **Historical Rates** (`GET /api/historical/:date.json`)

- Fetches historical exchange rates for a given date.
- `:date` should be in `YYYY-MM-DD` format.
- **Query Parameters:**
    - `base` (string, optional) - Base currency (default: `USD`)
    - `symbols` (string, optional) - Comma-separated list of currency codes
- **Request Body:** _None_
- **Response:**
    
    ```json
    {
      "date": "2024-03-01",
      "base": "USD",
      "rates": {
        "EUR": 0.84,
        "GBP": 0.74,
        "NGN": 445
      }
    }
    ```
    

### **Pair Conversion** (`GET /api/pair`)

- Converts currency between two given currency pairs.
- **Query Parameters:**
    - `from` (string, required) - Source currency code (default: `USD`)
    - `to` (string, required) - Target currency code (default: `NGN`)
    - `amount` (number, optional) - Amount to convert
- **Request Body:** _None_
- **Response:**
    
    ```json
    {
      "from": "USD",
      "to": "NGN",
      "amount": 100,
      "converted": 45000
    }
    ```
    

## Contribution Guide

### Cloning the Repository

To contribute, first clone the repository:

```sh
$ git clone https://github.com/theridwanade/rate-flow.git
$ cd rate-flow
```

### Installing Dependencies

Since Yarn is used, install dependencies with:

```sh
$ yarn install
```

### Running the Project

Start the development server with:

```sh
$ yarn dev
```

To build the project:

```sh
$ yarn build
```

To run the production server:

```sh
$ yarn start
```

### Contributing

- Fork the repository
- Create a new branch (`git checkout -b feature-branch`)
- Make your changes
- Commit and push your changes (`git commit -m "Add new feature" && git push origin feature-branch`)
- Open a pull request

Contributions are welcome!