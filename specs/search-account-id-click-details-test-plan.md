# Search Account ID and Click on Customer Details

## Application Overview

This test plan covers scenarios for searching and clicking on Account IDs in the Microsoft Dynamics 365 Finance & Operations Customer List page. The page displays a list of customers with various details (Account, Name, Invoice account, Customer group, Currency, etc.). Users can search for specific accounts using the search functionality and click on the Account ID to open detailed customer information. The application is accessed via the URL: https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=CustTableListPage

## Test Scenarios

### 1. Search Account ID Functionality

**Seed:** `tests/seed.spec.ts`

#### 1.1. Search for Account ID using default search field

**File:** `tests/customer-management/search-account-id-default-field.spec.ts`

**Steps:**
  1. Navigate to Customer List page (https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=CustTableListPage)
  2. Verify the page loads and displays the customer list with Account column visible
  3. Locate the 'Search by' dropdown which currently shows 'Telephone' as the default search field
  4. Click on the 'Search by' dropdown to view available search field options
  5. Verify available options include: Account, Name, Invoice account, and other fields
  6. Select 'Account' from the dropdown menu
  7. Enter a valid account ID 'C0001' in the search textbox
  8. Press Enter or wait for auto-filter to execute
  9. Verify the customer list is filtered to show only C0001 (Mondelez Espana Galletas production SL)

**Expected Results:**
  - Page loads successfully with the customer list visible
  - Search dropdown is accessible and functional
  - Account option is available in the dropdown
  - Filtering works correctly and displays only the matching account
  - C0001 appears in the filtered results with correct customer name

#### 1.2. Search for Account ID with partial match

**File:** `tests/customer-management/search-account-id-partial-match.spec.ts`

**Steps:**
  1. Navigate to Customer List page
  2. Verify the page loads successfully
  3. Change the 'Search by' dropdown to 'Account' if not already set
  4. Enter partial account ID 'C000' in the search textbox (matching multiple accounts)
  5. Press Enter or wait for auto-filter
  6. Verify the list shows all accounts starting with 'C000' (C0001, C0002, C0003, etc.)
  7. Verify the count of results includes at least C0001 through C0014

**Expected Results:**
  - Partial search returns multiple matching results
  - All accounts starting with 'C000' are displayed
  - At least 14 results are shown (C0001-C0014)
  - Search is case-insensitive

#### 1.3. Search for non-existent Account ID

**File:** `tests/customer-management/search-account-id-not-found.spec.ts`

**Steps:**
  1. Navigate to Customer List page
  2. Verify the page loads successfully
  3. Set the 'Search by' dropdown to 'Account'
  4. Enter a non-existent account ID 'ZZZZ9999' in the search textbox
  5. Press Enter or wait for auto-filter
  6. Verify the customer list is empty or shows no results
  7. Verify no error messages are displayed

**Expected Results:**
  - Search executes without errors
  - No results are returned for the non-existent account
  - Grid remains visible but shows no data rows
  - No error or validation messages appear

#### 1.4. Clear search and return to full list

**File:** `tests/customer-management/search-account-id-clear-filter.spec.ts`

**Steps:**
  1. Navigate to Customer List page
  2. Perform a search for a specific account ID (e.g., 'C0005')
  3. Verify the list is filtered to show only the matching result
  4. Clear the search textbox (delete text or click clear button if available)
  5. Press Enter or wait for auto-filter
  6. Verify the complete customer list is restored showing all accounts

**Expected Results:**
  - Search filter successfully applied
  - Cleared search restores the full customer list
  - All customer records are visible again
  - No data loss occurs when clearing the filter

### 2. Click on Account ID to Open Details

**Seed:** `tests/seed.spec.ts`

#### 2.1. Click on Account ID to open customer details page

**File:** `tests/customer-management/click-account-id-open-details.spec.ts`

**Steps:**
  1. Navigate to Customer List page
  2. Verify the page loads and displays the customer list
  3. Locate the account 'C0001' in the grid (first row in the Account column)
  4. Click on the Account ID 'C0001' textbox/cell
  5. Wait for the customer details page to load
  6. Verify the page title or heading shows the customer details for C0001
  7. Verify customer information is displayed (Name: 'Mondelez Espana Galletas production SL')

**Expected Results:**
  - Account ID cell is clickable
  - Clicking navigates to the customer details page
  - Customer details page loads successfully
  - Correct customer information is displayed for C0001
  - No navigation errors occur

#### 2.2. Click on different Account IDs from the list

**File:** `tests/customer-management/click-multiple-account-ids.spec.ts`

**Steps:**
  1. Navigate to Customer List page
  2. Verify the page loads successfully
  3. Click on Account ID 'C0002' (Abergavenny Fine Foods Ltd.)
  4. Wait for customer details page to load
  5. Verify the details show C0002 customer information
  6. Navigate back to the customer list
  7. Click on Account ID 'C0005' (Aimia Foods Limited)
  8. Wait for customer details page to load
  9. Verify the details show C0005 customer information
  10. Navigate back to the customer list
  11. Click on Account ID 'C0014' (Bath Soft Cheese.)
  12. Wait for customer details page to load
  13. Verify the details show C0014 customer information

**Expected Results:**
  - Each account ID is clickable and navigates to the correct customer
  - Customer details page displays the correct information for each account
  - Back navigation works correctly
  - Each customer's details match the account ID clicked
  - No navigation or data mismatch errors occur

#### 2.3. Click on Account ID in an inline grid cell

**File:** `tests/customer-management/click-account-id-inline-edit.spec.ts`

**Steps:**
  1. Navigate to Customer List page
  2. Locate a customer row in the grid (e.g., C0003 - The Organic Farm Shop)
  3. Click directly on the Account ID textbox 'C0003' in the grid
  4. Determine if clicking enters edit mode or navigates to details
  5. If edit mode: Press Escape to cancel edit and verify no changes
  6. If navigation: Verify customer details page opens for C0003

**Expected Results:**
  - Account ID cell responds to click action
  - Click behavior is consistent (either edit mode or navigation)
  - If in edit mode, escape cancels the edit without changes
  - If navigation occurs, correct customer details are displayed

#### 2.4. Search for Account ID and click from filtered results

**File:** `tests/customer-management/search-and-click-account-id.spec.ts`

**Steps:**
  1. Navigate to Customer List page
  2. Verify the page loads successfully
  3. Change 'Search by' dropdown to 'Account'
  4. Search for Account ID 'C0008'
  5. Verify the list is filtered to show only C0008 (Aston Manor Brewery Company)
  6. Click on the Account ID 'C0008' in the filtered results
  7. Wait for customer details page to load
  8. Verify the customer details page displays C0008 information
  9. Verify the customer name 'Aston Manor Brewery Company' is shown

**Expected Results:**
  - Search filters results correctly
  - Clicking on the filtered account ID opens the details page
  - Correct customer information is displayed
  - Customer details match the searched account ID

### 3. Edge Cases and Error Scenarios

**Seed:** `tests/seed.spec.ts`

#### 3.1. Handle empty search field

**File:** `tests/customer-management/search-account-id-empty-field.spec.ts`

**Steps:**
  1. Navigate to Customer List page
  2. Verify the page loads successfully
  3. Ensure the search textbox is empty
  4. Press Enter or trigger the search
  5. Verify the complete customer list is displayed
  6. Verify no error messages appear

**Expected Results:**
  - Empty search returns all customers
  - No error or validation messages are displayed
  - Full customer list is visible

#### 3.2. Search with special characters in Account ID

**File:** `tests/customer-management/search-account-id-special-chars.spec.ts`

**Steps:**
  1. Navigate to Customer List page
  2. Set 'Search by' dropdown to 'Account'
  3. Enter an Account ID with special characters like 'C0001-TEST' or 'C@0001'
  4. Press Enter or trigger the search
  5. Verify the system handles the special characters appropriately
  6. Check if results match or if validation message appears

**Expected Results:**
  - Search either returns no results or handles special characters gracefully
  - No system error or crash occurs
  - Appropriate feedback is provided to the user

#### 3.3. Search with whitespace in Account ID field

**File:** `tests/customer-management/search-account-id-whitespace.spec.ts`

**Steps:**
  1. Navigate to Customer List page
  2. Set 'Search by' dropdown to 'Account'
  3. Enter an Account ID with leading/trailing whitespace ' C0001 '
  4. Press Enter or trigger the search
  5. Verify the system trims whitespace or returns appropriate results
  6. Confirm the search finds 'C0001' correctly

**Expected Results:**
  - Search correctly handles whitespace (either trims or validates)
  - Account 'C0001' is found despite whitespace
  - No error messages appear

#### 3.4. Click on Account ID with double-click

**File:** `tests/customer-management/click-account-id-double-click.spec.ts`

**Steps:**
  1. Navigate to Customer List page
  2. Locate Account ID 'C0006' in the grid
  3. Double-click on the Account ID cell
  4. Wait to see if it enters edit mode or navigates to details
  5. Verify the behavior is appropriate (edit mode or navigation)
  6. If edit mode activated, press Escape to cancel

**Expected Results:**
  - Double-click is handled appropriately
  - Either edit mode activates or navigation occurs
  - No unexpected behavior or errors occur
