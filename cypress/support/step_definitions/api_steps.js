import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { faker } from '@faker-js/faker';

let random_id = ""
let random_firstName = ""
let random_lastName = ""

Given('I initiate a {string} request', (req_type,datatable) => {

	let id = faker.datatype.number()
	let firstName = faker.name.firstName()
	let lastName = faker.name.lastName()
	let country = faker.address.country()
	let studentClass = faker.helpers.arrayElement(['4A', '4B', '4C'])

	datatable.hashes().forEach((element) => {
		
	let req_body;
	let url = element.uri;

	if (req_type === 'GET'){
		if (element.ID && element.class){ 
			url += `?id=${element.ID}&class=${element.class}`
		}
		
		if (random_id){
			url += `?id=${random_id}`
		}

		if (element.ID){
			url += `?id=${element.ID}`
		}

		if (element.class){
			url += `?class=${element.class}`
		}
	}

	if (req_type === 'POST'){
		req_body = {
			"firstName": firstName,
			"id": (element.ID === undefined) ? id : parseInt(element.ID),
			"lastName": lastName,
			"nationality": country,
			"studentClass": studentClass
		}
		random_id = id;
	}

	if (req_type === 'DELETE'){
		req_body = {"id": element.ID ? element.ID : random_id}
	}

	if (req_type === 'PUT'){
		random_firstName = firstName;
		random_lastName = lastName;

		req_body = {
			"firstName": firstName,
			"id": element.ID,
			"lastName": lastName
		}
	}

	cy.request({
		method: req_type,
		url: `${Cypress.env('API_BASE_URL')}/${url}`,
		body: req_body,
		failOnStatusCode: false
		}).as('page')
	});

});

Then('The following response are returned', (datatable) => {
	cy.get('@page').should((response) =>{
		datatable.hashes().forEach((element) => {
			expect(response.status).to.eq(parseInt(element.status_code))
			if (element.resp_data){
				expect(response.body[0]).to.deep.equal(JSON.parse(element.resp_data))
			}
		});
	})
});

Then('all returned student records are from class {string}', (classType) => {
	cy.get('@page').should((response) =>{
		response.body.forEach((element) =>{
			expect(element.studentClass).to.eq(classType)
		})
	})
});

Then('{int} student records are returned', (number_record) => {
	cy.get('@page').should((response) =>{
		expect(response.body).to.have.length(number_record)
	})
});

Then('a new student record is created', () => {
	cy.get('@page').should((response) =>{
		expect(response.status).to.eql(200);
		expect(response.body).to.eql('New student enrolled with student id : ' + random_id)
	})
});

Then('an error message {string} is returned with status code {int}', (msg, status_code) => {
	cy.get('@page').should((response) =>{
		expect(response.status).to.eql(status_code);
		expect(response.body).to.eql(msg);
	})
});

Then('the student details are updated', () => {
	cy.get('@page').should((response) => {
		expect(response.body.firstName).to.eql(random_firstName);
		expect(response.body.lastName).to.eql(random_lastName);
	})
})

Then('the student record is deleted', () => {
	cy.get('@page').should((response) => {
		expect(response.status).eql(200);
	})
})

Then('the student records are found', () => {
	cy.get('@page').should((response) => {
		expect(response.status).eql(200);
		expect(response.body[0].id).to.eql(random_id);
	})
})

Then('there are at least {int} record returned', (min_record) => { 
	cy.get('@page').should((response) => {
		expect(response.body.length).to.be.greaterThan(min_record);
	})
})