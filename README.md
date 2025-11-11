# GitHub Gist Feature

**Author:** Sneha Kapadia
**Role:** Senior QA Engineer  
**Date:** 9th November 2025

What is GIST 
GIST is like a mini Git repository that can be public or secret.
We can quickly share code snippets, small scripts, configs or notes .

:
**Prerequesites:**

Need to create token which having GIST access permission . Github login -> Settings-> DEV tools-> Personal access token-> Create new token & Permission give to GIST.

Add this token to postman Authorization bearer token for manual tests.
In env file in playwright for automation test.


## 1. Testing strategies

Step 1: Objective
    Ensure Gist API and UI work as expected allowing users to create, view, edit, delete and share code snippets reliably and securely.

Step 2.: Understand the Feature (API & UI)
    Go through API documentation & understand that Gist API and UI allow users to create, view, edit, delete and share code snippets.Inputs & Outputs: Identify key request parameters, responses, authentication and UI interactions.

Step 3: Test Types
    Functional Testing: Check if functionality is working fine for UI Create, View etc.
    API Testing: Verify API reuests & responses.
    Integration Testing: API responses correctly update the UI.
    UI Testing: Layout, validations, button, text.
    Negative Testing: Invalid inputs, API errors, edge cases.
    Regression Testing: Ensure existing features aren’t broken due to any change in PR.

Step 4: Test Approach
    Manual Testing for UI & API(Note : only for newly added features considering older features are part of automation test).
    Automation Testing: API endpoints, UI testing.

Step 5: Create high level test scenarios with test detail steps if needed some test management tool like QAse or Testrail
    Create test scenarios for UI tests
    Create test scenarios for API tests
    Check test coverage 

Step 5: Test Data
    Sample files of invalid data or big size files.
    Invalid/malformed data for negative testing.

Step 6: Raise Defects / Bugs in Jira
    Log all issues found during local testing in Jira.
    Include: Steps to reproduce, environment, screenshots, expected vs actual behavior, severity/priority.
    Track defects until fixed and re-test after resolution.

Step 6: Create framework(Optional if does not exist)
    Create framework if does not exist

Step 6: Create automation testcases
    Create automation tests cases for api under api folder.
    Create automation tests cases for ui under ui folder.

Step 6: Exceution locally
    Verify if API & UI tests work fine locally. Check playwright report.

Step 7: CI/CD Integration
    Automate API & UI tests on every commit.
    Run regression and smoke tests before deployment.

Step 8 : Post-Deployment Verification 
    Confirm the new feature works in production.
    

## 2. Tools & Framework 
    Playwright: API & UI testing
    Postman : Manual Api testing
    Github: CI/CD
    Language: Typescript

## 3. Test Scenarios UI  

# Gist UI Test Cases

| Test Case ID | Feature                | Description                                               | Expected Result                                          |
| ------------ | ---------------------- | --------------------------------------------------------- | -------------------------------------------------------- |
| TC_UI_01     | Create Gist            | Create a public gist                                      | Gist is created and visible in user's list               |
| TC_UI_02     | Create Gist            | Create a Secret gist                                     | Gist is created and visible only to the user             |
| TC_UI_03     | View Gist              | View a public gist                                        | Gist content, description and author displayed correctly |
| TC_UI_04     | View Gist              | View a Secret gist                                       | Gist content displayed correctly                         |
| TC_UI_05     | List Gists             | View list of user gists                                   | All gists (public & secret) displayed                   |
| TC_UI_06     | Update Gist            | Edit gist content                                         | Content updated and visible                              |
| TC_UI_07     | Update Gist            | Edit gist description                                     | Description updated and visible                          |
| TC_UI_08     | Delete Gist            | Delete a gist                                             | Gist removed from list, cannot view it anymore           |
| TC_UI_09     | Star Gist              | Star a gist                                               | Star count increments, gist marked as starred            |
| TC_UI_10     | Unstar Gist            | Unstar a gist                                             | Star removed, gist marked as unstarred                   |
| TC_UI_11     | Fork Gist              | Fork a gist                                               | New gist created under your account, original unchanged  |
| TC_UI_12     | Commit Gist            | Add commit to gist                                        | Changes saved as a new commit in history                 |
| TC_UI_13     | Search / Filter Gists  | Search gists by keyword                                   | Only matching gists displayed                            |
| TC_UI_14     | Pagination / Load More | Navigate through multiple pages of gists                  | All gists accessible through pagination                  |
| TC_UI_15     | Error Handling         | Invalid operations (e.g., editing/deleting without login) | Proper error messages shown                              |


# Gist API Test Cases

| Test Case ID | Feature                         | API Endpoint                                           | Description                                             | Expected Result                                                                 |
| ------------ | ------------------------------- | ------------------------------------------------------ | ------------------------------------------------------- | ------------------------------------------------------------------------------- |
| TC_API_01    | Create Public Gist              | POST /gists                                            | Create a public gist via API                            | 201 Created, gist ID returned, visible publicly                                 |
| TC_API_02    | Create Secret Gist             | POST /gists                                            | Create a secret gist                                   | 201 Created, gist visible only to owner                                         |
| TC_API_03    | Create Gist (Negative)          | POST /gists                                            | Missing required fields or malformed JSON               | 400 Bad Request or 422 Unprocessable Entity                                     |
| TC_API_04    | Get Public Gist                 | GET /gists/:gist_id                                    | Retrieve a public gist by ID                            | 200 OK, correct data returned                                                   |
| TC_API_05    | Get Private Gist                | GET /gists/:gist_id                                    | Retrieve a secret gist with valid auth                 | 200 OK, gist data returned                                                      |
| TC_API_06    | Get secret Gist (Unauthorized) | GET /gists/:gist_id                                    | Try accessing secret gist without auth                 | 403 Forbidden or 401 Unauthorized                                               |
| TC_API_07    | List Public Gists               | GET /gists/public                                      | List all public gists using pagination (per_page, page) | 200 OK, correct pagination, supports since query param                          |
| TC_API_08    | List User Gists                 | GET /users/:username/gists                             | List gists for a specific user                          | 200 OK for valid user, 404 Not Found for invalid user                           |
| TC_API_09    | List Git Commits                | GET /gists/:gist_id/commits                            | Retrieve gist commit history                            | 200 OK, correct commit details returned                                         |
| TC_API_10    | Get Gist Revision               | GET /gists/:gist_id/:sha                               | Retrieve specific gist revision                         | 200 OK for valid revision, 404 for invalid                                      |
| TC_API_11    | Update Gist                     | PATCH /gists/:gist_id                                  | Update gist content or description                      | 200 OK, updated fields reflected                                                |
| TC_API_12    | Update Gist (Negative)          | PATCH /gists/:gist_id                                  | Update gist without auth or invalid ID                  | 401 Unauthorized or 404 Not Found                                               |
| TC_API_13    | Delete Gist                     | DELETE /gists/:gist_id                                 | Delete gist with valid auth                             | 204 No Content, gist no longer accessible                                       |
| TC_API_14    | Star / Unstar Gist              | PUT /gists/:gist_id/star & DELETE /gists/:gist_id/star | Star or unstar a gist                                   | 204 No Content, validate both positive and negative (already starred/unstarred) |
| TC_API_15    | Fork Gist                       | POST /gists/:gist_id/forks                             | Fork a gist (positive and negative)                     | 201 Created for valid gist, 403/404 for invalid or private gist                 |


# POST DEPLYMENT VERIFICATION

Confirm the new feature works in production.

# MONITORING
Use monitoring tools to check for any issues.

# CONTINUOUS MAINTENANCE
Refactor flaky or outdated tests regularly.
Keep manual test cases aligned with product documentation.