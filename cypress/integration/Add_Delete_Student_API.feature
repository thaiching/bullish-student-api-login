Feature: To test ADD and DELETE student data using POST and DELETE API methods

Scenario: Add new student, verify new student and then delete the new student data
	Given I initiate a "POST" request 
	|	uri				|
	|	addStudent		|
	Then a new student record is created
	And I initiate a "GET" request
	|	uri				|
	|	fetchStudents	|
	Then the student records are found
	And I initiate a "DELETE" request
	|	uri				|
	|	deleteStudent	|
	Then The following response are returned
	| status_code   | 
    |   200         |
	And I initiate a "GET" request
	|	uri				|
	|	fetchStudents	|
	Then 0 student records are returned
	
Scenario: Add new student with existing ID
	Given I initiate a "POST" request
	|	uri				|		ID		|
	|	addStudent		|       333		|
	Then an error message "Exception occurred while adding new student: Student already exists with student id: 333" is returned with status code 500

Scenario: Delete student with invalid ID (ID that doesn't exist)
	Given I initiate a "DELETE" request
	|	uri				|		ID				|
	|	deleteStudent	|       1234567890		|
	Then an error message "Exception occurred while deleting student data: No student data found with student id: 1234567890" is returned with status code 500
