# GitHub Gist Feature

**Author:** Sneha Kapadia
**Role:** Senior QA Engineer  
**Date:** 9th November 2025

## 1. Testing strategies

Step 1: Objective
    Ensure Gist API and UI work as expected allowing users to create, view, edit, delete and share code snippets reliably and securely.

Step 2.: Understand the Feature (API & UI)
    Go through API documentation & understand that Gist API and UI allow users to create, view, edit, delete and share code snippets.Inputs & Outputs: Identify key request parameters, responses, authentication and UI interactions.

Step 3: Test Types
    Functional Testing: CRUD operations for API and UI.
    API Testing: Verify API responses.
    Integration Testing: API responses correctly update the UI.
    UI/UX Testing: Layout, validations.
    Negative Testing: Invalid inputs, API errors, edge cases.
    Regression Testing: Ensure existing features aren’t broken due to any change in PR.

Step 4: Test Approach
    Manual Testing for UI & API(Note : only for newly added features considering older features are part of automation test).
    Automation Testing: API endpoints, UI testing.

Step 5: Create high level test scenarios with test detail steps if needed
    Create test scenarios for UI tests
    Create test scenarios for API tests

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
    Verify if API & UI tests work fine locally.

Step 7: CI/CD Integration
    Automate API & UI tests on every commit.
    Run regression and smoke tests before deployment.



## 2. Tools & Framework 
    Playwright: API & UI testing
    Postman : Manual Api testing
    Github: CI/CD
    Language: Typescript

## 3. Test Scenarios UI  

# Gist UI Test Cases

| Test Case ID | Feature | Description | Expected Result | Edge Cases |
|--------------|---------|------------|----------------|------------------|
| TC_UI_01 | Create Gist | Create a public gist | Gist is created and visible in user's list | Very large content, special characters, empty description |
| TC_UI_02 | Create Gist | Create a private gist | Gist is created and visible only to the user | Visibility toggle malfunction |
| TC_UI_03 | View Gist | View a public gist | Gist content, description and author displayed correctly | Long content scroll behavior, special characters |
| TC_UI_04 | View Gist | View a private gist | Gist content displayed correctly | Attempting to view someone else’s private gist shows error |
| TC_UI_05 | List Gists | View list of user gists | All gists (public & private) displayed | Empty list scenario, pagination, sorting |
| TC_UI_06 | Update Gist | Edit gist content | Content updated and visible | Very large content, special characters, simultaneous edits |
| TC_UI_07 | Update Gist | Edit gist description | Description updated and visible | Empty description, special characters |
| TC_UI_08 | Delete Gist | Delete a gist | Gist removed from list, cannot view it anymore | Cancel deletion retains gist, accidental deletion |
| TC_UI_09 | Star Gist | Star a gist | Star count increments, gist marked as starred | Try starring an already starred gist |
| TC_UI_10 | Unstar Gist | Unstar a gist | Star removed, gist marked as unstarred | Unstarring unstarred gist |
| TC_UI_11 | Fork Gist | Fork a gist | New gist created under your account, original unchanged | Forking private gist not owned, multiple forks |
| TC_UI_12 | Commit Gist | Add commit to gist | Changes saved as a new commit in history | Empty commit message, large content, special characters |
| TC_UI_13 | Search / Filter Gists | Search gists by keyword | Only matching gists displayed | No match scenario, case sensitivity |
| TC_UI_14 | Pagination / Load More | Navigate through multiple pages of gists | All gists accessible through pagination | Very large number of gists, network delay |
| TC_UI_15 | Error Handling | Invalid operations (e.g., editing/deleting without login) | Proper error messages shown | Session expired, invalid auth |

# Gist API Test Cases

# Gist API Test Cases with Endpoints

| Test Case ID | Feature | API Endpoint | Description | Expected Result | Edge Cases |
|--------------|---------|-------------|------------|----------------|------------------|
| TC_API_01 | Create Gist | POST /gists | Create a public gist via API | 201 Created, gist ID returned | Very large content, special characters, empty description |
| TC_API_02 | Create Gist | POST /gists | Create a private gist via API | 201 Created, gist ID returned, only visible to owner | Invalid visibility value, missing auth token |
| TC_API_03 | Create Gist | POST /gists | Create gist with missing required fields | 400 Bad Request | Empty description, no content, malformed JSON |
| TC_API_04 | Read Gist | GET /gists/:gist_id | Get a public gist by ID | 200 OK, correct data returned | Very large content, invalid gist ID |
| TC_API_05 | Read Gist | GET /gists/:gist_id | Get a private gist with proper auth | 200 OK, correct data | Missing or expired token, another user’s token |
| TC_API_06 | Read Gist | GET /gists/:gist_id | Get a private gist without auth | 403 Forbidden | Access denied scenario |
| TC_API_07 | Update Gist | PATCH /gists/:gist_id | Update gist content with auth | 200 OK, updated content reflected | Very large content, malformed JSON |
| TC_API_08 | Update Gist | PATCH /gists/:gist_id | Update gist description only | 200 OK, updated description | Empty description, special characters |
| TC_API_09 | Update Gist | PATCH /gists/:gist_id | Update gist without auth | 401 Unauthorized | Missing or invalid token |
| TC_API_10 | Delete Gist | DELETE /gists/:gist_id | Delete gist by ID with auth | 204 No Content, gist cannot be fetched | Delete large gist, invalid ID |
| TC_API_11 | Delete Gist | DELETE /gists/:gist_id | Delete gist without auth | 401 Unauthorized | Invalid token |
| TC_API_12 | Star Gist | PUT /gists/:gist_id/star | Star a gist | 204 No Content, gist marked as starred | Star an already starred gist |
| TC_API_13 | Unstar Gist | DELETE /gists/:gist_id/star | Unstar a gist | 204 No Content, gist unstarred | Unstar an unstarred gist |
| TC_API_14 | Fork Gist | POST /gists/:gist_id/forks | Fork a gist | 201 Created, new gist under your account | Fork private gist not owned, multiple forks |
| TC_API_15 | Commit Gist | PATCH /gists/:gist_id | Add commit to gist | 200 OK, new commit created | Empty commit message, large content, invalid gist ID |
| TC_API_16 | Error Handling | Various | Invalid operations (wrong method, missing auth) | Appropriate HTTP error codes (400, 401, 403, 404) | Malformed JSON, invalid endpoints |




