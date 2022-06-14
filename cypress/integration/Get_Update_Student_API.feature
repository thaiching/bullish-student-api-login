Feature: To test GET and PATCH Restful API requests

Scenario: Get request to list all students
	Given I initiate a "GET" request
	|	uri				|
	|	fetchStudents	|
	Then The following response are returned
    | status_code   |
    |   200         |
	And there are at least 1 record returned

Scenario: Get request to list single student by ID
	Given I initiate a "GET" request
	|	uri						|			ID			|
	|	fetchStudents			|			333			|
	Then The following response are returned
    | status_code   |   			resp_data   		  |
    |   200         |	{"id": 333,"firstName": "Joe","lastName": "test","studentClass": "4A","nationality": "Singaporean"}	  |

Scenario: Get request to list student record by invalid ID
	Given I initiate a "GET" request
	|	uri						|			ID			|
	|	fetchStudents			|			12345		|
	Then 0 student records are returned

Scenario: Get request to list student by ID and Class
	Given I initiate a "GET" request
	|	uri						|			ID			|		class		|
	|	fetchStudents			|			555			|		4A			|
	Then The following response are returned
    | status_code   |   			resp_data   		  |
    |   200         |	{"id": 555	,"firstName": "Joe","lastName": "test","studentClass": "4A","nationality": "Singaporean"}	  |

Scenario: Get request to list all students by Class
	Given I initiate a "GET" request
	|	uri						|		class		|
	|	fetchStudents			|		4A			|	
	Then all returned student records are from class "4A"

Scenario: Update student details using existing ID
	Given I initiate a "PUT" request
	|	uri				|		ID		|
	|	updateStudent	|       222		|
	Then the student details are updated

Scenario: Update student details using invalid ID (ID that doesn't exist)
	Given I initiate a "PUT" request
	|	uri				|		ID		|
	|	updateStudent	|       0		|
	Then an error message "Exception occurred while updating student data: No student data found with student id: 0" is returned with status code 500



