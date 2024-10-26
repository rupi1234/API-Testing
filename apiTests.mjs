import axios from "axios";
import { expect } from "chai";

describe("Open Library API Tests", () => {
    const BASE_URL = "https://openlibrary.org/api/books";
    const isbnValid = "978-0143128540";
    const isbnInvalid = "1234567890 ";

    it("should return book details for a valid ISBN", async () => {
    const response = await axios.get(`${BASE_URL}?bibkeys=ISBN:${isbnValid}&format=json&jscmd=data`);
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property(`ISBN:${isbnValid}`);
    const bookDetails = response.data[`ISBN:${isbnValid}`];
    if (bookDetails && bookDetails.title) {
        console.log(`Title: ${bookDetails.title}`);
    } else {
        console.log("No title found.");
    }

    if (bookDetails && bookDetails.authors) {
        const authors = bookDetails.authors.map(author => author.name).join(", ");
        console.log(`Authors: ${authors}`);
    } else {
        console.log("No authors found.");
    }
});

    it("should return an empty object for the invalid ISBN key", async () => {
        const response = await axios.get(`${BASE_URL}?bibkeys=ISBN:${isbnInvalid}&format=json&jscmd=data`);
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property(`ISBN:${isbnInvalid}`);
        expect(response.data[`ISBN:${isbnInvalid}`]).to.be.an("object");
    });
    it("should return an error when ISBN parameter is missing", async () => {
        try {
            await axios.get(`${BASE_URL}?format=json&jscmd=data`);
        } catch (error) {
            expect(error.response.status).to.equal(400);
        }
    });
});
