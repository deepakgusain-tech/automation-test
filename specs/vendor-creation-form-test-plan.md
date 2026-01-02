# Vendor Management - New Vendor Creation Form Test Plan

## Application Overview


This test plan covers the vendor management application in Dynamics 365 Finance and Operations. The application displays a vendor list page with a "New" button in the toolbar. When the "New" button is clicked, a comprehensive vendor creation form is dynamically rendered on the same page (client-side rendering without page navigation). The form contains multiple sections including General information, Addresses, Contact information, Miscellaneous details, and advanced configuration options.

The form includes various field types: text inputs, dropdowns, switches, and organized sections that can be collapsed/expanded. This test plan validates the form rendering, field presence, data entry, and form submission workflow.


## Test Scenarios

### 1. Vendor Creation Form Functionality

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify New button is visible and enabled on vendor list page

**File:** `tests/vendor-management/new-button-visibility.spec.ts`

**Steps:**
  1. Navigate to the vendor management page at https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=VendTableListPage
  2. Wait for the page to fully load and display the vendor list
  3. Locate the 'New' button in the toolbar at the top of the page
  4. Verify the 'New' button is visible on the screen
  5. Verify the 'New' button is enabled (not disabled)
  6. Verify the button label reads 'New'

**Expected Results:**
  - Page loads successfully with vendor list displayed in a grid
  - The 'New' button is visible in the toolbar
  - The 'New' button is enabled and clickable
  - Button is properly labeled as 'New'

#### 1.2. Click New button and verify form is dynamically rendered

**File:** `tests/vendor-management/new-button-click-form-render.spec.ts`

**Steps:**
  1. Navigate to the vendor management page
  2. Wait for the page to fully load
  3. Click the 'New' button in the toolbar
  4. Wait for the form container to appear (max 3 seconds)
  5. Verify the page URL has not changed (still on the same page)
  6. Verify the form is visible and rendered on the page
  7. Verify the vendor list grid is no longer visible or has been replaced with the form
  8. Verify a heading appears indicating 'New Record'

**Expected Results:**
  - Form appears dynamically without page navigation
  - URL remains the same (client-side rendering)
  - Form container is visible with form content
  - Form is rendered within the same page context
  - 'New Record' indicator is visible

#### 1.3. Verify all required and key form fields are present

**File:** `tests/vendor-management/form-fields-presence.spec.ts`

**Steps:**
  1. Navigate to the vendor list page and click the 'New' button
  2. Wait for the form to be rendered
  3. Verify the 'General' section is visible and expanded
  4. Verify the following text input fields are present:
  5.   - Vendor account (pre-filled with auto-generated value)
  6.   - Name (dropdown/combobox field)
  7.   - Search name (text input)
  8.   - Organization number (text input)
  9. Verify the following dropdown/combobox fields are present:
  10.   - Type (with Organization selected by default)
  11.   - Group
  12.   - Currency (pre-filled with GBP)
  13.   - Language (pre-filled with en-GB)
  14.   - ABC code
  15. Verify other key sections are present:
  16.   - Addresses section with Add button
  17.   - Contact information section with Add button
  18.   - Miscellaneous details section
  19.   - Payment section
  20. Verify that the form has a Save button available in the toolbar

**Expected Results:**
  - All required text input fields are present and visible
  - All required dropdown fields are present with proper dropdown indicators
  - Form sections are properly organized and visible
  - Fields have appropriate labels and placeholders
  - Currency and Language fields have default values
  - Save button is visible in the toolbar at the top

#### 1.4. Fill form with valid test data and verify data entry

**File:** `tests/vendor-management/form-data-entry.spec.ts`

**Steps:**
  1. Navigate to the vendor list page and click the 'New' button
  2. Wait for the form to be rendered
  3. Enter a unique vendor name in the 'Name' field (e.g., 'Test Vendor ' + timestamp)
  4. Enter a search name in the 'Search name' field (e.g., 'Test Vendor Search')
  5. Enter an organization number (e.g., '12345678')
  6. Verify the 'Type' dropdown is set to 'Organization'
  7. Select a value from the 'Group' dropdown
  8. Verify 'Currency' field shows 'GBP'
  9. Verify 'Language' field shows 'en-GB'
  10. Enter a number of employees in the 'Number of employees' field (e.g., '10')
  11. Verify all entered data is displayed correctly in the form fields

**Expected Results:**
  - Vendor name is entered and visible in the Name field
  - Search name is entered and visible in the Search name field
  - Organization number is entered and visible
  - Group selection is applied
  - Currency field shows GBP
  - Language field shows en-GB
  - Number of employees is entered and visible
  - All data persists in the form fields

#### 1.5. Submit the form and verify success behavior

**File:** `tests/vendor-management/form-submission.spec.ts`

**Steps:**
  1. Navigate to the vendor list page and click the 'New' button
  2. Wait for the form to be rendered
  3. Fill in the required form fields with valid test data:
  4.   - Name: unique vendor name
  5.   - Type: Organization
  6.   - Currency: GBP
  7. Click the 'Save' button in the toolbar
  8. Wait for the submission to complete (2-5 seconds)
  9. Verify the form has closed or transitioned back to the list view
  10. Verify a success notification appears (check Action Center or top notification area)
  11. Verify the vendor list is displayed again
  12. Optionally: Search for the newly created vendor in the list to confirm it was created

**Expected Results:**
  - Save button click is processed without errors
  - Form closes after submission
  - Page returns to vendor list view
  - Success notification appears confirming vendor creation
  - No error messages are displayed
  - Newly created vendor appears in the vendor list

#### 1.6. Verify form field validation for required fields

**File:** `tests/vendor-management/form-validation.spec.ts`

**Steps:**
  1. Navigate to the vendor list page and click the 'New' button
  2. Wait for the form to be rendered
  3. Leave the 'Name' field empty (leave only auto-generated vendor account)
  4. Attempt to click the 'Save' button
  5. Verify that a validation error is displayed
  6. Verify the form does not submit without the required 'Name' field
  7. Enter a vendor name in the 'Name' field
  8. Click the 'Save' button again
  9. Verify the form submits successfully

**Expected Results:**
  - Form displays validation error when Name field is empty
  - Save button does not process submission with missing required fields
  - Error message clearly indicates which field is required
  - Form allows successful submission after required field is filled

#### 1.7. Verify form can be closed without saving

**File:** `tests/vendor-management/form-close-without-save.spec.ts`

**Steps:**
  1. Navigate to the vendor list page and click the 'New' button
  2. Wait for the form to be rendered
  3. Fill in some form fields with test data
  4. Click the 'Back' button in the toolbar (not the Save button)
  5. Verify a confirmation dialog appears asking about unsaved changes
  6. Click 'Discard' or equivalent button to confirm closing without saving
  7. Verify the form closes and the vendor list is displayed
  8. Verify no new vendor was created with the partial data

**Expected Results:**
  - Back button initiates close action
  - Confirmation dialog appears for unsaved changes
  - User can confirm discarding changes
  - Form closes without creating a vendor record
  - Vendor list is displayed without the test data

#### 1.8. Verify dropdown fields populate correctly

**File:** `tests/vendor-management/dropdown-fields.spec.ts`

**Steps:**
  1. Navigate to the vendor list page and click the 'New' button
  2. Wait for the form to be rendered
  3. Click on the 'Type' dropdown field
  4. Verify the dropdown displays available options
  5. Verify 'Organization' option is visible
  6. Click on the 'Group' dropdown field
  7. Verify the dropdown opens and displays available groups
  8. Verify at least one group option is selectable
  9. Click on the 'Currency' dropdown field
  10. Verify GBP is available and can be selected
  11. Click on the 'Language' dropdown
  12. Verify 'en-GB' is available and selected by default

**Expected Results:**
  - Type dropdown displays expected vendor types
  - Group dropdown displays available groups
  - Currency dropdown displays currency options including GBP
  - Language dropdown displays language options including en-GB
  - All dropdowns are functional and options are selectable
