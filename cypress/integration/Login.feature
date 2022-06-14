Feature: As a user, I can login to the application

Scenario: Valid Login
	Given I navigate to the login page
	When user "tomsmith" logs in with password "SuperSecretPassword!"
	Then user is sucessfully logged in

Scenario Outline: Login With Invalid Credentials Should Fail
	Given I navigate to the login page
	When user "<username>" logs in with password "<password>"
	Then error message "<error_msg>" should be displayed
	Examples:
	|	username	|	password	|			error_msg			|
	|	tomsmith	|	123			|	Your password is invalid!	|
	|	tomsmith123	|	123			|	Your username is invalid!	|
	|	abc			|	def			|	Your username is invalid!	|

# This test case will fail as no field validation check is performed when user click on the login button without any username/password filled in
Scenario: Login with empty fields
	Given I navigate to the login page
	When user " " logs in with password " "
	Then error message "username and password fields are empty" should be displayed

	
