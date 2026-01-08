# Customer List Page - New Button Click Test Plan

## Application Overview

The Customer List Page displays all customers in the system and provides a "New" button in the toolbar to create a new customer. When clicked, the "New" button opens a "Create customer" dialog form with multiple sections including Details, Address, and Contact Information. The form includes various input fields with dropdowns, text boxes, and combo boxes for entering customer information.

## Test Scenarios

### 1. Customer List Page - New Button Functionality

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify New button is accessible on Customer List page

**File:** `tests/customer-management/new-button-accessibility.spec.ts`

**Steps:**
  1. Navigate to the Customer List page (CustTableListPage) in the Orkla UAT2 environment with company OV01
  2. Wait for the page to fully load
  3. Verify that the toolbar is visible in the main form
  4. Locate the 'New' button in the toolbar
  5. Verify the 'New' button is enabled and clickable

**Expected Results:**
  - Customer List page loads successfully
  - Toolbar is displayed with all action buttons
  - 'New' button is visible in the toolbar
  - 'New' button is enabled (not greyed out)
  - 'New' button has the correct label and styling

#### 1.2. Verify Create Customer dialog opens when New button is clicked

**File:** `tests/customer-management/new-button-dialog-open.spec.ts`

**Steps:**
  1. Navigate to the Customer List page
  2. Wait for the page to fully load
  3. Click the 'New' button in the toolbar
  4. Wait for the dialog to appear
  5. Verify the dialog title displays 'Create customer'
  6. Verify the dialog is modal (blocks interaction with underlying page)

**Expected Results:**
  - A modal dialog opens with the title 'Create customer'
  - Dialog appears in the center of the screen
  - Underlying page content is obscured/disabled
  - Dialog is fully rendered and responsive

#### 1.3. Verify Details section fields are present and functional

**File:** `tests/customer-management/details-section-fields.spec.ts`

**Steps:**
  1. Navigate to the Customer List page and click the 'New' button
  2. Wait for the Create customer dialog to load
  3. Verify the 'Details' section header is visible and expanded by default
  4. Verify the following fields are present in the Details section:
  5.   - Customer account (combobox, active/required)
  6.   - Type (combobox, defaults to 'Organization')
  7.   - Name (combobox)
  8.   - Customer group (combobox)
  9.   - Currency (combobox, defaults to 'GBP')
  10.   - Terms of payment (combobox)
  11.   - Delivery terms (combobox)
  12.   - Mode of delivery (combobox)
  13.   - Sales tax group (combobox)
  14.   - Tax exempt number (combobox)
  15.   - Source code (combobox)
  16. Verify each field has a label and input area
  17. Verify that the Details section can be collapsed by clicking its header

**Expected Results:**
  - All 11 fields are visible and accessible in the Details section
  - Fields are properly labeled
  - Customer account field is focused by default (marked as active)
  - Type field shows 'Organization' as the default value
  - Currency field shows 'GBP' as the default value
  - Each combobox has a clickable dropdown indicator
  - Details section can be expanded and collapsed

#### 1.4. Verify Address section fields are present

**File:** `tests/customer-management/address-section-fields.spec.ts`

**Steps:**
  1. Navigate to the Customer List page and click the 'New' button
  2. Wait for the Create customer dialog to load
  3. Verify the 'Address' section header is visible and expanded by default
  4. Verify the following fields are present in the Address section:
  5.   - Country/region (combobox, defaults to 'SWE')
  6.   - ZIP/postal code (combobox)
  7.   - Street (textbox)
  8.   - Post box (textbox)
  9.   - City (combobox)
  10.   - Address books (combobox)
  11. Verify each field has proper label and input area
  12. Verify the Address section can be collapsed by clicking its header

**Expected Results:**
  - All 6 address-related fields are visible
  - Country/region field shows 'SWE' as default value
  - Street and Post box fields are text input fields
  - Country/region, ZIP/postal code, City, and Address books are dropdowns
  - Address section can be expanded and collapsed

#### 1.5. Verify Contact Information section fields are present

**File:** `tests/customer-management/contact-info-section-fields.spec.ts`

**Steps:**
  1. Navigate to the Customer List page and click the 'New' button
  2. Wait for the Create customer dialog to load
  3. Verify the 'Contact information' section header is visible and expanded by default
  4. Verify the following fields are present in the Contact information section:
  5.   - Phone (textbox)
  6.   - Extension (textbox)
  7.   - Fax (textbox)
  8.   - Email address (textbox)
  9. Verify each field has proper label and placeholder
  10. Verify the Contact information section can be collapsed by clicking its header

**Expected Results:**
  - All 4 contact fields are visible
  - Phone, Extension, Fax, and Email address are text input fields
  - All fields have appropriate placeholders (empty)
  - Contact information section can be expanded and collapsed

#### 1.6. Verify action buttons at the bottom of the dialog

**File:** `tests/customer-management/dialog-action-buttons.spec.ts`

**Steps:**
  1. Navigate to the Customer List page and click the 'New' button
  2. Wait for the Create customer dialog to load
  3. Scroll to the bottom of the dialog if necessary
  4. Verify the following action buttons are present:
  5.   - 'Save' button
  6.   - 'Save and open' button
  7.   - 'Cancel' button
  8. Verify all buttons are enabled and clickable

**Expected Results:**
  - 'Save' button is visible and enabled
  - 'Save and open' button is visible and enabled
  - 'Cancel' button is visible and enabled
  - All buttons have proper styling and labeling

#### 1.7. Verify dialog header elements (Copilot and Help buttons)

**File:** `tests/customer-management/dialog-header-elements.spec.ts`

**Steps:**
  1. Navigate to the Customer List page and click the 'New' button
  2. Wait for the Create customer dialog to load
  3. Verify the dialog header contains:
  4.   - 'Copilot' button (with icon)
  5.   - 'Help' button (with icon)
  6. Verify the 'Standard view' dropdown is present
  7. Verify the dialog title 'Create customer' is prominently displayed

**Expected Results:**
  - 'Copilot' button is visible in the header
  - 'Help' button is visible in the header
  - 'Standard view' dropdown is present
  - Dialog title 'Create customer' is displayed as a heading

#### 1.8. Verify form summary section displays default values

**File:** `tests/customer-management/form-summary-section.spec.ts`

**Steps:**
  1. Navigate to the Customer List page and click the 'New' button
  2. Wait for the Create customer dialog to load
  3. Verify the Details section header shows a summary with:
  4.   - Customer group: (blank)
  5.   - Currency: GBP
  6.   - Terms of payment: (blank)
  7.   - Delivery terms: (blank)
  8.   - Mode of delivery: (blank)
  9.   - Sales tax group: (blank)

**Expected Results:**
  - Summary section displays above the Details group
  - Currency shows 'GBP' as the default value
  - Other fields show '(blank)' or '--' indicating no value
  - Currency field in summary is a clickable link

#### 1.9. Verify Cancel button closes the dialog without saving

**File:** `tests/customer-management/cancel-button-closes-dialog.spec.ts`

**Steps:**
  1. Navigate to the Customer List page and click the 'New' button
  2. Wait for the Create customer dialog to load
  3. Enter some test data in the Customer account field
  4. Click the 'Cancel' button
  5. Wait for the dialog to close

**Expected Results:**
  - Dialog closes immediately
  - Customer list page is displayed
  - No new customer record is created
  - Underlying customer list remains unchanged

#### 1.10. Verify Customer account field validation (required field)

**File:** `tests/customer-management/customer-account-required.spec.ts`

**Steps:**
  1. Navigate to the Customer List page and click the 'New' button
  2. Wait for the Create customer dialog to load
  3. Verify the Customer account field is focused (marked as active)
  4. Leave Customer account field empty
  5. Click the 'Save' button

**Expected Results:**
  - Customer account field is pre-selected/active on dialog load
  - Save button may be disabled or validation error appears
  - Error message indicates Customer account is required
  - Dialog remains open for correction

#### 1.11. Verify Type field dropdown options

**File:** `tests/customer-management/type-dropdown-options.spec.ts`

**Steps:**
  1. Navigate to the Customer List page and click the 'New' button
  2. Wait for the Create customer dialog to load
  3. Click on the 'Type' dropdown field
  4. Wait for dropdown options to appear
  5. Verify 'Organization' is the selected/default option
  6. Verify other available options in the dropdown

**Expected Results:**
  - Type dropdown opens showing available options
  - 'Organization' is the default/selected value
  - At least one other option (e.g., 'Person') is available
  - Dropdown options are clearly displayed and selectable

#### 1.12. Verify Currency field defaults to GBP

**File:** `tests/customer-management/currency-default-gbp.spec.ts`

**Steps:**
  1. Navigate to the Customer List page and click the 'New' button
  2. Wait for the Create customer dialog to load
  3. Verify the Currency field displays 'GBP' by default
  4. Click on the Currency field to open dropdown
  5. Verify GBP is selected in the dropdown
  6. Verify other currency options are available

**Expected Results:**
  - Currency field shows 'GBP' as the default value
  - Currency is a clickable link (leading to currency details)
  - Dropdown opens showing available currencies
  - GBP is highlighted/selected in the dropdown
  - Other currencies (EUR, USD, etc.) are available as options

#### 1.13. Verify Country/region field defaults to SWE

**File:** `tests/customer-management/country-default-swe.spec.ts`

**Steps:**
  1. Navigate to the Customer List page and click the 'New' button
  2. Wait for the Create customer dialog to load
  3. Verify the Address section is expanded
  4. Verify the Country/region field displays 'SWE' by default
  5. Click on the Country/region field to open dropdown
  6. Verify other country options are available

**Expected Results:**
  - Address section is expanded by default
  - Country/region field shows 'SWE' as default
  - Country/region is a clickable link
  - Dropdown opens showing available countries
  - SWE (Sweden) is the selected option

#### 1.14. Verify sections can be collapsed and expanded

**File:** `tests/customer-management/collapsible-sections.spec.ts`

**Steps:**
  1. Navigate to the Customer List page and click the 'New' button
  2. Wait for the Create customer dialog to load
  3. Verify all three sections are expanded: Details, Address, Contact information
  4. Click on the 'Details' section header to collapse it
  5. Verify Details section content is hidden
  6. Click on the 'Details' section header again to expand it
  7. Verify Details section content is visible again
  8. Repeat for Address and Contact information sections

**Expected Results:**
  - All sections are expandable/collapsible
  - Clicking section header toggles the expanded/collapsed state
  - Section content is shown/hidden appropriately
  - Section headers have expand/collapse indicators (buttons)

#### 1.15. Verify text fields accept and display input

**File:** `tests/customer-management/text-fields-input.spec.ts`

**Steps:**
  1. Navigate to the Customer List page and click the 'New' button
  2. Wait for the Create customer dialog to load
  3. Click on the 'Street' field in the Address section
  4. Type a test street address: '123 Main Street'
  5. Verify the text appears in the field
  6. Click on the 'Email address' field in Contact information
  7. Type a test email: 'test@example.com'
  8. Verify the text appears in the field

**Expected Results:**
  - Text fields are editable and accept user input
  - Typed text is displayed in the fields correctly
  - No validation errors appear while typing valid text
  - Focus moves between fields as expected

#### 1.16. Verify dropdown fields respond to clicks

**File:** `tests/customer-management/dropdown-fields-interactive.spec.ts`

**Steps:**
  1. Navigate to the Customer List page and click the 'New' button
  2. Wait for the Create customer dialog to load
  3. Click on the 'Customer group' dropdown
  4. Verify dropdown options appear
  5. Press Escape to close the dropdown
  6. Click on the 'Terms of payment' dropdown
  7. Verify dropdown options appear
  8. Click on one of the options to select it

**Expected Results:**
  - Dropdown fields open when clicked
  - Dropdown options are displayed
  - Options can be selected by clicking
  - Escape key closes the dropdown
  - Selected value updates the field

#### 1.17. Verify Save button behavior with incomplete required fields

**File:** `tests/customer-management/save-incomplete-form.spec.ts`

**Steps:**
  1. Navigate to the Customer List page and click the 'New' button
  2. Wait for the Create customer dialog to load
  3. Leave the Customer account field empty
  4. Fill in optional fields (e.g., Street: '123 Main St')
  5. Click the 'Save' button
  6. Observe the result

**Expected Results:**
  - Save action is prevented or shows validation error
  - Error message indicates which required fields are missing
  - Dialog remains open for user to correct the error
  - Previously entered data is preserved

#### 1.18. Verify Save and open button behavior

**File:** `tests/customer-management/save-and-open-button.spec.ts`

**Steps:**
  1. Navigate to the Customer List page and click the 'New' button
  2. Wait for the Create customer dialog to load
  3. Enter a valid Customer account: 'TEST001'
  4. Enter a valid Name: 'Test Customer'
  5. Click the 'Save and open' button
  6. Wait for processing

**Expected Results:**
  - Customer record is created with the provided data
  - Dialog closes after successful save
  - Customer detail page (form) opens automatically
  - The newly created customer's information is displayed

#### 1.19. Verify dialog elements are properly styled and accessible

**File:** `tests/customer-management/dialog-styling-accessibility.spec.ts`

**Steps:**
  1. Navigate to the Customer List page and click the 'New' button
  2. Wait for the Create customer dialog to load
  3. Verify dialog has a clear border/shadow indicating it is modal
  4. Verify all text is readable with proper contrast
  5. Verify field labels are associated with their input fields
  6. Verify all buttons have descriptive text
  7. Use keyboard Tab key to navigate through all fields

**Expected Results:**
  - Dialog is visually distinct from the background
  - Text meets WCAG accessibility color contrast standards
  - Form fields are properly labeled and associated
  - All interactive elements are keyboard accessible
  - Tab order follows logical flow through the form

#### 1.20. Verify multiple New button clicks don't open multiple dialogs

**File:** `tests/customer-management/single-dialog-instance.spec.ts`

**Steps:**
  1. Navigate to the Customer List page
  2. Click the 'New' button
  3. Wait for the dialog to load
  4. Click the 'New' button again (while dialog is open)
  5. Observe the result

**Expected Results:**
  - Only one Create customer dialog is open at a time
  - Second click does not create a duplicate dialog
  - Existing dialog remains in focus
  - No error messages appear
